import React, { useState, useEffect } from "react";
import Back from "../common/back/Back";
import CoursesCard from "./CoursesCard";
import OnlineCourses from "./OnlineCourses";
import { Link } from "react-router-dom";

const CourseHome = () => {
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
      <Back title="Explorer les cours" />
      <section className='search'>
        <div className='container c_flex'>
          <div>
            <h1>logo</h1>
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
                <Link to="/profile"><i className='fa fa-user icon-circle'></i></Link>
              </>
            ) : (
              <>
                <Link to="/SignIn" onClick={() => window.scrollTo(0, 0)} >
                  <i className='fa fa-plus icon-circle'></i>
                </Link>
                <Link to="/SignIn"><i className='fa fa-user icon-circle'></i></Link>
                <div className='cart'>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      <CoursesCard />
      <OnlineCourses />
    </>
  );
};

export default CourseHome;
