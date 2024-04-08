import React from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from './routes';
import { Navbar } from './Component/Navbar';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/">
        <Navbar />
        <div style={{maxWidth: '750px', margin: '20px auto'}}>
          <Routes>
            {
              routes.map(route => (
                <Route key={route.name} path={route.path} element={route.element} />
              ))
            }
          </Routes>
        </div>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

