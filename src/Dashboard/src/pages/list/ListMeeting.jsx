import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import MeetingTable from "../../components/datatable/MeetingTable"

const ListMeetings = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <MeetingTable/>
      </div>
    </div>
  )
}

export default ListMeetings