import Navbar from "../../components/menu/Navbar";
import './styles.css'


export const DetalhesApontamento = () => {
    return(
        <body>
            <Navbar/>


            <div className="edit">
                <h3>Lançamento</h3>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingInput" value="Eduardo Carvalho" readOnly/>
                    <label htmlFor="floatingInput">Nome</label>
                </div>

                <div className="row g-2">
                    <div className="col-md">
                        <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInputGrid" value="Hora Extra" readOnly/>
                        <label htmlFor="floatingInputGrid">Modalidade</label>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="form-floating">
                            <input type="text" className="form-control" id="floatingInputGrid" value="Esqueci :o" readOnly/>
                            <label htmlFor="floatingInputGrid">Tipo</label>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}
export default DetalhesApontamento;