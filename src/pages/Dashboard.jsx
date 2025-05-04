import React from 'react'
import { ProjectCreate } from "../components/ProjectCreate";
import Projects from "./Projects";

function Dashboard() {
  return (
    <div className="mt-8">
      <h1 className='text-2xl font-bold text-center text-gray-900 dark:text-white'>Dashboard</h1>
      <div className="mb-6">
        <ProjectCreate />
      </div>
      <Projects />
    </div>
  )
}

export default Dashboard
