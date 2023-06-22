import { data } from "autoprefixer";
import useHomeSetup from "../hooks/useHomeSetup";
import HomeSetup from "../components/HomeSetup/Index"

const HomeSetupScreen = () =>{

    const {loading, error, homeSetupData} = useHomeSetup();
    if(loading){
        return <h1>Loading</h1>
    }
    if(error){
        return <h1>{error}</h1>
    }
    return <HomeSetup homeSetupData={homeSetupData} />
}

export default HomeSetupScreen;
