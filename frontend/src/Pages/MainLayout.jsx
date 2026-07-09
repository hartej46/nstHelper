import { Outlet } from 'react-router-dom';
import { Header, SideBarHome, Footer } from '../components/index';

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-50">
      <Header />

      <div className="flex flex-1 min-h-0 w-full">
        <SideBarHome />

        <div className="flex-1 flex flex-col min-w-0">
          <main className="flex-1 p-6 overflow-y-auto">
            <Outlet />
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;