import React, { useState, useEffect } from 'react'

import './../styles/Background.css'

import weather_themes from '../color_palette'

const Background = ({ data, isForwardBackground = false }) => {
    const [weatherData, setWeatherData] = useState({
        temperature: null,
        timezone: null,
        id: null
    })

    const [palette, setPalette] = useState(null)
    
    const [currentHour, setCurrentHour] = useState(0)

    const weatherConditions = [
        {
            name: 'clear',
            idSet: [800, 600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622]
        },
        {
            name: 'clouds',
            idSet: [801, 802, 803, 804, 701, 711, 721, 741, 771, 781, 300, 301, 302, 310, 311, 312, 313, 314, 321]
        },
        {
            name: 'rain',
            idSet: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232, 500, 501, 502, 503, 504, 511, 520, 521, 522, 531, 731, 751, 761, 762]
        }
    ]

    const particleConditions = {
        isFoggy: Number(String(weatherData.id)[0]) === 3 || [701, 721, 741].includes(weatherData.id),
        isDusty: [711, 731, 751, 761, 762, 781].includes(weatherData.id),
        isSnowing: Number(String(weatherData.id)[0]) === 6,
        isRaining: [2, 5].includes(Number(String(weatherData.id)[0]))
    }

    // Every time, when data is recieved, define new palette
    useEffect(() => {
        if(data !== null){
            setWeatherData(data)

            const hours = Number(
                new Date().toLocaleString('en-GB', { timeZone: data.timezone })
                .split(', ')[1].split(':')[0]
            )

            setCurrentHour(hours)

            const paletteParts = {
                temperature:
                    data.temperature < 0 ? 'frozen' :
                    data.temperature >= 0 && data.temperature <= 10 ? 'cold' :
                    'warm',
                time:
                    hours >= 0 && hours < 6 ? 'night' :
                    hours >= 6 && hours < 18 ? 'morning-day' :
                    'evening',
                weather: 'clear',
            }

            weatherConditions.forEach(elem => {
                elem.idSet.forEach(id => {
                    if(id === data.id) {
                        paletteParts.weather = elem.name
                    }
                })
            })
            
            setPalette(`${paletteParts.temperature}_${paletteParts.weather}_${paletteParts.time}`)
        }
    }, [data])

    const rainParticles = () => {
        let items = []
        for(let i = 0; i < 50; ++i) {
            const x = (Math.random() * 950) - 100
            const dur = 0.5
            const begin = Math.random() * (dur * 4)
            items.push(
                <line key={i} stroke="white" strokeOpacity="0.1" strokeWidth="1">
                    <animate
                        attributeName='y1'
                        from='0'
                        to='500'
                        dur={`${dur}s`}
                        begin={begin}
                        repeatCount='indefinite'
                    />
                    <animate
                        attributeName='y2'
                        from='-40'
                        to='460'
                        dur={`${dur}s`}
                        begin={begin}
                        repeatCount='indefinite'
                    />
                    <animate
                        attributeName='x1'
                        from={x + 10}
                        to={x + 110}
                        dur={`${dur}s`}
                        begin={begin}
                        repeatCount='indefinite'
                    />
                    <animate
                        attributeName='x2'
                        from={x}
                        to={x + 100}
                        dur={`${dur}s`}
                        begin={begin}
                        repeatCount='indefinite'
                    />
                </line>
            )
        }
        return(
            <g className='--animation' style={{ opacity: particleConditions.isRaining ? 1 : 0 }} clipPath="url(#clip0_81_4)">
                { items }
            </g>
        )
    }

    const snowParticles = () => {
        let items = []
        for(let i = 0; i < 100; ++i) {
            const x = (Math.random() * 950) - 100
            const dur = 8
            const begin = Math.random() * (dur * 4)
            const r = 2
            items.push(
                <circle key={i} r={r} fill="white" fillOpacity="0.5">
                    <animate
                        attributeName='cy'
                        from='0'
                        to='500'
                        dur={`${dur}s`}
                        begin={begin}
                        repeatCount='indefinite'
                    />
                    <animate
                        attributeName='cx'
                        from={x}
                        to={x + 100}
                        dur={`${dur}s`}
                        begin={begin}
                        repeatCount='indefinite'
                    />
                </circle>
            )
        }
        return(
            <g className='--animation' style={{ opacity: particleConditions.isSnowing ? 1 : 0 }} clipPath="url(#clip0_81_4)">
                { items }
            </g>
        )
    }

    return (
        <div
            style={{ background: palette ? weather_themes[palette].sky : '#333333' }}
            className={`${isForwardBackground ? 'app-' : ''}background__container --animation`}
        >
            <svg className={`${isForwardBackground ? 'app-' : ''}background__hills`} viewBox="0 0 829 483" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <mask id="mask0_14_29" maskUnits="userSpaceOnUse" x="0" y="36" width="829" height="483">
                        <path d="M829 36H0V519H829V36Z" fill="white"/>
                    </mask>
                    <g mask="url(#mask0_14_29)">
                        <path d="M518.038 171.667L435 267.333L522.923 440L659.692 398L674.346 253.333L689 213.667L671.904 192.667L642.596 157.667L632.827 139L601.077 104H581.538L518.038 171.667Z" fill={palette ? weather_themes[palette].ground[2] : '#000000'} className='--animation'/>
                        <rect className='--animation' style={{ opacity: particleConditions.isFoggy || particleConditions.isDusty ? 1 : 0 }} x="375" y="251" width="388" height="249" fill="url(#paint0_linear_81_4)"/>
                        <path d="M-190.57 489.808L-214 537.327L163.222 612L207.739 580.32L271 537.327L219.454 458.128L172.594 390.244L156.193 356.301L88.2464 292.942L46.0724 259H29.6715L13.2705 277.103L-31.2464 338.199L-80.4493 381.192L-131.995 421.923L-171.826 455.865L-190.57 489.808Z" fill={palette ? weather_themes[palette].ground[0] : '#000000'} className='--animation'/>
                        <path d="M206.887 323.194L163 379.722L264.632 538L400.912 513.128L842.088 483.733L1080 424.944L1059.21 397.811L1029.18 363.894L999.156 339.022L955.27 302.844L909.073 253.1L860.567 210.139L805.131 162.656L761.244 131H740.456L682.71 198.833L661.922 246.317L627.275 287.017L555.67 406.856L518.713 345.806L507.164 327.717L470.207 293.8L435.559 262.144L400.912 235.011L373.194 223.706L354.715 219.183L343.166 223.706L294.66 287.017L253.083 262.144H246.154L232.295 280.233L206.887 323.194Z" fill={palette ? weather_themes[palette].ground[1] : '#000000'} className='--animation'/>
                        <rect className='--animation' style={{ opacity: particleConditions.isFoggy || particleConditions.isDusty ? 1 : 0 }} y="345" width="850" height="155" fill="url(#paint1_linear_81_4)"/>
                    </g>
                    <g className='--animation' style={{ opacity: weatherData.temperature < 0 ? 1 : 0 }} clipPath="url(#clip0_81_4)">
                        <path d="M511.308 140.701L425 243.486L516.385 429L658.538 383.875L673.769 228.444L689 185.826L671.231 163.264L640.769 125.66L630.615 105.604L597.615 68H577.308L511.308 140.701Z" fill="#576067"/>
                        <path d="M-190.57 453.808L-214 501.327L163.222 576L207.739 544.32L271 501.327L219.454 422.128L172.594 354.244L156.193 320.301L88.2464 256.942L46.0724 223H29.6715L13.2705 241.103L-31.2464 302.199L-80.4493 345.192L-131.995 385.923L-171.826 419.865L-190.57 453.808Z" fill="#2A2D30"/>
                        <path d="M206.887 316.944L163 382.222L264.632 565L400.912 536.278L842.088 502.333L1080 434.444L1059.21 403.111L1029.18 363.944L999.156 335.222L955.27 293.444L909.073 236L860.567 186.389L805.131 131.556L761.244 95H740.456L682.71 173.333L661.922 228.167L627.275 275.167L555.67 413.556L518.713 343.056L507.164 322.167L470.207 283L435.559 246.444L400.912 215.111L373.194 202.056L354.715 196.833L343.166 202.056L294.66 275.167L253.083 246.444H246.154L232.295 267.333L206.887 316.944Z" fill="#3E4248"/>
                        <path d="M627.5 299V274.5L662 227.5L682.5 173L740.5 94.5H761.5L805 131L850 175.384V334.5L833.5 349L788.5 268L776 299L748.5 282L740.5 305L712.5 271.5L670 346.5L654 277.5L627.5 299Z" fill={currentHour < 6 ? weather_themes.snowy_peaks[2] : currentHour >= 6 && currentHour < 18 ? weather_themes.snowy_peaks[0] : weather_themes.snowy_peaks[1]}/>
                        <path d="M512 139.5L475.5 183L472.5 200.5L498 190L491 223L548.5 166.5L615.5 238L627.5 160.5L655 179L658 146.5L641 125.5L630.5 105L597.5 67.5H577.5L512 139.5Z" fill={currentHour < 6 ? weather_themes.snowy_peaks[2] : currentHour >= 6 && currentHour < 18 ? weather_themes.snowy_peaks[0] : weather_themes.snowy_peaks[1]}/>
                        <path d="M46.1795 218H29.2564L12.8462 236.994L11.3077 239.104L-1 256.214V355.178L8.23077 345.153L34.8974 362.037L49.7692 345.153L86.6923 390L95.4103 321.939L125.154 345.153L128.744 340.933L147.718 362.037L159 320.356L89.7692 253.877L46.1795 218Z" fill={currentHour < 6 ? weather_themes.snowy_peaks[2] : currentHour >= 6 && currentHour < 18 ? weather_themes.snowy_peaks[0] : weather_themes.snowy_peaks[1]}/>
                        <path d="M373.5 194.136L355.5 189L343.5 194.136L295 269.117L253.5 239.843H246.5L233 260.9L207.5 311.743L183 349.234L221.5 325.61V352.829L252 341.017L241.5 405.727L275.5 384.67L290.5 375.426L308 389.292L328.5 367.722L363 414.971L369 361.56L429.5 435L438 352.829L496 384.67L490.5 336.908L523 346.152L507.5 317.392L490.5 298.904L452.5 257.818L438 241.898L429.5 233.681L401.5 207.489L373.5 194.136Z" fill={currentHour < 6 ? weather_themes.snowy_peaks[2] : currentHour >= 6 && currentHour < 18 ? weather_themes.snowy_peaks[0] : weather_themes.snowy_peaks[1]}/>
                    </g>
                    { rainParticles() }
                    { snowParticles() }
                </g>
                <defs>
                    <linearGradient id="paint0_linear_81_4" x1="569" y1="251" x2="569" y2="500" gradientUnits="userSpaceOnUse">
                        <stop className='--animation' stopColor={particleConditions.isFoggy ? "#D9D9D9" : "#010101"} stopOpacity="0"/>
                        <stop className='--animation' offset="1" stopColor={particleConditions.isFoggy ? "#D9D9D9" : "#010101"} stopOpacity="0.5"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_81_4" x1="425" y1="345" x2="425" y2="500" gradientUnits="userSpaceOnUse">
                        <stop className='--animation' stopColor={particleConditions.isFoggy ? "#D9D9D9" : "#010101"} stopOpacity="0"/>
                        <stop className='--animation' offset="1" stopColor={particleConditions.isFoggy ? "#D9D9D9" : "#010101"} stopOpacity="0.5"/>
                        </linearGradient>
                    <clipPath id="clip0_81_4">
                        <rect width="850" height="500" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        </div>
    )
}

export default Background