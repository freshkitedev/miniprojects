import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Appbar } from "./components/Appbar";
import { Landing } from './components/Landing';

function App() {
  return (
    <div>
      <Router>
        <Appbar />
        <Routes>
          <Route path={"/"} element={<Landing />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
