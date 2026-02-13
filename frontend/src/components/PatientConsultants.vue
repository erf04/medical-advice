<template>
  <div class="my-consultant-container">
    <!-- Animated Background -->
    <div class="animated-bg">
      <div class="bg-circle circle-1"></div>
      <div class="bg-circle circle-2"></div>
      <div class="bg-circle circle-3"></div>
      <div class="bg-pulse"></div>
    </div>

    <!-- Header -->
    <header class="doctors-header">
      <div class="header-content">
        <div class="back-btn" @click="$router.go(-1)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="user-profile" @click="showProfileMenu = !showProfileMenu">
          <img :src="userProfileImage" alt="Profile" class="profile-img">
          <div class="profile-menu" v-if="showProfileMenu">
            <div class="menu-item" @click="goToProfile">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
              </svg>
              Doctors
            </div>
            <div class="menu-item" @click="goToConsultants">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.786 0 011.019-4.38z" clip-rule="evenodd" />
                <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
              </svg>
              My Consultants
            </div>

            <div class="menu-item logout" @click="handleLogout">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z" clip-rule="evenodd" />
              </svg>
              Logout
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="consultant-content">
      <div class="content-wrapper">
        <!-- Page Header -->
        <div class="page-header">
          <div class="header-left">
            <h2 class="page-title">My Medical Consultations</h2>
            <p class="page-subtitle">Manage your current and past consultations</p>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Loading your consultations...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error-state">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
          </svg>
          <h3>Unable to Load Consultations</h3>
          <p>{{ error }}</p>
          <button @click="fetchConsultations" class="retry-btn">Try Again</button>
        </div>

        <!-- Content -->
        <div v-else class="consultants-content">
          <!-- Tabs Navigation -->
          <div class="tabs-navigation">
            <div class="tabs-header">
              <button 
                :class="['tab-btn', { active: activeTab === 'upcoming' }]" 
                @click="activeTab = 'upcoming'"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
                </svg>
                Upcoming
                <span class="tab-badge">{{ upcomingConsultations.length }}</span>
              </button>
              <button 
                :class="['tab-btn', { active: activeTab === 'active' }]" 
                @click="activeTab = 'active'"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223z" clip-rule="evenodd" />
                </svg>
                Active
                <span class="tab-badge">{{ activeConsultations.length }}</span>
              </button>
              <button 
                :class="['tab-btn', { active: activeTab === 'completed' }]" 
                @click="activeTab = 'completed'"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                </svg>
                Completed
                <span class="tab-badge">{{ completedConsultations.length }}</span>
              </button>
            </div>
            
            <!-- Tab Content -->
            <div class="tab-content">
              <!-- Upcoming Consultations Tab (PAID status) -->
              <div v-if="activeTab === 'upcoming'" class="tab-pane">
                <div v-if="upcomingConsultations.length === 0" class="empty-state">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                  </svg>
                  <h3>No Upcoming Consultations</h3>
                  <p>You don't have any scheduled consultations.</p>
                  <button class="find-doctor-btn" @click="findDoctors">
                    Find a Doctor
                  </button>
                </div>
                
                <div v-else class="consultants-list">
                  <div 
                    v-for="consultation in upcomingConsultations" 
                    :key="consultation.id"
                    class="consultant-card upcoming"
                    @click="viewConsultationDetails(consultation)"
                  >
                    <div class="consultant-avatar">
                      <img :src="consultation.doctor.user?.profileImage || defaultDoctorImage" :alt="consultation.doctor.user?.firstName">
                    </div>
                    <div class="consultant-info">
                      <div class="info-header">
                        <h4 class="doctor-name">Dr. {{ consultation.doctor.user?.firstName }} {{ consultation.doctor.user?.lastName }}</h4>
                        <span class="consultant-status upcoming">Upcoming</span>
                      </div>
                      <p class="doctor-specialty">{{ getDoctorSpecialty(consultation.doctor) }}</p>
                      <div class="consultant-meta">
                        <span class="meta-item">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clip-rule="evenodd" />
                          </svg>
                          {{ formatJalaliDate(consultation.reservedDate) }}
                        </span>
                        <span class="meta-item">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
                          </svg>
                          {{ consultation.startTime }} - {{ consultation.endTime }}
                        </span>
                        <span class="meta-item">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM9 7.5A.75.75 0 009 9h1.5c.98 0 1.813.626 2.122 1.5H9A.75.75 0 009 12h3.622a2.251 2.251 0 01-2.122 1.5H9a.75.75 0 00-.53 1.28l3 3a.75.75 0 001.06-1.06l-1.73-1.732A3.752 3.752 0 0014.175 12H15a.75.75 0 000-1.5h-.825A3.733 3.733 0 0013.5 9H15a.75.75 0 000-1.5H9z" clip-rule="evenodd" />
                          </svg>
                          ${{ consultation.price }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Active Consultations Tab (ACTIVE status) -->
              <div v-else-if="activeTab === 'active'" class="tab-pane">
                <div v-if="activeConsultations.length === 0" class="empty-state">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223z" clip-rule="evenodd" />
                  </svg>
                  <h3>No Active Consultations</h3>
                  <p>You don't have any ongoing consultations.</p>
                </div>
                
                <div v-else class="consultants-list">
                  <div 
                    v-for="consultation in activeConsultations" 
                    :key="consultation.id"
                    class="consultant-card active"
                    @click="joinConsultation(consultation)"
                  >
                    <div class="consultant-avatar">
                      <img :src="consultation.doctor.user?.profileImage || defaultDoctorImage" :alt="consultation.doctor.user?.firstName">
                      <div class="online-status online"></div>
                    </div>
                    <div class="consultant-info">
                      <div class="info-header">
                        <h4 class="doctor-name">Dr. {{ consultation.doctor.user?.firstName }} {{ consultation.doctor.user?.lastName }}</h4>
                        <span class="consultant-status active">Active Now</span>
                      </div>
                      <p class="doctor-specialty">{{ getDoctorSpecialty(consultation.doctor) }}</p>
                      <div class="consultant-meta">
                        <span class="meta-item">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clip-rule="evenodd" />
                          </svg>
                          Started at {{ consultation.startTime }}
                        </span>
                        <span class="meta-item">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
                          </svg>
                          {{ consultation.subject }}
                        </span>
                      </div>
                    </div>
                    <div class="consultant-actions">
                      <button class="action-btn chat" @click.stop="joinConsultation(consultation)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path fill-rule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clip-rule="evenodd" />
                        </svg>
                        Join Consultation
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Completed Consultations Tab (FINISHED/EXPIRED) -->
              <div v-else class="tab-pane">
                <div v-if="completedConsultations.length === 0" class="empty-state">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                  </svg>
                  <h3>No Completed Consultations</h3>
                  <p>You haven't completed any consultations yet.</p>
                  <button class="find-doctor-btn" @click="findDoctors">
                    Find a Doctor
                  </button>
                </div>
                
                <div v-else class="consultants-list">
                  <div 
                    v-for="consultation in completedConsultations" 
                    :key="consultation.id"
                    class="consultant-card completed"
                    @click="viewConsultationDetails(consultation)"
                  >
                    <div class="consultant-avatar">
                      <img :src="consultation.doctor.user?.profileImage || defaultDoctorImage" :alt="consultation.doctor.user?.firstName">
                    </div>
                    <div class="consultant-info">
                      <div class="info-header">
                        <h4 class="doctor-name">Dr. {{ consultation.doctor.user?.firstName }} {{ consultation.doctor.user?.lastName }}</h4>
                        <span class="consultant-status completed">Completed</span>
                      </div>
                      <p class="doctor-specialty">{{ getDoctorSpecialty(consultation.doctor) }}</p>
                      <div class="consultant-meta">
                        <span class="meta-item">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clip-rule="evenodd" />
                          </svg>
                          {{ formatJalaliDate(consultation.reservedDate) }}
                        </span>
                        <span class="meta-item">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
                          </svg>
                          {{ consultation.startTime }} - {{ consultation.endTime }}
                        </span>
                      </div>
                    </div>
                    <div class="consultant-actions">
                      <button class="action-btn view" @click.stop="viewConsultationDetails(consultation)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path fill-rule="evenodd" d="M15.75 2.25H21a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0V4.81L8.03 17.03a.75.75 0 01-1.06-1.06L19.19 3.75h-3.44a.75.75 0 010-1.5zm-10.5 4.5a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V10.5a.75.75 0 011.5 0v8.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V8.25a3 3 0 013-3h8.25a.75.75 0 010 1.5H5.25z" clip-rule="evenodd" />
                        </svg>
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment-jalaali';

export default {
  name: 'PatientConsultations',
  
  data() {
    return {
      loading: true,
      error: null,
      activeTab: 'upcoming',
      userProfileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      showProfileMenu: false,
      consultations: [],
      defaultDoctorImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      apiBaseUrl: 'http://localhost:8000',
      processingStart: false,
      processingFinish: false,
      statusCheckInterval: null
    }
  },
  
  computed: {
    upcomingConsultations() {
      return this.consultations.filter(c => c.status === 'PAID');
    },
    
    activeConsultations() {
      return this.consultations.filter(c => c.status === 'ACTIVE');
    },
    
    completedConsultations() {
      return this.consultations.filter(c => c.status === 'FINISHED' || c.status === 'EXPIRED');
    }
  },
  
  async mounted() {
    await this.fetchConsultations();
    // Start periodic status check every 30 seconds
    this.startStatusCheck();
  },
  
  beforeUnmount() {
    this.stopStatusCheck();
  },
  
  methods: {
    async fetchConsultations() {
      this.loading = true;
      this.error = null;
      
      try {
        const authToken = localStorage.getItem('authToken');
        
        if (!authToken) {
          throw new Error('Authentication required. Please login again.');
        }
        
        const response = await fetch(`${this.apiBaseUrl}/consultations/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        });
        
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Session expired. Please login again.');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (Array.isArray(data)) {
          this.consultations = data;
          
          // Check for PAID consultations that should become ACTIVE
          await this.checkAndStartConsultations();
          
          // Check for ACTIVE consultations that should become FINISHED
          await this.checkAndFinishConsultations();
        } else {
          throw new Error('Invalid API response format');
        }
        
      } catch (err) {
        console.error('Error fetching consultations:', err);
        this.error = err.message || 'Failed to load consultations. Please try again.';
      } finally {
        this.loading = false;
      }
    },
    
    startStatusCheck() {
      // Check every 30 seconds
      this.statusCheckInterval = setInterval(async () => {
        await this.checkAndStartConsultations();
        await this.checkAndFinishConsultations();
      }, 30000);
    },
    
    stopStatusCheck() {
      if (this.statusCheckInterval) {
        clearInterval(this.statusCheckInterval);
        this.statusCheckInterval = null;
      }
    },
    
    async checkAndStartConsultations() {
      const now = moment();
      
      for (const consultation of this.consultations) {
        if (consultation.status !== 'PAID') continue;
        
        const [startHour, startMinute] = consultation.startTime.split(':').map(Number);
        const [endHour, endMinute] = consultation.endTime.split(':').map(Number);
        const [jalaliYear, jalaliMonth, jalaliDay] = consultation.reservedDate.split('-').map(Number);
        
        const consultationDate = moment(`${jalaliYear}/${jalaliMonth}/${jalaliDay}`, 'jYYYY/jM/jD');
        
        if (!consultationDate.isValid()) {
          console.error('Invalid Jalali date:', consultation.reservedDate);
          continue;
        }
        
        const consultationStart = consultationDate.clone().set({
          hour: startHour,
          minute: startMinute,
          second: 0
        });
        const consultationEnd = consultationDate.clone().set({
          hour: endHour,
          minute: endMinute,
          second: 0
        });
        
        if (now.isSameOrAfter(consultationStart) && now.isSameOrBefore(consultationEnd)) {
          await this.startConsultation(consultation.id);
        }
      }
    },
    
    async checkAndFinishConsultations() {
      const now = moment();
      
      for (const consultation of this.consultations) {
        // if (consultation.status !== 'ACTIVE') continue;
        
        const [endHour, endMinute] = consultation.endTime.split(':').map(Number);
        const [jalaliYear, jalaliMonth, jalaliDay] = consultation.reservedDate.split('-').map(Number);
        
        const consultationDate = moment(`${jalaliYear}/${jalaliMonth}/${jalaliDay}`, 'jYYYY/jM/jD');
        
        if (!consultationDate.isValid()) {
          console.error('Invalid Jalali date:', consultation.reservedDate);
          continue;
        }
        
        const consultationEnd = consultationDate.clone().set({
          hour: endHour,
          minute: endMinute,
          second: 0
        });
        
        if (now.isSameOrAfter(consultationEnd)) {
          console.log(111111)
          await this.finishConsultation(consultation.id);
        }
      }
    },
    
    async startConsultation(consultationId) {
      if (this.processingStart) return;
      
      this.processingStart = true;
      
      try {
        const authToken = localStorage.getItem('authToken');
        
        const response = await fetch(`${this.apiBaseUrl}/consultations/${consultationId}/start/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        });
        
        if (response.ok) {
          const index = this.consultations.findIndex(c => c.id === consultationId);
          if (index !== -1) {
            this.consultations[index].status = 'ACTIVE';
            this.consultations[index].startedAt = new Date().toISOString();
          }
          console.log(`✅ Consultation ${consultationId} started successfully`);
        } else {
          console.error(`Failed to start consultation ${consultationId}`);
        }
        
      } catch (err) {
        console.error('Error starting consultation:', err);
      } finally {
        this.processingStart = false;
      }
    },
    
    async finishConsultation(consultationId) {
      if (this.processingFinish) return;
      
      this.processingFinish = true;
      
      try {
        const authToken = localStorage.getItem('authToken');
        
        const response = await fetch(`${this.apiBaseUrl}/consultations/${consultationId}/finish/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        });
        
        if (response.ok) {
          const index = this.consultations.findIndex(c => c.id === consultationId);
          if (index !== -1) {
            this.consultations[index].status = 'FINISHED';
            this.consultations[index].endedAt = new Date().toISOString();
          }
          console.log(`✅ Consultation ${consultationId} finished successfully`);
        } else {
          console.error(`Failed to finish consultation ${consultationId}`);
        }
        
      } catch (err) {
        console.error('Error finishing consultation:', err);
      } finally {
        this.processingFinish = false;
      }
    },
    
    getDoctorSpecialty(doctor) {
      if (doctor.categories && doctor.categories.length > 0) {
        return doctor.categories[0];
      }
      return 'Medical Specialist';
    },
    
    formatJalaliDate(dateString) {
      if (!dateString) return 'N/A';
      const [year, month, day] = dateString.split('-').map(Number);
      return moment(`${year}/${month}/${day}`, 'jYYYY/jM/jD').format('jYYYY/jMM/jDD');
    },
    
    viewConsultationDetails(consultation) {
      this.$router.push({
        path: `/chat/${consultation.id}`,
        query: {
          data: encodeURIComponent(JSON.stringify(consultation))
        }
      });
    },
    
    joinConsultation(consultation) {
  // Stringify the consultation data and pass as query parameter
  this.$router.push({
    path: `/chat/${consultation.id}`,
    query: {
      data: encodeURIComponent(JSON.stringify(consultation))
    }
  });
},
    
    findDoctors() {
      this.$router.push('/doctors');
    },
    
    goToProfile() {
      this.$router.push('/profile');
      this.showProfileMenu = false;
    },
    
    goToConsultants() {
      this.showProfileMenu = false;
    },
    
    handleLogout() {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
/* All your existing styles remain exactly the same */
/* Base Styles */
.my-consultant-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  position: relative;
  overflow: hidden;
}

/* Animated Background */
.animated-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 20s infinite linear;
}

.circle-1 {
  width: 300px;
  height: 300px;
  top: -150px;
  left: -150px;
  animation-delay: 0s;
}

.circle-2 {
  width: 200px;
  height: 200px;
  bottom: -100px;
  right: -100px;
  animation-delay: 10s;
}

.circle-3 {
  width: 150px;
  height: 150px;
  top: 50%;
  right: 10%;
  animation-delay: 5s;
}

.bg-pulse {
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, transparent 0%, rgba(255, 255, 255, 0.03) 100%);
  animation: pulse 4s infinite ease-in-out;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(50px, 50px) rotate(90deg);
  }
  50% {
    transform: translate(0, 100px) rotate(180deg);
  }
  75% {
    transform: translate(-50px, 50px) rotate(270deg);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.02);
  }
}

/* Header Styles (Your provided header) */
.doctors-header {
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

@media (max-width: 768px) {
  .header-content {
    padding: 12px 16px;
    gap: 12px;
  }
}

.header-content .back-btn {
  width: 44px;
  height: 44px;
  background: #f7f9fc;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.header-content .back-btn:hover {
  background: #667eea;
  border-color: #667eea;
  transform: translateX(-2px);
}

.header-content .back-btn:hover svg {
  color: white;
}

.header-content .back-btn svg {
  width: 20px;
  height: 20px;
  color: #4a5568;
  transition: color 0.2s ease;
}

.header-info {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-align: center;
  padding: 0 15px;
}

.header-title {
  font-size: 18px;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 2px 0;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.header-subtitle {
  font-size: 12px;
  color: #718096;
  margin: 0;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-profile {
  position: relative;
  flex-shrink: 0;
}

.profile-img {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid #667eea;
  transition: transform 0.2s ease;
}

.profile-img:hover {
  transform: scale(1.05);
}

.profile-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border: 1px solid #e2e8f0;
  min-width: 180px;
  z-index: 1001;
  overflow: hidden;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  font-size: 13px;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid #f7f9fc;
  text-decoration: none;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:hover {
  background: #f7f9fc;
  color: #667eea;
}

.menu-item svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.menu-item.logout {
  color: #e53e3e;
}

.menu-item.logout:hover {
  background: #fff5f5;
  color: #c53030;
}

/* Main Content */
.consultant-content {
  position: relative;
  z-index: 1;
  padding: 20px 24px 60px;
  margin-top: 0;
}

@media (max-width: 768px) {
  .consultant-content {
    padding: 16px 16px 40px;
  }
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

/* Page Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
}

.header-left {
  flex: 1;
  min-width: 0;
}

.page-title {
  font-size: 28px;
  font-weight: 800;
  color: white;
  margin: 0 0 8px 0;
  line-height: 1.2;
}

.page-subtitle {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  line-height: 1.4;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
}

.loading-state .spinner {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

.loading-state p {
  font-size: 15px;
  color: white;
  font-weight: 500;
}

/* Error State */
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.error-state svg {
  width: 60px;
  height: 60px;
  color: #e53e3e;
  margin-bottom: 20px;
}

.error-state h3 {
  font-size: 20px;
  color: #2d3748;
  margin-bottom: 10px;
}

.error-state p {
  font-size: 15px;
  color: #718096;
  margin-bottom: 20px;
  max-width: 400px;
}

.error-state .retry-btn {
  padding: 10px 24px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.error-state .retry-btn:hover {
  background: #5a67d8;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
}

/* Tabs Navigation */
.tabs-navigation {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.tabs-header {
  display: flex;
  background: #f7f9fc;
  border-bottom: 2px solid #e2e8f0;
  padding: 0 4px;
}

.tab-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 18px 24px;
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  font-size: 15px;
  font-weight: 600;
  color: #718096;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  white-space: nowrap;
}

.tab-btn:hover {
  color: #667eea;
  background: rgba(102, 126, 234, 0.05);
}

.tab-btn.active {
  color: #667eea;
  border-bottom-color: #667eea;
  background: white;
}

.tab-btn svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.tab-badge {
  padding: 2px 8px;
  background: #e2e8f0;
  color: #4a5568;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  min-width: 24px;
  text-align: center;
}

.tab-btn.active .tab-badge {
  background: #667eea;
  color: white;
}

/* Tab Content */
.tab-content {
  padding: 0;
}

.tab-pane {
  min-height: 400px;
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.empty-state svg {
  width: 64px;
  height: 64px;
  color: #cbd5e0;
  margin-bottom: 16px;
}

.empty-state h3 {
  font-size: 18px;
  color: #2d3748;
  margin-bottom: 8px;
  font-weight: 600;
}

.empty-state p {
  font-size: 14px;
  color: #718096;
  margin-bottom: 20px;
  max-width: 300px;
  line-height: 1.5;
}

.find-doctor-btn {
  padding: 10px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.find-doctor-btn:hover {
  background: #5a67d8;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
}

/* Consultants List */
.consultants-list {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 600px;
  overflow-y: auto;
}

.consultants-list::-webkit-scrollbar {
  width: 6px;
}

.consultants-list::-webkit-scrollbar-track {
  background: #f7f9fc;
  border-radius: 3px;
}

.consultants-list::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 3px;
}

.consultants-list::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}

/* Consultant Card */
.consultant-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: white;
  border-radius: 16px;
  border: 2px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.consultant-card:hover {
  transform: translateY(-2px);
  border-color: #cbd5e0;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.consultant-card.upcoming {
  border-left: 4px solid #4299e1;
}

.consultant-card.active {
  border-left: 4px solid #48bb78;
}

.consultant-card.completed {
  border-left: 4px solid #a0aec0;
}

.consultant-avatar {
  position: relative;
  width: 56px;
  height: 56px;
  flex-shrink: 0;
}

.consultant-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 14px;
  object-fit: cover;
  border: 3px solid #667eea;
}

.online-status {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 14px;
  height: 14px;
  background: #a0aec0;
  border-radius: 50%;
  border: 2px solid white;
}

.online-status.online {
  background: #48bb78;
}

.consultant-info {
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 6px;
  flex-wrap: wrap;
  gap: 8px;
}

.doctor-name {
  font-size: 16px;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.consultant-status {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;
}

.consultant-status.upcoming {
  background: #bee3f8;
  color: #2c5282;
}

.consultant-status.active {
  background: #c6f6d5;
  color: #22543d;
}

.consultant-status.completed {
  background: #e2e8f0;
  color: #4a5568;
}

.doctor-specialty {
  font-size: 13px;
  color: #667eea;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.consultant-meta {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #718096;
  white-space: nowrap;
}

.meta-item.unread {
  color: #667eea;
  font-weight: 600;
}

.meta-item svg {
  width: 12px;
  height: 12px;
  flex-shrink: 0;
}

.consultant-actions {
  flex-shrink: 0;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: #f7f9fc;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.action-btn:hover {
  background: #edf2f7;
  border-color: #cbd5e0;
  color: #667eea;
}

.action-btn svg {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

.action-btn.chat:hover {
  background: #667eea;
  border-color: #667eea;
  color: white;
}

.action-btn.view:hover {
  background: #48bb78;
  border-color: #48bb78;
  color: white;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .header-left {
    text-align: center;
  }
  
  .tabs-header {
    flex-direction: column;
    padding: 0;
  }
  
  .tab-btn {
    padding: 16px 20px;
    justify-content: flex-start;
    border-bottom: 1px solid #e2e8f0;
    border-left: 3px solid transparent;
  }
  
  .tab-btn.active {
    border-left-color: #667eea;
    border-bottom-color: #e2e8f0;
  }
  
  .consultant-card {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
    text-align: center;
  }
  
  .consultant-avatar {
    align-self: center;
  }
  
  .info-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .consultant-meta {
    justify-content: center;
  }
  
  .consultant-actions {
    align-self: stretch;
  }
  
  .action-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 24px;
  }
  
  .page-subtitle {
    font-size: 14px;
  }
  
  .consultants-list {
    padding: 16px;
  }
  
  .consultant-card {
    padding: 16px;
  }
}

/* Spinner Animation */
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>