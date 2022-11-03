import Navbar from '../../components/menu/Navbar';
import { useEffect, useState } from 'react'
import "./styles.css";
import {  Cliente} from '../../types/Types'
import {  useParams } from 'react-router-dom';
import { atualizarCliente, getCliente } from '../../hooks/Clientes';
export const Editar_Clientes = () =>{

    const { cnpj } = useParams()

    const [colaborador, setColaborador] = useState<Cliente>()
    const [colaboradorInicial, setColaboradorInicial] = useState<Cliente>()

    useEffect(() => {
        (async() => {
            const data = await getCliente(cnpj)
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

    const cancelar = () => {
        setColaborador(colaboradorInicial)
        editarUsuario()
    }

    const salvarColaborador = () => {
        // atualizarCliente(cnpj, colaborador)
        setColaboradorInicial(colaborador)
        editarUsuario()
    }

    return(
    <body>
        <Navbar/>
        <div className="edit">
                <h3>Usuário</h3>
                <div className="row g-2">
                <div className="col-md">
                        <div className="form-floating">
                            <input type="tel" className="form-control" id="floatingInputGrid" onChange={handleChange} value={colaborador?.nome} name='nome'/>
                            <label htmlFor="floatingInputGrid">Nome</label>
                        </div>
                    </div>
   
                    <div className="col-md">
                    <div className="form-floating">
                            <input type="number" className="form-control" id="floatingInputGrid" onChange={handleChange} value={colaborador?.cnpj} name='cnpj'/>
                            <label htmlFor="floatingInputGrid">CNPJ</label>
                        </div>
                 </div>
                   
   
                </div>
                <div className="row g-2">
                <div className="col-md">
               <div className="form-floating">
                            <input type="tel" className="form-control" id="floatingInputGrid" onChange={handleChange} value={colaborador?.contato} name='contato'/>
                            <label htmlFor="floatingInputGrid">Contato</label>
                        </div>
                    </div>
                       
                   
                    <div className="col-md">                        
                <div className="form-floating">
                            <select className="form-select" aria-label="Disabled select example"  onChange={handleSelect} value={colaborador?.status} name="status" >
                            <option value="ativo">Ativo</option>
                            <option value="inativo">Inativo</option>
                            </select>
                            <label htmlFor="floatingInputGrid">Status</label>
                        </div>
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
            
    </body>
    )
    }
    export default Editar_Clientes