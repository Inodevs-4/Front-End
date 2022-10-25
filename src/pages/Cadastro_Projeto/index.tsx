import Navbar from '../../components/menu/Navbar';
import { useContext, useEffect, useState } from 'react'
// import Calendar from 'react-calendar';
import "./styles.css";

import { AuthContext } from '../../login/AuthContext';


export const Projeto = () =>{


  const auth = useContext(AuthContext)

   

    return(
    <div>
        <Navbar/>

<h1>Cadastro Projeto</h1>

    </div>
    );
    }
    export default Projeto