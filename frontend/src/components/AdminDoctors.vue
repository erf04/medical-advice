<template>
  <div class="admin-doctors-container">
    <!-- Header -->
    <header class="admin-header">
      <div class="header-content">
        <div class="header-info">
          <h1 class="header-title">Doctors Management</h1>
          <p class="header-subtitle">Manage all registered doctors and their categories</p>
        </div>
        <div class="header-actions">
          <button class="action-btn primary" @click="showAddCategoryModal = true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clip-rule="evenodd" />
            </svg>
            Settlement Requests
          </button>
          <button class="action-btn primary" @click="showAddCategoryModal = true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clip-rule="evenodd" />
            </svg>
            Add Category
          </button>
          <!-- In AdminDoctors.vue, update the Add Doctor button -->
          <button class="action-btn secondary" @click="$emit('show-add-doctor')">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clip-rule="evenodd" />
            </svg>
            Add Doctor
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="admin-main">
      <!-- Search and Filter Section -->
      <div class="filters-section">
        <div class="search-container">
          <div class="search-input">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clip-rule="evenodd" />
            </svg>
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search doctors by name, specialty, or medical code..."
              @input="handleSearch"
            >
            <button v-if="searchQuery" class="clear-search" @click="clearSearch">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <div class="filters-container">
          <!-- Category Filter -->
          <div class="filter-group">
            <label class="filter-label">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M3.792 2.938A49.069 49.069 0 0112 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 011.541 1.836v1.044a3 3 0 01-.879 2.121l-6.182 6.182a1.5 1.5 0 00-.439 1.061v2.927a3 3 0 01-1.658 2.684l-1.757.878A.75.75 0 019.75 21v-5.818a1.5 1.5 0 00-.44-1.06L3.13 7.938a3 3 0 01-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836z" clip-rule="evenodd" />
              </svg>
              Filter by Category
            </label>
            <select v-model="selectedCategory" @change="applyFilters" class="filter-select">
              <option value="">All Categories</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.title }}
              </option>
            </select>
          </div>

          <!-- Status Filter -->
          <div class="filter-group">
            <label class="filter-label">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
              </svg>
              Status
            </label>
            <select v-model="selectedStatus" @change="applyFilters" class="filter-select">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div class="active-filters" v-if="hasActiveFilters">
          <span class="filters-label">Active Filters:</span>
          <div class="filter-tags">
            <span v-if="selectedCategory" class="filter-tag" @click="clearCategory">
              {{ getCategoryName(selectedCategory) }}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
              </svg>
            </span>
            <span v-if="selectedStatus" class="filter-tag" @click="selectedStatus = ''; applyFilters()">
              Status: {{ selectedStatus }}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
              </svg>
            </span>
            <button class="clear-all" @click="clearAllFilters">Clear All</button>
          </div>
        </div>
      </div>

      <!-- Categories Section -->
      <div class="categories-section">
        <div class="section-header">
          <h2 class="section-title">Medical Categories</h2>
          <button class="add-category-btn" @click="showAddCategoryModal = true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clip-rule="evenodd" />
            </svg>
            New Category
          </button>
        </div>

        <div v-if="loadingCategories" class="loading-mini">
          <div class="spinner-small"></div>
          <span>Loading categories...</span>
        </div>

        <div v-else-if="categoriesError" class="error-mini">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
          </svg>
          <p>{{ categoriesError }}</p>
          <button @click="fetchCategories" class="retry-small">Retry</button>
        </div>

        <div v-else class="categories-grid">
          <div v-for="category in categories" :key="category.id" class="category-card">
            <div class="category-header">
              <div class="category-icon" :style="{ background: getCategoryColor(category.id) }">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M3.792 2.938A49.069 49.069 0 0112 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 011.541 1.836v1.044a3 3 0 01-.879 2.121l-6.182 6.182a1.5 1.5 0 00-.439 1.061v2.927a3 3 0 01-1.658 2.684l-1.757.878A.75.75 0 019.75 21v-5.818a1.5 1.5 0 00-.44-1.06L3.13 7.938a3 3 0 01-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="category-info">
                <h3>{{ category.title }}</h3>
                <span class="doctor-count">{{ category.doctors?.length || 0 }} doctors</span>
              </div>
              <div class="category-actions">
                <button class="category-btn edit" @click="editCategory(category)" title="Edit Category">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                  </svg>
                </button>
                <button class="category-btn delete" @click="confirmDeleteCategory(category)" title="Delete Category">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.5-.058l-.346 9a.75.75 0 101.499.058l.347-9z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            <div v-if="category.description" class="category-description">
              {{ category.description }}
            </div>
          </div>
        </div>
      </div>

      <!-- Doctors Table -->
      <div class="doctors-table-section">
        <div class="section-header">
          <h2 class="section-title">Doctors List</h2>
          <span class="total-count">Total: {{ filteredDoctors.length }} doctors</span>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="loading-container">
          <div class="spinner"></div>
          <p>Loading doctors...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error-container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
          </svg>
          <h3>Unable to Load Doctors</h3>
          <p>{{ error }}</p>
          <button @click="fetchDoctors" class="retry-btn">Try Again</button>
        </div>

        <!-- Doctors Table -->
        <div v-else class="table-container">
          <table class="doctors-table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Contact</th>
                <th>Medical Code</th>
                <th>Categories</th>
                <th>Fee</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="doctor in paginatedDoctors" :key="doctor.id">
                <td>
                  <div class="doctor-cell">
                    <img :src="doctor.profileImage || defaultDoctorImage" :alt="doctor.firstName" class="doctor-avatar">
                    <div>
                      <div class="doctor-name">Dr. {{ doctor.firstName }} {{ doctor.lastName }}</div>
                      <div class="doctor-specialty">{{ doctor.specialty }}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="contact-cell">
                    <div>{{ doctor.email || 'N/A' }}</div>
                    <div class="contact-phone">{{ doctor.contactInfo || doctor.phone || 'N/A' }}</div>
                  </div>
                </td>
                <td>
                  <span class="medical-code">{{ doctor.medicalCode || 'Not set' }}</span>
                </td>
                <td>
                  <div class="categories-cell">
                    <span v-for="cat in doctor.categories" :key="cat" class="category-badge">
                      {{ getCategoryName(cat) }}
                    </span>
                    <span v-if="!doctor.categories || doctor.categories.length === 0" class="no-categories">
                      No categories
                    </span>
                  </div>
                </td>
                <td>
                  <span class="fee-amount">${{ doctor.consultationFee }}</span>
                </td>
                <td>
                  <span :class="['status-badge', { active: doctor.isActive }]">
                    {{ doctor.isActive ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td>
                  <div class="action-buttons">
                    <button class="action-btn-icon view" @click="$emit('view-doctor-detail', doctor.id)" title="View Details">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                        <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 4.75 11.999 4.75c4.97 0 9.185 2.223 10.675 6.696.123.377.123.754 0 1.131C21.185 17.024 16.97 19.25 12 19.25c-4.97 0-9.185-2.223-10.675-6.697a1.762 1.762 0 010-1.131zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clip-rule="evenodd" />
                      </svg>
                    </button>
                    <button class="action-btn-icon edit" @click="editDoctor(doctor)" title="Edit">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                      </svg>
                    </button>
                    <button class="action-btn-icon delete" @click="confirmDeleteDoctor(doctor)" title="Delete">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.5-.058l-.346 9a.75.75 0 101.499.058l.347-9z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredDoctors.length === 0">
                <td colspan="7" class="empty-table">
                  <div class="empty-state">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
                    </svg>
                    <h3>No Doctors Found</h3>
                    <p>Try adjusting your filters or add a new doctor</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="!isLoading && !error && filteredDoctors.length > 0" class="pagination">
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

    <!-- Add Category Modal -->
    <div v-if="showAddCategoryModal" class="modal-overlay" @click.self="closeModals">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ editingCategory ? 'Edit Category' : 'Add New Category' }}</h3>
          <button class="modal-close" @click="closeModals">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div class="modal-body">
          <form @submit.prevent="saveCategory">
            <div class="form-group">
              <label for="categoryName">Category Title <span class="required">*</span></label>
              <input 
                type="text" 
                id="categoryName" 
                v-model="categoryForm.title"
                placeholder="e.g., Cardiology"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="categoryColor">Color Theme</label>
              <div class="color-picker">
                <div 
                  v-for="color in colorOptions" 
                  :key="color"
                  :class="['color-option', { selected: categoryForm.color === color }]"
                  :style="{ background: color }"
                  @click="categoryForm.color = color"
                ></div>
              </div>
            </div>
            
            <div class="form-group">
              <label for="categoryDescription">Description (Optional)</label>
              <textarea 
                id="categoryDescription" 
                v-model="categoryForm.description"
                rows="3"
                placeholder="Enter category description"
              ></textarea>
            </div>
            
            <div class="modal-footer">
              <button type="button" class="modal-btn secondary" @click="closeModals">
                Cancel
              </button>
              <button type="submit" class="modal-btn primary" :disabled="savingCategory">
                <span v-if="savingCategory" class="spinner-small"></span>
                <span v-else>{{ editingCategory ? 'Update' : 'Create' }} Category</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Add/Edit Doctor Modal -->
    <div v-if="showAddDoctorModal" class="modal-overlay" @click.self="closeModals">
      <div class="modal-content large">
        <div class="modal-header">
          <h3>{{ editingDoctor ? 'Edit Doctor' : 'Add New Doctor' }}</h3>
          <button class="modal-close" @click="closeModals">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div class="modal-body">
          <form @submit.prevent="saveDoctor">
            <div class="form-row">
              <div class="form-group">
                <label for="doctorFirstName">First Name <span class="required">*</span></label>
                <input 
                  type="text" 
                  id="doctorFirstName" 
                  v-model="doctorForm.firstName"
                  required
                />
              </div>
              
              <div class="form-group">
                <label for="doctorLastName">Last Name <span class="required">*</span></label>
                <input 
                  type="text" 
                  id="doctorLastName" 
                  v-model="doctorForm.lastName"
                  required
                />
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="doctorEmail">Email</label>
                <input 
                  type="email" 
                  id="doctorEmail" 
                  v-model="doctorForm.email"
                />
              </div>
              
              <div class="form-group">
                <label for="doctorPhone">Phone <span class="required">*</span></label>
                <input 
                  type="tel" 
                  id="doctorPhone" 
                  v-model="doctorForm.phone"
                  required
                />
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="doctorMedicalCode">Medical License Code <span class="required">*</span></label>
                <input 
                  type="text" 
                  id="doctorMedicalCode" 
                  v-model="doctorForm.medicalCode"
                  placeholder="e.g., CA-123456"
                  required
                />
              </div>
              
              <div class="form-group">
                <label for="doctorFee">Consultation Fee ($) <span class="required">*</span></label>
                <input 
                  type="number" 
                  id="doctorFee" 
                  v-model="doctorForm.consultationFee"
                  min="0"
                  step="5"
                  required
                />
              </div>
            </div>
            
            <div class="form-group">
              <label for="doctorCategories">Categories</label>
              <div class="categories-selector">
                <div 
                  v-for="category in categories" 
                  :key="category.id"
                  :class="['category-chip', { selected: doctorForm.categories.includes(category.id) }]"
                  @click="toggleCategory(category.id)"
                >
                  {{ category.title }}
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <label class="checkbox-container">
                <input type="checkbox" v-model="doctorForm.isActive">
                <span class="checkmark"></span>
                Active Account
              </label>
            </div>
            
            <div class="modal-footer">
              <button type="button" class="modal-btn secondary" @click="closeModals">
                Cancel
              </button>
              <button type="submit" class="modal-btn primary" :disabled="savingDoctor">
                <span v-if="savingDoctor" class="spinner-small"></span>
                <span v-else>{{ editingDoctor ? 'Update' : 'Create' }} Doctor</span>
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
            <strong v-if="deleteType === 'doctor'">
              Dr. {{ itemToDelete?.firstName }} {{ itemToDelete?.lastName }}
            </strong>
            <strong v-else-if="deleteType === 'category'">
              {{ itemToDelete?.title }}
            </strong>?
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
  </div>
