import {BrowserRouter,Routes, Route, Link} from 'react-router-dom'

import Navbar from "./components/Navbar"
import { AuthContext } from './context/AuthContext';
import useAuthContext from './hooks/useAuthContext';
import AddCategoryScreen from './screens/AddCategoryScreen';
import AddProductScreen from './screens/AddProductScreen';
import EditProductScreen from './screens/EditProductScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import WelcomeSetupScreen from './screens/HomeSetupScreen';
import EditHomeSetup from './screens/EditHomeSetup';
import OrdersScreen from './screens/OrdersScreen';



const App =()=>{
  const {authDone}= useAuthContext();

  return (
    <div>
      <BrowserRouter>
      {authDone ?
      <>
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomeScreen/>}/>
          <Route path="signup" element={<SignUpScreen/>}/>

          <Route path="login" index element={<LoginScreen/>}/>
          <Route path="AddNewProduct" element={<AddProductScreen/>}/>
          <Route path="Orders" element={<OrdersScreen/>}/>
          <Route path="HomeSetup" element={<WelcomeSetupScreen/>}>
            <Route path=":id" element={<EditHomeSetup/>} />
          </Route>
          <Route path="EditProduct" element={<EditProductScreen/>}>
            <Route path=":productId" element={<EditProductScreen/>}/>
          </Route>
        </Routes>
        </>
        :  
        <Routes>
          <Route path="" index element={<LoginScreen/>}/>
        </Routes>
      }
      </BrowserRouter>
    </div>
  )
}

export default App;