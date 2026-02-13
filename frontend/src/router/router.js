import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue'
import Doctors from '@/components/Doctors.vue'
import DoctorDetail from '@/components/DoctorDetail.vue'
import PatientConsultants from '@/components/PatientConsultants.vue'
import PatientProfile from '@/components/PatientProfile.vue'
import DoctorPannel from '@/components/DoctorPannel.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
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
    path: '/profile',
    name: 'patientprofile',
    component: PatientProfile
  },
  {
    path: '/mypannel',
    name: 'doctorpannel',
    component: DoctorPannel
  },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
