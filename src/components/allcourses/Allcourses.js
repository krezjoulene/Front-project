import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Detailsback from "../Marketplace/background/backdetails";
import "./courses.css"
const AllCorses = () => {
 

  return (
    <>
      <Detailsback/>
      <Link to="/Allcorses"><i className=" fa fa-plus Ajoutcours">  Ajouter Cours</i></Link>
       
    </>
  );
};

export default AllCorses;
