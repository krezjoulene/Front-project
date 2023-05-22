import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import TeacherTable from "../../components/datatable/TeacherTable"

const ListTeacher = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <TeacherTable/>
      </div>
    </div>
  )
}

export default ListTeacher