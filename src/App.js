import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Claims from './components/claims/Claims';
import ClaimItems from './components/claimItems/ClaimItems';

function App() {
  return (
    <div>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Claims />} />
          <Route path="/claimItems" element={<ClaimItems />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
