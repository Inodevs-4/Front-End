import { useState } from "react";
import Navbar from "../../components/menu/Navbar";
import './styles.css'


export const DetalhesApontamento = () => {

    // Função para ativar inputs
    const[isDisabled, setIsDisabled] = useState(true);

    return(
        <body>
            <Navbar/>
            { /* Lançamento */}
            <div className="edit">
                <h3>Lançamento</h3>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" disabled={isDisabled} defaultValue="Felipe"/>
                    <label htmlFor="floatingInputGrid">Nome</label>
                </div>
                { /* Modalidade && Tipo && 2º acionamento*/}
                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInputGrid" disabled={isDisabled} defaultValue="Sem modalidade"/>
                        <label htmlFor="floatingInputGrid">Modalidade</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" className="form-control" id="floatingInputGrid" disabled={isDisabled} defaultValue="Sem Tipo" readOnly/>
                            <label htmlFor="floatingInputGrid">Tipo</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" className="form-control" id="floatingInputGrid" disabled={isDisabled} defaultValue="Sem 2º acionamento" readOnly/>
                            <label htmlFor="floatingInputGrid">Houve 2º acionamento?</label>
                        </div>
                    </div>
                </div>
                { /* Inicio && Fim */}
                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" className="form-control" id="floatingInputGrid" disabled={isDisabled} defaultValue="Sem inicio" readOnly/>
                            <label htmlFor="floatingInputGrid">Inicio</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" className="form-control" id="floatingInputGrid" disabled={isDisabled} defaultValue="Sem fim" readOnly/>
                            <label htmlFor="floatingInputGrid">Fim</label>
                        </div>
                    </div>
                </div>
                { /* Inicio2 && Fim2 */}
                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" className="form-control" id="floatingInputGrid" disabled={isDisabled} defaultValue="Sem inicio2" readOnly/>
                            <label htmlFor="floatingInputGrid">2º Inicio</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" className="form-control" id="floatingInputGrid" disabled={isDisabled} defaultValue="Sem fim" readOnly/>
                            <label htmlFor="floatingInputGrid">2º Fim</label>
                        </div>
                    </div>
                </div>
                { /* Projeto && Gestor */}
                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" className="form-control" id="floatingInputGrid" disabled={isDisabled} defaultValue="Sem Projeto" readOnly/>
                            <label htmlFor="floatingInputGrid">Projeto</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" className="form-control" id="floatingInputGrid" disabled={isDisabled} defaultValue="Sem Gestor" readOnly/>
                            <label htmlFor="floatingInputGrid">Gestor</label>
                        </div>
                    </div>
                </div>
                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" className="form-control" id="floatingInputGrid" disabled={isDisabled} defaultValue="Sem Observação" readOnly/>
                            <label htmlFor="floatingInputGrid">Observação</label>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}
export default DetalhesApontamento;