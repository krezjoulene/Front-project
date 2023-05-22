import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import axios from "axios";
import { useState , useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const ConservatoireDetails = () => {
  const [conservatoire, setconservatoire] = useState([]);
  const{_id}=useParams()
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await axios.get(`http://localhost:8000/api/v1/conservatoire/${_id}`);
        setconservatoire([response.data]);
      } catch (error) {
        console.error("Erreur lors de la récupération des enseignants :", error);
      }
    };

    fetchData();
  }, [_id]);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        
        <div className="top">
          <div className="left">
          {conservatoire.map((val)=>(
            <>
            <Link to={`/conservatoire/update/${val._id}`}>
            <div className="editButton">Edit</div>
            </Link>
            <h1 className="title">Information</h1>
           
            <div className="item">
              <img
                src={val.image}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{val.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{val.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{val.phoneNumber}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Adresse du conservatoire:</span>
                  <span className="itemValue">
                    {val.adressconservatoire}
                  </span>
                </div>
               
              </div>
            </div>
            </>
             ))}
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="conservatoire Spending ( Last 6 Months)" />
          </div>
        </div>
       
        <div className="bottom">
        <h1 className="title">Last Transactions</h1>
          <List/>
        </div>
      </div>
    </div>
  );
};

export default ConservatoireDetails;
