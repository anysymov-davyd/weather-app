import React, { useState, useEffect } from 'react'

import './../styles/AppContent.css'

import Text1 from './../components/Text1'
import Text3 from './../components/Text3'

import Label from './../components/Label'
import IconLabel from './../components/IconLabel'
import SearchButton from './SearchButton'
import SearchInput from './SearchInput'

import { openWeatherApiKey, geoApiKey } from './../api_keys.js'

const AppContent = ({ onDataUpdate }) => {
    const
        // Has user switched to search input?
        [switchSearch, setSwitchSearch] = useState(false),
        // What is the name of current choosed timezone?
        [currentTimezone, setCurrentTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone),
        // Current claimed data from API about location
        [currentData, setCurrentData] = useState({
            city: null,
            country: null,
            latitude: null,
            longitude: null
        }),
        // Current claimed data from API about weather
        [currentWeather, setCurrentWeather] = useState({
            temperature: null,
            feels_like: null,
            wind: null,
            humidity: null,
            pressure: null,
            weather: null,
            id: null
        }),
        // Current date and time
        [currentTime, setCurrentTime] = useState(new Date())

    // Are all data still not loaded?
    const isLoading = 
        Object.keys(currentData).some(key => currentData[key] === null) &&
        Object.keys(currentWeather).some(key => currentWeather[key] === null)

    // Get user location
    useEffect(() => {
        fetch("https://ipapi.co/json/")
        .then(response => response.json())
        .then(data => {
            setCurrentData({
                city: data.city,
                country: data.country_name,
                latitude: data.latitude,
                longitude: data.longitude
            })
        })
        .catch(error => {
            console.error(error)
        })

        const timer = setInterval(() => {
            setCurrentTime(new Date())
        },  1000)
        return () => {
            clearInterval(timer)
        }
    }, [])

    // Get weather data of choosed location
    useEffect(() => {
        if(!isLoading){
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${currentData.latitude}&lon=${currentData.longitude}&appid=${openWeatherApiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                setCurrentWeather({
                    temperature: Math.floor(data.main.temp),
                    feels_like: Math.floor(data.main.feels_like),
                    wind: data.wind.speed,
                    humidity: data.main.humidity,
                    pressure: data.main.pressure,
                    weather: data.weather[0].main,
                    id: data.weather[0].id
                })
                fetch(`https://api.geoapify.com/v1/geocode/search?text=${currentData.latitude},%20${currentData.longitude}&format=json&apiKey=${geoApiKey}`)
                .then(response => response.json())
                .then(response => {
                    setCurrentTimezone(response.results[0].timezone.name)
                    
                    onDataUpdate({
                        temperature: Math.floor(data.main.temp),
                        timezone: response.results[0].timezone.name,
                        id: data.weather[0].id
                    })
                })
                .catch(error => console.error(error))
            })
            .catch(error => console.error(error))
        }
    }, [currentData])

    // Switch to search input or label with time and date in the top of widget
    const handleSwitchSearch = () => {
        setSwitchSearch(!switchSearch)
    }

    // Submit entered data and start searching data about weather in this location
    const handleSearchEvent = data => {
        setSwitchSearch(false)
        setCurrentData({
            city: data.city,
            country: data.country,
            latitude: data.latitude,
            longitude: data.longitude
        })
    }

    // Formating data and time
    const dateOptions = {
        timeZone: currentTimezone,
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }

    // Data collection for grid in the bottom right corent
    const dataSet = [
        {
            name: 'Feels like',
            value: `${currentWeather.feels_like}°C`
        },
        {
            name: 'Wind',
            value: `${currentWeather.wind} m/s`
        },
        {
            name: 'Humidity',
            value: `${currentWeather.humidity}%`
        },
        {
            name: 'Pressure',
            value: `${currentWeather.pressure} hPa`
        }
    ]

    const hours = Number(
        currentTime.toLocaleString('en-GB', { timeZone: currentTimezone })
        .split(', ')[1].split(':')[0]
    )

    return (
        <div className="app-content__container">
            <div
                className='app-content__header'>
                <div className='app-content__input-switch'>
                    <div
                        className='app-content__switch-item --animation'
                        style={{
                            opacity: switchSearch ? 0 : 1,
                            zIndex: switchSearch ? 0 : 1,
                            paddingTop: '10px'
                    }}>
                            <Text1 darkMode={[800].includes(currentWeather.id) && hours >= 6 && hours < 18}>{ currentTime.toLocaleString('en-GB', dateOptions)}</Text1>
                    </div>
                    <div
                        className='app-content__switch-item --animation'
                        style={{
                            opacity: switchSearch ? 1 : 0,
                            zIndex: switchSearch ? 1 : 0
                    }}>
                        <SearchInput onSearch={handleSearchEvent} isFocused={switchSearch}/>
                    </div>
                </div>
                <div onClick={handleSwitchSearch}>
                    <SearchButton/>
                </div>
            </div>
            <div className='app-content__data-set-animation'>
                <div
                    style={{
                        opacity: currentWeather.temperature !== null ? 1 : 0
                    }}
                    className='app-content__data-set --animation'>
                    <div
                        className='app-content__temperature'>
                        <Text3>{ currentWeather.temperature }°C</Text3>
                        <Label
                            value={ currentWeather.weather }
                            label={`${currentData.city}, ${currentData.country}`}
                        />
                    </div>
                    <div
                        className='app-content__data-grid'>
                        {dataSet.map((elem, index) => (
                            <IconLabel key={index} name={elem.name} value={elem.value}/>
                        ))}
                    </div>
                </div>
                <div
                    style={{
                        opacity: currentWeather.temperature !== null ? 0 : 1
                    }}
                    className='--animation'>
                    <Text3>Loading...</Text3>
                </div>
            </div>
        </div>
    )
}

export default AppContent