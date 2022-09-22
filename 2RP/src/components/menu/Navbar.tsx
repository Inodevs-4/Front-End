import * as S from './styles';

import Burger from './Burger';

type Props = {
  children?: ChildNode;
};

export default function Navbar(props: Props) {
  return (
    <>
      <S.Nav>
        <S.Logo src={"https://www.2rpnet.com.br/assets/images/2rp-net.svg"} alt='Gustavo Scarpim' />
      </S.Nav>
      <Burger />
      {props.children}
    </>
  );
}
