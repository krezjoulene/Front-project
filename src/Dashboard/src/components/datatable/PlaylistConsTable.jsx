import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { PlaylistColumns } from "../../datatablesource";

const TableplaylistsCons = () => {
  
  const [data, setData] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const Conservatoire = localStorage.getItem("UserId");
        const response = await axios.get(`http://localhost:8000/api/v1/playlists/conservatoireId/${Conservatoire}`);
        setData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des playlists :", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/playlists/${id}`);
      setData((prevData) => prevData.filter((playlist) => playlist.id !== id));
      setSelectedIds((prevIds) => prevIds.filter((selectedId) => selectedId !== id));
      alert("Playlist supprimée avec succès !");
      window.location.href = "/playlists";
    } catch (error) {
      console.error("Erreur lors de la suppression de la playlist :", error);
    }
  };
  
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const id = params.row.id;
        return (
          <div className="cellAction">
            <Link to={`/playlists/${id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton" onClick={() => window.scrollTo(0, 0)}>Voir</div>
            </Link>
            <div className="deleteButton">
              <span onClick={() => handleDelete(id)}>Supprimer</span>
            </div>
          </div>
        );
      },
    },
  ];
  
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Ajouter une nouvelle playlist
        <Link to="/playlists/new" className="link">
          Ajouter
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data.map((val) => ({ id: val._id, ...val }))}
        columns={PlaylistColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        selectionModel={selectedIds}
        onSelectionModelChange={setSelectedIds}
      />
    </div>
  );
};

export default TableplaylistsCons;