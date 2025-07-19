package com.planetary.calculator

import android.Manifest
import android.content.pm.PackageManager
import android.os.Bundle
import android.webkit.*
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.planetary.calculator.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {
    
    private lateinit var binding: ActivityMainBinding
    private lateinit var webViewManager: WebViewManager
    private lateinit var locationService: LocationService
    
    companion object {
        private const val LOCATION_PERMISSION_REQUEST = 1001
    }
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        
        setupWebView()
        setupLocationService()
        checkPermissions()
    }
    
    private fun setupWebView() {
        webViewManager = WebViewManager(this, binding.webView)
        
        // Configure WebView for WebAssembly
        binding.webView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            allowFileAccess = true
            allowContentAccess = true
            mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
            cacheMode = WebSettings.LOAD_DEFAULT
        }
        
        // Enable WebAssembly
        binding.webView.settings.setSupportZoom(true)
        binding.webView.settings.builtInZoomControls = true
        binding.webView.settings.displayZoomControls = false
        
        // Load the calculator HTML
        binding.webView.loadUrl("file:///android_asset/calculator.html")
        
        // Handle JavaScript interface
        binding.webView.addJavascriptInterface(WebAppInterface(), "Android")
        
        // Handle WebView errors
        binding.webView.webViewClient = object : WebViewClient() {
            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                // Hide loading indicator when page is loaded
                binding.progressBar.visibility = android.view.View.GONE
            }
            
            override fun onReceivedError(
                view: WebView?,
                request: WebResourceRequest?,
                error: WebResourceError?
            ) {
                super.onReceivedError(view, request, error)
                showError("Failed to load calculator: ${error?.description}")
            }
        }
    }
    
    private fun setupLocationService() {
        locationService = LocationService()
    }
    
    private fun checkPermissions() {
        val permissions = arrayOf(
            Manifest.permission.ACCESS_FINE_LOCATION,
            Manifest.permission.ACCESS_COARSE_LOCATION
        )
        
        val permissionsToRequest = permissions.filter {
            ContextCompat.checkSelfPermission(this, it) != PackageManager.PERMISSION_GRANTED
        }.toTypedArray()
        
        if (permissionsToRequest.isNotEmpty()) {
            ActivityCompat.requestPermissions(
                this,
                permissionsToRequest,
                LOCATION_PERMISSION_REQUEST
            )
        }
    }
    
    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        
        when (requestCode) {
            LOCATION_PERMISSION_REQUEST -> {
                if (grantResults.isNotEmpty() && grantResults.all { it == PackageManager.PERMISSION_GRANTED }) {
                    // Permissions granted, can use location features
                    locationService.startLocationUpdates(this) { latitude, longitude ->
                        updateLocationInWebView(latitude, longitude)
                    }
                } else {
                    // Permissions denied, show explanation
                    showPermissionExplanation()
                }
            }
        }
    }
    
    private fun showPermissionExplanation() {
        MaterialAlertDialogBuilder(this)
            .setTitle("Location Permission")
            .setMessage("Location permission is optional but allows the app to automatically fill in your current coordinates for calculations.")
            .setPositiveButton("OK") { _, _ -> }
            .show()
    }
    
    private fun updateLocationInWebView(latitude: Double, longitude: Double) {
        val script = """
            javascript:(function() {
                // Convert decimal coordinates to degrees, minutes, seconds
                const latDeg = Math.floor(Math.abs(latitude));
                const latMin = Math.floor((Math.abs(latitude) - latDeg) * 60);
                const latSec = Math.round(((Math.abs(latitude) - latDeg - latMin/60) * 3600));
                
                const lonDeg = Math.floor(Math.abs(longitude));
                const lonMin = Math.floor((Math.abs(longitude) - lonDeg) * 60);
                const lonSec = Math.round(((Math.abs(longitude) - lonDeg - lonMin/60) * 3600));
                
                // Update form fields
                document.getElementById('latG').value = latDeg;
                document.getElementById('latM').value = latMin;
                document.getElementById('latS').value = latSec;
                document.getElementById('latNS').value = latitude >= 0 ? 'N' : 'S';
                
                document.getElementById('lonG').value = lonDeg;
                document.getElementById('lonM').value = lonMin;
                document.getElementById('lonS').value = lonSec;
                document.getElementById('lonEW').value = longitude >= 0 ? 'E' : 'W';
            })()
        """.trimIndent()
        
        binding.webView.evaluateJavascript(script, null)
    }
    
    private fun showError(message: String) {
        Toast.makeText(this, message, Toast.LENGTH_LONG).show()
    }
    
    // JavaScript interface for communication between WebView and Android
    inner class WebAppInterface {
        @JavascriptInterface
        fun showToast(message: String) {
            runOnUiThread {
                Toast.makeText(this@MainActivity, message, Toast.LENGTH_SHORT).show()
            }
        }
        
        @JavascriptInterface
        fun getCurrentLocation() {
            if (ContextCompat.checkSelfPermission(
                    this@MainActivity,
                    Manifest.permission.ACCESS_FINE_LOCATION
                ) == PackageManager.PERMISSION_GRANTED
            ) {
                locationService.getCurrentLocation(this@MainActivity) { latitude, longitude ->
                    updateLocationInWebView(latitude, longitude)
                }
            }
        }
        
        @JavascriptInterface
        fun saveCalculation(data: String) {
            // Save calculation result to device storage
            // Implementation can be added here
        }
    }
    
    override fun onBackPressed() {
        if (binding.webView.canGoBack()) {
            binding.webView.goBack()
        } else {
            super.onBackPressed()
        }
    }
    
    override fun onDestroy() {
        locationService.stopLocationUpdates()
        super.onDestroy()
    }
}