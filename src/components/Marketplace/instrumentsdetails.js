import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Detailsback from "./background/backdetails";

const InstrumentDetails = () => {
  const { _id } = useParams(); // Récupération de l'ID de l'instrument à partir de l'URL
  const [instrument, setInstrument] = useState([]); // État pour stocker les détails de l'instrument

  useEffect(() => {
    // Fonction pour récupérer les détails de l'instrument depuis le backend
    const fetchInstrumentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/products/${_id}`);
        setInstrument(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchInstrumentDetails(); // Appel de la fonction pour récupérer les détails de l'instrument
  }, [_id]);

  console.log("ID du backend:", _id);

  return (
    <>
      <Detailsback/>
      {instrument && (
        <div className="instru-details-container">
          <img className="instru-details-img" src={instrument.cover} alt={instrument.name} />
          <div className="instru-details-content">
            <h1 className="instru-details-name">{instrument.title}</h1>
            <p className="instru-details-price">
              <b>Prix: </b>${instrument.price}.00
            </p>
            <p className="instru-details-description">
              <b>Description: </b>
              {instrument.description}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default InstrumentDetails;
