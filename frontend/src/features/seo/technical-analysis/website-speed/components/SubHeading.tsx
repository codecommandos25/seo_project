import React from 'react'

function SubHeading({children, className}: {children: React.ReactNode, className?: string}) {
  return (
    <h2 className={`text-xl font-semibold text-gray1 ${className}`}>
      {children}
    </h2>
  )
}

export default SubHeading