import { BrowserRouter, Route, Routes as Switch, Navigate } from "react-router-dom";
import Aprovacao from "../pages/Aprovacao_Lancamento";
import CadastroUsuario from "../pages/CadastroUsuario";
import Etapa1Form from "../pages/Cadastro_HoraExtra_Apontamento/Etapa1Form";
import { Etapa2Form } from "../pages/Cadastro_HoraExtra_Apontamento/Etapa2Form";
import { Etapa3Form } from "../pages/Cadastro_HoraExtra_Apontamento/Etapa3Form";
import Cadastro_Projeto from "../pages/Cadastro_projeto";
import Cadastro_verba from "../pages/Cadastro_verba";
import DetalhesApontamento from "../pages/Detalhes_Apontamento";
import Editar_Clientes from "../pages/Editar_Clientes";
import Editar_Projeto from "../pages/Editar_Projetos";
import Editar_Usuario from "../pages/Editar_Usuario";
import Editar_Verbas from "../pages/Editar_Verba";
import Home from "../pages/home";
import Login from "../pages/Login";
import Projeto from "../pages/tabela_projetos"; 
import Tabela_usuario from "../pages/Tabela_usuarios";
import Cliente from "../pages/Tabela_clientes";
import Crs from "../pages/Tabela_crs";
import Manipulacao from "../pages/ManipulacaoHoraSobreAviso";
import Cadastro_Cliente from "../pages/Cadastro_Cliente";
import CadastroCR from "../pages/CadastroCR";
import Editar_Crs from "../pages/Editar_CR";
import Dashboard from "../pages/Dashboard";
import Dashboard_geral from "../pages/Dashboard_geral";

function AdminstradorRoutes() {
    return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/etapa1" element={<Etapa1Form/>}/>
        <Route path="/etapa2" element={<Etapa2Form/>}/>
        <Route path="/etapa3" element={<Etapa3Form/>}/>
        <Route path="/tabela_usuarios" element={<Tabela_usuario/>}/>
        <Route path="/aprovacao-lancamento" element={<Aprovacao/>} />
        <Route path="/projetos" element={<Projeto/>} />
        <Route path="/aprovacao-lancamento/viewDetails" element={<DetalhesApontamento/>} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/Editar_Verba/:numero" element={<Editar_Verbas/>} />
        <Route path="/Editar_Projetos/:id" element={<Editar_Projeto/>} />
        <Route path="/Editar_Clientes/:cnpj" element={<Editar_Clientes/>} />
        <Route path="/editUsuario/:matricula" element={<Editar_Usuario/>} />
        <Route path="/Detalhes_Apontamento/:id" element={<DetalhesApontamento/>} />
        <Route path="/cadastro-usuario" element={<CadastroUsuario/>}/>
        <Route path="/Cadastro_projeto" element={<Cadastro_Projeto/>}/>
        <Route path="/manipulacao-hora-sobreaviso" element={<Manipulacao/>}/>
        <Route path="/cadastro-verba" element={<Cadastro_verba/>}/>
        <Route path="/clientes" element={<Cliente/>}/>
        <Route path="/cadastro-cliente" element={<Cadastro_Cliente/>}/>
        <Route path="/crs" element={<Crs/>}/>
        <Route path="/cadastro-cr" element={<CadastroCR/>}/>
        <Route path="/editar-cr/:numero" element={<Editar_Crs/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/dashboard_geral" element={<Dashboard_geral/>}/>
      </Switch>
    </BrowserRouter>
    )
}

export default AdminstradorRoutes
