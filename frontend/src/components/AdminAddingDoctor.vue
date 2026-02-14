<template>
  <div class="admin-add-doctor-container">
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
        <!-- In AdminAddDoctor.vue, in the header, update the back button -->
        <div class="back-btn" @click="$emit('show-doctors-list')">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clip-rule="evenodd" />
        </svg>
        </div>
        <div class="header-info">
          <h1 class="header-title">Add New Doctor</h1>
          <p class="header-subtitle">Create a new doctor account in the system</p>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="admin-main">
      <div class="content-wrapper">
        <!-- Loading State -->
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Loading categories...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error-state">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
          </svg>
          <h3>Failed to Load Data</h3>
          <p>{{ error }}</p>
          <button @click="fetchCategories" class="retry-btn">Try Again</button>
        </div>

        <!-- Form -->
        <form v-else @submit.prevent="createDoctor" class="add-doctor-form">
          <!-- Progress Steps -->
          <div class="form-steps">
            <div class="step" :class="{ active: currentStep === 1, completed: currentStep > 1 }">
              <div class="step-number">1</div>
              <span class="step-label">Account Info</span>
            </div>
            <div class="step-connector" :class="{ active: currentStep > 1 }"></div>
            <div class="step" :class="{ active: currentStep === 2, completed: currentStep > 2 }">
              <div class="step-number">2</div>
              <span class="step-label">Professional Info</span>
            </div>
          </div>

          <!-- Step 1: Account Information -->
          <div v-if="currentStep === 1" class="form-step">
            <h3 class="step-title">Account Information</h3>
            <p class="step-description">Enter the doctor's basic account details</p>

            <div class="form-grid">
              <!-- First Name -->
              <div class="form-group">
                <label for="firstName">
                  First Name <span class="required">*</span>
                </label>
                <div class="input-container">
                  <div class="input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="firstName"
                    v-model="form.account.firstName"
                    type="text"
                    placeholder="Enter first name"
                    required
                  />
                </div>
              </div>

              <!-- Last Name -->
              <div class="form-group">
                <label for="lastName">
                  Last Name <span class="required">*</span>
                </label>
                <div class="input-container">
                  <div class="input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.786 0 011.019-4.38z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="lastName"
                    v-model="form.account.lastName"
                    type="text"
                    placeholder="Enter last name"
                    required
                  />
                </div>
              </div>

              <!-- Phone Number -->
              <div class="form-group">
                <label for="phone">
                  Phone Number <span class="required">*</span>
                </label>
                <div class="input-container">
                  <div class="input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="phone"
                    v-model="form.account.phone"
                    type="tel"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
              </div>

              <!-- Password -->
              <div class="form-group">
                <label for="password">
                  Password <span class="required">*</span>
                </label>
                <div class="input-container">
                  <div class="input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    v-model="form.account.password"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="Enter password"
                    required
                  />
                  <button type="button" class="password-toggle" @click="showPassword = !showPassword">
                    <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                      <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                      <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                      <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 4.75 11.999 4.75c4.97 0 9.185 2.223 10.675 6.696.123.377.123.754 0 1.131C21.185 17.024 16.97 19.25 12 19.25c-4.97 0-9.185-2.223-10.675-6.697a1.762 1.762 0 010-1.131zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div class="input-hint">Minimum 8 characters</div>
              </div>
            </div>

            <div class="form-navigation">
              <button type="button" class="nav-btn secondary" @click="goBack">
                Cancel
              </button>
              <button type="button" class="nav-btn primary" @click="nextStep" :disabled="!isStep1Valid">
                Continue to Professional Info
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Step 2: Professional Information -->
          <div v-else-if="currentStep === 2" class="form-step">
            <h3 class="step-title">Professional Information</h3>
            <p class="step-description">Enter the doctor's professional details</p>

            <div class="form-grid">
              <!-- Medical Code -->
              <div class="form-group">
                <label for="medicalCode">
                  Medical License Code <span class="required">*</span>
                </label>
                <div class="input-container">
                  <div class="input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="medicalCode"
                    v-model="form.professional.medicalCode"
                    type="text"
                    placeholder="e.g., CA-123456"
                    required
                  />
                </div>
              </div>

              <!-- Contact Info -->
              <div class="form-group">
                <label for="contactInfo">
                  Contact Information <span class="required">*</span>
                </label>
                <div class="input-container">
                  <div class="input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="contactInfo"
                    v-model="form.professional.contactInfo"
                    type="text"
                    placeholder="Clinic phone or direct line"
                    required
                  />
                </div>
              </div>

              <!-- Category -->
              <div class="form-group">
                <label for="category">
                  Category <span class="required">*</span>
                </label>
                <div class="input-container">
                  <div class="input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M3.792 2.938A49.069 49.069 0 0112 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 011.541 1.836v1.044a3 3 0 01-.879 2.121l-6.182 6.182a1.5 1.5 0 00-.439 1.061v2.927a3 3 0 01-1.658 2.684l-1.757.878A.75.75 0 019.75 21v-5.818a1.5 1.5 0 00-.44-1.06L3.13 7.938a3 3 0 01-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <select id="category" v-model="form.professional.category" required>
                    <option value="" disabled>Select a category</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                      {{ category.title }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- Consultation Price -->
              <div class="form-group">
                <label for="consultationPrice">
                  Consultation Price ($)
                </label>
                <div class="input-container">
                  <div class="input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM9 7.5A.75.75 0 009 9h1.5c.98 0 1.813.626 2.122 1.5H9A.75.75 0 009 12h3.622a2.251 2.251 0 01-2.122 1.5H9a.75.75 0 00-.53 1.28l3 3a.75.75 0 001.06-1.06l-1.73-1.732A3.752 3.752 0 0014.175 12H15a.75.75 0 000-1.5h-.825A3.733 3.733 0 0013.5 9H15a.75.75 0 000-1.5H9z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="consultationPrice"
                    v-model="form.professional.consultationPrice"
                    type="number"
                    min="0"
                    step="5"
                    placeholder="Enter consultation fee"
                  />
                </div>
              </div>

              <!-- Max Concurrent Consultations -->
              <div class="form-group">
                <label for="maxConcurrent">
                  Max Concurrent Patients
                </label>
                <div class="input-container">
                  <div class="input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.786 0 011.019-4.38z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="maxConcurrent"
                    v-model="form.professional.maxConcurrentConsultations"
                    type="number"
                    min="1"
                    max="10"
                    placeholder="e.g., 3"
                  />
                </div>
                <div class="input-hint">Maximum patients per time slot (1-10)</div>
              </div>

              <!-- Commission Percent -->
              <div class="form-group">
                <label for="commissionPercent">
                  Commission Percent (%)
                </label>
                <div class="input-container">
                  <div class="input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM9 7.5A.75.75 0 009 9h1.5c.98 0 1.813.626 2.122 1.5H9A.75.75 0 009 12h3.622a2.251 2.251 0 01-2.122 1.5H9a.75.75 0 00-.53 1.28l3 3a.75.75 0 001.06-1.06l-1.73-1.732A3.752 3.752 0 0014.175 12H15a.75.75 0 000-1.5h-.825A3.733 3.733 0 0013.5 9H15a.75.75 0 000-1.5H9z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="commissionPercent"
                    v-model="form.professional.commissionPercent"
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    placeholder="e.g., 20"
                  />
                </div>
                <div class="input-hint">Platform commission percentage (0-100)</div>
              </div>
            </div>

            <div class="form-navigation">
              <button type="button" class="nav-btn secondary" @click="prevStep">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clip-rule="evenodd" />
                </svg>
                Back
              </button>
              <button type="submit" class="nav-btn primary" :disabled="submitting || !isStep2Valid">
                <span v-if="submitting" class="spinner-small"></span>
                <span v-else>Create Doctor Account</span>
                <svg v-if="!submitting" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </form>

        <!-- Success Modal -->
        <div v-if="showSuccessModal" class="modal-overlay" @click.self="closeSuccessModal">
          <div class="modal-content success-modal">
            <div class="modal-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
              </svg>
            </div>
            <h3>Doctor Created Successfully!</h3>
            <p>Dr. {{ createdDoctor?.firstName }} {{ createdDoctor?.lastName }} has been added to the system.</p>
            
            <div class="doctor-details-modal">
              <div class="detail-row">
                <span>Name:</span>
                <strong>Dr. {{ createdDoctor?.firstName }} {{ createdDoctor?.lastName }}</strong>
              </div>
              <div class="detail-row">
                <span>Phone:</span>
                <strong>{{ createdDoctor?.phone }}</strong>
              </div>
              <div class="detail-row">
                <span>Medical Code:</span>
                <strong>{{ createdDoctor?.medicalCode }}</strong>
              </div>
            </div>
            
            <div class="modal-actions">
              <button class="modal-btn secondary" @click="closeSuccessModal">
                Close
              </button>
              <button class="modal-btn primary" @click="$emit('show-doctors-list')">
                View All Doctors
                </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'AdminAddingDoctor',
  
  data() {
    return {
      apiBaseUrl: 'http://localhost:8000',
      loading: true,
      error: null,
      submitting: false,
      currentStep: 1,
      showPassword: false,
      showSuccessModal: false,
      createdDoctor: null,
      
      // Categories from API
      categories: [],
      
      // Form data
      form: {
        account: {
          firstName: '',
          lastName: '',
          phone: '',
          password: ''
        },
        professional: {
          medicalCode: '',
          contactInfo: '',
          category: '',
          consultationPrice: '',
          maxConcurrentConsultations: '',
          commissionPercent: ''
        }
      }
    }
  },
  
  computed: {
    isStep1Valid() {
    //   const { firstName, lastName, phone, password } = this.form.account
      return true
    },
    
    isStep2Valid() {
      const { medicalCode, contactInfo, category } = this.form.professional
      return medicalCode && contactInfo && category
    }
  },
  
  async mounted() {
    await this.fetchCategories()
  },
  
  methods: {
    async fetchCategories() {
      this.loading = true
      this.error = null
      
      try {
        const authToken = localStorage.getItem('authToken')
        
        if (!authToken) {
          throw new Error('Authentication required')
        }
        
        const response = await fetch(`${this.apiBaseUrl}/categories/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        })
        
        if (!response.ok) {
          throw new Error('Failed to fetch categories')
        }
        
        const data = await response.json()
        this.categories = data || []
        
      } catch (err) {
        console.error('Error fetching categories:', err)
        this.error = err.message || 'Failed to load categories'
      } finally {
        this.loading = false
      }
    },
    
    nextStep() {
      if (this.isStep1Valid) {
        this.currentStep = 2
      }
    },
    
    prevStep() {
      this.currentStep = 1
    },
    
    goBack() {
      this.$router.go(-1)
    },
    
    async createDoctor() {
      if (!this.isStep2Valid) return
      
      this.submitting = true
      
      try {
        // Step 1: Register the user
        const registerPayload = {
          first_name: this.form.account.firstName,
          last_name: this.form.account.lastName,
          phone: this.form.account.phone,
          email: '',
          role: 'doctor', // Important: Set role to 'doctor', not 'admin'
          password: this.form.account.password
        }
        
        const registerResponse = await fetch(`${this.apiBaseUrl}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registerPayload)
        })
        
        if (!registerResponse.ok) {
          const errorData = await registerResponse.json()
          throw new Error(errorData.message || 'Failed to create user account')
        }
        
        const registerData = await registerResponse.json()
        const accessToken = registerData.accessToken
        const userId = registerData.user.id
        console.log(userId)
        
        // Step 2: Complete doctor profile
        const profilePayload = {
          medicalCode: this.form.professional.medicalCode,
          contactInfo: this.form.professional.contactInfo,
          category: parseInt(this.form.professional.category)
        }
        console.log(this.form.professional)
        // Add optional fields if they have values
        if (this.form.professional.consultationPrice) {
          profilePayload.consultationPrice = parseInt(this.form.professional.consultationPrice)
        }
        
        if (this.form.professional.maxConcurrentConsultations) {
          profilePayload.maxConcurrentConsultations = parseInt(this.form.professional.maxConcurrentConsultations)
        }
        
        if (this.form.professional.commissionPercent) {
          profilePayload.commissionPercent = parseInt(this.form.professional.commissionPercent)
        }
        
        const profileResponse = await fetch(`${this.apiBaseUrl}/doctors/profile/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify(profilePayload)
        })
        
        if (!profileResponse.ok) {
          const errorData = await profileResponse.json()
          throw new Error(errorData.message || 'Failed to create doctor profile')
        }
        
        const profileData = await profileResponse.json()
        
        // Store created doctor data for success modal
        this.createdDoctor = {
          firstName: this.form.account.firstName,
          lastName: this.form.account.lastName,
          phone: this.form.account.phone,
          medicalCode: this.form.professional.medicalCode,
          ...profileData
        }
        
        // Show success modal
        this.showSuccessModal = true
        
        // Reset form
        this.resetForm()
        
      } catch (err) {
        console.error('Error creating doctor:', err)
        alert(err.message || 'Failed to create doctor. Please try again.')
      } finally {
        this.submitting = false
      }
    },
    
    resetForm() {
      this.form = {
        account: {
          firstName: '',
          lastName: '',
          phone: '',
          password: ''
        },
        professional: {
          medicalCode: '',
          contactInfo: '',
          category: '',
          consultationPrice: '',
          maxConcurrentConsultations: '',
          commissionPercent: ''
        }
      }
      this.currentStep = 1
    },
    
    closeSuccessModal() {
      this.showSuccessModal = false
    },
    
    goToDoctorsList() {
      this.$router.push('/admin/dashboard')
    }
  }
}
</script>

<style scoped>
.admin-add-doctor-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1f35 0%, #2d3748 100%);
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

/* Main Content */
.admin-main {
  position: relative;
  z-index: 1;
  padding: 40px 24px;
}

.content-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  background: rgba(26, 32, 44, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
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
  background: rgba(26, 32, 44, 0.9);
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

/* Form */
.add-doctor-form {
  background: rgba(26, 32, 44, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 32px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Form Steps */
.form-steps {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.3s ease;
}

.step.active .step-number {
  background: #4299e1;
  border-color: #4299e1;
  color: white;
  transform: scale(1.1);
}

.step.completed .step-number {
  background: #48bb78;
  border-color: #48bb78;
  color: white;
}

.step-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
}

.step.active .step-label {
  color: white;
}

.step-connector {
  width: 100px;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0 16px;
  transition: all 0.3s ease;
}

.step-connector.active {
  background: #48bb78;
}

/* Form Step */
.form-step {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.step-title {
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin: 0 0 8px 0;
}

.step-description {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 24px;
}

/* Form Grid */
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}

@media (max-width: 640px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}

/* Form Group */
.form-group {
  margin-bottom: 0;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  font-size: 13px;
}

.required {
  color: #fc8181;
  margin-left: 2px;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 16px;
  color: rgba(255, 255, 255, 0.4);
  pointer-events: none;
}

.input-icon svg {
  width: 18px;
  height: 18px;
}

input, select, textarea {
  width: 100%;
  padding: 12px 16px 12px 48px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  font-size: 14px;
  color: white;
  transition: all 0.3s ease;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #4299e1;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
}

input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 16px;
  padding-right: 48px;
}

select option {
  background: #1a1f35;
  color: white;
}

.input-hint {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 4px;
}

.password-toggle {
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
}

.password-toggle:hover {
  color: #4299e1;
}

.password-toggle svg {
  width: 18px;
  height: 18px;
}

/* Form Navigation */
.form-navigation {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-btn.primary {
  background: linear-gradient(135deg, #4299e1 0%, #2b6cb0 100%);
  color: white;
  margin-left: auto;
}

.nav-btn.primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 153, 225, 0.4);
}

.nav-btn.secondary {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-btn svg {
  width: 18px;
  height: 18px;
}

/* Success Modal */
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
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: #1a1f35;
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
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
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
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
  font-size: 24px;
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
}

.success-modal p {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 24px;
}

.doctor-details-modal {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-row span {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
}

.detail-row strong {
  color: white;
  font-size: 14px;
}

.modal-actions {
  display: flex;
  gap: 12px;
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

.modal-btn.secondary {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
}

.modal-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.1);
}

.modal-btn.primary {
  background: linear-gradient(135deg, #4299e1 0%, #2b6cb0 100%);
  color: white;
}

.modal-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 153, 225, 0.4);
}

/* Spinner */
.spinner-small {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  display: inline-block;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>