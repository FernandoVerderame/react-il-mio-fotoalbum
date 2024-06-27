import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage.jsx";

function App() {

  return (
    <Routes>

      {/* Rotte pubbliche */}

      {/* Default Layout */}
      <Route path="/" element={<DefaultLayout />}>

        {/* HomePage */}
        <Route index element={<HomePage />} />


      </Route>

    </Routes>
  );
}

export default App;
