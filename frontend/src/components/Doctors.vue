<template>
  <div class="doctors-container">
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
          <h1 class="header-title">Find Your Perfect Doctor</h1>
          <p class="header-subtitle">Book appointments with certified medical specialists</p>
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
    <main class="doctors-main">
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
              placeholder="Search doctors by name or specialty..."
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
              Specialty
            </label>
            <select v-model="selectedCategory" @change="applyFilters" class="filter-select">
              <option value="">All Specialties</option>
              <option v-for="category in medicalCategories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>

          <!-- Rating Filter -->
          <div class="filter-group">
            <label class="filter-label">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
              </svg>
              Minimum Rating
            </label>
            <div class="rating-filter">
              <div 
                v-for="rating in [5, 4, 3, 2, 1]" 
                :key="rating" 
                :class="['star-option', { active: selectedRating >= rating }]"
                @click="selectRating(rating)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                </svg>
                <span>{{ rating }}+</span>
              </div>
            </div>
          </div>

          <!-- Cost Filter -->
          <div class="filter-group">
            <label class="filter-label">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM9 7.5A.75.75 0 009 9h1.5c.98 0 1.813.626 2.122 1.5H9A.75.75 0 009 12h3.622a2.251 2.251 0 01-2.122 1.5H9a.75.75 0 00-.53 1.28l3 3a.75.75 0 001.06-1.06l-1.73-1.732A3.752 3.752 0 0014.175 12H15a.75.75 0 000-1.5h-.825A3.733 3.733 0 0013.5 9H15a.75.75 0 000-1.5H9z" clip-rule="evenodd" />
              </svg>
              Consultation Fee
            </label>
            <div class="cost-slider">
              <input 
                type="range" 
                v-model="maxCost" 
                :min="minCostRange" 
                :max="maxCostRange" 
                step="10"
                @change="applyFilters"
                class="slider"
              >
              <div class="cost-values">
                <span>${{ minCostRange }}</span>
                <span class="current-cost">Up to ${{ maxCost }}</span>
                <span>${{ maxCostRange }}</span>
              </div>
            </div>
          </div>

          <!-- Sort Options -->
          <div class="filter-group">
            <label class="filter-label">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M6.97 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06L8.25 4.81V16.5a.75.75 0 01-1.5 0V4.81L3.53 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zm9.53 4.28a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V7.5a.75.75 0 01.75-.75z" clip-rule="evenodd" />
              </svg>
              Sort By
            </label>
            <select v-model="sortBy" @change="applySorting" class="filter-select">
              <option value="rating-desc">Highest Rating</option>
              <option value="rating-asc">Lowest Rating</option>
              <option value="cost-asc">Lowest Cost</option>
              <option value="cost-desc">Highest Cost</option>
              <option value="experience-desc">Most Experienced</option>
              <option value="name-asc">Name A-Z</option>
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
            <span v-if="selectedRating > 0" class="filter-tag" @click="clearRating">
              Rating: {{ selectedRating }}+
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
              </svg>
            </span>
            <span v-if="maxCost < maxCostRange" class="filter-tag" @click="clearCost">
              Max: ${{ maxCost }}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
              </svg>
            </span>
            <button class="clear-all" @click="clearAllFilters">Clear All</button>
          </div>
        </div>
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

      <!-- Doctors List -->
      <div v-else class="doctors-list">
        <!-- Results Info -->
        <div class="results-info">
          <h2>
            {{ filteredDoctors.length }} Doctor{{ filteredDoctors.length !== 1 ? 's' : '' }} Found
            <span v-if="hasActiveFilters">(Filtered)</span>
          </h2>
          <div class="view-toggle">
            <button :class="['view-btn', { active: viewMode === 'grid' }]" @click="viewMode = 'grid'">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z" clip-rule="evenodd" />
              </svg>
            </button>
            <button :class="['view-btn', { active: viewMode === 'list' }]" @click="viewMode = 'list'">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Grid View -->
        <div v-if="viewMode === 'grid' && filteredDoctors.length > 0" class="doctors-grid">
          <div 
            v-for="doctor in filteredDoctors" 
            :key="doctor.id" 
            class="doctor-card"
            @click="viewDoctorDetails(doctor)"
          >
            <div class="doctor-card-inner">
              <!-- Profile Image & Status -->
              <div class="doctor-header">
                <div class="doctor-image">
                  <img :src="doctor.profileImage || defaultDoctorImage" :alt="doctor.name">
                  <div class="online-status" :class="{ online: doctor.isOnline, offline: !doctor.isOnline }"></div>
                </div>
                <div class="doctor-badge" v-if="doctor.isVerified">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                  </svg>
                  Verified
                </div>
              </div>

              <!-- Doctor Info -->
              <div class="doctor-info">
                <h3 class="doctor-name">Dr. {{ doctor.firstName }} {{ doctor.lastName }}</h3>
                <!-- <p class="doctor-specialty">{{ doctor.specialty }}</p> -->
                
                <!-- Rating -->
                <div class="doctor-rating">
                  <div class="stars">
                    <svg v-for="star in 5" :key="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                      :class="{ 'filled': star <= Math.floor(doctor.rating), 'half': star - 0.5 === doctor.rating }">
                      <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="rating-value">{{ doctor.rating.toFixed(1) }}</span>
                  <span class="review-count">({{ doctor.reviewCount }})</span>
                </div>

                <!-- Experience & Languages -->
                <div class="doctor-meta">
                  <span class="meta-item">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
                    </svg>
                    {{ doctor.experience }} years
                  </span>
                  <span class="meta-item">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M5.25 9c0-.621.504-1.125 1.125-1.125H16.5c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125H6.375c-.621 0-1.125-.504-1.125-1.125V9zm3 1.125A.375.375 0 018.25 9.75h5.25a.375.375 0 01.375.375v.75a.375.375 0 01-.375.375H8.25a.375.375 0 01-.375-.375v-.75zm0 2.25A.375.375 0 018.25 12h7.5a.375.375 0 01.375.375v.75a.375.375 0 01-.375.375h-7.5A.375.375 0 018 13.125v-.75zm0 2.25a.375.375 0 01.375-.375h7.5a.375.375 0 01.375.375v.75a.375.375 0 01-.375.375h-7.5a.375.375 0 01-.375-.375v-.75z" clip-rule="evenodd" />
                    </svg>
                    {{ doctor.languages.join(', ') }}
                  </span>
                </div>

                <!-- Consultation Info -->
                <div class="consultation-info">
                  <div class="consultation-fee">
                    <span class="fee-label">Consultation</span>
                    <span class="fee-amount">${{ doctor.consultationFee }}</span>
                    <span class="fee-period">/session</span>
                  </div>
                  
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="doctor-actions">
                <button class="btn-profile" @click.stop="viewDoctorProfile(doctor)">
                  View Profile
                </button>
                <button class="btn-book" @click.stop="bookAppointment(doctor)">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- List View -->
        <div v-else-if="viewMode === 'list' && filteredDoctors.length > 0" class="doctors-list-view">
          <div 
            v-for="doctor in filteredDoctors" 
            :key="doctor.id" 
            class="doctor-list-item"
            @click="viewDoctorDetails(doctor)"
          >
            <div class="list-item-left">
              <div class="list-image">
                <img :src="doctor.profileImage || defaultDoctorImage" :alt="doctor.name">
                <div class="list-status" :class="{ online: doctor.isOnline }"></div>
              </div>
              <div class="list-info">
                <div class="list-name-row">
                  <h3>Dr. {{ doctor.firstName }} {{ doctor.lastName }}</h3>
                  <div class="list-badge" v-if="doctor.isVerified">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                    </svg>
                    Verified
                  </div>
                </div>
                <p class="list-specialty">{{ doctor.specialty }}</p>
                <div class="list-meta">
                  <span class="list-rating">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                    </svg>
                    {{ doctor.rating.toFixed(1) }} ({{ doctor.reviewCount }} reviews)
                  </span>
                  <span class="list-experience">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
                    </svg>
                    {{ doctor.experience }} years experience
                  </span>
                  <span class="list-languages">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M9 2.25a.75.75 0 01.75.75v1.506a49.38 49.38 0 015.343.371.75.75 0 11-.186 1.489c-.66-.083-1.323-.151-1.99-.206a18.67 18.67 0 01-2.969 6.323c.317.384.65.753.998 1.107a.75.75 0 11-1.07 1.052A18.902 18.902 0 019 13.687a18.823 18.823 0 01-5.656 4.482.75.75 0 11-.688-1.333 17.323 17.323 0 005.396-4.353A18.72 18.72 0 015.89 8.598a.75.75 0 011.388-.568A17.21 17.21 0 009 11.224a17.17 17.17 0 002.391-5.165 48.04 48.04 0 00-8.298.307.75.75 0 01-.186-1.489 49.159 49.159 0 015.343-.371V3A.75.75 0 019 2.25zM15.75 9a.75.75 0 01.68.433l5.25 11.25a.75.75 0 01-1.36.634l-1.198-2.567h-6.744l-1.198 2.567a.75.75 0 01-1.36-.634l5.25-11.25A.75.75 0 0115.75 9zm-2.672 8.25h5.344l-2.672-5.726-2.672 5.726z" clip-rule="evenodd" />
                    </svg>
                    {{ doctor.languages.join(', ') }}
                  </span>
                </div>
              </div>
            </div>
            <div class="list-item-right">
              <div class="list-fee">
                <span class="list-fee-amount">${{ doctor.consultationFee }}</span>
                <span class="list-fee-label">per session</span>
              </div>
              
              <div class="list-actions">
                <button class="btn-list-profile" @click.stop="viewDoctorProfile(doctor)">
                  Profile
                </button>
                <button class="btn-list-book" @click.stop="bookAppointment(doctor)">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- No Results -->
        <div v-else-if="!isLoading && filteredDoctors.length === 0" class="no-results">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
          </svg>
          <h3>No Doctors Found</h3>
          <p>Try adjusting your filters or search terms</p>
          <button @click="clearAllFilters" class="clear-filters-btn">Clear All Filters</button>
        </div>
      </div>

      <!-- Pagination -->
      <!-- <div v-if="!isLoading && !error && filteredDoctors.length > 0" class="pagination">
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
          <span v-if="showEllipsis" class="page-ellipsis">...</span>
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
      </div> -->
    </main>

    <!-- Quick Stats -->
    <footer class="doctors-footer">
      <div class="stats-container">
        <div class="stat">
          <span class="stat-number">{{ doctors.length }}</span>
          <span class="stat-label">Total Doctors</span>
        </div>
        <div class="stat">
          <span class="stat-number">{{ onlineDoctorsCount }}</span>
          <span class="stat-label">Online Now</span>
        </div>
        <div class="stat">
          <span class="stat-number">{{ verifiedDoctorsCount }}</span>
          <span class="stat-label">Verified</span>
        </div>
        <div class="stat">
          <span class="stat-number">{{ averageRating.toFixed(1) }}</span>
          <span class="stat-label">Avg. Rating</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'DoctorsPage',
  
  data() {
    return {
      // Doctors data from API
      doctors: [],
      filteredDoctors: [],
      isLoading: false,
      error: null,
      
      // User data
      userProfileImage: 'https://images.unsplash.com/photo-1494790108755-2616b786d4d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      showProfileMenu: false,
      
      // Search and filters
      searchQuery: '',
      selectedCategory: '',
      selectedRating: 0,
      maxCost: 500,
      minCostRange: 50,
      maxCostRange: 500,
      sortBy: 'rating-desc',
      viewMode: 'grid',
      
      // API configuration
      apiBaseUrl: 'http://localhost:8000',
      
      // Medical categories (same as signup page)
      medicalCategories: [
        { id: 'cardiology', name: 'Cardiology' },
        { id: 'dermatology', name: 'Dermatology' },
        { id: 'pediatrics', name: 'Pediatrics' },
        { id: 'neurology', name: 'Neurology' },
        { id: 'orthopedics', name: 'Orthopedics' },
        { id: 'psychiatry', name: 'Psychiatry' },
        { id: 'dentistry', name: 'Dentistry' },
        { id: 'ophthalmology', name: 'Ophthalmology' },
        { id: 'endocrinology', name: 'Endocrinology' },
        { id: 'gastroenterology', name: 'Gastroenterology' }
      ],
      
      // Default doctor image
      defaultDoctorImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    }
  },
  
  computed: {
    hasActiveFilters() {
      return this.selectedCategory || this.selectedRating > 0 || this.maxCost < this.maxCostRange
    },
    
    onlineDoctorsCount() {
      return this.doctors.filter(d => d.isOnline).length
    },
    
    verifiedDoctorsCount() {
      return this.doctors.filter(d => d.isVerified).length
    },
    
    averageRating() {
      if (this.doctors.length === 0) return 0
      const sum = this.doctors.reduce((acc, doctor) => acc + doctor.rating, 0)
      return sum / this.doctors.length
    }
  },
  
  watch: {
    filteredDoctors() {
      this.currentPage = 1 // Reset to first page when filters change
    }
  },
  
  async mounted() {
    await this.fetchDoctors()
  },
  
  methods: {
    async fetchDoctors() {
      this.isLoading = true
      this.error = null
      
      try {
        // Get auth token from localStorage
        const authToken = localStorage.getItem('authToken');
        // const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInBob25lTnVtYmVyIjoiMDkxNyIsImlhdCI6MTc3MDc1MjgyNH0.qK6sTWxNQaM-MaTBEz5YUXQPqJW11l9wvoWjIJaLKgA";
        
        if (!authToken) {
          throw new Error('Authentication required. Please login first.')
        }
        
        // Fetch doctors from API
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
        
        // Transform API data to match our UI structure
        if (Array.isArray(data)) {
          this.doctors = data.map(doctor => this.transformDoctorData(doctor))
        } 
        // If API returns { doctors: [...] } or { data: [...] }
        else if (data.doctors && Array.isArray(data.doctors)) {
          this.doctors = data.doctors.map(doctor => this.transformDoctorData(doctor))
        } 
        else if (data.data && Array.isArray(data.data)) {
          this.doctors = data.data.map(doctor => this.transformDoctorData(doctor))
        }
        else {
          throw new Error('Invalid API response format')
        }
        
        // Apply initial filtering
        this.applyFilters()
        
      } catch (err) {
        console.error('Error fetching doctors:', err)
        this.error = err.message || 'Failed to load doctors. Please check your connection and try again.'
        
        // Use mock data for development if API fails
        if (process.env.NODE_ENV === 'development') {
          console.warn('Using mock data due to API error')
          this.doctors = this.generateMockDoctors()
          this.applyFilters()
        }
      } finally {
        this.isLoading = false
      }
    },
    
    transformDoctorData(apiDoctor) {
      // Transform API doctor data to match our UI structure
      return {
        id: apiDoctor.id,
        // Extract from user object
        firstName: apiDoctor.user?.firstName || '',
        lastName: apiDoctor.user?.lastName || '',
        // Use profile image if available, otherwise default
        profileImage: this.defaultDoctorImage,
        // For specialty, you might need to adjust based on your API
        // Using medicalCode or categories from API
        specialty: apiDoctor.category || 'General Medicine',
        // Use fake rating data for now as per your requirement
        rating: this.getRandomRating(),
        reviewCount: this.getRandomReviewCount(),
        // For experience, you might need to add this field to your API
        // Using a placeholder for now
        experience: this.getRandomExperience(),
        // Languages - placeholder
        languages: ['English', 'Arabic'], // You might want to add this to your API
        // Use consultation price from API
        consultationFee: apiDoctor.consultationPrice || 100,
        // Online status - placeholder
        isOnline: Math.random() > 0.5,
        // Verified status - based on medicalCode presence
        isVerified: !!apiDoctor.medicalCode,
        // Available today - placeholder
        availableToday: Math.random() > 0.3,
        // Categories from API or extract from medicalCode
        categories: apiDoctor.category || '',
        // Additional info for profile view
        medicalCode: apiDoctor.medicalCode,
        contactInfo: apiDoctor.contactInfo,
        isActive: apiDoctor.isActive,
        maxConcurrentConsultations: apiDoctor.maxConcurrentConsultations || 3,
        // Full user object for reference
        user: apiDoctor.user
      }
    },
    
    getSpecialtyFromMedicalCode(medicalCode) {
      if (!medicalCode) return 'General Medicine'
      
      // Extract specialty from medical code if possible
      // This is a simple example - adjust based on your actual medicalCode format
      const specialties = this.medicalCategories.map(cat => cat.name)
      const randomSpecialty = specialties[Math.floor(Math.random() * specialties.length)]
      return randomSpecialty
    },
    
    getRandomRating() {
      // Generate a random rating between 3.5 and 5.0
      return parseFloat((3.5 + Math.random() * 1.5).toFixed(1))
    },
    
    getRandomReviewCount() {
      // Generate a random review count between 50 and 500
      return Math.floor(Math.random() * 450) + 50
    },
    
    getRandomExperience() {
      // Generate random experience between 1 and 30 years
      return Math.floor(Math.random() * 30) + 1
    },
    
    extractCategories(medicalCode) {
      if (!medicalCode) return ['general']
      
      // Extract categories from medical code or use random
      const categoryIds = this.medicalCategories.map(cat => cat.id)
      const randomCategory = categoryIds[Math.floor(Math.random() * categoryIds.length)]
      return [randomCategory]
    },
    
    generateMockDoctors() {
      // Mock data for development when API is not ready
      const specialties = this.medicalCategories.map(cat => cat.name)
      const firstNames = ['John', 'Sarah', 'Michael', 'Emily', 'David', 'Lisa', 'Robert', 'Maria', 'James', 'Jennifer']
      const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez']
      const languages = ['English', 'Arabic']
      
      return Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
        lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
        profileImage: this.defaultDoctorImage,
        specialty: specialties[Math.floor(Math.random() * specialties.length)],
        rating: this.getRandomRating(),
        reviewCount: this.getRandomReviewCount(),
        experience: this.getRandomExperience(),
        languages: languages,
        consultationFee: Math.floor(Math.random() * 400) + 50,
        isOnline: Math.random() > 0.5,
        isVerified: Math.random() > 0.3,
        availableToday: Math.random() > 0.4,
        categories: [this.medicalCategories[Math.floor(Math.random() * this.medicalCategories.length)].id],
        medicalCode: `MD-${1000 + i}`,
        contactInfo: '+1234567890',
        isActive: true,
        maxConcurrentConsultations: 3
      }))
    },
    
    handleSearch() {
      this.applyFilters()
    },
    
    clearSearch() {
      this.searchQuery = ''
      this.applyFilters()
    },
    
    selectRating(rating) {
      this.selectedRating = this.selectedRating === rating ? 0 : rating
      this.applyFilters()
    },
    
    clearRating() {
      this.selectedRating = 0
      this.applyFilters()
    },
    
    clearCategory() {
      this.selectedCategory = ''
      this.applyFilters()
    },
    
    clearCost() {
      this.maxCost = this.maxCostRange
      this.applyFilters()
    },
    
    clearAllFilters() {
      this.searchQuery = ''
      this.selectedCategory = ''
      this.selectedRating = 0
      this.maxCost = this.maxCostRange
      this.sortBy = 'rating-desc'
      this.applyFilters()
    },
    
    applyFilters() {
      let filtered = [...this.doctors]
      
      // Apply search filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(doctor => 
          `${doctor.firstName} ${doctor.lastName}`.toLowerCase().includes(query) ||
          doctor.specialty.toLowerCase().includes(query) ||
          (doctor.categories && doctor.categories.some(cat => cat.toLowerCase().includes(query)))
        )
      }
      
      // Apply category filter
      if (this.selectedCategory) {
        filtered = filtered.filter(doctor => 
          doctor.categories && doctor.categories.includes(this.selectedCategory)
        )
      }
      
      // Apply rating filter
      if (this.selectedRating > 0) {
        filtered = filtered.filter(doctor => doctor.rating >= this.selectedRating)
      }
      
      // Apply cost filter
      if (this.maxCost < this.maxCostRange) {
        filtered = filtered.filter(doctor => doctor.consultationFee <= this.maxCost)
      }
      
      // Apply sorting
      this.applySorting(filtered)
    },
    
    applySorting(filteredDoctors = null) {
      const doctors = filteredDoctors || [...this.filteredDoctors]
      
      doctors.sort((a, b) => {
        switch (this.sortBy) {
          case 'rating-desc':
            return b.rating - a.rating
          case 'rating-asc':
            return a.rating - b.rating
          case 'cost-asc':
            return a.consultationFee - b.consultationFee
          case 'cost-desc':
            return b.consultationFee - a.consultationFee
          case 'experience-desc':
            return b.experience - a.experience
          case 'name-asc':
            return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
          default:
            return b.rating - a.rating
        }
      })
      
      this.filteredDoctors = doctors
    },
    
    getCategoryName(categoryId) {
      const category = this.medicalCategories.find(c => c.id === categoryId)
      return category ? category.name : categoryId
    },
    
    viewDoctorDetails(doctor) {
      // Navigate to doctor details page
      this.$router.push(`/doctor/${doctor.id}`)
    },
    
    viewDoctorProfile(doctor) {
      // Show doctor profile modal or navigate to profile page
      this.$router.push(`/doctor/profile/${doctor.id}`)
    },
    
    bookAppointment(doctor) {
      // Navigate to booking page
      this.$router.push({
        path: '/book-appointment',
        query: { 
          doctorId: doctor.id, 
          doctorName: `Dr. ${doctor.firstName} ${doctor.lastName}`,
          doctorSpecialty: doctor.specialty,
          consultationFee: doctor.consultationFee
        }
      })
    },
    
    goToProfile() {
      // Navigate to user profile
      const userData = JSON.parse(localStorage.getItem('userData') || '{}')
      if (userData.role === 'doctor') {
        this.$router.push('/mypannel')
      } else {
        this.$router.push('/patient-dashboard')
      }
      this.showProfileMenu = false
    },
    
    goToConsultants() {
      this.$router.push('/my-consultants')
      this.showProfileMenu = false
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
/* Base Container */
.doctors-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  position: relative;
  overflow-x: hidden;
  overflow-y: hidden !important ;
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
  right: -150px;
  animation-delay: 0s;
}

