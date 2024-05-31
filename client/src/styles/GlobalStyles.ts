import { createGlobalStyle } from 'styled-components';
import backgroundImage from '../assets/images/background.jpg'; // Importe a imagem aqui

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    background-image: url(https://img.freepik.com/free-photo/modern-led-headlight-white-automobile_23-2147963070.jpg?t=st=1716150019~exp=1716153619~hmac=51095eef7a5656276776feebef1e3d5329dd7143ef93ad558b5dac0c7daec358&w=1380);
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
  }
`;

export default GlobalStyles;
