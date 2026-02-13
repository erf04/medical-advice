<template>
  <div class="patient-profile-container">
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
          <h1 class="header-title">My Profile</h1>
          <p class="header-subtitle">Manage your personal information and wallet</p>
        </div>
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
    <div class="profile-content">
      <div class="content-wrapper">
        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Loading profile information...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error-state">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
          </svg>
          <h3>Unable to Load Profile</h3>
          <p>{{ error }}</p>
          <button @click="fetchUserProfile" class="retry-btn">Try Again</button>
        </div>

        <!-- Profile Content -->
        <div v-else class="profile-details">
          <!-- Profile Header -->
          <div class="profile-header-section">
            <div class="profile-avatar">
              <img :src="user.profileImage || defaultProfileImage" alt="Profile" class="avatar-img">
              <button class="change-avatar-btn" @click="changeAvatar">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                </svg>
              </button>
            </div>
            <div class="profile-header-info">
              <h2 class="user-name">{{ user.firstName }} {{ user.lastName }}</h2>
              <p class="user-id">ID: {{ user.id }}</p>
              <div class="profile-status">
                <span class="status-badge verified" v-if="user.isVerified">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                  </svg>
                  Verified Account
                </span>
                <span class="status-badge member">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
                  </svg>
                  Member since {{ formatDate(user.joinDate) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Two Column Layout -->
          <div class="profile-columns">
            <!-- Left Column: Personal Information -->
            <div class="personal-info-section">
              <div class="section-header">
                <h3 class="section-title">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
                  </svg>
                  Personal Information
                </h3>
                
              </div>

              <div class="info-grid">
                <div class="info-item">
                  <span class="info-label">First Name</span>
                  <span class="info-value">{{ user.firstName }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Last Name</span>
                  <span class="info-value">{{ user.lastName }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Email</span>
                  <span class="info-value">{{ user.email }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Phone Number</span>
                  <span class="info-value">{{ user.phone || 'Not provided' }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Gender</span>
                  <span class="info-value">{{ formatGender(user.gender) }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Age</span>
                  <span class="info-value">{{ user.age || 'Not specified' }}</span>
                </div>
                
                
              </div>

              <!-- Additional Information -->
              
            </div>

            <!-- Right Column: Wallet & Actions -->
            <div class="wallet-section">
              <!-- Wallet Card -->
              <div class="wallet-card">
                <div class="wallet-header">
                  <h3 class="wallet-title">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M2.273 5.625A4.483 4.483 0 015.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 3H5.25a3 3 0 00-2.977 2.625zM2.273 8.625A4.483 4.483 0 015.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 6H5.25a3 3 0 00-2.977 2.625zM5.25 9a3 3 0 00-3 3v6a3 3 0 003 3h13.5a3 3 0 003-3v-6a3 3 0 00-3-3H15a.75.75 0 00-.75.75 2.25 2.25 0 01-4.5 0A.75.75 0 009 9H5.25z" />
                    </svg>
                    Medical Wallet
                  </h3>
                  <span class="wallet-id">ID: {{ user.walletId }}</span>
                </div>
                
                <div class="wallet-balance">
                  <span class="balance-label">Current Balance</span>
                  <div class="balance-amount">
                    <span class="currency">$</span>
                    <span class="amount">{{ user.walletBalance.toFixed(2) }}</span>
                  </div>
                </div>

                <div class="wallet-actions">
                  <button class="wallet-btn primary" @click="showSettleModal = true">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clip-rule="evenodd" />
                    </svg>
                    Settle to Wallet
                  </button>
                  
                </div>

                <div class="wallet-info">
                  <div class="info-row">
                    <span class="info-label">Last Transaction</span>
                    <span class="info-value">{{ formatDate(user.lastTransaction) }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Total Spent</span>
                    <span class="info-value">${{ user.totalSpent.toFixed(2) }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">Consultations</span>
                    <span class="info-value">{{ user.totalConsultations }}</span>
                  </div>
                </div>
              </div>

              <!-- Quick Actions -->
              <div class="quick-actions">
                <h3 class="section-title">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
                  </svg>
                  Quick Actions
                </h3>
                <div class="action-buttons">
                  <button class="action-btn" @click="goToConsultants">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clip-rule="evenodd" />
                    </svg>
                    My Consultants
                  </button>
                  <button class="action-btn" @click="goToAppointments">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clip-rule="evenodd" />
                    </svg>
                    Appointments
                  </button>
                  <button class="action-btn" @click="goToMedicalRecords">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clip-rule="evenodd" />
                      <path fill-rule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
                    </svg>
                    Medical Records
                  </button>
                  <button class="action-btn" @click="changePassword">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clip-rule="evenodd" />
                    </svg>
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Settle to Wallet Modal -->
    <div v-if="showSettleModal" class="modal-overlay" @click.self="closeSettleModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Settle to Wallet</h3>
          <button class="modal-close" @click="closeSettleModal">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="current-balance-display">
            <span>Current Balance:</span>
            <strong>${{ user.walletBalance.toFixed(2) }}</strong>
          </div>
          
          <div class="amount-input-section">
            <label for="settleAmount">Amount to Add</label>
            <div class="amount-input">
              <span class="currency-symbol">$</span>
              <input 
                type="number" 
                id="settleAmount" 
                v-model="settleAmount"
                placeholder="0.00"
                min="1"
                max="10000"
                step="0.01"
                @input="validateSettleAmount"
                :class="{ 'error': settleAmountError }"
              />
            </div>
            <div v-if="settleAmountError" class="error-message">
              {{ settleAmountError }}
            </div>
            
            <div class="quick-amounts">
              <button 
                v-for="amount in quickAmounts" 
                :key="amount"
                class="quick-amount-btn"
                @click="settleAmount = amount"
              >
                ${{ amount }}
              </button>
            </div>
          </div>
          
          <div class="payment-method">
            <h4>Payment Method</h4>
            <div class="payment-options">
              <div 
                v-for="method in paymentMethods" 
                :key="method.id"
                :class="['payment-option', { selected: selectedPaymentMethod === method.id }]"
                @click="selectedPaymentMethod = method.id"
              >
                <div class="payment-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path :d="method.icon" />
                  </svg>
                </div>
                <div class="payment-info">
                  <h6>{{ method.name }}</h6>
                  <p>{{ method.description }}</p>
                </div>
                <div class="payment-check" v-if="selectedPaymentMethod === method.id">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div class="payment-summary">
            <div class="summary-row">
              <span>Amount to Add:</span>
              <span>${{ parseFloat(settleAmount) || 0 }}</span>
            </div>
            <div class="summary-row">
              <span>Payment Fee:</span>
              <span>${{ paymentFee.toFixed(2) }}</span>
            </div>
            <div class="summary-row total">
              <span>Total to Pay:</span>
              <span class="total-amount">${{ totalPayment.toFixed(2) }}</span>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="modal-btn secondary" @click="closeSettleModal">
            Cancel
          </button>
          <button 
            class="modal-btn primary" 
            :disabled="!canProcessSettlement || processingSettlement"
            @click="processSettlement"
          >
            <span v-if="processingSettlement" class="spinner"></span>
            <span v-else>Proceed to Payment</span>
          </button>
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
        <h3>Payment Successful!</h3>
        <p>Your wallet has been credited successfully.</p>
        
        <div class="payment-details-modal">
          <div class="detail-row">
            <span>Amount Added:</span>
            <strong class="amount">${{ settleAmount }}</strong>
          </div>
          <div class="detail-row">
            <span>Payment Method:</span>
            <strong>{{ getPaymentMethodName(selectedPaymentMethod) }}</strong>
          </div>
          <div class="detail-row">
            <span>Transaction ID:</span>
            <strong>{{ transactionId }}</strong>
          </div>
          <div class="detail-row">
            <span>New Balance:</span>
            <strong class="balance">${{ newBalance.toFixed(2) }}</strong>
          </div>
        </div>
        
        <div class="modal-actions">
          <button class="modal-btn secondary" @click="showSuccessModal = false">
            Close
          </button>
          <button class="modal-btn primary" @click="downloadReceipt">
            Download Receipt
          </button>
        </div>
        
        <p class="modal-note">
          The amount has been added to your wallet and is ready to use for medical consultations.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PatientProfile',
  
  data() {
    return {
      loading: true,
      error: null,
      userProfileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      showProfileMenu: false,
      
      // User data
      user: {},
      
      // Wallet settlement
      showSettleModal: false,
      settleAmount: '',
      settleAmountError: '',
      selectedPaymentMethod: 'card',
      processingSettlement: false,
      
      // Success modal
      showSuccessModal: false,
      transactionId: '',
      newBalance: 0,
      
      // Quick amounts for wallet settlement
      quickAmounts: [10, 25, 50, 100, 200, 500],
      
      // Payment methods
      paymentMethods: [
        {
          id: 'card',
          name: 'Credit/Debit Card',
          description: 'Pay with Visa, MasterCard, or other cards',
          icon: 'M2.273 5.625A4.483 4.483 0 015.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 3H5.25a3 3 0 00-2.977 2.625zM2.273 8.625A4.483 4.483 0 015.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 6H5.25a3 3 0 00-2.977 2.625zM5.25 9a3 3 0 00-3 3v6a3 3 0 003 3h13.5a3 3 0 003-3v-6a3 3 0 00-3-3H15a.75.75 0 00-.75.75 2.25 2.25 0 01-4.5 0A.75.75 0 009 9H5.25z'
        },
        {
          id: 'bank',
          name: 'Bank Transfer',
          description: 'Direct transfer from your bank account',
          icon: 'M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z'
        },
        {
          id: 'digital',
          name: 'Digital Wallet',
          description: 'PayPal, Apple Pay, Google Pay',
          icon: 'M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6z'
        }
      ],
      
      // Default images
      defaultProfileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    }
  },
  
  computed: {
    paymentFee() {
      const amount = parseFloat(this.settleAmount) || 0
      // 2.9% + $0.30 payment processing fee
      return (amount * 0.029) + 0.30
    },
    
    totalPayment() {
      const amount = parseFloat(this.settleAmount) || 0
      return amount + this.paymentFee
    },
    
    canProcessSettlement() {
      const amount = parseFloat(this.settleAmount)
      return amount && amount >= 1 && amount <= 10000 && !this.settleAmountError && this.selectedPaymentMethod
    }
  },
  
  watch: {
    settleAmount(newVal) {
        console.log(newVal);
      this.validateSettleAmount()
    }
  },
  
  async mounted() {
    await this.fetchUserProfile()
  },
  
  methods: {
    async fetchUserProfile() {
      this.loading = true
      this.error = null
      
      try {
        // Mock data - replace with actual API call
        // In real app: const response = await fetch('/api/user/profile')
        
        await new Promise(resolve => setTimeout(resolve, 800))
        
        this.user = {
          id: 'USR-2023-00123',
          firstName: 'John',
          lastName: 'Smith',
          email: 'john.smith@example.com',
          phone: '+1 (555) 123-4567',
          gender: 'male',
          age: 35,
          dateOfBirth: new Date('1988-05-15'),
          bloodType: 'O+',
          address: '123 Main Street, New York, NY 10001',
          emergencyContact: '+1 (555) 987-6543',
          medicalConditions: 'None',
          allergies: 'Peanuts, Penicillin',
          profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
          isVerified: true,
          joinDate: new Date('2023-01-15'),
          walletId: 'WLT-2023-04567',
          walletBalance: 245.75,
          lastTransaction: new Date('2023-10-28'),
          totalSpent: 1250.50,
          totalConsultations: 8
        }
        
      } catch (err) {
        console.error('Error fetching user profile:', err)
        this.error = 'Failed to load profile information. Please try again.'
      } finally {
        this.loading = false
      }
    },
    
    formatDate(date) {
      if (!date) return 'Not specified'
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    
    formatGender(gender) {
      if (!gender) return 'Not specified'
      return gender.charAt(0).toUpperCase() + gender.slice(1)
    },
    
    validateSettleAmount() {
      const amount = parseFloat(this.settleAmount)
      
      if (!this.settleAmount || isNaN(amount)) {
        this.settleAmountError = 'Please enter a valid amount'
        return
      }
      
      if (amount < 1) {
        this.settleAmountError = 'Minimum amount is $1'
        return
      }
      
      if (amount > 10000) {
        this.settleAmountError = 'Maximum amount is $10,000'
        return
      }
      
      this.settleAmountError = ''
    },
    
    openSettleModal() {
      this.showSettleModal = true
      this.settleAmount = ''
      this.settleAmountError = ''
      this.selectedPaymentMethod = 'card'
    },
    
    closeSettleModal() {
      this.showSettleModal = false
      this.settleAmount = ''
      this.settleAmountError = ''
      this.processingSettlement = false
    },
    
    async processSettlement() {
      if (!this.canProcessSettlement) return
      
      this.processingSettlement = true
      
      try {
        const amount = parseFloat(this.settleAmount)
        
        // In real app, call payment API
        // const response = await fetch('/api/wallet/settle', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     amount: amount,
        //     paymentMethod: this.selectedPaymentMethod
        //   })
        // })
        
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Generate random transaction ID
        this.transactionId = 'TX-' + Date.now() + '-' + Math.floor(Math.random() * 1000)
        
        // Update wallet balance
        this.newBalance = this.user.walletBalance + amount
        this.user.walletBalance = this.newBalance
        this.user.lastTransaction = new Date()
        
        // Show success modal
        this.showSettleModal = false
        this.showSuccessModal = true
        
      } catch (err) {
        console.error('Error processing settlement:', err)
        alert('Payment failed. Please try again.')
      } finally {
        this.processingSettlement = false
      }
    },
    
    getPaymentMethodName(methodId) {
      const method = this.paymentMethods.find(m => m.id === methodId)
      return method ? method.name : 'Unknown'
    },
    
    downloadReceipt() {
      // Generate and download receipt
      const receipt = `
        Medical Wallet Receipt
        ======================
        Transaction ID: ${this.transactionId}
        Date: ${new Date().toLocaleString()}
        Amount Added: $${this.settleAmount}
        Payment Method: ${this.getPaymentMethodName(this.selectedPaymentMethod)}
        New Balance: $${this.newBalance.toFixed(2)}
        
        Thank you for using our medical services!
      `
      
      const blob = new Blob([receipt], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `receipt-${this.transactionId}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    },
    
    editProfile() {
      // Navigate to edit profile page
      this.$router.push('/profile/edit')
    },
    
    changeAvatar() {
      // Implement avatar change functionality
      alert('Avatar change functionality coming soon!')
    },
    
    showTransactionHistory() {
      // Navigate to transaction history page
      this.$router.push('/wallet/history')
    },
    
    goToConsultants() {
      this.$router.push('/consultants')
    },
    
    goToAppointments() {
      this.$router.push('/appointments')
    },
    
    goToMedicalRecords() {
      this.$router.push('/medical-records')
    },
    
    changePassword() {
      this.$router.push('/change-password')
    },
    
    goToProfile() {
      // Already on profile page
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

/* Base Styles */
.patient-profile-container {
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
.profile-content {
  position: relative;
  z-index: 1;
  padding: 24px 24px 60px;
  margin-top: 0;
}

@media (max-width: 768px) {
  .profile-content {
    padding: 16px 16px 40px;
  }
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.loading-state .spinner {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(102, 126, 234, 0.3);
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

.loading-state p {
  font-size: 15px;
  color: #4a5568;
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

/* Profile Details */
.profile-details {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

@media (max-width: 768px) {
  .profile-details {
    padding: 24px;
  }
}

/* Profile Header Section */
.profile-header-section {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 40px;
  padding-bottom: 32px;
  border-bottom: 2px solid #e2e8f0;
}

@media (max-width: 768px) {
  .profile-header-section {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
}

.profile-avatar {
  position: relative;
  width: 120px;
  height: 120px;
  flex-shrink: 0;
}

.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 24px;
  object-fit: cover;
  border: 4px solid #667eea;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.change-avatar-btn {
  position: absolute;
  bottom: -8px;
  right: -8px;
  width: 36px;
  height: 36px;
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
  width: 16px;
  height: 16px;
  color: white;
}

.profile-header-info {
  flex: 1;
}

.user-name {
  font-size: 32px;
  font-weight: 800;
  color: #2d3748;
  margin: 0 0 8px 0;
  line-height: 1.2;
}

.user-id {
  font-size: 14px;
  color: #718096;
  margin: 0 0 16px 0;
}

.profile-status {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
}

.status-badge.verified {
  background: #c6f6d5;
  color: #22543d;
}

.status-badge.member {
  background: #bee3f8;
  color: #2c5282;
}

.status-badge svg {
  width: 14px;
  height: 14px;
}

/* Two Column Layout */
.profile-columns {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 32px;
}

@media (max-width: 1024px) {
  .profile-columns {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

/* Personal Information Section */
.personal-info-section {
  background: #f7f9fc;
  border-radius: 16px;
  padding: 24px;
  border: 2px solid #e2e8f0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
}

.section-title svg {
  width: 20px;
  height: 20px;
  color: #667eea;
}

.edit-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.3s ease;
}

.edit-btn:hover {
  background: #667eea;
  border-color: #667eea;
  color: white;
}

.edit-btn svg {
  width: 14px;
  height: 14px;
}

/* Info Grid */
.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}

@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
  }
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.info-label {
  font-size: 13px;
  color: #718096;
  font-weight: 500;
}

.info-value {
  font-size: 15px;
  color: #2d3748;
  font-weight: 600;
  word-break: break-word;
}

/* Additional Information */
.additional-info {
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e2e8f0;
}

.additional-info h4 {
  font-size: 16px;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 16px 0;
}

.additional-info .info-item {
  margin-bottom: 12px;
}

.additional-info .info-item:last-child {
  margin-bottom: 0;
}

/* Wallet Section */
.wallet-section {
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

.wallet-info {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
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

/* Quick Actions */
.quick-actions {
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 2px solid #e2e8f0;
}

.quick-actions .section-title {
  margin-bottom: 20px;
}

.action-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

@media (max-width: 480px) {
  .action-buttons {
    grid-template-columns: 1fr;
  }
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: #f7f9fc;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.action-btn:hover {
  background: #edf2f7;
  border-color: #cbd5e0;
  color: #667eea;
  transform: translateY(-2px);
}

.action-btn svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

/* Settle to Wallet Modal */
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

.current-balance-display {
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

.current-balance-display strong {
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

.payment-summary {
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

.payment-details-modal {
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