import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Container} from 'react-bootstrap'
import Header from './components/header-component/Header';
import HomeScreen from './screens/HomeScreen';

function App() {
  return (//have to wrap entire App in Router in order to use it
    <Router>
      <Header />
      <main className='py-3'>
      <Container>
        <Route path='/' component={HomeScreen} exact />
      </Container>
      </main>
    </Router>
  );
}

export default App;
