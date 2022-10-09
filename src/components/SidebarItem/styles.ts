import styled from "styled-components";


export const Container = styled.div`
    margin: 30px 0;
    cursor: pointer;


    a {
        display: flex;
        align-items: center;
        text-decoration: none;
    }
`;

export const Info = styled.div`
    flex: 1;
    margin-right: 20px;
`;
export const Title = styled.div`
    text-align: right;
    font-weight: bold;
    margin-bottom: 5px;
    font-size: 15px;
    color: #FFF;
`;
export const Description = styled.div`
    text-align: right;
    font-size: 13px;
    color: #B8B8D4;
`;
export const IconArea = styled.div<{ active: boolean }>`
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: ${props=> props.active ? 'white': "#3375ba"};
    color: ${props=> props.active ? '#022041': "white"};
    display: flex;
    justify-content: center;
    align-items: center;

    :hover {
        background-color: #FFF;
        color: #022041;
    }


`;
export const Point = styled.div<{ active: boolean }>`
    width: 10px;
    height: 10px;
    border: 3px solid  #3375ba;
    border-radius: 50%;
    margin-left: 30px;
    margin-right: -6px;
    background-color:${props=> props.active ? 'white': "#02044A"};

`;
