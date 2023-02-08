import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./component/Header";
import AddEditUser from "./pages/AddEditUser";
import UserInfo from "./pages/UserInfo";
import About from "./pages/About";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addUser" element={<AddEditUser />} />
          <Route path="/editUser/:id" element={<AddEditUser />} />
          <Route path="/userInfo/:id" element={<UserInfo />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
