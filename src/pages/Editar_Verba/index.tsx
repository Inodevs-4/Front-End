import Navbar from '../../components/menu/Navbar';
import { useEffect, useState } from 'react'
import "./editar-verba.css";
import {  Cliente } from '../../types/Types'
import {  useParams } from 'react-router-dom';
import { atualizarCliente, getCliente } from '../../hooks/Clientes';
export const Editar_Verbas = () =>{

    const { cnpj } = useParams()

    const [cliente, setCliente] = useState<Cliente>()
    const [clienteInicial, setClienteInicial] = useState<Cliente>()

    useEffect(() => {
        (async() => {
            const data = await getCliente(cnpj)
            setCliente(data)
            setClienteInicial(data)  
        })()
    }, [])

    function handleChange(e: any) {
        setCliente({...cliente, [e.target.name]: e.target.value})
    }

    function handleSelect(e: any) {
        setCliente({...cliente, [e.target.name]: e.target.options[e.target.selectedIndex].value,})
    }

    // Função para ativar inputs
    const[isDisabled, setIsDisabled] = useState(true);
    //Esconde botao alterar
    const[isHidden, setIsHidden] = useState(false);
   //Div dos botoes de concluir e cancelar
    const[isVisible, setIsVisible] = useState(true);
    const editarCliente = () => {
        setIsDisabled(!isDisabled)
        setIsHidden(!isHidden)
        setIsVisible(!isVisible)
    }

    const cancelar = () => {
        setCliente(clienteInicial)
        editarCliente()
    }

    const salvarCliente = () => {
        atualizarCliente(cliente, cnpj)
        setClienteInicial(cliente)
        editarCliente()
    }

    return(
    <body>
        <Navbar/>
        <div className="edit">
                <h3>Cliente</h3>
                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="number" className="form-control" id="floatingInputGrid" disabled value={cliente?.cnpj} onChange={handleChange} name='cnpj'/>
                            <label htmlFor="floatingInputGrid">CNPJ</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="tel" className="form-control" id="floatingInputGrid" value={cliente?.nome} disabled={isDisabled} onChange={handleChange} name='nome'/>
                            <label htmlFor="floatingInputGrid">Nome</label>
                        </div>
                    </div>
                </div>

                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="tel" className="form-control" id="floatingInputGrid" value={cliente?.contato} disabled={isDisabled} onChange={handleChange}  name='contato'/>
                            <label htmlFor="floatingInputGrid">Contato</label>
                        </div>
                    </div>
                    <div className="col-md">        
                        <div className="form-floating">
                            <select className="form-select" aria-label="Disabled select example"  disabled={isDisabled} onChange={handleSelect} name="status" value={cliente?.status}>
                                <option value="ativo">Ativo</option>
                                <option value="inativo">Inativo</option>
                            </select>
                            <label htmlFor="floatingInputGrid">Status</label>
                        </div>
                    </div>
                </div>

                <hr className='linha'/>
                {/* Botão Editar */}
                <button onClick={editarCliente}  className='btn btn-primary editar' hidden={isHidden}>Editar</button>
                <div className='alteracao' hidden={isVisible}>
                    <button className='btn btn-danger' onClick={cancelar}>Cancelar</button>
                    <button onClick={salvarCliente} className='btn btn-success'>Concluir</button>
                </div>
        </div> 
    </body>
    )
    }
    export default Editar_Verbas