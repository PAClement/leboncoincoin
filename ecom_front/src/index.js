import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './styles/index.css';
import './styles/main.scss';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(<App name="Saeloun blog" callback={() => console.log("Blog rendered")} />);