.circle-2 {
  width: 200px;
  height: 200px;
  bottom: -100px;
  left: -100px;
  animation-delay: 10s;
}

.circle-3 {
  width: 150px;
  height: 150px;
  top: 20%;
  left: 10%;
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
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.02);
  }
}

/* Header */
.doctors-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}

@media (max-width: 768px) {
  .header-content {
    padding: 20px 24px;
    gap: 20px;
  }
}

.back-btn {
  width: 48px;
  height: 48px;
  background: #f7f9fc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.back-btn:hover {
  background: #667eea;
  border-color: #667eea;
  transform: translateX(-2px);
}

.back-btn:hover svg {
  color: white;
}

.back-btn svg {
  width: 24px;
  height: 24px;
  color: #4a5568;
  transition: color 0.3s ease;
}

.header-info {
  flex: 1;
  min-width: 0;
}

.header-title {
  font-size: 28px;
  font-weight: 800;
  color: #2d3748;
  margin-bottom: 4px;
  letter-spacing: -0.5px;
}

@media (max-width: 768px) {
  .header-title {
    font-size: 22px;
  }
}

.header-subtitle {
  font-size: 14px;
  color: #718096;
  font-weight: 500;
}

.user-profile {
  position: relative;
  flex-shrink: 0;
}

.profile-img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #667eea;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.profile-img:hover {
  transform: scale(1.05);
}

