const InputformComp = ({ label, setText, text, type = "text" }) => {

  const handleChangetext = function (e) {
    let value = e.target.value;
    setText(value)
  }

  // return (
  //   <form className ="flex flex-wrap gap-3 w-full p-5">
  //   <label className ="relative w-full flex flex-col">
  //     <span className ="font-bold mb-3">Card number</span>
  //     <input className ="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300" type="text" name="card_number" placeholder="0000 0000 0000" />
  //     <svg xmlns="http://www.w3.org/2000/svg" className ="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  //       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  //     </svg>
  //   </label>

  //   <label className ="relative flex-1 flex flex-col">
  //     <span className ="font-bold mb-3">Expire date</span>
  //     <input className ="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300" type="text" name="expire_date" placeholder="MM/YY" />
  //     <svg xmlns="http://www.w3.org/2000/svg" className ="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  //       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  //     </svg>
  //   </label>

  //   <label className ="relative flex-1 flex flex-col">
  //     <span className ="font-bold flex items-center gap-3 mb-3">
  //       CVC/CVV
  //       <span className ="relative group">
  //         <span className ="hidden group-hover:flex justify-center items-center px-2 py-1 text-xs absolute -right-2 transform translate-x-full -translate-y-1/2 w-max top-1/2 bg-black text-white"> Hey ceci est une infobulle !</span>
  //         <svg xmlns="http://www.w3.org/2000/svg" className ="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  //           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  //         </svg>
  //       </span>
  //     </span>
  //     <input className ="rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300" type="text" name="card_cvc" placeholder="&bull;&bull;&bull;" />
  //     <svg xmlns="http://www.w3.org/2000/svg" className ="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  //       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  //     </svg>
  //   </label>
  // </form>
  // )
  return (<div>
    {/* // <div className="flex flex-wrap gap-3 w-full p-2"> */}
    {/* <label className="">
        {label && <span className ="font-bold mb-3">{label}</span>}
        <input 
        className ="bg-gray-200 text-gray-700 border border-gray-200 rounded ml-3 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
        type={type}
        onChange={handleChangetext}
        value={text}
         />

      </label> */}
    <form className="w-full max-w-sm">
      <div className="md:flex md:items-center mb-6">
        <div className="">
          <label className="block text-gray-500 font-bold md:text-right mb-1 ml-5 md:mb-0 pr-4" for="inline-full-name">
            {label}
          </label>
        </div>
        <div>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  focus:bg-white focus:border-green-500"
            type={type}
            onChange={handleChangetext}
            value={text} />
        </div>
      </div>
    </form>
  </div>)
}



export default InputformComp;