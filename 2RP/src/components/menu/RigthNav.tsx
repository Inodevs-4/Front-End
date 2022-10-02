import * as S from './styles';
import CottageIcon from '@mui/icons-material/Cottage';
import AddIcon from '@mui/icons-material/Add';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import GroupIcon from '@mui/icons-material/Group';
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
      to='/pagina-inicial'
  
    >
      {/* <CottageIcon color='primary'/> */}
      <S.Li> <CottageIcon color='primary'/> Home</S.Li>
    </NavLink>
    <NavLink
      to='/etapa1'
   
    >
      {/* <AddIcon  color='primary'/> */}
      <S.Li> <AddIcon  color='primary'/> Cadastrar<br/>Horas</S.Li>
    </NavLink>
    <NavLink
      to='/aprovacao-lancamento'
     
    >
      {/* <PlaylistAddCheckIcon  color='primary'/> */}
      <S.Li> <PlaylistAddCheckIcon  color='primary'/> Tabela de<br/>apontamentos</S.Li>
    </NavLink>
    <NavLink
      to='/tabela_usuarios'
     
    >
      {/* <PlaylistAddCheckIcon  color='primary'/> */}
      <S.Li> <PlaylistAddCheckIcon  color='primary'/>Tabela<br/>Usuarios</S.Li>
    </NavLink>
    <NavLink
      to='/tabela_usuario'
   
    >
      {/* <GroupIcon  color='primary'/> */}
      <S.Li> <GroupIcon  color='primary'/> Projetos</S.Li>
    </NavLink>

    <NavLink
      to='/menu4'
   
    >
      {/* <ModeEditIcon  color='primary'/> */}
      <S.Li> <ModeEditIcon  color='primary'/> Manipulação<br/>Horas</S.Li>
    </NavLink>

    <NavLink
      to='/menu4'
   
    >
      {/* <DashboardIcon  color='primary'/> */}
      <S.Li> <DashboardIcon  color='primary'/> Dashboards</S.Li>
    </NavLink>

    <NavLink
      to='/menu4'
   
    >
      {/* <HistoryToggleOffIcon  color='primary'/> */}
      <S.Li> <HistoryToggleOffIcon  color='primary'/> Historico</S.Li>
    </NavLink>



  </S.Ul>
   
  );
}

export default RightNav;