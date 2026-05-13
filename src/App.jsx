import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import TopicPage from './pages/TopicPage'
import CheatSheet from './pages/CheatSheet'
import Landing from './pages/Landing'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen overflow-hidden bg-void">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <Navbar />
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/home" element={<Home />} />
              <Route path="/topic/:id" element={<TopicPage />} />
              <Route path="/cheat-sheet" element={<CheatSheet />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}
