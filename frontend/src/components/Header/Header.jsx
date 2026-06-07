import { useSelector, useDispatch } from 'react-redux';
import { LogOut, Code2, Bell } from 'lucide-react';
import { logout } from '../../store/authSlice';
import { logOut } from '../../service/service';

function Header() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);

  const handleLogout = async() => {
    dispatch(logout());
    await logOut();
  }

  return (
    <header className="w-full bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
      <div className="flex items-center space-x-3">
        <div className="bg-slate-900 p-2 rounded-xl text-white shadow-sm">
          <Code2 className="w-5 h-5" />
        </div>
        <span className="text-lg font-bold tracking-tight text-slate-800">
          Hartej School of Technology
        </span>
      </div>

      <div className="flex items-center space-x-6">
        <button className="text-gray-400 hover:text-gray-600 transition-colors relative cursor-pointer">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-sky-500 rounded-full"></span>
        </button>

        <div className="flex items-center space-x-4 border-l border-gray-100 pl-6">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">
              {userData?.data?.username || "Developer"}
            </p>
            <p className="text-xs text-slate-400 font-medium">
              {userData?.data?.email}
            </p>
          </div>
          
          <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white font-bold text-sm shadow-md">
            {userData?.data?.username?.charAt(0).toUpperCase() || "H"}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 font-semibold rounded-lg transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden md:inline">Log Out</span>
        </button>
      </div>
    </header>
  );
}

export default Header;