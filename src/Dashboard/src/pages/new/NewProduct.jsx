import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import React, { useState } from "react";
import axios from "axios";

const NewProduct = ({ title }) => {
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [description, setdescription] = useState("");
    const [quantity, setquantity] = useState("");
    const [price, setprice] = useState("");
    const [phone, setphone] = useState("");
    const [etat, setetat] = useState("");
    const [category, setcategory] = useState("");

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handledescriptionChange = (e) => {
        setdescription(e.target.value);
    };


    const handlequantityChange = (e) => {
        setquantity(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setphone(e.target.value);
    };
    const handlepriceChange = (e) => {
        setprice(e.target.value);
    };
    const handleetatChange = (e) => {
        setetat(e.target.value);
    };
    const handlecategoryChange = (e) => {
        setcategory(e.target.value);
    };

    const AjoutProduct = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("title", name);
            formData.append("description", description);
            formData.append("phone", phone);
            formData.append("quantity", quantity);
            formData.append("image", image);
            formData.append("etat", etat);
            formData.append("price", price);
            formData.append("category", category);
            //const token = localStorage.getItem("token"); // Récupère le token d'accès depuis le stockage local

            const res = await axios.post(`http://localhost:8000/api/v1/products`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // 'Authorization': `Bearer ${token}` // Ajoutez le token d'accès dans l'en-tête de requête
                },

            })

            if (res.status === 201) {
                alert("Produit ajouté avec succès !");
                window.location.href = "/users";
            }
        } catch (error) {
            console.log(error)
            alert("Erreur lors de l'ajout du produit. Veuillez réessayer.");
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
                    <div className="left">
                        <img
                            src={
                                image
                                    ? URL.createObjectURL(image)
                                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            }
                            alt=""
                        />
                    </div>
                    <div className="right">
                        <form encType="multipart/form-data">
                            <div className="formInput">
                                <label htmlFor="file">
                                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    name="image" // Assurez-vous que le nom est correctement défini
                                    onChange={handleImageChange}
                                    style={{ display: "none" }}
                                />

                            </div>

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
                                <label htmlFor="phone">phone:</label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    placeholder="Enter phone"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                />
                            </div>
                            <div className="formInput">
                                <label htmlFor="price">price:</label>
                                <input
                                    type="text"
                                    id="price"
                                    name="price"
                                    placeholder="Enter price"
                                    value={price}
                                    onChange={handlepriceChange}
                                />
                            </div>
                            <div className="formInput">
                                <label htmlFor="quantity">quantity:</label>
                                <input
                                    type="text"
                                    id="quantity"
                                    name="quantity"
                                    placeholder="Enter quantity"
                                    value={quantity}
                                    onChange={handlequantityChange}
                                />
                            </div>
                            <div className="formInput">
                                <label htmlFor="etat">État:</label>
                                <select id="etat" name="etat" value={etat} onChange={handleetatChange}>
                                    <option value="neuf">Nouveau</option>
                                    <option value="occasion">Occasion</option>
                                </select>
                            </div>

                            <div className="formInput">
                                <label htmlFor="category">Catégorie:</label>
                                <select id="category" name="category" value={category} onChange={handlecategoryChange}>
                                    <option value="">Choisir une catégorie</option>
                                    <option value="644c0611066ad4fe13963714">Guitare</option>
                                    <option value="644c0ae86fd044576c704483">Piano</option>
                                    <option value="644daad111bd2335dccc3927">Accordéon</option>
                                    <option value="644dadf41e37dbe85c5b5360">Violon</option>
                                    <option value="6450f15d5e85f86c0f7cd964">Violoncelle</option>
                                    <option value="6454e2ae2b3142cdafa936be">Tambours</option>
                                    <option value="6454e1f22b3142cdafa936ab">Oud</option>
                                    <option value="6454e25f2b3142cdafa936b1">Saxophone</option>
                                    <option value="6454e2702b3142cdafa936b4">Trompette</option>
                                    <option value="6454e2852b3142cdafa936b7">Darbouka</option>
                                </select>
                            </div>

                            <button onClick={AjoutProduct}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewProduct;
