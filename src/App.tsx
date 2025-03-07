
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import SKUScreen from "./pages/SKUScreen";
import StoreScreen from "./pages/StoreScreen";
import PlanningTable from "./pages/PlanningTable";


const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/store" element={<StoreScreen />} />
          <Route path="/sku" element={<SKUScreen />} />
          <Route path="/planning" element={<PlanningTable />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
