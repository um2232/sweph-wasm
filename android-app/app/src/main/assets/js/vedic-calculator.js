// Vedic Astrology Calculator using Swiss Ephemeris WebAssembly
// Supports Surya Siddhanta calculations with Lahiri ayanamsa

class VedicCalculator {
    constructor() {
        this.astroModule = null;
        this.isInitialized = false;
        this.planets = {
            SUN: 0,
            MOON: 1,
            MERCURY: 2,
            VENUS: 3,
            MARS: 4,
            JUPITER: 5,
            SATURN: 6,
            URANUS: 7,
            NEPTUNE: 8,
            PLUTO: 9,
            MEAN_NODE: 10, // Rahu
            TRUE_NODE: 11,  // True Rahu
            MEAN_APOG: 12,  // Mean Apogee
            OSCU_APOG: 13,  // Osculating Apogee
            EARTH: 14,
            CHIRON: 15,
            PHOLUS: 16,
            CERES: 17,
            PALLAS: 18,
            JUNO: 19,
            VESTA: 20,
            INTP_APOG: 21,
            INTP_PERG: 22
        };
        
        this.vedicPlanets = {
            'Surya (Sun)': this.planets.SUN,
            'Chandra (Moon)': this.planets.MOON,
            'Mangal (Mars)': this.planets.MARS,
            'Budh (Mercury)': this.planets.MERCURY,
            'Guru (Jupiter)': this.planets.JUPITER,
            'Shukra (Venus)': this.planets.VENUS,
            'Shani (Saturn)': this.planets.SATURN,
            'Rahu (North Node)': this.planets.MEAN_NODE,
            'Ketu (South Node)': this.planets.MEAN_NODE // Will be calculated as Rahu + 180°
        };
        
        this.rashis = [
            'Mesha (Aries)', 'Vrishabha (Taurus)', 'Mithuna (Gemini)', 'Karka (Cancer)',
            'Simha (Leo)', 'Kanya (Virgo)', 'Tula (Libra)', 'Vrishchika (Scorpio)',
            'Dhanu (Sagittarius)', 'Makara (Capricorn)', 'Kumbha (Aquarius)', 'Meena (Pisces)'
        ];
        
        this.nakshatras = [
            'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
            'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
            'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
            'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana',
            'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
        ];
        
        this.houseSystems = {
            'P': 'Placidus',
            'K': 'Koch',
            'O': 'Porphyrius',
            'R': 'Regiomontanus',
            'C': 'Campanus',
            'A': 'Equal (Whole Sign)',
            'E': 'Equal (Equal House)',
            'V': 'Vehlow',
            'X': 'Axial Rotation',
            'H': 'Horizontal',
            'T': 'Topocentric',
            'B': 'Alcabitus',
            'M': 'Morinus',
            'W': 'Whole Sign'
        };
        
        this.ayanamsas = {
            '0': 'Fagan/Bradley',
            '1': 'Lahiri',
            '3': 'Raman',
            '5': 'Krishnamurti',
            '6': 'Yukteshwar',
            '7': 'JN Bhasin',
            '8': 'Babylonian/Kugler 1',
            '9': 'Babylonian/Kugler 2',
            '10': 'Babylonian/Kugler 3',
            '11': 'Babylonian/Huber',
            '12': 'Babylonian/Eta Piscium',
            '13': 'Babylonian/Aldebaran 15Tau',
            '14': 'Hipparchos',
            '15': 'Sassanian',
            '16': 'Galactic Center 0Sag',
            '17': 'J2000',
            '18': 'J1900',
            '19': 'B1950',
            '20': 'Suryasiddhanta',
            '21': 'Suryasiddhanta (Mean Sun)',
            '22': 'Aryabhata',
            '23': 'Aryabhata (Mean Sun)',
            '24': 'SS Revati',
            '25': 'SS Citra',
            '26': 'True Citra',
            '27': 'True Revati',
            '28': 'True Pushya',
            '29': 'Galactic Center (Gil Brand)',
            '30': 'Galactic Equator (IAU1958)',
            '31': 'Galactic Equator (True)',
            '32': 'Galactic Equator (Mula)',
            '33': 'Skydram (Mardyks)',
            '34': 'True Mula (Chandra Hari)',
            '35': 'Dhruva/Galactic Center (Makara)',
            '36': 'Vedic/Sidereal'
        };
    }
    
