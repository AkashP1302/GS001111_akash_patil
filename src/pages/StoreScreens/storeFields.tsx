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
export const storeFields: FormField[] = [
  {
    name: "label",
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
