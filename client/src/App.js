import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import PirateForm from './components/PirateForm';
import Main from './components/Main';
import ShowOne from './components/ShowOne';

function App() {

  const [pirates, setPirates] = useState([]);

  return (
    <div>
      <div className="App">
        <Routes>
          {/* SHOW ALL */}
          <Route
            path="/pirates"
            element={<Main pirates={pirates} setPirates={setPirates} />}
          />

          {/* CREATE ONE */}
          <Route path="/pirate/new" element={<PirateForm pirates={pirates} setPirates={setPirates}  />} />

          {/* SHOW ONE */}
          <Route path ="/pirate/:id" element={<ShowOne/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
