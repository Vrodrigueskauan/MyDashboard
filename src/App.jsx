import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Analytics from "./pages/Analytics/Analytics";
import Investimentos from "./pages/Investimentos/Invest"

function AnimatedRoutes() {
  

  return (
  
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/investimentos" element={<Investimentos/>}/>
        <Route path="/Analytics" element={<Analytics/>}/>

      </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}