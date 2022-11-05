import { BrowserRouter, Route, Routes as Switch, Navigate } from "react-router-dom";
import  Login  from "./pages/Login/index";
import Home from "./pages/home/index";
// import Cadastro from "./pages/Cadastro_Hora/index";
import { Etapa1Form } from "./pages/Cadastro_HoraExtra_Apontamento/Etapa1Form";
import { Etapa2Form } from "./pages/Cadastro_HoraExtra_Apontamento/Etapa2Form";
import { Etapa3Form } from "./pages/Cadastro_HoraExtra_Apontamento/Etapa3Form";
import { FormProvider } from "./contexts/FormContext";
import Aprovacao from "./pages/Aprovacao_Lancamento";
import Projeto from "./pages/tabela_projetos"; 
import DetalhesApontamento from "./pages/Detalhes_Apontamento";
import { RequireAuth } from "./login/RequireAuth";
import Tabela_usuario from "./pages/Tabela_usuarios";
import Editar_Usuario from "./pages/Editar_Usuario";
import CadastroUsuario from "./pages/CadastroUsuario";
import Editar_Projeto from "./pages/Editar_Projetos";
import Manipulacao from "./pages/ManipulacaoHoraSobreAviso";
import Cliente from "./pages/Tabela_clientes";
import Cadastro_Cliente from "./pages/Cadastro_Cliente";
import Cadastro_Projeto from "./pages/Cadastro_projeto";
import { CadastroCR } from "./pages/CadastroCR";
import Cadastro_verba from "./pages/Cadastro_verba";
import Crs from "./pages/Tabela_crs";
import Editar_Clientes from "./pages/Editar_Clientes";
import Editar_Crs from "./pages/Editar_CR";
import Editar_Verbas from "./pages/Editar_Verba";





export const App = () => {
  return (
    <FormProvider>
    <BrowserRouter>
      <Switch>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/Cadastro_Hora" element={<Cadastro />} /> */}
        <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="/etapa1" element={<RequireAuth><Etapa1Form/></RequireAuth>}/>
        <Route path="/etapa2" element={<RequireAuth><Etapa2Form/></RequireAuth>}/>
        <Route path="/etapa3" element={<RequireAuth><Etapa3Form/></RequireAuth>}/>
        <Route path="/tabela_usuarios" element={<RequireAuth nivel="administrador"><Tabela_usuario/></RequireAuth>}/>
        <Route path="/aprovacao-lancamento" element={<RequireAuth nivel="gestor"><Aprovacao/></RequireAuth>} />
        <Route path="/projetos" element={<RequireAuth nivel="gestor"><Projeto/></RequireAuth>} />
        <Route path="/aprovacao-lancamento/viewDetails" element={<RequireAuth nivel="gestor"><DetalhesApontamento/></RequireAuth>} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/Editar_Verba/:numero" element={<RequireAuth nivel="=administrador"><Editar_Verbas/></RequireAuth>} />
        <Route path="/Editar_Projetos/:id" element={<RequireAuth nivel="=administrador"><Editar_Projeto/></RequireAuth>} />
        <Route path="/Editar_Clientes/:cnpj" element={<RequireAuth nivel="=administrador"><Editar_Clientes/></RequireAuth>} />
        <Route path="/editUsuario/:matricula" element={<RequireAuth nivel="administrador"><Editar_Usuario/></RequireAuth>} />
        <Route path="/Detalhes_Apontamento/:id" element={<RequireAuth nivel="gestor"><DetalhesApontamento/></RequireAuth>} />
        <Route path="/cadastro-usuario" element={<RequireAuth nivel="administrador"><CadastroUsuario/></RequireAuth>}/>
        <Route path="/Cadastro_projeto" element={<RequireAuth nivel="administrador"><Cadastro_Projeto/></RequireAuth>}/>
        <Route path="/manipulacao-hora-sobreaviso" element={<RequireAuth nivel="gestor"><Manipulacao/></RequireAuth>}/>
        <Route path="/cadastro-verba" element={<RequireAuth nivel="administrador"><Cadastro_verba/></RequireAuth>}/>
        {/* Cliente */}
        <Route path="/clientes" element={<RequireAuth nivel="gestor"><Cliente/></RequireAuth>}/>
        <Route path="/cadastro-cliente" element={<RequireAuth nivel="gestor"><Cadastro_Cliente/></RequireAuth>}/>
        <Route path="/crs" element={<RequireAuth nivel="gestor"><Crs/></RequireAuth>}/>
        <Route path="/cadastro-cr" element={<RequireAuth nivel="gestor"><CadastroCR/></RequireAuth>}/>
        <Route path="/editar-cr/:numero" element={<RequireAuth nivel="gestor"><Editar_Crs/></RequireAuth>}/>
      </Switch>
    </BrowserRouter>
    </FormProvider>

  );
}

export default App;

