import React, { useState } from 'react'
import InputformComp from '../InputFormComp'
import ToggleButton from '../ToggleButton'
import ImageUploadModel from "../ImageUploadModel"
import Brand from '../Brand'

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
    const [category, setCategories] = useState([]);
    const [imgUrl, setImgUrl] = useState(null);
    const [showModel, setShowModel] = useState(false);
    const [error, setError] = useState(null)


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
    function handleSabCategoryName(categoryIndex, sabCategoryIndex, value) {
        const categoryCopy = JSON.parse(JSON.stringify(category));
        categoryCopy[categoryIndex].subcategory[sabCategoryIndex].name = value
        setCategories(categoryCopy)
    }

    function removedescription(categoryIndex) {
        let categoryCopy = [...category];
        categoryCopy.splice(categoryIndex, 1);
        setCategories(categoryCopy)
    }

    function handleUrl(url) {
        setError(null)
        setImgUrl(url)
    }
    return (<>
        <div className='justify-center flex'>
            <div className="w-auto xl:w-4/6 space-y-3 ">
                <div className='flex items-center '>
                    <label className="block text-gray-500 font-bold md:text-right mb-1 ml-5 md:mb-0 pr-4" for="inline-full-name">
                        Category
                    </label>
                    <button className="bg-green-700 max-w-full mx-2 my-2 px-2 py-2 text-center text-white rounded-full w-full" onClick={() => AddCategory()}>Add Category</button>

                </div>
                {category.map((category, categoryIndex) => {
                    return <div className='border p-3 gap-3'>
                        <div className="flex items-center float-right">
                            <ToggleButton isSelected="dcndn" setIsSelected="dchd" rightLabel="Available" leftLabel="Not Available" />
                        </div>
                        <div className='flex items-center w-full gap-3'>
                            <InputformComp label={categoryIndex + 1} text={category.name} setText={(value) => handleCategoryChange(value, categoryIndex)} />
                            <button
                                onClick={() => setShowModel(true)}
                                className="">
                                {imgUrl ? "Change Image" : <svg aria-hidden="true" className="w-10 h-8 mb-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                }
                            </button>
                            {showModel && <ImageUploadModel setShowModel={setShowModel} handleUrl={handleUrl} />}
                            {imgUrl && <img src={imgUrl} className="h-56" />}

                            <button className="font-bold  mb-6 hover:text-red-400 " onClick={() => AddSubCategory(categoryIndex)}><img className="inline-block" src="https://img.icons8.com/color/30/000000/plus--v3.png" /></button>
                            <button className="font-bold  mb-6 hover:text-red-400" onClick={() => removedescription(categoryIndex)}><img src="https://img.icons8.com/plasticine/40/000000/filled-trash.png" /></button>
                        </div>
                        {category.subcategory.map((subVar, subVarIndex) => {
                            return <div className='flex items-center gap-3'>
                                <InputformComp label={"Name"} text={subVar.name} setText={(value) => handleSabCategoryName(categoryIndex, subVarIndex, value)} />
                                <button
                                    onClick={() => setShowModel(true)}
                                    className="">
                                    {imgUrl ? "Change Image" : <svg aria-hidden="true" className="w-10 h-8 mb-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                    }
                                </button>
                                {showModel && <ImageUploadModel setShowModel={setShowModel} handleUrl={handleUrl} />}
                                {imgUrl && <img src={imgUrl} className="h-56" />}

                                <button className="font-bold  mb-6 hover:text-red-400" onClick={() => removedescription(categoryIndex)}><img src="https://img.icons8.com/plasticine/40/000000/filled-trash.png" /></button>
                                <div className='mb-5'><ToggleButton isSelected="dcndn" setIsSelected="dchd" /></div>
                            </div>
                        })}
                    </div>
                })}
            </div>
        </div>
        <Brand />
    </>)
}

export default Category