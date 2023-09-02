import './../styles/Label.css'

import Text1 from './Text1'
import Text2 from './Text2'

const Label = ({ value, label, gap }) => {
    return (
        <div style={ gap !== undefined ? { gap: gap } : null} className='label__container'>
            <Text1>{ label }</Text1>
            <Text2>{ value }</Text2>
        </div>
    )
}

export default Label