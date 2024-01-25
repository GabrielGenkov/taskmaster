import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './utils/redux/store';
import HomePage from './views/home/Home';
import BoardPage from './views/board/BoardPage';
import LogInPage from './views/auth/LogInPage';
import RegisterPage from './views/auth/RegisterPage';
import AuthenticatedRoute from './utils/AuthenticatedRoute';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route path="/home" element={<AuthenticatedRoute><HomePage /></AuthenticatedRoute>} />
                        <Route path="/board" element={<AuthenticatedRoute><BoardPage /></AuthenticatedRoute>} />
                        <Route path="/login" element={<LogInPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="*" element={<AuthenticatedRoute><HomePage /></AuthenticatedRoute>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

