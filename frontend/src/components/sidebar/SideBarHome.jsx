import { useState } from "react"

function SideBarHome() {
    const [value, setValue] = useState([])

    const handleAction = () => {
        /* this will contain all the subject section and inside each subjects value */
    }
    return (
        <div className=' w-85 '>
            {value && (
                value.map((item, key) => (
                    <li value={item} key={key} onClick={handleAction}>{item}</li>
                ))
            )}
            //this will conatain subject
        </div>
    )
}

export default SideBarHome