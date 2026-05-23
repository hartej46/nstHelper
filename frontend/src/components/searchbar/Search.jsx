import {useState,useEffect} from 'react';

function Search() {
    const [input, setInput] = useState('');
    const [value, setValue] = useState('');

    useEffect(() => {
        const valueTimer = setTimeout(() => {
            setValue(input);
        },1000)

        return () => clearInterval(valueTimer);
    },[input]);

    const inputfuction = (e) => {
        setInput(e.target.value);
    }

    
    return (
        <div className=' pt-2 pb-2 pl-2 pr-4 rounded-lg '>
            <input type="text"  onChange={inputfuction} value={input}/>
        </div>
    )
}


export {value, Search};

