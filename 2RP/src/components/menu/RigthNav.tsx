import * as S from './styles';


import {
  NavLink,
} from 'react-router-dom';

type Props = {
  open: boolean;
};

function RightNav(props: Props) {
  return (
      <S.Ul open={props.open}>
       

        <NavLink
          to='/pagina-inicial'
      
        >
          <S.Li>Home</S.Li>
        </NavLink>
        <NavLink
          to='/etapa1'
       
        >
          <S.Li>Apontamento</S.Li>
        </NavLink>
        <NavLink
          to='/menu3'
         
        >
          <S.Li>Menu 3</S.Li>
        </NavLink>
        <NavLink
          to='/menu4'
       
        >
          <S.Li>Menu 4</S.Li>
        </NavLink>
      </S.Ul>
   
  );
}

export default RightNav;