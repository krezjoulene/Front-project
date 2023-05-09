import React, { useState } from "react";
import Detailsback from "../Marketplace/background/backdetails";
import axios from "axios";
import "../Marketplace/MainPage/Home.css"

function AddPlaylist() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [NameProf, setNameProf] = useState("");



    const handelchangName=(e)=>{
        setName(e.target.value);
        console.log(e.target.value)
     }
     const handelchangPrice=(e)=>{
         setPrice(e.target.value);
         console.log(e.target.value)
      }
     
      const handelchangeDescrip=(e)=>{
         setDescription(e.target.value);
         console.log(e.target.value)
      }
      const handelchangeNameProf=(e)=>{
        setNameProf(e.target.value);
        console.log(e.target.value)
     }  
     
      const AjoutPlaylist=async(e)=>{
         e.preventDefault();
         try {
            const res=await axios.post("http://localhost:8000/api/v1/playlists",{
             title: name,
             prix: price,
             description: description,
             teacherName : NameProf ,
            }) 
            if(res.status===201){
             console.log("playlist : ",res.data);
             alert("Playliste ajouté avec succès !");
             window.location.href = "/courses";
             const teacherName = res.data.teacherName ;
             localStorage.setItem('teacherName', teacherName);
             const prix = res.data.prix ;
             localStorage.setItem('prix', prix);
            } 
         } catch (error) {
             console.log(error)
             alert("Erreur lors de l'ajout de la Playliste. Veuillez réessayer.");
         }
      }
    

  /* const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };*/



    return (
        <>
            <Detailsback />
            <div className="add-instrument-form">
                <h2>Ajouter une nouvelle Playliste</h2>
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
                        <label htmlFor="name"><b>Saisie Votre Nom</b></label>
                        <input
                            type="text"
                            id="NameProf"
                            value={NameProf}
                            onChange={handelchangeNameProf}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price"><b>Prix de tous les cours</b></label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={handelchangPrice}
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
                    
                  
                    <button onClick={AjoutPlaylist}><b>Ajouter la playliste</b></button>
                </form>
            </div>
          
        </>
    );
 }
export default AddPlaylist;
