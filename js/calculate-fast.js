// Global variable to store the Module
var astroModule = null;
var moduleLoaded = false;
var loadingStartTime = Date.now();

// Preload the data file for faster loading
function preloadDataFile() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'js/astro.data', true);
        xhr.responseType = 'arraybuffer';
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                console.log('Data file preloaded successfully');
                resolve(xhr.response);
            } else {
                reject(new Error('Failed to preload data file'));
            }
        };
        
        xhr.onerror = function() {
            reject(new Error('Network error while preloading data file'));
        };
        
        xhr.send();
    });
}

// Initialize the application when the page loads
$(document).ready(function () {
    // Set default values
    $("#initDate").val(moment().format("YYYY-MM-DD"));
    $("#initTime").val(moment().format("HH:mm"));

    $("#lonG").val("9");
    $("#lonM").val("9");
    $("#lonS").val("34");
    $("#latG").val("45");
    $("#latM").val("27");
    $("#latS").val("40");

    // Show loading indicator with progress
    $("#loadingDiv").show();
    $("#btnCalculate").prop('disabled', true);
    
    // Update loading message
    updateLoadingMessage("Initializing...");

    // Start preloading and initialization
    initializeFast();
});

function updateLoadingMessage(message) {
    const loadingDiv = $("#loadingDiv");
    loadingDiv.find("p").text(message);
}

function initializeFast() {
    // Start preloading data file immediately
    const preloadPromise = preloadDataFile();
    
    // Configure the Module with optimizations
    window.Module = {
        locateFile: function (s) {
            return s;
        },
        
        // Preload the data file
        getPreloadedPackage: function(remotePackageName, remotePackageSize) {
            return preloadPromise.then(data => {
                console.log('Using preloaded data file');
                return data;
            }).catch(() => {
                console.log('Falling back to normal loading');
                return null;
            });
        },
        
        // Optimize memory allocation
        INITIAL_MEMORY: 16777216, // 16MB initial memory
        MAXIMUM_MEMORY: 268435456, // 256MB max memory
        
        // Disable unnecessary features for faster loading
        print: function(text) {
            // Disable console output for faster loading
        },
        printErr: function(text) {
            // Only log actual errors
            if (text && !text.includes('warning')) {
                console.error('WASM Error:', text);
            }
        },
        
        onRuntimeInitialized: function () {
            const loadTime = Date.now() - loadingStartTime;
            console.log(`Swiss Ephemeris module loaded in ${loadTime}ms!`);
            astroModule = window.Module;
            moduleLoaded = true;
            
            // Hide loading, show success message
            $("#loadingDiv").hide();
            $("#successMessage").show();
            $("#btnCalculate").prop('disabled', false);
            
            // Show load time in success message
            $("#successMessage").html(`<strong>✅ Ready!</strong> Loaded in ${loadTime}ms. The application is ready for calculations.`);
            
            // Hide success message after 3 seconds
            setTimeout(function() {
                $("#successMessage").fadeOut();
            }, 3000);
        },
        
        onError: function(error) {
            console.error("Error loading Swiss Ephemeris module:", error);
            $("#loadingDiv").hide();
            showError("Failed to load Swiss Ephemeris module. Please refresh the page.");
        },
        
        // Progress callback for better UX
        setStatus: function(text) {
            if (text && text.includes('Downloading')) {
                updateLoadingMessage(text);
            }
        }
    };
    
    // Start loading the WASM module
    updateLoadingMessage("Loading Swiss Ephemeris module...");
}

// Set up calculate button with optimized handling
$(document).on('click', '#btnCalculate', function () {
    if (!moduleLoaded) {
        showError("Swiss Ephemeris module not loaded yet. Please wait...");
        return;
    }

    var jsonError = validateInput();
    if (jsonError.error === true) {
        showError(jsonError.message);
        return;
    }

    // Show loading for calculation
    $("#loadingDiv").show();
    updateLoadingMessage("Calculating planetary positions...");
    $("#resultDiv").html("");

    // Use requestAnimationFrame for smooth UI
    requestAnimationFrame(function() {
        performCalculation();
    });
});

function performCalculation() {
    try {
        const startTime = performance.now();
        
        var iYear, iMonth, iDay, iHour, iMinute, iSecond, iLonG, iLonM, iLonS, sLonEW, iLatG, iLatM, iLatS, sLatNS, sHouse;

        var mDate = moment($("#initDate").val(), "YYYY-MM-DD");
        iYear = mDate.year();
        iMonth = mDate.month() + 1;
        iDay = mDate.date();

        var mTime = moment($("#initTime").val(), "HH:mm");
        iHour = mTime.hour();
        iMinute = mTime.minute();
        iSecond = mTime.second();

        iLonG = parseInt($("#lonG").val(), 10);
        iLonM = parseInt($("#lonM").val(), 10);
        iLonS = parseInt($("#lonS").val(), 10);
        sLonEW = $("#lonEW").val();
        iLatG = parseInt($("#latG").val(), 10);
        iLatM = parseInt($("#latM").val(), 10);
        iLatS = parseInt($("#latS").val(), 10);
        sLatNS = $("#latNS").val();

        sHouse = $("#houseSystem").val();

        // Call the WebAssembly function directly
        var result = astroModule.ccall(
            "get",
            "string",
            ["number", "number", "number", "number", "number", "number", "number", "number", "number", "string", "number", "number", "number", "string", "string"],
            [iYear, iMonth, iDay, iHour, iMinute, iSecond, iLonG, iLonM, iLonS, sLonEW, iLatG, iLatM, iLatS, sLatNS, sHouse]
        );

        const calcTime = performance.now() - startTime;
        console.log(`Calculation completed in ${calcTime.toFixed(2)}ms`);

        // Parse and display the result
        var jsonResult = JSON.parse(result);
        var sResult = createResult(jsonResult);
        $("#resultDiv").html(sResult);
        
        // Hide loading
        $("#loadingDiv").hide();
        
    } catch (error) {
        console.error("Calculation error:", error);
        $("#loadingDiv").hide();
        showError("Calculation failed: " + error.message);
    }
}

