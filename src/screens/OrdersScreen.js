import useOrders from "../hooks/useOrders"

function OrdersScreen() {


    const {orders, loading} = useOrders()
    if(loading) return <h1>Loading</h1>
    return<h1>{JSON.stringify(orders)}</h1>
}


export default OrdersScreen