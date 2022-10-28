import { NavLink } from 'react-router-dom';
import Navbar from "../../components/menu/Navbar";
import * as C from './styles';

function Forbidden() {
    return (
        <>
            <Navbar/>
            <C.Container>
                <h2>Você não possui permissão para acessar esta página!</h2>
                <NavLink to="/">Voltar para Home</NavLink>
            </C.Container>
        </>


    )
}

export default Forbidden