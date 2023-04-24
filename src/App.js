import './App.css';
import { Route, Routes } from 'react-router-dom';
import { FileList } from './pages/FileList';
import { Settings } from './pages/Settings';
import { Profile } from './pages/Profile';
import { AuthPage } from './pages/AuthPage';
import Private from './hoc/Private';
import Public from './hoc/Public';

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route element={<Private />}>
          <Route path="/" element={<FileList />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<Public />}>
          <Route path="/auth/*" element={<AuthPage />}></Route>
        </Route>
      </Routes>
    </div>
  );
};
