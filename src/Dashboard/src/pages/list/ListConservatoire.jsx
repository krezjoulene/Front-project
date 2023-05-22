import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import ConservatoireTable from "../../components/datatable/ConservatoireTable"

const ListConservatoire = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <ConservatoireTable/>
      </div>
    </div>
  )
}

export default ListConservatoire