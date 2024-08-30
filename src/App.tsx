import { ThemeProvider } from "@/components/theme-provider"
import Header  from './components/Header';
import ExchangeRateList from './components/ExchangeRateList'; 
import {Footer} from '@/components/Footer';
//css
import './App.css';


function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <main className="flex-grow container mx-auto pt-16">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 px-4 mt-4">
            <ExchangeRateList />            
          </div>
        </main>
        <Footer />    
      </ThemeProvider>
    </div>
  );
}

export default App
