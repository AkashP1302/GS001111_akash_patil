import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import StoreScreen from "./pages/StoreScreens/StoreScreen";
import PlanningTable from "./pages/PlanningScreen/PlanningTable";
import SKUScreen from "./pages/SKUScreens/SKUScreen";
import ChartScreen from "./pages/ChartScreen/ChartScreen";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/store" element={<StoreScreen />} />
          <Route path="/sku" element={<SKUScreen />} />
          <Route path="/planning" element={<PlanningTable />} />
          <Route path="/charts" element={<ChartScreen />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
