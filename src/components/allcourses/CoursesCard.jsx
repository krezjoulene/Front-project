import React, { useState, useEffect } from "react";
import "./filter.css";
import "./courses.css";
import axios from "axios";

const CoursesCard = () => {
  const [playlist, setPlaylist] = useState([]);
  const [filters, setFilters] = useState({
    price: [],
    teacher: [],
    title: "",
  });

  const fetchAxios = async () => {
    const res = await axios.get("http://localhost:8000/api/v1/playlists");
    setPlaylist(res.data);
  };

  useEffect(() => {
    fetchAxios();
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
          updatedFilters.teacher.push(value);
        } else {
          updatedFilters.teacher = updatedFilters.teacher.filter(
            (teacher) => teacher !== value
          );
        }
      } else {
        updatedFilters.title = value;
      }
      return updatedFilters;
    });
  };

  const filterPlaylists = () => {
    let filteredPlaylists = playlist;

    if (filters.price.length > 0) {
      filteredPlaylists = filteredPlaylists.filter((playlist) =>
        filters.price.includes(String(playlist.prix))
      );
    }

    if (filters.teacher.length > 0) {
      filteredPlaylists = filteredPlaylists.filter((playlist) =>
        filters.teacher.includes(playlist.teacherName)
      );
    }

    if (filters.title) {
      filteredPlaylists = filteredPlaylists.filter((playlist) =>
        playlist.title.toLowerCase().includes(filters.title.toLowerCase())
      );
    }

    return filteredPlaylists;
  };

  const filteredPlaylists = filterPlaylists();

  return (
    <>
      <section className="filter">
        <div className="container">
          <h2>Filtres:</h2>
          <div className="filter-group">
            <h4>Prix:</h4>
            <label>
              <input
                type="checkbox"
                name="price"
                value="10"
                onChange={handleFilterChange}
              />
              10$
            </label>
            <label>
              <input
                type="checkbox"
                name="price"
                value="20"
                onChange={handleFilterChange}
              />
              20$
            </label>
            <label>
              <input
                type="checkbox"
                name="price"
                value="30"
                onChange={handleFilterChange}
              />
              30$
            </label>
          </div>
          <div className="filter-group">
            <h4>Professeur:</h4>
            {playlist.map((playlist) => (
              <label key={playlist.teacherName}>
                <input
                  type="checkbox"
                  name="teacher"
                  value={playlist.teacherName}
                  onChange={handleFilterChange}
                />
                {playlist.teacherName}
              </label>
            ))}

          </div>
          <div className="filter-group">
            <h4>Titre:</h4>
            <input
              type="text"
              name="title"
              value={filters.title}
              onChange={handleFilterChange}
            />
          </div>
        </div>
      </section>
      <section className="coursesCard">
        <div className="container grid2">
          {filteredPlaylists.map((val) => (
            <div className="items" key={val._id}>
              <div className="content flex">
                <div className="left"></div>
                <div className="text">
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
                      <div className="para">
                        <h4>Par : {val.teacherName} </h4>
                      </div>
                    </div>
                    <span>{val.totalTime}</span>
                  </div>
                </div>
              </div>
              <div className="price">
                <h3>${val.prix} tous les cours</h3>
              </div>
              <button className="outline-btn">INSCRIVEZ-VOUS MAINTENANT!</button>
            </div>
          ))}
        </div>
      </section>
  
  </>
  )};

export default CoursesCard;
