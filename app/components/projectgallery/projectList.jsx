import React from 'react';
import Link from 'next/link';
import Project from './project';

import projects from "../../data/projects.json";

export default function projectList({projects, setModal}) {
  return (
    <div>
      {projects.map((project, index) => (
            // TODO: fix the layout of the projects responsivity
            <Link
              key={project.slug}
              href={{
                pathname: `/projects/${encodeURIComponent(project.slug)}`
              }}
            >
              <Project
                key={project.slug}
                index={index}
                title={project.title}
                desc={project.desc}
                setModal={setModal}
              />
            </Link>
          ))}
    </div>
  )
}
