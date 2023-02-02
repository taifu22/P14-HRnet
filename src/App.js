import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Erreur_404 from './components/Erreur_404';
import './styles/style.scss';
import FormSignin from './components/FormSignin';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <BrowserRouter> 
        <Header />
        <Routes>  
          <Route path={'/'} exact element={<FormSignin />}/>
          <Route path={'*'} element={<Erreur_404 />}/>  
        </Routes>
      </BrowserRouter>  
    </div>
  );
}

export default App;
