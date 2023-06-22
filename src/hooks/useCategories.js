import { collection, getDocs } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";


const useCategories = ()=>{
    const [categories, setCategories] = useState([]);
    const [categoriesLoadingError, setCategoriesLoadingError] = useState(false)
    const [isCategoriesloading, setIsCategoriesLoading] = useState(false)
    

    useEffect(()=>{
        async function getCategories(){
            try{
                setIsCategoriesLoading(true)
                setCategoriesLoadingError(false)
                const querySnapshot = await getDocs(collection(db, "categories"))
                let categories = []
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    // console.log(doc.id, " => ", doc.data());
                    categories.push({productId: doc.id, ...doc.data()});
                });
                setIsCategoriesLoading(false)
                setCategoriesLoadingError(false)
                setCategories(categories)

            }catch(err){
                console.log(err)
                setIsCategoriesLoading(false)
                setCategoriesLoadingError("Error Occoured in Loading product, Please reload the Page")
            }
        }
        getCategories()

    }, [])

    return {categories,isCategoriesloading, categoriesLoadingError}
}

export default useCategories;