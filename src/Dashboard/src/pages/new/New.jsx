import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import React, { useState } from "react";
import axios from "axios";

const New = ({ title }) => {
  const [image, setImage] = useState(null);
  const [Name, setName] = React.useState("");
  const [email, setemail] = React.useState("");
  const [telephone, settelephone] = React.useState("");
  const [mdp, setmdp] = React.useState("");
  const [Cmdp, setCmdp] = React.useState("");
  const [role, setrole] = React.useState("")

  const handelchangName = (e) => {
    setName(e.target.value);
  }
  const handelchangEamail = (e) => {
    setemail(e.target.value);
  }
  const handelchangePassword = (e) => {
    setmdp(e.target.value);
  }
  const handelchangePhone = (e) => {
    settelephone(e.target.value);
  }
  const handelchangeRole = (e) => {
    setrole(e.target.value);
  }
  const handelchangeconfirmPassord = (e) => {
    setCmdp(e.target.value);
  }
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const AjoutInstru = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', Name);
      formData.append('email', email);
      formData.append('role', role);
      formData.append('phoneNumber', telephone);
      formData.append('password', mdp);
      formData.append('passwordConfirm', Cmdp)
      formData.append('image', image); // image est la variable d'état contenant l'image sélectionnée
      //const token = localStorage.getItem("token"); // Récupère le token d'accès depuis le stockage local

      const res = await axios.post("http://localhost:8000/api/v1/user", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // 'Authorization': `Bearer ${token}` // Ajoutez le token d'accès dans l'en-tête de requête
        },

      })
      console.log("333333333333333333333333333333");

      if (res.status === 201) {
        console.log("User : ", res.data.data);
        alert("Utilisateur ajouté avec succès !");
        window.location.href = "/users";
      }
    } catch (error) {
      console.log(error)
      alert("Erreur lors de l'ajout de l'utilisateur. Veuillez réessayer.");
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
                  value={Name}
                  onChange={handelchangName}
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
                  onChange={handelchangEamail}
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
                  onChange={handelchangePassword}
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
                  onChange={handelchangePhone}
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
                  onChange={handelchangeconfirmPassord}
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
                  onChange={handelchangeRole}
                />
              </div>

              <button onClick={AjoutInstru}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
