import React, { useState, useEffect } from "react";
import Back from "../common/back/Back";
import CoursesCard from "./CoursesCard";
import OnlineCourses from "./OnlineCourses";
import { Link } from "react-router-dom";
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";
import { useLocation } from "react-router-dom";
import axios from "axios";


const CourseHome = () => {
  const location = useLocation();

  window.addEventListener("scroll", function () {
    const search = document.querySelector(".search")
    search.classList.toggle("active", window.scrollY > 100)
  })

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [afficherListe, setAfficherListe] = useState(false);

  const toggleListe = () => {
    setAfficherListe(!afficherListe);
  };

  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const url = searchParams.get("playlistId");
const userId = searchParams.get("userId");
  console.log("User ID:", userId);
  

if (url ) {

  const [playlistId, paymentId] = url.split("?payment_id=")
  if (paymentId) {
    axios
      .post(`/api/test/${paymentId}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.result.status === "SUCCESS") {
          
            axios
              .post(`/api/v1/user/${userId}/playlists/${playlistId}`)
              .then((response) => {
                console.log("Playlist Assigned to user:", response.data);
                alert("Success");
                window.location.href = "/UserPlaylist";
        
                // Add any additional code or logic here after the user is assigned to the playlist
              })
              .catch((error) => {
                console.error("Error assigning user to playlist:", error);
                // Handle the error if the user assignment fails
              });
       
          
        }else if(res.data.result.status==="FAILURE"){
         // alert("Fail");
        }
       })
      .catch((error) => {
        

        console.error(error);
      });
  }

}
    
    // Vérifier si un jeton d'authentification est présent dans le stockage local
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("UserRole");

    if (token && userRole) {
      setIsLoggedIn(true);
      setUserRole(userRole);
      console.log("kkkk", userRole)
    }
  }, []);

  return (
    <>
      <Header/>
      <Back title="Explorer les cours" />
      <section className='search'>
        <div className='container c_flex' style={{marginTop:"-15px"}}>
          <div>
          <img src="images/IMG-20230523-WA0000-removebg-preview.png" alt="Logo" style={{width:"110px" }}></img>
          </div>

          <div className='search-box f_flex'>
            <i className='fa fa-search'></i>
            <input type='text' placeholder='Cherchez et appuyez sur Entrée...' />
            <span>Toutes les catégories</span>
          </div>

          <div className='icon2 f_flex width '>
            {(isLoggedIn && userRole === "teacher") ? (
              <>
                <div style={{ position: 'relative' }}>
                  <i onClick={toggleListe} className='fa fa-plus icon-circle'></i>
                  {afficherListe && (
                    <div className='dropdown'>
                      <ul>
                        <li>
                          <a href="/ajouterInstrument">Ajouter une playlist</a>
                        </li>
                        <li>
                          <a href="/ajouterLien">Ajouter un lien meet</a>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <Link to="/profile"  onClick={() => window.scrollTo(0, 0)}><i className='fa fa-user icon-circle'></i></Link>
                <Link to="/UserPlaylist"  onClick={() => window.scrollTo(0, 0)}><i className="fa fa-file icon-circle"></i></Link>

              </>
            ) : (userRole == "user")?(
              <>
                <Link to="/profile"  onClick={() => window.scrollTo(0, 0)}><i className='fa fa-user icon-circle'></i></Link>
                <Link to="/UserPlaylist"  onClick={() => window.scrollTo(0, 0)}><i className="fa fa-file icon-circle"></i></Link>
              </>
            ):(
              <>
              <Link to="/signin"  onClick={() => window.scrollTo(0, 0)}><i className='fa fa-user icon-circle'></i></Link>
              <Link to="/signin"  onClick={() => window.scrollTo(0, 0)}><i className="fa fa-file icon-circle"></i></Link>
              </>
            )}
          </div>
        </div>
      </section>
      <CoursesCard />
      <OnlineCourses />
      <Footer/>
    </>
  );
};

export default CourseHome;
