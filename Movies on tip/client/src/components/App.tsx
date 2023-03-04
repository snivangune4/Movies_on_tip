import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './App.css';
import Home from './Home';
import NavigationMenu from './NavigationMenu';
import MovieDetails from './movie-details/MovieDetails';
import MoviesList from './movies-list/MoviesListFunc';


function App() {
  return (
    <>
      <NavigationMenu />
      <Container>
      <BrowserRouter>
           <Routes>
                <Route path='/' element={< Home/>}></Route>
                <Route path='/:section' element={< MoviesList />}></Route>
                <Route path='/:section/:id' element={< MovieDetails />}></Route>
          </Routes>
      </BrowserRouter>
      </Container>
    </>
  );
}

export default App;