function validateInput() {
    var jsonError = {};
    jsonError.error = false;
    jsonError.message = "";

    // Date
    var bDtValid = moment($("#initDate").val(), "YYYY-MM-DD").isValid();
    if (bDtValid === false) {
        jsonError.error = true;
        jsonError.message = "Invalid date";
        return jsonError;
    } else {
        var dtYear = moment($("#initDate").val(), "YYYY-MM-DD").year();
        if (dtYear < 1800 || dtYear > 2400) {
            jsonError.error = true;
            jsonError.message = "Invalid date";
            return jsonError;
        }
    }

    //Time
    var bDtValid = moment($("#initTime").val(), "HH:mm").isValid();
    if (bDtValid === false) {
        jsonError.error = true;
        jsonError.message = "Invalid time";
        return jsonError;
    }

    //Longitude
    var iLonG = parseInt($("#lonG").val(), 10);
    var iLonM = parseInt($("#lonM").val(), 10);
    var iLonS = parseInt($("#lonS").val(), 10);
    if (isNaN(iLonG) === true || iLonG < 0 || iLonG > 179 || isNaN(iLonM) === true || iLonM < 0 || (iLonM > 59) | (isNaN(iLonS) === true) || iLonS < 0 || iLonS > 59) {
        jsonError.error = true;
        jsonError.message = "Invalid longitude";
    }

    // Latitude
    var iLatG = parseInt($("#latG").val(), 10);
    var iLatM = parseInt($("#latM").val(), 10);
    var iLatS = parseInt($("#latS").val(), 10);
    if (isNaN(iLatG) === true || iLatG < 0 || iLatG > 89 || isNaN(iLatM) === true || iLatM < 0 || (iLatM > 59) | (isNaN(iLatS) === true) || iLatS < 0 || iLatS > 59) {
        jsonError.error = true;
        jsonError.message = "Invalid latitude";
    }

    return jsonError;
}

function createResult(jsonResult) {
    var sHtml = "";
    sHtml = sHtml + "<table class='myTable'><thead><tr><th>Planet</th><th>Longitude</th><th>Latitude</th><th>Distance</th><th>Speed</th></tr></thead>";
    sHtml = sHtml + "<tbody>";
    for (var i = 0; i < jsonResult.planets.length; i++) {
        sHtml = sHtml + "<tr>";
        sHtml = sHtml + "<td>" + jsonResult.planets[i].name + "</td>";
        sHtml = sHtml + "<td>" + jsonResult.planets[i].long_s + "</td>";
        sHtml = sHtml + "<td>" + jsonResult.planets[i].lat + "</td>";
        sHtml = sHtml + "<td>" + jsonResult.planets[i].distance + "</td>";
        sHtml = sHtml + "<td>" + jsonResult.planets[i].speed + "</td>";
        sHtml = sHtml + "</tr>";
    }
    sHtml = sHtml + "<tr>";
    sHtml = sHtml + "<td colspan='5'>    </td>";
    sHtml = sHtml + "</tr>";
    sHtml = sHtml + "<tr>";
    sHtml = sHtml + "<td>" + jsonResult.ascmc[0].name + "</td>";
    sHtml = sHtml + "<td>" + jsonResult.ascmc[0].long_s + "</td>";
    sHtml = sHtml + "<td></td>";
    sHtml = sHtml + "<td></td>";
    sHtml = sHtml + "<td></td>";
    sHtml = sHtml + "</tr>";
    sHtml = sHtml + "<tr>";
    sHtml = sHtml + "<td>" + jsonResult.ascmc[1].name + "</td>";
    sHtml = sHtml + "<td>" + jsonResult.ascmc[1].long_s + "</td>";
    sHtml = sHtml + "<td></td>";
    sHtml = sHtml + "<td></td>";
    sHtml = sHtml + "<td></td>";
    sHtml = sHtml + "</tr>";
    sHtml = sHtml + "<tr>";
    sHtml = sHtml + "<td colspan='5'>    </td>";
    sHtml = sHtml + "</tr>";

    for (var i = 0; i < jsonResult.house.length; i++) {
        sHtml = sHtml + "<tr>";
        sHtml = sHtml + "<td>House " + jsonResult.house[i].name + "</td>";
        sHtml = sHtml + "<td>" + jsonResult.house[i].long_s + "</td>";
        sHtml = sHtml + "<td></td>";
        sHtml = sHtml + "<td></td>";
        sHtml = sHtml + "<td></td>";
        sHtml = sHtml + "</tr>";
    }
    sHtml = sHtml + "</tbody></table>";
    return sHtml;
}

function showError(message) {
    const toastLiveExample = document.getElementById("liveToast");
    const toast = new bootstrap.Toast(toastLiveExample);
    $("#toastbody").html(message);
    toast.show();
}