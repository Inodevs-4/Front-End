import Navbar from '../../components/menu/Navbar';
import { useNavigate } from 'react-router-dom';
import { salvarVerba} from '../../hooks/Verba';
import './styles.css'
import { Verba } from '../../types/Types';
import { useState  } from 'react';
import { formatarHoraInput } from '../../functions/formatar';

export const Cadastro_verba = () => {
    const [verbas, setVerbas] = useState<Verba>()



    function handleChange(e: any) {
        setVerbas({...verbas, [e.target.name]: e.target.value})
    }

    function handleEvento(e: any){
        if(verbas?.evento === 1){
            setVerbas({...verbas, [e.target.name]: 0})
        } else {
            setVerbas({...verbas, [e.target.name]: 1})
        }
    }

    const history = useNavigate()

    function voltar() {
        history('/manipulacao-hora-sobreaviso')
    }
    const salvandoVerba = () => {
        salvarVerba(verbas)
        history('/manipulacao-horas-sobreavisso')
        console.log(verbas)
    }
    




    return(
        <body>
            <Navbar/>
            <div className="area">
                <div className="linha">
                <div className="aviso">
                        <h3>IMPORTANTE!</h3>
                        <hr />
                        <p>Valor fixo p/ hora:</p>
                        <ul>
                            <li><strong>Segunda à Sexta: </strong>R$12,00</li>
                            <li><strong>Sábado: </strong>R$17,00</li>
                            <li><strong>Domingo: </strong>R$22,00</li>
                            <li><strong>Feriado: </strong>15% sobre o valor do dia + adicional</li>
                        </ul>
                    </div>
                    <div className="form-group ">
                        <label className="titulo"htmlFor="exampleFormControlInput1">Número</label>
                        <input name="numero" type="number" className="form-control" onChange={handleChange} id="numero" value={verbas?.numero} />
                    </div>
                    <div className="form-group ">
                        <label className="titulo"htmlFor="exampleFormControlInput1">Adicional</label>
                        <input name="adicional" type="number" className="form-control" onChange={handleChange} id="adicional" value={verbas?.adicional} placeholder='0%' />
                    </div>
                </div>
                <div className="linha">
                    <div className="form-group ">
                        <label className="titulo"htmlFor="exampleFormControlInput1">Início</label>
                        <input type="time" className="form-control" id="Inicio" onChange={handleChange}  value={(String(verbas?.inicio))} name="inicio"  />
                    </div>
                    <div className="form-group ">
                        <label className="titulo"htmlFor="exampleFormControlInput1">Fim</label>
                        <input type="time" className="form-control" onChange={handleChange} value={(String(verbas?.fim))} id="fim" name="fim" />
                    </div>
                </div>
                <div className="linha">
                    <p>Eventos:</p> 
                    <div className="form-check">
                        <input name="evento" className="form-check-input" onChange={handleEvento} type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">
                            Feriado
                        </label>
                    </div>
                    <p>Período Semanal:</p>
                        <select className="form-control select" aria-label="Disabled select example"  onChange={handleChange} name="periodo" >
                        <option value="segunda_sexta">Segunda a Sexta</option>
                        <option value="sabado">Sábado</option>
                        <option value="domingo">Domingo</option>
                        </select>
                    <hr />
                </div>
                
                <div className="bottons">
                    {/* <div className="form-group">
                        <label className='titulo' htmlFor="exampleFormControlInput1">Cálculo(R$)</label>
                        <input className="form-control" name="calculo" type="text" onChange={handleChange} placeholder="00,00" id='exampleFormControlInput1' readOnly/>
                    </div> */}
                    <button className='btn btn-primary' onClick={salvandoVerba}>Cadastrar</button>
                    <button className='btn btn-secondary' onClick={voltar}>Cancelar</button>
                </div>
            </div>
        </body>
    )
}

export default Cadastro_verba;