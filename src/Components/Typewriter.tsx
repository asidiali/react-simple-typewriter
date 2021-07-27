import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Cursor } from './Cursor'

import { TypewriterProps } from '../Hooks/useTypewriter'

export interface ComponentProps extends TypewriterProps {
  cursor?: boolean
  cursorStyle?: string
  countRef: React.MutableRefObject<number>
}

export const Typewriter = ({
  words = ['Hello', 'World', 'This', 'is', 'Typewriter'],
  loop = 1,
  cursor = false,
  cursorStyle = '.',
  typeSpeed = 100,
  delaySpeed = 1500,
  deleteSpeed = 50,
  onLoopDone,
  onType,
  countRef: ref
}: ComponentProps): JSX.Element => {
  // Stats
  const [speed, setSpeed] = useState(typeSpeed)
  const [text, setText] = useState('')
  // Refs
  const countRef = useRef(0)
  let count: React.MutableRefObject<number>
  // use ref passed from parent or use the ref created inside the component
  if (ref) count = ref;
  else count = countRef

  const loops = useRef(0)
  const isDelete = useRef(false)
  const isDone = useRef(false)

  const handleTyping = useCallback(() => {
    setSpeed(typeSpeed)

    const index = count.current % words.length
    const word = words[index]

    if (isDelete.current) {
      setText((prev) => word.substring(0, prev.length - 1))

      if (text === '') {
        isDelete.current = false
        setSpeed(deleteSpeed)
        count.current += 1
      }
    } else {
      setText((prev) => word.substring(0, prev.length + 1))

      if (text === word) {
        loops.current += 1
        isDelete.current = true
        setSpeed(delaySpeed)

        if (loops.current / words.length === loop) {
          isDone.current = true
          loop > 0 && onLoopDone && onLoopDone()
        }
      }
    }
  }, [delaySpeed, deleteSpeed, loop, text, typeSpeed, words, onLoopDone, count])

  useEffect(() => {
    const typing = setTimeout(() => {
      handleTyping();
    }, speed)

    if (isDone.current) clearTimeout(typing)

    return () => clearTimeout(typing)
  }, [handleTyping, speed])

  useEffect(() => {
    if (onType) onType();
  }, [count.current]);

  return (
    <>
      <span>{text}</span>
      {cursor && <Cursor cursorStyle={cursorStyle} />}
    </>
  )
}
