import React from 'react'
import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/theme-provider"
import {ModeToggle} from "@/components/mode-toggle"
import './App.css'

function App() {


  return (
    <div>
       <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Button>Button</Button>
        <ModeToggle />

    </ThemeProvider>
    </div>
  )
}

export default App
