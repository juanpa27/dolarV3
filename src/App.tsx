import React from 'react'
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import Header from "@/components/header"


import './App.css'

function App() {


  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="container mx-auto">
          <Header title="Vite App" />
          <ModeToggle />
            {/* Contenido principal de la aplicación */}
        
        </div>
      </ThemeProvider>
    </div>
  )
}

export default App
