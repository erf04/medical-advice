<template>
  <div class="settlement-requests-container">
    <!-- Header -->
    <header class="admin-header">
      <div class="header-content">
        <div class="header-info">
          <h1 class="header-title">Settlement Requests</h1>
          <p class="header-subtitle">Manage doctor withdrawal requests</p>
        </div>
        <div class="header-actions">
          <button class="action-btn secondary" @click="fetchRequests">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clip-rule="evenodd" />
            </svg>
            Refresh
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="admin-main">
      <!-- Loading State -->
      <div v-if="isLoading" class="loading-container">
        <div class="spinner"></div>
        <p>Loading settlement requests...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
        </svg>
        <h3>Unable to Load Requests</h3>
        <p>{{ error }}</p>
        <button @click="fetchRequests" class="retry-btn">Try Again</button>
      </div>

      <!-- Filter Tabs -->
      <div v-else class="filters-section">
        <div class="filter-tabs">
          <button 
            v-for="tab in filterTabs" 
            :key="tab.value"
            :class="['tab-btn', { active: activeFilter === tab.value }]"
            @click="activeFilter = tab.value"
          >
            {{ tab.label }}
            <span class="tab-badge">{{ getCountByStatus(tab.value) }}</span>
          </button>
        </div>

        <!-- Search -->
        <div class="search-container">
          <div class="search-input">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clip-rule="evenodd" />
            </svg>
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search by doctor name or patient name..."
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

      <!-- Requests Table -->
      <div v-if="!isLoading && !error" class="requests-table-section">
        <div class="section-header">
          <h2 class="section-title">Settlement Requests</h2>
          <span class="total-count">Total: {{ filteredRequests.length }} requests</span>
        </div>

        <div v-if="filteredRequests.length === 0" class="empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
          </svg>
          <h3>No Settlement Requests</h3>
          <p>There are no {{ activeFilter !== 'all' ? activeFilter.toLowerCase() : '' }} settlement requests at the moment.</p>
        </div>

        <div v-else class="table-container">
          <table class="requests-table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Patient</th>
                <th>Consultation</th>
                <th>Amount</th>
                <th>Commission</th>
                <th>Net Amount</th>
                <th>Status</th>
                <th>Requested</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="request in paginatedRequests" :key="request.id">
                <td>
                  <div class="doctor-cell">
                    <div class="doctor-info">
                      <div class="doctor-name">Dr. {{ request.consultation?.doctor?.user?.firstName }} {{ request.consultation?.doctor?.user?.lastName }}</div>
                      <div class="doctor-code">{{ request.consultation?.doctor?.medicalCode }}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="patient-cell">
                    <div class="patient-name">{{ request.consultation?.patient?.user?.firstName }} {{ request.consultation?.patient?.user?.lastName }}</div>
                    <div class="patient-gender">{{ request.consultation?.patient?.gender || 'N/A' }}</div>
                  </div>
                </td>
                <td>
                  <div class="consultation-cell">
                    <div class="consultation-subject">{{ request.consultation?.subject }}</div>
                    <div class="consultation-date">{{ formatJalaliDate(request.consultation?.reservedDate) }}</div>
                    <div class="consultation-time">{{ request.consultation?.startTime }} - {{ request.consultation?.endTime }}</div>
                  </div>
                </td>
                <td>
                  <span class="amount">${{ formatNumber(request.consultation?.price) }}</span>
                </td>
                <td>
                  <span class="commission">{{ request.consultation?.commissionPercent }}%</span>
                </td>
                <td>
                  <span class="net-amount">
                    ${{ formatNumber(request.consultation?.price * (1 - request.consultation?.commissionPercent / 100)) }}
                  </span>
                </td>
                <td>
                  <span :class="['status-badge', getStatusClass(request.adminResponse)]">
                    {{ request.adminResponse }}
                  </span>
                </td>
                <td>
                  <div class="date-cell">
                    {{ formatDate(request.createdAt) }}
                  </div>
                </td>
                <td>
                  <div v-if="request.adminResponse === 'PENDING'" class="action-buttons">
                    <button class="action-btn approve" @click="openActionModal(request, 'APPROVED')" title="Approve">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd" />
                      </svg>
                    </button>
                    <button class="action-btn reject" @click="openActionModal(request, 'REJECTED')" title="Reject">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <div v-else class="action-buttons">
                    <span class="responded-at">{{ formatDate(request.respondedAt) }}</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="filteredRequests.length > 0" class="pagination">
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

    <!-- Action Modal -->
    <div v-if="showActionModal" class="modal-overlay" @click.self="closeActionModal">
      <div class="modal-content small">
        <div class="modal-header">
          <h3>{{ actionType === 'APPROVED' ? 'Approve' : 'Reject' }} Settlement</h3>
          <button class="modal-close" @click="closeActionModal">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="request-summary">
            <div class="summary-icon" :class="{ 'approve': actionType === 'APPROVED', 'reject': actionType === 'REJECTED' }">
              <svg v-if="actionType === 'APPROVED'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
              </svg>
            </div>
            
            <h3>Are you sure?</h3>
            <p>
              {{ actionType === 'APPROVED' 
                ? 'This will approve the settlement request and release funds to the doctor.' 
                : 'This will reject the settlement request. The doctor will be notified.' 
              }}
            </p>

            <div v-if="selectedRequest" class="request-details">
              <div class="detail-row">
                <span>Doctor:</span>
                <strong>Dr. {{ selectedRequest.consultation?.doctor?.user?.firstName }} {{ selectedRequest.consultation?.doctor?.user?.lastName }}</strong>
              </div>
              <div class="detail-row">
                <span>Amount:</span>
                <strong>${{ formatNumber(selectedRequest.consultation?.price) }}</strong>
              </div>
              <div class="detail-row">
                <span>Commission:</span>
                <strong>{{ selectedRequest.consultation?.commissionPercent }}%</strong>
              </div>
              <div class="detail-row total">
                <span>Net Amount:</span>
                <strong class="net-amount">
                  ${{ formatNumber(selectedRequest.consultation?.price * (1 - selectedRequest.consultation?.commissionPercent / 100)) }}
                </strong>
              </div>
            </div>
          </div>
          
          <div class="modal-footer">
            <button class="modal-btn secondary" @click="closeActionModal">
              Cancel
            </button>
            <button 
              class="modal-btn" 
              :class="actionType === 'APPROVED' ? 'approve' : 'reject'"
              @click="processAction"
              :disabled="processing"
            >
              <span v-if="processing" class="spinner-small"></span>
              <span v-else>{{ actionType === 'APPROVED' ? 'Approve' : 'Reject' }}</span>
            </button>
          </div>
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
        <h3>Success!</h3>
        <p>Settlement request has been {{ actionType === 'APPROVED' ? 'approved' : 'rejected' }} successfully.</p>
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
import moment from 'moment-jalaali';

