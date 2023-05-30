/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState, PropsWithChildren, useEffect } from 'react'
import { ThemeContextProps } from '../interfaces/themeContextProps'

export const ThemeContext = createContext<ThemeContextProps>({
    isDarkMode: false,
    themeMode: 'light',
    toggleMode: () => {},
})

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
    const [themeMode, setThemeMode] = useState<string>('light')

    useEffect(() => {
      const themeMode: string | null = localStorage.getItem('themeMode')
      setThemeMode(themeMode || 'light')
      setIsDarkMode(themeMode === 'dark' ? true : themeMode === 'light' ? false : false)
    }, [])

    const toggleMode = () => {
        setIsDarkMode(!isDarkMode)
        setThemeMode(!isDarkMode ? 'dark' : 'light')
        localStorage.setItem('themeMode', !isDarkMode ? 'dark' : 'light')
    }

    const theme: ThemeContextProps = {
        isDarkMode,
        themeMode,
        toggleMode
    }

    return (
        <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    )
}