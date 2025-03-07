// // import React, { useState } from "react";
// // import { Box, Button } from "@mui/material";
// // import TableComponent from "../components/TableComponent";

// // interface Store {
// //   id: number;
// //   sNo: number;  // ✅ Add S.No explicitly
// //   name: string;
// //   city: string;
// //   state: string;
// // }

// // const initialStores: Store[] = [
// //   { id: 1, sNo: 1, name: "Atlanta Outfitters", city: "Atlanta", state: "GA" },
// //   { id: 2, sNo: 2, name: "Chicago Charm Boutique", city: "Chicago", state: "IL" },
// //   { id: 3, sNo: 3, name: "Houston Harvest Market", city: "Houston", state: "TX" },
// //   { id: 4, sNo: 4, name: "Seattle Skyline Goods", city: "Seattle", state: "WA" },
// // ];

// // const StoreScreen: React.FC = () => {
// //   const [stores, setStores] = useState<Store[]>(initialStores);
// //   const [draggedId, setDraggedId] = useState<number | null>(null);

// //   // 🔹 Start Drag
// //   const handleDragStart = (event: React.DragEvent<HTMLDivElement>, id: number) => {
// //     setDraggedId(id);
// //     event.dataTransfer.setData("storeId", id.toString());
// //   };

// //   // 🔹 Drop: Reorder List (Keep S.No same)
// //   const handleDrop = (event: React.DragEvent<HTMLTableRowElement>, targetId: number) => {
// //     event.preventDefault();
// //     if (draggedId === null || draggedId === targetId) return;

// //     // Get the dragged and target indexes
// //     const draggedIndex = stores.findIndex((store) => store.id === draggedId);
// //     const targetIndex = stores.findIndex((store) => store.id === targetId);

// //     if (draggedIndex !== -1 && targetIndex !== -1) {
// //       const updatedStores = [...stores];
// //       const [movedStore] = updatedStores.splice(draggedIndex, 1);
// //       updatedStores.splice(targetIndex, 0, movedStore);

// //       setStores(updatedStores);
// //     }
// //   };

// //   const handleDelete = (id: number) => {
// //     setStores((prevStores) => prevStores.filter((store) => store.id !== id));
// //   };
// //   const headers = ["sNo", "name", "city", "state"];

// //   return (
// //     <Box p={3}>
// //       <TableComponent
// //         headers={headers}
// //         rows={stores}
// //         onDelete={handleDelete}
// //         onDragStart={handleDragStart}
// //         onDrop={handleDrop}
// //         isDraggable={true} // Enable dragging
// //       />
// //       <Box mt={2}>
// //         <Button variant="contained" color="primary">New Store</Button>
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default StoreScreen;

// import React, { useState } from "react";
// import { Box, Button } from "@mui/material";
// import TableComponent from "../components/TableComponent";

// interface Store {
//   id: number;
//   sNo: number;
//   name: string;
//   city: string;
//   state: string;
// }

// const initialStores: Store[] = [
//   { id: 1, sNo: 1, name: "Atlanta Outfitters", city: "Atlanta", state: "GA" },
//   {
//     id: 2,
//     sNo: 2,
//     name: "Chicago Charm Boutique",
//     city: "Chicago",
//     state: "IL",
//   },
//   {
//     id: 3,
//     sNo: 3,
//     name: "Houston Harvest Market",
//     city: "Houston",
//     state: "TX",
//   },
//   {
//     id: 4,
//     sNo: 4,
//     name: "Seattle Skyline Goods",
//     city: "Seattle",
//     state: "WA",
//   },
// ];

// const StoreScreen: React.FC = () => {
//   const [stores, setStores] = useState<Store[]>(initialStores);
//   const [draggedId, setDraggedId] = useState<number | null>(null);

//   const handleDragStart = (event: React.DragEvent<HTMLElement>, id: number) => {
//     setDraggedId(id);
//     event.dataTransfer.setData("storeId", id.toString());
//   };

//   const handleDrop = (
//     event: React.DragEvent<HTMLTableRowElement>,
//     targetId: number
//   ) => {
//     event.preventDefault();
//     if (draggedId === null || draggedId === targetId) return;

//     const draggedIndex = stores.findIndex((store) => store.id === draggedId);
//     const targetIndex = stores.findIndex((store) => store.id === targetId);

