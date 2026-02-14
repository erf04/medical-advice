<template>
  <div class="doctor-panel-container">
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
        <div class="header-info">
          <h1 class="header-title">Doctor Dashboard</h1>
          <p class="header-subtitle">Manage your practice and consultations</p>
        </div>
        
        <div class="user-profile" @click="showProfileMenu = !showProfileMenu">
          <img :src="doctor?.profileImage || defaultDoctorImage" alt="Profile" class="profile-img">
          <div class="profile-menu" v-if="showProfileMenu" v-click-outside="() => showProfileMenu = false">
            <div class="menu-item" @click="goToProfile">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
              </svg>
              Dashboard
            </div>
            <div class="menu-item" @click="goToConsultants">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.786 0 011.019-4.38z" clip-rule="evenodd" />
              </svg>
              My Consultants
            </div>
            <div class="menu-item" @click="goToReviews">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
              </svg>
              My Reviews
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
    <div class="doctor-content">
      <div class="content-wrapper">
        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Loading your dashboard...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error-state">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
          </svg>
          <h3>Failed to load dashboard</h3>
          <p>{{ error }}</p>
          <button @click="retryLoading" class="retry-btn">Retry</button>
        </div>

        <!-- Main Content -->
        <template v-else>
          <!-- Stats Overview -->
          <div class="stats-overview">
            <div class="stat-card">
              <div class="stat-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="stat-info">
                <span class="stat-value">{{ stats.patientCount || 0 }}</span>
                <span class="stat-label">Total Patients</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="stat-info">
                <span class="stat-value">{{ stats.totalConsultations || 0 }}</span>
                <span class="stat-label">Consultations</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM9 7.5A.75.75 0 009 9h1.5c.98 0 1.813.626 2.122 1.5H9A.75.75 0 009 12h3.622a2.251 2.251 0 01-2.122 1.5H9a.75.75 0 00-.53 1.28l3 3a.75.75 0 001.06-1.06l-1.73-1.732A3.752 3.752 0 0014.175 12H15a.75.75 0 000-1.5h-.825A3.733 3.733 0 0013.5 9H15a.75.75 0 000-1.5H9z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="stat-info">
                <span class="stat-value">${{ formatNumber(stats.totalRevenue) }}</span>
                <span class="stat-label">Total Earnings</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="stat-info">
                <span class="stat-value">{{ formatNumber(stats.rating, 1) }}</span>
                <span class="stat-label">Average Rating</span>
              </div>
            </div>
          </div>

          <!-- Schedule Management Section -->
          <div class="schedule-section">
            <div class="section-header">
              <h3 class="section-title">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3a.75.75 0 011.5 0v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clip-rule="evenodd" />
                </svg>
                Weekly Schedule
              </h3>
              <button class="add-schedule-btn" @click="showAddScheduleModal = true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clip-rule="evenodd" />
                </svg>
                Add Time Slot
              </button>
            </div>

            <div class="schedule-grid">
              <div v-for="day in weekDays" :key="day.id" class="schedule-day-card">
                <div class="day-header">
                  <h4>{{ day.name }}</h4>
                  <span class="slot-count">{{ getScheduleCount(day.id) }} slots</span>
                </div>
                <div class="time-slots-list">
                  <div v-if="getScheduleSlots(day.id).length === 0" class="no-slots">
                    No time slots
                  </div>
                  <div v-else v-for="slot in getScheduleSlots(day.id)" :key="slot.id" class="time-slot-item">
                    <span>{{ slot.startTime }} - {{ slot.endTime }}</span>
                    <button class="delete-slot-btn" @click="deleteScheduleSlot(day.id, slot.id)" title="Delete slot">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.5-.058l-.346 9a.75.75 0 101.499.058l.347-9z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Two Column Layout -->
          <div class="doctor-columns">
            <!-- Left Column: Profile & Settings -->
            <div class="left-column">
              <!-- Doctor Profile Card -->
              <div class="profile-card">
                <div class="profile-header">
                  <div class="profile-avatar">
                    <img :src="doctor.profileImage || defaultDoctorImage" :alt="doctor.name">
                    <button class="change-avatar-btn" @click="changeAvatar">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                      </svg>
                    </button>
                  </div>
                  <div class="profile-info">
                    <h2 class="doctor-name">Dr. {{ doctor.firstName }} {{ doctor.lastName }}</h2>
                    <p class="doctor-specialty">{{ doctor.specialty }}</p>
                    <div class="verification-badge" v-if="doctor.isVerified">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                      </svg>
                      Verified Doctor
                    </div>
                  </div>
                </div>

                <div class="profile-details">
                  <div class="detail-row">
                    <span class="detail-label">Medical License:</span>
                    <span class="detail-value">{{ doctor.medicalCode || 'N/A' }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Email:</span>
                    <span class="detail-value">{{ doctor.email || 'N/A' }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Phone:</span>
                    <span class="detail-value">{{ doctor.phone || 'N/A' }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Experience:</span>
                    <span class="detail-value">{{ doctor.experience || 0 }} years</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Category:</span>
                    <span class="detail-value">{{ doctor.category?.title || 'Not specified' }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Fee:</span>
                    <span class="detail-value">{{ doctor.consultationPrice || 0 }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Comission Percent:</span>
                    <span class="detail-value">{{ doctor.commissionPercent || 0 }}%</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Status:</span>
                    <span class="detail-value" :class="{ 'active-status': doctor.isActive }">
                      {{ doctor.isActive ? 'Active' : 'Inactive' }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Practice Settings -->
              <div class="settings-card">
                <h3 class="section-title">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
                  </svg>
                  Practice Settings
                </h3>
                
                

                <div class="setting-item">
                  <div class="setting-info">
                    <h4>Maximum Concurrent Patients</h4>
                    <p>Maximum number of patients you can consult simultaneously</p>
                  </div>
                  <div class="setting-control">
                    <div class="number-input">
                      <button class="number-btn minus" @click="decreaseMaxPatients">-</button>
                      <input 
                        type="number" 
                        v-model="doctor.maxConcurrentConsultations"
                        min="1"
                        max="10"
                        @keyup.enter="updateMaxPatients"
                      />
                      <button class="number-btn plus" @click="increaseMaxPatients">+</button>
                    </div>
                    <button class="save-btn" @click="updateMaxPatients" :disabled="savingMaxPatients">
                      <span v-if="savingMaxPatients" class="save-spinner"></span>
                      <span v-else>Save</span>
                    </button>
                  </div>
                </div>

                

                
              </div>
            </div>

            <!-- Right Column: Wallet & Income -->
            <div class="right-column">
              <!-- Wallet Card -->
              <div class="wallet-card">
                <div class="wallet-header">
                  <h3 class="wallet-title">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M2.273 5.625A4.483 4.483 0 015.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 3H5.25a3 3 0 00-2.977 2.625zM2.273 8.625A4.483 4.483 0 015.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 6H5.25a3 3 0 00-2.977 2.625zM5.25 9a3 3 0 00-3 3v6a3 3 0 003 3h13.5a3 3 0 003-3v-6a3 3 0 00-3-3H15a.75.75 0 00-.75.75 2.25 2.25 0 01-4.5 0A.75.75 0 009 9H5.25z" />
                    </svg>
                    Doctor's Wallet
                  </h3>
                  <span class="wallet-id">ID: {{ doctor.walletId || 'N/A' }}</span>
                </div>
                
                <div class="wallet-balance">
                  <span class="balance-label">Current Balance</span>
                  <div class="balance-amount">
                    <span class="currency">$</span>
                    <span class="amount">{{ formatNumber(walletBalance) }}</span>
                  </div>
                </div>

                <div class="wallet-actions">
                  <button class="wallet-btn primary" @click="showWithdrawalConsultationsModalّFunct">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V6.75a.75.75 0 00-1.5 0v7.94l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z" clip-rule="evenodd" />
                    </svg>
                    Request Withdrawal
                  </button>
                  <button class="wallet-btn secondary" @click="viewWithdrawalHistory">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clip-rule="evenodd" />
                    </svg>
                    Withdrawal History
                  </button>
                </div>

                <div class="withdrawal-note">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
                  </svg>
                  <p>Withdrawal requests are sent to admin for approval. Processing takes 3-5 business days.</p>
                </div>
              </div>

              <!-- Transaction History -->
              <div class="income-history">
                <div class="section-header">
                  <h3 class="section-title">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clip-rule="evenodd" />
                      <path fill-rule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clip-rule="evenodd" />
                    </svg>
                    Transaction History
                  </h3>
                  <button class="view-all-btn" @click="viewAllTransactions">
                    View All
                  </button>
                </div>

                <div class="time-filter">
                  <button 
                    v-for="period in timePeriods" 
                    :key="period"
                    :class="['period-btn', { active: selectedPeriod === period }]"
                    @click="selectedPeriod = period"
                  >
                    {{ period }}
                  </button>
                </div>

                <div class="income-summary">
                  <div class="summary-card">
                    <span class="summary-label">Total Income</span>
                    <span class="summary-value">${{ formatNumber(incomeSummary.total) }}</span>
                  </div>
                  <div class="summary-card">
                    <span class="summary-label">Transactions</span>
                    <span class="summary-value">{{ incomeSummary.transactions }}</span>
                  </div>
                  <div class="summary-card">
                    <span class="summary-label">Avg. per Transaction</span>
                    <span class="summary-value">${{ formatNumber(incomeSummary.average) }}</span>
                  </div>
                </div>

                <div class="income-list">
                  <div v-if="filteredTransactions.length === 0" class="empty-income">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clip-rule="evenodd" />
                    </svg>
                    <p>No transactions for this period</p>
                  </div>

                  <div v-else>
                    <div 
                      v-for="transaction in filteredTransactions.slice(0, 5)" 
                      :key="transaction.id"
                      class="income-item"
                    >
                      <div class="income-info">
                        <h4 class="income-patient">{{ getTransactionType(transaction.type) }}</h4>
                        <p class="income-date">{{ formatDate(transaction.createdAt) }}</p>
                        <span class="income-type">{{ transaction.referenceType }}</span>
                      </div>
                      <div class="income-amount">
                        <span class="amount" :class="{ 'positive': transaction.type != 'DEPOSIT', 'negative': transaction.type === 'DEPOSIT' }">
                          {{ transaction.type === 'DEPOSIT' ? '-' : '+' }}${{ formatNumber(transaction.amount) }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Add Schedule Modal -->
    <div v-if="showAddScheduleModal" class="modal-overlay" @click.self="closeScheduleModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Add Time Slot</h3>
          <button class="modal-close" @click="closeScheduleModal">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div class="modal-body">
          <form @submit.prevent="addScheduleSlot">
            <div class="form-group">
              <label for="dayOfWeek">Day of Week <span class="required">*</span></label>
              <!-- In the Add Schedule Modal, update the select options -->
              <select id="dayOfWeek" v-model="newSchedule.dayOfWeek" required>
                <option value="">Select Day</option>
                <option v-for="day in weekDays" :key="day.id" :value="day.id.toString()">
                  {{ day.name }}
                </option>
              </select>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="startTime">Start Time <span class="required">*</span></label>
                <input 
                  type="time" 
                  id="startTime" 
                  v-model="newSchedule.startTime"
                  required
                />
              </div>
              
              <div class="form-group">
                <label for="endTime">End Time <span class="required">*</span></label>
                <input 
                  type="time" 
                  id="endTime" 
                  v-model="newSchedule.endTime"
                  required
                />
              </div>
            </div>
            
            <div class="modal-footer">
              <button type="button" class="modal-btn secondary" @click="closeScheduleModal">
                Cancel
              </button>
              <button type="submit" class="modal-btn primary" :disabled="savingSchedule">
                <span v-if="savingSchedule" class="spinner-small"></span>
                <span v-else>Add Slot</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Withdrawal Consultation Selection Modal -->
    <div v-if="showWithdrawalConsultationsModal" class="modal-overlay" @click.self="closeWithdrawalConsultationsModal">
      <div class="modal-content large">
        <div class="modal-header">
          <h3>Select Consultation for Withdrawal</h3>
          <button class="modal-close" @click="closeWithdrawalConsultationsModal">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div class="modal-body">
          <div v-if="loadingConsultations" class="loading-mini">
            <div class="spinner-small"></div>
            <span>Loading consultations...</span>
          </div>

          <div v-else-if="finishedConsultations.length === 0" class="empty-consultations">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
            </svg>
            <h3>No Finished Consultations</h3>
            <p>You don't have any finished consultations available for withdrawal.</p>
          </div>

          <div v-else class="consultations-list">
            <div 
              v-for="consultation in finishedConsultations" 
              :key="consultation.id"
              :class="['consultation-item', { selected: selectedWithdrawalConsultation?.id === consultation.id }]"
              @click="selectedWithdrawalConsultation = consultation"
            >
              <div class="consultation-info">
                <div class="patient-details">
                  <strong>{{ consultation.patient?.user?.firstName }} {{ consultation.patient?.user?.lastName }}</strong>
                  <span class="consultation-date">{{ formatJalaliDate(consultation.reservedDate) }}</span>
                </div>
                <div class="consultation-meta">
                  <span class="consultation-time">{{ consultation.startTime }} - {{ consultation.endTime }}</span>
                  <span class="consultation-subject">{{ consultation.subject }}</span>
                </div>
              </div>
              <div class="consultation-amount">
                <span class="amount">${{ formatNumber(consultation.price) }}</span>
                <span class="commission">Commission: {{ consultation.commissionPercent }}%</span>
              </div>
              <div class="consultation-selector">
                <div class="radio-circle" :class="{ selected: selectedWithdrawalConsultation?.id === consultation.id }"></div>
              </div>
            </div>
          </div>

          <div v-if="selectedWithdrawalConsultation" class="selected-summary">
            <h4>Selected Consultation</h4>
            <div class="summary-details">
              <div class="summary-row">
                <span>Patient:</span>
                <strong>{{ selectedWithdrawalConsultation.patient?.user?.firstName }} {{ selectedWithdrawalConsultation.patient?.user?.lastName }}</strong>
              </div>
              <div class="summary-row">
                <span>Amount:</span>
                <strong>${{ formatNumber(selectedWithdrawalConsultation.price) }}</strong>
              </div>
              <div class="summary-row">
                <span>Commission:</span>
                <strong>{{ selectedWithdrawalConsultation.commissionPercent }}%</strong>
              </div>
              <div class="summary-row total">
                <span>You'll receive:</span>
                <strong class="net-amount">
                  ${{ formatNumber(selectedWithdrawalConsultation.price * (1 - selectedWithdrawalConsultation.commissionPercent / 100)) }}
                </strong>
              </div>
            </div>
          </div>
          
          <div class="modal-footer">
            <button type="button" class="modal-btn secondary" @click="closeWithdrawalConsultationsModal">
              Cancel
            </button>
            <button 
              type="button" 
              class="modal-btn primary" 
              :disabled="!selectedWithdrawalConsultation || processingWithdrawal"
              @click="requestSettlement"
            >
              <span v-if="processingWithdrawal" class="spinner-small"></span>
              <span v-else>Request Withdrawal</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="modal-overlay" @click.self="showSuccessModal = false">
      <div class="modal-content success-modal">
        <div class="modal-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
          </svg>
        </div>
        <h3>Withdrawal Request Submitted!</h3>
        <p>Your request has been sent to admin for approval.</p>
        
        <div v-if="selectedWithdrawalConsultation" class="withdrawal-details-modal">
          <div class="detail-row">
            <span>Consultation ID:</span>
            <strong>{{ selectedWithdrawalConsultation.id }}</strong>
          </div>
          <div class="detail-row">
            <span>Amount:</span>
            <strong class="amount">${{ formatNumber(selectedWithdrawalConsultation.price) }}</strong>
          </div>
          <div class="detail-row">
            <span>You'll receive:</span>
            <strong class="balance">${{ formatNumber(selectedWithdrawalConsultation.price * (1 - selectedWithdrawalConsultation.commissionPercent / 100)) }}</strong>
          </div>
        </div>
        
        <div class="modal-actions">
          <button class="modal-btn primary" @click="showSuccessModal = false">
            Close
          </button>
        </div>
        
        <p class="modal-note">
          You will receive a notification once your request is approved by admin.
          Processing time is 3-5 business days.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment-jalaali';

export default {
  name: 'DoctorPanel',
  
  data() {
    return {
      loading: true,
      error: null,
      showProfileMenu: false,
      selectedPeriod: 'Today',
      showAddScheduleModal: false,
      savingSchedule: false,
      
      // Withdrawal
      showWithdrawalConsultationsModal: false,
      loadingConsultations: false,
      consultations: [],
      selectedWithdrawalConsultation: null,
      processingWithdrawal: false,
      
      // Success modal
      showSuccessModal: false,
      
      // API Configuration
      apiBaseUrl: 'http://localhost:8000',
      doctorId: null,
      
      // Doctor data with default values
      doctor: {
        consultationPrice: 0,
        maxConcurrentConsultations: 1,
        consultationDuration: 30,
        isActive: false,
        firstName: '',
        lastName: '',
        specialty: '',
        medicalCode: '',
        email: '',
        phone: '',
        experience: 0,
        category: null,
        profileImage: null,
        isVerified: false,
        walletId: null
      },
      
      // Schedule data
      schedules: {},
      
      // Wallet data
      walletBalance: 0,
      transactions: [],
      
      stats: {
        totalPatients: 0,
        totalConsultations: 0,
        totalEarnings: 0,
        rating: 0
      },
      
      // New schedule form
      newSchedule: {
        dayOfWeek: 0,
        startTime: '',
        endTime: ''
      },
      
      // Settings
      durationOptions: [15, 30, 45, 60],
      savingConsultationPrice: false,
      savingMaxPatients: false,
      savingConsultationDuration: false,
      savingAvailability: false,
      
      // Quick amounts for withdrawal (keeping for compatibility)
      withdrawalQuickAmounts: [100, 250, 500, 1000],
      
      // Time periods for filtering
      timePeriods: ['Today', 'Week', 'Month', 'Year', 'All'],
      
      // Default images
      defaultDoctorImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      
      // Week days mapping (0 = Saturday)
      weekDays: [
        { id: 0, name: 'Saturday' },
        { id: 1, name: 'Sunday' },
        { id: 2, name: 'Monday' },
        { id: 3, name: 'Tuesday' },
        { id: 4, name: 'Wednesday' },
        { id: 5, name: 'Thursday' },
        { id: 6, name: 'Friday' }
      ]
    }
  },
  
  computed: {
    incomeSummary() {
      const filtered = this.filteredTransactions
      const total = filtered.reduce((sum, tx) => sum + (parseFloat(tx.amount) || 0), 0)
      const average = filtered.length > 0 ? total / filtered.length : 0
      
      return {
        total,
        transactions: filtered.length,
        average
      }
    },
    
    filteredTransactions() {
      const now = new Date()
      let startDate = new Date()
      
      switch(this.selectedPeriod) {
        case 'Today':
          startDate.setHours(0, 0, 0, 0)
          break
        case 'Week':
          startDate.setDate(now.getDate() - 7)
          break
        case 'Month':
          startDate.setMonth(now.getMonth() - 1)
          break
        case 'Year':
          startDate.setFullYear(now.getFullYear() - 1)
          break
        case 'All':
          return this.transactions
      }
      
      return this.transactions.filter(tx => {
        const txDate = new Date(tx.createdAt)
        return txDate >= startDate
      })
    },
    
    finishedConsultations() {
      return this.consultations.filter(c => c.status === 'FINISHED')
    }
  },
  
  async mounted() {
    await this.loadDashboardData()
  },
  
  methods: {
    async loadDashboardData() {
      this.loading = true
      this.error = null
      
      try {
        // Get doctor ID from user data
        const userid = JSON.parse(localStorage.getItem('userId') || '{}')
        this.doctorId = userid
        
        await Promise.all([
          this.fetchDoctorData(),
          this.fetchWalletBalance(),
          this.fetchTransactions()
        ])
      } catch (err) {
        console.error('Error loading dashboard data:', err)
        this.error = err.message || 'Failed to load dashboard data'
      } finally {
        this.loading = false
      }
    },
    
    retryLoading() {
      this.loadDashboardData()
    },
    
    async fetchDoctorData() {
      try {
        const authToken = localStorage.getItem('authToken')
        
        if (!authToken) {
          throw new Error('Authentication required')
        }
        console.log(this.doctorId);
        const response = await fetch(`${this.apiBaseUrl}/doctors/${this.doctorId}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        })
        
        if (!response.ok) {
          throw new Error('Failed to fetch doctor data')
        }
        console.log(123)
        const data = await response.json();
        console.log(5678)
        this.doctor = {
          id: data.id,
          firstName: data.user?.firstName || '',
          lastName: data.user?.lastName || '',
          email: data.user?.email || '',
          phone: data.user?.phone || '',
          profileImage: data.user?.profileImage || this.defaultDoctorImage,
          medicalCode: data.medicalCode || 'N/A',
          contactInfo: data.contactInfo || 'N/A',
          isActive: data.isActive || false,
          maxConcurrentConsultations: data.maxConcurrentConsultations || 1,
          consultationPrice: data.consultationPrice || 0,
          category: data.category || 'Not specified',
          commissionPercent: data.commissionPercent || 0,
          isVerified: !!data.medicalCode,
          experience: this.calculateExperience(data.user?.createdAt),
          specialty: data.category?.title || 'General Medicine',
          walletId: `DR-${data.id}`
        }
        
        // Store schedules
        this.schedules = data.schedules || {}
        
        // Update stats
        this.stats = {
          totalPatients: data.patientCount || 0,
          totalConsultations: data.consultationCount || 0,
          totalEarnings: this.calculateTotalEarnings(),
          rating: data.averageRating || 0
        }
        
      } catch (err) {
        console.error('Error fetching doctor dataaaaaaaaa:', err)
        throw new Error('Failed to load doctor information')
      }
    },
    
    async fetchWalletBalance() {
      try {
        const authToken = localStorage.getItem('authToken')
        
        const response = await fetch(`${this.apiBaseUrl}/wallet/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        })
        
        if (!response.ok) {
          throw new Error('Failed to fetch wallet balance')
        }
        
        const data = await response.json()
        this.walletBalance = parseFloat(data.balance) || 0
        
      } catch (err) {
        console.error('Error fetching wallet balance:', err)
        // Don't throw, just log error
      }
    },
    
    async fetchTransactions() {
      try {
        const authToken = localStorage.getItem('authToken')
        
        const response = await fetch(`${this.apiBaseUrl}/wallet/transactions/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        })
        
        if (!response.ok) {
          throw new Error('Failed to fetch transactions')
        }
        
        const data = await response.json()
        this.transactions = data || []
        
      } catch (err) {
        console.error('Error fetching transactions:', err)
        this.transactions = []
      }
    },
    
    async fetchConsultations() {
      this.loadingConsultations = true
      
      try {
        const authToken = localStorage.getItem('authToken')
        
        const response = await fetch(`${this.apiBaseUrl}/doctor/consultations/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        })
        
        if (!response.ok) {
          throw new Error('Failed to fetch consultations')
        }
        
        const data = await response.json()
        console.log(data)
        this.consultations = data || []
        
      } catch (err) {
        console.error('Error fetching consultations:', err)
        alert('Failed to load consultations. Please try again.')
      } finally {
        this.loadingConsultations = false
      }
    },
    
    async requestSettlement() {
      if (!this.selectedWithdrawalConsultation) return
      
      this.processingWithdrawal = true
      
      try {
        const authToken = localStorage.getItem('authToken')
        const consultationId = this.selectedWithdrawalConsultation.id
        
        const response = await fetch(`${this.apiBaseUrl}/settlements/${consultationId}/request-settlement/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        })
        
        if (!response.ok) {
          throw new Error('Failed to request withdrawal')
        }
        
        // Update local wallet balance
        const amount = this.selectedWithdrawalConsultation.price
        this.walletBalance -= amount
        
        // Close modal and show success
        this.showWithdrawalConsultationsModal = false
        this.showSuccessModal = true
        
      } catch (err) {
        console.error('Error requesting withdrawal:', err)
        alert('Failed to submit withdrawal request. Please try again.')
      } finally {
        this.processingWithdrawal = false
      }
    },
    
    async updateMaxPatients() {
      if (this.savingMaxPatients) return
      
      this.savingMaxPatients = true
      try {
        const authToken = localStorage.getItem('authToken')
        
        const response = await fetch(`${this.apiBaseUrl}/doctors/profile/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({
            maxConcurrentConsultations: this.doctor.maxConcurrentConsultations
          })
        })
        
        if (!response.ok) {
          throw new Error('Failed to update max patients')
        }
        
        alert('Maximum concurrent patients updated successfully!')
      } catch (err) {
        console.error('Error updating max patients:', err)
        alert('Failed to update maximum patients')
      } finally {
        this.savingMaxPatients = false
      }
    },
    
    async updateConsultationPrice() {
      if (this.savingConsultationPrice) return
      
      this.savingConsultationPrice = true
      try {
        const authToken = localStorage.getItem('authToken')
        
        const response = await fetch(`${this.apiBaseUrl}/doctors/profile/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({
            consultationPrice: this.doctor.consultationPrice
          })
        })
        
        if (!response.ok) {
          throw new Error('Failed to update consultation price')
        }
        
        alert('Consultation price updated successfully!')
      } catch (err) {
        console.error('Error updating consultation price:', err)
        alert('Failed to update consultation price')
      } finally {
        this.savingConsultationPrice = false
      }
    },
    
    async updateAvailability() {
      if (this.savingAvailability) return
      
      this.savingAvailability = true
      try {
        const authToken = localStorage.getItem('authToken')
        
        const response = await fetch(`${this.apiBaseUrl}/doctors/profile/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({
            isActive: this.doctor.isActive
          })
        })
        
        if (!response.ok) {
          throw new Error('Failed to update availability')
        }
        
        alert(`You are now ${this.doctor.isActive ? 'available' : 'not available'} for consultations`)
      } catch (err) {
        console.error('Error updating availability:', err)
        alert('Failed to update availability')
        this.doctor.isActive = !this.doctor.isActive
      } finally {
        this.savingAvailability = false
      }
    },
    
    async addScheduleSlot() {
      if(!this.newSchedule.dayOfWeek){
        this.newSchedule.dayOfWeek = '0'
      }
  if (!this.newSchedule.startTime || !this.newSchedule.endTime) return
  
  this.savingSchedule = true
  
  try {
    const authToken = localStorage.getItem('authToken')
    if(!this.newSchedule.dayOfWeek){
        this.newSchedule.dayOfWeek = '0'
      }
    // Parse the dayOfWeek as integer - it's a string now
    const dayOfWeekValue = parseInt(this.newSchedule.dayOfWeek, 10);
    
    // Validate that it's a number between 0-6
    if (isNaN(dayOfWeekValue) || dayOfWeekValue < 0 || dayOfWeekValue > 6) {
      throw new Error('Invalid day of week');
    }
    
    console.log('Selected day:', this.newSchedule.dayOfWeek);
    console.log('Parsed day value:', dayOfWeekValue);
    
    const response = await fetch(`${this.apiBaseUrl}/doctors/schedule/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        dayOfWeek: dayOfWeekValue, // Send as number
        startTime: this.newSchedule.startTime,
        endTime: this.newSchedule.endTime
      })
    })
    
    if (!response.ok) {
      throw new Error('Failed to add schedule slot')
    }
    
    const newSlot = await response.json()
    
    // Add to local schedules - use string key for consistency
    const dayKey = dayOfWeekValue.toString()
    if (!this.schedules[dayKey]) {
      this.schedules[dayKey] = []
    }
    this.schedules[dayKey].push(newSlot)
    
    this.closeScheduleModal()
    alert('Time slot added successfully!')
    
  } catch (err) {
    console.error('Error adding schedule slot:', err)
    alert('Failed to add time slot')
  } finally {
    this.savingSchedule = false
  }
},
    
    async deleteScheduleSlot(dayOfWeek, slotId) {
      if (!confirm('Are you sure you want to delete this time slot?')) return
      
      try {
        const authToken = localStorage.getItem('authToken')
        
        const response = await fetch(`${this.apiBaseUrl}/doctors/schedule/${slotId}/`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        })
        
        if (!response.ok) {
          throw new Error('Failed to delete schedule slot')
        }
        
        // Remove from local schedules
        const dayKey = dayOfWeek.toString()
        if (this.schedules[dayKey]) {
          this.schedules[dayKey] = this.schedules[dayKey].filter(slot => slot.id !== slotId)
        }
        
        alert('Time slot deleted successfully!')
        
      } catch (err) {
        console.error('Error deleting schedule slot:', err)
        alert('Failed to delete time slot')
      }
    },
    
    getScheduleCount(dayOfWeek) {
      return this.schedules[dayOfWeek.toString()]?.length || 0
    },
    
    getScheduleSlots(dayOfWeek) {
      return this.schedules[dayOfWeek.toString()] || []
    },
    
    getTransactionType(type) {
      const types = {
        'CONSULTATION_PAY': 'Consultation Payment',
        'DEPOSIT': 'Wallet Deposit',
        'WITHDRAWAL': 'Withdrawal'
      }
      return types[type] || type
    },
    
    calculateExperience(createdAt) {
      if (!createdAt) return 0
      const start = new Date(createdAt)
      const now = new Date()
      const years = now.getFullYear() - start.getFullYear()
      return Math.max(0, years)
    },
    
    calculateTotalEarnings() {
      return this.transactions
        .filter(tx => tx.type === 'CONSULTATION_PAY')
        .reduce((sum, tx) => sum + parseFloat(tx.amount), 0)
    },
    
    formatNumber(value, decimals = 2) {
      if (value === null || value === undefined || isNaN(value)) {
        return '0.00'
      }
      return parseFloat(value).toFixed(decimals)
    },
    
    formatDate(date) {
      if (!date) return 'N/A'
      
      try {
        return moment(date).format('MMM D, YYYY • HH:mm')
      } catch (err) {
        return 'N/A'
      }
    },
    
    formatJalaliDate(dateString) {
      if (!dateString) return 'N/A'
      const [year, month, day] = dateString.split('-').map(Number)
      return moment(`${year}/${month}/${day}`, 'jYYYY/jM/jD').format('jYYYY/jMM/jDD')
    },
    
    // Schedule Methods
    increaseMaxPatients() {
      if (this.doctor.maxConcurrentConsultations < 10) {
        this.doctor.maxConcurrentConsultations++
      }
    },
    
    decreaseMaxPatients() {
      if (this.doctor.maxConcurrentConsultations > 1) {
        this.doctor.maxConcurrentConsultations--
      }
    },
    
    updateConsultationDuration() {
      if (this.savingConsultationDuration) return
      
      this.savingConsultationDuration = true
      setTimeout(() => {
        alert('Consultation duration updated successfully!')
        this.savingConsultationDuration = false
      }, 800)
    },
    
    // Schedule Modal
    closeScheduleModal() {
      this.showAddScheduleModal = false
      this.newSchedule = {
        dayOfWeek: '',
        startTime: '',
        endTime: ''
      }
    },
    
    // Withdrawal Methods
    showWithdrawalConsultationsModalّFunct() {
      this.showWithdrawalConsultationsModal = true
      this.selectedWithdrawalConsultation = null
      this.fetchConsultations()
    },
    
    closeWithdrawalConsultationsModal() {
      this.showWithdrawalConsultationsModal = false
      this.selectedWithdrawalConsultation = null
    },
    
    // Navigation Methods
    goToDashboard() {
      // Already on dashboard
    },
    
    goToNews() {
      this.$router.push('/doctor/news')
    },
    
    goToMyConsultants() {
      this.$router.push('/doctor/consultants')
    },
    
    goToReviews() {
      this.$router.push('/myreviews')
    },
    
    viewAllTransactions() {
      this.$router.push('/doctor/transactions')
    },
    
    viewWithdrawalHistory() {
      this.$router.push('/doctor/withdrawal-history')
    },
    
    changeAvatar() {
      alert('Avatar change functionality coming soon!')
    },
    
    goToProfile() {
      this.showProfileMenu = false
    },
    
    goToConsultants() {
      this.$router.push('/myconsultants')
    },
    
    handleLogout() {
      localStorage.removeItem('authToken')
      localStorage.removeItem('userData')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
/* Add these new styles for the withdrawal modal */
.consultations-list {
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.consultation-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: white;
}

.consultation-item:hover {
  border-color: #cbd5e0;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.consultation-item.selected {
  border-color: #667eea;
  background: #f7f9fc;
}

.consultation-info {
  flex: 1;
}

.patient-details {
  margin-bottom: 4px;
}

.patient-details strong {
  font-size: 15px;
  color: #2d3748;
  margin-right: 12px;
}

.consultation-date {
  font-size: 13px;
  color: #718096;
}

.consultation-meta {
  display: flex;
  gap: 12px;
}

.consultation-time {
  font-size: 12px;
  color: #667eea;
  font-weight: 600;
}

.consultation-subject {
  font-size: 12px;
  color: #718096;
}

.consultation-amount {
  text-align: right;
  margin-right: 16px;
}

.consultation-amount .amount {
  display: block;
  font-size: 18px;
  font-weight: 700;
  color: #48bb78;
}

.consultation-amount .commission {
  font-size: 11px;
  color: #718096;
}

.consultation-selector {
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.radio-circle {
  width: 20px;
  height: 20px;
  border: 2px solid #e2e8f0;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.radio-circle.selected {
  border-color: #667eea;
  background: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

.selected-summary {
  background: #f7f9fc;
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
}

.selected-summary h4 {
  font-size: 16px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 16px;
}

.summary-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
  border-bottom: 1px solid #e2e8f0;
}

.summary-row.total {
  border-bottom: none;
  padding-top: 8px;
  font-size: 16px;
}

.net-amount {
  color: #48bb78;
  font-size: 20px;
}

.empty-consultations {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.empty-consultations svg {
  width: 60px;
  height: 60px;
  color: #cbd5e0;
  margin-bottom: 16px;
}

.empty-consultations h3 {
  font-size: 18px;
  color: #2d3748;
  margin-bottom: 8px;
}

.empty-consultations p {
  font-size: 14px;
  color: #718096;
  margin: 0;
}


/* Add these new styles */
.schedule-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 32px;
  margin-bottom: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.schedule-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 24px;
}

.schedule-day-card {
  background: #f7f9fc;
  border-radius: 16px;
  padding: 20px;
  border: 2px solid #e2e8f0;
  transition: all 0.3s ease;
}

.schedule-day-card:hover {
  transform: translateY(-2px);
  border-color: #cbd5e0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.day-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e2e8f0;
}

.day-header h4 {
  font-size: 16px;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
}

.slot-count {
  padding: 4px 10px;
  background: #667eea;
  color: white;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
}

.time-slots-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 100px;
  max-height: 200px;
  overflow-y: auto;
}

.time-slots-list::-webkit-scrollbar {
  width: 4px;
}

.time-slots-list::-webkit-scrollbar-track {
  background: #e2e8f0;
  border-radius: 2px;
}

.time-slots-list::-webkit-scrollbar-thumb {
  background: #a0aec0;
  border-radius: 2px;
}

.time-slot-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 13px;
  color: #2d3748;
  transition: all 0.2s ease;
}

.time-slot-item:hover {
  border-color: #cbd5e0;
}

.delete-slot-btn {
  width: 28px;
  height: 28px;
  background: #f7f9fc;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #718096;
}

.delete-slot-btn:hover {
  background: #fed7d7;
  border-color: #fc8181;
  color: #e53e3e;
}

.delete-slot-btn svg {
  width: 14px;
  height: 14px;
}

.no-slots {
  padding: 16px;
  text-align: center;
  color: #a0aec0;
  font-size: 13px;
  font-style: italic;
}

.add-schedule-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.add-schedule-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.add-schedule-btn svg {
  width: 18px;
  height: 18px;
}

.active-status {
  color: #48bb78 !important;
  font-weight: 600;
}

.amount.positive {
  color: #48bb78;
}

.amount.negative {
  color: #667eea;
}

/* Rest of your existing styles remain the same */
/* ... (keep all your existing styles from your original file) ... */

/* Header Styles */
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
    flex-wrap: wrap;
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

.header-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.header-action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: #f7f9fc;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.header-action-btn:hover {
  background: #edf2f7;
  border-color: #cbd5e0;
  color: #667eea;
}

.header-action-btn svg {
  width: 14px;
  height: 14px;
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

/* Base Styles */
.doctor-panel-container {
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
.doctor-content {
  position: relative;
  z-index: 1;
  padding: 24px 24px 60px;
  margin-top: 0;
}

@media (max-width: 768px) {
  .doctor-content {
    padding: 16px 16px 40px;
  }
}

.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
}

/* Stats Overview */
.stats-overview {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}

@media (max-width: 1024px) {
  .stats-overview {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .stats-overview {
    grid-template-columns: 1fr;
  }
}

.stat-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon svg {
  width: 24px;
  height: 24px;
  color: white;
}

.stat-info {
  flex: 1;
}

.stat-value {
  display: block;
  font-size: 28px;
  font-weight: 800;
  color: #2d3748;
  line-height: 1.2;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #718096;
  font-weight: 500;
}

/* Two Column Layout */
.doctor-columns {
  display: grid;
  grid-template-columns: 1fr 500px;
  gap: 32px;
}

@media (max-width: 1200px) {
  .doctor-columns {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

/* Left Column */
.left-column {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Profile Card */
.profile-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.profile-header {
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
}

.profile-avatar {
  position: relative;
  width: 100px;
  height: 100px;
  flex-shrink: 0;
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  object-fit: cover;
  border: 4px solid #667eea;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.change-avatar-btn {
  position: absolute;
  bottom: -8px;
  right: -8px;
  width: 32px;
  height: 32px;
  background: #667eea;
  border: 3px solid white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.change-avatar-btn:hover {
  background: #5a67d8;
  transform: scale(1.1);
}

.change-avatar-btn svg {
  width: 14px;
  height: 14px;
  color: white;
}

.profile-info {
  flex: 1;
}

.doctor-name {
  font-size: 28px;
  font-weight: 800;
  color: #2d3748;
  margin: 0 0 8px 0;
  line-height: 1.2;
}

.doctor-specialty {
  font-size: 16px;
  color: #667eea;
  font-weight: 600;
  margin: 0 0 16px 0;
}

.verification-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #c6f6d5;
  color: #22543d;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
}

.verification-badge svg {
  width: 14px;
  height: 14px;
}

.profile-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #e2e8f0;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-label {
  font-size: 14px;
  color: #718096;
  font-weight: 500;
}

.detail-value {
  font-size: 15px;
  color: #2d3748;
  font-weight: 600;
  text-align: right;
}

/* Settings Card */
.settings-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 24px 0;
}

.section-title svg {
  width: 20px;
  height: 20px;
  color: #667eea;
}

.setting-item {
  padding: 24px 0;
  border-bottom: 1px solid #e2e8f0;
}

.setting-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.setting-info {
  margin-bottom: 16px;
}

.setting-info h4 {
  font-size: 16px;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 6px 0;
}

.setting-info p {
  font-size: 14px;
  color: #718096;
  margin: 0;
  line-height: 1.5;
}

.setting-control {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.price-input {
  display: flex;
  align-items: center;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  background: white;
}

.price-input .currency {
  padding: 0 12px;
  font-size: 16px;
  font-weight: 600;
  color: #667eea;
  background: #f7f9fc;
  height: 44px;
  display: flex;
  align-items: center;
  border-right: 2px solid #e2e8f0;
}

.price-input input {
  width: 100px;
  padding: 0 12px;
  border: none;
  font-size: 18px;
  font-weight: 600;
  color: #2d3748;
  background: white;
  height: 44px;
}

.price-input input:focus {
  outline: none;
}

.number-input {
  display: flex;
  align-items: center;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  overflow: hidden;
  background: white;
}

.number-btn {
  width: 40px;
  height: 44px;
  background: #f7f9fc;
  border: none;
  font-size: 18px;
  font-weight: 600;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.number-btn:hover {
  background: #edf2f7;
  color: #667eea;
}

.number-btn.minus {
  border-right: 2px solid #e2e8f0;
}

.number-btn.plus {
  border-left: 2px solid #e2e8f0;
}

.number-input input {
  width: 60px;
  padding: 0 12px;
  border: none;
  font-size: 18px;
  font-weight: 600;
  color: #2d3748;
  background: white;
  height: 44px;
  text-align: center;
}

.number-input input:focus {
  outline: none;
}

.duration-options {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.duration-btn {
  padding: 8px 16px;
  background: #f7f9fc;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s ease;
}

.duration-btn:hover {
  background: #edf2f7;
  border-color: #cbd5e0;
}

.duration-btn.active {
  background: #667eea;
  border-color: #667eea;
  color: white;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #cbd5e0;
  transition: .4s;
  border-radius: 34px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 22px;
  width: 22px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: #48bb78;
}

input:checked + .toggle-slider:before {
  transform: translateX(30px);
}

.status-text {
  font-size: 14px;
  font-weight: 600;
  color: #4a5568;
  margin-left: 12px;
}

.save-btn {
  padding: 10px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.save-btn:hover {
  background: #5a67d8;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

/* Right Column */
.right-column {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Wallet Card */
.wallet-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 28px;
  color: white;
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;
}

.wallet-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.wallet-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
}

.wallet-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  color: white;
}

.wallet-title svg {
  width: 22px;
  height: 22px;
}

.wallet-id {
  font-size: 12px;
  opacity: 0.9;
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 10px;
  border-radius: 12px;
}

.wallet-balance {
  margin-bottom: 32px;
  position: relative;
  z-index: 1;
}

.balance-label {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 8px;
  display: block;
}

.balance-amount {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-bottom: 8px;
}

.currency {
  font-size: 24px;
  font-weight: 600;
}

.amount {
  font-size: 48px;
  font-weight: 800;
  line-height: 1;
}

.balance-note {
  font-size: 14px;
  opacity: 0.8;
  font-style: italic;
}

.wallet-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 28px;
  position: relative;
  z-index: 1;
}

.wallet-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.wallet-btn.primary {
  background: white;
  color: #667eea;
}

.wallet-btn.primary:hover {
  background: #f7f9fc;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.2);
}

.wallet-btn.secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  backdrop-filter: blur(10px);
}

.wallet-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.wallet-btn svg {
  width: 18px;
  height: 18px;
}

.withdrawal-info {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(10px);
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.info-row:last-child {
  border-bottom: none;
}

.info-row .info-label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

.info-row .info-value {
  font-size: 14px;
  color: white;
  font-weight: 600;
}

.info-row .info-value.success {
  color: #c6f6d5;
}

.withdrawal-note {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(10px);
}

.withdrawal-note svg {
  width: 18px;
  height: 18px;
  color: #c6f6d5;
  flex-shrink: 0;
  margin-top: 2px;
}

.withdrawal-note p {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  line-height: 1.5;
}

/* Income History */
.income-history {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.view-all-btn {
  padding: 8px 16px;
  background: #f7f9fc;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-all-btn:hover {
  background: #edf2f7;
  border-color: #cbd5e0;
  color: #667eea;
}

.time-filter {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.period-btn {
  padding: 8px 16px;
  background: #f7f9fc;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s ease;
}

.period-btn:hover {
  background: #edf2f7;
  border-color: #cbd5e0;
}

.period-btn.active {
  background: #667eea;
  border-color: #667eea;
  color: white;
}

.income-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}

@media (max-width: 768px) {
  .income-summary {
    grid-template-columns: 1fr;
  }
}

.summary-card {
  background: #f7f9fc;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  border: 1px solid #e2e8f0;
}

.summary-label {
  display: block;
  font-size: 12px;
  color: #718096;
  font-weight: 500;
  margin-bottom: 8px;
}

.summary-value {
  display: block;
  font-size: 18px;
  font-weight: 700;
  color: #2d3748;
}

.income-list {
  max-height: 400px;
  overflow-y: auto;
  padding-right: 8px;
}

.income-list::-webkit-scrollbar {
  width: 6px;
}

.income-list::-webkit-scrollbar-track {
  background: #f7f9fc;
  border-radius: 3px;
}

.income-list::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 3px;
}

.income-list::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}

.empty-income {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
}

.empty-income svg {
  width: 48px;
  height: 48px;
  color: #cbd5e0;
  margin-bottom: 16px;
}

.empty-income p {
  font-size: 14px;
  color: #718096;
  margin: 0;
}

.income-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: white;
  border-radius: 12px;
  margin-bottom: 12px;
  border: 2px solid #e2e8f0;
  transition: all 0.2s ease;
}

.income-item:hover {
  border-color: #cbd5e0;
  transform: translateY(-2px);
}

.income-item:last-child {
  margin-bottom: 0;
}

.income-info {
  flex: 1;
}

.income-patient {
  font-size: 15px;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 4px 0;
}

.income-date {
  font-size: 13px;
  color: #718096;
  margin: 0 0 6px 0;
}

.income-type {
  display: inline-block;
  padding: 3px 8px;
  background: #f7f9fc;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  color: #4a5568;
}

.income-amount {
  text-align: right;
}

.income-amount .amount {
  display: block;
  font-size: 18px;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 4px;
}

.status-badge {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
}

.status-badge.completed {
  background: #c6f6d5;
  color: #22543d;
}

.status-badge.pending {
  background: #fed7d7;
  color: #742a2a;
}

/* Modal Styles (same as previous) */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
  animation: modalSlideIn 0.3s ease;
  max-height: 90vh;
  overflow-y: auto;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 0 24px;
  margin-bottom: 20px;
}

.modal-header h3 {
  font-size: 20px;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
}

.modal-close {
  width: 36px;
  height: 36px;
  background: #f7f9fc;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modal-close:hover {
  background: #edf2f7;
  border-color: #cbd5e0;
}

.modal-close svg {
  width: 18px;
  height: 18px;
  color: #4a5568;
}

.modal-body {
  padding: 0 24px;
}

.available-balance {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #f7f9fc;
  border-radius: 12px;
  margin-bottom: 24px;
  font-size: 15px;
  color: #4a5568;
}

.available-balance strong {
  font-size: 18px;
  color: #667eea;
  font-weight: 700;
}

.amount-input-section {
  margin-bottom: 24px;
}

.amount-input-section label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 12px;
}

.amount-input {
  display: flex;
  align-items: center;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.amount-input:focus-within {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.amount-input.error {
  border-color: #e53e3e;
}

.currency-symbol {
  padding: 0 16px;
  font-size: 24px;
  font-weight: 700;
  color: #667eea;
  background: #f7f9fc;
  height: 60px;
  display: flex;
  align-items: center;
  border-right: 2px solid #e2e8f0;
}

.amount-input input {
  flex: 1;
  padding: 0 16px;
  border: none;
  font-size: 32px;
  font-weight: 700;
  color: #2d3748;
  background: white;
  height: 60px;
  min-width: 0;
}

.amount-input input:focus {
  outline: none;
}

.amount-input input::placeholder {
  color: #cbd5e0;
}

.error-message {
  font-size: 12px;
  color: #e53e3e;
  margin-top: 8px;
  font-weight: 500;
}

.quick-amounts {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 16px;
}

.quick-amount-btn {
  padding: 10px 16px;
  background: #f7f9fc;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quick-amount-btn:hover {
  background: #edf2f7;
  border-color: #cbd5e0;
}

.quick-amount-btn:active {
  background: #667eea;
  border-color: #667eea;
  color: white;
}

.quick-amount-btn.full {
  background: #bee3f8;
  border-color: #90cdf4;
  color: #2c5282;
}

.payment-method {
  margin-bottom: 24px;
}

.payment-method h4 {
  font-size: 16px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 16px;
}

.payment-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.payment-option {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.payment-option:hover {
  border-color: #cbd5e0;
  transform: translateY(-2px);
}

.payment-option.selected {
  border-color: #667eea;
  background: #f7f9fc;
}

.payment-icon {
  width: 40px;
  height: 40px;
  background: #f7f9fc;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.payment-icon svg {
  width: 20px;
  height: 20px;
  color: #667eea;
}

.payment-info {
  flex: 1;
}

.payment-info h6 {
  font-size: 15px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 4px;
}

.payment-info p {
  font-size: 13px;
  color: #718096;
  margin: 0;
}

.payment-check {
  width: 24px;
  height: 24px;
  background: #667eea;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.payment-check svg {
  width: 14px;
  height: 14px;
  color: white;
}

.withdrawal-summary {
  background: #f7f9fc;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #e2e8f0;
  font-size: 14px;
  color: #4a5568;
}

.summary-row:last-child {
  border-bottom: none;
}

.summary-row.total {
  font-size: 16px;
  font-weight: 600;
  color: #2d3748;
  padding-top: 12px;
  border-top: 2px solid #e2e8f0;
}

.total-amount {
  font-size: 20px;
  color: #667eea;
  font-weight: 700;
}

.withdrawal-note-modal {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 16px;
  background: #f7f9fc;
  border-radius: 12px;
  margin-bottom: 24px;
}

.withdrawal-note-modal svg {
  width: 18px;
  height: 18px;
  color: #667eea;
  flex-shrink: 0;
  margin-top: 2px;
}

.withdrawal-note-modal p {
  font-size: 13px;
  color: #718096;
  margin: 0;
  line-height: 1.5;
}

.modal-footer {
  display: flex;
  gap: 12px;
  padding: 24px;
  border-top: 2px solid #e2e8f0;
}

.modal-btn {
  flex: 1;
  padding: 14px 20px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.modal-btn.secondary {
  background: #f7f9fc;
  color: #4a5568;
  border: 2px solid #e2e8f0;
}

.modal-btn.secondary:hover {
  background: #edf2f7;
  border-color: #cbd5e0;
}

.modal-btn.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.modal-btn.primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.modal-btn.primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.modal-btn .spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

/* Success Modal */
.success-modal {
  padding: 40px;
  text-align: center;
}

.modal-icon {
  width: 80px;
  height: 80px;
  background: #48bb78;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
}

.modal-icon svg {
  width: 40px;
  height: 40px;
  color: white;
}

.success-modal h3 {
  font-size: 28px;
  font-weight: 800;
  color: #2d3748;
  margin-bottom: 12px;
}

.success-modal p {
  color: #718096;
  margin-bottom: 32px;
}

.withdrawal-details-modal {
  background: #f7f9fc;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 32px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #e2e8f0;
  font-size: 14px;
  color: #4a5568;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-row .amount,
.detail-row .balance {
  font-size: 18px;
  font-weight: 700;
  color: #667eea;
}

.modal-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.modal-note {
  font-size: 12px;
  color: #718096;
  margin: 0;
  line-height: 1.5;
}

/* Spinner Animation */
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>