import Sites from '@pages/Sites';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import frFR from 'antd/locale/fr_FR';

function App() {

  return (
    <ConfigProvider locale={frFR}>
    <HashRouter>
        <Routes>
          <Route element={<Navigate to="/sites" />} path="/" />
          <Route element={<Sites />} path="/sites" />
        </Routes>
    </HashRouter>
    </ConfigProvider>
  )
}

export default App
