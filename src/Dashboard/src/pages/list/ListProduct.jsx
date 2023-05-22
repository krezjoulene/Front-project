import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import TableProduct from "../../components/datatable/tableProduct"

const ListProduct = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <TableProduct/>
      </div>
    </div>
  )
}

export default ListProduct