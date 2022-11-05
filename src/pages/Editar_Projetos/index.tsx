import Navbar from '../../components/menu/Navbar';
import { useEffect, useState } from 'react'
import "./projeto.css";
import {  Projeto , CR, Cliente} from '../../types/Types'
import { todosCRs } from '../../hooks/CR';
import { useParams } from 'react-router-dom';
import { getProjeto } from '../../hooks/Projeto';
import { todosClientes } from '../../hooks/Clientes';

export const Editar_Projeto = () =>{

    const { id } = useParams()


    const [projeto, setProjeto] = useState<Projeto>()
    const [crs, setCrs] = useState<CR[]>()
    const [clientes, setClientes] = useState<Cliente[]>()
    const [projetoInicial, setProjetoInicial] = useState<Projeto>()

      useEffect(() => {
        (async() => {
            const data = await getProjeto(id)
            setProjeto(data)
            setProjetoInicial(data)
            setCrs(await todosCRs())
            setClientes(await todosClientes())
        })()
    }, [])  


    function handleChange(e: any) {
        setProjeto({...projeto, [e.target.name]: e.target.value})
    }

    function handleSelect(e: any) {
        setProjeto({...projeto, [e.target.name]: e.target.options[e.target.selectedIndex].value,})
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
        setProjeto(projetoInicial)
        editarUsuario()
    }

    const salvarProjeto = () => {
        fetch(`${process.env.REACT_APP_SERVER}/atualizarProjeto/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(projeto),
          })
            .then((resp) => resp.json())
            .then((data) => {
              console.log(data)
              setProjetoInicial(projeto)
              editarUsuario()
            })
            .catch((err) => console.log(err))
    }

return(
<body >
     <Navbar/>
     <div className="edit">
             <h3>Editar Projetos</h3>
              <div className="row g-2">
                 <div className="col-md">
                     <div className="form-floating">
                     <input type="text" className="form-control matricula" id="floatingInputGrid matricula" name='matricula' disabled value={projeto?.id}   />
                     <label htmlFor="floatingInputGrid">ID</label>
                     </div>
               </div>           
            </div> 
            <div className="row g-2">


             <div className="col-md">
                     <div className="form-floating">
                         <input type="tel" className="form-control" id="floatingInputGrid" onChange={handleChange} disabled={isDisabled} value={projeto?.nome} name='nome'/>
                         <label htmlFor="floatingInputGrid">Nome</label>
                     </div>
                 </div>

                 <div className="col-md">
                     <div className="form-floating">
                     <select  className="form-control" id="cliente" onChange={handleSelect}  value={projeto?.cliente.cnpj} name="cliente" disabled={isDisabled}>
                        {clientes && 
                        (clientes.map((c) => (
                            
                            <option value={c.cnpj} key={c.cnpj}>{c.nome}</option>
                        )))}
                            </select>
                         <label htmlFor="floatingInputGrid">Cliente</label>
                     </div>
                 </div>

                

             </div>
             <div className="row g-2">
             <div className="col-md">
                        <div className="form-floating">
                            <select  className="form-control" id="cr" onChange={handleSelect} disabled={isDisabled} value={projeto?.cr?.numero} name="cr">
                            {crs && 
                        (crs.map((c) => (
                        
                            <option value={c.numero} key={c.numero}>{c.nome}</option>
                        )))}
                            </select>
                            <label htmlFor="floatingInputGrid">CR</label>
                        </div>
                    </div>  
                    
                
                 <div className="col-md">                        
             <div className="form-floating">
                         <select className="form-control" aria-label="Disabled select example"  onChange={handleSelect} disabled={isDisabled} value={projeto?.status} name="status" >
                         <option value="ativo">Ativo</option>
                         <option value="inativo">Inativo</option>
                         </select>
                         <label htmlFor="floatingInputGrid">Status</label>
                     </div>
                 </div>
             </div>

           
                 <hr className='linha'/>
                 {/* Botão Cadastrar */}
                 {/* <button onClick={editarUsuario}  className='btn btn-primary editar' hidden={isHidden}>Editar</button> */}
                 <button onClick={editarUsuario}  className='btn btn-primary editar' hidden={isHidden}>Editar</button>
                    <div className='alteracao' hidden={isVisible}>
                        <button className='btn btn-danger' id='btn' onClick={cancelar}>Cancelar</button>
                        <button onClick={salvarProjeto} id='btn' className='btn btn-success'>Concluir</button>
                    </div>
         </div>
 </body>
)
}
export default Editar_Projeto