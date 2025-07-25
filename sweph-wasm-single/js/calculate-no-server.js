// Global variable to store the Module
var astroModule = null;

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

    // Show loading indicator
    $("#loadingDiv").show();
    $("#btnCalculate").prop('disabled', true);

    // Initialize the WebAssembly module
    initializeAstroModule();

    // Set up calculate button
    $("#btnCalculate").on("click", function () {
        if (!astroModule) {
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
        $("#resultDiv").html("");

        // Perform calculation in a setTimeout to prevent UI blocking
        setTimeout(function() {
            performCalculation();
        }, 10);
    });
});

function initializeAstroModule() {
    // Configure the Module
    window.Module = {
        locateFile: function (s) {
            return s;
        },
        onRuntimeInitialized: function () {
            console.log("Swiss Ephemeris module loaded successfully!");
            astroModule = window.Module;
            
            // Hide loading, show success message
            $("#loadingDiv").hide();
            $("#successMessage").show();
            $("#btnCalculate").prop('disabled', false);
            
            // Hide success message after 3 seconds
            setTimeout(function() {
                $("#successMessage").fadeOut();
            }, 3000);
        },
        onError: function(error) {
            console.error("Error loading Swiss Ephemeris module:", error);
            $("#loadingDiv").hide();
            showError("Failed to load Swiss Ephemeris module. Please refresh the page.");
        }
    };
}

function performCalculation() {
    try {
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