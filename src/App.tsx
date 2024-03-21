import { useState, useRef } from 'react'

export default function App() {
  const slideSize = 16
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(50);
  const [minDragged, setMinDragged] = useState(false)
  const [maxDragged, setMaxDragged] = useState(false)
  const container = useRef<HTMLDivElement>(null)

  return <div className='w-screen h-screen relative flex justify-center items-center' style={{ cursor: minDragged ? 'grabbing': 'default' }} onMouseUp={() => {
    setMinDragged(false)
    setMaxDragged(false)
  }} onMouseMove={e => {
    if(!container.current) return
    const { x, width } = container.current.getBoundingClientRect()
    const { clientX } = e //clientX = mouse, x = container start
    if(minDragged) {
      if(x > clientX) {
        setMin(0)
      }
      else if(clientX > (x + width) || min >= max) {
        setMin(max - 1)
      } else {
        const initial = (((clientX - x - (slideSize / 2)) / width) * 100) + 3
        //console.log(initial)
        setMin(initial >= max ? max - 1: initial)
      }
    } else if(maxDragged) {
      //
      if(x + width < clientX) setMax(100)
      else if((((clientX - x - (slideSize / 2)) / width) * 100) + 3 <= min) setMax(min + 1)
      else {
        const initial = (((clientX - x - (slideSize / 2)) / width) * 100) + 3
        setMax(initial <= min ? min - 1: initial)
      }
    }
  }}>
    <div className='w-96 h-64 relative border-2 rounded-xl flex justify-center items-center'>
      <span className='absolute text-xl left-1/2 -translate-x-1/2 top-12 select-none'>Min: {Math.round(min)} Max: {Math.round(max)}</span>
      <div style={{ cursor: minDragged || maxDragged ? 'grabbing': 'grab' }} ref={container} className='w-[80%] h-[2px] bg-slate-500 relative'>
        <div style={{ left: `${min}%`, width: `${slideSize}px`, height: `${slideSize}px` }} onMouseDown={() => setMinDragged(true)} className=' rounded-full absolute bg-black top-1/2 -translate-y-1/2 -translate-x-1/2' />
        <div style={{ left: `${max}%`, width: `${slideSize}px`, height: `${slideSize}px` }} onMouseDown={() => setMaxDragged(true)} className=' rounded-full absolute bg-black top-1/2 -translate-y-1/2 -translate-x-1/2' />
      </div>
    </div>
  </div>
}