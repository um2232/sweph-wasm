package com.planetary.calculator

import android.content.Context
import android.util.Log
import android.webkit.WebView
import android.webkit.WebViewClient
import java.io.File
import java.io.FileOutputStream
import java.io.IOException

class WebViewManager(private val context: Context, private val webView: WebView) {
    
    companion object {
        private const val TAG = "WebViewManager"
    }
    
    init {
        setupWebView()
        extractAssets()
    }
    
    private fun setupWebView() {
        webView.settings.apply {
            // Enable JavaScript and WebAssembly
            javaScriptEnabled = true
            domStorageEnabled = true
            allowFileAccess = true
            allowContentAccess = true
            
            // Enable WebAssembly
            mixedContentMode = android.webkit.WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
            
            // Cache settings for offline functionality
            cacheMode = android.webkit.WebSettings.LOAD_DEFAULT
            setAppCacheEnabled(true)
            setAppCachePath(context.cacheDir.absolutePath)
            
            // Enable debugging in development
            if (android.os.BuildConfig.DEBUG) {
                setWebContentsDebuggingEnabled(true)
            }
        }
        
        // Set WebView client to handle loading
        webView.webViewClient = object : WebViewClient() {
            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                Log.d(TAG, "Calculator page loaded successfully")
            }
            
            override fun onReceivedError(
                view: WebView?,
                request: android.webkit.WebResourceRequest?,
                error: android.webkit.WebResourceError?
            ) {
                super.onReceivedError(view, request, error)
                Log.e(TAG, "WebView error: ${error?.description}")
            }
        }
    }
    
    private fun extractAssets() {
        try {
            // Extract WebAssembly files to cache directory
            val cacheDir = context.cacheDir
            val jsDir = File(cacheDir, "js")
            jsDir.mkdirs()
            
            // List of files to extract
            val assetsToExtract = listOf(
                "js/astro.wasm",
                "js/astro.js", 
                "js/astro.data"
            )
            
            assetsToExtract.forEach { assetPath ->
                val fileName = assetPath.substringAfterLast("/")
                val outputFile = File(jsDir, fileName)
                
                if (!outputFile.exists()) {
                    context.assets.open(assetPath).use { input ->
                        FileOutputStream(outputFile).use { output ->
                            input.copyTo(output)
                        }
                    }
                    Log.d(TAG, "Extracted $assetPath to ${outputFile.absolutePath}")
                }
            }
            
        } catch (e: IOException) {
            Log.e(TAG, "Error extracting assets", e)
        }
    }
    
    fun loadCalculator() {
        // Load the main calculator HTML file
        webView.loadUrl("file:///android_asset/calculator.html")
    }
    
    fun evaluateJavaScript(script: String, resultCallback: ((String?) -> Unit)? = null) {
        webView.evaluateJavascript(script, resultCallback)
    }
    
    fun callCalculatorFunction(
        year: Int, month: Int, day: Int,
        hour: Int, minute: Int, second: Int,
        lonDeg: Int, lonMin: Int, lonSec: Int, lonEW: String,
        latDeg: Int, latMin: Int, latSec: Int, latNS: String,
        houseSystem: String,
        callback: (String) -> Unit
    ) {
        val script = """
            javascript:(function() {
                if (window.Module && window.Module.ccall) {
                    try {
                        const result = window.Module.ccall(
                            "get",
                            "string",
                            ["number", "number", "number", "number", "number", "number", 
                             "number", "number", "number", "string", 
                             "number", "number", "number", "string", "string"],
                            [$year, $month, $day, $hour, $minute, $second,
                             $lonDeg, $lonMin, $lonSec, "$lonEW",
                             $latDeg, $latMin, $latSec, "$latNS",
                             "$houseSystem"]
                        );
                        Android.onCalculationResult(result);
                    } catch (error) {
                        Android.onCalculationError(error.toString());
                    }
                } else {
                    Android.onCalculationError("WebAssembly module not loaded");
                }
            })()
        """.trimIndent()
        
        evaluateJavaScript(script)
    }
    
    fun isModuleLoaded(): Boolean {
        var isLoaded = false
        evaluateJavaScript("window.Module && window.Module.ccall ? 'true' : 'false'") { result ->
            isLoaded = result == "true"
        }
        return isLoaded
    }
    
    fun getModuleLoadStatus(callback: (String) -> Unit) {
        evaluateJavaScript("""
            javascript:(function() {
                if (window.Module) {
                    if (window.Module.ccall) {
                        return "loaded";
                    } else {
                        return "loading";
                    }
                } else {
                    return "not_loaded";
                }
            })()
        """.trimIndent(), callback)
    }
}