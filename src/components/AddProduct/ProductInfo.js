import React, { useState } from "react";

const ProductForm = (props) => {
  const { name, setName, GST, setGST } = props;
  const [description, setDescription] = useState("");

  const handleProductNameChange = (event) => {
    setName(event.target.value);
  };

  const handleGSTChange = (event) => {
    setGST(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Product Information</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium">
          Product Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleProductNameChange}
          placeholder="Enter product name"
          className="w-full rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="gst" className="block text-sm font-medium">
          GST
        </label>
        <input
          type="text"
          id="gst"
          value={GST}
          onChange={handleGSTChange}
          placeholder="Enter GST"
          className="w-full rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>
      {/* <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          rows="3"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Enter product description"
          className="w-full rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div> */}
    </div>
  );
};

export default ProductForm;
