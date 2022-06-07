
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer"
import {
  BrowserRouter as Router,
  Route,
  Routes,Navigate
} from "react-router-dom";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";


function App() {

  const {user} = useContext(AuthContext)

  return (
   <div>
     
     <Router>
        <Routes>
          <Route exact path="/" element={user ? <Home/> : <Login/>}/>
          <Route exact path="/login" element={user ? <Navigate to='/'/> : <Login/> }/>
          <Route exact path="/register" element={user ? <Navigate to='/'/> : <Register/>}/>
          <Route exact path="/profile/:username" element={user ? <Profile/> : <Login/>}/>
    
        </Routes>
        <Footer/>
     </Router>
     
   </div>
  );
} 

export default App;
