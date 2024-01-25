import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Appbar } from "./components/Appbar";

function App() {
  return (
    <div>
      <Router>
        <Appbar />
      </Router>
    </div>
  );
}

export default App;
