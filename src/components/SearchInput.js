import React, { useEffect, useRef, useState } from 'react'
import './../styles/SearchInput.css'

const SearchInput = ({ isFocused, onSearch }) => {
    const [optionSet, setOptionSet] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [timer, setTimer] = useState(null)

    const inputRef = useRef(null)

    const searchEvent = data => {
        onSearch(data)
        setInputValue('')
    }

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ae5fb4ecc2msh199a94d8916d37ap19782fjsn48de3d5181a1',
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
    }

    // Request a list of cities, also optimising request frequency
    useEffect(() => {
        if(timer){
            clearTimeout(timer)
        }
        if(inputValue.trim() !== ''){
            const newTimer = setTimeout(() => {
                fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/places?limit=10&sort=-population&types=CITY&namePrefix=${inputValue.toLowerCase()}`, options)
                .then(response => response.json())
                .then(response => {
                    const arr = []
                    if(response.data !== undefined){
                        response.data.map(elem => arr.push({
                            city: elem.name,
                            country: elem.country,
                            latitude: elem.latitude,
                            longitude: elem.longitude
                        }))
                    }
                    setOptionSet(arr)
                })
                .catch(error => console.error(error))
            }, 500)
            setTimer(newTimer)
        } else {
            setOptionSet([])
        }
    }, [inputValue])

    useEffect(() => {
        inputRef.current.focus()
        if(isFocused) setInputValue('')
    }, [isFocused])

    // Update input value
    const handleOnChange = event => {
        const newValue = event.target.value
        if(newValue.length > 80) return
        setInputValue(event.target.value)
    }
    
    return (
        <div className='search__container'>
            <input
                value={inputValue}
                disabled={!isFocused}
                onInput={handleOnChange}
                ref={inputRef} 
                placeholder='Enter a city'
                className='search-input'
            />
            <div style={{ maxHeight: 42 * optionSet.length }} className='search__dropdown'>
                {optionSet.map((elem, index) => (
                    <div
                        onClick={() => searchEvent(elem)}
                        key={index}
                        className='search__dropdown-item --animation'
                    >
                        { `${elem.city}, ${elem.country}`}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SearchInput