//     if (draggedIndex !== -1 && targetIndex !== -1) {
//       const updatedStores = [...stores];
//       const [movedStore] = updatedStores.splice(draggedIndex, 1);
//       updatedStores.splice(targetIndex, 0, movedStore);
//       setStores(updatedStores);
//     }
//   };

//   const handleDragOver = (event: React.DragEvent<HTMLElement>, id: number) => {
//     event.preventDefault();
//   };

//   const handleDelete = (id: number) => {
//     setStores((prevStores) => prevStores.filter((store) => store.id !== id));
//   };

//   const headers = ["sNo", "name", "city", "state"];

//   return (
//     <Box p={3}>
//       <TableComponent
//         headers={headers}
//         rows={stores}
//         onDelete={handleDelete}
//         onDragStart={handleDragStart}
//         onDrop={handleDrop}
//         // onDragOver={handleDragOver}
//         isDraggable={true}
//       />
//       <Box mt={2}>
//         <Button variant="contained" color="primary">
//           New Store
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default StoreScreen;

import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import TableComponent from "../components/TableComponent";
import DynamicForm from "../components/DynamicForm";
import CustomModal from "../components/CustomModal";

interface Store {
  id: number;
  sNo: number;
  name: string;
  city: string;
  state: string;
}
type FormField = {
  name: string;
  label: string;
  type:
    | "number"
    | "text"
    | "email"
    | "password"
    | "date"
    | "checkbox"
    | "select";
  placeholder: string;
  required: boolean;
};

const initialStores: Store[] = [
  { id: 1, sNo: 1, name: "Atlanta Outfitters", city: "Atlanta", state: "GA" },
  {
    id: 2,
    sNo: 2,
    name: "Chicago Charm Boutique",
    city: "Chicago",
    state: "IL",
  },
  {
    id: 3,
    sNo: 3,
    name: "Houston Harvest Market",
    city: "Houston",
    state: "TX",
  },
  {
    id: 4,
    sNo: 4,
    name: "Seattle Skyline Goods",
    city: "Seattle",
    state: "WA",
  },
];

const StoreScreen: React.FC = () => {
  const [stores, setStores] = useState<Store[]>(initialStores);
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDragStart = (event: React.DragEvent<HTMLElement>, id: number) => {
    setDraggedId(id);
    event.dataTransfer.setData("storeId", id.toString());
  };

  const handleDrop = (
    event: React.DragEvent<HTMLTableRowElement>,
    targetId: number
  ) => {
    event.preventDefault();
    if (draggedId === null || draggedId === targetId) return;

    const draggedIndex = stores.findIndex((store) => store.id === draggedId);
    const targetIndex = stores.findIndex((store) => store.id === targetId);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      const updatedStores = [...stores];
      const [movedStore] = updatedStores.splice(draggedIndex, 1);
      updatedStores.splice(targetIndex, 0, movedStore);
      setStores(updatedStores);
    }
  };

  const handleDelete = (id: number) => {
    setStores((prevStores) => prevStores.filter((store) => store.id !== id));
  };

  const handleAddStore = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = (values: any) => {
    const newId =
      stores.length > 0 ? Math.max(...stores.map((store) => store.id)) + 1 : 1;
    const newStore = { id: newId, sNo: newId, ...values };
    setStores([...stores, newStore]);
    setIsModalOpen(false);
  };

  const storeFields: FormField[] = [
    {
      name: "name",
      label: "Store Name",
      type: "text",
      placeholder: "Enter Store Name",
      required: true,
    },
    {
      name: "city",
      label: "City",
      type: "text",
      placeholder: "Enter City",
      required: true,
    },
    {
      name: "state",
      label: "State",
      type: "text",
      placeholder: "Enter State",
      required: true,
    },
  ];

  const headers = ["sNo", "name", "city", "state"];

  return (
    <Box p={3}>
      <TableComponent
        headers={headers}
        rows={stores}
        onDelete={handleDelete}
        onDragStart={handleDragStart}
        onDrop={handleDrop}
        isDraggable={true}
      />
      <Button variant="contained" color="primary" onClick={handleAddStore}>
        New Store
      </Button>
      {isModalOpen && (
        <CustomModal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2>Add New Store</h2>
          <DynamicForm fields={storeFields} onSubmit={handleSubmit} />
        </CustomModal>
      )}
    </Box>
  );
};

export default StoreScreen;
