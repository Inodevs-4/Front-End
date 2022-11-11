import { useContext, useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Navbar from "../../components/menu/Navbar";
import { meusLancamentos, todosLancamentos } from '../../hooks/Lancamento';
import { Lancamento } from '../../types/Types';
import { AuthContext } from '../../login/AuthContext';
import "./stylesDashboard.css"
import { formatarDataHora } from '../../functions/formatar';
export const Dashboard = () => {
    const auth = useContext(AuthContext)
    const [mLancamentos, setMLancamentos] = useState<Lancamento[]>([])

    useEffect(() => {
      (async() => {
          setMLancamentos(await todosLancamentos())
      })()
  }, [])  

    const [lancamentos, setLancamentos] = useState<Lancamento[]>([])
    useEffect(() => {
        (async() => {
          setLancamentos(await meusLancamentos(String(auth.colaborador?.matricula)))
        })()
    }, [])
    console.log(mLancamentos)
    return(
        <body>
            <Navbar/>
            <div className="hora">
            <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1" >
                    <Row>
                        <Col sm={4}>
                        <ListGroup className='scroll'>
                            {mLancamentos.map((Lancamentos) => (
                                <ListGroup.Item action href={'#' + String(Lancamentos?.id)} key={Lancamentos?.id}>
                                    Hora Extra #{Lancamentos?.id}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        </Col>

                        <Col sm={8}>
                        <Tab.Content>

                            {mLancamentos.map((Lancamentos) => (
                                 <Tab.Pane eventKey={'#' + String(Lancamentos?.id)} key={Lancamentos?.id}>
                                    {Lancamentos?.status?.includes("pendente") ? 
                                        <div>
                                            <p>Gestor: { Lancamentos?.gestor?.nome}</p>
                                            <p>Projeto: { Lancamentos?.projeto?.nome}</p>
                                        </div>
                                    : <p>Nao pendente</p> }
                                </Tab.Pane>
                            ))}
                        </Tab.Content>
                        </Col>
                    </Row>
            </Tab.Container>
                </div>
        </body>
    )
}

export default Dashboard;