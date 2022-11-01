import Navbar from '../../components/menu/Navbar';
import './styles.css'

export const Cadastro_verba = () => {
    return(
        <body>
            <Navbar/>
            <div className="area">
                <div className="linha">
                    <div className="form-group ">
                        <label className="titulo"htmlFor="exampleFormControlInput1">Número</label>
                        <input type="number" className="form-control" id="exampleFormControlInput1" />
                    </div>
                    <div className="form-group ">
                        <label className="titulo"htmlFor="exampleFormControlInput1">Adicional</label>
                        <input type="number" className="form-control" id="exampleFormControlInput1" />
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
                </div>
                <div className="aviso">
                    <h3>Testanto</h3>
                </div>
            </div>
        </body>
    )
}

export default Cadastro_verba;