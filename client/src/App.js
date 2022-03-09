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
import CreateFormComprimido from './pages/CreateFormComprimido';
import Update from './pages/Update';
import CreateFormLiquido from './pages/CreateFormLiquido';
import UpdateLiquido from './pages/UpdateLiquido';

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
            <Route path="/createComprimido" element={<CreateFormComprimido />} />
            <Route path='/update' element={<Update />} />
            <Route path='/createLiquido' element={<CreateFormLiquido />} />
            <Route path='/updateLiquido' element={<UpdateLiquido />} />
            <Route path='/createComprimido/:id' element={<CreateFormComprimido />} />


          </Routes>
        </Container>
      </Router>

    </AuthProvider>
  );
}

export default App;
