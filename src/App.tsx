// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Layout from "./components/Layout";

// const App: React.FC = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem("token"));

//   useEffect(() => {
//     const handleStorageChange = () => {
//       setIsAuthenticated(!!localStorage.getItem("token"));
//     };
//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   return (
//     <Router>
//       {isAuthenticated ? (
//         <Layout>
//           <Routes>
//             {/* <Route path="/dashboard" element={<Dashboard />} /> */}
//             {/* <Route path="*" element={<Navigate to="/dashboard" />} /> */}
//           </Routes>
//         </Layout>
//       ) : (
//         <Routes>
//           {/* <Route path="/login" element={<Login />} /> */}
//           {/* <Route path="*" element={<Navigate to="/login" />} /> */}
//         </Routes>
//       )}
//     </Router>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import SKUScreen from "./pages/SKUScreen";
import { Store } from "@mui/icons-material";


const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/store" element={<Store />} />
          <Route path="/sku" element={<SKUScreen />} />
          {/* <Route path="/planning" element={<Planning />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
