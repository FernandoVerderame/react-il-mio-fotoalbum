import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage.jsx";
import Photos from "./pages/Photos.jsx";

function App() {

  return (
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
        </Route>

      </Route>

    </Routes>
  );
}

export default App;
