import React, { useEffect, useRef, useState } from 'react'
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

interface iconState{
    camera:boolean,
    mic:boolean,
    hand:boolean,
}

const Toolbar:React.FC<ToolbarProps> = ({containerRef}) => {
  const [isVertical,setIsVertical] = useState<boolean>(false);
  const [windowSize,setWindowSize] = useState<number>(window.innerWidth)
   const boxRef = useRef<HTMLDivElement>(null);
  const isClicked = useRef(false);
  const [iconState,setIconState] = useState<any>({
    camera:true,
    mic:true,
    hand:false
  }) 

const handleIconState = (id: keyof iconState) => {
  setIconState((prev: iconState) => ({
    ...prev,
    [id]: !prev[id]
  }));
};

  const coords = useRef({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });

  //drag feat

  useEffect(() => {
    if (!boxRef.current || !containerRef.current) return;

    const box = boxRef.current;
    const container = containerRef.current;
    const dragHandle = box.querySelector(".dragHandle") as HTMLDivElement

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const boxWidth = box.offsetWidth;
    const boxHeight = box.offsetHeight;

    let initialX = (containerWidth / 2) - (boxWidth / 2);
    let initialY = containerHeight - boxHeight - 4;

    if(isVertical){
        initialX = 2
        initialY = (containerHeight/2) -(boxHeight/2) -4
    }

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

    // box.addEventListener('mousedown', onMouseDown);
    dragHandle?.addEventListener('mousedown', onMouseDown);
    box.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseUp);

    return () => {
    //   box.removeEventListener('mousedown', onMouseDown);
      dragHandle?.removeEventListener('mousedown', onMouseDown);
      box.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseUp);
    };
  }, [containerRef,isVertical,windowSize]);

  useEffect(() => {
  const handleResize = () => setWindowSize(window.innerWidth);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
  
  const handleRotateToolbar = () => {
    setIsVertical(!isVertical)
  }
//   Style.toolbarContainer_vertical
  return (
    <section className={isVertical? Style.toolbarContainer_vertical:Style.toolbarContainer} ref={boxRef}>
        <div className={`${Style.toolbarContainer_dragHandle} dragHandle`}>
        {/* <div className={Style.toolbarContainer_dragHandle}> */}
            <RxDragHandleDots2/>
        </div>
        <div className={Style.toolbarContainer_btn} onClick={handleRotateToolbar}>
            <MdCropRotate size={24} />
            <p>rotate</p>
        </div>
        <div className={Style.toolbarContainer_btn} onClick={() => handleIconState("camera")}>
            {!iconState.camera?  <BsCameraVideoOff size={24}/> : <BsCameraVideo size={24}/>}
            <p>camera</p>
        </div>
        <div className={Style.toolbarContainer_btn} onClick={() => handleIconState("mic")}>
            {!iconState.mic? <IoIosMicOff size={24}/> : <IoIosMic size={24}/>}
            <p>mic</p>
        </div>
        <div className={Style.toolbarContainer_btn}>
            <IoChatboxOutline size={24}/>
            <p>chat</p>
        </div>
        <div className={Style.toolbarContainer_btn} onClick={() => handleIconState("hand")}>
            <FaHandPaper size={24} color={iconState.hand && "yellow"}/>
            <p>raise hand</p>
        </div>
        <div className={Style.toolbarContainer_btn}>
            <SlPeople size={24}/>
            <p>people</p>
        </div>
        <div className={`${Style.toolbarContainer_btn} ${Style.toolbarContainer_btn_endcall}`}>
            <MdCallEnd size={24}/>
            <p>end call</p>
        </div>
        

    </section>
  )
}

export default Toolbar