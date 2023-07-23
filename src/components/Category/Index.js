import React, { useState } from "react";
import CategoryBox from "./CategoryBox";
import SubCategoryBox from "./SubCategoryBox";
import BrandBox from "./BrandBox";

const emptyCategory = {
  name: "",
  imageUrl: "",
  subCategories: [],
};
const EmptyBrand = {
  name: "",
  imageUrl: "",
};

const Category = ({ selectedTab, metaData, saveBrands, saveCategories }) => {
  
  const [categories, setCategories] = useState(metaData.categories);
  const [brands, setBrands] = useState(metaData.brands);
  // const {saveBrands} = useCategories();
  // console.log(brands)
  console.log(categories)

  function AddCategory() {
    setCategories([...categories, { ...emptyCategory }]);
  }
  console.log(categories);
  function AddBrand() {
    setBrands([...brands, { ...EmptyBrand }]);
  }

  return (
    <>
      {selectedTab === "categories" && (
        <div>
          <div className="justify-center flex">
            <div className="container xl:w-4/6 space-y-3 ">
              <div className="flex items-center ">
                <label className="block text-gray-500 font-bold text-2xl">
                  Category
                </label>
                <button
                  className="bg-green-700 max-w-full mx-2 my-2 px-2 py-2 text-center text-white rounded-full"
                  onClick={() => AddCategory()}
                >
                  Add Category
                </button>
              </div>
              {categories.map((category, categoryIndex) => {
                console.log(category)
                return (
                  <div className="border p-3 gap-3 bg-slate-100">
                    <CategoryBox
                      category={category}
                      categories={categories}
                      setCategories={setCategories}
                      categoryIndex={categoryIndex}
                    />
                    {category.subCategories.map((subCat, subCatIndex) => {
                      return (
                        <SubCategoryBox
                          subCat={subCat}
                          subCatIndex={subCatIndex}
                          setCategories={setCategories}
                          categories={categories}
                          categoryIndex={categoryIndex}
                        />
                      );
                    })}
                  </div>
                );
              })}
              <div className="float-right">
                <button
                  className="bg-green-700 max-w-full mx-2 my-2 px-2 py-2 text-center text-white rounded-full"
                  onClick={() => saveCategories(categories)}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedTab === "brands" && (
        <div className="justify-center flex">
          <div className="container xl:w-4/6 space-y-3 ">
            <div className="flex items-center ">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 ml-5 md:mb-0 pr-4"
              >
                Brand
              </label>
              <button
                className="bg-green-700 max-w-full mx-2 my-2 px-2 py-2 text-center text-white rounded-full"
                onClick={() => AddBrand()}
              >
                Add brand
              </button>
            </div>
            {brands.map((brand, brandIndex) => {
                console.log(brand)
              return <BrandBox brand={brand} brandIndex={brandIndex} brands={brands} setBrands={setBrands} />;
            })}
            <div className="float-right">
                <button
                  className="bg-green-700 max-w-full mx-2 my-2 px-2 py-2 text-center text-white rounded-full"
                  onClick={() => saveBrands(brands)}
                >
                  Save Changes
                </button>
              </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Category;
