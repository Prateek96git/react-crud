import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Create from './component/Create';
import Home from './component/Home';
import Menu from './component/Menu';
import Pnf from './component/Pnf';
import Update from './component/Update';

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <BrowserRouter>
        <Menu/>
         <ToastContainer autoClose={5000} position={'top-right'}/>
        <Routes>
          <Route path={'/'} element={<Home/>} />
          <Route path={'/home'} element={<Home/>} />
          <Route path={'create'} element={<Create/>} />
          <Route path={'/update/:id'} element={<Update/>} />
          <Route path={'/*'} element={<Pnf/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;