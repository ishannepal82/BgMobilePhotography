import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import GalleryPage from './pages/GalleryPage'
import Layout from './Layout'
import LoginPage from './pages/Login'
import AdminPannel from './pages/admin/AdminPannel'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element = {<HomePage/>}/>
            <Route path='/gallery' element = {<GalleryPage />} />
            <Route path='/user' element = {<LoginPage />} />
            <Route path='admin/home' element = {<AdminPannel />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
