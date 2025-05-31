import React from 'react'
import SubHeading from './SubHeading'

function Subsection({ children, sectionName, className }: { children: React.ReactNode, className?: string, sectionName?: string }) {
  return (
    <div className={`bg-white p-4 rounded-lg  ${className}`}>
      <SubHeading className="text-2xl">{sectionName}</SubHeading>
      {children}
    </div>
  )
}

export default Subsection;