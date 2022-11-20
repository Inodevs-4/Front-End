import "./dash.css";
import { useContext } from "react";
import { useEffect } from "react";
import { useState} from "react";
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { MdMoreTime } from 'react-icons/md';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { formatarDataHora, formatarHora, formatarInicial } from '../../functions/formatar';
import { AuthContext } from "../../login/AuthContext"; 
import { meusLancamentos, todosLancamentos } from '../../hooks/Lancamento';
import  Navbar  from "../../components/menu/Navbar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList
} from "recharts";
import { Lancamento } from "../../types/Types";


export const Dashboard_geral = () => {
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

const renderCustomizedLabel = (props: any) => {
  const { x, y, width, value } = props;
  const radius = 10;

  return (
    <g>
      <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#5a52fc" />
      <text
        x={x + width / 2}
        y={y - radius}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value.split(" ")[1]}
      </text>
    </g>
  );
};


  return (
  
    <body>
        <div className="hora">
            <h4>Quadro de Horas extras e Sobre avisos Geral</h4>
            <hr />
            <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1" >
                    <Row>
                        <Col sm={4}>
                        <ListGroup className='scroll'>
                            <ListGroup.Item action href='#link1'>
                                <p>Default</p>
                            </ListGroup.Item>
                            {lancamentos.map((Lancamentos) => (
                                <ListGroup.Item action href={'#' + String(Lancamentos?.id)} key={Lancamentos?.id}>
                                {Lancamentos?.modalidade?.includes("hora extra") ? <h5>Hora Extra</h5> : <h5>Sobre aviso</h5>}
                                <hr />
                                <p className='horasobre'> {formatarDataHora(String(Lancamentos?.data_inicio))}</p>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        </Col>

                        <Col sm={8}>
                        <Tab.Content>
                            <Tab.Pane eventKey='#link1'>
                                <MdMoreTime size={200} className="icone"/>    
                            </Tab.Pane>
                            {lancamentos.map((Lancamentos) => (
                                 <Tab.Pane eventKey={'#' + String(Lancamentos?.id)} key={Lancamentos?.id}>
                                    {Lancamentos?.status?.includes("pendente") ? 
                                        <div>
                                            {Lancamentos?.modalidade?.includes("hora extra") ? <span>Hora Extra</span> : <span>Sobre aviso</span>}
                                            <p className="dados"><strong>Gestor:</strong> { Lancamentos?.gestor?.nome}</p>
                                            <p className="dados"><strong>Projeto:</strong> { Lancamentos?.projeto?.nome}</p>
                                            <p className="dados"><strong>Status:</strong> { Lancamentos?.status}</p>
                                            <hr />
                                            <div>
                                                <p className="dados"><strong>Data Início:</strong> {formatarDataHora(String(Lancamentos?.data_inicio))}</p>
                                                <p className="dados"><strong>Data Fim:</strong> { formatarDataHora(String(Lancamentos?.data_fim))}</p>
                                            </div>
                                            <hr />
                                            <p className="dados"><strong>Observações:</strong> { Lancamentos?.observacoes}</p>
                                            <hr />
                                            {!Lancamentos.data_inicio2 ? <p></p> : 
                                            <div>
                                                <p className="dados"><strong>2ª Data Inicio:</strong> {formatarDataHora(String(Lancamentos?.data_inicio2))}</p>
                                                <p className="dados"><strong>2ª Data Fim:</strong> { formatarDataHora(String(Lancamentos?.data_fim2))}</p>
                                            </div>
                                            }
                                        </div>
                                    : <p>Nao pendente</p> }
                                </Tab.Pane>
                            ))}
                        </Tab.Content>
                        </Col>
                    </Row>
            </Tab.Container>
                </div>
    <Navbar/>
    <BarChart
      width={700}
      height={350}
      data={lancamentos}

      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="matricula" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="data_inicio" fill="#8884d8" minPointSize={5}>
        <LabelList dataKey="data_inicio" content={renderCustomizedLabel} />
      </Bar>
      <Bar dataKey="data_fim" fill="#82ca9d" minPointSize={10} />
    </BarChart>
    </body>
  );
}
export default Dashboard_geral;