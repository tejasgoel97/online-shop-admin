import { useState } from "react"
import Category from "../components/Category/Index"

const CategoryScreen = () =>{
    const [category , setCategory] = useState()
    return <div>
        <Category/>
    </div>
}

export default CategoryScreen