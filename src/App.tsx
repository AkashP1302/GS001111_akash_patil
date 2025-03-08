import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import StoreScreen from "./pages/StoreScreens/StoreScreen";
import SKUScreen from "./pages/SKUScreens/SKUScreen";
import PlanningScreen from "./pages/PlanningScreen/PlanningTable";
import ChartScreen from "./pages/ChartScreen/ChartScreen";
import Layout from "./components/Layout";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout>
                  <Outlet />
                </Layout>
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="/store" />} />
            <Route path="/store" element={<StoreScreen />} />
            <Route path="/sku" element={<SKUScreen />} />
            <Route path="/planning" element={<PlanningScreen />} />
            <Route path="/charts" element={<ChartScreen />} />
          </Route>

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/store" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
