import { useEffect, useState } from "react";
import ToggleButton from "../ToggleButton";
import InputformComp from "../InputFormComp";
import ImageUploadModel from "../ImageUploadModel";

const SubCategoryBox = (props) => {
  const { categories, setCategories, subCat, subCatIndex, categoryIndex } =
    props;
  const [showModel, setShowModel] = useState(false);
  const [imgUrl, setImgUrl] = useState(subCat.imgUrl);

  useEffect(()=>{
    const categoriesCopy = JSON.parse(JSON.stringify(categories));
    categoriesCopy[categoryIndex].subCategories[subCatIndex].imgUrl = imgUrl;
    setCategories(categoriesCopy);
  }, [imgUrl])

  function handleSabCategoryName(value) {
    const categoriesCopy = JSON.parse(JSON.stringify(categories));
    categoriesCopy[categoryIndex].subCategories[subCatIndex].name = value;
    setCategories(categoriesCopy);
  }

  function removedescription(categoryIndex) {
    let categories = [...categories];
    categories.splice(categoryIndex, 1);
    setCategories(categories);
  }

  function handleUrl(url) {
    setImgUrl(url);
  }
  return (
    <div className="bg-white my-2 p-2 rounded-md">
      <h1 className="font-bold py-2">Sub Category {subCatIndex + 1}</h1>

      <div className="flex justify-between  gap-3 ">
      <div className="flex items-center gap-3">
        <InputformComp
          label={"Name"}
          text={subCat.name}
          setText={(value) =>
            handleSabCategoryName(value)
          }
        />
        <button
          className="font-bold  mb-6 hover:text-red-400"
          onClick={() => removedescription(categoryIndex)}
        >
          <img src="https://img.icons8.com/plasticine/40/000000/filled-trash.png" />
        </button>
        <div className="mb-5">
          <ToggleButton isSelected="dcndn" setIsSelected="dchd" />
        </div>
        

        </div>
        <div>
          <button onClick={() => setShowModel(true)} className="">
            {imgUrl ? "Change Image" : "Upload Image"}
          </button>
          {showModel && (
            <ImageUploadModel
              setShowModel={setShowModel}
              handleUrl={handleUrl}
            />
          )}
          {imgUrl && <img src={imgUrl} className="h-28" />}
        </div>
      </div>
    </div>
  );
};

export default SubCategoryBox;