export default {
  name: 'SettlementRequests',
  
  data() {
    return {
      // API Configuration
      apiBaseUrl: 'http://localhost:8000',
      
      // Requests data
      requests: [],
      filteredRequests: [],
      isLoading: false,
      error: null,
      
      // Filter and search
      activeFilter: 'all',
      searchQuery: '',
      
      // Pagination
      currentPage: 1,
      itemsPerPage: 10,
      
      // Modal states
      showActionModal: false,
      showSuccessModal: false,
      selectedRequest: null,
      actionType: null,
      processing: false,
      
      // Filter tabs
      filterTabs: [
        { label: 'All', value: 'all' },
        { label: 'Pending', value: 'PENDING' },
        { label: 'Approved', value: 'APPROVED' },
        { label: 'Rejected', value: 'REJECTED' }
      ]
    }
  },
  
  computed: {
    totalPages() {
      return Math.ceil(this.filteredRequests.length / this.itemsPerPage)
    },
    
    paginatedRequests() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredRequests.slice(start, end)
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
    activeFilter() {
      this.applyFilters()
      this.currentPage = 1
    },
    
    searchQuery() {
      this.applyFilters()
      this.currentPage = 1
    }
  },
  
  async mounted() {
    await this.fetchRequests()
  },
  
  methods: {
    async fetchRequests() {
      this.isLoading = true
      this.error = null
      
      try {
        const authToken = localStorage.getItem('authToken')
        
        if (!authToken) {
          throw new Error('Authentication required')
        }
        
        const response = await fetch(`${this.apiBaseUrl}/settlements/all/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        })
        
        if (!response.ok) {
          throw new Error('Failed to fetch settlement requests')
        }
        
        const data = await response.json()
        this.requests = data || []
        this.applyFilters()
        
      } catch (err) {
        console.error('Error fetching settlement requests:', err)
        this.error = err.message || 'Failed to load settlement requests'
        this.requests = []
        this.filteredRequests = []
      } finally {
        this.isLoading = false
      }
    },
    
    applyFilters() {
      let filtered = [...this.requests]
      
      // Apply status filter
      if (this.activeFilter !== 'all') {
        filtered = filtered.filter(r => r.adminResponse === this.activeFilter)
      }
      
      // Apply search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(r => 
          `${r.consultation?.doctor?.user?.firstName} ${r.consultation?.doctor?.user?.lastName}`.toLowerCase().includes(query) ||
          `${r.consultation?.patient?.user?.firstName} ${r.consultation?.patient?.user?.lastName}`.toLowerCase().includes(query) ||
          r.consultation?.subject?.toLowerCase().includes(query)
        )
      }
      
      this.filteredRequests = filtered
    },
    
    handleSearch() {
      // Search is handled by watch
    },
    
    clearSearch() {
      this.searchQuery = ''
    },
    
    getCountByStatus(status) {
      if (status === 'all') {
        return this.requests.length
      }
      return this.requests.filter(r => r.adminResponse === status).length
    },
    
    getStatusClass(status) {
      return {
        'status-pending': status === 'PENDING',
        'status-approved': status === 'APPROVED',
        'status-rejected': status === 'REJECTED'
      }
    },
    
    openActionModal(request, actionType) {
      this.selectedRequest = request
      this.actionType = actionType
      this.showActionModal = true
    },
    
    closeActionModal() {
      this.showActionModal = false
      this.selectedRequest = null
      this.actionType = null
    },
    
    async processAction() {
      if (!this.selectedRequest || !this.actionType || this.processing) return
      
      this.processing = true
      
      try {
        const authToken = localStorage.getItem('authToken')
        
        const response = await fetch(`${this.apiBaseUrl}/settlements/${this.selectedRequest.id}/settlement-status`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({
            status: this.actionType
          })
        })
        
        if (!response.ok) {
          throw new Error('Failed to update settlement status')
        }
        
        // Update local data
        const index = this.requests.findIndex(r => r.id === this.selectedRequest.id)
        if (index !== -1) {
          this.requests[index].adminResponse = this.actionType
          this.requests[index].respondedAt = new Date().toISOString()
        }
        
        this.applyFilters()
        this.closeActionModal()
        this.showSuccessModal = true
        
      } catch (err) {
        console.error('Error processing settlement:', err)
        alert('Failed to process settlement request. Please try again.')
      } finally {
        this.processing = false
      }
    },
    
    closeSuccessModal() {
      this.showSuccessModal = false
    },
    
    formatNumber(value, decimals = 2) {
      if (value === null || value === undefined || isNaN(value)) {
        return '0.00'
      }
      return parseFloat(value).toFixed(decimals)
    },
    
    formatDate(dateString) {
      if (!dateString) return 'N/A'
      
      try {
        return moment(dateString).format('MMM D, YYYY • HH:mm')
      } catch (err) {
        return 'N/A'
      }
    },
    
    formatJalaliDate(dateString) {
      if (!dateString) return 'N/A'
      const [year, month, day] = dateString.split('-').map(Number)
      return moment(`${year}/${month}/${day}`, 'jYYYY/jM/jD').format('jYYYY/jMM/jDD')
    },
    
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
      }
    }
  }
}
</script>

<style scoped>
.settlement-requests-container {
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

.action-btn.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.action-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
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

/* Filters Section */
.filters-section {
  background: rgba(26, 32, 44, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.filter-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.tab-btn.active {
  background: #4299e1;
  border-color: #4299e1;
  color: white;
}

.tab-badge {
  padding: 2px 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
}

.tab-btn.active .tab-badge {
  background: rgba(255, 255, 255, 0.3);
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

/* Requests Table Section */
.requests-table-section {
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

.requests-table {
  width: 100%;
  border-collapse: collapse;
  color: white;
}

.requests-table th {
  text-align: left;
  padding: 16px 12px;
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.requests-table td {
  padding: 16px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 14px;
}

.doctor-cell,
.patient-cell {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.doctor-name,
.patient-name {
  font-weight: 600;
  color: white;
}

.doctor-code {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  font-family: monospace;
}

.patient-gender {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
}

.consultation-cell {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.consultation-subject {
  font-weight: 500;
  color: white;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.consultation-date {
  font-size: 11px;
  color: #4299e1;
}

.consultation-time {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
}

.amount {
  font-weight: 600;
  color: #48bb78;
}

.commission {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
}

.net-amount {
  font-weight: 600;
  color: #4299e1;
}

/* Status Badges */
.status-badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.status-pending {
  background: rgba(237, 137, 54, 0.2);
  color: #fbd38d;
  border: 1px solid rgba(237, 137, 54, 0.3);
}

.status-approved {
  background: rgba(72, 187, 120, 0.2);
  color: #9ae6b4;
  border: 1px solid rgba(72, 187, 120, 0.3);
}

.status-rejected {
  background: rgba(229, 62, 62, 0.2);
  color: #fc8181;
  border: 1px solid rgba(229, 62, 62, 0.3);
}

.date-cell {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.action-buttons {
  display: flex;
  gap: 8px;
  justify-content: flex-start;
}

.action-btn {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn.approve {
  background: rgba(72, 187, 120, 0.1);
  color: #9ae6b4;
  border: 1px solid rgba(72, 187, 120, 0.3);
}

.action-btn.approve:hover {
  background: #48bb78;
  color: white;
  transform: translateY(-2px);
}

.action-btn.reject {
  background: rgba(229, 62, 62, 0.1);
  color: #fc8181;
  border: 1px solid rgba(229, 62, 62, 0.3);
}

.action-btn.reject:hover {
  background: #e53e3e;
  color: white;
  transform: translateY(-2px);
}

.action-btn svg {
  width: 18px;
  height: 18px;
}

.responded-at {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
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
  width: 60px;
  height: 60px;
  color: rgba(255, 255, 255, 0.2);
  margin-bottom: 16px;
}

.empty-state h3 {
  font-size: 18px;
  color: white;
  margin-bottom: 8px;
}

.empty-state p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
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
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 20px;
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
  background: #4299e1;
  border-color: #4299e1;
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
  padding: 20px;
}

.modal-content {
  background: #1a1f35;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  animation: modalSlideIn 0.3s ease;
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
  padding: 24px;
}

.request-summary {
  text-align: center;
}

.summary-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}

.summary-icon.approve {
  background: rgba(72, 187, 120, 0.2);
  color: #9ae6b4;
}

.summary-icon.reject {
  background: rgba(229, 62, 62, 0.2);
  color: #fc8181;
}

.summary-icon svg {
  width: 30px;
  height: 30px;
}

.request-summary h3 {
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
}

.request-summary p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  margin-bottom: 24px;
}

.request-details {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 16px;
  text-align: left;
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

.detail-row.total {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 16px;
}

.detail-row span {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
}

.detail-row strong {
  color: white;
  font-size: 14px;
}

.detail-row .net-amount {
  color: #4299e1;
  font-size: 16px;
}

.modal-footer {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
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

.modal-btn.approve {
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  color: white;
}

.modal-btn.approve:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(72, 187, 120, 0.4);
}

.modal-btn.reject {
  background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%);
  color: white;
}

.modal-btn.reject:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(229, 62, 62, 0.4);
}

.modal-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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

.modal-btn.primary {
  background: linear-gradient(135deg, #4299e1 0%, #2b6cb0 100%);
  color: white;
}

.modal-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 153, 225, 0.4);
}

/* Animation */
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 1200px) {
  .requests-table {
    font-size: 13px;
  }
  
  .consultation-subject {
    max-width: 150px;
  }
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .header-actions {
    width: 100%;
  }
  
  .action-btn {
    width: 100%;
    justify-content: center;
  }
  
  .filter-tabs {
    flex-direction: column;
  }
  
  .tab-btn {
    width: 100%;
    justify-content: center;
  }
  
  .pagination {
    flex-wrap: wrap;
  }
  
  .page-numbers {
    order: -1;
    width: 100%;
    justify-content: center;
  }
}
</style>