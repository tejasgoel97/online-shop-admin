import React, { useState } from 'react'
import InputformComp from './InputFormComp'
import ToggleButton from './ToggleButton'

const EmptySubVariant = {
    name: "",
    price: ""
}

const emptyVariant = {
    name: "",
    subVariants: [
    ]

}

function AddProductForm1() {
    const [variants, setVariants] = useState([])

    function AddVariant() {
        setVariants([...variants, { ...emptyVariant }])
    }
    console.log(variants)

    function handleVariantChange(value, index) {
        const variantsCopy = [...variants];
        variantsCopy[index].name = value;
        setVariants(variantsCopy)

    }
    function AddSubVariant(index) {
        const variantsCopy = JSON.parse(JSON.stringify(variants));
        console.log(variantsCopy)
        variantsCopy[index].subVariants.push(EmptySubVariant)
        setVariants(variantsCopy)
    }
    function handleSabVariantName(variantIndex, sabVaiantIndex, value) {
        const variantsCopy = JSON.parse(JSON.stringify(variants));
        variantsCopy[variantIndex].subVariants[sabVaiantIndex].name = value
        setVariants(variantsCopy)
    }
    function handleSabVariantPrice(variantIndex, sabVaiantIndex, value) {
        const variantsCopy = JSON.parse(JSON.stringify(variants));
        variantsCopy[variantIndex].subVariants[sabVaiantIndex].price = value
        setVariants(variantsCopy)
    }
    function removedescription(variantIndex) {
        let variantsCopy = [...variants];
        variantsCopy.splice(variantIndex, 1);
        setVariants(variantsCopy)
    }

    return (
        <div>
            <button className="bg-green-700 mx-2 my-2 px-2 py-2 text-center text-white rounded-full w-full" onClick={() => AddVariant()}>Add Variant</button>
            {variants.map((variant, variantIndex) => {
                return <div className='border p-3'>
                     <div className="flex items-center float-right">
                    <ToggleButton isSelected="dcndn" setIsSelected="dchd" rightLabel="Available" leftLabel="Not Available" />
                    </div>
                    <div className='flex items-center  mb-9 pt-9'>
                        <div className="md:w-3/3">
                        <InputformComp label={variantIndex + 1} text={variant.name} setText={(value) => handleVariantChange(value, variantIndex)} /></div>
                        <button className="font-bold  mb-6 hover:text-red-400 ml-5 mr-5" onClick={() => AddSubVariant(variantIndex)}><img className="inline-block" src="https://img.icons8.com/color/30/000000/plus--v3.png" /></button>
                        <button className="font-bold  mb-6 hover:text-red-400" onClick={() => removedescription(variantIndex)}><img src="https://img.icons8.com/plasticine/40/000000/filled-trash.png" /></button>
                    </div>
                    {variant.subVariants.map((subVar, subVarIndex) => {
                        return <div className='flex items-center m-5'>
                            <InputformComp label={"Name"} text={subVar.name} setText={(value) => handleSabVariantName(variantIndex, subVarIndex, value)} />
                            <InputformComp label={"MRP"} text={subVar.price} setText={(value) => handleSabVariantPrice(variantIndex, subVarIndex, value)} />
                            <InputformComp label={"Selling Price"} text={subVar.price} setText={(value) => handleSabVariantPrice(variantIndex, subVarIndex, value)} />
                            <InputformComp label={"GST%"} text={subVar.price} setText={(value) => handleSabVariantPrice(variantIndex, subVarIndex, value)} />
                            <button className="font-bold  mb-6 hover:text-red-400" onClick={() => removedescription(variantIndex)}><img src="https://img.icons8.com/plasticine/40/000000/filled-trash.png" /></button>
                            <ToggleButton isSelected="dcndn" setIsSelected="dchd" />

                        </div>
                    })}
                </div>
            })}
        </div>
    )
}

export default AddProductForm1