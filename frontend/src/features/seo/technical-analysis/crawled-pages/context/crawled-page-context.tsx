import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { CrawledPage } from '../data/schema'

type CrawledPageDialogType = 'add' | 'edit' | 'delete' | 'details'

interface CrawledPageContextType {
  open: CrawledPageDialogType | null
  setOpen: (str: CrawledPageDialogType | null) => void
  currentRow: CrawledPage | null
  setCurrentRow: React.Dispatch<React.SetStateAction<CrawledPage | null>>
}

const CrawledPageContext = React.createContext<CrawledPageContextType | null>(
  null
)

interface Props {
  children: React.ReactNode
}

export default function CrawledPageProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<CrawledPageDialogType>(null)
  const [currentRow, setCurrentRow] = useState<CrawledPage | null>(null)

  return (
    <CrawledPageContext.Provider
      value={{ open, setOpen, currentRow, setCurrentRow }}
    >
      {children}
    </CrawledPageContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCrawledPage = () => {
  const crawledPageContext = React.useContext(CrawledPageContext)

  if (!crawledPageContext) {
    throw new Error(
      'useCrawledPage has to be used within <CrawledPageProvider>'
    )
  }

  return crawledPageContext
}
