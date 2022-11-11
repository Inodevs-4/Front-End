import { useContext } from "react";
import Loading from "../components/Loading";
import { AuthContext } from "../login/AuthContext";
import AdministradorRoutes from "./AdministradorRoutes";
import ColaboradorRoutes from "./ColaboradorRoutes";
import GestorRoutes from "./GestorRoutes";
import PadraoRoutes from "./PadraoRoutes";

function Routes() {
    const auth = useContext(AuthContext);

    if (auth.isLoading) {
        return <Loading />;
    }

    return (
        <>
        {auth.colaborador?.perfil === "administrador" ? <AdministradorRoutes /> 
        : auth.colaborador?.perfil === "gestor" ? <GestorRoutes /> 
        : auth.colaborador?.perfil === "colaborador" ? <ColaboradorRoutes /> 
        : <PadraoRoutes />}
        </>
    )
}
export default Routes;