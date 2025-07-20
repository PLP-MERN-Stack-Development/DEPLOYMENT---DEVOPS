// src/context/BugContext.jsx
import { createContext, useContext } from 'react'

const BugContext = createContext()

export const useBugs = () => useContext(BugContext)

export default BugContext
