import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import TableplaylistsCons from "../../components/datatable/PlaylistConsTable"

const ConsPlaylist = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <TableplaylistsCons/>
      </div>
    </div>
  )
}

export default ConsPlaylist