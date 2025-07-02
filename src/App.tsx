import { BrowserRouter, Routes, Route } from "react-router-dom";

import OrdersList from "./pages/OrdersList";
import LoginPage from "./pages/LoginPage";
import MyOrders from "./pages/MyOrders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/orders" element={<OrdersList />} />
        <Route path="/my-orders" element={<MyOrders />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
