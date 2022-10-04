// import Menu from "../../components/menu";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Navbar from '../../components/menu/Navbar';
import { useContext, useEffect, useState } from 'react'
// import Calendar from 'react-calendar';
import "./styles.css";
import { Lancamento } from '../../types/Types'
import { AuthContext } from '../../login/AuthContext';
import { formatarDataHora, formatarInicial } from '../../functions/formatar';
import Loading from '../../components/Loading';
import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
export const Editar_Usuario = () =>{

    // Função para ativar inputs
    const[isDisabled, setIsDisabled] = useState(true);
    //Esconde botao alterar
    const[isHidden, setIsHidden] = useState(false);
   //Div dos botoes de concluir e cancelar
    const[isVisible, setIsVisible] = useState(true);
    const editarUsuario = () => {
        setIsDisabled(!isDisabled)
        setIsHidden(!isHidden)
        setIsVisible(!isVisible)
    }

    const history = useNavigate();

    const cancelar = () => {
        history('/editUsuario')
    }


    return(
    <body>
        <Navbar/>
        <div className="edit">
                <h3>Usuário</h3>
                {/* Matricula && Perfil */}
                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                        <input type="text" className="form-control matricula" id="floatingInputGrid matricula" disabled={isDisabled} defaultValue="Felipe"/>
                        <label htmlFor="floatingInputGrid">Matrícula</label>
                        </div>
                    </div>
                    <div className="col-md">
                    <select className="form-select turno" aria-label="Disabled select example" disabled={isDisabled}>
                            <option value="1">Manhã</option>
                            <option value="2">Tarde</option>
                            <option value="3">Noite</option>
                            <option value="4">Madrugada</option>
                    </select>
                        
                    </div>
                </div>

                {/* Nome */}
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" defaultValue="InoDevs" disabled={isDisabled}/>
                    <label htmlFor="floatingInput">Nome</label>
                </div>
                {/* Turno && Email */}
                <div className="row g-2">
                    <div className="col-md">
                    <select className="form-select status" aria-label="Disabled select example" disabled={isDisabled}>
                            <option value="1">Ativo</option>
                            <option value="2">Inativo</option>

                    </select>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="email" className="form-control" id="floatingInputGrid" defaultValue="Esqueci :o" disabled={isDisabled}/>
                            <label htmlFor="floatingInputGrid">Email</label>
                        </div>
                    </div>
                </div>

                {/* Status e telefone */}
                <div className="row g-2">
                    <div className="col-md">
                    <div className="form-floating">
                            <input type="text" className="form-control" id="floatingInputGrid" defaultValue="Colaborador" disabled={isDisabled}/>
                            <label htmlFor="floatingInputGrid">Perfil</label>
                        </div>
                    </div>

                    <div className="col-md">
                        <div className="form-floating">
                            <input type="tel" className="form-control" id="floatingInputGrid" defaultValue="000000000" disabled={isDisabled}/>
                            <label htmlFor="floatingInputGrid">Telefone</label>
                        </div>
                    </div>
                    
                    <hr className='linha'/>
                    {/* Botão Editar */}
                    <button onClick={editarUsuario}  className='btn btn-primary editar' hidden={isHidden}>Editar</button>
                    <div className='alteracao' hidden={isVisible}>
                        <a href="/editUsuario" className='btn btn-danger' onClick={cancelar}>Cancelar</a>
                        <button className='btn btn-success'>Concluir</button>
                    </div>
                </div> 
            </div>
    </body>
    )
    }
    export default Editar_Usuario