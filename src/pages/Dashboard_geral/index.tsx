import "./dash.css";
import { useEffect } from "react";
import { useState} from "react";
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { MdMoreTime } from 'react-icons/md';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { formatarDataHora } from '../../functions/formatar';
import {  graficoGeral, todosLancamentos, todosLancamentosFiltro } from '../../hooks/Lancamento';
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
import { Cliente, Colaborador, CR, Lancamento } from "../../types/Types";
import { todosCRs } from "../../hooks/CR";
import { todosClientes } from "../../hooks/Clientes";
import { selectColaboradores } from "../../hooks/Colaborador";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { exportPdfGeral } from "../../functions/pdf";

export const Dashboard_geral = () => {

    const [mLancamentos, setMLancamentos] = useState<Lancamento[]>([])
    const [dadosGrafico, setDadosGrafico] = useState<{name: string, horaextra: number, sobreaviso: number}[]>([])

    const [crs, setCrs] = useState<CR[]>([])
    const [clientes, setClientes] = useState<Cliente[]>([])
    const [colaboradores, setColaboradores] = useState<Colaborador[]>([])
    const [search, setSearch] = useState<{colaborador: string, cliente: string, cr:string}>({colaborador: "*", cliente: "*", cr: "*"})

    useEffect(() => {
      (async() => {
          setMLancamentos(await todosLancamentos())
          setDadosGrafico(await graficoGeral())
          setCrs(await todosCRs())
          setClientes(await todosClientes())
          setColaboradores(await selectColaboradores())
      })()
  }, [])  

  function handleSelect(e: any) {
    setSearch({...search, [e.target.name]: e.target.options[e.target.selectedIndex].value,})
  } 

  async function searchLancamento() {
    setMLancamentos(await todosLancamentosFiltro(search.colaborador, search.cliente, search.cr))
  }

  async function clear() {
    setMLancamentos(await todosLancamentos())
    setSearch({colaborador: "*", cliente: "*", cr: "*"})
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
            <h4>Quadro Geral de Horas extras e Sobreavisos</h4>
            <hr />
            <div className="selects">
                <select  className="form-select search-select" id="colaborador" onChange={handleSelect} name="colaborador" value={search.colaborador}>
                  <option value="*" disabled selected>Colaborador</option>
                  {colaboradores && 
                  (colaboradores.map((c) => (
                      <option value={c.matricula} key={c.matricula}>{c.nome}</option>
                  )))}
                </select>

              <select  className="form-select search-select" id="cliente" onChange={handleSelect} name="cliente" value={search.cliente}>
                <option value="*" disabled selected>Cliente</option>
                {clientes && 
                (clientes.map((c) => (
                    <option value={c.cnpj} key={c.cnpj}>{c.nome}</option>
                )))}
              </select>

              <select  className="form-select search-select" id="cr" onChange={handleSelect} name="cr" value={search.cr}>
                <option value="*" disabled selected>CR</option>
                {crs && 
                (crs.map((c) => (
                    <option value={c.numero} key={c.numero}>{c.nome}</option>
                )))}
              </select>
              
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
                            {mLancamentos.map((Lancamentos) => (
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
                            {mLancamentos.map((Lancamentos) => (
                                 <Tab.Pane eventKey={'#' + String(Lancamentos?.id)} key={Lancamentos?.id}>
                                    {Lancamentos?.status?.includes("pendente") ? 
                                        <div>
                                            {Lancamentos?.modalidade?.includes("hora extra") ? <span>Hora Extra</span> : <span>Sobreaviso</span>}
                                            <p className="dados"><strong>Colaborador:</strong> { Lancamentos?.colaborador?.nome}</p>
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
    <h4 className="mb-4">Horas Extras e Sobreaviso trabalhadas na empresa em 2022</h4>
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
    <button onClick={exportPdfGeral}>Exportar Pdf</button>
    </div>
    </body>
  );
}
export default Dashboard_geral;