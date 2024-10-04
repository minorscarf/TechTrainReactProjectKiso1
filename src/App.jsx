import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home.jsx';
import { MakeThread } from './MakeThread.jsx';


const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Home />}/>
        <Route path={'/threads/new'} element={<MakeThread />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