.profile-menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  z-index: 1000;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.menu-item {
  padding: 14px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  color: #4a5568;
  font-weight: 500;
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
  width: 20px;
  height: 20px;
  color: #a0aec0;
}

.menu-item:hover svg {
  color: #667eea;
}

.menu-item.logout:hover {
  color: #e53e3e;
}

.menu-item.logout:hover svg {
  color: #e53e3e;
}

/* Main Content */
.doctors-main {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px;
  position: relative;
  z-index: 1;
}

@media (max-width: 768px) {
  .doctors-main {
    padding: 24px;
  }
}

/* Filters Section */
.filters-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

@media (max-width: 768px) {
  .filters-section {
    padding: 24px;
  }
}

.search-container {
  margin-bottom: 30px;
}

.search-input {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input svg {
  position: absolute;
  left: 20px;
  width: 24px;
  height: 24px;
  color: #a0aec0;
  pointer-events: none;
}

.search-input input {
  width: 100%;
  padding: 18px 20px 18px 60px;
  background: #f7f9fc;
  border: 2px solid #e2e8f0;
  border-radius: 14px;
  font-size: 16px;
  color: #2d3748;
  transition: all 0.3s ease;
}

.search-input input:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.search-input input::placeholder {
  color: #a0aec0;
}

.clear-search {
  position: absolute;
  right: 20px;
  background: none;
  border: none;
  color: #a0aec0;
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s ease;
}

.clear-search:hover {
  color: #e53e3e;
}

.clear-search svg {
  width: 20px;
  height: 20px;
}

.filters-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 30px;
}

