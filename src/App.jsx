import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Body from './components/Body'
import { BrowserRouter } from 'react-router-dom'
import supabase from './config/SupabaseClient.js'
function App() {
  const [count, setCount] = useState(0)
  const [search,setSearch] = useState("")
  return (
    <>
      <BrowserRouter>
        <Header search={search} setSearch={setSearch}></Header>
        <Body search={search}></Body>
      </BrowserRouter>

    </>
  )
}

export default App
