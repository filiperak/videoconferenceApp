import React, { useEffect, useRef } from 'react'
import Style from './Toolbar.module.css'
import { RxDragHandleDots2 } from "react-icons/rx";

interface ToolbarProps{
    containerRef: React.RefObject<HTMLDivElement>;
}

const Toolbar:React.FC<ToolbarProps> = ({containerRef}) => {

   const boxRef = useRef<HTMLDivElement>(null);
  const isClicked = useRef(false);
  const coords = useRef({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    if (!boxRef.current || !containerRef.current) return;

    const box = boxRef.current;
    const container = containerRef.current;

    const onMouseDown = (e: MouseEvent) => {
      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
    };

    const onMouseUp = () => {
      isClicked.current = false;
      coords.current.lastX = box.offsetLeft;
      coords.current.lastY = box.offsetTop;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) return;
      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;
      box.style.left = `${nextX}px`;
      box.style.top = `${nextY}px`;
    };

    box.addEventListener('mousedown', onMouseDown);
    box.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseUp);

    return () => {
      box.removeEventListener('mousedown', onMouseDown);
      box.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseUp);
    };
  }, [containerRef]);
  
  return (
    <section className={Style.toolbarContainer} ref={boxRef}>
        <div className={Style.toolbarContainer_dragHandle}>
            <RxDragHandleDots2/>
        </div>
    </section>
  )
}

export default Toolbar