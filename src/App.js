import React, { useState } from 'react'

import Background from './components/Background'
import AppContent from './components/AppContent'

function App() {
  const [data, setData] = useState(null)

  const handleData = dataSet => {
    setData(dataSet)
  }

  return (
    <div className='container'>
      <Background data={data}/>
      <div className='app-container'>
        <Background isForwardBackground={true} data={data}/>
        <AppContent onDataUpdate={handleData}/>
      </div>
    </div>
  )
}

export default App