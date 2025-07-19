import React, { useRef } from 'react'
import Styles from './Call.module.css'
import Toolbar from './Toolbar'

const Call = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  return (
    <div ref={containerRef} className={`${Styles.callContainer} app-container_content`}>
      Call
      <Toolbar containerRef={containerRef}/>
    </div>
  )
}

export default Call