import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import TeacherConservatoireTable from "../../components/datatable/ConservatoireTeacher"

const ListConsTeacher = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <TeacherConservatoireTable/>
      </div>
    </div>
  )
}

export default ListConsTeacher