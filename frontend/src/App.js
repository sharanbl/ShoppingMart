import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Header from './Components/Header';
import Footer from './Components/Footer';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';


//const App = () => {}
function App() {
  return (
    <Router>
    <Header />
    <main className="py-3">
      <Container>
     <Route path="/" exact component={HomeScreen} />
     <Route path="/product/:id" component={ProductScreen} />
     <Route path="/cart/:id?" component={CartScreen} /> {/* The question mark after id is to make id optional   */}
      </Container>
    </main>
    <Footer />
    </Router>
  );
}

export default App;
