import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signuppage";
import Loginpage from "./pages/Loginpage";
import Homepage from "./pages/Homepage";
import Contactpage from "./pages/Contactpage.jsx";
import Aboutpage from "./pages/Aboutpage.jsx";
import CreatePost from "./pages/CreatePost";
import ProtectedRoute from "./services/protectedRoute.js";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Homepage />} />
          </Route>
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/contact" element={<Contactpage />} />
          <Route path="/about" element={<Aboutpage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
