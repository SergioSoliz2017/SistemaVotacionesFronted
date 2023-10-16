
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import IndexPage from './pages/IndexPage';
import MenuVertical from './pages/MenuVertical';
import AsignacionComite from './pages/AsignacionComite'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/home" element={<MenuVertical/>}></Route>
        <Route path='/comiteElectoral' element={<AsignacionComite/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
