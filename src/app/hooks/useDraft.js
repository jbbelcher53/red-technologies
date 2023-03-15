/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react'

export const DraftContext = React.createContext(null)

export const DraftProvider = ({ children }) => {
  const [draft, setDraft] = React.useState({
    createdByUserName: '',
    orderType: '',
    customerName: '',
  })

  // const saveDraft = (data: {
  //   createdByUserName: string
  //   orderType: string
  //   customerName: string
  // }) => {
  //   setDraft(data)
  // }

  return (
    <DraftContext.Provider value={{ draft, setDraft }}>
      {children}
    </DraftContext.Provider>
  )
}

export const DraftConsumer = DraftContext.Consumer

export const useDraft = () => {
  const context = React.useContext(DraftContext)
  return context
}
