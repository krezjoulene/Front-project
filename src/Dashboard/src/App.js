import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import UpdateUser from "./pages/Update/UpdateUser";
import ListProduct from "./pages/list/ListProduct";
import ProductDetails from "./pages/single/ProductDetails";
import UpdateProduct from "./pages/Update/UpdateProduct";
import NewProduct from "./pages/new/NewProduct";
import ListTeacher from "./pages/list/ListTeacher";
import TeacherDetails from "./pages/single/DetailsTeacher";
import UpdateTeacher from "./pages/Update/UpdateTeacher";
import NewTeacher from "./pages/new/NewTeacher";
import PlaylistList from "./pages/list/PlaylistList";
import PlaylistDetails from "./pages/single/PlaylistDetails";
import UpdatePlaylist from "./pages/Update/PlaylistUpdate";
import UpdateCourse from "./pages/Update/CourseUpdate";
import CourseDetails from "./pages/single/CourseDetails";
import NewPlaylist from "./pages/new/NewPlaylist";
import NewCourse from "./pages/new/NewCourse";
import NewConservatoire from "./pages/new/NewConservatoires";
import ListConservatoire from "./pages/list/ListConservatoire";
import ConservatoireDetails from "./pages/single/ConservatoireDetails";
import Updateconservatoire from "./pages/Update/ConservatoireUpdate";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path="/users/:id" element={<Single/>} />
              
              <Route
                path="new"
                element={<New  title="Add New User" />}
              />
            </Route>
            <Route path="/update/:id" element={<UpdateUser   title="Modifier l'utilisateur" />} ></Route>
            <Route path="/product/update/:id" element={<UpdateProduct   title="Modifier Le produit" />} ></Route>
            <Route path="/teacher/update/:id" element={<UpdateTeacher   title="Modifier L'enseignant" />} ></Route>
            <Route path="/playlist/update/:id" element={<UpdatePlaylist   title="Modifier La playlist" />} ></Route>
            <Route path="/cour/update/:id" element={<UpdateCourse   title="Modifier Le cours" />} ></Route>
            <Route path="/conservatoire/update/:_id" element={<Updateconservatoire   title="Modifier Le conservatoire" />} ></Route>

            <Route path="products">
              <Route index element={<ListProduct />} />
              <Route path="/products/:id" element={<ProductDetails  />} />
              <Route
                path="new"
                element={<NewProduct title="Add New Product" />}
              />
            </Route>
            <Route path="teachers">
              <Route index element={<ListTeacher />} />
              <Route path="/teachers/:id" element={<TeacherDetails  />} />
              <Route
                path="new"
                element={<NewTeacher title="Add New Teacher" />}
              />
            </Route>
            <Route path="playlists">
              <Route index element={<PlaylistList/>} />
              <Route path="/playlists/:_id" element={<PlaylistDetails  />} />
              <Route
                path="new"
                element={<NewPlaylist title="Add New Playlist" />}
              />
            </Route>
            <Route path="/courses/:_id" element={<CourseDetails  />} />
            <Route path="new/:_id" element={<NewCourse title="Add New Course" />} />
            <Route path="conservatoires">
              <Route index element={<ListConservatoire/>} />
              <Route path="/conservatoires/:_id" element={<ConservatoireDetails/>} />
              <Route
                path="new"
                element={<NewConservatoire title="Add New Conservatoire" />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
