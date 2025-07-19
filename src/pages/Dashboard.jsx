import React from 'react'
import { ProjectCreate } from "../components/ProjectCreate";
import Projects from "./Projects";

function Dashboard() {
  return (
    <div className="mt-8">
      <div className="mb-6">
        <ProjectCreate />
      </div>
      <Projects />
    </div>
  )
}

export default Dashboard