    async initialize() {
        try {
            // Load Swiss Ephemeris WebAssembly module
            if (typeof Module !== 'undefined') {
                this.astroModule = Module;
                this.isInitialized = true;
                console.log('Vedic Calculator initialized with Swiss Ephemeris');
                return true;
            } else {
                // Try to load the module dynamically
                const script = document.createElement('script');
                script.src = 'astro.js';
                script.onload = () => {
                    this.astroModule = Module;
                    this.isInitialized = true;
                    console.log('Vedic Calculator initialized with Swiss Ephemeris');
                };
                document.head.appendChild(script);
                return true;
            }
        } catch (error) {
            console.error('Failed to initialize Vedic Calculator:', error);
            return false;
        }
    }
    
    // Convert date and time to Julian Day Number
    dateToJulianDay(year, month, day, hour, minute, second) {
        if (this.astroModule && this.astroModule._swe_julday) {
            return this.astroModule._swe_julday(year, month, day, hour + minute/60 + second/3600, 1);
        }
        
        // Fallback calculation
        const a = Math.floor((14 - month) / 12);
        const y = year + 4800 - a;
        const m = month + 12 * a - 3;
        
        let jd = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
        
        const time = hour + minute / 60 + second / 3600;
        jd += (time - 12) / 24;
        
        return jd;
    }
    
    // Calculate planetary positions
    calculatePlanetPosition(planetId, julianDay, ayanamsa = 1) {
        if (!this.isInitialized || !this.astroModule) {
            throw new Error('Vedic Calculator not initialized');
        }
        
        try {
            // Allocate memory for result
            const resultPtr = this.astroModule._malloc(6 * 8); // 6 doubles
            
            // Set ayanamsa
            this.astroModule._swe_set_sid_mode(ayanamsa, 0, 0);
            
            // Calculate planet position
            const flags = 0; // Default flags
            const result = this.astroModule._swe_calc_ut(julianDay, planetId, flags, resultPtr);
            
            if (result < 0) {
                throw new Error(`Error calculating planet ${planetId}: ${result}`);
            }
            
            // Read results from memory
            const longitude = this.astroModule.getValue(resultPtr, 'double');
            const latitude = this.astroModule.getValue(resultPtr + 8, 'double');
            const distance = this.astroModule.getValue(resultPtr + 16, 'double');
            const longitudeSpeed = this.astroModule.getValue(resultPtr + 24, 'double');
            const latitudeSpeed = this.astroModule.getValue(resultPtr + 32, 'double');
            const distanceSpeed = this.astroModule.getValue(resultPtr + 40, 'double');
            
            // Free memory
            this.astroModule._free(resultPtr);
            
            return {
                longitude: longitude,
                latitude: latitude,
                distance: distance,
                longitudeSpeed: longitudeSpeed,
                latitudeSpeed: latitudeSpeed,
                distanceSpeed: distanceSpeed
            };
        } catch (error) {
            console.error('Error in calculatePlanetPosition:', error);
            return null;
        }
    }
    
