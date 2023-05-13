import React, { useState } from "react";
import Detailsback from "../Marketplace/background/backdetails";
import axios from "axios";

function AddCourse() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [pdf,setpdf] = useState(null);
    const [video,setvd] = useState(null);



    const handelchangName=(e)=>{
        setName(e.target.value);
     }
      const handelchangeDescrip=(e)=>{
         setDescription(e.target.value);
      }
        
      const AjouterCours=async(e)=>{
         e.preventDefault();
         try {
            let formData = new FormData();
            for (let key in video){
                formData.append('video', video[key]);
            }
            for (let key in pdf){
                formData.append('pdf', pdf[key]);
            }

            formData.append('title', name);
            formData.append('description', description);

            const res = await axios.post("http://localhost:8000/api/v1/cours", formData)

            if(res.status===201){
                
              console.log("cours : ",res.data.data);
             alert("Cours ajouté avec succès !");
             window.location.href = "/Allcorses";
             
            }
         } catch (error) {
             console.log(error)
             alert("Erreur lors de l'ajout du cours. Veuillez réessayer.");
         }
      }
  

  const handlePDFChange = (e) => {
        setpdf(e.target.files);
    };
    const handleVDChange = (e) => {
        setvd(e.target.files);
    };


    return (
        <>
            <Detailsback />
            <div className="add-instrument-form">
                <h2>Ajouter un nouveau cours</h2>
                <form onSubmit={AjouterCours}>
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
                        <input type="file" id="pdf" accept="application/pdf"  name="pdf" multiple onChange={handlePDFChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="VD"><b>Saisie le vidéo tutoriel</b></label>
                        <input type="file" id="vd"  accept="video/*" name="video" multiple onChange={handleVDChange} />
                    </div>
                    <button type="submit"><b>Ajouter le cours</b></button>
                </form>
            </div>
          
        </>
    );
 }
export default AddCourse;
