import React, { useState } from 'react'
import InputformComp from './InputFormComp'

const EmptySubVariant= {
    name:"",
    price:""
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

    return (
        <div>
            <button className="bg-green-700 mx-2 my-2 px-2 py-2 text-center text-white rounded-full w-full" onClick={() => AddVariant()}>Add Variant</button>
            {variants.map((variant, variantIndex) => {
                return <div>
                    <div className='flex'>
                    <InputformComp label={variantIndex + 1} text={variant.name} setText={(value) => handleVariantChange(value, variantIndex)} />
                    <button className="bg-green-700 mx-2 my-2 px-2 py-2 text-center text-white rounded-full w-full" onClick={()=> AddSubVariant(variantIndex)}>+</button>
                </div>
                {variant.subVariants.map((subVar, subVarIndex)=>{
                    return <div className='flex'>
                        <InputformComp label={"Name"} text={subVar.name} setText={(value) => handleSabVariantName(variantIndex,subVarIndex, value)} />
                        <InputformComp label={"Price"} text={subVar.price} setText={(value) => handleSabVariantPrice(variantIndex,subVarIndex, value)} />
                        </div>
                })}
                </div>
            })}
        </div>
    )
}

export default AddProductForm1