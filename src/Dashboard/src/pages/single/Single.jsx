import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import axios from "axios";
import { useState , useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Single = () => {
  const [user, setuser] = useState([]);
  const{id}=useParams()
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await axios.get(`http://localhost:8000/api/v1/user/${id}`);
        console.log("user", response.data);
        setuser([response.data]);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        
        <div className="top">
          <div className="left">
          {user.map((val)=>(
            <>
            <Link to={`/update/${val._id}`}>
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
                  <span className="itemKey">Role:</span>
                  <span className="itemValue">
                    {val.role}
                  </span>
                </div>
               
              </div>
            </div>
            </>
             ))}
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
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

export default Single;
