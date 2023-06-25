import BikeDetail from "../pages/bikeDetail";
import CartPage from "../pages/cartPage";
import AddCardPage from "../pages/addCard"
import HomePage from "../pages/home";
import ShopPage from "../pages/shop";
import { LandingPage } from "../pages/LandingPage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";

const routes = [
  { path: "/bike/:id?", element: <BikeDetail /> },
  { path: "/shop", element: <ShopPage /> },
  { path: "/cart", element: <CartPage /> },
  { path: "/add", element: <AddCardPage /> },

  { path: "/home", element: <HomePage /> },
  { path: "/", element: < LandingPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "", element: <ShopPage /> },
];

export default routes;
