import styled from 'styled-components';

export const BoardDiv = styled.div`
    width: 450px;
    height: 450px;
    grid-template-columns: 150px 150px 150px;
    grid-template-rows: 150px 150px 150px;
    background-color: #05A8AA;
    display: grid;
    border-radius: 6px;
    padding: 4px;
    @media (max-width: 500px){
        width: 270px;
        height: 270px;
        grid-template-columns: 90px 90px 90px;
        grid-template-rows: 90px 90px 90px;
    }
`;

export const Background = styled.div`
    background-color: white;
    width: 458px;
    height: 458px;
    margin: auto;
    @media (max-width: 500px){
        width: 278px;
        height: 278px;
    }
`;