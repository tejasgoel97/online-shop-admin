import React, { useState } from 'react'
import InputformComp from '../InputFormComp'

const EmptySubCategory= {
    name:"",
    imgeUrl
}

const emptyCategory = {
    name: "",
    imageUrl:"",
    subCategories: [
    ]
}


const Category = () =>{
    const [categories, setCategories] = useState([])

    function AddCategory() {
        setCategories([...categories, { ...emptyCategory }])
    }
    console.log(categories)

    function handleCategoryChange(value, index) {
        const categoriesCopy = [...categories];
        categoriesCopy[index].name = value;
        setCategories(categoriesCopy)

    }
    function AddSubCategory(index) {
        const categoriesCopy = JSON.parse(JSON.stringify(categories));
        console.log(categoriesCopy)
        categoriesCopy[index].subCategories.push(EmptySubCategory)
        setCategories(categoriesCopy)
    }
    function handleSabCategoryName(categoryIndex, sabVaiantIndex, value) {
        const categoriesCopy = JSON.parse(JSON.stringify(categories));
        categoriesCopy[categoryIndex].subCategories[sabVaiantIndex].name = value
        setCategories(categoriesCopy)
    }
    function handleSabCategoryPrice(categoryIndex, sabVaiantIndex, value) {
        const categoriesCopy = JSON.parse(JSON.stringify(categories));
        categoriesCopy[categoryIndex].subCategories[sabVaiantIndex].price = value
        setCategories(categoriesCopy)
    }

    return (
        <div>
            <button className="bg-green-700 mx-2 my-2 px-2 py-2 text-center text-white rounded-full w-full" onClick={() => AddCategory()}>Add Category</button>
            {categories.map((category, categoryIndex) => {
                return <div>
                    <div className='flex'>
                    <InputformComp label={categoryIndex + 1} text={category.name} setText={(value) => handleCategoryChange(value, categoryIndex)} />
                    <button className="bg-green-700 mx-2 my-2 px-2 py-2 text-center text-white rounded-full w-full" onClick={()=> AddSubCategory(categoryIndex)}>+</button>
                </div>
                {category.subCategories.map((subVar, subVarIndex)=>{
                    return <div className='flex'>
                        <InputformComp label={"Name"} text={subVar.name} setText={(value) => handleSabCategoryName(categoryIndex,subVarIndex, value)} />
                        <InputformComp label={"Price"} text={subVar.price} setText={(value) => handleSabCategoryPrice(categoryIndex,subVarIndex, value)} />
                        </div>
                })}
                </div>
            })}
        </div>
    )
}

export default Category