import React from 'react'
import Style from './Toolbar.module.css'
import { RxDragHandleDots2 } from "react-icons/rx";

const Toolbar = () => {
  return (
    <section className={Style.toolbarContainer}>
        <div className={Style.toolbarContainer_dragHandle}>
            <RxDragHandleDots2/>
        </div>
    </section>
  )
}

export default Toolbar