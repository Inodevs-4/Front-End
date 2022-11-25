import { BrowserRouter, Route, Routes as Switch, Navigate } from "react-router-dom";
import Aprovacao from "../pages/Aprovacao_Lancamento";
import CadastroCR from "../pages/CadastroCR";
import Cadastro_Cliente from "../pages/Cadastro_Cliente";
import Etapa1Form from "../pages/Cadastro_HoraExtra_Apontamento/Etapa1Form";
import { Etapa2Form } from "../pages/Cadastro_HoraExtra_Apontamento/Etapa2Form";
import { Etapa3Form } from "../pages/Cadastro_HoraExtra_Apontamento/Etapa3Form";
import Cadastro_Projeto from "../pages/Cadastro_projeto";
import DetalhesApontamento from "../pages/Detalhes_Apontamento";
import Editar_Clientes from "../pages/Editar_Clientes";
import Editar_Crs from "../pages/Editar_CR";
import Editar_Projeto from "../pages/Editar_Projetos";
import Home from "../pages/home";
import Login from "../pages/Login";
import Projeto from "../pages/tabela_projetos"; 
import Cliente from "../pages/Tabela_clientes";
import Crs from "../pages/Tabela_crs";
import Dashboard from "../pages/Dashboard";
import Dashboard_geral from "../pages/Dashboard_geral";
import Historico from "../pages/Historico_Lancamentos";

function GestorRoutes() {
    return (
    <BrowserRouter>
      <Switch>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/etapa1" element={<Etapa1Form/>}/>
        <Route path="/etapa2" element={<Etapa2Form/>}/>
        <Route path="/etapa3" element={<Etapa3Form/>}/>
        <Route path="/aprovacao-lancamento" element={<Aprovacao/>} />
        <Route path="/projetos" element={<Projeto/>} />
        <Route path="/aprovacao-lancamento/viewDetails" element={<DetalhesApontamento/>} />
        <Route path="/Editar_Projetos/:id" element={<Editar_Projeto/>} />
        <Route path="/Editar_Clientes/:cnpj" element={<Editar_Clientes/>} />
        <Route path="/Detalhes_Apontamento/:id" element={<DetalhesApontamento/>} />
        <Route path="/Cadastro_projeto" element={<Cadastro_Projeto/>}/>
        <Route path="/clientes" element={<Cliente/>}/>
        <Route path="/cadastro-cliente" element={<Cadastro_Cliente/>}/>
        <Route path="/crs" element={<Crs/>}/>
        <Route path="/cadastro-cr" element={<CadastroCR/>}/>
        <Route path="/editar-cr/:numero" element={<Editar_Crs/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/dashboard_geral" element={<Dashboard_geral/>}/>
        <Route path="/historico" element={<Historico/>}/>
      </Switch>
    </BrowserRouter>
    )
}

export default GestorRoutes
