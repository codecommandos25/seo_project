import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Keyword } from '../data/schema'

type KeywordDialogType = 'add' | 'edit' | 'delete'

interface KeywordContextType {
  open: KeywordDialogType | null
  setOpen: (str: KeywordDialogType | null) => void
  currentRow: Keyword | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Keyword | null>>
}

const KeywordContext = React.createContext<KeywordContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function KeywordsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<KeywordDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Keyword | null>(null)

  return (
    <KeywordContext.Provider value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </KeywordContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useKeyword = () => {
  const keywordContext = React.useContext(KeywordContext)

  if (!keywordContext) {
    throw new Error('useKeyword has to be used within <KeywordProvider>')
  }

  return keywordContext
}
