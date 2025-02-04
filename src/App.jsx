import React, { useCallback, useEffect, useState,useRef } from 'react'
import AppName from './components/AppName'

const App = () => {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const passwordRef = useRef(null);
  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password])

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "012345678912345678901234567890";
    if (charAllowed) str += "~!@#$%^&*()_+~!@#$%^&*()_+~!@#$%^&*()_+";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
      setPassword(pass);
    }
  }, [length, numberAllowed, charAllowed, setPassword])
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, setPassword])
  return <>
    <AppName />
    <div className='w-full max-w-md mx-auto p-4 shadow-md rounded-lg  my-8 text-black bg-gray-500 '>
      {/* password input field */}
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
          className='outline-none w-full py-1 px-3 bg-white'
          placeholder='Password'
          type="text"
          value={password}
          readOnly
          ref={passwordRef}
        />
        {/* Copy Button */}
        <button
          className='outline-none bg-blue-700 text-white  px-3 py-0.5 shrink-0'
          onClick={copyPasswordToClipBoard}
        >
          Copy
        </button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          {/* Range Field */}
          <input
            type="range"
            min={0}
            max={100}
            value={length}
            onChange={(e) => { setLength(e.target.value) }}
          />
          <label>Length : {length} </label>
        </div>
        <div className='flex items-center gap-x-1'>
          {/* number Checkbox */}
          <input type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed(prev => !prev);
            }}
          />
          <label>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          {/* Character Checkbox */}
          <input type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed(prev => !prev);
            }}
          />
          <label>Characters</label>
        </div>
      </div>
    </div>
  </>

}

export default App