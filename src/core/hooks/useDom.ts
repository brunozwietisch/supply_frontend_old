/* eslint-disable import/prefer-default-export */
import { useState, useEffect } from 'react'

type WindowSizeType = {
  width: number
  height: number
}

type WindowSizeLabelType = 'lg' | 'md' | 'sm' | 'xs'

interface useWindowProps {
  screenSize: WindowSizeLabelType
  privateContentWidth: number | null | undefined
  addRootClassNames: (classNames: string[]) => void
  removeRootClassNames: (classNames: string[]) => void
}

export const useDom = (): useWindowProps => {
  const privateLayoutWidth =
    document?.getElementById('private-layout')?.offsetWidth

  const [windowSize, setWindowSize] = useState<WindowSizeType>({
    width: window.innerWidth,
    height: window.innerHeight
  })

  // Update widown size
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const calculateWindowSize = (windowWidth: number): WindowSizeLabelType => {
    if (windowWidth >= 1200) {
      return 'lg'
    }
    if (windowWidth >= 992) {
      return 'md'
    }
    if (windowWidth >= 768) {
      return 'sm'
    }
    return 'xs'
  }

  const rootElementId = 'body'

  const addRootClassNames = (classNames: string[]): void => {
    classNames.forEach(className => {
      document.getElementById(rootElementId)!.classList.add(className)
    })
  }

  const removeRootClassNames = (classNames: string[]): void => {
    classNames.forEach(className => {
      document.getElementById(rootElementId)!.classList.remove(className)
    })
  }

  return {
    screenSize: calculateWindowSize(windowSize.width),
    privateContentWidth: privateLayoutWidth,
    addRootClassNames,
    removeRootClassNames
  }
}
