import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signuppage";
import Loginpage from "./pages/Loginpage";
import Homepage from "./pages/Homepage";
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
          <Route path="/login" element={<Loginpage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/createpost" element={<CreatePost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
