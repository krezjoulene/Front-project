import React, { useState, useEffect } from "react";
import "./filter.css";
import "./courses.css";
import axios from "axios";
import { Link } from "react-router-dom";

const CoursesCard = () => {
  const [playlist, setPlaylist] = useState([]);
  const [filters, setFilters] = useState({
    price: [],
    teacher: new Set(),
    title: [],
  });
  const [teachers, setTeachers] = useState([]);

  const fetchAxios = async () => {
    const playlistsRes = await axios.get("http://localhost:8000/api/v1/playlists");
    setPlaylist(playlistsRes.data);

    const teachersRes = await axios.get("http://localhost:8000/api/v1/teacher");
    setTeachers(teachersRes.data);
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
          updatedFilters.teacher.add(value);
        } else {
          updatedFilters.teacher.delete(value);
        }
      } else if (name === "title") {
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

    if (filters.teacher.size > 0) {
      filteredPlaylists = filteredPlaylists.filter((playlist) =>
        filters.teacher.has(playlist.teacherName)
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
        </div>
      </section>
      <section className="coursesCard">
        <div className="container grid2">
          {filteredPlaylists.map((val) => {
            const teacherId = teachers.find((teacher) => teacher.name === val.teacherName)?._id;
            console.log('teacherId ', teacherId)
            return (
              <div className="items shadow" key={val._id}>
                <div className="content flex">
                  <div className="left"></div>
                  <div className="text">
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
                        <div className="para">
                          <Link to={`/teacherprofile/${teacherId}`} onClick={() => window.scrollTo(0, 0)}>
                            <h4>Par : {val.teacherName} </h4>
                          </Link>
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
            );
          })}
        </div>
      </section>
    </section>
  );
};

export default CoursesCard;

