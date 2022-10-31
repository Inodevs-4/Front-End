import Navbar from '../../components/menu/Navbar';
import { useState } from 'react'
import "./styles.css";
import { Colaborador} from '../../types/Types'
import { useNavigate} from 'react-router-dom';
import { salvarColaborador } from '../../hooks/Colaborador';
export const CadastroUsuario = () =>{

    const [colaborador, setColaborador] = useState<Colaborador>()
      
    function handleChange(e: any) {
        setColaborador({...colaborador, [e.target.name]: e.target.value})
    }

    function handleSelect(e: any) {
        setColaborador({...colaborador, [e.target.name]: e.target.options[e.target.selectedIndex].value,})
    }

    const history = useNavigate();

    const salvandoColaborador = () => {
        salvarColaborador(colaborador)
        history('/tabela_usuarios')

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
                        <input type="text" className="form-control matricula" id="floatingInputGrid matricula" value={colaborador?.matricula} name='matricula' onChange={handleChange} />
                        <label htmlFor="floatingInputGrid">Matrícula</label>
                        </div>
                    </div>
                    <div className="col-md">
                    <select className="form-select turno" aria-label="Disabled select example" value={colaborador?.turno} onChange={handleSelect} name='turno'>
                            <option value="Manhã">Manhã</option>
                            <option value="Tarde">Tarde</option>
                            <option value="Noite">Noite</option>
                            <option value="Madrugada">Madrugada</option>
                    </select>
                        
                    </div>
                </div>

                {/* Nome */}
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" value={colaborador?.nome} onChange={handleChange} name='nome'/>
                    <label htmlFor="floatingInput">Nome</label>
                </div>
                {/* Turno && Email */}
                <div className="row g-2">
                    <div className="col-md">
                    <select className="form-select status" aria-label="Disabled select example" value={colaborador?.status} onChange={handleSelect} name='status'>
                            <option value="ativo">Ativo</option>
                            <option value="inativo">Inativo</option>

                    </select>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="email" className="form-control" id="floatingInputGrid" value={colaborador?.email} onChange={handleChange} name='email'/>
                            <label htmlFor="floatingInputGrid">Email</label>
                        </div>
                    </div>
                </div>

                {/* Status e telefone */}
                <div className="row g-2">
                    <div className="col-md">

                    <select className="form-select perfil" aria-label="Disabled select example" value={colaborador?.perfil} onChange={handleSelect} name='perfil'>
                            <option value="colaborador">Colaborador</option>
                            <option value="gestor">Gestor</option>
                            <option value="administrador">Administrador</option>
                    </select>
                    </div>

                    <div className="col-md">
                        <div className="form-floating">
                            <input type="tel" className="form-control" id="floatingInputGrid" value={colaborador?.telefone} onChange={handleChange} name='telefone'/>
                            <label htmlFor="floatingInputGrid">Telefone</label>
                        </div>
                    </div>

                </div> 
                <div className="form-floating mb-3 pb-2">
                        <input type="password" className="form-control" id="floatingInput" value={colaborador?.senha} onChange={handleChange} name='senha'/>
                        <label htmlFor="floatingInput">Senha</label>
                    </div>
                    <hr className='linha'/>
                    {/* Botão Cadastrar */}
                    <button onClick={salvandoColaborador}  className='btn btn-primary cadastrar1'>Cadastrar</button>
            </div>
    </body>
    )
    }
    export default CadastroUsuario