import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/es/locale/pt_BR';
import GlobalStyles from './styles/GlobalStyles';

ReactDOM.render(
  <ConfigProvider locale={ptBR}>
    <GlobalStyles />
    <App />
  </ConfigProvider>,
  document.getElementById('root')
);
