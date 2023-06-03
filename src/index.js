import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './css/index.css';
import { NotificationProvider } from './Contexts/NotificationContext';
import { AuthProvider } from './Contexts/AuthContext';
import { ThemeProvider } from './Contexts/ThemeContext';
import { ProjectsProvider } from './Contexts/ProjectsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NotificationProvider>
        <AuthProvider>
          <ProjectsProvider>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </ProjectsProvider>
        </AuthProvider>
      </NotificationProvider>
    </BrowserRouter>
  </React.StrictMode>
);
