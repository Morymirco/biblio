// import './App.css'
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
// import { db } from "./firebaseconfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Card from "./Card/card";
import Card2 from "./../src/card2.jsx";
import Sign from "./sign.jsx";
import Login from "./login.jsx";

import { useNavigate } from "react-router-dom";
import { auth } from "./../src/firebaseconfig";
import Example from "./Head3.jsx";
function App() {
  const [connected, setConnect] = useState(localStorage.getItem("isAuth"));
  const [onligne,setOnligne]=useState()
  const signUserOut = async () => {
   await  signOut(auth).then(() => {
      localStorage.clear();
      setConnect(false);
     window.location.pathname ="/connexion"
    });
  };

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
      console.log(currentUser)
      setOnligne(currentUser)
    })
  },[])
  return (
    <>
      <Example connected={connected} onligne={onligne} decon={signUserOut} />

      <Routes>
        <Route path="/" element={<Card2 />} /> {/* Route pour Card2 */}
        <Route
          path="/connexion"
          element={<Sign setConnect={setConnect} />}
        />{" "}
        <Route
          path="/inscription"
          element={<Login setConnect={setConnect} />}
        />{" "}
        {/* Route pour Sign */}
        {/* Ajoutez d'autres routes si nécessaire */}
      </Routes>
    </>
  );
}

export default App;
