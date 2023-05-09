import React ,{useState,useEffect}from "react";
import "./courses.css";
import "./filter.css";

const CourseFilter = ({ filters, handleFilterChange }) => {
    const [teacherName, setTeacherName] = useState("");
    const [Prix, setPrix] = useState("");

    useEffect(() => {
        const teacherName = localStorage.getItem("teacherName");
        const Prix =localStorage.getItem("prix");
          setPrix(Prix);
          setTeacherName(teacherName);
   
      }, []);

    return (
        <div className="course-filter">
            <h3>Filtrer par :</h3>
            <div className="filterBox">
                <div className="filter-group">
                    <h4>Professeur</h4>
                    {teacherName.map((teacher) => (
                        <div key={teacher}>
                            <label>
                                <input
                                    type="checkbox"
                                    name="teacher"
                                    value={teacher}
                                    checked={filters.teachers.find((t) => t.name === teacher)?.checked || false}
                                    onChange={() => handleFilterChange("teachers", teacher)}
                                />
                                {teacher}
                            </label>
                        </div>
                    ))}
                </div>
                <div className="filter-group">
                    <h4>Prix</h4>
                    {Prix.map((price, index) => (
                        <div key={index}>
                            <label>
                                <input
                                    type="checkbox"
                                    name="price"
                                    value={price}
                                    checked={filters.prices.find((p) => p.id === index.toString())?.checked || false}
                                    onChange={() => handleFilterChange("prices", index.toString())}
                                />
                                {price}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CourseFilter;
