
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './Components/BaseComponents/Header'
import Acceuil from './Pages/Acceuil'
import { BiensProvider } from './Contexts/BiensContext'
import Biens from './Pages/Biens' 
import BienDetails from './Pages/BienDetails'
import { VisiteProvider } from './Contexts/VisiteContext'
import { AuthProvider } from './Contexts/AuthContext'
import Profile from './Pages/Profile'
import { UserProvider } from './Contexts/UserContext'
import Services from './Pages/Services'
import Contact from './Pages/Contact'
import PublicRoute from './Layouts/PublicRoute'
import PublicLayout from './Layouts/PublicLayout'
import AdminRoute from './Layouts/AdminRoute'
import AdminLayout from './Layouts/AdminLayout'
import Dashboard from './AdminPages/Dashboard'
import AdminBiens from './AdminPages/AdminBiens'
import AdminBienDetails from './AdminPages/AdminBienDetails'
import { BiensAdminProvider } from './AdminContexts/BiensAdminContext'
import AdminBienAjout from './AdminPages/AdminBienAjout'


function App() {


  return (
    <>
     <BiensProvider>
      <VisiteProvider>
        <AuthProvider>
          <UserProvider>
            <BiensAdminProvider>
      <Routes>

        <Route element={
          <PublicRoute>
            <PublicLayout/>
          </PublicRoute>
        }>

        <Route path="/" element={
          <>
            <Header/>
            <Acceuil/> 
          </>
        }/>


        <Route path='/biens' element={
          <>
             <Header/>
             <Biens/>
          </>
        }/>

        <Route path='/bien/:id' element={
          <>
            <Header/>
            <BienDetails/>
          </>
        }/>

        <Route path='/profile' element={
          <>
            <Header/>
            <Profile/>
          </>
        }/>

        <Route path='/services' element={
          <>
            <Header/>
            <Services/>
          </>
        }/>

        <Route path="/contact" element={
          <>
            <Header/>
            <Contact/>
          </>
        }/>
        </Route>


        <Route
      path='/admin/*'
      element={
        <AdminRoute>
          <AdminLayout/>
        </AdminRoute>
      }>
         <Route path='dashboard' element={<Dashboard/>}/>
         <Route path='biens' element={<AdminBiens/>}/>
         <Route path='bien/:id' element={<AdminBienDetails/>}/>
         <Route path='addBien' element={<AdminBienAjout/>}/>
      </Route>
      </Routes>
      </BiensAdminProvider>
      </UserProvider>
      </AuthProvider>
      </VisiteProvider>
      </BiensProvider>
    </>
  )
}

export default App
