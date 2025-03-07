import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  TextField,
  MenuItem,
  Select,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";

export interface FormField {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "date"
    | "checkbox"
    | "select";
  options?: { value: string; label: string }[]; // For select dropdowns
  placeholder?: string;
  validation?: Yup.AnySchema;
}

interface DynamicFormProps {
  fields: FormField[];
  onSubmit: (values: any) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ fields, onSubmit }) => {
  const initialValues = fields.reduce((acc, field) => {
    acc[field.name] = field.type === "checkbox" ? false : "";
    return acc;
  }, {} as Record<string, any>);

  const validationSchema = Yup.object(
    fields.reduce((schema, field) => {
      if (field.validation) {
        schema[field.name] = field.validation;
      }
      return schema;
    }, {} as Record<string, Yup.AnySchema>)
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, values, setFieldValue }) => (
        <Form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {fields.map((field) => (
            <div key={field.name}>
              {field.type === "checkbox" ? (
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      name={field.name}
                      checked={values[field.name]}
                      onChange={() =>
                        setFieldValue(field.name, !values[field.name])
                      }
                    />
                  }
                  label={field.label}
                />
              ) : field.type === "select" ? (
                <Field
                  as={Select}
                  name={field.name}
                  fullWidth
                  displayEmpty
                  onChange={(e: any) =>
                    setFieldValue(field.name, e.target.value)
                  }
                >
                  <MenuItem value="" disabled>
                    {field.placeholder || "Select an option"}
                  </MenuItem>
                  {field.options?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
              ) : (
                <Field
                  as={TextField}
                  type={field.type}
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  fullWidth
                  variant="outlined"
                />
              )}
              {/* ✅ Fixed ErrorMessage */}
              <ErrorMessage name={field.name}>
                {(msg) => (
                  <div style={{ color: "red", fontSize: "12px" }}>{msg}</div>
                )}
              </ErrorMessage>
            </div>
          ))}
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default DynamicForm;
