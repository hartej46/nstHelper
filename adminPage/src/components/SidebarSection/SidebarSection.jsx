import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, Plus, Trash2, Pencil } from 'lucide-react'
import './SidebarSection.css'

const featureIcons = {
  Add: Plus,
  Delete: Trash2,
  Update: Pencil,
}

const sectionOptions = {
  mcq: ['Add', 'Delete', 'Update'],
  exam: ['Add', 'Delete', 'Update'],
  'coding-question': ['Add', 'Delete'],
}

function SidebarSection({ sectionSelected }) {
  const location = useLocation()

  if (!sectionSelected) return null

  const options = sectionOptions[sectionSelected] || []
  const sectionLabel = sectionSelected
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  return (
    <aside className="sidebar-section">
      <Link className="sidebar-back-link" to="/">
        <ArrowLeft size={14} />
        Back
      </Link>

      <div className="sidebar-section-title">{sectionLabel}</div>

      <div className="sidebar-feature-label">Actions</div>

      <div className="sidebar-features">
        {options.map((feature) => {
          const featurePath = `/${sectionSelected}/${feature.toLowerCase()}`
          const isActive = location.pathname === featurePath

          return (
            <Link
              key={feature}
              className={`sidebar-feature-link ${isActive ? 'active' : ''}`}
              to={featurePath}
            >
              <span className="feature-dot" />
              {feature}
            </Link>
          )
        })}
      </div>
    </aside>
  )
}

export default SidebarSection