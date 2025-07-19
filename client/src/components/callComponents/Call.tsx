import React from 'react'
import Styles from './Call.module.css'
import Toolbar from './Toolbar'

const Call = () => {
  return (
    <div className={`${Styles.callContainer} app-container_content`}>
      Call
      <Toolbar/>
    </div>
  )
}

export default Call