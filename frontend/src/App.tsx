
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


function App() {


  return (
    <>
     <BiensProvider>
      <VisiteProvider>
        <AuthProvider>
          <UserProvider>
      <Routes>

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
      </Routes>
      </UserProvider>
      </AuthProvider>
      </VisiteProvider>
      </BiensProvider>
    </>
  )
}

export default App
