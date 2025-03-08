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

export const skuFields: FormField[] = [
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
