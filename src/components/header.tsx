import { ModeToggle } from "@/components/mode-toggle"

const nombre = '${DolarPy}';
export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-12 bg-gray-100 dark:bg-gray-900 flex items-center justify-between px-4 mb-6">
      <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-200">{nombre}</h1> 
      <ModeToggle />
    </header>
  );
}