<template>
  <div class="admin-patients-container">
    <!-- Header -->
    <header class="admin-header">
      <div class="header-content">
        <div class="header-info">
          <h1 class="header-title">Patients Management</h1>
          <p class="header-subtitle">Manage all registered patients</p>
        </div>
        <div class="header-actions">
          <button class="action-btn primary" @click="openAddPatientModal">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clip-rule="evenodd" />
            </svg>
            Add Patient
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="admin-main">
      <!-- Search Section -->
      <div class="search-section">
        <div class="search-container">
          <div class="search-input">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clip-rule="evenodd" />
            </svg>
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search patients by name, phone, or email..."
              @input="handleSearch"
            />
            <button v-if="searchQuery" class="clear-search" @click="clearSearch">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="loading-container">
        <div class="spinner"></div>
        <p>Loading patients...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
        </svg>
        <h3>Unable to Load Patients</h3>
        <p>{{ error }}</p>
        <button @click="fetchPatients" class="retry-btn">Try Again</button>
      </div>

      <!-- Patients Table -->
      <div v-else class="patients-table-section">
        <div class="section-header">
          <h2 class="section-title">Patients List</h2>
          <span class="total-count">Total: {{ filteredPatients.length }} patients</span>
        </div>

        <div class="table-container">
          <table class="patients-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Contact</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="patient in paginatedPatients" :key="patient.id">
                <td>
                  <div class="patient-cell">
                    <img :src="patient.user?.profileImage || defaultPatientImage" :alt="patient.user?.firstName" class="patient-avatar">
                    <div>
                      <div class="patient-name">{{ patient.user?.firstName }} {{ patient.user?.lastName }}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="contact-cell">
                    <div>{{ patient.user?.phone || 'N/A' }}</div>
                    <div class="contact-email">{{ patient.user?.email || 'No email' }}</div>
                  </div>
                </td>
                <td>
                  <span class="patient-age">{{ patient.age || 'N/A' }}</span>
                </td>
                <td>
                  <span class="patient-gender">{{ patient.gender || 'Not specified' }}</span>
                </td>
                <td>
                  <span class="join-date">{{ formatDate(patient.user?.createdAt) }}</span>
                </td>
                <td>
                  <div class="action-buttons">
                    <button class="action-btn-icon view" @click="viewPatientConsultations(patient)" title="View Consultations">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clip-rule="evenodd" />
                      </svg>
                    </button>
                    <button class="action-btn-icon edit" @click="editPatient(patient)" title="Edit">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                      </svg>
                    </button>
                    <button class="action-btn-icon delete" @click="confirmDeletePatient(patient)" title="Delete">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.5-.058l-.346 9a.75.75 0 101.499.058l.347-9z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredPatients.length === 0">
                <td colspan="6" class="empty-table">
                  <div class="empty-state">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
                    </svg>
                    <h3>No Patients Found</h3>
                    <p>Try adjusting your search or add a new patient</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="!isLoading && !error && filteredPatients.length > 0" class="pagination">
          <button 
            class="pagination-btn prev" 
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clip-rule="evenodd" />
            </svg>
            Previous
          </button>
          
          <div class="page-numbers">
            <button 
              v-for="page in visiblePages" 
              :key="page"
              :class="['page-number', { active: page === currentPage }]"
              @click="changePage(page)"
            >
              {{ page }}
            </button>
          </div>
          
          <button 
            class="pagination-btn next"
            :disabled="currentPage === totalPages"
            @click="changePage(currentPage + 1)"
          >
            Next
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </main>

    <!-- Add/Edit Patient Modal -->
    <div v-if="showPatientModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content large">
        <div class="modal-header">
          <h3>{{ editingPatient ? 'Edit Patient' : 'Add New Patient' }}</h3>
          <button class="modal-close" @click="closeModal">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div class="modal-body">
          <form @submit.prevent="savePatient">
            <!-- Personal Information -->
            <h4 class="form-section-title">Personal Information</h4>
            
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">First Name <span class="required">*</span></label>
                <input 
                  type="text" 
                  id="firstName" 
                  v-model="patientForm.firstName"
                  placeholder="Enter first name"
                  required
                />
              </div>
              
              <div class="form-group">
                <label for="lastName">Last Name <span class="required">*</span></label>
                <input 
                  type="text" 
                  id="lastName" 
                  v-model="patientForm.lastName"
                  placeholder="Enter last name"
                  required
                />
              </div>
            </div>

            <!-- Contact Information -->
            <h4 class="form-section-title">Contact Information</h4>
            
            <div class="form-row">
              <div class="form-group">
                <label for="phone">Phone Number <span class="required">*</span></label>
                <input 
                  type="tel" 
                  id="phone" 
                  v-model="patientForm.phone"
                  placeholder="Enter phone number"
                  required
                />
              </div>
              
              <div class="form-group">
                <label for="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="patientForm.email"
                  placeholder="Enter email (optional)"
                />
              </div>
            </div>

            <!-- Password (only for new patients) -->
            <div v-if="!editingPatient" class="form-row">
              <div class="form-group">
                <label for="password">Password <span class="required">*</span></label>
                <div class="input-with-toggle">
                  <input 
                    :type="showPassword ? 'text' : 'password'" 
                    id="password" 
                    v-model="patientForm.password"
                    placeholder="Enter password"
                    required
                  />
                  <button type="button" class="password-toggle" @click="showPassword = !showPassword">
                    <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                      <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 4.75 11.999 4.75c4.97 0 9.185 2.223 10.675 6.696.123.377.123.754 0 1.131C21.185 17.024 16.97 19.25 12 19.25c-4.97 0-9.185-2.223-10.675-6.697a1.762 1.762 0 010-1.131zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clip-rule="evenodd" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                      <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                      <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
                    </svg>
                  </button>
                </div>
                <div class="input-hint">Minimum 8 characters</div>
              </div>
            </div>

            <!-- Patient Details -->
            <h4 class="form-section-title">Patient Details</h4>
            
            <div class="form-row">
              <div class="form-group">
                <label for="age">Age</label>
                <input 
                  type="number" 
                  id="age" 
                  v-model="patientForm.age"
                  min="1"
                  max="120"
                  placeholder="Enter age"
                />
              </div>
              
              <div class="form-group">
                <label for="gender">Gender</label>
                <select id="gender" v-model="patientForm.gender">
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="trans">Trans</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>
            
            <div class="modal-footer">
              <button type="button" class="modal-btn secondary" @click="closeModal">
                Cancel
              </button>
              <button type="submit" class="modal-btn primary" :disabled="saving">
                <span v-if="saving" class="spinner-small"></span>
                <span v-else>{{ editingPatient ? 'Update' : 'Create' }} Patient</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay" @click.self="closeDeleteModal">
      <div class="modal-content small">
        <div class="modal-header">
          <h3>Confirm Delete</h3>
        </div>
        
        <div class="modal-body">
          <div class="delete-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
            </svg>
          </div>
          <p class="delete-message">
            Are you sure you want to delete 
            <strong>{{ itemToDelete?.user?.firstName }} {{ itemToDelete?.user?.lastName }}</strong>?
          </p>
          <p class="delete-warning">This action cannot be undone.</p>
        </div>
        
        <div class="modal-footer">
          <button class="modal-btn secondary" @click="closeDeleteModal">
            Cancel
          </button>
          <button class="modal-btn delete" @click="confirmDelete" :disabled="deleting">
            <span v-if="deleting" class="spinner-small"></span>
            <span v-else>Delete</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="modal-overlay" @click.self="closeSuccessModal">
      <div class="modal-content success-modal">
        <div class="modal-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
          </svg>
        </div>
        <h3>{{ successMessage }}</h3>
        <p>{{ successDetails }}</p>
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
  name: 'AdminPatients',
  
  data() {
    return {
      // API Configuration
      apiBaseUrl: 'http://localhost:8000',
      
      // Patients data
      patients: [],
      filteredPatients: [],
      isLoading: false,
      error: null,
      
      // Search
      searchQuery: '',
      
      // Pagination
      currentPage: 1,
      itemsPerPage: 10,
      
      // Modals
      showPatientModal: false,
      showDeleteModal: false,
      showSuccessModal: false,
      
      // Form states
      editingPatient: null,
      saving: false,
      deleting: false,
      showPassword: false,
      
      // Success message
      successMessage: '',
      successDetails: '',
      
      // Item to delete
      itemToDelete: null,
      
      // Form data
      patientForm: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        age: '',
        gender: ''
      },
      
      // Default image
      defaultPatientImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR99-ZMZeEtYlFVdT-HN3Hz0f_i64Zf76D67g&s'
    }
  },
  
  computed: {
    totalPages() {
      return Math.ceil(this.filteredPatients.length / this.itemsPerPage)
    },
    
    paginatedPatients() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredPatients.slice(start, end)
    },
    
    visiblePages() {
      const pages = []
      const maxVisible = 5
      
      if (this.totalPages <= maxVisible) {
        for (let i = 1; i <= this.totalPages; i++) pages.push(i)
      } else {
        let start = Math.max(1, this.currentPage - 2)
        let end = Math.min(this.totalPages, start + maxVisible - 1)
        
        if (end - start + 1 < maxVisible) {
          start = Math.max(1, end - maxVisible + 1)
        }
        
        for (let i = start; i <= end; i++) pages.push(i)
      }
      
      return pages
    }
  },
  
  watch: {
    filteredPatients() {
      this.currentPage = 1
    }
  },
  
  async mounted() {
    await this.fetchPatients()
  },
  
  methods: {
    async fetchPatients() {
      this.isLoading = true
      this.error = null
      
      try {
        const authToken = localStorage.getItem('authToken')
        
        if (!authToken) {
          throw new Error('Authentication required')
        }
        
        const response = await fetch(`${this.apiBaseUrl}/admin/patients`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        })
        
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Session expired. Please login again.')
          }
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        this.patients = data || []
        this.filteredPatients = [...this.patients]
        
      } catch (err) {
        console.error('Error fetching patients:', err)
        this.error = err.message || 'Failed to load patients'
        this.patients = []
        this.filteredPatients = []
      } finally {
        this.isLoading = false
      }
    },
    
    handleSearch() {
      if (!this.searchQuery) {
        this.filteredPatients = [...this.patients]
        return
      }
      
      const query = this.searchQuery.toLowerCase()
      this.filteredPatients = this.patients.filter(patient => 
        patient.user?.firstName?.toLowerCase().includes(query) ||
        patient.user?.lastName?.toLowerCase().includes(query) ||
        patient.user?.phone?.toLowerCase().includes(query) ||
        patient.user?.email?.toLowerCase().includes(query)
      )
    },
    
    clearSearch() {
      this.searchQuery = ''
      this.filteredPatients = [...this.patients]
    },
    
    openAddPatientModal() {
      this.editingPatient = null
      this.patientForm = {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        age: '',
        gender: ''
      }
      this.showPatientModal = true
    },
    
    editPatient(patient) {
      this.editingPatient = patient
      this.patientForm = {
        firstName: patient.user?.firstName || '',
        lastName: patient.user?.lastName || '',
        phone: patient.user?.phone || '',
        email: patient.user?.email || '',
        password: '', // Don't populate password for editing
        age: patient.age || '',
        gender: patient.gender || ''
      }
      this.showPatientModal = true
    },
    
    async savePatient() {
      if (this.saving) return
      
      this.saving = true
      
      try {
        const authToken = localStorage.getItem('authToken')
        
        if (this.editingPatient) {
          // Update existing patient
          const response = await fetch(`${this.apiBaseUrl}/admin/patients/${this.editingPatient.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({
              userId: this.editingPatient.user?.id,
              age: this.patientForm.age ? parseInt(this.patientForm.age) : null,
              gender: this.patientForm.gender || null
            })
          })
          
          if (!response.ok) {
            throw new Error('Failed to update patient')
          }
          
          // Refresh patients list
          await this.fetchPatients()
          
          this.successMessage = 'Patient Updated Successfully!'
          this.successDetails = `${this.patientForm.firstName} ${this.patientForm.lastName}'s information has been updated.`
          this.showSuccessModal = true
          this.closeModal()
          
        } else {
          // Create new patient - Step 1: Register user
          const registerPayload = {
            first_name: this.patientForm.firstName,
            last_name: this.patientForm.lastName,
            phone: this.patientForm.phone,
            email: this.patientForm.email || '',
            role: 'patient',
            password: this.patientForm.password
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
          const userId = registerData.user.id
          
          // Step 2: Create patient profile
          const patientPayload = {
            userId: userId,
            age: this.patientForm.age ? parseInt(this.patientForm.age) : null,
            gender: this.patientForm.gender || null
          }
          
          const patientResponse = await fetch(`${this.apiBaseUrl}/admin/patients/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(patientPayload)
          })
          
          if (!patientResponse.ok) {
            throw new Error('Failed to create patient profile')
          }
          
          // Refresh patients list
          await this.fetchPatients()
          
          this.successMessage = 'Patient Created Successfully!'
          this.successDetails = `${this.patientForm.firstName} ${this.patientForm.lastName} has been added to the system.`
          this.showSuccessModal = true
          this.closeModal()
        }
        
      } catch (err) {
        console.error('Error saving patient:', err)
        alert(err.message || 'Failed to save patient')
      } finally {
        this.saving = false
      }
    },
    
    confirmDeletePatient(patient) {
      this.itemToDelete = patient
      this.showDeleteModal = true
    },
    
    async confirmDelete() {
      if (!this.itemToDelete || this.deleting) return
      
      this.deleting = true
      
      try {
        const authToken = localStorage.getItem('authToken')
        
        const response = await fetch(`${this.apiBaseUrl}/admin/patients/${this.itemToDelete.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        })
        
        if (!response.ok) {
          throw new Error('Failed to delete patient')
        }
        
        // Remove from local array
        this.patients = this.patients.filter(p => p.id !== this.itemToDelete.id)
        this.filteredPatients = this.filteredPatients.filter(p => p.id !== this.itemToDelete.id)
        
        this.successMessage = 'Patient Deleted Successfully!'
        this.successDetails = `${this.itemToDelete.user?.firstName} ${this.itemToDelete.user?.lastName} has been removed from the system.`
        this.showSuccessModal = true
        this.closeDeleteModal()
        
      } catch (err) {
        console.error('Error deleting patient:', err)
        alert(err.message || 'Failed to delete patient')
      } finally {
        this.deleting = false
      }
    },
    
    viewPatientConsultations(patient) {
      this.$emit('view-patient-consultations', patient.id)
    },
    
    formatDate(dateString) {
      if (!dateString) return 'N/A'
      return moment(dateString).format('MMM D, YYYY')
    },
    
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
      }
    },
    
    closeModal() {
      this.showPatientModal = false
      this.editingPatient = null
      this.showPassword = false
    },
    
    closeDeleteModal() {
      this.showDeleteModal = false
      this.itemToDelete = null
    },
    
    closeSuccessModal() {
      this.showSuccessModal = false
    }
  }
}
</script>

