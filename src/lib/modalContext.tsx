import { createContext, useContext, useState, ReactNode } from 'react'

const ModalCtx = createContext<{ openModal: () => void }>({ openModal: () => {} })

export const useModal = () => useContext(ModalCtx)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <ModalCtx.Provider value={{ openModal: () => setOpen(true) }}>
      {children}
    </ModalCtx.Provider>
  )
}

export { ModalCtx }
