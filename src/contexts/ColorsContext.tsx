import React, { ReactNode, createContext, useState } from 'react'

const ColorsContext = createContext({})

const ColorsProvider = ({ children }: { children: ReactNode }) => {

  const [color, setColor] = useState<string>('')

  const atualColor = (color: string) => {
    return color
  } 

  return <ColorsContext.Provider value={{}}>{children}</ColorsContext.Provider>
}

export { ColorsContext, ColorsProvider }
