import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import React, { useState } from "react";
import axios from "axios";

const NewPlaylist = ({ title }) => {
    const [image] = useState(null);
    const [name, setName] = useState("");
    const [description, setdescription] = useState("");
    const [prix, setprix] = useState("");
    const [teacherName, setteacherName] = useState("");
    const [conservatoireName, setconservatoireName] = useState("");

   
    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handledescriptionChange = (e) => {
        setdescription(e.target.value);
    };




    const handleprixChange = (e) => {
        setprix(e.target.value);
    };
    const handleteacherNameChange = (e) => {
        setteacherName(e.target.value);
    };
    const handleconservatoireNameChange = (e) => {
        setconservatoireName(e.target.value);
    };
    const AjoutPlaylist = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", name);
            formData.append("description", description);
            formData.append("image", image);
            formData.append("teacherName",teacherName);
            formData.append("prix",prix);
            formData.append("conservatoireName",conservatoireName);
            //const token = localStorage.getItem("token"); // Récupère le token d'accès depuis le stockage local

            const res = await axios.post(`http://localhost:8000/api/v1/playlists`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // 'Authorization': `Bearer ${token}` // Ajoutez le token d'accès dans l'en-tête de requête
                },

            })

            if (res.status === 201) {
                alert("Playlist ajouté avec succès !");
                window.location.href = "/playlists";
            }
        } catch (error) {
            console.log(error)
            alert("Erreur lors de l'ajout du Playlist. Veuillez réessayer.");
        }
    }


    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <div className="bottom">
                        <div className="right">
                            <form encType="multipart/form-data">
                                <div className="formInput">
                                    <label htmlFor="name">Name:</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={handleNameChange}
                                    />
                                </div>

                                <div className="formInput">
                                    <label htmlFor="description">description:</label>
                                    <input
                                        type="description"
                                        id="description"
                                        name="description"
                                        placeholder="Enter description"
                                        value={description}
                                        onChange={handledescriptionChange}
                                    />
                                </div>

                                
                                <div className="formInput">
                                    <label htmlFor="prix">prix:</label>
                                    <input
                                        type="text"
                                        id="prix"
                                        name="prix"
                                        placeholder="Enter prix"
                                        value={prix}
                                        onChange={handleprixChange}
                                    />
                                </div>
                          
                                <div className="formInput">
                                    <label htmlFor="teacherName">teacherName:</label>
                                    <input 
                                    type="text"
                                    id="teacherName" 
                                    name="teacherName" 
                                    placeholder="Enter teacherName" 
                                    value={teacherName} 
                                    onChange={handleteacherNameChange}
                                    />
                                </div>
                                <div className="formInput">
                                    <label htmlFor="conservatoireName">conservatoireName:</label>
                                    <input
                                    type="text"
                                        id="conservatoireName"
                                        name="conservatoireName"
                                        placeholder="Enter conservatoireName"
                                        value={conservatoireName}
                                        onChange={handleconservatoireNameChange}
                                    />
                                </div>

                                <button onClick={AjoutPlaylist}>Enregistrer</button>
                            </form>
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default NewPlaylist;
