import { useState, useEffect } from "react";

export default function Code() {
  const [code, setCode] = useState([]);

  useEffect(() => {
    ; (async () => {
      try {
        const res = await fetch(url);         //url will be updated in future;
        const data = await res.json();
        setCode(data);
      } catch (error) {
        console.log(error);
        return;
      }
    })();
  }, [])


  return (
    <div className=' w-full '>
      {/* {code && } */}
    </div>
  )
}