    // Calculate houses
    calculateHouses(julianDay, latitude, longitude, houseSystem = 'P') {
        if (!this.isInitialized || !this.astroModule) {
            throw new Error('Vedic Calculator not initialized');
        }
        
        try {
            // Allocate memory for result
            const cuspsPtr = this.astroModule._malloc(13 * 8); // 13 house cusps
            const ascmcPtr = this.astroModule._malloc(10 * 8); // 10 angles
            
            // Calculate houses
            const result = this.astroModule._swe_houses_ex(
                julianDay,
                0, // flags
                latitude,
                longitude,
                houseSystem.charCodeAt(0),
                cuspsPtr,
                ascmcPtr
            );
            
            if (result < 0) {
                throw new Error(`Error calculating houses: ${result}`);
            }
            
            // Read house cusps
            const cusps = [];
            for (let i = 0; i < 13; i++) {
                cusps.push(this.astroModule.getValue(cuspsPtr + i * 8, 'double'));
            }
            
            // Read angles (Ascendant, MC, etc.)
            const ascmc = [];
            for (let i = 0; i < 10; i++) {
                ascmc.push(this.astroModule.getValue(ascmcPtr + i * 8, 'double'));
            }
            
            // Free memory
            this.astroModule._free(cuspsPtr);
            this.astroModule._free(ascmcPtr);
            
            return { cusps, ascmc };
        } catch (error) {
            console.error('Error in calculateHouses:', error);
            return null;
        }
    }
    
    // Get Rashi (Zodiac sign) from longitude
    getRashi(longitude) {
        const rashiIndex = Math.floor(longitude / 30);
        return this.rashis[rashiIndex % 12];
    }
    
    // Get Nakshatra from longitude
    getNakshatra(longitude) {
        const nakshatraIndex = Math.floor(longitude * 27 / 360);
        return this.nakshatras[nakshatraIndex % 27];
    }
    
    // Format longitude to degrees, minutes, seconds
    formatLongitude(longitude) {
        const degrees = Math.floor(longitude);
        const minutes = Math.floor((longitude - degrees) * 60);
        const seconds = Math.round(((longitude - degrees - minutes / 60) * 3600));
        
        return `${degrees}° ${minutes}' ${seconds}"`;
    }
    
    // Main calculation function
    async calculateVedicChart(formData) {
        try {
            if (!this.isInitialized) {
                await this.initialize();
            }
            
            // Parse form data
            const { date, time, lonG, lonM, lonS, lonEW, latG, latM, latS, latNS, houseSystem, ayanamsa } = formData;
            
            // Convert date/time to Julian Day
            const [year, month, day] = date.split('-').map(Number);
            const [hour, minute] = time.split(':').map(Number);
            const julianDay = this.dateToJulianDay(year, month, day, hour, minute, 0);
            
            // Convert coordinates to decimal
            const longitude = (lonG + lonM / 60 + lonS / 3600) * (lonEW === 'E' ? 1 : -1);
            const latitude = (latG + latM / 60 + latS / 3600) * (latNS === 'N' ? 1 : -1);
            
            // Calculate planetary positions
            const planets = [];
            for (const [planetName, planetId] of Object.entries(this.vedicPlanets)) {
                const position = this.calculatePlanetPosition(planetId, julianDay, parseInt(ayanamsa));
                
                if (position) {
                    const rashi = this.getRashi(position.longitude);
                    const nakshatra = this.getNakshatra(position.longitude);
                    
                    planets.push({
                        name: planetName,
                        longitude: position.longitude,
                        latitude: position.latitude,
                        distance: position.distance,
                        speed: position.longitudeSpeed,
                        rashi: rashi,
                        nakshatra: nakshatra,
                        formattedLongitude: this.formatLongitude(position.longitude)
                    });
                }
            }
            
            // Calculate Ketu (opposite to Rahu)
            const rahu = planets.find(p => p.name === 'Rahu (North Node)');
            if (rahu) {
                const ketuLongitude = (rahu.longitude + 180) % 360;
                const ketuRashi = this.getRashi(ketuLongitude);
                const ketuNakshatra = this.getNakshatra(ketuLongitude);
                
                planets.push({
                    name: 'Ketu (South Node)',
                    longitude: ketuLongitude,
                    latitude: 0,
                    distance: 0,
                    speed: rahu.speed,
                    rashi: ketuRashi,
                    nakshatra: ketuNakshatra,
                    formattedLongitude: this.formatLongitude(ketuLongitude)
                });
            }
            
            // Calculate houses
            const houses = this.calculateHouses(julianDay, latitude, longitude, houseSystem);
            
            if (houses) {
                const houseNames = [
                    '1st House (Lagna)', '2nd House', '3rd House', '4th House',
                    '5th House', '6th House', '7th House', '8th House',
                    '9th House', '10th House', '11th House', '12th House'
                ];
                
                const houseData = houses.cusps.slice(1, 13).map((cusp, index) => ({
                    name: houseNames[index],
                    longitude: cusp,
                    rashi: this.getRashi(cusp),
                    formattedLongitude: this.formatLongitude(cusp)
                }));
                
                return {
                    planets: planets,
                    houses: houseData,
                    lagna: houseData[0],
                    mc: houses.ascmc[1], // Medium Coeli
                    ayanamsa: this.ayanamsas[ayanamsa],
                    houseSystem: this.houseSystems[houseSystem],
                    julianDay: julianDay,
                    latitude: latitude,
                    longitude: longitude,
                    date: date,
                    time: time
                };
            }
            
            return null;
        } catch (error) {
            console.error('Error in calculateVedicChart:', error);
            throw error;
        }
    }
    
