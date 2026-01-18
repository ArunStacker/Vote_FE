import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Vote from './pages/Vote';
import Results from './pages/Results';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/vote" element={<Vote />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  );
}

export default App;
