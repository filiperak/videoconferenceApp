import React, { useEffect, useRef } from 'react'
import Style from './Toolbar.module.css'
import { RxDragHandleDots2 } from "react-icons/rx";
import { MdCropRotate } from "react-icons/md";
import { MdCallEnd } from "react-icons/md";
import { IoIosMic } from "react-icons/io";
import { IoIosMicOff } from "react-icons/io";
import { BsCameraVideo } from "react-icons/bs";
import { BsCameraVideoOff } from "react-icons/bs";
import { IoChatboxOutline } from "react-icons/io5";
import { FaHandPaper } from "react-icons/fa";
import { SlPeople } from "react-icons/sl";


interface ToolbarProps{
    containerRef: React.RefObject<HTMLDivElement | null>;
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

  //drag feat+
  useEffect(() => {
    if (!boxRef.current || !containerRef.current) return;

    const box = boxRef.current;
    const container = containerRef.current;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const boxWidth = box.offsetWidth;
    const boxHeight = box.offsetHeight;

    const initialX = (containerWidth / 2) - (boxWidth / 2);
    const initialY = containerHeight - boxHeight - 4;

    box.style.left = `${initialX}px`;
    box.style.top = `${initialY}px`;

    coords.current.lastX = initialX;
    coords.current.lastY = initialY;

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
  
  const handleRotateToolbar = () => {
    
  }
  return (
    <section className={Style.toolbarContainer} ref={boxRef}>
        <div className={Style.toolbarContainer_dragHandle}>
            <RxDragHandleDots2/>
        </div>
        <div className={Style.toolbarContainer_btn}>
            <MdCropRotate size={24} onClick={handleRotateToolbar}/>
            <p>rotate</p>
        </div>
        <div className={Style.toolbarContainer_btn}>
            <BsCameraVideo size={24}/>
            <p>camera</p>
        </div>
        <div className={Style.toolbarContainer_btn}>
            <IoIosMicOff size={24}/>
            <p>mic</p>
        </div>
        <div className={Style.toolbarContainer_btn}>
            <IoChatboxOutline size={24}/>
            <p>chat</p>
        </div>
        <div className={Style.toolbarContainer_btn}>
            <FaHandPaper size={24}/>
            <p>raise hand</p>
        </div>
        <div className={Style.toolbarContainer_btn}>
            <SlPeople size={24}/>
            <p>participants</p>
        </div>
        <div className={`${Style.toolbarContainer_btn} ${Style.toolbarContainer_btn_endcall}`}>
            <MdCallEnd size={24}/>
            <p>end call</p>
        </div>
        

    </section>
  )
}

export default Toolbar