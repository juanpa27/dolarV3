import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import Header from "@/components/header"
1
import './App.css'

function App() {


  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="container mx-auto">
          <Header />   
            
        
        </div>
      </ThemeProvider>
    </div>
  )
}

export default App
