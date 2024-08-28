import { ThemeProvider } from "@/components/theme-provider"
import Header  from './components/Header';
import ExchangeRateList from './components/ExchangeRateList'; 
import './App.css'

function App() {
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="pt-12 container mx-auto">
          <Header />   
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
            <ExchangeRateList />
          </div>
        </div>
      </ThemeProvider>
    </div>
  )
}
export default App
