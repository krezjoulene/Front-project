import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./courses.css"
import Detailsback2 from "../Marketplace/background/backdetails2";
const AllCorses = () => {
  const { _id } = useParams(); // Récupération de l'ID de l'instrument à partir de l'URL
  const [cours, setcours] = useState([]); // État pour stocker les détails de l'instrument

  //http://localhost:8000/api/v1/cours?playlist=${_id}

  useEffect(() => {
    const fetchCoursByPlaylist = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/cours`);
        setcours(res.data.data);
        console.log(cours);
      } catch (error) {
        console.log(error);
      }
    };    

    fetchCoursByPlaylist();
  }, /*[_id]*/);

  return (
    <>
      <Detailsback2/>
      <Link to="/Allcorses"><i className="fa fa-plus Ajoutcours">  Ajouter Cours</i></Link>
      {cours.map((val)=>(
       <div className="instru-details-container">
      <div className="instru-details-content">
        <h1 className="">{val.title}</h1>
        <img className="" src={val.video} />
      </div>
    </div>
    ))}
    </>
  );
};

export default AllCorses;
