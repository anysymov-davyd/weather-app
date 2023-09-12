const 
    color_palette = {
        sky: {
            'classic__morning-day': '#E8FFFF',
            'classic__evening': '#5C5B52',
            'classic__night': '#2d3339',

            'clouds__morning-day': '#989898',
            'clouds__evening': '#6A6A6A',

            'rain__morning-day': '#4E4E4E',
            'rain__evening': '#3A3A3A',
            'rain__night': '#242A30',

            'cold__evening': '#486969',

            'frozen__morning-day': '#ADBFBF',
        },

        ground: {
            'classic__morning-day': [ '#192D26', '#203D34', '#3D564A' ],
            'classic__evening': [ '#1A1C12', '#1E2315', '#1E2315' ],
            'classic__night': [ '#13171A', '#1C2026', '#22282E' ],

            'clouds__morning-day': [ '#191E1C', '#202725', '#28322D' ],
            'clouds__evening': [ '#191E1C', '#202725', '#28322D' ],

            'rain__morning-day': [ '#191E1C', '#1B2220', '#202725' ],
            'rain__evening': [ '#141917', '#1B2220', '#232D28' ],

            'cold__morning-day': [ '#242C34', '#2D3541', '#3E505E' ],
            'cold__evening': [ '#101820', '#19212D', '#2A3C4A' ],

            'frozen__morning-day': [ '#2A2D30', '#3E4248', '#576067' ],
            'frozen__evening': [ '#1D2124', '#262B32', '#42494F' ],
            'frozen__night': [ '#121415', '#1C1D20', '#292B2E' ]
        }
    },

    weather_themes = {
        'warm_clear_morning-day': {
            sky: color_palette.sky['classic__morning-day'],
            ground: color_palette.ground['classic__morning-day']
        },
        'warm_clear_evening': {
            sky: color_palette.sky.classic__evening,
            ground: color_palette.ground.classic__evening
        },
        'warm_clear_night': {
            sky: color_palette.sky.classic__night,
            ground: color_palette.ground.classic__night
        },
        'warm_clouds_morning-day': {
            sky: color_palette.sky['clouds__morning-day'],
            ground: color_palette.ground['clouds__morning-day']
        },
        'warm_clouds_evening': {
            sky: color_palette.sky['clouds__evening'],
            ground: color_palette.ground['clouds__evening']
        },
        'warm_clouds_night': {
            sky: color_palette.sky.classic__night,
            ground: color_palette.ground.classic__night
        },
        'warm_rain_morning-day': {
            sky: color_palette.sky['rain__morning-day'],
            ground: color_palette.ground['rain__morning-day']
        },
        'warm_rain_evening': {
            sky: color_palette.sky.rain__evening,
            ground: color_palette.ground.rain__evening
        },
        'warm_rain_night': {
            sky: color_palette.sky.rain__night,
            ground: color_palette.ground.classic__night
        },
        'cold_clear_morning-day': {
            sky: color_palette.sky["classic__morning-day"],
            ground: color_palette.ground["cold__morning-day"]
        },
        'cold_clear_evening': {
            sky: color_palette.sky.cold__evening,
            ground: color_palette.ground.cold__evening
        },
        'cold_clear_night': {
            sky: color_palette.sky.classic__night,
            ground: color_palette.ground.classic__night
        },
        'cold_clouds_morning-day': {
            sky: color_palette.sky["clouds__morning-day"],
            ground: color_palette.ground["cold__morning-day"]
        },
        'cold_clouds_evening': {
            sky: color_palette.sky.clouds__evening,
            ground: color_palette.ground.cold__evening
        },
        'cold_clouds_night': {
            sky: color_palette.sky.classic__night,
            ground: color_palette.ground.classic__night
        },
        'cold_rain_morning-day': {
            sky: color_palette.sky["rain__morning-day"],
            ground: color_palette.ground["cold__morning-day"]
        },
        'cold_rain_evening': {
            sky: color_palette.sky.rain__evening,
            ground: color_palette.ground.cold__evening
        },
        'cold_rain_night': {
            sky: color_palette.sky.rain__night,
            ground: color_palette.ground.classic__night
        },
        'frozen_clear_morning-day': {
            sky: color_palette.sky["frozen__morning-day"],
            ground: color_palette.ground["frozen__morning-day"]
        },
        'frozen_clear_evening': {
            sky: color_palette.sky.cold__evening,
            ground: color_palette.ground.frozen__evening
        },
        'frozen_clear_night': {
            sky: color_palette.sky.classic__night,
            ground: color_palette.ground.frozen__night
        },
        'frozen_clouds_morning-day': {
            sky: color_palette.sky["clouds__morning-day"],
            ground: color_palette.ground["frozen__morning-day"]
        },
        'frozen_clouds_evening': {
            sky: color_palette.sky.clouds__evening,
            ground: color_palette.ground.frozen__evening
        },
        'frozen_clouds_night': {
            sky: color_palette.sky.classic__night,
            ground: color_palette.ground.frozen__night
        },
        'frozen_rain_morning-day': {
            sky: color_palette.sky["clouds__morning-day"],
            ground: color_palette.ground["frozen__morning-day"]
        },
        'frozen_rain_evening': {
            sky: color_palette.sky.clouds__evening,
            ground: color_palette.ground.frozen__evening
        },
        'frozen_rain_night': {
            sky: color_palette.sky.classic__night,
            ground: color_palette.ground.frozen__night
        },
        'snowy_peaks': ['#D9D9D9', '#B4B4B4', '#999999']
    }

export default weather_themes
