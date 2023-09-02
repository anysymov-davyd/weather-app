import './../styles/IconLabel.css'
import Label from './Label'

import temperature from './../img/temperature.svg'
import wind from './../img/wind.svg'
import humidity from './../img/humidity.svg'
import pressure from './../img/pressure.svg'

const IconLabel = ({ name, value }) => {
    const dataPreset = [
        {
            label: 'Feels like',
            icon: temperature
        },
        {
            label: 'Wind',
            icon: wind
        },
        {
            label: 'Humidity',
            icon: humidity
        },
        {
            label: 'Pressure',
            icon: pressure
        }
    ]

    return (
        <div className='icon-label__container'>
            <img
                src={
                    dataPreset.find(elem => elem.label.toLowerCase() === name.toLowerCase()).icon
                }
                className='icon-label__icon'
                alt={name}
            />
            <Label gap={6} value={value} label={name}/>
        </div>
    )
}

export default IconLabel