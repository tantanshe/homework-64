import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Home from './containers/Home/Home';
import Add from './containers/Add/Add';
import About from './containers/About/About';
import Contacts from './containers/Contacts/Contacts';
import Post from './components/Post/Post';

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
        <Route path="*" element={<h2>Not found</h2>}/>
      </Routes>
    </div>
  );
};

export default App;
