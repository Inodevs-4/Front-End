import { BrowserRouter, Route, Routes as Switch, Navigate } from "react-router-dom";
import Etapa1Form from "../pages/Cadastro_HoraExtra_Apontamento/Etapa1Form";
import { Etapa2Form } from "../pages/Cadastro_HoraExtra_Apontamento/Etapa2Form";
import { Etapa3Form } from "../pages/Cadastro_HoraExtra_Apontamento/Etapa3Form";
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
      </Switch>
    </BrowserRouter>
    )
}

export default ColaboradorRoutes