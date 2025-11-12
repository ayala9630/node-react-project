import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./components/Login";
import Header from "./components/Header";
import Register from "./components/Register";
// import Products from "./components/Products";
import AddProd from "./components/AddProd";
import Basket from "./components/Basket";
import SingleProd from "./components/SingleProd";
import ProdByCategory from "./components/ProdByCategory";
import Home from "./components/Home";
import EditProducts from "./components/EditProducts";
function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="edit" element={<EditProducts />} />
            <Route path="home" element={<Home />} />
            <Route path="basket" element={<Basket />} />
            <Route path="home/:id" element={<SingleProd />} />
            <Route path="category/:name" element={<ProdByCategory />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
