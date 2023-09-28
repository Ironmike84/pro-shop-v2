
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';

function App() {
  return (
    <>
    <Header/>
    <main className='py-3'>
    <Container>
      <Outlet/>
    </Container>
    </main>
    <Footer/>
    </>
  );
}

export default App;
