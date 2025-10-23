import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import GalleryPage from './pages/GalleryPage'
import Layout from './Layout'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element = {<HomePage/>}/>
            <Route path='/gallery' element = {<GalleryPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
