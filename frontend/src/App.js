import Login from './pages/Login';
import Tasks from './pages/Tasks';
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';


const App = () => {
  // const { user, isLoading } = useAuth();
  const { user, login, isLoading, logout } = useContext(AuthContext);

  console.log("App.js");

  console.log(`Loading : ${isLoading}`)

  if (isLoading === true){
    console.log("Not Verified");
    return;
  } 

  return (
      <Routes>
        <Route path="/" element={user ? <Navigate  to="/tasks" /> : <Navigate to="/login" />} />
        <Route path="/login" element={user? <Navigate  to={'/tasks'} />: <Login login={login} />} />
        <Route path="/tasks" element={user ? <Tasks user={user} logout={logout}/> : <Navigate to={'/login'} />} />
      </Routes>
  );
};

export default App;


