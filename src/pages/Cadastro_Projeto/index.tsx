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
                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                        <input type="text" className="form-control matricula" id="floatingInputGrid matricula" name='matricula'  />
                        <label htmlFor="floatingInputGrid">ID</label>
                        </div>
                    </div>
                  
                </div>

            
                <div className="row g-2">


                <div className="col-md">
                        <div className="form-floating">
                            <input type="tel" className="form-control" id="floatingInputGrid"   name='telefone'/>
                            <label htmlFor="floatingInputGrid">Nome</label>
                        </div>
                    </div>

                    <div className="col-md">
                        <div className="form-floating">
                            <select  className="form-select" id="floatingInputGrid" name="modalidade">
                            <option value="hora extra">1</option>
                            <option value="sobreaviso">2</option>
                            </select>
                            <label htmlFor="floatingInputGrid">Cliente</label>
                        </div>
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
                    <button  className='btn btn-success cadastrar1'>Cadastrar</button>
            </div>
    </body>
    );
    }
    export default Projeto