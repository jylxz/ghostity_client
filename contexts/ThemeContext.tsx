import {createContext} from 'react'

const ThemeContext = createContext<"light" | "dark" | undefined>(undefined)

export default ThemeContext