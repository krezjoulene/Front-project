import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Tableplaylists from "../../components/datatable/PlaylistTable"

const PlaylistList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Tableplaylists/>
      </div>
    </div>
  )
}

export default PlaylistList