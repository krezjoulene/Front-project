import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import React, { useState, useEffect } from "react";
import axios from "axios";

const NewTeacher = ({ title }) => {
    const [image, setImage] = useState(null);
    const [Name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [mdp, setMdp] = useState("");
    const [Cmdp, setCmdp] = useState("");
    const [role, setRole] = useState("");
    const [conservatoire, setConservatoire] = useState("");
    const [conservatoires, setConservatoires] = useState([]);

    const handelChangeName = (e) => {
        setName(e.target.value);
    };

    const handelChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handelChangePassword = (e) => {
        setMdp(e.target.value);
    };

    const handelChangePhone = (e) => {
        setTelephone(e.target.value);
    };

    const handelChangeRole = (e) => {
        setRole(e.target.value);
    };

    const handelChangeConfirmPassword = (e) => {
        setCmdp(e.target.value);
    };

    const handleConservatoireChange = (e) => {
        setConservatoire(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const fetchConservatoires = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/v1/conservatoire");
            setConservatoires(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchConservatoires();
    }, []);

    const AddTeacher = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", Name);
            formData.append("email", email);
            formData.append("role", role);
            formData.append("phoneNumber", telephone);
            formData.append("password", mdp);
            formData.append("passwordConfirm", Cmdp);
            formData.append("image", image);
            formData.append("conservatoire", conservatoire);

            const res = await axios.post("http://localhost:8000/api/v1/teacher", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.status === 201) {
                console.log("teacher: ", res.data.data);
                alert("Enseignant ajouté avec succès !");
                window.location.href = "/teachers";
            }
        } catch (error) {
            console.log(error);
            alert("Erreur lors de l'ajout de l'enseignant. Veuillez réessayer.");
        }
    };

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
                                    name="image"
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
                                    value={Name}
                                    onChange={handelChangeName}
                                />
                            </div>

                            <div className="formInput">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={handelChangeEmail}
                                />
                            </div>

                            <div className="formInput">
                                <label htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter password"
                                    value={mdp}
                                    onChange={handelChangePassword}
                                />
                            </div>

                            <div className="formInput">
                                <label htmlFor="phone">Phone:</label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    placeholder="Enter phone"
                                    value={telephone}
                                    onChange={handelChangePhone}
                                />
                            </div>

                            <div className="formInput">
                                <label htmlFor="password">Confirmer Password:</label>
                                <input
                                    type="password"
                                    id="Cpassword"
                                    name="Cpassword"
                                    placeholder="Confirm password"
                                    value={Cmdp}
                                    onChange={handelChangeConfirmPassword}
                                />
                            </div>
                            <div className="formInput">
                                <label htmlFor="role">Role:</label>
                                <input
                                    type="text"
                                    id="role"
                                    name="role"
                                    placeholder="Enter role"
                                    value={role}
                                    onChange={handelChangeRole}
                                />
                            </div>
                            <div className="formInput">
                                <label htmlFor="conservatoire">Conservatoire:</label>
                                <select
                                    id="conservatoire"
                                    name="conservatoire"
                                    value={conservatoire}
                                    onChange={handleConservatoireChange}
                                >
                                    <option value="">Sélectionner un conservatoire</option>
                                    {conservatoires &&
                                        conservatoires.map((conservatoire) => 
                                        (<option key={conservatoire._id} value={conservatoire._id}>
                                            {conservatoire.name}
                                        </option>
                                        ))}
                                </select>
                            </div>

                            <button onClick={AddTeacher}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewTeacher;
