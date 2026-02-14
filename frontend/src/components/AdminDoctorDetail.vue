<template>
  <div class="admin-doctor-detail-container">
    <!-- Animated Background -->
    <div class="animated-bg">
      <div class="bg-circle circle-1"></div>
      <div class="bg-circle circle-2"></div>
      <div class="bg-circle circle-3"></div>
      <div class="bg-pulse"></div>
    </div>

    <!-- Header -->
    <header class="admin-header">
      <div class="header-content">
        <div class="back-btn" @click="$emit('show-doctors-list')">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="header-info">
          <h1 class="header-title">Doctor Details</h1>
          <p class="header-subtitle">View and manage doctor information</p>
        </div>
        <div class="header-actions">
          <button class="header-action-btn review-btn" @click="viewDoctorReviews">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
            </svg>
            View Reviews
          </button>
          
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="admin-content">
      <div class="content-wrapper">
        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Loading doctor information...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error-state">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
          </svg>
          <h3>Failed to load doctor data</h3>
          <p>{{ error }}</p>
          <button @click="loadData" class="retry-btn">Try Again</button>
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
                  <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="stat-info">
                <span class="stat-value">{{ formatNumber(stats.averageRating, 1) }}</span>
                <span class="stat-label">Average Rating</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM9 7.5A.75.75 0 009 9h1.5c.98 0 1.813.626 2.122 1.5H9A.75.75 0 009 12h3.622a2.251 2.251 0 01-2.122 1.5H9a.75.75 0 00-.53 1.28l3 3a.75.75 0 001.06-1.06l-1.73-1.732A3.752 3.752 0 0014.175 12H15a.75.75 0 000-1.5h-.825A3.733 3.733 0 0013.5 9H15a.75.75 0 000-1.5H9z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="stat-info">
                <span class="stat-value">{{ stats.totalRevenue || 0 }}</span>
                <span class="stat-label">Total Revenue</span>
              </div>
            </div>
          </div>

          <!-- Two Column Layout -->
          <div class="admin-columns">
            <!-- Left Column: Profile & Settings -->
            <div class="left-column">
              <!-- Doctor Profile Card -->
              <div class="profile-card">
                <div class="profile-header">
                  <div class="profile-avatar">
                    <img :src="doctor.profileImage || defaultDoctorImage" :alt="doctor.name">
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
                    <span class="detail-label">Contact Info:</span>
                    <span class="detail-value">{{ doctor.contactInfo || 'N/A' }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Experience:</span>
                    <span class="detail-value">{{ doctor.experience || 0 }} years</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Category:</span>
                    <span class="detail-value">{{ doctor.category.title || 'Not specified' }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Status:</span>
                    <span class="detail-value">
                      <span :class="['status-badge', { active: doctor.isActive }]">
                        {{ doctor.isActive ? 'Active' : 'Inactive' }}
                      </span>
                    </span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Member Since:</span>
                    <span class="detail-value">{{ formatDate(doctor.createdAt) }}</span>
                  </div>
                </div>
              </div>

              <!-- Practice Settings (Editable) -->
              <div class="settings-card">
                <h3 class="section-title">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
                  </svg>
                  Practice Settings
                </h3>
                
                <div class="setting-item">
                  <div class="setting-info">
                    <h4>Consultation Price</h4>
                    <p>Set the consultation fee</p>
                  </div>
                  <div class="setting-control">
                    <div class="price-input">
                      <span class="currency">$</span>
                      <input 
                        type="number" 
                        v-model="editedDoctor.consultationPrice"
                        min="0"
                        step="5"
                        @input="markAsChanged"
                      />
                    </div>
                  </div>
                </div>

                <div class="setting-item">
                  <div class="setting-info">
                    <h4>Commission Percent</h4>
                    <p>Platform commission percentage</p>
                  </div>
                  <div class="setting-control">
                    <div class="price-input percent">
                      <input 
                        type="number" 
                        v-model="editedDoctor.commissionPercent"
                        min="0"
                        max="100"
                        step="1"
                        @input="markAsChanged"
                      />
                      <span class="percent-symbol">%</span>
                    </div>
                  </div>
                </div>

                <div class="setting-item">
                  <div class="setting-info">
                    <h4>Maximum Concurrent Patients</h4>
                    <p>Maximum patients per time slot</p>
                  </div>
                  <div class="setting-control">
                    <div class="number-input">
                      <button class="number-btn minus" @click="decreaseMaxPatients">-</button>
                      <input 
                        type="number" 
                        v-model="editedDoctor.maxConcurrentConsultations"
                        min="1"
                        max="10"
                        @input="markAsChanged"
                      />
                      <button class="number-btn plus" @click="increaseMaxPatients">+</button>
                    </div>
                  </div>
                </div>


                <button class="header-action-btn save-btn" @click="saveChanges" :disabled="!hasChanges">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd" />
                    </svg>
                    Save Changes
                </button>
              </div>
            </div>

            <!-- Right Column: Wallet & Schedule -->
            <div class="right-column">
              <!-- Wallet Card -->
              <div class="wallet-card">
                <div class="wallet-header">
                  <h3 class="wallet-title">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M2.273 5.625A4.483 4.483 0 015.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 3H5.25a3 3 0 00-2.977 2.625zM2.273 8.625A4.483 4.483 0 015.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 6H5.25a3 3 0 00-2.977 2.625zM5.25 9a3 3 0 00-3 3v6a3 3 0 003 3h13.5a3 3 0 003-3v-6a3 3 0 00-3-3H15a.75.75 0 00-.75.75 2.25 2.25 0 01-4.5 0A.75.75 0 009 9H5.25z" />
                    </svg>
                    Wallet Overview
                  </h3>
                </div>
                
                <div class="wallet-balance">
                  <span class="balance-label">Current Balance</span>
                  <div class="balance-amount">
                    <span class="currency">$</span>
                    <span class="amount">{{ formatNumber(walletBalance) }}</span>
                  </div>
                </div>

                <div class="wallet-stats">
                  <div class="wallet-stat-item">
                    <span class="stat-label">Total Earned</span>
                    <span class="stat-value">${{ formatNumber(stats.totalEarnings) }}</span>
                  </div>
                  <div class="wallet-stat-item">
                    <span class="stat-label">Commission</span>
                    <span class="stat-value">{{ doctor.commissionPercent || 0 }}%</span>
                  </div>
                </div>
              </div>

              <!-- Schedule Section -->
              <div class="schedule-card">
                <div class="section-header">
                  <h3 class="section-title">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3a.75.75 0 011.5 0v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clip-rule="evenodd" />
                    </svg>
                    Weekly Schedule
                  </h3>
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Transaction History -->
              <div class="transaction-card">
                <div class="section-header">
                  <h3 class="section-title">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clip-rule="evenodd" />
                      <path fill-rule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clip-rule="evenodd" />
                    </svg>
                    Recent Transactions
                  </h3>
                  <button class="view-all-btn" @click="viewAllTransactions">
                    View All
                  </button>
                </div>

                <div class="transactions-list">
                  <div v-if="filteredTransactions.length === 0" class="empty-transactions">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clip-rule="evenodd" />
                    </svg>
                    <p>No recent transactions</p>
                  </div>

                  <div v-else>
                    <div 
                      v-for="transaction in filteredTransactions.slice(0, 5)" 
                      :key="transaction.id"
                      class="transaction-item"
                    >
                      <div class="transaction-info">
                        <span class="transaction-type">{{ getTransactionType(transaction.type) }}</span>
                        <span class="transaction-date">{{ formatDate(transaction.createdAt) }}</span>
                      </div>
                      <div class="transaction-amount">
                        <span :class="['amount', { positive: transaction.type != 'DEPOSIT' }]">
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

    <!-- Save Success Modal -->
    <div v-if="showSuccessModal" class="modal-overlay" @click.self="closeSuccessModal">
      <div class="modal-content success-modal">
        <div class="modal-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
          </svg>
        </div>
        <h3>Changes Saved Successfully!</h3>
        <p>Doctor information has been updated.</p>
        <div class="modal-actions">
          <button class="modal-btn primary" @click="closeSuccessModal">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'AdminDoctorDetail',
  
  props: {
    doctorId: {
      type: [Number, String],
      required: true
    }
  },
  
  data() {
    return {
      loading: true,
      error: null,
      saving: false,
      hasChanges: false,
      showSuccessModal: false,
      
      // API Configuration
      apiBaseUrl: 'http://localhost:8000',
      
      // Doctor data
      doctor: {
        id: null,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        contactInfo: '',
        profileImage: null,
        medicalCode: '',
        isActive: false,
        maxConcurrentConsultations: 1,
        consultationPrice: 0,
        commissionPercent: 0,
        category: null,
        specialty: '',
        experience: 0,
        isVerified: false,
        createdAt: null
      },
      
      // Editable copy
      editedDoctor: {},
      
      // Schedule data
      schedules: {},
      
      // Wallet data
      walletBalance: 0,
      transactions: [],
      
      stats: {
        totalPatients: 0,
        totalConsultations: 0,
        totalEarnings: 0,
        averageRating: 0,
        totalReviews: 0
      },
      
      // Default image
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
    filteredTransactions() {
      return this.transactions || []
    }
  },
  
  async mounted() {
    await this.loadData()
  },
  
  methods: {
    async loadData() {
      this.loading = true
      this.error = null
      
      try {
        await Promise.all([
          this.fetchDoctorData(),
          this.fetchWalletBalance(),
          this.fetchTransactions()
        ])
        
        // Create editable copy
        this.editedDoctor = JSON.parse(JSON.stringify({
          consultationPrice: this.doctor.consultationPrice,
          commissionPercent: this.doctor.commissionPercent,
          maxConcurrentConsultations: this.doctor.maxConcurrentConsultations,
          isActive: this.doctor.isActive
        }))
        
      } catch (err) {
        console.error('Error loading data:', err)
        this.error = err.message || 'Failed to load doctor data'
      } finally {
        this.loading = false
      }
    },
    
    async fetchDoctorData() {
      try {
        const authToken = localStorage.getItem('authToken')
        
        if (!authToken) {
          throw new Error('Authentication required')
        }
        
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
        
        const data = await response.json()
        
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
          commissionPercent: data.commissionPercent || 0,
          category: data.category?.title || 'Not specified',
          isVerified: !!data.medicalCode,
          experience: this.calculateExperience(data.user?.createdAt),
          specialty: data.category?.title || 'General Medicine',
          createdAt: data.user?.createdAt
        }
        
        // Store schedules
        this.schedules = data.schedules || {}
        
        // Update stats
        this.stats = {
          totalPatients: data.patientCount || 0,
          totalConsultations: data.consultationCount || 0,
          totalEarnings: this.calculateTotalEarnings(),
          averageRating: data.averageRating || 0,
          totalReviews: data.totalReviews || 0
        }
        
      } catch (err) {
        console.error('Error fetching doctor data:', err)
        throw new Error('Failed to load doctor information')
      }
    },
    
    async fetchWalletBalance() {
      try {
        const authToken = localStorage.getItem('authToken')
        
        // Use doctor ID in path parameter
        const response = await fetch(`${this.apiBaseUrl}/wallet/${this.doctorId}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        })
        
        if (!response.ok) {
          // If endpoint doesn't exist, don't throw error
          return
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
        
        // Use doctor ID in path parameter
        const response = await fetch(`${this.apiBaseUrl}/wallet/transactions/${this.doctorId}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        })
        
        if (!response.ok) {
          // If endpoint doesn't exist, don't throw error
          return
        }
        
        const data = await response.json()
        this.transactions = data || []
        
      } catch (err) {
        console.error('Error fetching transactions:', err)
        this.transactions = []
      }
    },
    
    async saveChanges() {
      if (!this.hasChanges || this.saving) return
      
      this.saving = true
      
      try {
        const authToken = localStorage.getItem('authToken')
        
        const response = await fetch(`${this.apiBaseUrl}/doctors/profile/${this.doctorId}/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({
            consultationPrice: parseInt(this.editedDoctor.consultationPrice) || 0,
            commissionPercent: parseInt(this.editedDoctor.commissionPercent) || 0,
            maxConcurrentConsultations: parseInt(this.editedDoctor.maxConcurrentConsultations) || 1,
            isActive: this.editedDoctor.isActive
          })
        })
        
        if (!response.ok) {
          throw new Error('Failed to save changes')
        }
        
        // Update original doctor data
        this.doctor.consultationPrice = this.editedDoctor.consultationPrice
        this.doctor.commissionPercent = this.editedDoctor.commissionPercent
        this.doctor.maxConcurrentConsultations = this.editedDoctor.maxConcurrentConsultations
        this.doctor.isActive = this.editedDoctor.isActive
        
        this.hasChanges = false
        this.showSuccessModal = true
        
      } catch (err) {
        console.error('Error saving changes:', err)
        alert('Failed to save changes. Please try again.')
      } finally {
        this.saving = false
      }
    },
    
    markAsChanged() {
      this.hasChanges = true
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
    
    formatNumber(value, decimals = 2) {
      if (value === null || value === undefined || isNaN(value)) {
        return '0.00'
      }
      return parseFloat(value).toFixed(decimals)
    },
    
    formatDate(date) {
      if (!date) return 'N/A'
      
      try {
        return moment(date).format('MMM D, YYYY')
      } catch (err) {
        return 'N/A'
      }
    },
    
    increaseMaxPatients() {
      if (this.editedDoctor.maxConcurrentConsultations < 10) {
        this.editedDoctor.maxConcurrentConsultations++
        this.markAsChanged()
      }
    },
    
    decreaseMaxPatients() {
      if (this.editedDoctor.maxConcurrentConsultations > 1) {
        this.editedDoctor.maxConcurrentConsultations--
        this.markAsChanged()
      }
    },
    
    viewDoctorReviews() {
      this.$router.push('/doctorreviews')
    },
    
    viewAllTransactions() {
      // Navigate to transactions page or emit event
      this.$emit('view-all-transactions', this.doctorId)
    },
    
    closeSuccessModal() {
      this.showSuccessModal = false
    }
  }
}
</script>

<style scoped>
.admin-doctor-detail-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1f35 0%, #2d3748 100%);
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
  background: rgba(255, 255, 255, 0.03);
  animation: float 20s infinite linear;
}

.circle-1 {
  width: 400px;
  height: 400px;
  top: -200px;
  left: -200px;
  animation-delay: 0s;
}

.circle-2 {
  width: 300px;
  height: 300px;
  bottom: -150px;
  right: -150px;
  animation-delay: 10s;
}

.circle-3 {
  width: 200px;
  height: 200px;
  top: 50%;
  right: 20%;
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
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.02);
  }
}

/* Header */
.admin-header {
  background: rgba(26, 32, 44, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.back-btn {
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.back-btn:hover {
  background: #4299e1;
  border-color: #4299e1;
  transform: translateX(-2px);
}

.back-btn:hover svg {
  color: white;
}

.back-btn svg {
  width: 20px;
  height: 20px;
  color: rgba(255, 255, 255, 0.8);
  transition: color 0.2s ease;
}

.header-info {
  flex: 1;
}

.header-title {
  font-size: 24px;
  font-weight: 700;
  color: white;
  margin: 0 0 4px 0;
}

.header-subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.header-action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.header-action-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.header-action-btn.review-btn:hover {
  background: #ed8936;
  border-color: #ed8936;
  color: white;
}

.header-action-btn.save-btn:hover:not(:disabled) {
  background: #48bb78;
  border-color: #48bb78;
  color: white;
}

.header-action-btn.save-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.header-action-btn svg {
  width: 16px;
  height: 16px;
}

/* Main Content */
.admin-content {
  position: relative;
  z-index: 1;
  padding: 24px;
}

.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
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
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: #4299e1;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

.loading-state p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
}

/* Error State */
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
  background: rgba(26, 32, 44, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.error-state svg {
  width: 60px;
  height: 60px;
  color: #fc8181;
  margin-bottom: 20px;
}

.error-state h3 {
  font-size: 20px;
  color: white;
  margin-bottom: 10px;
}

.error-state p {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 20px;
}

.retry-btn {
  padding: 12px 24px;
  background: linear-gradient(135deg, #4299e1 0%, #2b6cb0 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 153, 225, 0.4);
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
  background: rgba(26, 32, 44, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.stat-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #4299e1 0%, #2b6cb0 100%);
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
  color: white;
  line-height: 1.2;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
}

/* Two Column Layout */
.admin-columns {
  display: grid;
  grid-template-columns: 1fr 450px;
  gap: 24px;
}

@media (max-width: 1200px) {
  .admin-columns {
    grid-template-columns: 1fr;
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
  background: rgba(26, 32, 44, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 32px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
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
  width: 120px;
  height: 120px;
  flex-shrink: 0;
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  object-fit: cover;
  border: 4px solid #4299e1;
  box-shadow: 0 8px 25px rgba(66, 153, 225, 0.3);
}

.profile-info {
  flex: 1;
}

.doctor-name {
  font-size: 28px;
  font-weight: 800;
  color: white;
  margin: 0 0 8px 0;
  line-height: 1.2;
}

.doctor-specialty {
  font-size: 16px;
  color: #4299e1;
  font-weight: 600;
  margin: 0 0 16px 0;
}

.verification-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(72, 187, 120, 0.2);
  color: #9ae6b4;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  border: 1px solid rgba(72, 187, 120, 0.3);
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
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
}

.detail-value {
  font-size: 15px;
  color: white;
  font-weight: 600;
  text-align: right;
}

.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.status-badge.active {
  background: rgba(72, 187, 120, 0.2);
  color: #9ae6b4;
  border: 1px solid rgba(72, 187, 120, 0.3);
}

/* Settings Card */
.settings-card {
  background: rgba(26, 32, 44, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 32px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 700;
  color: white;
  margin: 0 0 24px 0;
}

.section-title svg {
  width: 20px;
  height: 20px;
  color: #4299e1;
}

.setting-item {
  padding: 20px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.setting-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.setting-info {
  margin-bottom: 12px;
}

.setting-info h4 {
  font-size: 15px;
  font-weight: 600;
  color: white;
  margin: 0 0 4px 0;
}

.setting-info p {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  line-height: 1.4;
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
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
}

.price-input .currency {
  padding: 0 12px;
  font-size: 15px;
  font-weight: 600;
  color: #4299e1;
  background: rgba(255, 255, 255, 0.1);
  height: 40px;
  display: flex;
  align-items: center;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
}

.price-input.percent {
  flex-direction: row-reverse;
}

.price-input.percent .percent-symbol {
  padding: 0 12px;
  font-size: 15px;
  font-weight: 600;
  color: #4299e1;
  background: rgba(255, 255, 255, 0.1);
  height: 40px;
  display: flex;
  align-items: center;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
}

.price-input input {
  width: 100px;
  padding: 0 12px;
  border: none;
  font-size: 15px;
  font-weight: 600;
  color: white;
  background: transparent;
  height: 40px;
}

.price-input input:focus {
  outline: none;
}

.number-input {
  display: flex;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
}

.number-btn {
  width: 36px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  font-size: 16px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.number-btn:hover {
  background: #4299e1;
}

.number-btn.minus {
  border-right: 1px solid rgba(255, 255, 255, 0.2);
}

.number-btn.plus {
  border-left: 1px solid rgba(255, 255, 255, 0.2);
}

.number-input input {
  width: 50px;
  padding: 0 8px;
  border: none;
  font-size: 15px;
  font-weight: 600;
  color: white;
  background: transparent;
  height: 40px;
  text-align: center;
}

.number-input input:focus {
  outline: none;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
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
  background-color: rgba(255, 255, 255, 0.2);
  transition: .3s;
  border-radius: 34px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .3s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: #48bb78;
}

input:checked + .toggle-slider:before {
  transform: translateX(24px);
}

.status-text {
  font-size: 14px;
  font-weight: 500;
  color: white;
}

/* Right Column */
.right-column {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Wallet Card */
.wallet-card {
  background: linear-gradient(135deg, #4299e1 0%, #2b6cb0 100%);
  border-radius: 20px;
  padding: 28px;
  color: white;
  box-shadow: 0 10px 40px rgba(66, 153, 225, 0.3);
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
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
}

.wallet-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  color: white;
}

.wallet-title svg {
  width: 20px;
  height: 20px;
}

.wallet-balance {
  margin-bottom: 24px;
  position: relative;
  z-index: 1;
}

.balance-label {
  font-size: 13px;
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
  font-size: 20px;
  font-weight: 600;
}

.amount {
  font-size: 36px;
  font-weight: 800;
  line-height: 1;
}

.wallet-stats {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 1;
}

.wallet-stat-item {
  text-align: center;
  flex: 1;
}

.wallet-stat-item .stat-label {
  font-size: 12px;
  opacity: 0.9;
  display: block;
  margin-bottom: 4px;
}

.wallet-stat-item .stat-value {
  font-size: 18px;
  font-weight: 700;
}

/* Schedule Card */
.schedule-card {
  background: rgba(26, 32, 44, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 28px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.schedule-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 20px;
}

.schedule-day-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.day-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.day-header h4 {
  font-size: 14px;
  font-weight: 600;
  color: white;
  margin: 0;
}

.slot-count {
  padding: 3px 8px;
  background: #4299e1;
  color: white;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 600;
}

.time-slots-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 150px;
  overflow-y: auto;
}

.time-slots-list::-webkit-scrollbar {
  width: 3px;
}

.time-slots-list::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
}

.time-slots-list::-webkit-scrollbar-thumb {
  background: #4299e1;
  border-radius: 2px;
}

.time-slot-item {
  padding: 6px 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
}

.no-slots {
  padding: 12px;
  text-align: center;
  color: rgba(255, 255, 255, 0.3);
  font-size: 12px;
  font-style: italic;
}

/* Transaction Card */
.transaction-card {
  background: rgba(26, 32, 44, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 28px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.view-all-btn {
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-all-btn:hover {
  background: #4299e1;
  border-color: #4299e1;
  color: white;
}

.transactions-list {
  max-height: 250px;
  overflow-y: auto;
}

.transactions-list::-webkit-scrollbar {
  width: 4px;
}

.transactions-list::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
}

.transactions-list::-webkit-scrollbar-thumb {
  background: #4299e1;
  border-radius: 2px;
}

.empty-transactions {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
}

.empty-transactions svg {
  width: 40px;
  height: 40px;
  color: rgba(255, 255, 255, 0.2);
  margin-bottom: 12px;
}

.empty-transactions p {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.transaction-item:last-child {
  border-bottom: none;
}

.transaction-info {
  flex: 1;
}

.transaction-type {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: white;
  margin-bottom: 2px;
}

.transaction-date {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
}

.transaction-amount .amount {
  font-size: 15px;
  font-weight: 700;
  color: #fc8181;
}

.transaction-amount .amount.positive {
  color: #9ae6b4;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

.modal-content {
  background: #1a1f35;
  border-radius: 20px;
  width: 100%;
  max-width: 400px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: modalSlideIn 0.3s ease;
}

.success-modal {
  padding: 40px;
  text-align: center;
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

.modal-icon {
  width: 70px;
  height: 70px;
  background: #48bb78;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.modal-icon svg {
  width: 35px;
  height: 35px;
  color: white;
}

.success-modal h3 {
  font-size: 22px;
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
}

.success-modal p {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 24px;
}

.modal-actions {
  display: flex;
  justify-content: center;
}

.modal-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modal-btn.primary {
  background: linear-gradient(135deg, #4299e1 0%, #2b6cb0 100%);
  color: white;
}

.modal-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 153, 225, 0.4);
}

/* Spinner Animation */
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>