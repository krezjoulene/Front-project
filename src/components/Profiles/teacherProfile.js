import React, { useState, useEffect } from "react";
import Detailsback from "../Marketplace/background/backdetails";
import axios from "axios";
import { useParams } from "react-router-dom";

const TeacherProfile = () => {
    const { _id } = useParams(); 
    const [teacher , setteacher] = useState([]);

    const fetchAxios = async () =>{
      const res = await axios.get(`http://localhost:8000/api/v1/teacher/${_id}`)
      //console.log(res.data)
      setteacher(res.data)
    }
    console.log("teacher",teacher)
    useEffect(()=>{
        fetchAxios();
    },[])
  
        

  return (
    <>
    <Detailsback/>
    {teacher?.map((val) => (
    <div>
    <h1>Informations personnelles</h1>
    <p><b>{val.image}</b></p>
    <p><b>Nom:</b> {val.name} </p>
    <p><b>Email</b>{val.email}</p>
    <button12>Contacter le prof</button12>
    </div>
     ))}
    </>
  );
};

export default TeacherProfile;