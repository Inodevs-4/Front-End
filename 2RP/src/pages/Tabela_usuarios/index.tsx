import Navbar from "../../components/menu/Navbar";
import './styles.css'

export const Tabela_usuario = () => {

    return(
        <body>
            <Navbar/>
            <p className="h3">Tabela de apontamentos</p>
            <hr />
            <div className="apontamentos">
                <div className="row titles">
                    <div className="col">ID</div>
                    <div className="col">Nome</div>
                    <div className="col">Nivel de acesso</div>
                    <div className="col">Status</div>
                </div>

                <div className="row items">
                    <div className="col">0001</div>
                    <div className="col">Richard</div>
                    <div className="col">Gestor</div>
                    <div className="col"><span className="badge bg-success text-light">Ativo</span></div>
                    <div className="col">
                        <a className="btn btn-primary" href="/aprovacao-lancamento/viewDetails">Visualizar</a>
                    </div>
                </div>

                <div className="row items">
                    <div className="col">0002</div>
                    <div className="col">Jennefer</div>
                    <div className="col">Colaborador</div>
                    <div className="col"><span className="badge bg-danger text-light">Inativo</span></div>
                    <div className="col">
                        <a className="btn btn-primary">Visualizar</a>
                    </div>
                    
                </div>
            </div>

        </body>
    )
}

export default Tabela_usuario;