@media (max-width: 768px) {
  .filters-container {
    grid-template-columns: 1fr;
  }
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.filter-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #4a5568;
  font-size: 14px;
}

.filter-label svg {
  width: 18px;
  height: 18px;
  color: #667eea;
}

.filter-select {
  padding: 14px 16px;
  background: #f7f9fc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 15px;
  color: #2d3748;
  cursor: pointer;
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234a5568'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 20px;
  padding-right: 48px;
}

.filter-select:focus {
  outline: none;
  border-color: #667eea;
  background-color: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.rating-filter {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.star-option {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  background: #f7f9fc;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
}

.star-option:hover {
  border-color: #cbd5e0;
  transform: translateY(-1px);
}

.star-option.active {
  background: #667eea;
  border-color: #667eea;
  color: white;
}

.star-option.active svg {
  color: #ffd700;
}

.star-option svg {
  width: 16px;
  height: 16px;
  color: #e2e8f0;
  transition: color 0.2s ease;
}

.star-option.active:hover svg {
  color: #ffd700;
}

.cost-slider {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.slider {
  width: 100%;
  height: 6px;
  -webkit-appearance: none;
  appearance: none;
  background: #e2e8f0;
  border-radius: 3px;
  outline: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  background: #667eea;
  border-radius: 50%;
  cursor: pointer;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
}

.slider::-moz-range-thumb {
  width: 24px;
  height: 24px;
  background: #667eea;
  border-radius: 50%;
  cursor: pointer;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
}

.cost-values {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #718096;
}

.current-cost {
  font-weight: 600;
  color: #667eea;
  font-size: 14px;
}

.active-filters {
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
}

.filters-label {
  display: block;
  margin-bottom: 12px;
  font-weight: 600;
  color: #4a5568;
  font-size: 14px;
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.filter-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: #667eea;
  color: white;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-tag:hover {
  background: #5a67d8;
  transform: translateY(-1px);
}

.filter-tag svg {
  width: 14px;
  height: 14px;
  opacity: 0.8;
}

.clear-all {
  margin-left: auto;
  padding: 8px 20px;
  background: #f7f9fc;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-all:hover {
  background: #edf2f7;
  border-color: #cbd5e0;
  color: #667eea;
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

.loading-container .spinner {
  width: 60px;
  height: 60px;
  border: 4px solid #e2e8f0;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

.loading-container p {
  font-size: 16px;
  color: #4a5568;
  font-weight: 500;
}

/* Error State */
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  text-align: center;
}

.error-container svg {
  width: 80px;
  height: 80px;
  color: #e53e3e;
  margin-bottom: 24px;
}

.error-container h3 {
  font-size: 24px;
  color: #2d3748;
  margin-bottom: 12px;
}

.error-container p {
  font-size: 16px;
  color: #718096;
  margin-bottom: 24px;
  max-width: 400px;
}

.retry-btn {
  padding: 12px 32px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  background: #5a67d8;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

/* Results Info */
.results-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.results-info h2 {
  font-size: 24px;
  font-weight: 700;
  color: white;
}

.results-info h2 span {
  font-weight: 500;
  opacity: 0.8;
}

.view-toggle {
  display: flex;
  gap: 8px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 4px;
}

.view-btn {
  width: 48px;
  height: 48px;
  background: transparent;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-btn svg {
  width: 24px;
  height: 24px;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s ease;
}

.view-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.view-btn.active {
  background: white;
}

.view-btn.active svg {
  color: #667eea;
}

/* Grid View */
.doctors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

@media (max-width: 768px) {
  .doctors-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

.doctor-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  position: relative;
}

.doctor-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.doctor-card-inner {
  padding: 24px;
}

.doctor-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.doctor-image {
  position: relative;
  width: 80px;
  height: 80px;
  flex-shrink: 0;
}

.doctor-image img {
  width: 100%;
  height: 100%;
  border-radius: 16px;
  object-fit: cover;
  border: 3px solid #667eea;
}

.online-status {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid white;
}

.online-status.online {
  background: #48bb78;
}

.online-status.offline {
  background: #a0aec0;
}

.doctor-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #48bb78;
  color: white;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.doctor-badge svg {
  width: 14px;
  height: 14px;
}

.doctor-info {
  margin-bottom: 24px;
}

.doctor-name {
  font-size: 20px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 6px;
}

.doctor-specialty {
  font-size: 14px;
  color: #667eea;
  font-weight: 600;
  margin-bottom: 16px;
}

.doctor-rating {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.stars {
  display: flex;
  gap: 2px;
}

.stars svg {
  width: 20px;
  height: 20px;
  color: #e2e8f0;
}

.stars svg.filled {
  color: #ffd700;
}

.stars svg.half {
  color: #ffd700;
  clip-path: inset(0 50% 0 0);
}

.rating-value {
  font-weight: 700;
  color: #2d3748;
  font-size: 16px;
}

.review-count {
  color: #718096;
  font-size: 14px;
}

.doctor-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #718096;
  background: #f7f9fc;
  padding: 6px 12px;
  border-radius: 8px;
}

.meta-item svg {
  width: 14px;
  height: 14px;
  color: #667eea;
}

.consultation-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
}

.consultation-fee {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.fee-label {
  font-size: 12px;
  opacity: 0.9;
}

.fee-amount {
  font-size: 24px;
  font-weight: 800;
}

.fee-period {
  font-size: 12px;
  opacity: 0.8;
}

.available-label {
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.available-label.available {
  background: rgba(72, 187, 120, 0.3);
}

.doctor-actions {
  display: flex;
  gap: 12px;
}

.doctor-actions button {
  flex: 1;
  padding: 14px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-profile {
  background: #f7f9fc;
  color: #4a5568;
  border: 2px solid #e2e8f0;
}

.btn-profile:hover {
  background: #edf2f7;
  border-color: #cbd5e0;
  transform: translateY(-2px);
}

.btn-book {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-book:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

/* List View */
.doctors-list-view {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
}

.doctor-list-item {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
}

.doctor-list-item:hover {
  transform: translateX(5px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}

.list-item-left {
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
  min-width: 0;
}

.list-image {
  position: relative;
  width: 64px;
  height: 64px;
  flex-shrink: 0;
}

.list-image img {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  object-fit: cover;
  border: 2px solid #667eea;
}

.list-status {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
}

.list-status.online {
  background: #48bb78;
}

.list-info {
  flex: 1;
  min-width: 0;
}

.list-name-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 4px;
}

.list-name-row h3 {
  font-size: 18px;
  font-weight: 700;
  color: #2d3748;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.list-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: #48bb78;
  color: white;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  flex-shrink: 0;
}

.list-badge svg {
  width: 12px;
  height: 12px;
}

.list-specialty {
  font-size: 14px;
  color: #667eea;
  font-weight: 600;
  margin-bottom: 12px;
}

.list-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 13px;
  color: #718096;
}

.list-meta span {
  display: flex;
  align-items: center;
  gap: 6px;
}

.list-meta svg {
  width: 14px;
  height: 14px;
  color: #667eea;
}

.list-item-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.list-fee {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 100px;
}

.list-fee-amount {
  font-size: 24px;
  font-weight: 800;
  color: #2d3748;
}

.list-fee-label {
  font-size: 12px;
  color: #718096;
}

.list-availability {
  padding: 8px 16px;
  background: #f7f9fc;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: #4a5568;
  min-width: 120px;
  text-align: center;
}

.list-availability.available {
  background: #c6f6d5;
  color: #22543d;
}

.list-actions {
  display: flex;
  gap: 8px;
}

.btn-list-profile,
.btn-list-book {
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-list-profile {
  background: #f7f9fc;
  color: #4a5568;
  border: 2px solid #e2e8f0;
}

.btn-list-profile:hover {
  background: #edf2f7;
  border-color: #cbd5e0;
}

.btn-list-book {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-list-book:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

/* No Results */
.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  text-align: center;
}

.no-results svg {
  width: 80px;
  height: 80px;
  color: #a0aec0;
  margin-bottom: 24px;
}

.no-results h3 {
  font-size: 24px;
  color: #2d3748;
  margin-bottom: 12px;
}

.no-results p {
  font-size: 16px;
  color: #718096;
  margin-bottom: 24px;
}

.clear-filters-btn {
  padding: 12px 32px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-filters-btn:hover {
  background: #5a67d8;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 40px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  backdrop-filter: blur(10px);
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #f7f9fc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-btn:hover:not(:disabled) {
  background: #edf2f7;
  border-color: #cbd5e0;
  transform: translateY(-2px);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-btn svg {
  width: 20px;
  height: 20px;
}

.page-numbers {
  display: flex;
  gap: 8px;
}

.page-number {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f9fc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-number:hover {
  background: #edf2f7;
  border-color: #cbd5e0;
  transform: translateY(-2px);
}

.page-number.active {
  background: #667eea;
  border-color: #667eea;
  color: white;
  transform: scale(1.1);
}

.page-ellipsis {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  color: #718096;
  font-size: 18px;
}

/* Footer Stats */
.doctors-footer {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  margin-top: 40px;
}

.stats-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 30px 40px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
}

@media (max-width: 768px) {
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
    padding: 24px;
    gap: 20px;
  }
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  color: white;
}

.stat-number {
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 8px;
}

@media (max-width: 768px) {
  .stat-number {
    font-size: 28px;
  }
}

.stat-label {
  font-size: 14px;
  opacity: 0.9;
  font-weight: 500;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .list-item-right {
    flex-direction: column;
    gap: 12px;
    align-items: flex-end;
  }
  
  .list-fee {
    min-width: auto;
  }
  
  .list-actions {
    width: 100%;
    justify-content: flex-end;
  }
  
  .btn-list-profile,
  .btn-list-book {
    padding: 8px 16px;
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>