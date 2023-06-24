import React, { useState } from 'react';
import ImageUploadComp from './ImageUploadComp';
import InputformComp from './InputFormComp';
import DropDownMenu from "./DropDownMenu"
import ImageUploadModel from "./ImageUploadModel"
import { addDoc, collection } from '@firebase/firestore';
import { db } from '../firebase/config';
import DeliveryCodesComp from "./DeliveryCodesComp"

import { useNavigate } from 'react-router-dom'


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
        <div className="w-auto xl:w-4/6 space-y-3">
            <InputformComp label="Product Name" text={name} setText={setName} type="text" />
            {/* <div className="flex justify-center space-x-2 flex-1">
               <InputformComp label="MRP" text={MRP} setText={setMRP} type="number"/>
               <InputformComp label="Selling Price" text={SP} setText={setSP} type="number"/>
               <InputformComp label="GST %" text={GST} setText={setGST} type="number"/>
            </div> */}
            <div className="flex justify-center space-x-2 flex-1">
                <DropDownMenu options={allCat} selected={category} setSelected={handleCategorySelect} nameField="catName" placeHolder="Select Category" />
                {category && <DropDownMenu options={category.subCat} selected={subCategory} setSelected={setSubCategory} nameField="subCatName" placeHolder="Select Sub Category" />}
            </div>
            <div>
                <span className="font-bold ">Description  </span>
                <span className="hover:animate-bounce cursor-pointer" onClick={handleNewDescrition}><img className="inline-block" src="https://img.icons8.com/color/30/000000/plus--v3.png" /></span>
                <div>
                    {description.map((text, index) => {
                        return <div className="flex align-middle m-0 p-0" key={index}>
                            <InputformComp text={text} setText={handleDescriptionChange.bind(this, index)} type="text" />
                            <button className="font-bold  mb-3 hover:text-red-400" onClick={() => removedescription(index)}><img src="https://img.icons8.com/plasticine/40/000000/filled-trash.png" /> </button>
                        </div>
                    })}
                </div>
            </div>
            <div>
                <button
                    onClick={() => setShowModel(true)}
                    class="bg-red-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold">
                    {imgUrl ? "Change Image" : "Add Image"}
                </button>
                {/* This is model to show Image Uploading frature */}
                {showModel && <ImageUploadModel setShowModel={setShowModel} handleUrl={handleUrl} />}
                {/* <ImageUploadComp  imgName = {name} folderName="categoty"/> */}
                {imgUrl && <img src={imgUrl} className="h-56" />}
            </div>
            <InputformComp label="Max Product Order" text={maxQuantity} setText={setMaxQuantity} type="number" />
            <div>
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