import { useContext } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

import Sidebar from "./components/Sidebar"
import TopNav from "./components/TopNav"
import Footer from "./components/Footer"

import Login from "./components/Login"
import Register from "./components/Register"
import Dashboard from "./components/Dashboard"
import Category from "./components/Category"

import NotFound from "./components/NotFound"
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context)
  
  return (
    <>
      {
        user ?
          <>
            <Sidebar />
          
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">

                <TopNav />

                <Routes>
                  <Route path="/*" element={<Navigate to="/dashboard" />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/Category" element={<Category />} />

                  <Route path="*" element={<Navigate to="/notfound" />} />
                  <Route path="/notfound" element={<NotFound />} />
                </Routes>

              </div>
              <Footer />
            </div>
          </>
        :
        <Routes>
          <Route path="/*" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      }
    </>
  );
}

export default App;
