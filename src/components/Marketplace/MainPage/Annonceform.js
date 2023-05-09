import React, { useState } from "react";
import Detailsback from "../background/backdetails";
import axios from "axios";
import "./Home.css"

function AddInstrument() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [qte,setqte]=useState("");
    const [phone,setphone]=useState("");
    const [description, setDescription] = useState("");
    const [setImage] = useState(null);
    const [instrumentType, setInstrumentType] = useState("");
    const [instrumentEtat, setInstrumentEtat] = useState("");



    const handelchangName=(e)=>{
        setName(e.target.value);
        console.log(e.target.value)
     }
     const handelchangPrice=(e)=>{
         setPrice(e.target.value);
         console.log(e.target.value)
      }
      const handelchangQuantity=(e)=>{
        setqte(e.target.value);
        console.log(e.target.value)
     }
      const handelchangeDescrip=(e)=>{
         setDescription(e.target.value);
         console.log(e.target.value)
      }
      const handelchangetype=(e)=>{
         setInstrumentType(e.target.value);
         console.log(e.target.value)
      }
      const handelchangeetat=(e)=>{
         setInstrumentEtat(e.target.value);
         console.log(e.target.value)
      }
      const handelchangephone=(e)=>{
        setphone(e.target.value);
        console.log(e.target.value)
     }     
      const AjoutInstru=async(e)=>{
         e.preventDefault();
         try {
            const res=await axios.post("http://localhost:8000/api/v1/products",{
             title: name,
             price: price,
             quantity: qte,
             phone : phone,
             description: description,
             Category: instrumentType,
             etat: instrumentEtat,
             
            }) 
            if(res.status===201){
              console.log("instrument : ",res.data.data);
             alert("Instrument ajouté avec succès !");
             window.location.href = "/marketplace";
            }
         } catch (error) {
             console.log(error)
             alert("Erreur lors de l'ajout de l'instrument. Veuillez réessayer.");
         }
      }
    

  const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };



    return (
        <>
            <Detailsback />
            <div className="add-instrument-form">
                <h2>Ajouter un nouvel instrument</h2>
                <form >
                    <div className="form-group">
                        <label htmlFor="name"><b>Nom</b></label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={handelchangName}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price"><b>Prix</b></label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={handelchangPrice}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity"><b>Quantité</b></label>
                        <input
                            type="number"
                            id="quantity"
                            value={qte}
                            onChange={handelchangQuantity}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone"><b>Entrez votre Numéro pour que l'acheteur puisse vous contacter</b></label>
                        <input
                            type="number"
                            id="phone"
                            value={phone}
                            onChange={handelchangephone}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="type"><b>Type d'instrument</b></label>
                        <select id="instrumentType" value={instrumentType} onChange={handelchangetype}>
                            <option value="guitare">Guitare</option>
                            <option value="piano">Piano</option>
                            <option value="accordéon">Accordéon</option>
                            <option value="violon">Violon</option>
                            <option value="violoncelle">Violoncelle</option>
                            <option value="tambours">Tambours</option>
                            <option value="oud">Oud</option>
                            <option value="saxophone">Saxophone</option>
                            <option value="trompette">Trompette</option>
                            <option value="darbouka">Darbouka</option>
                            <option value="autre">Autre</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Etat"><b>Etat d'instrument</b></label>
                        <select id="instrumentEtat" value={instrumentEtat} onChange={handelchangeetat}>
                            <option value="neuf">Nouveau</option>
                            <option value="occasion">Occasion</option>
                        </select>
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
                        <label htmlFor="image"><b>Image</b></label>
                        <input type="file" id="image" onChange={handleImageChange} />
                    </div>
                    <button onClick={AjoutInstru}><b>Ajouter l'annonce</b></button>
                </form>
            </div>
          
        </>
    );
 }
export default AddInstrument;
