import React, { useState } from 'react';
import ToggleButton from '../ToggleButton';

const ProductVariantComponent = (props) => {
  const {variants, setVariants} =props;

  const addVariant = () => {
    setVariants([...variants, { name: '', subvariants: [] }]);
  };

  const deleteVariant = (index) => {
    const updatedVariants = [...variants];
    updatedVariants.splice(index, 1);
    setVariants(updatedVariants);
  };

  const addSubVariant = (variantIndex) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].subvariants.push({ name: '', MRP: '', SP: '' });
    setVariants(updatedVariants);
  };

  const deleteSubVariant = (variantIndex, subVariantIndex) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].subvariants.splice(subVariantIndex, 1);
    setVariants(updatedVariants);
  };

  const handleVariantNameChange = (event, variantIndex) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].name = event.target.value;
    setVariants(updatedVariants);
  };

  const handleSubVariantFieldChange = (event, variantIndex, subVariantIndex, field) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].subvariants[subVariantIndex][field] = event.target.value;
    setVariants(updatedVariants);
  };
  const handleVariantToggle = (variantIndex) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].isSelected = !updatedVariants[variantIndex].isSelected;
    setVariants(updatedVariants);
  };

  const handleSubVariantToggle = (variantIndex, subVariantIndex) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].subvariants[subVariantIndex].isSelected = !updatedVariants[variantIndex].subvariants[subVariantIndex].isSelected;
    setVariants(updatedVariants);
  };


  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Variants</h1>
      {variants.map((variant, variantIndex) => (
        <div key={variantIndex} className={`mb-6 p-4 bg-white rounded-lg shadow-md ${variant.isSelected ? "":"bg-gray-300"}`}>
          <div className="flex items-center mb-4 justify-between">
            <div>
            <h2 className="text-lg font-semibold mr-2">{`Variant ${variantIndex + 1}`}</h2>
            <input
              type="text"
              value={variant.name}
              onChange={(event) => handleVariantNameChange(event, variantIndex)}
              placeholder="Variant Name"
              className="border rounded px-2 py-1 mr-2 w-40 focus:outline-none"
            />
            <button
              onClick={() => deleteVariant(variantIndex)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
            >
              <i className="fas fa-trash mr-2"></i>Delete Variant
            </button>
            </div>
            <ToggleButton
                isSelected={variant.isSelected}
                setIsSelected={() => handleVariantToggle(variantIndex)}
              />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {variant.subvariants.map((subVariant, subVariantIndex) => (
              <div key={subVariantIndex} className={subVariant.isSelected ?"border rounded p-4 bg-white shadow-md": "border rounded p-4 bg-gray-200 shadow-md"}>
                <div className='flex justify-between'>
                <h3 className="text-md font-semibold mb-2">{`Subvariant ${
                  subVariantIndex + 1
                }`}</h3>
                 <ToggleButton
                      isSelected={subVariant.isSelected}
                      setIsSelected={() => handleSubVariantToggle(variantIndex, subVariantIndex)}
                    />
                </div>
                
                <div className="flex flex-wrap mb-2">
                  <label htmlFor={`name_${variantIndex}_${subVariantIndex}`} className="block mr-2">
                    Name:
                  </label>
                  <input
                    type="text"
                    id={`name_${variantIndex}_${subVariantIndex}`}
                    value={subVariant.name}
                    onChange={(event) =>
                      handleSubVariantFieldChange(event, variantIndex, subVariantIndex, 'name')
                    }
                    placeholder="Subvariant Name"
                    className="border rounded px-2 py-1 w-full focus:outline-none"
                  />
                </div>
                <div className="flex flex-wrap mb-2">
                  <label htmlFor={`MRP_${variantIndex}_${subVariantIndex}`} className="block mr-2">
                    MRP:
                  </label>
                  <input
                    type="text"
                    id={`MRP_${variantIndex}_${subVariantIndex}`}
                    value={subVariant.MRP}
                    onChange={(event) =>
                      handleSubVariantFieldChange(event, variantIndex, subVariantIndex, 'MRP')
                    }
                    placeholder="MRP"
                    className="border rounded px-2 py-1 w-full focus:outline-none"
                  />
                </div>
                <div className="flex flex-wrap mb-2">
                  <label htmlFor={`SP_${variantIndex}_${subVariantIndex}`} className="block mr-2">
                    SP:
                  </label>
                  <input
                    type="text"
                    id={`SP_${variantIndex}_${subVariantIndex}`}
                    value={subVariant.SP}
                    onChange={(event) =>
                      handleSubVariantFieldChange(event, variantIndex, subVariantIndex, 'SP')
                    }
                    placeholder="SP"
                    className="border rounded px-2 py-1 w-full focus:outline-none"
                  />
                </div>
                <button
                  onClick={() => deleteSubVariant(variantIndex, subVariantIndex)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
                >
                  <i className="fas fa-trash mr-2"></i>Delete Subvariant
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() => addSubVariant(variantIndex)}
            className="mt-4 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors"
          >
            Add Subvariant
          </button>
        </div>
      ))}
      <button
        onClick={addVariant}
        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition-colors"
      >
        Add Variant
      </button>
    </div>
  );
};

export default ProductVariantComponent;
