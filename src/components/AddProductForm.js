import React, { useState } from 'react';
import ImageUploadComp from './ImageUploadComp';
import InputformComp from './InputFormComp';
import DropDownMenu from "./DropDownMenu"
import ImageUploadModel from "./ImageUploadModel"
import { addDoc, collection } from '@firebase/firestore';
import { db } from '../firebase/config';
import DeliveryCodesComp from "./DeliveryCodesComp"

import { useNavigate } from 'react-router-dom'
import ToggleButton from './ToggleButton';
const EmptySubVariant = {
    name: "",
    price: ""
}

const emptyVariant = {
    name: "",
    subVariants: [
    ]

}

const AddProductForm = ({ allCat }) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [category, setCategory] = useState(null);
    const [subCategory, setSubCategory] = useState(null);
    const [MRP, setMRP] = useState(0);
    const [SP, setSP] = useState(0);
    const [GST, setGST] = useState(0);
    const [maxQuantity, setMaxQuantity] = useState(10);
    const [description, setdescription] = useState([])
    const [showModel, setShowModel] = useState(false);
    const [imgUrl, setImgUrl] = useState(null);
    const [deliveryCodes, setDeliveryCodes] = useState([])
    const [error, setError] = useState(null)
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
    function removeVariant(variantIndex) {
        let variantsCopy = [...variants];
        variantsCopy.splice(variantIndex, 1);
        setVariants(variantsCopy)
    }
    function handleUrl(url) {
        setError(null)
        setImgUrl(url)
    }
    function handleDescriptionChange(index, value) {
        console.log(index, value)
        let disc = [...description];
        disc[index] = value;
        setdescription(disc);
    }
    function handleNewDescrition() {
        let disc = [...description];
        disc.push("")
        setdescription(disc)
    }
    function removedescription(index) {
        let disc = [...description];
        disc.splice(index, 1);
        setdescription(disc)
    }


    function handleCategorySelect(cat) {
        setCategory(cat)
        setSubCategory(null)
    }


    async function handleCreateDoc() {
        console.log(SP, "SP", "MRP", MRP)
        console.log(SP > MRP)
        setError(null)
        if (!name) return setError("Please select a Valid Name");
        // if(!category) return setError("Please Select a Valid Category")
        // if(!subCategory) return setError("Please Select a Valid Sub Category")
        if (MRP < 10) return setError("MRP should be greater then 10")
        if (SP < 10) return setError("SP should be greater then 10")
        if (+SP > +MRP) return setError("Selling Price Should not be greater then MRP")
        if (maxQuantity < 1) return setError("Please select a max Quantity to order");
        if (description.length < 0) return setError("Please Select Atleast One description")
        const CatName = category.id;
        const SubCatName = subCategory.id;
        const FinalProduct = new ProductModel(name, MRP, SP, GST, CatName, SubCatName, description, maxQuantity, imgUrl, deliveryCodes)
        console.log("FinalProduct", FinalProduct)
        try {
            const docRef = await addDoc(collection(db, "products"), FinalProduct);
            console.log("Document written with ID: ", docRef.id);
            window.alert(`Document written with ID: ${docRef.id}`)
            navigate('/')
        } catch (error) {
            console.log(error)
            window.alert('Cannot create the product, Please try again')
        }


    }
    return (
        <div className="w-auto xl:w-4/6">
            <InputformComp label="Product Name" text={name} setText={setName} type="text" />
            <div className="flex items-center mb-5 md:mb-9">
                <div className="md:w-1/5 w-1/5">
                    <label className="block text-gray-500 font-bold text-sm md:text-lg md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                        Variant
                    </label>
                </div>
                <div className="md:w-full w-full">
                    <button className="bg-green-700 px-7 py-2  rounded-md text-md text-white font-semibold" onClick={() => AddVariant()}>Add Variant</button>
                </div>
            </div>

            {
                variants.map((variant, variantIndex) => {
                    return <div className='border p-3 gap-3 mb-5 bg-gray-100'>
                        <div className="flex items-center md:float-right">
                            <ToggleButton isSelected="dcndn" setIsSelected="dchd" rightLabel="Available" leftLabel="Not Available" />
                        </div>
                        <div className='flex items-center w-full mt-5'>
                            <InputformComp label={variantIndex + 1} text={variant.name} setText={(value) => handleVariantChange(value, variantIndex)} />
                            <button className="font-bold hover:text-red-400 md:ml-5 ml-2 md:mr-5 mb-7 md:mb-6" onClick={() => AddSubVariant(variantIndex)}><img className="inline-block" src="https://img.icons8.com/color/30/000000/plus--v3.png" /></button>
                            <button className="font-bold hover:text-red-400 mb-7  md:mb-6" onClick={() => removeVariant(variantIndex)}><img src="https://img.icons8.com/plasticine/40/000000/filled-trash.png" /></button>
                        </div>

                        {variant.subVariants.map((subVar, subVarIndex) => {
                            return <div className='md:flex items-center gap-2'>
                                <InputformComp label={"Name"} text={subVar.name} setText={(value) => handleSabVariantName(variantIndex, subVarIndex, value)} />
                                <InputformComp label={"MRP₹"} text={subVar.price} setText={(value) => handleSabVariantPrice(variantIndex, subVarIndex, value)} />
                                <InputformComp label={"Selling Price"} text={subVar.price} setText={(value) => handleSabVariantPrice(variantIndex, subVarIndex, value)} />
                                <InputformComp label={"GST%"} text={subVar.price} setText={(value) => handleSabVariantPrice(variantIndex, subVarIndex, value)} />
                                <div className='flex'><button className="font-bold  md:mb-6 hover:text-red-400" onClick={() => removedescription(variantIndex)}><img src="https://img.icons8.com/plasticine/40/000000/filled-trash.png" /></button>
                                    <div className='mb-5 mt-5 md:mt-0'><ToggleButton isSelected="dcndn" setIsSelected="dchd" /></div></div>
                            </div>
                        })}
                    </div>
                })}

            <div className="flex items-center mb-5 md:mb-9 md:mt-9">
                <div className="w-1/5">
                </div>
                <div className="w-full">
                    <DropDownMenu options={allCat} selected={category} setSelected={handleCategorySelect} nameField="catName" placeHolder="Select Category" />
                    {category && <DropDownMenu options={category.subCat} selected={subCategory} setSelected={setSubCategory} nameField="subCatName" placeHolder="Select Sub Category" />}                </div>
            </div>


            <div className="flex items-center mb-5">
                <div className="w-1/5">
                    <label className="block text-gray-500 font-bold text-base md:text-lg md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                        Description
                    </label>
                </div>
                <div className="w-full ml-5 md:ml-0">
                    <span className="hover:animate-bounce cursor-pointer" onClick={handleNewDescrition}><img className="inline-block" src="https://img.icons8.com/color/30/000000/plus--v3.png" /></span>
                </div>
            </div>
            <div className="md:flex md:items-center mb-3">
                <div className="md:w-1/6"></div>
                <div className="md:w-full">
                    {description.map((text, index) => {
                        return <div className=''>
                            <div className="flex items-center">
                                <InputformComp text={text} setText={handleDescriptionChange.bind(this, index)} type="text" />
                                <button className="font-bold mb-4  md:mb-8 hover:text-red-400" onClick={() => removedescription(index)}><img src="https://img.icons8.com/plasticine/40/000000/filled-trash.png" /> </button>
                            </div>
                        </div>
                    })}
                </div>
            </div>



            <div className="flex items-center mb-5 md:mb-9">
                <div className="w-1/5"></div>
                <div className="w-full">
                    <button
                        onClick={() => setShowModel(true)}
                        className="bg-red-500 px-7 py-2  rounded-md text-md text-white font-semibold">
                        {imgUrl ? "Change Image" : "Add Image"}
                    </button>
                    {imgUrl && <img src={imgUrl} className="h-56 mt-5" />}
                </div>
            </div>
            <div>
                {/* This is model to show Image Uploading frature */}
                {showModel && <ImageUploadModel setShowModel={setShowModel} handleUrl={handleUrl} />}
                {/* <ImageUploadComp  imgName = {name} folderName="categoty"/> */}

            </div>

            <InputformComp label="Max Product Order" text={maxQuantity} setText={setMaxQuantity} type="number" />
            <div className=''>
                <DeliveryCodesComp deliveryCodes={deliveryCodes} setDeliveryCodes={setDeliveryCodes} />
            </div>
            {error && <p className="p-1 bg-red-600 rounded-b break-words text-white">{error}</p>}


            <button className="bg-green-700 mx-2 my-2 px-2 py-2 text-center text-white rounded-full w-full" onClick={handleCreateDoc}>Create</button>
        </div>
    )
}


// class ProductModel {
//     constructor(productName, MRP, SP,mainCategory , subCategory, productDescription, maxQuantity, featureImage){
//         this.productName= productName;
//         this.MRP = MRP;
//         this.SP = SP;
//         this.mainCategory = mainCategory;
//         this.subCategory = subCategory;
//         this.productDescription = productDescription;
//         this.maxQuantity = maxQuantity;
//         this.featureImage= featureImage
//     }
// }
function ProductModel(productName, MRP, SP, GST, mainCategory, subCategory, productDescription, maxQuantity, featureImage, deliveryCodes) {
    return {
        productName, MRP, SP, GST, mainCategory, subCategory, productDescription, maxQuantity, featureImage, deliveryCodes
    }
}



export default AddProductForm;