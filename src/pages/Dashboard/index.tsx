import "./stylesDashboard.css";
import { useContext } from "react";
import { useEffect } from "react";
import { useState} from "react";
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { MdMoreTime } from 'react-icons/md';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { formatarDataHora } from '../../functions/formatar';
import { AuthContext } from "../../login/AuthContext"; 
import { todosLancamentosColab } from '../../hooks/Lancamento';
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


export const Dashboard = () => {
const auth = useContext(AuthContext)

    const [lancamentos, setLancamentos] = useState<Lancamento[]>([])
    useEffect(() => {
        (async() => {
          setLancamentos(await todosLancamentosColab(String(auth.colaborador?.matricula)))
        })()
    }, [])

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
      <Navbar/>
      <div className="containeraaa">
        <div className="hora">
            <h4>Quadro de Horas extras e Sobreavisos</h4>
            <h6>Colaborador: {auth.colaborador?.nome}</h6>
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
                                {Lancamentos?.modalidade?.includes("hora extra") ? <h5>Hora Extra</h5> : <h5>Sobreaviso</h5>}
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
                                            {Lancamentos?.modalidade?.includes("hora extra") ? <span>Hora Extra</span> : <span>Sobreaviso</span>}
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
    <div className="eu">
    <BarChart
      width={700}
      height={350}
      data={[
        {name: "jan/2022", horaextra: 10, sobreaviso: 20}, 
        {name: "fev/2022", horaextra: 15, sobreaviso: 7},
        {name: "mar/2022", horaextra: 10, sobreaviso: 20}, 
        {name: "abr/2022", horaextra: 15, sobreaviso: 7},
        {name: "mai/2022", horaextra: 10, sobreaviso: 20}, 
        {name: "jun/2022", horaextra: 15, sobreaviso: 7},
        {name: "jul/2022", horaextra: 10, sobreaviso: 20}, 
        {name: "ago/2022", horaextra: 15, sobreaviso: 7},
        {name: "set/2022", horaextra: 10, sobreaviso: 20}, 
        {name: "out/2022", horaextra: 15, sobreaviso: 7},
        {name: "nov/2022", horaextra: 10, sobreaviso: 20}, 
        {name: "dez/2022", horaextra: 15, sobreaviso: 7}
      ]}

      margin={{
        top: 5,
        right: 50,
        left: -20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="horaextra" fill="#8884d8" minPointSize={5}>
        <LabelList dataKey="horaextra" content={renderCustomizedLabel} />
      </Bar>
      <Bar dataKey="sobreaviso" fill="#82ca9d" minPointSize={10} />
    </BarChart>
    </div>
    </div>
    </body>
  );
}
export default Dashboard;