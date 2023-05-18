import React, { useState, useEffect } from "react";
import "./filter.css";
import "./courses.css";
import axios from "axios";
import { Link } from "react-router-dom";

const CoursesCard = () => {
  const [playlist, setPlaylist] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [filters, setFilters] = useState({
    price: [],
    teacher: new Set(),
    cons: new Set(),
    title: [],
  });
  const [teachers, setTeachers] = useState([]);
  const [conservatoires, setConservatoires] = useState([]);

  const fetchAxios = async () => {
    const playlistsRes = await axios.get("http://localhost:8000/api/v1/playlists");
    setPlaylist(playlistsRes.data);

    const teachersRes = await axios.get("http://localhost:8000/api/v1/teacher");
    setTeachers(teachersRes.data);

    const ConsRes = await axios.get("http://localhost:8000/api/v1/conservatoire");
    setConservatoires(ConsRes.data);
  };


  useEffect(() => {
    fetchAxios();

    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("UserRole");
    if (token && userRole) {
      setIsLoggedIn(true);
      setUserRole(userRole);
    }
  }, []);


  const handleFilterChange = (event) => {
    const { name, value, checked } = event.target;

    setFilters((prevState) => {
      const updatedFilters = { ...prevState };
      if (name === "price") {
        if (checked) {
          updatedFilters.price.push(value);
        } else {
          updatedFilters.price = updatedFilters.price.filter(
            (price) => price !== value
          );
        }
      } else if (name === "teacher") {
        if (checked) {
          updatedFilters.teacher.add(value);
        } else {
          updatedFilters.teacher.delete(value);
        }
        
      } else if (name === "cons") {
        if (checked) {
          updatedFilters.cons.add(value);
        } else {
          updatedFilters.cons.delete(value);
        }
      }else if (name === "title") {
        if (checked) {
          updatedFilters.title.push(value);
        } else {
          updatedFilters.title = updatedFilters.title.filter(
            (title) => title !== value
          );
        }
      }
      return updatedFilters;
    });
  };
  const filterPlaylists = () => {
    let filteredPlaylists = playlist;
  
    if (filters.price.length > 0) {
      filteredPlaylists = filteredPlaylists.filter((playlist) => {
        const price = Number(playlist.prix);
        return filters.price.some((filterPrice) => {
          if (filterPrice === "50_100") {
            return price >= 50 && price < 100;
          } else if (filterPrice === "100_200") {
            return price >= 100 && price < 200;
          } else if (filterPrice === "200+") {
            return price >= 200;
          }
          return false;
        });
      });
    }
  
    if (filters.teacher && filters.teacher.size > 0) {
      filteredPlaylists = filteredPlaylists.filter((playlist) =>
        filters.teacher.has(playlist.teacherName)
      );
    }
  
    if (filters.cons && filters.cons.size > 0) {
      filteredPlaylists = filteredPlaylists.filter((playlist) =>
        filters.cons.has(playlist.ConservatoireName)
      );
    }
  
    if (filters.title.length > 0) {
      filteredPlaylists = filteredPlaylists.filter((playlist) =>
        filters.title.includes(playlist.title)
      );
    }
  
    return filteredPlaylists;
  };
  

  const filteredPlaylists = filterPlaylists();

  const uniqueTeachers = [...new Set(playlist.map((playlist) => playlist.teacherName))];
  const uniqueConservatoires = [...new Set(playlist.map((playlist) => playlist.ConservatoireName))];

  return (
    <section className="container d_flex">
      <section className="course-filter">
        <div className="container">
          <div className="filter-group">
            <h4>Titre:</h4>
            {playlist.map((playlist) => (
              <label key={playlist.title}>
                <input
                  type="checkbox"
                  name="title"
                  value={playlist.title}
                  onChange={handleFilterChange}
                />
                {playlist.title}
              </label>
            ))}
          </div>
          <div className="filter-group">
            <h4>Prix:</h4>
            <label>
              <input
                type="checkbox"
                name="price"
                value="50_100"
                onChange={handleFilterChange}
              />
              50$ - 100$
            </label>
            <label>
              <input
                type="checkbox"
                name="price"
                value="100_200"
                onChange={handleFilterChange}
              />
              100$ - 200$
            </label>
            <label>
              <input
                type="checkbox"
                name="price"
                value="200+"
                onChange={handleFilterChange}
              />
              + 200$
            </label>
          </div>
          <div className="filter-group">
            <h4>Professeur:</h4>
            {uniqueTeachers.map((teacher) => (
              <label key={teacher}>
                <input
                  type="checkbox"
                  name="teacher"
                  value={teacher}
                  onChange={handleFilterChange}
                />
                {teacher}
              </label>
            ))}
          </div>
          <div className="filter-group">
            <h4>Les conservatoire :</h4>
            {uniqueConservatoires.map((cons) => (
              <label key={cons}>
                <input
                  type="checkbox"
                  name="cons"
                  value={cons}
                  onChange={handleFilterChange}
                />
                {cons}
              </label>
            ))}
          </div>
        </div>
      </section>
      <section className="coursesCard">
        <div className="container grid2">
          {filteredPlaylists.map((val) => {
            const teacherId = teachers.find((teacher) => teacher.name === val.teacherName)?._id;
            const ConsId = conservatoires.find((cons) => cons.name === val.ConservatoireName)?._id;
           
            return (
              <div className="items shadow" key={val._id}>
                <div className="content flex">
                  <div className="left"></div>
                  <div className="text">
                  {(isLoggedIn && userRole === "teacher") ? (
                    <>
                    <Link to={`/playlist/${val._id}`} onClick={() => window.scrollTo(0, 0)}>
                      <h1>{val.title}</h1>
                    </Link>
                    <div className="rate">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <label htmlFor="">(5.0)</label>
                  </div>
                  <div className="details">
                    <div className="box">
                    <div className='dimg'>
                        <img src={val.image} alt='' />
                      </div>
                        <div className="para">
                          <Link to={`/teacherprofile/${teacherId}`} onClick={() => window.scrollTo(0, 0)} className="prof">
                           <h4> <b>Par : </b> {val.teacherName} </h4>
                          </Link>
                      </div>
                    </div>
                    <Link to={`/conservatoire/${ConsId}`} onClick={() => window.scrollTo(0, 0)}>
                    <span><b>Sous le conservatoire : </b><span2>{val.ConservatoireName}</span2></span>
                    </Link>
                  </div>
                  </>
                 ): (
                  <>
                  <h1>{val.title}</h1>
                    <div className="rate">
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <i className="fa fa-star"></i>
                      <label htmlFor="">(5.0)</label>
                    </div>
                    <div className="details">
                      <div className="box">
                      <div className='dimg'>
                        <img src={val.image} alt='' />
                      </div>
                        <div className="para">
                          <Link to={`/teacherprofile/${teacherId}`} onClick={() => window.scrollTo(0, 0)} className="prof">
                          <h4> <b>Par : </b> {val.teacherName} </h4>                          
                          </Link>
                        </div>
                      </div>
                      <Link to={`/conservatoire/${ConsId}`} onClick={() => window.scrollTo(0, 0)}>
                    <span><b>Sous le conservatoire : </b><span2>{val.ConservatoireName}</span2></span>
                    </Link>
                    </div>
                    </>
                 )}
                  </div>
                </div>
                <div className="price">
                  <h3>${val.prix} tous les cours</h3>
                </div>
                <button className="outline-btn">INSCRIVEZ-VOUS MAINTENANT!</button>
              </div>
              
            );
          })}
        </div>
      </section>
    </section>
  );
};

export default CoursesCard;

