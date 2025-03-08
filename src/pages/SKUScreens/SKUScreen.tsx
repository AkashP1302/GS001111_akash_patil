import React, { useEffect, useState } from "react";
import TableComponent from "../../components/TableComponent";
import DynamicForm from "../../components/DynamicForm"; // Import DynamicForm
import CustomModal from "../../components/CustomModal";
import { Button } from "@mui/material";
import { skuFields } from "./skuFields";
import useExcelData from "../../hooks/useExcelData";

const SKUScreen = () => {
  const sheetName = "SKUs"; // Change this to the desired sheet
  const excelData = useExcelData("/GSIV25 - Sample Data.xlsx", sheetName);

  const [skuData, setSKUData] = useState(excelData);
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (excelData.length > 0) {
      setSKUData(excelData); // Update stores when excelData is available
    }
  }, [excelData]);

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    id: number
  ) => {
    setDraggedId(id);
    event.dataTransfer.setData("skuId", id.toString());
  };

  const handleDrop = (
    event: React.DragEvent<HTMLTableRowElement>,
    targetId: number
  ) => {
    event.preventDefault();
    if (draggedId === null || draggedId === targetId) return;

    const draggedIndex = skuData.findIndex((sku) => sku.id === draggedId);
    const targetIndex = skuData.findIndex((sku) => sku.id === targetId);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      const updatedData = [...skuData];
      const [movedSKU] = updatedData.splice(draggedIndex, 1);
      updatedData.splice(targetIndex, 0, movedSKU);

      setSKUData(updatedData);
    }
  };

  const handleAddSKU = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = (values: any) => {
    const newId =
      skuData.length > 0 ? Math.max(...skuData.map((sku) => sku.id)) + 1 : 1;
    const newSKU = { id: newId, ...values };
    setSKUData([...skuData, newSKU]);
    setIsModalOpen(false);
  };

  const headers = ["label", "price", "cost"];
  const handleDelete = (id: number) => {
    setSKUData((prevSku) => prevSku.filter((sku) => sku.id !== id));
  };
  const handleEditRow = (updatedRow: any) => {
    setSKUData((prev) =>
      prev.map((sku) => (sku.id === updatedRow.id ? updatedRow : sku))
    );
  };

  if (!excelData || excelData.length === 0) {
    return <div>Loading Excel Data...</div>;
  }
  return (
    <div style={{ flex: 1, padding: 10 }}>
      <TableComponent
        headers={headers}
        rows={skuData}
        onDelete={handleDelete}
        onDragStart={handleDragStart}
        onDrop={handleDrop}
        isDraggable={true}
        onEdit={handleEditRow}
      />
      <Button variant="contained" color="primary" onClick={handleAddSKU}>
        New SKU
      </Button>
      {isModalOpen && (
        <CustomModal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2>Add New SKU</h2>
          <DynamicForm fields={skuFields} onSubmit={handleSubmit} />
        </CustomModal>
      )}
    </div>
  );
};

export default SKUScreen;