<style scoped>
/* Admin Patients Container */
.admin-patients-container {
  min-height: 100vh;
  background: transparent;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  position: relative;
  z-index: 1;
}

/* Admin Header */
.admin-header {
  background: rgba(26, 32, 44, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 24px;
  border-radius: 16px;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-info {
  flex: 1;
}

.header-title {
  font-size: 24px;
  font-weight: 700;
  color: white;
  margin-bottom: 4px;
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

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn.primary {
  background: linear-gradient(135deg, #4299e1 0%, #2b6cb0 100%);
  color: white;
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 153, 225, 0.4);
}

.action-btn svg {
  width: 18px;
  height: 18px;
}

/* Admin Main */
.admin-main {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px 40px;
}

/* Search Section */
.search-section {
  background: rgba(26, 32, 44, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.search-container {
  width: 100%;
}

.search-input {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input svg {
  position: absolute;
  left: 16px;
  width: 20px;
  height: 20px;
  color: rgba(255, 255, 255, 0.4);
}

.search-input input {
  width: 100%;
  padding: 14px 16px 14px 48px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-size: 15px;
  color: white;
  transition: all 0.3s ease;
}

.search-input input:focus {
  outline: none;
  border-color: #4299e1;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
}

.search-input input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.clear-search {
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
}

.clear-search:hover {
  color: #fc8181;
}

.clear-search svg {
  width: 18px;
  height: 18px;
}

/* Patients Table Section */
.patients-table-section {
  background: rgba(26, 32, 44, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: white;
  margin: 0;
}

.total-count {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
}

.table-container {
  overflow-x: auto;
  margin-top: 20px;
}

.patients-table {
  width: 100%;
  border-collapse: collapse;
  color: white;
}

.patients-table th {
  text-align: left;
  padding: 16px 12px;
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.patients-table td {
  padding: 16px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 14px;
}

.patient-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.patient-avatar {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  object-fit: cover;
  border: 2px solid #4299e1;
}

.patient-name {
  font-weight: 600;
  color: white;
}

.contact-cell {
  font-size: 13px;
}

.contact-email {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 2px;
}

.patient-age,
.patient-gender {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
}

.join-date {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.action-btn-icon {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.action-btn-icon:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.action-btn-icon.view:hover {
  background: rgba(66, 153, 225, 0.2);
  color: #4299e1;
}

.action-btn-icon.edit:hover {
  background: rgba(72, 187, 120, 0.2);
  color: #48bb78;
}

.action-btn-icon.delete:hover {
  background: rgba(229, 62, 62, 0.2);
  color: #fc8181;
}

.action-btn-icon svg {
  width: 18px;
  height: 18px;
}

/* Empty State */
.empty-table {
  padding: 60px 20px !important;
  text-align: center;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
}

.empty-state svg {
  width: 60px;
  height: 60px;
  margin-bottom: 16px;
  color: rgba(255, 255, 255, 0.2);
}

.empty-state h3 {
  font-size: 18px;
  color: white;
  margin-bottom: 8px;
}

.empty-state p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 32px;
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-btn:hover:not(:disabled) {
  background: rgba(66, 153, 225, 0.2);
  border-color: #4299e1;
}

.pagination-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.pagination-btn svg {
  width: 18px;
  height: 18px;
}

.page-numbers {
  display: flex;
  gap: 8px;
}

.page-number {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-number:hover {
  background: rgba(66, 153, 225, 0.2);
  border-color: #4299e1;
  color: white;
}

.page-number.active {
  background: linear-gradient(135deg, #4299e1 0%, #2b6cb0 100%);
  border-color: #4299e1;
  color: white;
}

/* Loading States */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-top-color: #4299e1;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

.spinner-small {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  display: inline-block;
}

/* Error States */
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.error-container svg {
  width: 60px;
  height: 60px;
  color: #fc8181;
  margin-bottom: 16px;
}

.error-container h3 {
  font-size: 18px;
  color: white;
  margin-bottom: 8px;
}

.error-container p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 20px;
  max-width: 400px;
}

.retry-btn {
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  background: rgba(66, 153, 225, 0.2);
  border-color: #4299e1;
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
  z-index: 1000;
  padding: 5px;
}

.modal-content {
  background: #1a1f35;
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: modalSlideIn 0.3s ease;
}

.modal-content.large {
  max-width: 800px;
}

.modal-content.small {
  max-width: 400px;
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
  padding: 20px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header h3 {
  font-size: 18px;
  font-weight: 700;
  color: white;
  margin: 0;
}

.modal-close {
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: rgba(255, 255, 255, 0.6);
}

.modal-close:hover {
  background: rgba(229, 62, 62, 0.2);
  border-color: #fc8181;
  color: #fc8181;
}

.modal-close svg {
  width: 18px;
  height: 18px;
}

.modal-body {
  padding: 5px;
  max-height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.form-section-title {
  font-size: 16px;
  font-weight: 600;
  color: white;
  margin: 20px 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.form-section-title:first-of-type {
  margin-top: 0;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

.form-group {
  margin-bottom: 0;
  padding: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
}

.required {
  color: #fc8181;
  margin-left: 2px;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  font-size: 14px;
  color: white;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #4299e1;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
}

.form-group input::placeholder,
.form-group select::placeholder,
.form-group textarea::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.form-group select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 16px;
  padding-right: 48px;
}

.form-group select option {
  background: #1a1f35;
  color: white;
}

.input-with-toggle {
  position: relative;
  display: flex;
  align-items: center;
}

.input-with-toggle input {
  padding-right: 48px;
}

.password-toggle {
  position: absolute;
  right: 12px;
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

.input-hint {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 4px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
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

.modal-btn.primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 153, 225, 0.4);
}

.modal-btn.delete {
  background: linear-gradient(135deg, #f56565 0%, #c53030 100%);
  color: white;
}

.modal-btn.delete:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(229, 62, 62, 0.4);
}

.modal-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Delete Confirmation */
.delete-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.delete-icon svg {
  width: 60px;
  height: 60px;
  color: #f56565;
}

.delete-message {
  color: white;
  font-size: 16px;
  text-align: center;
  margin-bottom: 8px;
}

.delete-warning {
  color: #fc8181;
  font-size: 13px;
  text-align: center;
}

/* Success Modal */
.success-modal {
  padding: 40px;
  text-align: center;
}

.success-modal .modal-icon {
  width: 70px;
  height: 70px;
  background: #48bb78;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.success-modal .modal-icon svg {
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

/* Animation */
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>