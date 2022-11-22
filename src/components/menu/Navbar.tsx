import * as S from './styles';

import Burger from './Burger';
import { NavLink } from 'react-router-dom';

type Props = {
  children?: ChildNode;
};

export default function Navbar(props: Props) {
  return (
    <>
      <S.Nav>
      <NavLink
      to='/home'
    >
       <S.Logo src={"https://www.2rpnet.com.br/assets/images/2rp-net.svg"} alt='Gustavo Scarpim' />
      
    </NavLink>
      
      </S.Nav>
      <Burger />
      {props.children}
    </>
  );
}
