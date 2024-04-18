import React from 'react'

function Container({ children, className =''}) {
  return (
      <div className={`w-full max-w-7xl p-4 mx-auto ${className}`}>{children}</div>
  )
}

export default Container