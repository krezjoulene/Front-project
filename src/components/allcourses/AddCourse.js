import React, { useState } from "react";
import Detailsback from "../Marketplace/background/backdetails";
import axios from "axios";

function AddCourse() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [setpdf] = useState(null);
    const [setvd] = useState(null);



    const handelchangName=(e)=>{
        setName(e.target.value);
        console.log(e.target.value)
     }
      const handelchangeDescrip=(e)=>{
         setDescription(e.target.value);
         console.log(e.target.value)
      }
        
      const AjouterCours=async(e)=>{
         e.preventDefault();
         try {
            const res=await axios.post("http://localhost:8000/api/v1/cours",{
             title: name,
             description: description,

            }) 
            if(res.status===201){
              console.log("instrument : ",res.data.data);
             alert("Cours ajouté avec succès !");
             window.location.href = "/marketplace";
             
            }
         } catch (error) {
             console.log(error)
             alert("Erreur lors de l'ajout du cours. Veuillez réessayer.");
         }
      }
    

  const handlePDFChange = (e) => {
        setpdf(e.target.files[0]);
    };
    const handleVDChange = (e) => {
        setvd(e.target.files[0]);
    };


    return (
        <>
            <Detailsback />
            <div className="add-instrument-form">
                <h2>Ajouter un nouveau cours</h2>
                <form >
                    <div className="form-group">
                        <label htmlFor="name"><b>Titre</b></label>
                        <input
                            type="text"
                            id="name"
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
                        <label htmlFor="PDF"><b>Saisie un PDF file</b></label>
                        <input type="file" id="image" onChange={handlePDFChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="VD"><b>Saisie le vidéo tutoriel</b></label>
                        <input type="file" id="VD" onChange={handleVDChange} />
                    </div>
                    <button onClick={AjouterCours}><b>Ajouter le cours</b></button>
                </form>
            </div>
          
        </>
    );
 }
export default AddCourse;
