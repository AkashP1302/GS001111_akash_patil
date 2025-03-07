import React from 'react';
import TableComponent from '../components/TableComponent';

const SKUScreen = () => {
  // Sample SKU data, replace with your actual dataset
  const skuData = [
    { itemID: '10011', label: 'Jeans', class: 'Apparel', department: 'Men', price: 49.99, cost: 25.0 },
    { itemID: '10012', label: 'T-Shirt', class: 'Apparel', department: 'Women', price: 19.99, cost: 10.0 },
    { itemID: '10013', label: 'Jacket', class: 'Apparel', department: 'Unisex', price: 89.99, cost: 50.0 },
  ];

  // Define table headers
  const headers = ['Item ID', 'Label', 'Class', 'Department', 'Price', 'Cost'];

  return (
    <div style={{ flex: 1, padding: 10 }}>
      <TableComponent headers={headers} rows={skuData} />
    </div>
  );
};

export default SKUScreen;
