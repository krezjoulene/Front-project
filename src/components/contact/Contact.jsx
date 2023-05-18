import React, { useState } from "react";
import axios from "axios";
import Back from "../common/back/Back"
import "./contact.css"

const Contact = () => {
  const map = 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d904726.6131739549!2d85.24565535!3d27.65273865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1652535615693!5m2!1sen!2snp" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" '
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [sujet, setSujet] = useState("");
  const [description, setDescription] = useState("");

  const handleNomChange = (e) => {
    setNom(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSujetChange = (e) => {
    setSujet(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/api/v1/contactus", {
        nom,
        email,
        sujet,
        description,
      });
      alert("Votre message a été envoyé avec succès !");
      // Réinitialisez les états du formulaire
      setNom("");
      setEmail("");
      setSujet("");
      setDescription("");
    } catch (error) {
      console.log(error);
      alert("Erreur lors de l'envoi du message. Veuillez réessayer.");
    }
  };

  return (
    <>
      <Back title='Contactez-nous' />
      <section className='contacts padding'>
        <div className='container shadow flexSB'>
          <div className='left row'>
            <iframe src={map}></iframe>
          </div>
          <div className='right row'>
            <h1>Contactez-nous</h1>
            <p>Nous sommes ouverts à toute suggestion ou simplement pour discuter</p>

            <div className='items grid2'>
              <div className='box'>
                <h4>ADRESSE:</h4>
                <p>198 West 21th Street, Suite 721 New York NY 10016</p>
              </div>
              <div className='box'>
                <h4>EMAIL:</h4>
                <p>HyperDev@gmai.com</p>
              </div>
              <div className='box'>
                <h4>TÉLÉPHONE:</h4>
                <p>+ 1235 2355 98</p>
              </div>
            </div>

            <form>
              <div className="flexSB">
                <input
                  type="text"
                  placeholder="Nom"
                  value={nom}
                  onChange={handleNomChange}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <input
                type="text"
                placeholder="Sujet"
                value={sujet}
                onChange={handleSujetChange}
              />
              <textarea
                cols="30"
                rows="10"
                placeholder="Écrivez un message ici..."
                value={description}
                onChange={handleDescriptionChange}
              >
              </textarea>
              <button className="primary-btn" onClick={handleSubmit}>
                ENVOYER LE MESSAGE
              </button>
            </form>

            <h3>Suivez-nous ici</h3>
            <div className="social">
              <i className="fab fa-facebook-f icon"></i>
              <i className="fab fa-instagram icon"></i>
              <i className="far fa-envelope icon"></i>
            </div>
          </div>
        </div>
      </section>
    </>

  )
}

export default Contact
