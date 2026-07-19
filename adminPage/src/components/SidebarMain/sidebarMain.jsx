import React from 'react'
import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

function sidebarMain() {
    const availableSection = ["Exam", "MCQ", "Coding question"]
    
    return (
        <div>
            <div className='Home' to = {'/'}>
                <Home size={18} />
                Home
            </div>

            <div className='availableSections'>
                {availableSection.map((section, key) => {
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

export default sidebarMain