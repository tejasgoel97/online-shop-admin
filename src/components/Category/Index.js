import React, { useState } from 'react'
import InputformComp from '../InputFormComp'
import ToggleButton from '../ToggleButton'

const EmptySubCategory = {
    name: "",
    imgeUrl: ''
}

const emptyCategory = {
    name: "",
    imageUrl: "",
    subcategory: [
    ]

}



const Category = () => {
    const [category, setCategories] = useState([])

    function AddCategory() {
        setCategories([...category, { ...emptyCategory }])
    }
    console.log(category)

    function handleCategoryChange(value, index) {
        const categoryCopy = [...category];
        categoryCopy[index].name = value;
        setCategories(categoryCopy)

    }
    function AddSubCategory(index) {
        const categoryCopy = JSON.parse(JSON.stringify(category));
        console.log(categoryCopy)
        categoryCopy[index].subcategory.push(EmptySubCategory)
        setCategories(categoryCopy)
    }
    function handleSabCategoryName(variantIndex, sabCategoryIndex, value) {
        const categoryCopy = JSON.parse(JSON.stringify(category));
        categoryCopy[variantIndex].subcategory[sabCategoryIndex].name = value
        setCategories(categoryCopy)
    }
    function handleSabCategoryPrice(variantIndex, sabCategoryIndex, value) {
        const categoryCopy = JSON.parse(JSON.stringify(category));
        categoryCopy[variantIndex].subcategory[sabCategoryIndex].price = value
        setCategories(categoryCopy)
    }
    function removedescription(variantIndex) {
        let categoryCopy = [...category];
        categoryCopy.splice(variantIndex, 1);
        setCategories(categoryCopy)
    }
    return (
        <div className='justify-center flex'>
            <div className="w-auto xl:w-4/6 space-y-3 ">
                <div className='flex items-center '>
                    <label className="block text-gray-500 font-bold md:text-right mb-1 ml-5 md:mb-0 pr-4" for="inline-full-name">
                        Category
                    </label>
                    <button className="bg-green-700 max-w-full mx-2 my-2 px-2 py-2 text-center text-white rounded-full w-full" onClick={() => AddCategory()}>Add Category</button>

                </div>
                {category.map((variant, variantIndex) => {
                    return <div className='border p-3'>
                        <div className="flex items-center float-right">
                            <ToggleButton isSelected="dcndn" setIsSelected="dchd" rightLabel="Available" leftLabel="Not Available" />
                        </div>
                        <div className='flex items-center gap-5 mb-9 pt-9'>
                            <div className="md:w-3/3">
                                <InputformComp label={variantIndex + 1} text={variant.name} setText={(value) => handleCategoryChange(value, variantIndex)} /></div>
                            <button className="font-bold  mb-6 hover:text-red-400 "><img className="inline-block" src="public/assets/file-upload.png" /></button>
                            <button className="font-bold  mb-6 hover:text-red-400 " onClick={() => AddSubCategory(variantIndex)}><img className="inline-block" src="https://img.icons8.com/color/30/000000/plus--v3.png" /></button>
                            <button className="font-bold  mb-6 hover:text-red-400" onClick={() => removedescription(variantIndex)}><img src="https://img.icons8.com/plasticine/40/000000/filled-trash.png" /></button>
                        </div>
                        {variant.subcategory.map((subVar, subVarIndex) => {
                            return <div className='flex items-center gap-5'>
                                <InputformComp label={"Name"} text={subVar.name} setText={(value) => handleSabCategoryName(variantIndex, subVarIndex, value)} />

                                <button className="font-bold  mb-6 hover:text-red-400" onClick={() => removedescription(variantIndex)}><img src="https://img.icons8.com/plasticine/40/000000/filled-trash.png" /></button>
                                <div className='mb-5'><ToggleButton isSelected="dcndn" setIsSelected="dchd" /></div>
                            </div>
                        })}
                    </div>
                })}
            </div>
        </div>
    )
}

export default Category