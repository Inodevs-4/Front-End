import Navbar from '../../components/menu/Navbar';
import { useNavigate } from 'react-router-dom';
import './styles.css'

export const Cadastro_verba = () => {
    const history = useNavigate()

    function voltar() {
        history('/manipulacao-hora-sobreaviso')
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
                        <input type="number" className="form-control" id="exampleFormControlInput1" />
                    </div>
                    <div className="form-group ">
                        <label className="titulo"htmlFor="exampleFormControlInput1">Adicional</label>
                        <input type="number" className="form-control" id="exampleFormControlInput1" placeholder='0%' />
                    </div>
                </div>
                <div className="linha">
                    <div className="form-group ">
                        <label className="titulo"htmlFor="exampleFormControlInput1">Início</label>
                        <input type="time" className="form-control" id="exampleFormControlInput1" />
                    </div>
                    <div className="form-group ">
                        <label className="titulo"htmlFor="exampleFormControlInput1">Fim</label>
                        <input type="time" className="form-control" id="exampleFormControlInput1" />
                    </div>
                </div>
                <div className="linha">
                    <p>Eventos:</p> 
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck"/>
                        <label className="form-check-label" htmlFor="gridCheck">
                            Feriado
                        </label>
                    </div>
                    <p>Período Semanal:</p>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" />
                        <label className="form-check-label" htmlFor="gridRadios1">
                            Segunda à Sexta
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" />
                        <label className="form-check-label" htmlFor="gridRadios1">
                            Sábado
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2"/>
                        <label className="form-check-label"htmlFor="gridRadios2">
                            Domingo
                        </label>
                    </div>
                    <hr />
                </div>
                
                <div className="bottons">
                    <div className="form-group">
                        <label className='titulo' htmlFor="exampleFormControlInput1">Cálculo(R$)</label>
                        <input className="form-control" type="text" placeholder="00,00" id='exampleFormControlInput1' readOnly/>
                    </div>
                    <a href="" className='btn btn-primary'>Cadastrar</a>
                    <a href="" className='btn btn-secondary' onClick={voltar}>Cancelar</a>
                </div>
            </div>
        </body>
    )
}

export default Cadastro_verba;