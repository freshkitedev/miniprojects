import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Appbar } from "./components/Appbar";
import { Landing } from './components/Landing';
import { Signup } from './components/Signup';

function App() {
  return (
    <div>
      <Router>
        <Appbar />
        <Routes>
          <Route path={"/"} element={<Landing />} />
          <Route path={"/signin"} element={<Signup signin={true}/>} />
          <Route path={"/signup"} element={<Signup signin={false}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
