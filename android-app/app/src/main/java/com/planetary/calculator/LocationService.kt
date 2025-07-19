package com.planetary.calculator

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.location.Location
import android.location.LocationListener
import android.location.LocationManager
import android.os.Bundle
import android.util.Log
import androidx.core.app.ActivityCompat
import java.util.concurrent.Executors
import java.util.concurrent.ScheduledExecutorService
import java.util.concurrent.TimeUnit

class LocationService {
    
    companion object {
        private const val TAG = "LocationService"
        private const val LOCATION_UPDATE_INTERVAL = 30000L // 30 seconds
        private const val LOCATION_UPDATE_DISTANCE = 10f // 10 meters
    }
    
    private var locationManager: LocationManager? = null
    private var locationListener: LocationListener? = null
    private var scheduledExecutor: ScheduledExecutorService? = null
    private var currentLocationCallback: ((Double, Double) -> Unit)? = null
    
    fun startLocationUpdates(context: Context, callback: (Double, Double) -> Unit) {
        if (ActivityCompat.checkSelfPermission(
                context,
                Manifest.permission.ACCESS_FINE_LOCATION
            ) != PackageManager.PERMISSION_GRANTED
        ) {
            Log.w(TAG, "Location permission not granted")
            return
        }
        
        currentLocationCallback = callback
        locationManager = context.getSystemService(Context.LOCATION_SERVICE) as LocationManager
        
        locationListener = object : LocationListener {
            override fun onLocationChanged(location: Location) {
                Log.d(TAG, "Location updated: ${location.latitude}, ${location.longitude}")
                currentLocationCallback?.invoke(location.latitude, location.longitude)
            }
            
            override fun onStatusChanged(provider: String?, status: Int, extras: Bundle?) {
                Log.d(TAG, "Location status changed: $provider, $status")
            }
            
            override fun onProviderEnabled(provider: String?) {
                Log.d(TAG, "Location provider enabled: $provider")
            }
            
            override fun onProviderDisabled(provider: String?) {
                Log.d(TAG, "Location provider disabled: $provider")
            }
        }
        
        try {
            // Request location updates from GPS and network providers
            val providers = listOf(
                LocationManager.GPS_PROVIDER,
                LocationManager.NETWORK_PROVIDER
            ).filter { locationManager?.isProviderEnabled(it) == true }
            
            if (providers.isNotEmpty()) {
                providers.forEach { provider ->
                    locationManager?.requestLocationUpdates(
                        provider,
                        LOCATION_UPDATE_INTERVAL,
                        LOCATION_UPDATE_DISTANCE,
                        locationListener!!
                    )
                }
                Log.d(TAG, "Location updates started for providers: $providers")
            } else {
                Log.w(TAG, "No location providers available")
            }
        } catch (e: SecurityException) {
            Log.e(TAG, "Security exception while requesting location updates", e)
        } catch (e: Exception) {
            Log.e(TAG, "Error starting location updates", e)
        }
    }
    
    fun getCurrentLocation(context: Context, callback: (Double, Double) -> Unit) {
        if (ActivityCompat.checkSelfPermission(
                context,
                Manifest.permission.ACCESS_FINE_LOCATION
            ) != PackageManager.PERMISSION_GRANTED
        ) {
            Log.w(TAG, "Location permission not granted")
            return
        }
        
        locationManager = context.getSystemService(Context.LOCATION_SERVICE) as LocationManager
        
        try {
            // Try to get last known location from different providers
            val providers = listOf(
                LocationManager.GPS_PROVIDER,
                LocationManager.NETWORK_PROVIDER
            )
            
            var bestLocation: Location? = null
            
            providers.forEach { provider ->
                if (locationManager?.isProviderEnabled(provider) == true) {
                    val location = locationManager?.getLastKnownLocation(provider)
                    if (location != null) {
                        if (bestLocation == null || location.accuracy < bestLocation!!.accuracy) {
                            bestLocation = location
                        }
                    }
                }
            }
            
            if (bestLocation != null) {
                Log.d(TAG, "Got current location: ${bestLocation!!.latitude}, ${bestLocation!!.longitude}")
                callback(bestLocation!!.latitude, bestLocation!!.longitude)
            } else {
                Log.w(TAG, "No location available")
                // Fallback to a default location (Milan, Italy)
                callback(45.4614, 9.1899)
            }
        } catch (e: SecurityException) {
            Log.e(TAG, "Security exception while getting current location", e)
            // Fallback to default location
            callback(45.4614, 9.1899)
        } catch (e: Exception) {
            Log.e(TAG, "Error getting current location", e)
            // Fallback to default location
            callback(45.4614, 9.1899)
        }
    }
    
    fun stopLocationUpdates() {
        try {
            locationListener?.let { listener ->
                locationManager?.removeUpdates(listener)
            }
            locationListener = null
            locationManager = null
            currentLocationCallback = null
            
            scheduledExecutor?.shutdown()
            scheduledExecutor = null
            
            Log.d(TAG, "Location updates stopped")
        } catch (e: Exception) {
            Log.e(TAG, "Error stopping location updates", e)
        }
    }
    
    fun isLocationEnabled(context: Context): Boolean {
        locationManager = context.getSystemService(Context.LOCATION_SERVICE) as LocationManager
        return locationManager?.isProviderEnabled(LocationManager.GPS_PROVIDER) == true ||
               locationManager?.isProviderEnabled(LocationManager.NETWORK_PROVIDER) == true
    }
    
    fun getLocationAccuracy(context: Context): Float {
        if (ActivityCompat.checkSelfPermission(
                context,
                Manifest.permission.ACCESS_FINE_LOCATION
            ) != PackageManager.PERMISSION_GRANTED
        ) {
            return -1f
        }
        
        locationManager = context.getSystemService(Context.LOCATION_SERVICE) as LocationManager
        
        try {
            val providers = listOf(
                LocationManager.GPS_PROVIDER,
                LocationManager.NETWORK_PROVIDER
            )
            
            var bestAccuracy = Float.MAX_VALUE
            
            providers.forEach { provider ->
                if (locationManager?.isProviderEnabled(provider) == true) {
                    val location = locationManager?.getLastKnownLocation(provider)
                    if (location != null && location.accuracy < bestAccuracy) {
                        bestAccuracy = location.accuracy
                    }
                }
            }
            
            return if (bestAccuracy == Float.MAX_VALUE) -1f else bestAccuracy
        } catch (e: Exception) {
            Log.e(TAG, "Error getting location accuracy", e)
            return -1f
        }
    }
}