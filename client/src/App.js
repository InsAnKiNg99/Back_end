import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/pages/Signuppage.jsx";
import Loginpage from "./components/pages/Loginpage.jsx";
import Homepage from "./components/pages/Homepage.jsx";
import Contactpage from "./components/pages/Contactpage.jsx";
import Aboutpage from "./components/pages/Aboutpage.jsx";
import CreatePost from "./components/pages/CreatePost.jsx";
import ProtectedRoute from "./components/services/protectedRoute.js";

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
