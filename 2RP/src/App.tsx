import { BrowserRouter, Route, Routes as Switch, Navigate } from "react-router-dom";
import  Login  from "./pages/Login/index";
import Home from "./pages/home/index";
// import Cadastro from "./pages/Cadastro_Hora/index";
import { Etapa1Form } from "./pages/Cadastro_HoraExtra_Apontamento/Etapa1Form";
import { Etapa2Form } from "./pages/Cadastro_HoraExtra_Apontamento/Etapa2Form";
import { Etapa3Form } from "./pages/Cadastro_HoraExtra_Apontamento/Etapa3Form";
import { FormProvider } from "./contexts/FormContext";
import Aprovacao from "./pages/Aprovacao_Lancamento";




export const App = () => {
  return (
    <FormProvider>
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<Login />} />
        {/* <Route path="/Cadastro_Hora" element={<Cadastro />} /> */}
        <Route path="/pagina-inicial" element={<Home />} />
        <Route path="/etapa1" element={<Etapa1Form/>}/>
        <Route path="/etapa2" element={<Etapa2Form/>}/>
        <Route path="/etapa3" element={<Etapa3Form/>}/>
        <Route path="/aprovacao-lancamento" element={<Aprovacao/>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Switch>
    </BrowserRouter>
    </FormProvider>

  );
}

export default App;

