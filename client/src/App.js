import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import { Container } from 'semantic-ui-react';
import './App.css';
import Comprimidos from './pages/Comprimidos';
import Liquidos from './pages/Liquidos';
import Login from './pages/Login';
import MenuBar from './components/MenuBar';
import { AuthProvider } from './context/auth'



function App() {

  return (
    <AuthProvider>

      <Router>
        <Container>
          <MenuBar />

          <Routes>

            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Comprimidos />} />
            <Route path="/liquidos" element={<Liquidos />} />

          </Routes>
        </Container>
      </Router>

    </AuthProvider>
  );
}

export default App;
