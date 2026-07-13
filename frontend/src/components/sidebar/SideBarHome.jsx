import React, { useState, useEffect } from 'react';
import { getListOfSubject } from '../../service/service';  
import { Link, useSearchParams, useLocation } from 'react-router-dom'
import { Home } from 'lucide-react'

function SideBarHome() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const activeSubject = searchParams.get('subject');

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await getListOfSubject();
        
        if (isMounted) {
          setSubjects(data?.data || data || []);
        }
      } catch (err) {
        console.error("Failed to load subjects:", err);
        if (isMounted) {
          setError(err?.message || "Something went wrong during loading subject");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const isHome = location.pathname === '/' && !activeSubject;

  if (loading) {
    return (
      <aside className="w-52 shrink-0 bg-white border-r border-gray-200 h-full overflow-y-auto">
        <div className="p-4">
          <div className="h-10 bg-gray-100 rounded-lg animate-pulse mb-6"></div>
          <div className="h-4 w-16 bg-gray-100 rounded animate-pulse mb-3"></div>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-50 border-b border-gray-200 animate-pulse" style={{ animationDelay: `${i * 80}ms` }}></div>
            ))}
          </div>
        </div>
      </aside>
    );
  }

  if (error) {
    return (
      <aside className="w-52 shrink-0 bg-white border-r border-gray-200 h-full overflow-y-auto">
        <div className="p-4">
          <p className="text-xs text-red-500 font-medium bg-red-50 border border-red-200 rounded-lg p-3">{error}</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-52 shrink-0 bg-white border-r border-gray-200 h-full overflow-y-auto flex flex-col">
      <div className="px-3 pt-4 pb-2">
        <Link
          to="/"
          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200
            ${isHome
              ? 'bg-blue-500 text-white'
              : 'text-gray-700 hover:bg-gray-100'
            }`}
        >
          <Home size={18} />
          Home
        </Link>
      </div>

      <div className="px-6 pt-4 pb-2">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Subjects</h2>
      </div>

      <nav className="flex-1 px-3">
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {subjects.map((sub, key) => {
            const isActive = activeSubject === sub;
            return (
              <Link
                key={key}
                to={`/question?subject=${sub}`}
                className={`block px-4 py-2.5 text-sm font-medium transition-all duration-150
                  ${key < subjects.length - 1 ? 'border-b border-gray-200' : ''}
                  ${isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'bg-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
              >
                {sub.charAt(0).toUpperCase() + sub.slice(1)}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-4 mt-auto">
        <p className="text-[10px] text-gray-300 text-center font-medium tracking-wide">
          NST HELPER v1.0
        </p>
      </div>
    </aside>
  );
}

export default SideBarHome;