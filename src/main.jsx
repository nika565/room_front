import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './css/index.css';

import Home from './pages/home/index';
import CreateRoom from './pages/create';
import Room from './pages/room';

ReactDOM.createRoot(document.getElementById('root')).render(


  <BrowserRouter>

    <Routes>

      <Route path='/' element={<Home />} />
      <Route path='/create-room' element={<CreateRoom />} />
      <Route path='/room/:sala' element={<Room />} />

    </Routes>


  </BrowserRouter>


)
