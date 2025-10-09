import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Backlink } from '../data/schema'

type BacklinkDialogType = 'add' | 'edit' | 'delete'

interface BacklinkContextType {
  open: BacklinkDialogType | null
  setOpen: (str: BacklinkDialogType | null) => void
  currentRow: Backlink | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Backlink | null>>
}

const BacklinkContext = React.createContext<BacklinkContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function BacklinkProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<BacklinkDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Backlink | null>(null)

  return (
    <BacklinkContext.Provider
      value={{ open, setOpen, currentRow, setCurrentRow }}
    >
      {children}
    </BacklinkContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useBacklink = () => {
  const backlinkContext = React.useContext(BacklinkContext)

  if (!backlinkContext) {
    throw new Error('useBacklink has to be used within <BacklinkProvider>')
  }

  return backlinkContext
}
