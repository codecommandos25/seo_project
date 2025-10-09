import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { onPageAnalysis } from '../data/schema'

type OnPageAnalysisDialogType = 'add' | 'edit' | 'delete' | 'details'

interface OnPageAnalysisContextType {
  open: OnPageAnalysisDialogType | null
  setOpen: (str: OnPageAnalysisDialogType | null) => void
  currentRow: onPageAnalysis | null
  setCurrentRow: React.Dispatch<React.SetStateAction<onPageAnalysis | null>>
}

const OnPageAnalysisContext =
  React.createContext<OnPageAnalysisContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function OnPageAnalysisProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<OnPageAnalysisDialogType>(null)
  const [currentRow, setCurrentRow] = useState<onPageAnalysis | null>(null)

  return (
    <OnPageAnalysisContext.Provider
      value={{ open, setOpen, currentRow, setCurrentRow }}
    >
      {children}
    </OnPageAnalysisContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useOnPageAnalysis = () => {
  const onPageAnalysisContext = React.useContext(OnPageAnalysisContext)

  if (!onPageAnalysisContext) {
    throw new Error(
      'useOnPageAnalysis has to be used within <OnPageAnalysisProvider>'
    )
  }

  return onPageAnalysisContext
}
