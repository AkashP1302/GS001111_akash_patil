import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import TableComponent from "../../components/TableComponent";
import DynamicForm from "../../components/DynamicForm";
import CustomModal from "../../components/CustomModal";
import { storeFields } from "./storeFields";
import useExcelData from "../../hooks/useExcelData";

interface Store {
  id: string;
  seq_no: number;
  label: string;
  city: string;
  state: string;
}

const StoreScreen: React.FC = () => {
  const sheetName = "Stores"; // Change this to the desired sheet
  const excelData = useExcelData("/GSIV25 - Sample Data.xlsx", sheetName);
  const [stores, setStores] = useState<Store[]>(excelData);
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (excelData.length > 0) {
      setStores(excelData); // Update stores when excelData is available
    }
  }, [excelData]);

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

    const draggedIndex = stores.findIndex(
      (store: any) => store.id === draggedId
    );
    const targetIndex = stores.findIndex((store: any) => store.id === targetId);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      const updatedStores = [...stores];
      const [movedStore] = updatedStores.splice(draggedIndex, 1);
      updatedStores.splice(targetIndex, 0, movedStore);
      setStores(updatedStores);
    }
  };

  const handleDelete = (id: number) => {
    setStores((prevStores) =>
      prevStores.filter((store: any) => store.id !== id)
    );
  };

  const handleAddStore = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = (values: any) => {
    // Ensure seq_no is a number before calculating max
    const seqNos = stores
      .map((store: any) => Number(store.seq_no))
      .filter((n) => !isNaN(n));

    const newId = seqNos.length > 0 ? Math.max(...seqNos) + 1 : 1;

    const newStore = { id: `ST${newId}`, seq_no: newId, ...values };
    setStores([...stores, newStore]);
    setIsModalOpen(false);
  };
  const handleEditRow = (updatedRow: any) => {
    setStores((prev) =>
      prev.map((store) => (store.id === updatedRow.id ? updatedRow : store))
    );
  };

  const headers = ["seq_no.", "label", "city", "state"];

  if (!excelData || excelData.length === 0) {
    return <div>Loading Excel Data...</div>;
  }
  return (
    <Box p={3}>
      <TableComponent
        headers={headers}
        rows={stores}
        onDelete={handleDelete}
        onDragStart={handleDragStart}
        onDrop={handleDrop}
        isDraggable={true}
        onEdit={handleEditRow}
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
