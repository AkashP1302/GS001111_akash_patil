import React, { useState } from "react";
import TableComponent from "../components/TableComponent";
import DynamicForm from "../components/DynamicForm"; // Import DynamicForm
import CustomModal from "../components/CustomModal";
import { Button } from "@mui/material";

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

const SKUScreen = () => {
  const initialSKUData = [
    {
      id: 1,
      itemID: "10011",
      label: "Jeans",
      class: "Apparel",
      department: "Men",
      price: 49.99,
      cost: 25.0,
    },
    {
      id: 2,
      itemID: "10012",
      label: "T-Shirt",
      class: "Apparel",
      department: "Women",
      price: 19.99,
      cost: 10.0,
    },
    {
      id: 3,
      itemID: "10013",
      label: "Jacket",
      class: "Apparel",
      department: "Unisex",
      price: 89.99,
      cost: 50.0,
    },
  ];

  const [skuData, setSKUData] = useState(initialSKUData);
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const skuFields: FormField[] = [
    {
      name: "itemID",
      label: "Item ID",
      type: "text",
      placeholder: "Enter Item ID",
      required: true,
    },
    {
      name: "label",
      label: "Label",
      type: "text",
      placeholder: "Enter Label",
      required: true,
    },
    {
      name: "class",
      label: "Class",
      type: "text",
      placeholder: "Enter Class",
      required: true,
    },
    {
      name: "department",
      label: "Department",
      type: "text",
      placeholder: "Enter Department",
      required: true,
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      placeholder: "Enter Price",
      required: true,
    },
    {
      name: "cost",
      label: "Cost",
      type: "number",
      placeholder: "Enter Cost",
      required: true,
    },
  ];

  const headers = ["itemID", "label", "class", "department", "price", "cost"];
  const handleDelete = (id: number) => {
    setSKUData((prevSku) => prevSku.filter((sku) => sku.id !== id));
  };
  return (
    <div style={{ flex: 1, padding: 10 }}>
      <TableComponent
        headers={headers}
        rows={skuData}
        onDelete={handleDelete}
        onDragStart={handleDragStart}
        onDrop={handleDrop}
        isDraggable={true}
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
