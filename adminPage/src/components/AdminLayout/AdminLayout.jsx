import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import SidebarMain from '../SidebarMain/sidebarMain'
import SidebarSection from '../SidebarSection/SidebarSection'
import './AdminLayout.css'

function AdminLayout() {
  const location = useLocation()
  const pathParts = location.pathname.split('/').filter(Boolean)
  const sectionSelected = pathParts.length > 0 ? pathParts[0] : null
  const validSections = ['exam', 'mcq', 'coding-question']
  const hasSection = sectionSelected && validSections.includes(sectionSelected)

  return (
    <div className="admin-layout">
      <SidebarMain />
      {hasSection && <SidebarSection sectionSelected={sectionSelected} />}
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
