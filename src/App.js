import {
  Route,
  Routes,
  BrowserRouter,
} from 'react-router-dom';
import MemoryGame from './pages/MemoryGame';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<MemoryGame />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
