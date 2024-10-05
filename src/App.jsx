import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home.jsx';
import { MakeThread } from './MakeThread.jsx';
import { Comment } from './Comment.jsx';


const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Home />}/>
        <Route path={'/threads/new'} element={<MakeThread />} />
        <Route path={'/threads/:thread_id'} element={<Comment/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
