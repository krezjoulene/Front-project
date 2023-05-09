import React, { useState, useEffect } from "react";
import Detailsback from "../Marketplace/background/backdetails";

const Profile = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState("");
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserpassword] = useState([]);
    const [userPhone, setUserphone] = useState([]);

    useEffect(() => {
        // Vérifier si un jeton d'authentification est présent dans le stockage local
        const token = localStorage.getItem("token");
        const userRole = localStorage.getItem("UserRole");
        const userName = localStorage.getItem("UserName");
        const userEmail = localStorage.getItem("UserEmail");
        const userPassword = localStorage.getItem("UserPassword");
        const userPhone =localStorage.getItem("UserPhone");
    
        console.log("userName", userName);
        console.log("userEmail", userEmail);
        console.log("userPhone", userPhone);
        if (token && userRole) {
          setIsLoggedIn(true);
          setUserRole(userRole);
          setUserName(userName);
          setUserEmail(userEmail);
          setUserpassword(userPassword);
          setUserphone(userPhone);
          console.log("11111",userPhone)
        }
      }, []);

  return (
    <>
    <Detailsback/>
    <div>
      <h1>Informations personnelles</h1>
      <p><b>Nom:</b> {userName} </p>
      <p><b>Email:</b> {userEmail}</p>
      <p><b>role:</b> {userRole}</p>
      <p><b>Téléphone:</b> {userPhone}</p>
      <p><b>Mot de passe :</b> {userPassword}</p>
    </div>
    </>
  );
};

export default Profile;
