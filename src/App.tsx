import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartProvider from "./providers/cartProvider";
import routes from "./routes/routes";

const App = (): JSX.Element => {
  return (
    <Router>
      <CartProvider>
        <Routes>
          {routes.map((route, index) => {
            return (
              <Route
                path={route.path}
                // exact={route.exact}
                element={route.element}
                key={index}
              />
            );
          })}
        </Routes>
      </CartProvider>
    </Router>
  );
};

export default App;
