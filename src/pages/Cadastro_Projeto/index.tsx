import Navbar from '../../components/menu/Navbar';
import { useContext, useEffect, useState } from 'react'
// import Calendar from 'react-calendar';
import "./styles.css";

import { AuthContext } from '../../login/AuthContext';


export const Projeto = () =>{


  const auth = useContext(AuthContext)

   

    return(
    
         <body>
        <Navbar/>
        <div className="edit">
                <h3>Cadastro Projetos</h3>
                {/* Matricula && Perfil */}
                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                        <input type="text" className="form-control matricula" id="floatingInputGrid matricula" name='matricula'  />
                        <label htmlFor="floatingInputGrid">ID</label>
                        </div>
                    </div>
                  
                </div>

                {/* Nome */}
                <div className="row g-2">


                <div className="col-md">
                        <div className="form-floating">
                            <input type="tel" className="form-control" id="floatingInputGrid"   name='telefone'/>
                            <label htmlFor="floatingInputGrid">Nome</label>
                        </div>
                    </div>

                    <div className="col-md">

                    <select className="form-select perfil" aria-label="Disabled select example" name='perfil'>
                            <option value="colaborador">Cliente</option>
                            <option value="gestor">Gestor</option>
                            <option value="administrador">Administrador</option>
                    </select>
                   </div>

                    

                </div>
                {/* Turno && Email */}
                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <select  className="form-select" id="floatingInputGrid" name="modalidade">
                            <option value="hora extra">1</option>
                            <option value="sobreaviso">2</option>
                            </select>
                            <label htmlFor="floatingInputGrid">CR</label>
                        </div>
                    </div>  
                        
                    
                    <div className="col-md">                        
                <div className="form-floating">
                            <select className="form-select" aria-label="Disabled select example"  name="acionado" >
                            <option value="nao">Ativo</option>
                            <option value="sim">Inativo</option>
                            </select>
                            <label htmlFor="floatingInputGrid">Status</label>
                        </div>
                    </div>
                </div>

               
                    <hr className='linha'/>
                    {/* Botão Cadastrar */}
                    {/* <button onClick={salvarColaborador}  className='btn btn-primary cadastrar1'>Cadastrar</button> */}
            </div>
    </body>
    );
    }
    export default Projeto