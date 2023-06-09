import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';

//Pages
import Homepage from './components/Homepage';
import PokemonPage from './components/PokemonPage';
import Header from './components/Header';

const App = () => {
  
  return (
    <Router>
      <Container>
      <Header />
        <Routes>
          <Route exact path='/' element={<Homepage />} />
          <Route path='/pokemon/:id' element={<PokemonPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
