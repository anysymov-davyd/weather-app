import './../styles/Text1.css'

const Text1 = ({ darkMode, children }) => {
    return (
        <span style={{ color: darkMode ? 'black' : 'white'}} className="text1">{ children }</span>
    )
}

export default Text1