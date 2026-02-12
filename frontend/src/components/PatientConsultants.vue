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
        <!-- <div class="header-info">
          <h1 class="header-title">Find Your Perfect Doctor</h1>
          <p class="header-subtitle">Book appointments with certified medical specialists</p>
        </div> -->
        <div class="user-profile" @click="showProfileMenu = !showProfileMenu">
          <img :src="userProfileImage" alt="Profile" class="profile-img">
          <div class="profile-menu" v-if="showProfileMenu">
            <div class="menu-item" @click="goToProfile">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
              </svg>
              My Profile
            </div>
            <div class="menu-item" @click="goToConsultants">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clip-rule="evenodd" />
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
            <h2 class="page-title">My Medical Consultants</h2>
            <p class="page-subtitle">Active and previous medical consultations</p>
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
          <h3>Unable to Load Consultants</h3>
          <p>{{ error }}</p>
          <button @click="fetchConsultations" class="retry-btn">Try Again</button>
        </div>

        <!-- Content -->
        <div v-else class="consultants-content">
          <!-- Tabs Navigation -->
          <div class="tabs-navigation">
            <div class="tabs-header">
              <button 
                :class="['tab-btn', { active: activeTab === 'active' }]" 
                @click="activeTab = 'active'"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
                </svg>
                Active Consultants
                <span class="tab-badge">{{ activeConsultants.length }}</span>
              </button>
              <button 
                :class="['tab-btn', { active: activeTab === 'previous' }]" 
                @click="activeTab = 'previous'"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM9 7.5A.75.75 0 009 9h1.5c.98 0 1.813.626 2.122 1.5H9A.75.75 0 009 12h3.622a2.251 2.251 0 01-2.122 1.5H9a.75.75 0 00-.53 1.28l3 3a.75.75 0 001.06-1.06l-1.73-1.732A3.752 3.752 0 0014.175 12H15a.75.75 0 000-1.5h-.825A3.733 3.733 0 0013.5 9H15a.75.75 0 000-1.5H9z" clip-rule="evenodd" />
                </svg>
                Previous Consultants
                <span class="tab-badge">{{ previousConsultants.length }}</span>
              </button>
            </div>
            
            <!-- Tab Content -->
            <div class="tab-content">
              <!-- Active Consultants Tab -->
              <div v-if="activeTab === 'active'" class="tab-pane">
                <div v-if="activeConsultants.length === 0" class="empty-state">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                  </svg>
                  <h3>No Active Consultations</h3>
                  <p>You don't have any active consultations at the moment.</p>
                  <button class="find-doctor-btn" @click="findDoctors">
                    Find a Doctor
                  </button>
                </div>
                
                <div v-else class="consultants-list">
                  <div 
                    v-for="consultant in activeConsultants" 
                    :key="consultant.id"
                    class="consultant-card active"
                    @click="openConsultation(consultant)"
                  >
                    <div class="consultant-avatar">
                      <img :src="consultant.doctor.profileImage" :alt="consultant.doctor.name">
                      <div class="online-status" :class="{ online: consultant.doctor.isOnline }"></div>
                    </div>
                    <div class="consultant-info">
                      <div class="info-header">
                        <h4 class="doctor-name">Dr. {{ consultant.doctor.firstName }} {{ consultant.doctor.lastName }}</h4>
                        <span class="consultant-status active">Active</span>
                      </div>
                      <p class="doctor-specialty">{{ consultant.doctor.specialty }}</p>
                      <div class="consultant-meta">
                        <span class="meta-item">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
                          </svg>
                          {{ formatTime(consultant.lastActivity) }}
                        </span>
                        <span v-if="consultant.unreadMessages > 0" class="meta-item unread">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223z" clip-rule="evenodd" />
                          </svg>
                          {{ consultant.unreadMessages }} unread
                        </span>
                      </div>
                    </div>
                    <div class="consultant-actions">
                      <button class="action-btn chat" @click.stop="openChat(consultant)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path fill-rule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clip-rule="evenodd" />
                        </svg>
                        Chat
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Previous Consultants Tab -->
              <div v-else class="tab-pane">
                <div v-if="previousConsultants.length === 0" class="empty-state">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                  </svg>
                  <h3>No Previous Consultations</h3>
                  <p>You haven't completed any consultations yet.</p>
                  <button class="find-doctor-btn" @click="findDoctors">
                    Find a Doctor
                  </button>
                </div>
                
                <div v-else class="consultants-list">
                  <div 
                    v-for="consultant in previousConsultants" 
                    :key="consultant.id"
                    class="consultant-card previous"
                    @click="viewConsultationDetails(consultant)"
                  >
                    <div class="consultant-avatar">
                      <img :src="consultant.doctor.profileImage" :alt="consultant.doctor.name">
                    </div>
                    <div class="consultant-info">
                      <div class="info-header">
                        <h4 class="doctor-name">Dr. {{ consultant.doctor.firstName }} {{ consultant.doctor.lastName }}</h4>
                        <span class="consultant-status completed">Completed</span>
                      </div>
                      <p class="doctor-specialty">{{ consultant.doctor.specialty }}</p>
                      <div class="consultant-meta">
                        <span class="meta-item">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clip-rule="evenodd" />
                          </svg>
                          {{ formatDate(consultant.endDate) }}
                        </span>
                        <span class="meta-item">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
                          </svg>
                          {{ consultant.duration }} minutes
                        </span>
                      </div>
                    </div>
                    <div class="consultant-actions">
                      <button class="action-btn view" @click.stop="viewConsultationDetails(consultant)">
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
export default {
  name: 'MyConsultant',
  
  data() {
    return {
      loading: true,
      error: null,
      activeTab: 'active',
      userProfileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      showProfileMenu: false,
      consultations: []
    }
  },
  
  computed: {
    activeConsultants() {
      return this.consultations.filter(consultant => consultant.status === 'active')
    },
    
    previousConsultants() {
      return this.consultations.filter(consultant => consultant.status === 'completed' || consultant.status === 'closed')
    }
  },
  
  async mounted() {
    await this.fetchConsultations()
  },
  
  methods: {
    async fetchConsultations() {
      this.loading = true
      this.error = null
      
      try {
        // Mock data - replace with actual API call
        // In real app: const response = await fetch('/api/consultations')
        
        await new Promise(resolve => setTimeout(resolve, 800))
        
        this.consultations = [
          {
            id: '1',
            doctor: {
              id: '101',
              firstName: 'James',
              lastName: 'Wilson',
              profileImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
              specialty: 'Cardiology',
              isOnline: true
            },
            status: 'active',
            lastActivity: new Date(Date.now() - 30 * 60000), // 30 minutes ago
            unreadMessages: 3,
            startDate: new Date(Date.now() - 2 * 24 * 60 * 60000), // 2 days ago
            duration: 45
          },
          {
            id: '2',
            doctor: {
              id: '102',
              firstName: 'Sarah',
              lastName: 'Johnson',
              profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
              specialty: 'Dermatology',
              isOnline: false
            },
            status: 'active',
            lastActivity: new Date(Date.now() - 2 * 60 * 60000), // 2 hours ago
            unreadMessages: 0,
            startDate: new Date(Date.now() - 5 * 24 * 60 * 60000), // 5 days ago
            duration: 30
          },
          {
            id: '3',
            doctor: {
              id: '103',
              firstName: 'Michael',
              lastName: 'Chen',
              profileImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
              specialty: 'Pediatrics',
              isOnline: true
            },
            status: 'completed',
            lastActivity: new Date(Date.now() - 7 * 24 * 60 * 60000), // 7 days ago
            unreadMessages: 0,
            startDate: new Date(Date.now() - 30 * 24 * 60 * 60000), // 30 days ago
            endDate: new Date(Date.now() - 23 * 24 * 60 * 60000), // 23 days ago
            duration: 60
          },
          {
            id: '4',
            doctor: {
              id: '104',
              firstName: 'Lisa',
              lastName: 'Rodriguez',
              profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
              specialty: 'Psychiatry',
              isOnline: false
            },
            status: 'closed',
            lastActivity: new Date(Date.now() - 14 * 24 * 60 * 60000), // 14 days ago
            unreadMessages: 0,
            startDate: new Date(Date.now() - 45 * 24 * 60 * 60000), // 45 days ago
            endDate: new Date(Date.now() - 38 * 24 * 60 * 60000), // 38 days ago
            duration: 50
          },
          {
            id: '5',
            doctor: {
              id: '105',
              firstName: 'Robert',
              lastName: 'Kim',
              profileImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
              specialty: 'Orthopedics',
              isOnline: false
            },
            status: 'completed',
            lastActivity: new Date(Date.now() - 10 * 24 * 60 * 60000), // 10 days ago
            unreadMessages: 0,
            startDate: new Date(Date.now() - 25 * 24 * 60 * 60000), // 25 days ago
            endDate: new Date(Date.now() - 18 * 24 * 60 * 60000), // 18 days ago
            duration: 40
          },
          {
            id: '6',
            doctor: {
              id: '106',
              firstName: 'Emily',
              lastName: 'Wang',
              profileImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
              specialty: 'Neurology',
              isOnline: true
            },
            status: 'active',
            lastActivity: new Date(Date.now() - 5 * 60000), // 5 minutes ago
            unreadMessages: 1,
            startDate: new Date(Date.now() - 1 * 24 * 60 * 60000), // 1 day ago
            duration: 45
          }
        ]
        
      } catch (err) {
        console.error('Error fetching consultations:', err)
        this.error = 'Failed to load consultations. Please try again.'
      } finally {
        this.loading = false
      }
    },
    
    formatTime(date) {
      const now = new Date()
      const diff = now - date
      const minutes = Math.floor(diff / 60000)
      
      if (minutes < 1) {
        return 'Just now'
      }
      
      if (minutes < 60) {
        return `${minutes} min ago`
      }
      
      const hours = Math.floor(minutes / 60)
      if (hours < 24) {
        return `${hours} hour${hours !== 1 ? 's' : ''} ago`
      }
      
      const days = Math.floor(hours / 24)
      return `${days} day${days !== 1 ? 's' : ''} ago`
    },
    
    formatDate(date) {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    },
    
    openConsultation(consultant) {
      // Navigate to consultation detail page
      this.$router.push(`/consultation/${consultant.id}`)
    },
    
    openChat(consultant) {
      // Navigate to chat interface
      this.$router.push(`/chat/${consultant.id}`)
    },
    
    viewConsultationDetails(consultant) {
      // Navigate to consultation details
      this.$router.push(`/consultation/${consultant.id}/details`)
    },
    
    startNewConsultation() {
      // Navigate to find doctors page
      this.$router.push('/doctors')
    },
    
    findDoctors() {
      // Navigate to find doctors page
      this.$router.push('/doctors')
    },
    
    goToProfile() {
      this.$router.push('/profile')
    },
    
    goToConsultants() {
      // Already on consultants page
      this.showProfileMenu = false
    },
    
    handleLogout() {
      // Implement logout logic
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
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

/* Main Content */
.consultant-content {
  position: relative;
  z-index: 1;
  padding: 20px 40px 60px;
}

@media (max-width: 768px) {
  .consultant-content {
    padding: 20px 20px 40px;
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

.new-consultant-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.95);
  color: #667eea;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.new-consultant-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
  background: white;
}

.new-consultant-btn svg {
  width: 18px;
  height: 18px;
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

.consultant-card.active {
  border-left: 4px solid #48bb78;
}

.consultant-card.previous {
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
  min-width: 0; /* Prevent flex item from overflowing */
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
  
  .new-consultant-btn {
    width: 100%;
    justify-content: center;
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



/* header part */


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

/* Click outside to close profile menu */
.profile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}

/* Base Styles */
.my-consultant-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  position: relative;
  overflow-x: hidden;
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

.new-consultant-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.95);
  color: #667eea;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.new-consultant-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
  background: white;
}

.new-consultant-btn svg {
  width: 18px;
  height: 18px;
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

.consultant-card.active {
  border-left: 4px solid #48bb78;
}

.consultant-card.previous {
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
  min-width: 0; /* Prevent flex item from overflowing */
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
  
  .new-consultant-btn {
    width: 100%;
    justify-content: center;
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