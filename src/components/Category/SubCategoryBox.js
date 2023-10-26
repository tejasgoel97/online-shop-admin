import { useEffect, useState } from "react";
import ToggleButton from "../ToggleButton";
import ImageUploadModel from "../ImageUploadModel";
import ImageUpload from "../ImageUpload";

const SubCategoryBox = (props) => {
  const { categories, setCategories, subCat, subCatIndex, categoryIndex } =
    props;
  const [showModel, setShowModel] = useState(false);
  const [imgUrl, setImgUrl] = useState(subCat.imgUrl);
  const [subCatName, setSubCatName] = useState(subCat.name);

  useEffect(() => {
    const categoriesCopy = JSON.parse(JSON.stringify(categories));
    categoriesCopy[categoryIndex].subCategories[subCatIndex].imgUrl = imgUrl;
    categoriesCopy[categoryIndex].subCategories[subCatIndex].name = subCatName;
    setCategories(categoriesCopy);
  }, [imgUrl, subCatName]);

  function removeSubCategory() {
    const categoriesCopy = JSON.parse(JSON.stringify(categories));
    categoriesCopy[categoryIndex].subCategories.splice(subCatIndex, 1);
    setCategories(categoriesCopy);
  }

  function handleUrl(url) {
    console.log("url",url)
    setImgUrl(url);
  }
  console.log(showModel)
  return (
    <div className="bg-white my-2 p-4 rounded-md md:col-span-1">
      <h1 className="font-bold text-lg py-2">Sub Category {subCatIndex + 1}</h1>

      <div className="flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-3 flex-1">
          <label className="font-bold">Name</label>
          <input
            type="text"
            value={subCatName}
            onChange={(e) => setSubCatName(e.target.value)}
            className="border rounded-md px-2 py-1 w-full"
          />
          <button
            className="font-bold text-red-400 hover:text-red-600"
            onClick={() => removeSubCategory()}
          >
            <img
              src="https://img.icons8.com/plasticine/40/000000/filled-trash.png"
              alt="Remove Sub Category"
            />
          </button>
        </div>
        <div>
          {showModel && (
            <ImageUploadModel
              setShowModel={setShowModel}
              handleUrl={handleUrl}
            />
          )}
        </div>
        <ImageUpload imgUrl={imgUrl} onClick={() => setShowModel(true)} />
      </div>
    </div>
  );
};

export default SubCategoryBox;
