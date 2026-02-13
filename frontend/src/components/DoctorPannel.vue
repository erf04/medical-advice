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
        <div class="header-actions">
          <button class="header-action-btn" @click="goToDashboard">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z" clip-rule="evenodd" />
            </svg>
            Dashboard
          </button>
          <button class="header-action-btn" @click="goToNews">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 003 3h15a3 3 0 01-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125zM12 9.75a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H12zm-.75-2.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75zM6 12.75a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5H6zm-.75 3.75a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75zM6 6.75a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-3A.75.75 0 009 6.75H6z" clip-rule="evenodd" />
            </svg>
            News
          </button>
          <button class="header-action-btn" @click="goToMyConsultants">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.786 0 011.019-4.38z" clip-rule="evenodd" />
            </svg>
            My Consultants
          </button>
        </div>
        <div class="user-profile" @click="showProfileMenu = !showProfileMenu">
          <img :src="doctor?.profileImage || defaultDoctorImage" alt="Profile" class="profile-img">
          <div class="profile-menu" v-if="showProfileMenu" v-click-outside="() => showProfileMenu = false">
            <div class="menu-item" @click="goToProfile">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
              </svg>
              My Profile
            </div>
            <div class="menu-item" @click="goToConsultants">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clip-rule="evenodd" />
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
                <span class="stat-value">{{ stats.totalPatients || 0 }}</span>
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
                <span class="stat-value">${{ formatNumber(stats.totalEarnings) }}</span>
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
                    <span class="detail-value">{{ doctor.medicalLicense || 'N/A' }}</span>
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
                    <span class="detail-label">Clinic Address:</span>
                    <span class="detail-value">{{ doctor.address || 'N/A' }}</span>
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
                    <h4>Consultation Cost</h4>
                    <p>Set your fee per consultation session</p>
                  </div>
                  <div class="setting-control">
                    <div class="price-input">
                      <span class="currency">$</span>
                      <input 
                        type="number" 
                        v-model="doctor.consultationFee"
                        min="10"
                        max="1000"
                        step="5"
                        @keyup.enter="updateConsultationFee"
                      />
                    </div>
                    <button class="save-btn" @click="updateConsultationFee" :disabled="savingConsultationFee">
                      <span v-if="savingConsultationFee" class="save-spinner"></span>
                      <span v-else>Save</span>
                    </button>
                  </div>
                </div>

                <div class="setting-item">
                  <div class="setting-info">
                    <h4>Maximum Concurrent Patients</h4>
                    <p>Maximum number of patients you can consult simultaneously in a time slot</p>
                  </div>
                  <div class="setting-control">
                    <div class="number-input">
                      <button class="number-btn minus" @click="decreaseMaxPatients">-</button>
                      <input 
                        type="number" 
                        v-model="doctor.maxConcurrentPatients"
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

                <div class="setting-item">
                  <div class="setting-info">
                    <h4>Consultation Duration</h4>
                    <p>Duration of each consultation session (minutes)</p>
                  </div>
                  <div class="setting-control">
                    <div class="duration-options">
                      <button 
                        v-for="duration in durationOptions" 
                        :key="duration"
                        :class="['duration-btn', { active: doctor.consultationDuration === duration }]"
                        @click="doctor.consultationDuration = duration"
                      >
                        {{ duration }} min
                      </button>
                    </div>
                    <button class="save-btn" @click="updateConsultationDuration" :disabled="savingConsultationDuration">
                      <span v-if="savingConsultationDuration" class="save-spinner"></span>
                      <span v-else>Save</span>
                    </button>
                  </div>
                </div>

                <div class="setting-item">
                  <div class="setting-info">
                    <h4>Availability Status</h4>
                    <p>Toggle your availability for new consultations</p>
                  </div>
                  <div class="setting-control">
                    <label class="toggle-switch">
                      <input type="checkbox" v-model="doctor.isAvailable" @change="updateAvailability">
                      <span class="toggle-slider"></span>
                    </label>
                    <span class="status-text">{{ doctor.isAvailable ? 'Available' : 'Not Available' }}</span>
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
                    <span class="amount">{{ formatNumber(doctor.walletBalance) }}</span>
                  </div>
                  <span class="balance-note">Pending: ${{ formatNumber(doctor.pendingBalance) }}</span>
                </div>

                <div class="wallet-actions">
                  <button class="wallet-btn primary" @click="withdrawFunds">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V6.75a.75.75 0 00-1.5 0v7.94l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z" clip-rule="evenodd" />
                    </svg>
                    Withdraw Funds
                  </button>
                  <button class="wallet-btn secondary" @click="viewWithdrawalHistory">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clip-rule="evenodd" />
                    </svg>
                    Withdrawal History
                  </button>
                </div>

                <div class="withdrawal-info">
                  <div class="info-row">
                    <span class="info-label">Last Withdrawal</span>
                    <span class="info-value">{{ formatDate(doctor.lastWithdrawal) }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Total Withdrawn</span>
                    <span class="info-value">${{ formatNumber(doctor.totalWithdrawn) }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Available for Withdrawal</span>
                    <span class="info-value success">${{ formatNumber(doctor.availableForWithdrawal) }}</span>
                  </div>
                </div>

                <div class="withdrawal-note">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
                  </svg>
                  <p>Withdrawal requests are processed within 3-5 business days after admin approval.</p>
                </div>
              </div>

              <!-- Income History -->
              <div class="income-history">
                <div class="section-header">
                  <h3 class="section-title">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clip-rule="evenodd" />
                      <path fill-rule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clip-rule="evenodd" />
                    </svg>
                    Recent Income History
                  </h3>
                  <button class="view-all-btn" @click="viewAllIncomeHistory">
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
                    <span class="summary-label">Consultations</span>
                    <span class="summary-value">{{ incomeSummary.consultations }}</span>
                  </div>
                  <div class="summary-card">
                    <span class="summary-label">Avg. per Consultation</span>
                    <span class="summary-value">${{ formatNumber(incomeSummary.average) }}</span>
                  </div>
                </div>

                <div class="income-list">
                  <div v-if="filteredIncome.length === 0" class="empty-income">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clip-rule="evenodd" />
                    </svg>
                    <p>No income records for this period</p>
                  </div>

                  <div v-else>
                    <div 
                      v-for="income in filteredIncome" 
                      :key="income.id"
                      class="income-item"
                    >
                      <div class="income-info">
                        <h4 class="income-patient">{{ income.patientName }}</h4>
                        <p class="income-date">{{ formatDate(income.date) }} • {{ income.time }}</p>
                        <span class="income-type">{{ income.type }}</span>
                      </div>
                      <div class="income-amount">
                        <span class="amount">${{ formatNumber(income.amount) }}</span>
                        <span class="status-badge" :class="income.status">{{ income.status }}</span>
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

    <!-- Withdrawal Modal -->
    <WithdrawalModal
      v-if="showWithdrawalModal"
      :availableBalance="doctor.availableForWithdrawal"
      :withdrawalMethods="withdrawalMethods"
      @close="closeWithdrawalModal"
      @submit="processWithdrawal"
    />

    <!-- Success Modal -->
    <SuccessModal
      v-if="showSuccessModal"
      :requestId="withdrawalRequestId"
      :amount="withdrawalAmount"
      :method="getWithdrawalMethodName(selectedWithdrawalMethod)"
      :amountToReceive="amountToReceive"
      @close="showSuccessModal = false"
    />
  </div>
</template>

<script>
// Import components if you want to split them
// import WithdrawalModal from './WithdrawalModal.vue'
// import SuccessModal from './SuccessModal.vue'

export default {
  name: 'DoctorPanel',
  
  // components: {
  //   WithdrawalModal,
  //   SuccessModal
  // },
  
  data() {
    return {
      loading: true,
      error: null,
      showProfileMenu: false,
      selectedPeriod: 'Today',
      
      // Doctor data with default values
      doctor: {
        consultationFee: 0,
        maxConcurrentPatients: 1,
        consultationDuration: 30,
        isAvailable: false,
        walletBalance: 0,
        pendingBalance: 0,
        availableForWithdrawal: 0,
        totalWithdrawn: 0,
        firstName: '',
        lastName: '',
        specialty: ''
      },
      
      stats: {
        totalPatients: 0,
        totalConsultations: 0,
        totalEarnings: 0,
        rating: 0
      },
      
      // Settings
      durationOptions: [15, 30, 45, 60],
      savingConsultationFee: false,
      savingMaxPatients: false,
      savingConsultationDuration: false,
      savingAvailability: false,
      
      // Withdrawal
      showWithdrawalModal: false,
      withdrawalAmount: '',
      withdrawalAmountError: '',
      selectedWithdrawalMethod: 'bank',
      processingWithdrawal: false,
      withdrawalRequestId: '',
      
      // Success modal
      showSuccessModal: false,
      
      // Quick amounts for withdrawal
      withdrawalQuickAmounts: [100, 250, 500, 1000],
      
      // Time periods for filtering
      timePeriods: ['Today', 'Week', 'Month', 'Year', 'All'],
      
      // Withdrawal methods
      withdrawalMethods: [
        {
          id: 'bank',
          name: 'Bank Transfer',
          accountInfo: '**** 1234 • Chase Bank',
          icon: 'M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z'
        },
        {
          id: 'paypal',
          name: 'PayPal',
          accountInfo: 'doctor@example.com',
          icon: 'M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6z'
        }
      ],
      
      // Income history data
      incomeHistory: [],
      
      // Default images
      defaultDoctorImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    }
  },
  
  computed: {
    incomeSummary() {
      const filtered = this.filteredIncome
      const total = filtered.reduce((sum, income) => sum + (income.amount || 0), 0)
      const average = filtered.length > 0 ? total / filtered.length : 0
      
      return {
        total,
        consultations: filtered.length,
        average
      }
    },
    
    filteredIncome() {
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
          return this.incomeHistory
      }
      
      return this.incomeHistory.filter(income => {
        const incomeDate = new Date(income.date)
        return incomeDate >= startDate
      })
    },
    
    processingFee() {
      const amount = parseFloat(this.withdrawalAmount) || 0
      return amount * 0.02 // 2% processing fee
    },
    
    amountToReceive() {
      const amount = parseFloat(this.withdrawalAmount) || 0
      return amount - this.processingFee
    },
    
    canProcessWithdrawal() {
      const amount = parseFloat(this.withdrawalAmount)
      return amount && 
             amount >= 10 && 
             amount <= this.doctor.availableForWithdrawal && 
             !this.withdrawalAmountError && 
             this.selectedWithdrawalMethod
    }
  },
  
  watch: {
    withdrawalAmount(newVal) {
        console.log(newVal);
      this.validateWithdrawalAmount()
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
        await Promise.all([
          this.fetchDoctorData(),
          this.fetchIncomeHistory()
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
        // Mock doctor data - in real app, this would be an API call
        // Using setTimeout to simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        this.doctor = {
          id: 'DOC-2023-00123',
          firstName: 'James',
          lastName: 'Wilson',
          profileImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
          specialty: 'Cardiology',
          medicalLicense: 'CA-7890123',
          email: 'dr.james.wilson@medical.com',
          phone: '+1 (555) 987-6543',
          experience: 15,
          address: '123 Medical Center Dr, Health City, HC 12345',
          isVerified: true,
          consultationFee: 250,
          maxConcurrentPatients: 3,
          consultationDuration: 30,
          isAvailable: true,
          walletId: 'DR-WLT-04567',
          walletBalance: 15250.75,
          pendingBalance: 3250.50,
          availableForWithdrawal: 12000.25,
          lastWithdrawal: new Date('2023-10-15'),
          totalWithdrawn: 45000.50
        }
        
        this.stats = {
          totalPatients: 524,
          totalConsultations: 1843,
          totalEarnings: 15250.75,
          rating: 4.8
        }
        
      } catch (err) {
        console.error('Error fetching doctor data:', err)
        throw new Error('Failed to load doctor information')
      }
    },
    
    async fetchIncomeHistory() {
      try {
        // Mock income history data
        const now = new Date()
        this.incomeHistory = [
          {
            id: 'INC-001',
            patientName: 'John Smith',
            date: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
            time: '10:30 AM',
            type: 'Online Consultation',
            amount: 250,
            status: 'completed'
          },
          {
            id: 'INC-002',
            patientName: 'Sarah Johnson',
            date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
            time: '2:15 PM',
            type: 'Video Consultation',
            amount: 250,
            status: 'completed'
          },
          {
            id: 'INC-003',
            patientName: 'Michael Chen',
            date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
            time: '11:00 AM',
            type: 'Phone Consultation',
            amount: 200,
            status: 'completed'
          },
          {
            id: 'INC-004',
            patientName: 'Lisa Rodriguez',
            date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
            time: '4:30 PM',
            type: 'Online Consultation',
            amount: 250,
            status: 'pending'
          },
          {
            id: 'INC-005',
            patientName: 'Robert Kim',
            date: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
            time: '9:45 AM',
            type: 'Video Consultation',
            amount: 250,
            status: 'completed'
          }
        ]
        
      } catch (err) {
        console.error('Error fetching income history:', err)
        throw new Error('Failed to load income history')
      }
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
        if (typeof date === 'string') {
          date = new Date(date)
        }
        
        if (!(date instanceof Date) || isNaN(date.getTime())) {
          return 'N/A'
        }
        
        return date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })
      } catch (err) {
        console.error('Error formatting date:', err)
        return 'N/A'
      }
    },
    
    // Practice Settings Methods
    increaseMaxPatients() {
      if (this.doctor.maxConcurrentPatients < 10) {
        this.doctor.maxConcurrentPatients++
      }
    },
    
    decreaseMaxPatients() {
      if (this.doctor.maxConcurrentPatients > 1) {
        this.doctor.maxConcurrentPatients--
      }
    },
    
    async updateConsultationFee() {
      if (this.savingConsultationFee) return
      
      this.savingConsultationFee = true
      try {
        // In real app: API call to update consultation fee
        await new Promise(resolve => setTimeout(resolve, 800))
        // Show success message
        this.$toast.success('Consultation fee updated successfully!')
      } catch (err) {
        console.error('Error updating consultation fee:', err)
        this.$toast.error('Failed to update consultation fee')
      } finally {
        this.savingConsultationFee = false
      }
    },
    
    async updateMaxPatients() {
      if (this.savingMaxPatients) return
      
      this.savingMaxPatients = true
      try {
        // In real app: API call to update max patients
        await new Promise(resolve => setTimeout(resolve, 800))
        this.$toast.success('Maximum concurrent patients updated successfully!')
      } catch (err) {
        console.error('Error updating max patients:', err)
        this.$toast.error('Failed to update maximum patients')
      } finally {
        this.savingMaxPatients = false
      }
    },
    
    async updateConsultationDuration() {
      if (this.savingConsultationDuration) return
      
      this.savingConsultationDuration = true
      try {
        // In real app: API call to update consultation duration
        await new Promise(resolve => setTimeout(resolve, 800))
        this.$toast.success('Consultation duration updated successfully!')
      } catch (err) {
        console.error('Error updating consultation duration:', err)
        this.$toast.error('Failed to update consultation duration')
      } finally {
        this.savingConsultationDuration = false
      }
    },
    
    async updateAvailability() {
      if (this.savingAvailability) return
      
      this.savingAvailability = true
      try {
        // In real app: API call to update availability
        await new Promise(resolve => setTimeout(resolve, 800))
        this.$toast.success(`You are now ${this.doctor.isAvailable ? 'available' : 'not available'} for consultations`)
      } catch (err) {
        console.error('Error updating availability:', err)
        this.$toast.error('Failed to update availability')
        // Revert the toggle on error
        this.doctor.isAvailable = !this.doctor.isAvailable
      } finally {
        this.savingAvailability = false
      }
    },
    
    // Withdrawal Methods
    withdrawFunds() {
      this.showWithdrawalModal = true
      this.withdrawalAmount = ''
      this.withdrawalAmountError = ''
      this.selectedWithdrawalMethod = 'bank'
    },
    
    closeWithdrawalModal() {
      this.showWithdrawalModal = false
      this.withdrawalAmount = ''
      this.withdrawalAmountError = ''
      this.processingWithdrawal = false
    },
    
    validateWithdrawalAmount() {
      const amount = parseFloat(this.withdrawalAmount)
      
      if (!this.withdrawalAmount || isNaN(amount)) {
        this.withdrawalAmountError = 'Please enter a valid amount'
        return
      }
      
      if (amount < 10) {
        this.withdrawalAmountError = 'Minimum withdrawal amount is $10'
        return
      }
      
      if (amount > this.doctor.availableForWithdrawal) {
        this.withdrawalAmountError = `Cannot withdraw more than available balance ($${this.formatNumber(this.doctor.availableForWithdrawal)})`
        return
      }
      
      this.withdrawalAmountError = ''
    },
    
    async processWithdrawal(withdrawalData) {
      // This would be called from the WithdrawalModal component
      this.processingWithdrawal = true
      
      try {
        const amount = parseFloat(withdrawalData.amount)
        
        // In real app: API call to submit withdrawal request
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Generate random request ID
        this.withdrawalRequestId = 'WDR-' + Date.now() + '-' + Math.floor(Math.random() * 1000)
        this.withdrawalAmount = amount
        this.selectedWithdrawalMethod = withdrawalData.methodId
        
        // Update doctor's wallet balance
        this.doctor.availableForWithdrawal -= amount
        this.doctor.walletBalance -= amount
        
        // Show success modal
        this.showWithdrawalModal = false
        this.showSuccessModal = true
        
      } catch (err) {
        console.error('Error processing withdrawal:', err)
        this.$toast.error('Failed to submit withdrawal request. Please try again.')
      } finally {
        this.processingWithdrawal = false
      }
    },
    
    getWithdrawalMethodName(methodId) {
      const method = this.withdrawalMethods.find(m => m.id === methodId)
      return method ? method.name : 'Unknown'
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
    
    viewAllIncomeHistory() {
      this.$router.push('/doctor/income-history')
    },
    
    viewWithdrawalHistory() {
      this.$router.push('/doctor/withdrawal-history')
    },
    
    changeAvatar() {
      this.$toast.info('Avatar change functionality coming soon!')
    },
    
    goToProfile() {
      // Already on profile
      this.showProfileMenu = false
    },
    
    goToConsultants() {
      this.$router.push('/doctor/consultants')
    },
    
    handleLogout() {
      // In real app: Clear auth token, etc.
      this.$router.push('/login')
    }
  }
}
</script>


<style scoped>
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