import './App.scss';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import Navbar from './components/layout/Navbar';
import Login from './components/account/Login';
import Register from './components/account/Register';


function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />

        <Routes>
          <Route  path="/login" element={<Login/>}/>
          <Route  path="/register" element={<Register/>}/>
        </Routes>
      </div>
    </Router>

  );
}

export default App;
