import React from 'react'
import { LayoutDashboard, FileText, Code, ClipboardList } from 'lucide-react'
import { Link } from 'react-router-dom'
import './HomePage.css'

function HomePage() {
  const sections = [
    { name: 'Exam', icon: ClipboardList, description: 'Manage exams', path: '/exam/add', color: '#2563eb' },
    { name: 'MCQ', icon: FileText, description: 'Multiple choice questions', path: '/mcq/add', color: '#2563eb' },
    { name: 'Coding Questions', icon: Code, description: 'Programming challenges', path: '/coding-question/add', color: '#2563eb' },
  ]

  return (
    <div className="home-page">
      <div className="home-header">
        <LayoutDashboard size={24} />
        <h1>Dashboard</h1>
      </div>

      <div className="home-cards">
        {sections.map((section) => {
          const IconComp = section.icon
          return (
            <Link key={section.name} className="home-card" to={section.path}>
              <div className="home-card-icon">
                <IconComp size={20} />
              </div>
              <h3>{section.name}</h3>
              <p>{section.description}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default HomePage
