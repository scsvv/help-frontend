import styled from "styled-components";

export const LoginStyled = styled.div`
    position: fixed;
    transform: translateX(-50%);
    left: 50%;
    top: 25%;
    width: calc(min-content + 10px);
    padding: 10px;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;

    * {
        margin: 5px;
    }

    .buttons-area {

    }
`

export const SendBox = styled.div`
    width: min-content; 
    margin: 0 auto;
    margin-top: 30px; 
    text-align: center;
` 

export const Header = styled.div`
    display: flex; 
    justify-content: end; 
`