</template>

<script>
export default {
  name: 'AdminDoctors',
  
  data() {
    return {
      // API Configuration
      apiBaseUrl: 'http://localhost:8000',
      
      // Doctors data
      doctors: [],
      filteredDoctors: [],
      isLoading: false,
      error: null,
      
      // Categories data
      categories: [],
      loadingCategories: false,
      categoriesError: null,
      
      // Search and filters
      searchQuery: '',
      selectedCategory: '',
      selectedStatus: '',
      
      // Pagination
      currentPage: 1,
      itemsPerPage: 10,
      
      // Modals
      showAddCategoryModal: false,
      showAddDoctorModal: false,
      showDeleteModal: false,
      
      // Form states
      editingCategory: null,
      editingDoctor: null,
      savingCategory: false,
      savingDoctor: false,
      deleting: false,
      itemToDelete: null,
      deleteType: null,
      
      // Form data
      categoryForm: {
        title: '',
        color: '#4299e1',
        description: ''
      },
      
      doctorForm: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        medicalCode: '',
        consultationFee: 100,
        categories: [],
        isActive: true
      },
      
      // Color options
      colorOptions: [
        '#4299e1', // Blue
        '#48bb78', // Green
        '#ed8936', // Orange
        '#9f7aea', // Purple
        '#f56565', // Red
        '#38b2ac', // Teal
        '#ed64a6', // Pink
        '#667eea'  // Indigo
      ],
      
      // Default image
      defaultDoctorImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR99-ZMZeEtYlFVdT-HN3Hz0f_i64Zf76D67g&s'
    }
  },
  
  computed: {
    hasActiveFilters() {
      return this.selectedCategory || this.selectedStatus
    },
    
    totalPages() {
      return Math.ceil(this.filteredDoctors.length / this.itemsPerPage)
    },
    
    paginatedDoctors() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredDoctors.slice(start, end)
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
    filteredDoctors() {
      this.currentPage = 1
    }
  },
  
  async mounted() {
    await this.fetchCategories()
    await this.fetchDoctors()
  },
  
  methods: {
    // ============ DOCTORS API METHODS ============
    async fetchDoctors() {
      this.isLoading = true
      this.error = null
      
      try {
        const authToken = localStorage.getItem('authToken')
        
        if (!authToken) {
          throw new Error('Authentication required. Please login again.')
        }
        
        const response = await fetch(`${this.apiBaseUrl}/doctors/all/`, {
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
        
        if (Array.isArray(data)) {
          this.doctors = data.map(doctor => this.transformDoctorData(doctor))
        } else if (data.doctors && Array.isArray(data.doctors)) {
          this.doctors = data.doctors.map(doctor => this.transformDoctorData(doctor))
        } else if (data.data && Array.isArray(data.data)) {
          this.doctors = data.data.map(doctor => this.transformDoctorData(doctor))
        } else {
          console.warn('Unexpected API response format:', data)
          this.doctors = []
        }
        
        this.applyFilters()
        
      } catch (err) {
        console.error('Error fetching doctors:', err)
        this.error = err.message || 'Failed to load doctors. Please try again.'
        this.doctors = []
        this.filteredDoctors = []
      } finally {
        this.isLoading = false
      }
    },
    
    transformDoctorData(apiDoctor) {
      return {
        id: apiDoctor.id,
        firstName: apiDoctor.user?.firstName || '',
        lastName: apiDoctor.user?.lastName || '',
        email: apiDoctor.user?.email || '',
        phone: apiDoctor.user?.phone || '',
        profileImage: this.defaultDoctorImage,
        specialty: apiDoctor.category?.title ||  'General Medicine',
        medicalCode: apiDoctor.medicalCode || '',
        contactInfo: apiDoctor.contactInfo || apiDoctor.user?.phone || '',
        consultationFee: apiDoctor.consultationPrice || 0,
        isActive: apiDoctor.isActive !== undefined ? apiDoctor.isActive : true,
        categories: apiDoctor.categories || [],
        maxConcurrentConsultations: apiDoctor.maxConcurrentConsultations || 3,
        user: apiDoctor.user
      }
    },
    
    async saveDoctor() {
      this.savingDoctor = true
      
      try {
        const authToken = localStorage.getItem('authToken')
        
        if (!authToken) {
          throw new Error('Authentication required')
        }
        
        await new Promise(resolve => setTimeout(resolve, 800))
        
        if (this.editingDoctor) {
          const index = this.doctors.findIndex(d => d.id === this.editingDoctor.id)
          if (index !== -1) {
            this.doctors[index] = {
              ...this.doctors[index],
              firstName: this.doctorForm.firstName,
              lastName: this.doctorForm.lastName,
              email: this.doctorForm.email,
              phone: this.doctorForm.phone,
              medicalCode: this.doctorForm.medicalCode,
              consultationFee: parseInt(this.doctorForm.consultationFee),
              categories: this.doctorForm.categories,
              isActive: this.doctorForm.isActive,
              specialty: this.doctorForm.categories.length > 0 
                ? this.getCategoryName(this.doctorForm.categories[0]) 
                : 'General Medicine'
            }
          }
        } else {
          const newDoctor = {
            id: Date.now(),
            firstName: this.doctorForm.firstName,
            lastName: this.doctorForm.lastName,
            email: this.doctorForm.email,
            phone: this.doctorForm.phone,
            profileImage: this.defaultDoctorImage,
            specialty: this.doctorForm.categories.length > 0 
              ? this.getCategoryName(this.doctorForm.categories[0]) 
              : 'General Medicine',
            medicalCode: this.doctorForm.medicalCode,
            contactInfo: this.doctorForm.phone,
            consultationFee: parseInt(this.doctorForm.consultationFee),
            isActive: this.doctorForm.isActive,
            categories: this.doctorForm.categories,
            maxConcurrentConsultations: 3
          }
          this.doctors.push(newDoctor)
        }
        
        this.applyFilters()
        this.closeModals()
        
      } catch (err) {
        console.error('Error saving doctor:', err)
        alert(err.message || 'Failed to save doctor')
      } finally {
        this.savingDoctor = false
      }
    },
    
    async deleteDoctor(doctorId) {
      try {
        const authToken = localStorage.getItem('authToken')
        
        if (!authToken) {
          throw new Error('Authentication required')
        }
        
        await new Promise(resolve => setTimeout(resolve, 800))
        
        this.doctors = this.doctors.filter(d => d.id !== doctorId)
        this.applyFilters()
        
      } catch (err) {
        console.error('Error deleting doctor:', err)
        throw err
      }
    },
    
    // ============ CATEGORIES API METHODS ============
    async fetchCategories() {
      this.loadingCategories = true
      this.categoriesError = null
      
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
        this.categoriesError = err.message || 'Failed to load categories'
        this.categories = []
      } finally {
        this.loadingCategories = false
      }
    },
    
    async saveCategory() {
      this.savingCategory = true
      
      try {
        const authToken = localStorage.getItem('authToken')
        
        if (!authToken) {
          throw new Error('Authentication required')
        }
        
        const url = this.editingCategory 
          ? `${this.apiBaseUrl}/categories/${this.editingCategory.id}/`
          : `${this.apiBaseUrl}/categories/`
        
        const method = this.editingCategory ? 'PATCH' : 'POST'
        
        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({
            title: this.categoryForm.title,
            description: this.categoryForm.description || ''
          })
        })
        
        if (!response.ok) {
          throw new Error(`Failed to ${this.editingCategory ? 'update' : 'create'} category`)
        }
        
        const savedCategory = await response.json()
        
        if (this.editingCategory) {
          // Update local categories array
          const index = this.categories.findIndex(c => c.id === this.editingCategory.id)
          if (index !== -1) {
            this.categories[index] = savedCategory
          }
          alert('Category updated successfully!')
        } else {
          // Add new category to local array
          this.categories.push(savedCategory)
          alert('Category created successfully!')
        }
        
        this.closeModals()
        
      } catch (err) {
        console.error('Error saving category:', err)
        alert(err.message || 'Failed to save category')
      } finally {
        this.savingCategory = false
      }
    },
    
    async deleteCategory(categoryId) {
      try {
        const authToken = localStorage.getItem('authToken')
        
        if (!authToken) {
          throw new Error('Authentication required')
        }
        
        const response = await fetch(`${this.apiBaseUrl}/categories/${categoryId}/`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        })
        
        if (!response.ok) {
          throw new Error('Failed to delete category')
        }
        
        this.categories = this.categories.filter(c => c.id !== categoryId)
        alert('Category deleted successfully!')
        
      } catch (err) {
        console.error('Error deleting category:', err)
        throw err
      }
    },
    
    // Helper method to get consistent colors for categories
    getCategoryColor(categoryId) {
      // Use a simple hash to assign consistent colors
      const colorMap = {
        '1': '#4299e1', // Cardiology
        '2': '#48bb78', // Dermatology
        '3': '#ed8936', // Pediatrics
        '4': '#9f7aea', // Neurology
        '5': '#f56565', // Orthopedics
        '6': '#38b2ac', // Psychiatry
        '7': '#ed64a6', // Dentistry
        '8': '#667eea', // Ophthalmology
      }
      
      return colorMap[categoryId] || this.colorOptions[categoryId % this.colorOptions.length]
    },
    
    // ============ FILTER METHODS ============
    handleSearch() {
      this.applyFilters()
    },
    
    clearSearch() {
      this.searchQuery = ''
      this.applyFilters()
    },
    
    clearCategory() {
      this.selectedCategory = ''
      this.applyFilters()
    },
    
    clearAllFilters() {
      this.searchQuery = ''
      this.selectedCategory = ''
      this.selectedStatus = ''
      this.applyFilters()
    },
    
    applyFilters() {
      let filtered = [...this.doctors]
      
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(doctor => 
          `${doctor.firstName} ${doctor.lastName}`.toLowerCase().includes(query) ||
          doctor.specialty.toLowerCase().includes(query) ||
          (doctor.medicalCode && doctor.medicalCode.toLowerCase().includes(query))
        )
      }
      
      if (this.selectedCategory) {
        filtered = filtered.filter(doctor => 
          doctor.categories && doctor.categories.includes(this.selectedCategory)
        )
      }
      
      if (this.selectedStatus) {
        const isActive = this.selectedStatus === 'active'
        filtered = filtered.filter(doctor => doctor.isActive === isActive)
      }
      
      this.filteredDoctors = filtered
    },
    
    // ============ PAGINATION METHODS ============
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
      }
    },
    
    // ============ CATEGORY METHODS ============
    getCategoryName(categoryId) {
      const category = this.categories.find(c => c.id == categoryId)
      return category ? category.title : categoryId
    },
    
    editCategory(category) {
      this.editingCategory = category
      this.categoryForm = {
        title: category.title,
        color: this.getCategoryColor(category.id),
        description: category.description || ''
      }
      this.showAddCategoryModal = true
    },
    
    confirmDeleteCategory(category) {
      this.itemToDelete = { id: category.id, title: category.title }
      this.deleteType = 'category'
      this.showDeleteModal = true
    },
    
    // ============ DOCTOR METHODS ============
    editDoctor(doctor) {
      this.editingDoctor = doctor
      this.doctorForm = {
        firstName: doctor.firstName,
        lastName: doctor.lastName,
        email: doctor.email || '',
        phone: doctor.phone || '',
        medicalCode: doctor.medicalCode || '',
        consultationFee: doctor.consultationFee || 100,
        categories: doctor.categories || [],
        isActive: doctor.isActive !== undefined ? doctor.isActive : true
      }
      this.showAddDoctorModal = true
    },
    
    confirmDeleteDoctor(doctor) {
      this.itemToDelete = { 
        id: doctor.id, 
        firstName: doctor.firstName,
        lastName: doctor.lastName
      }
      this.deleteType = 'doctor'
      this.showDeleteModal = true
    },
    
    toggleCategory(categoryId) {
      const index = this.doctorForm.categories.indexOf(categoryId)
      if (index === -1) {
        this.doctorForm.categories.push(categoryId)
      } else {
        this.doctorForm.categories.splice(index, 1)
      }
    },
    
    viewDoctor(doctor) {
      this.$router.push(`/admin/doctor/${doctor.id}`)
    },
    
    // ============ DELETE CONFIRMATION ============
    async confirmDelete() {
      if (!this.itemToDelete) return
      
      this.deleting = true
      
      try {
        if (this.deleteType === 'doctor') {
          await this.deleteDoctor(this.itemToDelete.id)
          alert('Doctor deleted successfully!')
        } else if (this.deleteType === 'category') {
          await this.deleteCategory(this.itemToDelete.id)
          // No need for alert here as it's in deleteCategory method
        }
        
        this.closeDeleteModal()
        
      } catch (err) {
        console.error('Error deleting:', err)
        alert(err.message || 'Failed to delete')
      } finally {
        this.deleting = false
      }
    },
    
    // ============ MODAL METHODS ============
    closeModals() {
      this.showAddCategoryModal = false
      this.showAddDoctorModal = false
      this.editingCategory = null
      this.editingDoctor = null
      this.categoryForm = { title: '', color: '#4299e1', description: '' }
      this.doctorForm = {
        firstName: '', lastName: '', email: '', phone: '',
        medicalCode: '', consultationFee: 100, categories: [], isActive: true
      }
    },
    
    closeDeleteModal() {
      this.showDeleteModal = false
      this.itemToDelete = null
      this.deleteType = null
    }
  }
}
</script>

