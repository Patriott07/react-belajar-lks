import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HandleLogin from './lib/HandleLogin';
import HandleRegister from './lib/HandleRegister';
import HandleHome from './lib/HandleHome';
import HandleDetail from './lib/HandleDetail';
import HandleCreate from './lib/HandleCreate';

function App() {

  return (  
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<HandleLogin />} />
        <Route path='/register' element={<HandleRegister />} />
        <Route path='/games/detail/:id' element={<HandleDetail />} />
        <Route path='/create' element={<HandleCreate />} />
        <Route path='/' element={<HandleHome />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
