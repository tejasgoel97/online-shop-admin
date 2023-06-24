import React, { useState } from 'react'
import InputformComp from '../InputFormComp'
import ToggleButton from '../ToggleButton'
import ImageUploadModel from "../ImageUploadModel"

const EmptySubBrand = {
    name: "",
    imgeUrl: ''
}

const EmptyBrand = {
    name: "",
    imageUrl: "",
    subBrand: [
    ]

}



const Brand = () => {
    const [brand, setBrand] = useState([]);
    const [imgUrl, setImgUrl] = useState(null);
    const [showModel, setShowModel] = useState(false);
    const [error, setError] = useState(null)


    function AddBrand() {
        setBrand([...brand, { ...EmptyBrand }])
    }
    console.log(brand)

    function handleBrandChange(value, index) {
        const brandCopy = [...brand];
        brandCopy[index].name = value;
        setBrand(brandCopy)

    }
    function AddsubBrand(index) {
        const brandCopy = JSON.parse(JSON.stringify(brand));
        console.log(brandCopy)
        brandCopy[index].subBrand.push(EmptySubBrand)
        setBrand(brandCopy)
    }
    function handleSabBrandName(brandIndex, sabbrandIndex, value) {
        const brandCopy = JSON.parse(JSON.stringify(brand));
        brandCopy[brandIndex].subBrand[sabbrandIndex].name = value
        setBrand(brandCopy)
    }

    function removedescription(brandIndex) {
        let brandCopy = [...brand];
        brandCopy.splice(brandIndex, 1);
        setBrand(brandCopy)
    }

    function handleUrl(url) {
        setError(null)
        setImgUrl(url)
    }
    return (
        <div className='justify-center flex'>
            <div className="w-auto xl:w-4/6 space-y-3 ">
                <div className='flex items-center '>
                    <label className="block text-gray-500 font-bold md:text-right mb-1 ml-5 md:mb-0 pr-4" for="inline-full-name">
                        Brand
                    </label>
                    <button className="bg-green-700 max-w-full mx-2 my-2 px-2 py-2 text-center text-white rounded-full w-full" onClick={() => AddBrand()}>Add brand</button>

                </div>
                {brand.map((brand, brandIndex) => {
                    return <div className='border p-3 gap-3'>
                        <div className="flex items-center float-right">
                            <ToggleButton isSelected="dcndn" setIsSelected="dchd" rightLabel="Available" leftLabel="Not Available" />
                        </div>
                        <div className='flex items-center w-full gap-3'>
                            <InputformComp label={brandIndex + 1} text={brand.name} setText={(value) => handleBrandChange(value, brandIndex)} />
                            <button
                                onClick={() => setShowModel(true)}
                                className="">
                                {imgUrl ? "Change Image" : <svg aria-hidden="true" className="w-10 h-8 mb-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                }
                            </button>
                            {showModel && <ImageUploadModel setShowModel={setShowModel} handleUrl={handleUrl} />}
                            {imgUrl && <img src={imgUrl} className="h-56" />}

                            <button className="font-bold  mb-6 hover:text-red-400 " onClick={() => AddsubBrand(brandIndex)}><img className="inline-block" src="https://img.icons8.com/color/30/000000/plus--v3.png" /></button>
                            <button className="font-bold  mb-6 hover:text-red-400" onClick={() => removedescription(brandIndex)}><img src="https://img.icons8.com/plasticine/40/000000/filled-trash.png" /></button>
                        </div>
                        {/* {brand.subBrand.map((subVar, subVarIndex) => {
                            return <div className='flex items-center gap-3'>
                                <InputformComp label={"Name"} text={subVar.name} setText={(value) => handleSabBrandName(brandIndex, subVarIndex, value)} />
                                <button
                                    onClick={() => setShowModel(true)}
                                    className="">
                                    {imgUrl ? "Change Image" : <svg aria-hidden="true" className="w-10 h-8 mb-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                    }
                                </button>
                                {showModel && <ImageUploadModel setShowModel={setShowModel} handleUrl={handleUrl} />}
                                {imgUrl && <img src={imgUrl} className="h-56" />}

                                <button className="font-bold  mb-6 hover:text-red-400" onClick={() => removedescription(brandIndex)}><img src="https://img.icons8.com/plasticine/40/000000/filled-trash.png" /></button>
                                <div className='mb-5'><ToggleButton isSelected="dcndn" setIsSelected="dchd" /></div>
                            </div>
                        })} */}
                    </div>
                })}
            </div>
        </div>
    )
}

export default Brand