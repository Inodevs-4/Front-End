import Navbar from '../../components/menu/Navbar';
import { useEffect, useState } from 'react'
import "./styles.css";
import { Colaborador} from '../../types/Types'
import {  useParams } from 'react-router-dom';
import { atualizarColaborador, getColaborador } from '../../hooks/Colaborador';
export const Editar_Usuario = () =>{

    const { matricula } = useParams()

    const [colaborador, setColaborador] = useState<Colaborador>()
    const [colaboradorInicial, setColaboradorInicial] = useState<Colaborador>()

    useEffect(() => {
        (async() => {
            const data = await getColaborador(matricula)
            setColaborador(data)
            setColaboradorInicial(data)  
        })()
    }, [])

    function handleChange(e: any) {
        setColaborador({...colaborador, [e.target.name]: e.target.value})
    }

    function handleSelect(e: any) {
        setColaborador({...colaborador, [e.target.name]: e.target.options[e.target.selectedIndex].value,})
    }

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

    //const history = useNavigate();

    /*
    const cancelar = () => {
        history('/editUsuario')
    }
    */

    const cancelar = () => {
        setColaborador(colaboradorInicial)
        editarUsuario()
    }

    const salvarColaborador = () => {
        atualizarColaborador(matricula, colaborador)
        setColaboradorInicial(colaborador)
        editarUsuario()
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
                        <input type="text" className="form-control matricula" id="floatingInputGrid matricula" disabled value={colaborador?.matricula} name='matricula'/>
                        <label htmlFor="floatingInputGrid">Matrícula</label>
                        </div>
                    </div>
                    <div className="col-md">
                    <select className="form-select turno" aria-label="Disabled select example" disabled={isDisabled} value={colaborador?.turno} onChange={handleSelect} name='turno'>
                            <option value="Manhã">Manhã</option>
                            <option value="Tarde">Tarde</option>
                            <option value="Noite">Noite</option>
                            <option value="Madrugada">Madrugada</option>
                    </select>
                        
                    </div>
                </div>

                {/* Nome */}
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" value={colaborador?.nome} disabled={isDisabled} onChange={handleChange} name='nome'/>
                    <label htmlFor="floatingInput">Nome</label>
                </div>
                {/* Turno && Email */}
                <div className="row g-2">
                    <div className="col-md">
                    <select className="form-select status" aria-label="Disabled select example" disabled={isDisabled} value={colaborador?.status} onChange={handleSelect} name='status'>
                            <option value="ativo">Ativo</option>
                            <option value="inativo">Inativo</option>

                    </select>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="email" className="form-control" id="floatingInputGrid" value={colaborador?.email} disabled={isDisabled} onChange={handleChange} name='email'/>
                            <label htmlFor="floatingInputGrid">Email</label>
                        </div>
                    </div>
                </div>

                {/* Status e telefone */}
                <div className="row g-2">
                    <div className="col-md">

                    <select className="form-select perfil" aria-label="Disabled select example" disabled={isDisabled} value={colaborador?.perfil} onChange={handleSelect} name='perfil'>
                            <option value="colaborador">Colaborador</option>
                            <option value="gestor">Gestor</option>
                            <option value="administrador">Administrador</option>
                    </select>
                    </div>

                    <div className="col-md">
                        <div className="form-floating">
                            <input type="tel" className="form-control" id="floatingInputGrid" value={colaborador?.telefone} disabled={isDisabled} onChange={handleChange} name='telefone'/>
                            <label htmlFor="floatingInputGrid">Telefone</label>
                        </div>
                    </div>
                    
                    <hr className='linha'/>
                    {/* Botão Editar */}
                    <button onClick={editarUsuario}  className='btn btn-primary editar' hidden={isHidden}>Editar</button>
                    <div className='alteracao' hidden={isVisible}>
                        <button className='btn btn-danger' onClick={cancelar}>Cancelar</button>
                        <button onClick={salvarColaborador} className='btn btn-success'>Concluir</button>
                    </div>
                </div> 
            </div>
    </body>
    )
    }
    export default Editar_Usuario