import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage.jsx";
import Photos from "./pages/Photos.jsx";
import PhotoDetail from "./pages/PhotoDetail.jsx";
import { GlobalProvider } from "./contexts/GlobalContext.jsx";

function App() {

  return (
    <GlobalProvider>
      <Routes>

        {/* Rotte pubbliche */}

        {/* Default Layout */}
        <Route path="/" element={<DefaultLayout />}>

          {/* HomePage */}
          <Route index element={<HomePage />} />

          {/* Photos */}
          <Route path="photos">
            {/* Index */}
            <Route index element={<Photos />} />

            {/* Show */}
            <Route path=":slug" >
              <Route index element={<PhotoDetail />} />
            </ Route>
          </Route>

        </Route>

      </Routes>
    </GlobalProvider>
  );
}

export default App;
