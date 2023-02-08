import { useState } from 'react'
import { nuclides } from './components/data/nuclides'
import NuclideScene from './components/NuclideScene'
import SpringTest from './components/SpringTest'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
        <div className='scene-container'>
            {/* <NuclideScene data={nuclides}/> */}
            <SpringTest/>
        </div>

    </div>
  )
}

export default App
