import './App.css';
import { Route, Routes } from 'react-router-dom';
import '@fontsource/inter';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';
import AuthMiddleware from './middleware/AuthMiddleware';
import PrivateRoutes from './middleware/ProtectedRoutes';
import Home from './pages/dashboard/Home';
import NotFound from './pages/NotFound';
import MuiLayout from './layout/MuiLayout';
import Login from './pages/Login';


function App() {
  return (
    <div className="App">
      <Toaster />
      <MuiLayout>
        <Routes>
          <Route element={<AuthMiddleware />} >
            <Route path="/" index Component={() => <Login />} />
            <Route path="/register" index Component={() => <Register />} />
          </Route>
          <Route element={<PrivateRoutes />} >
            <Route path="/dashboard" element={<Home />} ></Route>
          </Route>
          <Route path="*" element={<NotFound />} ></Route>
        </Routes>
      </MuiLayout>
    </div>
  );
}

export default App;
