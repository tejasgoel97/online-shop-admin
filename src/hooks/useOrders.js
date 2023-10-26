import { collection, getDocs, doc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";


const useOrders = () => {

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);

    useEffect(()=>{
        getOrders()
    }, [])

    async function getOrders(){
        try {
            setLoading(true);
            setError(null)

            const querySnapshot = await getDocs(collection(db, "orders"))
            let orders = []
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                orders.push({productId: doc.id, ...doc.data()});
            });
            setOrders(orders)
            setLoading(false)


        } catch (error) {
            setError(error)
            setLoading(false)
            console.log(error)
        }
    }

    function DispatchOrder(){

    }


    return {orders, loading, error, DispatchOrder}
}


export default useOrders