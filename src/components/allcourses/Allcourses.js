import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./courses.css"
import Detailsback2 from "../Marketplace/background/backdetails2";
const AllCorses = () => {
  const [cours, setcours] = useState([]); // État pour stocker les détails de l'instrument
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const {_id}=useParams();
  localStorage.setItem('id',_id)
  //http://localhost:8000/api/v1/cours?playlist=${_id}

  useEffect(() => {
    const fetchCoursByPlaylist = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/cours?playlist=${_id}`);
        setcours(res.data.data);
      } catch (error) {
        console.log(error);
      }
      const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("UserRole");

    if (token && userRole) {
      setIsLoggedIn(true);
      setUserRole(userRole);
    }
    };    

    fetchCoursByPlaylist();
  }, /*[_id]*/);

  return (
    <>
      <Detailsback2/>
      {(isLoggedIn && userRole === "teacher") ? (
        <>
      <Link to="/Allcorses"><i className="fa fa-plus Ajoutcours">  Ajouter Cours</i></Link>
       {cours?.map((val)=>(
        <div className="instru-details-container">
      <div className="instru-details-content">
        <h1 className="">{val.title}</h1>
        <img className="" src={val.video} />
      </div>
    </div>
    ))}
    </>
      ): (
        <>
        {cours.map((val)=>(
          <div className="instru-details-container">
         <div className="instru-details-content">
           <h1 className="">{val.title}</h1>
           <img className="" src={val.video} />
         </div>
       </div>
       ))}
       </>
      )}
    </>
  );
};

export default AllCorses;
