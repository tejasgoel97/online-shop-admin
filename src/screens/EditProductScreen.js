import { useLocation, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import EditProductForm from "../components/EditProduct/EditProductForm"
import useCategories from "../hooks/useCategories";


const EditProductScreen = () =>{
    let urlParams = useParams();

    const {categories,isCategoriesloading, categoriesLoadingError} = useCategories();

    console.log(urlParams)
    const {product,isProductloading, productLoadingError} = useProduct(urlParams.productId)
    if(isProductloading || isCategoriesloading){
        return <p>Loading...</p>
    }
    if(categoriesLoadingError ){
        return <p>{categoriesLoadingError}</p>
    }
    if(productLoadingError ){
        return <p>{productLoadingError}</p>
    }
    if(product &&categories){
    return(
    <div className="justify-center flex">
        <EditProductForm allCat={categories} product={product} productId={urlParams.productId}/>
    </div>
    )}
    return <p>Hi ther</p>
}

export default EditProductScreen