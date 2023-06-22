import { useState } from "react"
import ChipComp from "./ChipComp"
import InputformComp from "./InputFormComp"

const DeliveryCodesComp = ({deliveryCodes, setDeliveryCodes}) =>{
    const [code, setCode] = useState("")
    const handleKeyDown = (e) =>{
        setCode(e.target.value)
        if(e.key ==="Enter"){
            setCode("")
            setDeliveryCodes([...deliveryCodes, code])
        }
    }
    function handleCodeRemove(index){
        const array = [...deliveryCodes];
        if (index > -1) {
            array.splice(index,1)
            setDeliveryCodes(array); // 2nd parameter means remove one item only
          }
          
    }

    return <>
    <div >
        <div className="flex flex-wrap gap-3 w-full p-2">
        <label className="w-full flex flex-col">
            <span className ="font-bold mb-3">Delievery Pin Codes</span>
            <input 
                className ="rounded peer pl-2 pr-2 py-1 border-2  border-gray-200 placeholder-gray-300" 
                type="number"
                onKeyDown={handleKeyDown}
                onChange={e=> setCode(e.target.value)}
                value={code}
            />

        </label>
        </div>
        <div className='flex flex-wrap'>
            {deliveryCodes.map((code, index)=>{
                console.log(code)
                return <ChipComp onClick={()=> handleCodeRemove(index)} key={index} text={code}/>
            })}
        </div>
    </div>
    </>
}

export default DeliveryCodesComp