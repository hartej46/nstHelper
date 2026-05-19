import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {LogIn} from 'lucide-react'

function Header() {

    const authStatus = useSelector(state => state.auth.status)

    if (authStatus) {
        return (
        <section className=' w-full flex justify-between pr-4 pl-4 pt-2 pb-2  border-b border-b-black rounded-lg'>
            <p>Aagaya!!!!! Phele login toh kar le....</p>
            <Link
                to='/Login'
                className=' flex w-6'
            >
                <LogIn />
                Login
            </Link>
        </section>
        )
    }

    return (
        <section className=' w-full flex justify-between pr-4 pl-4 pt-2 pb-2  border-b border-b-black rounded-lg '>
            <select name="semester" id="sem" className=' border-0 rounded-lg border-black p-2 w-full'>
                <option value="NST S1 P-CS+AIML"></option>
                <option value="NST S2 P-CS+AIML"></option>
            </select>
            <p className=' text-xl text-gray-700 '>Welcome to Hartej School of Technolog</p>
            <div className=' w-4 h-4 bg-black rounded-full'></div>
        </section>
    )
    }

    export default Header