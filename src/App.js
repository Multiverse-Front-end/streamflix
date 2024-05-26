import { Route, Routes } from "react-router-dom";
import  Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Account from './pages/Account';
import { AuthContextProvider } from './context/AuthContext';


function App() {

  return (
    <>
    <AuthContextProvider>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route
          exact path='/account'
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthContextProvider>
  </>
  );
}

export default App;
