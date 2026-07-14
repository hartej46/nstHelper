import { useState, useEffect } from 'react';
function Search({ onDebounce }) {
    const [input, setInput] = useState('');

    useEffect(() => {
        const valueTimer = setTimeout(() => {
            if (onDebounce) {
                onDebounce(input);
            }
        }, 1000);
        return () => clearTimeout(valueTimer);
    }, [input, onDebounce]);

    const inputFunction = (e) => {
        setInput(e.target.value);
    };

    return (
        <div className='pt-2 pb-2 pl-2 pr-4 rounded-lg'>
            <input 
                type="text"  
                onChange={inputFunction} 
                value={input}
                className="border p-1 rounded"
                placeholder='Question'
            />
        </div>
    );
}

export default Search;