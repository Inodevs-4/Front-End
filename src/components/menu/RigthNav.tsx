import * as S from './styles';
import CottageIcon from '@mui/icons-material/Cottage';
import AddIcon from '@mui/icons-material/Add';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import DashboardIcon from '@mui/icons-material/Dashboard';

import {
  NavLink,
} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../login/AuthContext';

type Props = {
  open: boolean;
};

function RightNav(props: Props) {
  const auth = useContext(AuthContext)

  const handleLogout = () => {
      auth.signout()
      window.location.href = ''
  }

  return (
    <S.Ul open={props.open}>
       
    <NavLink
      to='/'
  
    >
      {/* <CottageIcon color='primary'/> */}
      <S.Li> <CottageIcon color='primary'/>Home</S.Li>
    </NavLink>
    <NavLink
      to='/etapa1'
   
    >
      {/* <AddIcon  color='primary'/> */}
      <S.Li> <AddIcon  color='primary'/>Cadastrar Horas</S.Li>
    </NavLink>
    {(auth.colaborador?.perfil === "gestor" || auth.colaborador?.perfil === "administrador") && (
    <NavLink
      to='/aprovacao-lancamento'
     
    >
      {/* <PlaylistAddCheckIcon  color='primary'/> */}
      <S.Li> <PlaylistAddCheckIcon  color='primary'/>Apontamentos</S.Li>
    </NavLink>
    )}

  {(auth.colaborador?.perfil === "administrador") && (
    <NavLink
      to='/tabela_usuarios'
     
    >
      {/* <PlaylistAddCheckIcon  color='primary'/> */}
      <S.Li> <PlaylistAddCheckIcon  color='primary'/>Tabela Usuários</S.Li>
    </NavLink>
  )}
  {(auth.colaborador?.perfil === "gestor" || auth.colaborador?.perfil === "administrador") && (
    <NavLink
      to='/projetos'
   
    >
      {/* <GroupIcon  color='primary'/> */}
      <S.Li> <GroupIcon  color='primary'/>Projetos</S.Li>
    </NavLink>
  )}

  {(auth.colaborador?.perfil === "gestor" || auth.colaborador?.perfil === "administrador") && (
    <NavLink
      to='/clientes'
   
    >
      {/* <GroupIcon  color='primary'/> */}
      <S.Li> <PersonIcon  color='primary'/>Clientes</S.Li>
    </NavLink>
  )}

  {(auth.colaborador?.perfil === "gestor" || auth.colaborador?.perfil === "administrador") && (
    <NavLink
      to='/crs'
   
    >
      {/* <GroupIcon  color='primary'/> */}
      <S.Li> <PersonIcon  color='primary'/>Crs</S.Li>
    </NavLink>
  )}

  {(auth.colaborador?.perfil === "administrador") && (
    <NavLink
      to='/manipulacao-hora-sobreaviso'
   
    >
      {/* <ModeEditIcon  color='primary'/> */}
      <S.Li> <ModeEditIcon  color='primary'/> Manipulação Horas</S.Li>
    </NavLink>
  )}

    <NavLink
      to='/dashboard'
    >
      {/* <DashboardIcon  color='primary'/> */}
      <S.Li> <DashboardIcon  color='primary'/>Dashboards</S.Li>
      
    </NavLink>

{(auth.colaborador?.perfil === "gestor" || auth.colaborador?.perfil === "administrador") && (
    <NavLink
      to='/dashboard_geral'
    >
      {/* <DashboardIcon  color='primary'/> */}
      <S.Li> <DashboardIcon  color='primary'/>Dashboard Geral</S.Li>
      
    </NavLink>
)}
    <NavLink
      to='/historico'
   
    >
    
      {/* <HistoryToggleOffIcon  color='primary'/> */}
      <S.Li> <HistoryToggleOffIcon  color='primary'/>Histórico</S.Li>
    </NavLink>
    <button onClick={handleLogout}>Sair</button>

  </S.Ul>
   
  );
}

export default RightNav;