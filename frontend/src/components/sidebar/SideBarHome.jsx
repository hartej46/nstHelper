import React, { useState, useEffect } from 'react';
import { getListOfSubject } from '../../service/service';  
import {Link }from 'react-router-dom'

function SideBarHome() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await getListOfSubject();
        console.log(data)
        
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

  if (loading) return <div className=" flex flex-wrap flex-col items-center justify-center h-screen p-4 text-sm text-gray-400 animate-pulse">Loading subjects...</div>;
  if (error) return <div className="p-4 text-sm text-red-500 font-medium">{error}</div>;

  return (
    <nav className=" flex flex-wrap flex-col items-center justify-center h-screen gap-5 ml-4 p-4">
      <div className="p-2 border bg-black hover:bg-gray-900 text-white rounded cursor-pointer">
          <Link to = {`/`}>
              Home
          </Link>
        </div>
      {subjects.map((sub, key) => (
        <div key={key} className="p-2 border bg-black hover:bg-gray-900 text-white rounded cursor-pointer">
          <Link to = {`/question?subject=${sub}`}>
            {sub.toUpperCase()}
          </Link>
        </div>
      ))}
    </nav>
  );
}

export default SideBarHome;