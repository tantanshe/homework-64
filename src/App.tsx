import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Home from './containers/Home';
import Add from './containers/Add';
import About from './containers/About';
import Contacts from './containers/Contacts';
import Post from './components/Post';

const App = () => {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/add" element={<Add/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contacts" element={<Contacts/>}/>
        <Route path="/posts/:id" element={<Post/>}/>
      </Routes>
    </div>
  );
};

export default App;
