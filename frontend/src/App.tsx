
import { Route, Routes } from 'react-router-dom'
import './App.css'

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
import { AdminVisitesProvider } from './AdminContexts/AdminVisitesContext'
import AdminVisites from './AdminPages/AdminVisites'
import { TestimonialsAdminProvider } from './AdminContexts/TestimonialsAdminContext'
import AdminTestimonials from './AdminPages/AdminTestimonials'
import { UsersAdminProvider } from './AdminContexts/UsersAdminContext'
import AdminUsers from './AdminPages/AdminUsers'
import { AgencyAdminProvider } from './AdminContexts/AgencyAdminContext'
import General from './AdminPages/General'
import AdminProfile from './AdminPages/AdminProfile'
import Notifications from './AdminPages/Notifications'
import { NotificationsProvider } from './AdminContexts/NotificationsContext'
import { DashboardProvider } from './AdminContexts/DashboardContext'
import Guide from './AdminPages/Guide'
import { FavoritesProvider } from './Contexts/FavoritesContext'
import Favorites from './Pages/Favorites'
import { TestimonialsProvider } from './Contexts/TestimonialsContext'
import { ContactProvider } from './Contexts/ContactContext';
import MentionsLegales from './Pages/MentionsLegales'
import PrivacyPolicy from './Pages/PrivacyPolicy'


function App() {


  return (
    <>
     <BiensProvider>
      <VisiteProvider>
        <AuthProvider>
          <UserProvider>
            <BiensAdminProvider>
              <AdminVisitesProvider>
                <TestimonialsAdminProvider>
                  <UsersAdminProvider>
                    <AgencyAdminProvider>
                      <NotificationsProvider>
                        <DashboardProvider>
                          <FavoritesProvider>
                            <TestimonialsProvider>
                              <ContactProvider>
      <Routes>

        <Route element={
          <PublicRoute>
            <PublicLayout/>
          </PublicRoute>
        }>

        <Route path="/" element={
          <>
            
            <Acceuil/> 
          </>
        }/>


        <Route path='/biens' element={
          <>
             
             <Biens/>
          </>
        }/>

        <Route path='/bien/:id' element={
          <>
            
            <BienDetails/>
          </>
        }/>

        <Route path='/profile' element={
          <>
            
            <Profile/>
          </>
        }/>

        <Route path='/services' element={
          <>
            
            <Services/>
          </>
        }/>

        <Route path="/contact" element={
          <>
            
            <Contact/>
          </>
        }/>

        <Route path='/favoris' element={
          <Favorites/>
        }/>

        <Route path='/mentions' element={
          <MentionsLegales/> 
        }/>

        <Route path='/privacy' element={
          <PrivacyPolicy/>
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
         <Route path='visites' element={<AdminVisites/>}/>
         <Route path='testimonials' element={<AdminTestimonials/>}/>
         <Route path='users' element={<AdminUsers/>}/>
         <Route path='general' element={<General/>}/>
         <Route path='profile' element={<AdminProfile/>}/>
         <Route path='notifications' element={<Notifications/>}/>
         <Route path='guide' element={<Guide/>}/>
      </Route>
      </Routes>
      </ContactProvider>
      </TestimonialsProvider>
      </FavoritesProvider>
      </DashboardProvider>
      </NotificationsProvider>
      </AgencyAdminProvider>
      </UsersAdminProvider>
      </TestimonialsAdminProvider>
      </AdminVisitesProvider>
      </BiensAdminProvider>
      </UserProvider>
      </AuthProvider>
      </VisiteProvider>
      </BiensProvider>
    </>
  )
}

export default App
