import React from 'react'
import { Link } from 'react-router-dom'


function SidebarSection(sectionSelected) {
    const options = {
        "MCQ" : ["Add","Delete", "Update"],
        "Exam": ["Add","Delete", "Update"],
        "Coding": ["Add","Delete"]
    }

    const optionsFeatures = options[sectionSelected]
    return (
        <div>
            <div className='Back' to = {'/'}>
                <p> &lt Back </p>
            </div>

            <div className='availableSections'>
                {optionsFeatures.map((section, key) => {
                    return (
                        <Link
                            className='sections'
                            to = {`/${section}`}
                        >
                            {section}
                        </Link>
                    )
                })}
            </div>
            
        </div>
    )
}

export default SidebarSection