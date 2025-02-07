import React from 'react';

import { Provider } from 'react-redux';
import store from './redux/store.ts'

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DisplayFlights from './screens/DisplayFlights.tsx'
import MainLayout from './layout/MainLayout.tsx';


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<MainLayout />}>
            <Route path='/flights' element={<DisplayFlights />} />
            <Route path='*' element={<Navigate to='/flights' />} />
            <Route path='' element={<Navigate to='/flights' />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;