import React, { useState, useEffect } from "react";
import Detailsback from "../Marketplace/background/backdetails";
import axios from "axios";
import "../Marketplace/MainPage/Home.css";

function AddPlaylist() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [teacherNamesList, setTeacherNamesList] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState("");

    useEffect(() => {
        const fetchTeacherNames = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/v1/teacher");
                setTeacherNamesList(res.data);
                
            } catch (error) {
                console.log(error);
                alert(
                    "Erreur lors de la récupération des noms des professeurs. Veuillez réessayer."
                );
            }
        };

        fetchTeacherNames();
    }, []);

    const handelchangName = (e) => {
        setName(e.target.value);
    };

    const handelchangPrice = (e) => {
        setPrice(e.target.value);
    };

    const handelchangeDescrip = (e) => {
        setDescription(e.target.value);
    };

    const handleTeacherNameChange = (e) => {
        setSelectedTeacher(e.target.value);
    };

    const AjoutPlaylist = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/api/v1/playlists", {
                title: name,
                prix: price,
                description: description,
                teacherName: selectedTeacher,
            });
            if (res.status === 201) {
                console.log("playlist : ", res.data);
                alert("Playliste ajoutée avec succès !");
                window.location.href = "/courses";
                const prix = res.data.prix;
                localStorage.setItem("prix", prix);
            }
        } catch (error) {
            console.log(error);
            alert("Erreur lors de l'ajout de la Playliste. Veuillez réessayer.");
        }
    };

    return (
        <>
            <Detailsback />
            <div className="add-instrument-form">
                <h2>Ajouter une nouvelle Playliste</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">
                            <b>Titre</b>
                        </label>
                        <input
                            type="text"
                            id="tiltle"
                            value={name}
                            onChange={handelchangName}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="teacherName">
                            <b>Nom du professeur</b>
                        </label>
                        <select
                            id="teacherName"
                            value={selectedTeacher}
                            onChange={handleTeacherNameChange}
                        >
                            <option value="">Sélectionnez un professeur</option>
                            {teacherNamesList.map((teacher) => (
                                <option key={teacher._id} value={teacher.name}>
                                    {teacher.name}
                                </option>
                            ))}
                        </select>
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
