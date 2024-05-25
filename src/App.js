import  './App.css';
import Country from './components/Country';
import Display from './components/Display';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Country/>}/>
          <Route path='/countries' element={<Display/>}/>
        </Routes>
      </Router>      
    </div>
  );
}

export default App;
