import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import { CustomCard } from "@/components/CustomCard"

import './App.css'

function App() {


  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="container mx-auto">
          <Header />   
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <CustomCard
                entityName="CAMBIOS CHACO"
                buyPrice="7520"
                sellPrice="7590"
                variant="success" // Cambia el estilo usando variantes
              />
              <CustomCard
                entityName="CAMBIOS ALBERDI"
                buyPrice="7540"
                sellPrice="7585"
                variant="default"
              />
              <CustomCard
                entityName="MAXICAMBIOS"
                buyPrice="7500"
                sellPrice="7590"
                variant="warning"
              />
          </div>
          
        
        </div>
      </ThemeProvider>
    </div>
  )
}

export default App
