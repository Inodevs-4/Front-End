import { BrowserRouter, Route, Routes as Switch, Navigate } from "react-router-dom";
import Etapa1Form from "../pages/Cadastro_HoraExtra_Apontamento/Etapa1Form";
import { Etapa2Form } from "../pages/Cadastro_HoraExtra_Apontamento/Etapa2Form";
import { Etapa3Form } from "../pages/Cadastro_HoraExtra_Apontamento/Etapa3Form";
import Dashboard from "../pages/Dashboard";
import DetalhesApontamento from "../pages/Detalhes_Apontamento";
import Historico from "../pages/Historico_Lancamentos";
import Home from "../pages/home";
import Login from "../pages/Login";

function ColaboradorRoutes() {
    return(
    <BrowserRouter>
      <Switch>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/etapa1" element={<Etapa1Form/>}/>
        <Route path="/etapa2" element={<Etapa2Form/>}/>
        <Route path="/etapa3" element={<Etapa3Form/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/historico" element={<Historico/>}/>
        <Route path="/Detalhes_Apontamento/:id" element={<DetalhesApontamento/>} />
      </Switch>
    </BrowserRouter>
    )
}

export default ColaboradorRoutes