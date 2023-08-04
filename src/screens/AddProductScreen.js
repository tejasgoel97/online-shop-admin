import { collection, doc, getDoc, getDocs } from '@firebase/firestore';
import {useState, useEffect} from 'react'
import AddProductForm from "../components/AddProduct/AddProductForm1";
import { db } from '../firebase/config';
import AddProductForm1 from '../components/AddProductForm1';
import useMetaData from '../hooks/useMetaData';


export default function AddProduct() {
    // const [allCat, setAllCat] = useState([]);
    const {metaData} = useMetaData()
    
    // useEffect(()=>{
    //     const catRef = collection(db, "categories")
    //     getDocs(catRef).then(snapshot=> {
    //         let Categories = []
    //         snapshot.forEach(doc=>{
    //             Categories.push(doc.data())
    //             console.log(doc.id, " => ", doc.data());
    //         })
    //         setAllCat(Categories)
    //     })
    // }, [])
    const allCat = metaData.categories
    const brands = metaData.brands

    return<div className="md:justify-center md:flex p-2 mt-2 w-full">
        {/* <AddProductForm1 allCat={allCat}/> */}
        <AddProductForm allCat={allCat} brands ={brands}/>
    </div>
}