<style scoped>
/* Add this new style for category description */
.category-description {
  margin-top: 8px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.4;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* Rest of your existing styles remain exactly the same */
/* Admin Doctors Container */
.admin-doctors-container {
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

.search-container {
  margin-bottom: 20px;
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

.filters-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
}

.filter-label svg {
  width: 16px;
  height: 16px;
  color: #4299e1;
}

.filter-select {
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  font-size: 14px;
  color: white;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 16px;
  padding-right: 48px;
}

.filter-select option {
  background: #1a1f35;
  color: white;
}

.filter-select:focus {
  outline: none;
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
}

.active-filters {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.filters-label {
  display: block;
  margin-bottom: 12px;
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.filter-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(66, 153, 225, 0.2);
  border: 1px solid rgba(66, 153, 225, 0.3);
  border-radius: 20px;
  color: white;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-tag:hover {
  background: rgba(66, 153, 225, 0.3);
}

.filter-tag svg {
  width: 14px;
  height: 14px;
}

.clear-all {
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-all:hover {
  background: rgba(229, 62, 62, 0.2);
  border-color: #fc8181;
  color: #fc8181;
}

/* Categories Section */
.categories-section {
  background: rgba(26, 32, 44, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
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

.add-category-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: white;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-category-btn:hover {
  background: rgba(66, 153, 225, 0.2);
  border-color: #4299e1;
}

.add-category-btn svg {
  width: 16px;
  height: 16px;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}

.category-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  transition: all 0.3s ease;
}

.category-card:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateY(-2px);
}

.category-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.category-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.category-icon svg {
  width: 24px;
  height: 24px;
  color: white;
}

.category-info {
  flex: 1;
  min-width: 0;
}

.category-info h3 {
  font-size: 16px;
  font-weight: 600;
  color: white;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.doctor-count {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.category-actions {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}

.category-btn {
  width: 32px;
  height: 32px;
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

.category-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.category-btn.edit:hover {
  background: rgba(66, 153, 225, 0.2);
  color: #4299e1;
}

.category-btn.delete:hover {
  background: rgba(229, 62, 62, 0.2);
  color: #fc8181;
}

.category-btn svg {
  width: 16px;
  height: 16px;
}

/* Doctors Table Section */
.doctors-table-section {
  background: rgba(26, 32, 44, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.table-container {
  overflow-x: auto;
  margin-top: 20px;
}

.doctors-table {
  width: 100%;
  border-collapse: collapse;
  color: white;
}

.doctors-table th {
  text-align: left;
  padding: 16px 12px;
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.doctors-table td {
  padding: 16px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 14px;
}

.doctor-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.doctor-avatar {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  object-fit: cover;
  border: 2px solid #4299e1;
}

.doctor-name {
  font-weight: 600;
  color: white;
  margin-bottom: 2px;
}

.doctor-specialty {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.contact-cell {
  font-size: 13px;
}

.contact-phone {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 2px;
}

.medical-code {
  font-family: monospace;
  background: rgba(255, 255, 255, 0.05);
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
}

.categories-cell {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.category-badge {
  padding: 4px 10px;
  background: rgba(66, 153, 225, 0.2);
  border: 1px solid rgba(66, 153, 225, 0.3);
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  color: #4299e1;
}

.no-categories {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  font-style: italic;
}

.fee-amount {
  font-weight: 600;
  color: #48bb78;
  font-size: 15px;
}

.status-badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: rgba(229, 62, 62, 0.2);
  color: #fc8181;
}

.status-badge.active {
  background: rgba(72, 187, 120, 0.2);
  color: #9ae6b4;
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

.loading-mini {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px;
  color: rgba(255, 255, 255, 0.6);
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

.error-mini {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px;
  color: #fc8181;
  background: rgba(229, 62, 62, 0.1);
  border-radius: 12px;
}

.error-mini svg {
  width: 20px;
  height: 20px;
}

.error-mini p {
  margin: 0;
  font-size: 14px;
}

.retry-small {
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: white;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.retry-small:hover {
  background: rgba(66, 153, 225, 0.3);
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
  padding: 20px;
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
  max-width: 700px;
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

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* Form Styles */
.form-group {
  margin-bottom: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 0;
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
.form-group textarea,
.form-group select {
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
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #4299e1;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

/* Color Picker */
.color-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.color-option {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.color-option:hover {
  transform: scale(1.1);
}

.color-option.selected {
  border-color: white;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
}

/* Categories Selector */
.categories-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
}

.category-chip {
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.2s ease;
}

.category-chip:hover {
  background: rgba(66, 153, 225, 0.2);
  border-color: #4299e1;
}

.category-chip.selected {
  background: rgba(66, 153, 225, 0.3);
  border-color: #4299e1;
  color: white;
}

/* Checkbox Container */
.checkbox-container {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: white;
  font-size: 14px;
}

.checkbox-container input {
  width: auto;
  display: none;
}

.checkmark {
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  position: relative;
  transition: all 0.2s ease;
}

.checkbox-container input:checked + .checkmark {
  background: #4299e1;
  border-color: #4299e1;
}

.checkbox-container input:checked + .checkmark:after {
  content: '';
  position: absolute;
  left: 6px;
  top: 2px;
  width: 6px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

/* Modal Buttons */
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

/* Animation */
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Responsive */
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
    flex: 1;
  }
  
  .filters-container {
    grid-template-columns: 1fr;
  }
  
  .categories-grid {
    grid-template-columns: 1fr;
  }
  
  .form-row {
    grid-template-columns: 1fr;
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

@media (max-width: 480px) {
  .admin-main {
    padding: 0 16px 40px;
  }
  
  .filters-section,
  .categories-section,
  .doctors-table-section {
    padding: 20px;
  }
  
  .action-btn {
    padding: 10px 16px;
    font-size: 13px;
  }
  
  .modal-content {
    margin: 0;
  }
}
</style>