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
import { graficoIndividual, todosLancamentosColab, todosLancamentosColabPeriodo } from '../../hooks/Lancamento';
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
import { exportPdfColaborador } from "../../functions/pdf";
import TimelineHorasPorMes from "./TimelineHorasPorMes";
import Grafico_HorasMensais from "./grafico_HorasMensais";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

export const Dashboard = () => {
const auth = useContext(AuthContext)

const [search, setSearch] = useState<{data1: string, data2: string, modalidade: "*"}>({data1: "*", data2: "*", modalidade: "*"})

const [dadosGrafico, setDadosGrafico] = useState<{name: string, horaextra: number, sobreaviso: number}[]>([])
    const [lancamentos, setLancamentos] = useState<Lancamento[]>([])
    useEffect(() => {
        (async() => {
          setLancamentos(await todosLancamentosColab(String(auth.colaborador?.matricula)))
          setDadosGrafico(await graficoIndividual(String(auth.colaborador?.matricula)))
        })()
    }, [])

    function exportPdf() {
      exportPdfColaborador(String(auth.colaborador?.matricula));
    }

    function handleChange(e: any) {
      setSearch({...search, [e.target.name]: e.target.value})
    }  
    
    function handleSelect(e: any) {
      setSearch({...search, [e.target.name]: e.target.options[e.target.selectedIndex].value,})
    } 

    async function searchLancamento() {
      setLancamentos(await todosLancamentosColabPeriodo(String(auth.colaborador?.matricula), search.data1, search.data2, search.modalidade))
    }
  
    async function clear() {
      setLancamentos(await todosLancamentosColab(String(auth.colaborador?.matricula)))
      setSearch({data1: "*", data2: "*", modalidade: "*"})
    }
  

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
            <div className="selects">
              <select  className="form-select search-select" id="modalidade" onChange={handleSelect} name="modalidade" value={search.modalidade}>
                <option value="*" disabled selected>Modalidade</option>
                <option value="sobreaviso">Sobreaviso</option>
                <option  value="hora extra">Hora Extra</option>
              </select>

              <input className="search" value={search.data1} name="data1" type="date" onChange={handleChange}/>
              <input className="search" value={search.data2} name="data2" type="date" onChange={handleChange}/>
              
              <button className="search-button btn btn-primary" onClick={searchLancamento}><SearchIcon /></button>
              <button className="search-button btn btn-secondary" onClick={clear}><ClearIcon /></button>
            </div>

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
      data={dadosGrafico}

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
    
    <button onClick={exportPdf} className="btn btn-primary export-pdf">Exportar Pdf</button>

    </div>

    <div className="timel">
      <TimelineHorasPorMes/>
    </div>
    <div className="horas_mensais">
<Grafico_HorasMensais/>
</div> 
    </body>
  );
}
export default Dashboard;
