import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, FileText, Code, ClipboardList } from 'lucide-react'
import './SidebarMain.css'

const sectionIcons = {
  Exam: ClipboardList,
  MCQ: FileText,
  'Coding-question': Code,
}

function SidebarMain() {
  const availableSection = ['Exam', 'MCQ', 'Coding-question']
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <nav className="sidebar-main">
      <Link
        className={`sidebar-home-link ${isHome ? 'active' : ''}`}
        to="/"
      >
        <span className="icon-wrapper">
          <Home size={16} />
        </span>
        Home
      </Link>

      <div className="sidebar-section-label">Sections</div>

      <div className="sidebar-sections">
        {availableSection.map((section) => {
          const IconComp = sectionIcons[section] || FileText
          const sectionPath = `/${section.toLowerCase()}`
          const isActive = location.pathname.startsWith(sectionPath)

          return (
            <Link
              key={section}
              className={`sidebar-section-link ${isActive ? 'active' : ''}`}
              to={`${sectionPath}/add`}
            >
              <span className="section-icon">
                <IconComp size={16} />
              </span>
              {section}
            </Link>
          )
        })}
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-footer-info">NST Helper v1.0</div>
      </div>
    </nav>
  )
}

export default SidebarMain