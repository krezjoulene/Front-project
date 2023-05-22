import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const NewCourse = ({ title }) => {
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [description, setdescription] = useState("");
    const [pdf, setpdf] = useState(null);
    const [video, setvideo] = useState(null);
    const  {_id} = useParams();
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handledescriptionChange = (e) => {
        setdescription(e.target.value);
    };


    const handlepdfChange = (e) => {
        setpdf(e.target.value);
    };
    const handlevideoChange = (e) => {
        setvideo(e.target.value);
    };
    const AjoutCours = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", name);
            formData.append("description", description);
            formData.append("image", image);
            formData.append("pdf", pdf);
            formData.append("video", video);
            formData.append("playlist", _id);

            //const token = localStorage.getItem("token"); // Récupère le token d'accès depuis le stockage local

            const res = await axios.post(`http://localhost:8000/api/v1/cours`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // 'Authorization': `Bearer ${token}` // Ajoutez le token d'accès dans l'en-tête de requête
                },

            })

            if (res.status === 201) {
                alert("Cours ajouté avec succès !");
                window.location.href = `/playlists/${_id}`;
            }
        } catch (error) {
            console.log(error)
            alert("Erreur lors de l'ajout du Cours. Veuillez réessayer.");
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
                                    <label htmlFor="pdf">pdf:</label>
                                    <input
                                        type="file"
                                        id="pdf"
                                        name="pdf"
                                        onChange={handlepdfChange}
                                    />
                                </div>

                                <div className="formInput">
                                    <label htmlFor="file">video:</label>
                                    <input
                                        type="file"
                                        id="file"
                                        name="video"
                                        onChange={handlevideoChange}
                                    />
                                </div>
                                <div className="formInput">
                                    <label htmlFor="file">
                                        Image: 
                                    </label>
                                    <input
                                        type="file"
                                        id="file"
                                        name="image"
                                        onChange={handleImageChange}
                                    />
                                </div>

                                <button onClick={AjoutCours}>Enregistrer</button>
                            </form>
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default NewCourse;
