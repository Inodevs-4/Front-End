import styled from "styled-components";

export const Container = styled.div`
    background-color: white;
    color: #FFF;
    max-height: 100vh;
`;

export const Area = styled.div`
    
    margin: auto;
    width: 1000px;
    height: 80vh;
    display: flex;
    flex-direction: column;
    background-color: #022041;
    padding: 20px;
    margin-top: 20px;
    border-radius: 20px;
    box-shadow: 8px -8px rgba(0,0,0,.5);

`;

export const Steps = styled.div`
    flex: 1;
    display: flex;
`;

export const Sidebar = styled.div`
    width: 250px;
    border-right: 1px solid #3375ba;
    max-height: 60vh;
`;

export const Page = styled.div`
    flex: 1;
    padding-left: 40px;
    padding-top: 40px;
`;