import React from 'react';
import { Link } from 'react-router-dom';
import {Logo} from '../index'

function Footer() {
  return (
    <section className=' relative flex justify-between overflow-hidden border-t-2 border-t-black '>
        <div className=' ml-3 mr-2 mt-4 mb-2.5 '>
             <Link to="/" target="_blank" rel="noopener noreferrer">
                <Logo />
             </Link>
             <p className=' text-gray-700'> 
                Copyright © 2026 Parady <br/> Technologies Pvt. Ltd. All rights reserved.
             </p>
        </div>
        <div className=' ml-3 mr-2 mt-4 mb-2.5 '>
            <h4 className=' border-b-2 border-b-gray-500 pb-0.5 '>
                Legal
            </h4>
            <ul className='mt-3 decoration-0 list-none'>
              <li className="mb-4">
                <Link
                  className=" text-base font-medium text-gray-900 hover:text-gray-700"
                  to='https://www.github.com/hartej46'
                >
                  Github
                </Link>
              </li>

              <li className="mb-4">
                <Link
                  className=" text-base font-medium text-gray-900 hover:text-gray-700"
                  to='https://www.codeforces.com/profile/hartej46'
                >
                  CodeForces
                </Link>
              </li>

              <li className="mb-4">
                <Link
                  className=" text-base font-medium text-gray-900 hover:text-gray-700"
                  to='https://www.linkedin.com/hartej46'
                >
                  Linkedin 
                </Link>
              </li>
            </ul>
 
        </div>
    </section>
  )
}

export default Footer