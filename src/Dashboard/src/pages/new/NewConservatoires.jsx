import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import React, { useState } from "react";
import axios from "axios";

const NewConservatoire = ({ title }) => {
    const [Name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [mdp, setMdp] = useState("");
    const [Cmdp, setCmdp] = useState("");
    const [role, setRole] = useState("");
    const [conservatoire, setConservatoire] = useState("");

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
    const handleConservatoireChange = (e) => {
        setConservatoire(e.target.value);
    };
    const handelChangeConfirmPassword = (e) => {
        setCmdp(e.target.value);
    };

 

  

    const AddConservatoire = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", Name);
            formData.append("email", email);
            formData.append("role", role);
            formData.append("phoneNumber", telephone);
            formData.append("password", mdp);
            formData.append("passwordConfirm", Cmdp);
            formData.append("adressconservatoire",conservatoire)
            const res = await axios.post("http://localhost:8000/api/v1/conservatoire", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.status === 201) {
                console.log("conservatoire: ", res.data.data);
                alert("Conservatoire ajouté avec succès !");
                window.location.href = "/conservatoires";
            }
        } catch (error) {
            console.log(error);
            alert("Erreur lors de l'ajout du conservatoire. Veuillez réessayer.");
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
                  
                    <div className="right">
                        <form encType="multipart/form-data">
                           
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
                                <label htmlFor="conservatoire">Adresse Du conservatoire:</label>
                                <input
                                    id="conservatoire"
                                    name="conservatoire"
                                    value={conservatoire}
                                    onChange={handleConservatoireChange}
                                />
                            </div>
                            <button onClick={AddConservatoire}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewConservatoire;
