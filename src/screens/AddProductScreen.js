import { collection, doc, getDoc, getDocs } from '@firebase/firestore';
import {useState, useEffect} from 'react'
import AddProductForm from "../components/AddProductForm";
import { db } from '../firebase/config';
import AddProductForm1 from '../components/AddProductForm1';


export default function AddProduct() {
    const [allCat, setAllCat] = useState([]);
    
    useEffect(()=>{
        const catRef = collection(db, "categories")
        getDocs(catRef).then(snapshot=> {
            let Categories = []
            snapshot.forEach(doc=>{
                Categories.push(doc.data())
                console.log(doc.id, " => ", doc.data());
            })
            setAllCat(Categories)
        })
    }, [])

    return<div className="md:justify-center md:flex p-2 mt-2 w-full">
        {/* <AddProductForm1 allCat={allCat}/> */}
        <AddProductForm allCat={allCat}/>
    </div>
}