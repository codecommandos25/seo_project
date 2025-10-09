import React from 'react'

function SubHeading({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h2 className={`text-gray1 text-xl font-semibold ${className}`}>
      {children}
    </h2>
  )
}

export default SubHeading