    // Get planetary dignities and aspects
    getPlanetaryDignities(planet, chart) {
        const dignities = {
            exaltation: false,
            debilitation: false,
            ownSign: false,
            friendlySign: false,
            enemySign: false
        };
        
        // Planetary exaltation and debilitation points (Vedic)
        const exaltationPoints = {
            'Surya (Sun)': 10, // Aries 10°
            'Chandra (Moon)': 33, // Taurus 3°
            'Mangal (Mars)': 298, // Capricorn 28°
            'Budh (Mercury)': 165, // Virgo 15°
            'Guru (Jupiter)': 95, // Cancer 5°
            'Shukra (Venus)': 357, // Pisces 27°
            'Shani (Saturn)': 200, // Libra 20°
            'Rahu (North Node)': 75, // Gemini 15°
            'Ketu (South Node)': 255 // Sagittarius 15°
        };
        
        const debilitationPoints = {
            'Surya (Sun)': 190, // Libra 10°
            'Chandra (Moon)': 213, // Scorpio 3°
            'Mangal (Mars)': 118, // Cancer 28°
            'Budh (Mercury)': 345, // Pisces 15°
            'Guru (Jupiter)': 275, // Capricorn 5°
            'Shukra (Venus)': 177, // Virgo 27°
            'Shani (Saturn)': 20, // Aries 20°
            'Rahu (North Node)': 255, // Sagittarius 15°
            'Ketu (South Node)': 75 // Gemini 15°
        };
        
        const exaltationPoint = exaltationPoints[planet.name];
        const debilitationPoint = debilitationPoints[planet.name];
        
        if (exaltationPoint) {
            const diff = Math.abs(planet.longitude - exaltationPoint);
            dignities.exaltation = diff <= 5; // Within 5° of exaltation point
        }
        
        if (debilitationPoint) {
            const diff = Math.abs(planet.longitude - debilitationPoint);
            dignities.debilitation = diff <= 5; // Within 5° of debilitation point
        }
        
        return dignities;
    }
    
    // Calculate planetary aspects (Vedic)
    getPlanetaryAspects(planet1, planet2) {
        const aspects = {
            conjunction: false,
            opposition: false,
            trine: false,
            square: false,
            sextile: false
        };
        
        const diff = Math.abs(planet1.longitude - planet2.longitude);
        
        // Conjunction (0°)
        aspects.conjunction = diff <= 10;
        
        // Opposition (180°)
        aspects.opposition = Math.abs(diff - 180) <= 10;
        
        // Trine (120°)
        aspects.trine = Math.abs(diff - 120) <= 10 || Math.abs(diff - 240) <= 10;
        
        // Square (90°)
        aspects.square = Math.abs(diff - 90) <= 10 || Math.abs(diff - 270) <= 10;
        
        // Sextile (60°)
        aspects.sextile = Math.abs(diff - 60) <= 10 || Math.abs(diff - 300) <= 10;
        
        return aspects;
    }
}

// Export for use in HTML
window.VedicCalculator = VedicCalculator;