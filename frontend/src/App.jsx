import './App.css'
import Code from './components/Code_section/Code'

function App() {
  return (
    <div className="min-h-screen bg-[#020205] text-zinc-100 flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-4xl mx-auto space-y-4">
        <header className="flex flex-col space-y-1 mb-2">
          <h1 className="text-2xl font-bold text-white tracking-tight">Code Editor Section</h1>
          <p className="text-zinc-400 text-sm">Interactive code preview with language switching and copy utility.</p>
        </header>
        
        <Code />
      </div>
    </div>
  )
}

export default App
