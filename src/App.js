import react from 'react'
import { BrowserRouter } from 'react-router-dom'

import { NotFound, Navbar } from './Exports'

function App() {
  return (
    <div>
      <BrowserRouter>
        {/* Navbar Component */}
        <Navbar />
      </BrowserRouter>
    </div>
  );
}

export default App;
