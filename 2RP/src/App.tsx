import { BrowserRouter, Route, Routes as Switch, Navigate } from "react-router-dom";
import  Login  from "./pages/Login/index";
import Home from "./pages/home/index";
import Cadastro from "./pages/Cadastro_Hora/index";



export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<Login />} />
        <Route path="/Cadastro_Hora" element={<Cadastro />} />
        <Route path="/pagina-inicial" element={<Home />} />


        <Route path="*" element={<Navigate to="/" />} />
      </Switch>
    </BrowserRouter>
  );
}// import './App.css';
// import  Login  from "./pages/Login/index";
// import { BrowserRouter, Route  } from 'react-router-dom';

// export const App = () => {
//   return (
//     <BrowserRouter>
//       <Route path='/login' element={<Login/>} />
//     </BrowserRouter>
//   );
// }

export default App;

