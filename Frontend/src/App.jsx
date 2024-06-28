import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage.jsx";
import Photos from "./pages/Photos.jsx";
import PhotoDetail from "./pages/PhotoDetail.jsx";
import CreatePhoto from "./pages/CreatePhoto.jsx";
import EditPhoto from "./pages/EditPhoto.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { GlobalProvider } from "./contexts/GlobalContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import PrivatePage from "./middlewares/PrivatePage.jsx";
import Categories from "./pages/Categories.jsx";

function App() {

  return (
    <GlobalProvider>
      <AuthProvider>
        <Routes>

          {/* Rotte pubbliche */}

          {/* Default Layout */}
          <Route path="/" element={<DefaultLayout />}>
            {/* HomePage */}
            <Route index element={<HomePage />} />

            {/* Rotta login */}
            <Route path="login" element={<Login />} />

            {/* Rotta register */}
            <Route path="register" element={<Register />} />

            {/* Photos */}
            <Route path="photos">
              {/* Index */}
              <Route index element={<Photos />} />

              {/* Show */}
              <Route path=":slug" >
                <Route index element={<PhotoDetail />} />
              </ Route>
            </Route>

            {/* Categories */}
            <Route path="categories">
              {/* Index */}
              <Route index element={<Categories />} />
            </Route>
          </Route>

          {/* Rotte private */}
          <Route path="/" element={
            <PrivatePage>
              <DefaultLayout />
            </PrivatePage>
          }>
            {/* Photos */}
            <Route path="photos">

              {/* Edit */}
              <Route path=":slug">
                <Route path="edit" element={<EditPhoto />} />
              </Route>

              {/* Create */}
              <Route path="create" element={<CreatePhoto />} />
            </Route>
          </Route>

        </Routes>
      </AuthProvider>
    </GlobalProvider>
  );
}

export default App;
