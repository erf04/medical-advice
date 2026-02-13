<template>
  <div class="admin-dashboard-container">
    <!-- Animated Background -->
    <div class="animated-bg">
      <div class="bg-circle circle-1"></div>
      <div class="bg-circle circle-2"></div>
      <div class="bg-circle circle-3"></div>
      <div class="bg-pulse"></div>
    </div>

    <!-- Main Layout -->
    <div class="dashboard-layout">
      <!-- Sidebar Navigation -->
      <aside class="admin-sidebar">
        <div class="sidebar-header">
          <div class="logo-icon admin">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
            </svg>
          </div>
          <h2 class="sidebar-title">MediCare<span>Admin</span></h2>
        </div>

        <div class="admin-profile">
          <img :src="adminProfileImage" alt="Admin" class="admin-avatar">
          <div class="admin-info">
            <h4>{{ adminName }}</h4>
            <span class="admin-role">Administrator</span>
          </div>
        </div>

        <nav class="sidebar-nav">
          <div 
            v-for="item in menuItems" 
            :key="item.id"
            :class="['nav-item', { active: currentView === item.view }]"
            @click="navigateTo(item.view)"
          >
            <div class="nav-icon" v-html="item.icon"></div>
            <span class="nav-label">{{ item.label }}</span>
            <span v-if="item.count !== undefined" class="nav-badge">{{ item.count }}</span>
          </div>
        </nav>

        <div class="sidebar-footer">
          <div class="nav-item logout" @click="handleLogout">
            <div class="nav-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <span class="nav-label">Logout</span>
          </div>
        </div>
      </aside>

      <!-- Main Content Area -->
      <div class="main-content">
        <!-- Dynamic Component Render -->
        <component 
          :is="currentComponent" 
          :key="currentView"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AdminDoctors from './AdminDoctors.vue'
// import AdminPatients from './AdminPatients.vue'
// import AdminAdmins from './AdminAdmins.vue'

export default {
  name: 'AdminDashboard',
  
  components: {
    AdminDoctors,
    // AdminPatients,
    // AdminAdmins
  },
  
  data() {
    return {
      currentView: 'doctors', // Default view
      adminName: 'Admin User',
      adminProfileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      
      menuItems: [
        {
          id: 1,
          view: 'doctors',
          label: 'Doctors Management',
          count: 0,
          icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0l-.34-.18-.003-.002a49.95 49.95 0 00-9.903-3.912.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                  <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                  <path d="M4.462 19.462c.42-.419.753-.89.99-1.394.237-.504.377-1.038.417-1.58a.75.75 0 00-.709-.796c-.375-.026-.75.013-1.124.04a5.56 5.56 0 00-2.077.442.75.75 0 00-.564.78c.014.643.093 1.283.237 1.909.144.626.352 1.234.618 1.816.237.54.568 1.01.991 1.428a.75.75 0 001.06-1.06z" />
                </svg>`
        },
        {
          id: 2,
          view: 'patients',
          label: 'Patients Management',
          count: 0,
          icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                </svg>`
        },
        {
          id: 3,
          view: 'admins',
          label: 'Admins Management',
          count: 0,
          icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clip-rule="evenodd" />
                </svg>`
        }
      ]
    }
  },
  
  computed: {
    currentComponent() {
      switch (this.currentView) {
        case 'doctors':
          return AdminDoctors
        // case 'patients':
        //   return AdminPatients
        // case 'admins':
        //   return AdminAdmins
        default:
          return AdminDoctors
      }
    }
  },
  
  mounted() {
    this.getAdminInfo()
  },
  
  methods: {
    navigateTo(view) {
      this.currentView = view
    },
    
    getAdminInfo() {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}')
      if (userData.firstName) {
        this.adminName = `${userData.firstName} ${userData.lastName || ''}`
      }
    },
    
    handleLogout() {
      localStorage.removeItem('authToken')
      localStorage.removeItem('userData')
      localStorage.removeItem('isAdmin')
      this.$router.push('/admin/login')
    }
  }
}
</script>

<!-- Keep all the styles from the previous version -->

<style scoped>
.admin-dashboard-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1f35 0%, #2d3748 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  position: relative;
  overflow: hidden;
}

.animated-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.02);
  animation: float 20s infinite linear;
}

.circle-1 {
  width: 400px;
  height: 400px;
  top: -200px;
  right: -200px;
  animation-delay: 0s;
}

.circle-2 {
  width: 300px;
  height: 300px;
  bottom: -150px;
  left: -150px;
  animation-delay: 10s;
}

.circle-3 {
  width: 200px;
  height: 200px;
  top: 30%;
  left: 20%;
  animation-delay: 5s;
}

.bg-pulse {
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.2) 100%);
  animation: pulse 4s infinite ease-in-out;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(-50px, 50px) rotate(90deg);
  }
  50% {
    transform: translate(0, 100px) rotate(180deg);
  }
  75% {
    transform: translate(50px, 50px) rotate(270deg);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(1.02);
  }
}

.dashboard-layout {
  display: flex;
  min-height: 100vh;
  position: relative;
  z-index: 1;
}

/* Sidebar Styles */
.admin-sidebar {
  width: 280px;
  background: rgba(26, 32, 44, 0.95);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 10;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo-icon.admin {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #4299e1 0%, #2b6cb0 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-icon.admin svg {
  width: 24px;
  height: 24px;
  color: white;
}

.sidebar-title {
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin: 0;
}

.sidebar-title span {
  background: linear-gradient(135deg, #667eea 0%, #4299e1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-left: 4px;
}

.admin-profile {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.admin-avatar {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  object-fit: cover;
  border: 3px solid #4299e1;
}

.admin-info h4 {
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.admin-role {
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  font-weight: 500;
}

.sidebar-nav {
  flex: 1;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: rgba(255, 255, 255, 0.7);
  position: relative;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-item.active {
  background: linear-gradient(135deg, #4299e1 0%, #2b6cb0 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(66, 153, 225, 0.3);
}

.nav-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-icon svg {
  width: 20px;
  height: 20px;
}

.nav-label {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
}

.nav-badge {
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  color: white;
}

.nav-item.active .nav-badge {
  background: rgba(255, 255, 255, 0.3);
}

.sidebar-footer {
  padding: 24px 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-item.logout {
  color: rgba(255, 255, 255, 0.7);
}

.nav-item.logout:hover {
  background: rgba(229, 62, 62, 0.1);
  color: #fc8181;
}

/* Main Content Area */
.main-content {
  flex: 1;
  margin-left: 280px;
  padding: 24px;
  position: relative;
  z-index: 2;
  min-height: 100vh;
}

@media (max-width: 1024px) {
  .admin-sidebar {
    width: 80px;
  }
  
  .sidebar-header {
    justify-content: center;
    padding: 24px 0;
  }
  
  .sidebar-title,
  .admin-info,
  .nav-label {
    display: none;
  }
  
  .admin-profile {
    justify-content: center;
  }
  
  .nav-item {
    justify-content: center;
  }
  
  .nav-badge {
    position: absolute;
    top: 4px;
    right: 4px;
  }
  
  .main-content {
    margin-left: 80px;
  }
}

@media (max-width: 768px) {
  .admin-sidebar {
    display: none;
  }
  
  .main-content {
    margin-left: 0;
  }
}
</style>