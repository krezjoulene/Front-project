import React, { useState } from "react";
import Detailsback from "../Marketplace/background/backdetails";
import axios from "axios";
import "../Marketplace/MainPage/Home.css"

function AddMeeting() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [lien, setLink] = useState("");
    const [date, setdate] = useState("");



    const handelchangName=(e)=>{
        setName(e.target.value);
        console.log(e.target.value)
     }
    
     
      const handelchangeDescrip=(e)=>{
         setDescription(e.target.value);
         console.log(e.target.value)
      }
      const handelchangelink=(e)=>{
        setLink(e.target.value);
        console.log(e.target.value)
     }
     const handelchangedate=(e)=>{
        setdate(e.target.value);
        console.log(e.target.value)
     }

      const AjoutPlaylist=async(e)=>{
         e.preventDefault();
         try {
            const res=await axios.post("http://localhost:8000/api/v1/playlists",{
             title: name,
             description: description,
             lien : lien ,
             date : date 
            }) 
           
              console.log("instrument : ",res.data.data);
             alert("Lien Meet ajouté avec succès !");
             window.location.href = "/";
            
         } catch (error) {
             console.log(error)
             alert("Erreur lors de l'ajout de le lien meet. Veuillez réessayer.");
         }
      }
    




    return (
        <>
            <Detailsback />
            <div className="add-instrument-form">
                <h2>Ajouter une reunion en ligne</h2>
                <form >
                    <div className="form-group">
                        <label htmlFor="name"><b>Titre</b></label>
                        <input
                            type="text"
                            id="tiltle"
                            value={name}
                            onChange={handelchangName}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description"><b>Description</b></label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={handelchangeDescrip}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Link"><b>Lien</b></label>
                        <input
                            type="text"
                            id="Link"
                            value={lien}
                            onChange={handelchangelink}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date"><b>Date</b></label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={handelchangedate}
                        />
                    </div>
                    <button onClick={AjoutPlaylist}><b>Ajouter la reunion</b></button>
                </form>
            </div>
          
        </>
    );
 }
export default  AddMeeting;
