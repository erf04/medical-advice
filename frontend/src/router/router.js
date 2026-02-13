import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue'
import Doctors from '@/components/Doctors.vue'
import DoctorDetail from '@/components/DoctorDetail.vue'
import PatientConsultants from '@/components/PatientConsultants.vue'
import PatientProfile from '@/components/PatientProfile.vue'
import DoctorPannel from '@/components/DoctorPannel.vue'
import AdminLogin from '@/components/AdminLogin.vue'
import AdminDashboard from '@/components/AdminDashboard.vue'
import PatientChat from '@/components/PatientChat.vue'
import DoctorReviews from '@/components/DoctorReviews.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/admin',
    name: 'adminlogin',
    component: AdminLogin
  },
  {
    path: '/doctors',
    name: 'doctors',
    component: Doctors
  },
  {
    path: '/doctor/profile/:id',
    name: 'doctordetail',
    component: DoctorDetail
  },
  {
    path: '/consultants',
    name: 'patientconsultants',
    component: PatientConsultants
  },
  {
    path: '/chat/:id',
    name: 'patientchat',
    component: PatientChat
  },
  {
    path: '/profile',
    name: 'patientprofile',
    component: PatientProfile
  },
  {
    path: '/mypannel',
    name: 'doctorpannel',
    component: DoctorPannel
  },
  {
    path: '/myreviews',
    name: 'doctorreviews',
    component: DoctorReviews
  },
  {
    path: '/dashboard',
    name: 'admindashboard',
    component: AdminDashboard
  },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
