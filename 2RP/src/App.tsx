import { BrowserRouter, Route, Routes as Switch, Navigate } from "react-router-dom";
import  Login  from "./pages/Login/index";
import Home from "./pages/home/index";
// import Cadastro from "./pages/Cadastro_Hora/index";
import { Etapa1Form } from "./pages/Cadastro_HoraExtra_Apontamento/Etapa1Form";
import { Etapa2Form } from "./pages/Cadastro_HoraExtra_Apontamento/Etapa2Form";
import { Etapa3Form } from "./pages/Cadastro_HoraExtra_Apontamento/Etapa3Form";
import { FormProvider } from "./contexts/FormContext";
import Aprovacao from "./pages/Aprovacao_Lancamento";

import DetalhesApontamento from "./pages/Detalhes_Apontamento";
import { RequireAuth } from "./login/RequireAuth";
import Tabela_usuario from "./pages/Tabela_usuarios";
import Editar_Usuario from "./pages/Editar_Usuario";
import CadastroUsuario from "./pages/CadastroUsuario";




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
        <Route path="/tabela_usuarios" element={<RequireAuth><Tabela_usuario/></RequireAuth>}/>
        <Route path="/aprovacao-lancamento" element={<RequireAuth><Aprovacao/></RequireAuth>} />
        <Route path="/aprovacao-lancamento/viewDetails" element={<RequireAuth><DetalhesApontamento/></RequireAuth>} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/editUsuario/:matricula" element={<RequireAuth><Editar_Usuario/></RequireAuth>} />
        <Route path="/cadastro-usuario" element={<RequireAuth><CadastroUsuario/></RequireAuth>}/>
      </Switch>
    </BrowserRouter>
    </FormProvider>

  );
}

export default App;

