<template>
  <div class="doctor-detail-container">
    <!-- Animated Background -->
    <div class="animated-bg">
      <div class="bg-circle circle-1"></div>
      <div class="bg-circle circle-2"></div>
      <div class="bg-circle circle-3"></div>
      <div class="bg-pulse"></div>
    </div>

    <!-- Header (Your provided header) -->
    <header class="doctors-header">
      <div class="header-content">
        <div class="back-btn" @click="$router.go(-1)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="user-profile" @click="showProfileMenu = !showProfileMenu">
          <img :src="userProfileImage" alt="Profile" class="profile-img">
          <div class="profile-menu" v-if="showProfileMenu">
            <div class="menu-item" @click="goToProfile">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
              </svg>
              Profile
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

    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>Loading doctor information...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-container">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
      </svg>
      <h3>Unable to Load Profile</h3>
      <p>{{ error }}</p>
      <button @click="fetchDoctorData" class="retry-btn">Try Again</button>
    </div>

    <!-- Main Content -->
    <div v-else class="detail-content">
      <div class="content-wrapper">
        <!-- Left Column: Doctor Info -->
        <div class="info-column">
          <!-- Doctor Profile Card -->
          <div class="profile-card">
            <div class="profile-header">
              <div class="profile-image">
                <img :src="doctor.profileImage || defaultDoctorImage" :alt="doctor.name">
                <div class="online-status" :class="{ online: doctor.isOnline }">
                  {{ doctor.isOnline ? 'Online' : 'Offline' }}
                </div>
              </div>
              <div class="profile-info">
                <div class="name-row">
                  <h2 class="doctor-name">Dr. {{ doctor.firstName }} {{ doctor.lastName }}</h2>
                  <div class="verification-badge" v-if="doctor.isVerified">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                    </svg>
                    Verified Doctor
                  </div>
                </div>
                <p class="doctor-specialty">{{ doctor.specialty }}</p>
                
                <!-- Rating -->
                <div class="rating-section">
                  <div class="rating-display">
                    <div class="stars">
                      <svg v-for="star in 5" :key="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        :class="{ 'filled': star <= Math.floor(doctor.rating), 'half': star - 0.5 === doctor.rating }">
                        <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <span class="rating-value">{{ doctor.rating.toFixed(1) }}</span>
                    <span class="review-count">({{ doctor.reviewCount }} reviews)</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quick Stats -->
            <div class="quick-stats">
              <div class="stat">
                <span class="stat-number">{{ doctor.experience }}+</span>
                <span class="stat-label">Years Experience</span>
              </div>
              <div class="stat">
                <span class="stat-number">{{ doctor.patientsCount?.toLocaleString() || '5,000+' }}</span>
                <span class="stat-label">Patients</span>
              </div>
              <div class="stat">
                <span class="stat-number">{{ doctor.successRate || '98' }}%</span>
                <span class="stat-label">Success Rate</span>
              </div>
              <div class="stat">
                <span class="stat-number">{{ doctor.consultationTime || 30 }}</span>
                <span class="stat-label">Minutes/Session</span>
              </div>
            </div>
          </div>

          <!-- Doctor Details Sections -->
          <div class="details-sections">
            <!-- Categories -->
            <section class="detail-section">
              <h3 class="section-title">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M2.25 6a3 3 0 013-3h13.5a3 3 0 013 3v12a3 3 0 01-3 3H5.25a3 3 0 01-3-3V6zm3.97.97a.75.75 0 011.06 0l2.25 2.25a.75.75 0 010 1.06l-2.25 2.25a.75.75 0 01-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 010-1.06zm4.28 4.28a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z" clip-rule="evenodd" />
                </svg>
                Specialties & Categories
              </h3>
              <div class="categories-list">
                <span v-for="category in doctor.categories" :key="category" class="category-tag">
                  {{ getCategoryName(category) }}
                </span>
                <span v-if="!doctor.categories || doctor.categories.length === 0" class="no-categories">
                  No specialties specified
                </span>
              </div>
            </section>

            <!-- Contact Information -->
            <section class="detail-section">
              <h3 class="section-title">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clip-rule="evenodd" />
                </svg>
                Contact Information
              </h3>
              <div class="contact-info">
                <div class="contact-item">
                  <span class="contact-label">Medical License:</span>
                  <span class="contact-value">{{ doctor.medicalCode || 'Not specified' }}</span>
                </div>
                <div class="contact-item">
                  <span class="contact-label">Clinic Phone:</span>
                  <span class="contact-value">{{ doctor.contactInfo || 'Not specified' }}</span>
                </div>
                <div class="contact-item">
                  <span class="contact-label">Email:</span>
                  <span class="contact-value">{{ doctor.email || 'Not specified' }}</span>
                </div>
                <div class="contact-item">
                  <span class="contact-label">Status:</span>
                  <span class="contact-value" :class="{ 'active': doctor.isActive, 'inactive': !doctor.isActive }">
                    {{ doctor.isActive ? 'Active' : 'Inactive' }}
                  </span>
                </div>
              </div>
            </section>

            <!-- Consultation Details -->
            <section class="detail-section">
              <h3 class="section-title">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
                </svg>
                Consultation Details
              </h3>
              <div class="consultation-details">
                <div class="detail-row">
                  <span class="detail-label">Session Duration:</span>
                  <span class="detail-value">{{ doctor.consultationTime || 30 }} minutes</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Consultation Fee:</span>
                  <span class="detail-value fee">${{ doctor.consultationFee }}/session</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Max Concurrent:</span>
                  <span class="detail-value">{{ doctor.maxConcurrentConsultations || 3 }} patients</span>
                </div>
              </div>
            </section>

            <!-- About Doctor -->
            <section class="detail-section">
              <h3 class="section-title">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clip-rule="evenodd" />
                </svg>
                About Dr. {{ doctor.lastName }}
              </h3>
              <p class="about-text">{{ doctor.description || `Dr. ${doctor.lastName} is a medical specialist with ${doctor.experience} years of experience.` }}</p>
              <div v-if="doctor.education" class="education">
                <strong>Education:</strong> {{ doctor.education }}
              </div>
            </section>
          </div>
        </div>

        <!-- Right Column: Booking Widget -->
        <div class="booking-column">
          <div class="booking-widget">
            <div class="widget-header">
              <h3>Book an Appointment</h3>
              <div class="consultation-fee">
                <span class="fee-label">Consultation Fee</span>
                <span class="fee-amount">${{ doctor.consultationFee }}</span>
              </div>
            </div>
            
            <div class="widget-body">
              <!-- Booking Steps Indicator -->
              <div class="booking-steps">
                <div class="step" :class="{ active: bookingStep >= 1, completed: bookingStep > 1 }">
                  <div class="step-number">1</div>
                  <span class="step-label">Select Patient</span>
                </div>
                <div class="step-connector"></div>
                <div class="step" :class="{ active: bookingStep >= 2, completed: bookingStep > 2 }">
                  <div class="step-number">2</div>
                  <span class="step-label">Select Date</span>
                </div>
                <div class="step-connector"></div>
                <div class="step" :class="{ active: bookingStep >= 3, completed: bookingStep > 3 }">
                  <div class="step-number">3</div>
                  <span class="step-label">Select Time</span>
                </div>
                <div class="step-connector"></div>
                <div class="step" :class="{ active: bookingStep >= 4, completed: bookingStep > 4 }">
                  <div class="step-number">4</div>
                  <span class="step-label">Details</span>
                </div>
                <div class="step-connector"></div>
                <div class="step" :class="{ active: bookingStep >= 5 }">
                  <div class="step-number">5</div>
                  <span class="step-label">Confirm & Pay</span>
                </div>
              </div>

              <!-- Back Button -->
              <button v-if="bookingStep > 1" class="back-step-btn" @click="bookingStep--">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clip-rule="evenodd" />
                </svg>
                Back
              </button>

              <!-- Step 1: Patient Selection -->
              <div v-if="bookingStep === 1" class="booking-step">
                <h4>Who is this appointment for?</h4>
                <p class="step-description">Select if you're booking for yourself or someone else</p>
                
                <div class="patient-selection">
                  <div class="patient-option" 
                       :class="{ selected: patientSelection === 'self' }"
                       @click="selectPatientForSelf">
                    <div class="patient-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <div class="patient-info">
                      <h6>Myself</h6>
                      <p>Book appointment for yourself</p>
                    </div>
                    <div class="patient-check" v-if="patientSelection === 'self'">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  <div class="patient-option" 
                       :class="{ selected: patientSelection === 'other' }"
                       @click="patientSelection = 'other'">
                    <div class="patient-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fill-rule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <div class="patient-info">
                      <h6>Another Person</h6>
                      <p>Book appointment for family or friend</p>
                    </div>
                    <div class="patient-check" v-if="patientSelection === 'other'">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- Phone number input for other patient -->
                <div v-if="patientSelection === 'other'" class="other-patient-form">
                  <div class="form-group">
                    <label for="otherPatientPhone">
                      Patient's Phone Number <span class="required">*</span>
                    </label>
                    <input 
                      type="tel" 
                      id="otherPatientPhone" 
                      v-model="otherPatientPhone"
                      placeholder="Enter phone number (e.g., +123)"
                      @input="validatePhoneNumber"
                      :class="{ 'error': phoneError }"
                    />
                    <div v-if="phoneError" class="error-message">
                      {{ phoneError }}
                    </div>
                    
                    <button 
                      v-if="otherPatientPhone && !phoneError"
                      class="verify-patient-btn"
                      @click="verifyOtherPatient"
                      :disabled="verifyingPatient"
                    >
                      <span v-if="verifyingPatient" class="spinner"></span>
                      <span v-else>Verify Patient</span>
                    </button>
                  </div>

                  <!-- Patient found message -->
                  <div v-if="otherPatientVerified" class="patient-found-message">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                    </svg>
                    <div>
                      <strong>{{ otherPatientName }}</strong>
                      <p>Patient verified successfully</p>
                    </div>
                  </div>

                  <!-- Patient not found -->
                  <div v-if="otherPatientNotFound" class="patient-not-found">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
                    </svg>
                    <div>
                      <strong>Patient not found</strong>
                      <p>The phone number doesn't match any registered patient</p>
                    </div>
                  </div>
                </div>
                
                <button 
                  class="next-step-btn" 
                  :disabled="!canProceedToDateSelection"
                  @click="goToDateSelection"
                >
                  Continue to Date Selection
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>

              <!-- Step 2: Date Selection -->
              <div v-else-if="bookingStep === 2" class="booking-step">
                <h4>Select Appointment Date</h4>
                <p class="step-description">Choose a date for your consultation</p>
                
                <!-- Compact Calendar -->
                <div class="compact-calendar">
                  <div class="calendar-header">
                    <button class="calendar-nav" @click="previousMonth">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clip-rule="evenodd" />
                      </svg>
                    </button>
                    <h5 class="calendar-title">{{ persianMonth }} {{ persianYear }}</h5>
                    <button class="calendar-nav" @click="nextMonth">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  
                  <div class="compact-weekdays">
                    <div v-for="day in persianWeekdays" :key="day" class="weekday">{{ day }}</div>
                  </div>
                  
                  <div class="compact-days">
                    <div 
                      v-for="(day, index) in compactCalendarDays" 
                      :key="index"
                      :class="[
                        'compact-day',
                        { 
                          'empty': !day.date,
                          'today': day.isToday,
                          'selected': day.dateString === selectedDate,
                          'available': day.available,
                          'unavailable': !day.available && day.date
                        }
                      ]"
                      @click="day.available && day.date ? selectDate(day.dateString) : null"
                    >
                      <span v-if="day.date" class="day-number">{{ day.persianDay }}</span>
                    </div>
                  </div>
                </div>
                
                <div class="date-selection-info" v-if="selectedDate">
                  <p>Selected: <strong>{{ formatSelectedDate(selectedDate) }}</strong></p>
                </div>
                
                <button 
                  class="next-step-btn" 
                  :disabled="!selectedDate"
                  @click="goToTimeSelection"
                >
                  Continue to Time Selection
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>

              <!-- Step 3: Time Selection -->
              <div v-else-if="bookingStep === 3" class="booking-step">
                <h4>Select Appointment Time</h4>
                <p class="step-description">Choose a time slot on {{ formatSelectedDate(selectedDate) }}</p>
                
                <!-- Time Slots -->
                <div class="time-slots-container">
                  <div class="time-slots-header">
                    <span>Available Time Slots</span>
                  </div>
                  
                  <div v-if="loadingTimeSlots" class="loading-time-slots">
                    <div class="spinner"></div>
                    <p>Loading available time slots...</p>
                  </div>
                  
                  <div v-else-if="availableTimeSlots.length > 0" class="time-slots-grid">
                    <button 
                      v-for="slot in availableTimeSlots" 
                      :key="slot.scheduleId"
                      :class="['time-slot', { selected: selectedSlot?.scheduleId === slot.scheduleId }]"
                      @click="selectTimeSlot(slot)"
                      :disabled="slot.remainingCapacity === 0"
                    >
                      {{ slot.startTime }} - {{ slot.endTime }}
                      <span v-if="slot.remainingCapacity > 0" class="slot-capacity">
                        ({{ slot.remainingCapacity }} left)
                      </span>
                      <span v-else class="slot-full">(Full)</span>
                    </button>
                  </div>
                  
                  <div v-else class="no-slots-message">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
                    </svg>
                    <p>No available time slots for this date</p>
                  </div>
                </div>
                
                <div class="time-selection-info" v-if="selectedSlot">
                  <p>Selected Time: <strong>{{ selectedSlot.startTime }} - {{ selectedSlot.endTime }}</strong></p>
                </div>
                
                <button 
                  class="next-step-btn" 
                  :disabled="!selectedSlot"
                  @click="bookingStep = 4"
                >
                  Continue to Details
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>

              <!-- Step 4: Consultation Details -->
              <div v-else-if="bookingStep === 4" class="booking-step">
                <h4>Consultation Details</h4>
                <p class="step-description">Tell us about the consultation</p>
                
                <!-- Subject -->
                <div class="form-group">
                  <label for="subject">
                    Subject <span class="required">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="subject" 
                    v-model="consultationSubject"
                    placeholder="Brief subject of your consultation"
                    maxlength="100"
                  />
                  <div class="char-count">{{ consultationSubject.length }}/100</div>
                </div>

                <!-- Description -->
                <div class="form-group">
                  <label for="description">
                    Description <span class="required">*</span>
                  </label>
                  <textarea 
                    id="description" 
                    v-model="consultationDescription"
                    placeholder="Please describe your symptoms or reason for consultation"
                    rows="4"
                    maxlength="500"
                  ></textarea>
                  <div class="char-count">{{ consultationDescription.length }}/500</div>
                </div>
                
                <button 
                  class="next-step-btn" 
                  :disabled="!canProceedToPayment"
                  @click="bookingStep = 5"
                >
                  Continue to Payment
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>

              <!-- Step 5: Payment -->
              <div v-else-if="bookingStep === 5" class="booking-step">
                <h4>Confirm & Pay</h4>
                <p class="step-description">Review your appointment details and complete payment</p>
                
                <!-- Patient Info Summary -->
                <div class="patient-summary" v-if="patientSelection === 'other' && otherPatientName">
                  <div class="summary-header">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
                    </svg>
                    <div>
                      <span class="label">Patient</span>
                      <strong>{{ otherPatientName }}</strong>
                    </div>
                  </div>
                </div>
                
                <!-- Appointment Summary -->
                <div class="appointment-summary">
                  <h5>Appointment Summary</h5>
                  <div class="summary-details">
                    <div class="summary-row">
                      <span>Doctor:</span>
                      <strong>Dr. {{ doctor.firstName }} {{ doctor.lastName }}</strong>
                    </div>
                    <div class="summary-row">
                      <span>Specialty:</span>
                      <strong>{{ doctor.specialty }}</strong>
                    </div>
                    <div class="summary-row">
                      <span>Date:</span>
                      <strong>{{ formatSelectedDate(selectedDate) }}</strong>
                    </div>
                    <div class="summary-row">
                      <span>Time:</span>
                      <strong>{{ selectedSlot?.startTime }} - {{ selectedSlot?.endTime }}</strong>
                    </div>
                    <div class="summary-row">
                      <span>Subject:</span>
                      <strong>{{ consultationSubject }}</strong>
                    </div>
                    <div class="summary-row total">
                      <span>Total Amount:</span>
                      <strong class="total-amount">${{ doctor.consultationFee }}</strong>
                    </div>
                  </div>
                </div>
                
                <!-- Payment Method Selection -->
                <div class="payment-methods">
                  <h5>Select Payment Method</h5>
                  <div class="payment-options">
                    <div 
                      :class="['payment-option', { selected: paymentMethod === 'WALLET' }]"
                      @click="paymentMethod = 'WALLET'"
                    >
                      <div class="payment-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M2.273 5.625A4.483 4.483 0 015.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 3H5.25a3 3 0 00-2.977 2.625zM2.273 8.625A4.483 4.483 0 015.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 6H5.25a3 3 0 00-2.977 2.625zM5.25 9a3 3 0 00-3 3v6a3 3 0 003 3h13.5a3 3 0 003-3v-6a3 3 0 00-3-3H15a.75.75 0 00-.75.75 2.25 2.25 0 01-4.5 0A.75.75 0 009 9H5.25z" />
                        </svg>
                      </div>
                      <div class="payment-info">
                        <h6>Online Wallet</h6>
                        <p>Pay using your MediCare wallet balance</p>
                        <span class="wallet-balance">Current balance: ${{ walletBalance }}</span>
                      </div>
                      <div class="payment-check" v-if="paymentMethod === 'WALLET'">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    
                    <div 
                      :class="['payment-option', { selected: paymentMethod === 'DIRECT' }]"
                      @click="paymentMethod = 'DIRECT'"
                    >
                      <div class="payment-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM9 7.5A.75.75 0 009 9h1.5c.98 0 1.813.626 2.122 1.5H9A.75.75 0 009 12h3.622a2.251 2.251 0 01-2.122 1.5H9a.75.75 0 00-.53 1.28l3 3a.75.75 0 001.06-1.06l-1.73-1.732A3.752 3.752 0 0014.175 12H15a.75.75 0 000-1.5h-.825A3.733 3.733 0 0013.5 9H15a.75.75 0 000-1.5H9z" clip-rule="evenodd" />
                        </svg>
                      </div>
                      <div class="payment-info">
                        <h6>Direct Payment</h6>
                        <p>Pay using credit card or other payment methods</p>
                        <span class="gateway-info">Secure payment processed by Stripe</span>
                      </div>
                      <div class="payment-check" v-if="paymentMethod === 'DIRECT'">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Payment Validation -->
                <div class="payment-validation" v-if="paymentMethod">
                  <div v-if="paymentMethod === 'WALLET' && doctor.consultationFee > walletBalance" 
                       class="insufficient-balance">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
                    </svg>
                    <p>Insufficient wallet balance. You need ${{ (doctor.consultationFee - walletBalance).toFixed(2) }} more.</p>
                    <button @click="paymentMethod = 'DIRECT'" class="switch-to-gateway">
                      Use Direct Payment Instead
                    </button>
                  </div>
                  
                  <div v-else class="confirmation-section">
                    <label class="checkbox-container">
                      <input type="checkbox" v-model="termsAccepted">
                      <span class="checkmark"></span>
                      I agree to the consultation terms and cancellation policy
                    </label>
                    
                    <button 
                      class="confirm-payment-btn" 
                      :disabled="!termsAccepted || processingPayment"
                      @click="processPayment"
                    >
                      <span v-if="processingPayment" class="spinner"></span>
                      <span v-else>
                        {{ paymentMethod === 'WALLET' ? 'Confirm & Pay from Wallet' : 'Proceed to Payment Gateway' }}
                      </span>
                    </button>
                    
                    <p class="payment-note">
                      Your appointment will be confirmed immediately after successful payment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Quick Contact Card -->
          <div class="contact-card">
            <h4>Need Help?</h4>
            <p>Contact our support team for assistance</p>
            <button class="contact-support-btn" @click="contactSupport">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clip-rule="evenodd" />
              </svg>
              Contact Support
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
        <h3>Appointment Confirmed!</h3>
        <p>Your appointment with Dr. {{ doctor.firstName }} {{ doctor.lastName }} has been successfully booked.</p>
        
        <div class="appointment-details-modal">
          <div class="detail-row">
            <span>Patient:</span>
            <strong>{{ patientSelection === 'self' ? 'You' : otherPatientName }}</strong>
          </div>
          <div class="detail-row">
            <span>Date:</span>
            <strong>{{ formatSelectedDate(selectedDate) }}</strong>
          </div>
          <div class="detail-row">
            <span>Time:</span>
            <strong>{{ selectedSlot?.startTime }} - {{ selectedSlot?.endTime }}</strong>
          </div>
          <div class="detail-row">
            <span>Amount Paid:</span>
            <strong class="amount">${{ doctor.consultationFee }}</strong>
          </div>
          <div class="detail-row">
            <span>Payment Method:</span>
            <strong>{{ paymentMethod === 'WALLET' ? 'Online Wallet' : 'Direct Payment' }}</strong>
          </div>
        </div>
        
        <div class="modal-actions">
          <button class="modal-btn secondary" @click="showSuccessModal = false">
            Close
          </button>
          <button class="modal-btn primary" @click="goToAppointments">
            View My Appointments
          </button>
        </div>
        
        <p class="modal-note">
          You will receive a confirmation email shortly. Please arrive 10 minutes before your scheduled time.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment-jalaali';

export default {
  name: 'DoctorDetailed',
  
  data() {
    return {
      // Doctor data
      doctor: {
        id: null,
        firstName: '',
        lastName: '',
        specialty: '',
        consultationFee: 0,
        consultationTime: 30,
        rating: 4.5,
        reviewCount: 0,
        experience: 0,
        isOnline: false,
        isVerified: false,
        categories: [],
        medicalCode: '',
        contactInfo: '',
        email: '',
        isActive: false,
        maxConcurrentConsultations: 3,
        description: '',
        education: ''
      },
      
      // Doctor schedules
      doctorSchedules: {},
      
      // API configuration
      apiBaseUrl: 'http://localhost:8000',
      
      // UI states
      loading: true,
      error: null,
      userProfileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      showProfileMenu: false,
      showSuccessModal: false,
      
      // Booking data
      bookingStep: 1,
      
      // Patient selection
      patientSelection: null,
      otherPatientPhone: '',
      otherPatientName: '',
      otherPatientId: null,
      otherPatientData: null,
      verifyingPatient: false,
      phoneError: '',
      otherPatientVerified: false,
      otherPatientNotFound: false,
      
      selectedDate: null,
      selectedSlot: null,
      consultationSubject: '',
      consultationDescription: '',
      paymentMethod: null,
      termsAccepted: false,
      processingPayment: false,
      
      // Calendar data
      currentDate: moment(),
      persianMonth: '',
      persianYear: '',
      persianWeekdays: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
      compactCalendarDays: [],
      
      // Time slots data
      loadingTimeSlots: false,
      availableTimeSlots: [],
      
      // Wallet balance
      walletBalance: 0,
      
      // Current user
      currentUser: null,
      
      // Medical categories
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
      
      // Default images
      defaultDoctorImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  },
  
  computed: {
    canProceedToDateSelection() {
      if (!this.patientSelection) return false;
      if (this.patientSelection === 'self') return true;
      return this.otherPatientVerified;
    },
    
    canProceedToPayment() {
      return this.consultationSubject.trim() && this.consultationDescription.trim();
    }
  },
  
  watch: {
    selectedDate(newVal) {
      if (newVal) {
        this.selectedSlot = null;
        this.fetchAvailableTimeSlots();
      }
    }
  },
  
  async mounted() {
    await this.fetchDoctorData();
    await this.fetchWalletBalance();
    this.initializeCalendar();
    
    // Get current user from localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      this.currentUser = JSON.parse(userData);
    }
  },
  
  methods: {
    getAuthToken() {
      return localStorage.getItem('authToken') || '';
    },
    
    async fetchDoctorData() {
      this.loading = true;
      this.error = null;
      
      try {
        const doctorId = this.$route.params.id;
        const authToken = this.getAuthToken();
        
        if (!authToken) {
          throw new Error('Authentication required. Please login first.');
        }
        
        // Fetch doctor details
        const response = await fetch(`${this.apiBaseUrl}/doctors/${doctorId}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        });
        
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Session expired. Please login again.');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Transform API data to UI format
        this.doctor = {
          id: data.id,
          firstName: data.user?.firstName || '',
          lastName: data.user?.lastName || '',
          email: data.user?.email || '',
          phone: data.user?.phone || '',
          specialty: this.getSpecialtyFromCategories(data.categories),
          consultationFee: data.consultationPrice || 0,
          consultationTime: 30, // Default
          rating: this.getRandomRating(),
          reviewCount: this.getRandomReviewCount(),
          experience: this.getRandomExperience(),
          isOnline: Math.random() > 0.5,
          isVerified: !!data.medicalCode,
          isActive: data.isActive || false,
          categories: data.categories || [],
          medicalCode: data.medicalCode || '',
          contactInfo: data.contactInfo || '',
          maxConcurrentConsultations: data.maxConcurrentConsultations || 3,
          description: `Dr. ${data.user?.lastName} is a medical specialist with extensive experience.`,
          education: 'Medical degree',
          profileImage: this.defaultDoctorImage
        };
        
        // Store doctor schedules
        this.doctorSchedules = data.schedules || {};
        
      } catch (err) {
        console.error('Error fetching doctor data:', err);
        this.error = err.message || 'Failed to load doctor information. Please try again.';
        
        // Use mock data for development
        if (process.env.NODE_ENV === 'development') {
          this.useMockDoctorData();
        }
      } finally {
        this.loading = false;
      }
    },
    
    async fetchWalletBalance() {
      try {
        const authToken = this.getAuthToken();
        const response = await fetch(`${this.apiBaseUrl}/wallet/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        this.walletBalance = data.balance || 0;
        
      } catch (err) {
        console.error('Error fetching wallet balance:', err);
        this.walletBalance = 0;
      }
    },
    
    async verifyOtherPatient() {
      if (!this.otherPatientPhone || this.phoneError) return;
      
      this.verifyingPatient = true;
      this.otherPatientVerified = false;
      this.otherPatientNotFound = false;
      
      try {
        const authToken = this.getAuthToken();
        
        const response = await fetch(`${this.apiBaseUrl}/users/find-by-phone/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({
            phone: this.otherPatientPhone
          })
        });
        
        if (!response.ok) {
          if (response.status === 404) {
            this.otherPatientNotFound = true;
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Store patient data - IMPORTANT: Use patientProfile.id, not user.id
        this.otherPatientData = data;
        this.otherPatientName = `${data.firstName} ${data.lastName}`;
        this.otherPatientId = data.patientProfile?.id || null;
        this.otherPatientVerified = true;
        this.otherPatientNotFound = false;
        
      } catch (err) {
        console.error('Error verifying patient:', err);
        this.phoneError = 'Error verifying patient. Please try again.';
      } finally {
        this.verifyingPatient = false;
      }
    },
    
    validatePhoneNumber() {
      if (!this.otherPatientPhone) {
        this.phoneError = '';
        return;
      }
      
      // Simple validation - adjust as needed
      if (this.otherPatientPhone.length < 4) {
        this.phoneError = 'Phone number must be at least 4 digits';
      } else {
        this.phoneError = '';
      }
    },
    
    selectPatientForSelf() {
      this.patientSelection = 'self';
      this.otherPatientPhone = '';
      this.otherPatientName = '';
      this.otherPatientId = null;
      this.otherPatientData = null;
      this.otherPatientVerified = false;
      this.otherPatientNotFound = false;
      this.phoneError = '';
    },
    
    goToDateSelection() {
      this.bookingStep = 2;
    },
    
    useMockDoctorData() {
      const doctorId = this.$route.params.id;
      this.doctor = {
        id: doctorId,
        firstName: 'James',
        lastName: 'Wilson',
        specialty: 'Cardiology',
        consultationFee: 250,
        consultationTime: 30,
        rating: 4.8,
        reviewCount: 342,
        experience: 15,
        isOnline: true,
        isVerified: true,
        isActive: true,
        categories: ['cardiology'],
        medicalCode: 'CA-123456',
        contactInfo: '+1 (555) 123-4567',
        email: 'dr.wilson@medicare.com',
        maxConcurrentConsultations: 3,
        description: 'Dr. Wilson is a board-certified cardiologist with 15 years of experience specializing in heart diseases.',
        education: 'MD, Harvard Medical School',
        profileImage: this.defaultDoctorImage
      };
      
      // Mock schedules
      this.doctorSchedules = {
        "1": [ // Saturday
          {
            id: 1,
            startTime: "09:00",
            endTime: "09:30",
            duration: null
          },
          {
            id: 2,
            startTime: "10:00",
            endTime: "10:30",
            duration: null
          }
        ],
        "2": [ // Sunday
          {
            id: 3,
            startTime: "14:00",
            endTime: "14:30",
            duration: null
          },
          {
            id: 4,
            startTime: "15:00",
            endTime: "15:30",
            duration: null
          }
        ],
        "3": [ // Monday
          {
            id: 5,
            startTime: "11:00",
            endTime: "11:30",
            duration: null
          }
        ]
      };
    },
    
    getSpecialtyFromCategories(categories) {
      if (!categories || categories.length === 0) {
        return 'General Medicine';
      }
      
      const category = this.medicalCategories.find(c => c.id === categories[0]);
      return category ? category.name : 'General Medicine';
    },
    
    getRandomRating() {
      return parseFloat((3.5 + Math.random() * 1.5).toFixed(1));
    },
    
    getRandomReviewCount() {
      return Math.floor(Math.random() * 450) + 50;
    },
    
    getRandomExperience() {
      return Math.floor(Math.random() * 30) + 1;
    },
    
    async fetchAvailableTimeSlots() {
      if (!this.selectedDate) return;
      
      this.loadingTimeSlots = true;
      this.availableTimeSlots = [];
      
      try {
        const authToken = this.getAuthToken();
        const doctorId = this.$route.params.id;
        
        // Convert selected date to Jalali format
        const jalaliDate = this.convertToJalali(this.selectedDate);
        
        const response = await fetch(`${this.apiBaseUrl}/doctors/${doctorId}/available-slots?date=${jalaliDate}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (Array.isArray(data)) {
          this.availableTimeSlots = data;
        }
        
      } catch (err) {
        console.error('Error fetching time slots:', err);
        
        // Use mock data for development
        if (process.env.NODE_ENV === 'development') {
          this.useMockTimeSlots();
        }
      } finally {
        this.loadingTimeSlots = false;
      }
    },
    
    useMockTimeSlots() {
      // Generate mock time slots based on selected date
      const date = moment(this.selectedDate);
      const dayOfWeek = date.day(); // 0 = Sunday, 1 = Monday, etc.
      
      // Convert to Persian day numbering (Saturday = 1)
      let persianDay;
      if (dayOfWeek === 6) persianDay = 1; // Saturday
      else if (dayOfWeek === 0) persianDay = 2; // Sunday
      else if (dayOfWeek === 1) persianDay = 3; // Monday
      else if (dayOfWeek === 2) persianDay = 4; // Tuesday
      else if (dayOfWeek === 3) persianDay = 5; // Wednesday
      else if (dayOfWeek === 4) persianDay = 6; // Thursday
      else if (dayOfWeek === 5) persianDay = 7; // Friday
      
      const daySchedules = this.doctorSchedules[persianDay.toString()] || [];
      
      this.availableTimeSlots = daySchedules.map(schedule => ({
        scheduleId: schedule.id,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        remainingCapacity: Math.floor(Math.random() * 3) + 1
      }));
    },
    
    selectTimeSlot(slot) {
      this.selectedSlot = slot;
    },
    
    goToTimeSelection() {
      if (!this.selectedDate) return;
      this.bookingStep = 3;
    },
    
    async processPayment() {
      this.processingPayment = true;
      
      try {
        const authToken = this.getAuthToken();
        const doctorId = this.$route.params.id;
        
        // Determine patient ID to use
        let patientIdToUse;
        
        if (this.patientSelection === 'self') {
          // Use current user's patient profile ID
          if (!this.currentUser?.patientProfile?.id) {
            throw new Error('Your patient profile information not found');
          }
          patientIdToUse = this.currentUser.patientProfile.id;
        } else {
          // Use verified other patient's patientProfile.id
          if (!this.otherPatientId) {
            throw new Error('Selected patient information not found');
          }
          patientIdToUse = this.otherPatientId;
        }
        
        if (!this.selectedSlot) {
          throw new Error('No time slot selected');
        }
        
        // Convert selected date to Jalali format
        const reservedDateJalali = this.convertToJalali(this.selectedDate);
        
        // Prepare booking payload
        const bookingPayload = {
          doctorId: parseInt(doctorId),
          patientId: parseInt(patientIdToUse), // Using patientProfile.id, not user.id
          scheduleId: this.selectedSlot.scheduleId,
          subject: this.consultationSubject,
          description: this.consultationDescription,
          reservedDateJalali: reservedDateJalali,
          paymentMethod: this.paymentMethod
        };
        
        // Submit reservation
        const response = await fetch(`${this.apiBaseUrl}/consultations/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify(bookingPayload)
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to book appointment');
        }
        
        // Success
        this.showSuccessModal = true;
        
      } catch (err) {
        console.error('Payment error:', err);
        alert(err.message || 'Payment failed. Please try again.');
      } finally {
        this.processingPayment = false;
      }
    },
    
    // Calendar Functions
    initializeCalendar() {
      this.updateCalendarDisplay();
      this.generateCalendarDays();
    },
    
    updateCalendarDisplay() {
      this.persianMonth = this.currentDate.format('jMMMM');
      this.persianYear = this.currentDate.format('jYYYY');
    },
    
    generateCalendarDays() {
  const days = [];
  const startOfMonth = this.currentDate.clone().startOf('jMonth');
  const endOfMonth = this.currentDate.clone().endOf('jMonth');
  const startDay = startOfMonth.day(); // 0-6, 0 is Saturday in Persian calendar
  
  // Adjust for Persian week starting on Saturday
  const persianStartDay = startDay === 6 ? 0 : startDay + 1;
  
  // Add empty days at the start
  for (let i = 0; i < persianStartDay; i++) {
    days.push({
      date: null,
      persianDay: '',
      dateString: null,
      available: false,
      isToday: false
    });
  }
  
  // Add days of the month
  for (let i = 1; i <= endOfMonth.jDate(); i++) {
    const date = this.currentDate.clone().jDate(i).jYear(this.currentDate.jYear()).jMonth(this.currentDate.jMonth());
    const gregorianDate = date.toDate();
    
    // FIX: Create date string in local timezone to avoid UTC offset issues
    const year = gregorianDate.getFullYear();
    const month = String(gregorianDate.getMonth() + 1).padStart(2, '0');
    const day = String(gregorianDate.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    
    const today = moment();
    const isToday = date.format('jYYYY/jMM/jDD') === today.format('jYYYY/jMM/jDD');
    
    // Check if this day is available (has schedules)
    const dayOfWeek = date.day();
    const persianDay = this.getPersianDayOfWeek(dayOfWeek);
    const hasSchedules = this.doctorSchedules[persianDay.toString()] && 
                       this.doctorSchedules[persianDay.toString()].length > 0;
    
    days.push({
      date: date,
      persianDay: i.toString(),
      dateString: dateString,
      available: hasSchedules,
      isToday: isToday
    });
  }
  
  // Add empty days at the end to make 6 rows (42 days)
  const totalDays = days.length;
  const remainingDays = 42 - totalDays;
  for (let i = 0; i < remainingDays; i++) {
    days.push({
      date: null,
      persianDay: '',
      dateString: null,
      available: false,
      isToday: false
    });
  }
  
  // Take only the first 35 days for compact view (5 weeks)
  this.compactCalendarDays = days.slice(0, 35);
},
    
    getPersianDayOfWeek(gregorianDay) {
      // Convert Gregorian day (0=Sunday) to Persian day (1=Saturday, 7=Friday)
      return gregorianDay + 1;
    },
    
    previousMonth() {
      this.currentDate.subtract(1, 'jMonth');
      this.updateCalendarDisplay();
      this.generateCalendarDays();
    },
    
    nextMonth() {
      this.currentDate.add(1, 'jMonth');
      this.updateCalendarDisplay();
      this.generateCalendarDays();
    },
    
    selectDate(dateString) {
      console.log(888888,dateString)
      this.selectedDate = dateString;
    },
    
    formatSelectedDate(dateString) {
      if (!dateString) return '';
      const [year, month, day] = dateString.split('-').map(Number);
      // Create date at noon UTC to avoid timezone issues
      const date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
      return moment(date).format('jYYYY/jMM/jDD');
    },
    
    convertToJalali(dateString) {
      // Parse the date string in UTC to avoid timezone shifts
      const [year, month, day] = dateString.split('-').map(Number);
      // Create date at noon UTC to avoid timezone issues
      const date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
      return moment(date).format('jYYYY/jMM/jDD');
    },
    
    getCategoryName(categoryId) {
      const category = this.medicalCategories.find(c => c.id === categoryId);
      return category ? category.name : categoryId;
    },
    
    contactSupport() {
      alert('Support contact feature coming soon!');
    },
    
    goToAppointments() {
      this.$router.push('/appointments');
    },
    
    goToProfile() {
      this.$router.push('/profile');
    },
    
    goToConsultants() {
      this.$router.push('/consultants');
    },
    
    handleLogout() {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      this.$router.push('/login');
    }
  }
}
</script>



<style scoped>
/* Add new styles for patient selection */

.patient-selection {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.patient-option {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.patient-option:hover {
  border-color: #cbd5e0;
  transform: translateY(-2px);
}

.patient-option.selected {
  border-color: #667eea;
  background: #f7f9fc;
}

.patient-icon {
  width: 48px;
  height: 48px;
  background: #f7f9fc;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.patient-icon svg {
  width: 24px;
  height: 24px;
  color: #667eea;
}

.patient-info {
  flex: 1;
}

.patient-info h6 {
  font-size: 16px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 4px;
}

.patient-info p {
  font-size: 13px;
  color: #718096;
  margin: 0;
}

.patient-check {
  width: 24px;
  height: 24px;
  background: #667eea;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.patient-check svg {
  width: 14px;
  height: 14px;
  color: white;
}

.other-patient-form {
  margin-bottom: 24px;
  padding: 20px;
  background: #f7f9fc;
  border-radius: 16px;
  border: 2px solid #e2e8f0;
}

.verify-patient-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.verify-patient-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.verify-patient-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.patient-found-message {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f0fff4;
  border: 2px solid #c6f6d5;
  border-radius: 12px;
  margin-top: 16px;
}

.patient-found-message svg {
  width: 24px;
  height: 24px;
  color: #48bb78;
  flex-shrink: 0;
}

.patient-found-message strong {
  display: block;
  color: #22543d;
  margin-bottom: 4px;
}

.patient-found-message p {
  margin: 0;
  font-size: 13px;
  color: #22543d;
}

.patient-not-found {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #fff5f5;
  border: 2px solid #fed7d7;
  border-radius: 12px;
  margin-top: 16px;
}

.patient-not-found svg {
  width: 24px;
  height: 24px;
  color: #e53e3e;
  flex-shrink: 0;
}

.patient-not-found strong {
  display: block;
  color: #c53030;
  margin-bottom: 4px;
}

.patient-not-found p {
  margin: 0;
  font-size: 13px;
  color: #c53030;
}

.patient-summary {
  background: #f7f9fc;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 20px;
  border: 2px solid #e2e8f0;
}

.patient-summary .summary-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.patient-summary .summary-header svg {
  width: 24px;
  height: 24px;
  color: #667eea;
}

.patient-summary .summary-header .label {
  font-size: 12px;
  color: #718096;
  display: block;
  margin-bottom: 2px;
}

/* Rest of your existing styles remain exactly the same */
/* [All your existing styles from the original file go here - I've omitted them for brevity but they should be included] */

/* Base Styles */
.doctor-detail-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  position: relative;
  overflow-x: hidden;
  overflow-y: hidden;
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

/* Header Styles (Your provided header) */
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
  padding: 16px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}

@media (max-width: 768px) {
  .header-content {
    padding: 16px 24px;
    gap: 20px;
  }
}

.header-content .back-btn {
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

.header-content .back-btn:hover {
  background: #667eea;
  border-color: #667eea;
  transform: translateX(-2px);
}

.header-content .back-btn:hover svg {
  color: white;
}

.header-content .back-btn svg {
  width: 24px;
  height: 24px;
  color: #4a5568;
  transition: color 0.3s ease;
}

.header-info {
  flex: 1;
  text-align: center;
}

.header-title {
  font-size: 24px;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 4px 0;
}

.header-subtitle {
  font-size: 14px;
  color: #718096;
  margin: 0;
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
  cursor: pointer;
  border: 3px solid #667eea;
  transition: transform 0.3s ease;
}

.profile-img:hover {
  transform: scale(1.05);
}

.profile-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  border: 1px solid #e2e8f0;
  min-width: 200px;
  z-index: 1000;
  overflow: hidden;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  font-size: 14px;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.3s ease;
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
  width: 18px;
  height: 18px;
}

.menu-item.logout {
  color: #e53e3e;
}

.menu-item.logout:hover {
  background: #fff5f5;
  color: #c53030;
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
  position: relative;
  z-index: 1;
}

.loading-container .spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

.loading-container p {
  font-size: 16px;
  color: white;
  font-weight: 500;
}

/* Error State */
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
  position: relative;
  z-index: 1;
  text-align: center;
}

.error-container svg {
  width: 80px;
  height: 80px;
  color: white;
  margin-bottom: 24px;
}

.error-container h3 {
  font-size: 24px;
  color: white;
  margin-bottom: 12px;
}

.error-container p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 24px;
  max-width: 400px;
}

.retry-btn {
  padding: 12px 32px;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  background: #f7f9fc;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2);
}

/* Main Content */
.detail-content {
  position: relative;
  z-index: 1;
}

.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 40px;
}

@media (max-width: 1200px) {
  .content-wrapper {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    padding: 24px;
    gap: 30px;
  }
}

/* Left Column Styles */
.info-column {
  display: flex;
  flex-direction: column;
  gap: 30px;
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
    align-items: center;
    text-align: center;
  }
}

.profile-image {
  position: relative;
  width: 120px;
  height: 120px;
  flex-shrink: 0;
}

.profile-image img {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  object-fit: cover;
  border: 4px solid #667eea;
}

.online-status {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 12px;
  background: #48bb78;
  color: white;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  border: 2px solid white;
}

.online-status.offline {
  background: #a0aec0;
}

.profile-info {
  flex: 1;
}

.name-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.doctor-name {
  font-size: 28px;
  font-weight: 800;
  color: #2d3748;
  margin: 0;
}

.verification-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #48bb78;
  color: white;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.verification-badge svg {
  width: 14px;
  height: 14px;
}

.doctor-specialty {
  font-size: 18px;
  color: #667eea;
  font-weight: 600;
  margin-bottom: 20px;
}

.rating-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}

.rating-display {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stars {
  display: flex;
  gap: 2px;
}

.stars svg {
  width: 24px;
  height: 24px;
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
  font-size: 24px;
  font-weight: 700;
  color: #2d3748;
}

.review-count {
  color: #718096;
  font-size: 14px;
}

/* Quick Stats */
.quick-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
  background: #f7f9fc;
  border-radius: 16px;
}

@media (max-width: 768px) {
  .quick-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-number {
  font-size: 28px;
  font-weight: 800;
  color: #667eea;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: #718096;
  font-weight: 500;
}

/* Details Sections */
.details-sections {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.detail-section {
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
  gap: 12px;
  font-size: 20px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 24px;
}

.section-title svg {
  width: 24px;
  height: 24px;
  color: #667eea;
}

/* Categories */
.categories-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.category-tag {
  padding: 8px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

/* Contact Information */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contact-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px solid #e2e8f0;
}

.contact-item:last-child {
  border-bottom: none;
}

.contact-label {
  font-weight: 600;
  color: #4a5568;
  font-size: 14px;
}

.contact-value {
  color: #2d3748;
  font-weight: 500;
}

/* Consultation Details */
.consultation-details {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-label {
  color: #718096;
  font-size: 14px;
}

.detail-value {
  font-weight: 600;
  color: #2d3748;
}

.detail-value.fee {
  color: #667eea;
  font-size: 18px;
}

/* About Doctor */
.about-text {
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 16px;
}

.education {
  padding: 12px 16px;
  background: #f7f9fc;
  border-radius: 12px;
  font-size: 14px;
  color: #4a5568;
}

/* Right Column - Booking Widget */
.booking-column {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.booking-widget {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: sticky;
  top: 100px;
}

@media (max-width: 1200px) {
  .booking-widget {
    position: static;
  }
}

.widget-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.widget-header h3 {
  font-size: 24px;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
}

.consultation-fee {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.fee-label {
  font-size: 12px;
  color: #718096;
}

.fee-amount {
  font-size: 32px;
  font-weight: 800;
  color: #667eea;
}

/* Booking Steps */
.booking-steps {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.step-number {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e2e8f0;
  border-radius: 50%;
  font-weight: 600;
  color: #718096;
  transition: all 0.3s ease;
}

.step.active .step-number {
  background: #667eea;
  color: white;
  transform: scale(1.1);
}

.step.completed .step-number {
  background: #48bb78;
  color: white;
}

.step-label {
  font-size: 11px;
  color: #718096;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
}

.step.active .step-label {
  color: #667eea;
  font-weight: 600;
}

.step-connector {
  flex: 1;
  height: 2px;
  background: #e2e8f0;
  margin: 0 5px;
}

.step.completed + .step-connector {
  background: #48bb78;
}

/* Back Button */
.back-step-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: #f7f9fc;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 24px;
  width: fit-content;
}

.back-step-btn:hover {
  background: #edf2f7;
  border-color: #cbd5e0;
  color: #667eea;
}

.back-step-btn svg {
  width: 16px;
  height: 16px;
}

/* Booking Step Content */
.booking-step {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.booking-step h4 {
  font-size: 20px;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
}

.step-description {
  color: #718096;
  font-size: 14px;
  margin: 0;
}

/* Compact Calendar */
.compact-calendar {
  background: #f7f9fc;
  border-radius: 16px;
  padding: 16px;
  border: 2px solid #e2e8f0;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.calendar-nav {
  width: 36px;
  height: 36px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.calendar-nav:hover {
  border-color: #667eea;
  background: #667eea;
}

.calendar-nav:hover svg {
  color: white;
}

.calendar-nav svg {
  width: 16px;
  height: 16px;
  color: #4a5568;
}

.calendar-title {
  font-size: 16px;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
}

.compact-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 8px;
}

.compact-weekdays .weekday {
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  color: #718096;
  padding: 6px;
}

.compact-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.compact-day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 600;
}

.compact-day:hover:not(.empty):not(.unavailable) {
  border-color: #667eea;
  transform: translateY(-1px);
}

.compact-day.selected {
  background: #667eea;
  border-color: #667eea;
  color: white;
}

.compact-day.today {
  border-color: #48bb78;
}

.compact-day.available {
  border-color: #c6f6d5;
}

.compact-day.unavailable {
  opacity: 0.5;
  cursor: not-allowed;
  background: #f7f9fc;
}

.compact-day.empty {
  background: transparent;
  border-color: transparent;
  cursor: default;
  visibility: hidden;
}

.date-selection-info {
  padding: 16px;
  background: #f7f9fc;
  border-radius: 12px;
  text-align: center;
}

.date-selection-info p {
  margin: 0;
  color: #4a5568;
}

/* Time Slots */
.time-slots-container {
  background: #f7f9fc;
  border-radius: 16px;
  padding: 20px;
  border: 2px solid #e2e8f0;
}

.time-slots-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.time-slots-header span {
  font-weight: 600;
  color: #2d3748;
}

/* Loading Time Slots */
.loading-time-slots {
  padding: 40px 20px;
  text-align: center;
}

.loading-time-slots .spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(102, 126, 234, 0.3);
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

.loading-time-slots p {
  color: #718096;
  font-size: 14px;
}

.time-slots-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

@media (max-width: 480px) {
  .time-slots-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.time-slot {
  padding: 16px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.time-slot:hover {
  border-color: #cbd5e0;
  transform: translateY(-2px);
}

.time-slot.selected {
  background: #667eea;
  border-color: #667eea;
  color: white;
}

.no-slots-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
}

.no-slots-message svg {
  width: 48px;
  height: 48px;
  color: #a0aec0;
  margin-bottom: 16px;
}

.no-slots-message p {
  color: #718096;
  margin-bottom: 20px;
}

.time-selection-info {
  padding: 16px;
  background: #f7f9fc;
  border-radius: 12px;
}

.time-selection-info p {
  margin: 8px 0;
  color: #4a5568;
}

/* Consultation Options */
.consultation-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.consultation-option {
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

.consultation-option:hover {
  border-color: #cbd5e0;
  transform: translateY(-2px);
}

.consultation-option.selected {
  border-color: #667eea;
  background: #f7f9fc;
}

.option-icon {
  width: 40px;
  height: 40px;
  background: #f7f9fc;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.option-icon svg {
  width: 20px;
  height: 20px;
  color: #667eea;
}

.option-info {
  flex: 1;
}

.option-info h6 {
  font-size: 16px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 4px;
}

.option-info p {
  font-size: 13px;
  color: #718096;
  margin: 0;
}

.option-check {
  width: 24px;
  height: 24px;
  background: #667eea;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.option-check svg {
  width: 14px;
  height: 14px;
  color: white;
}

/* Consultation Type */
.type-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.type-option {
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

.type-option:hover {
  border-color: #cbd5e0;
  transform: translateY(-2px);
}

.type-option.selected {
  border-color: #667eea;
  background: #f7f9fc;
}

.type-icon {
  width: 40px;
  height: 40px;
  background: #f7f9fc;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.type-icon svg {
  width: 20px;
  height: 20px;
  color: #667eea;
}

.type-info {
  flex: 1;
}

.type-info h6 {
  font-size: 16px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 4px;
}

.type-info p {
  font-size: 13px;
  color: #718096;
  margin: 0;
}

.type-check {
  width: 24px;
  height: 24px;
  background: #667eea;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.type-check svg {
  width: 14px;
  height: 14px;
  color: white;
}

/* Patient Information */
.patient-information {
  margin-bottom: 24px;
}

.patient-information h5 {
  font-size: 16px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 16px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 8px;
}

.form-group input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 14px;
  color: #2d3748;
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group input.error {
  border-color: #e53e3e;
}

.error-message {
  font-size: 12px;
  color: #e53e3e;
  margin-top: 6px;
}

/* Validation Messages */
.validation-message {
  padding: 16px;
  border-radius: 12px;
  margin-top: 16px;
}

.info-message {
  background: #f7f9fc;
  border: 2px solid #e2e8f0;
  color: #4a5568;
}

.success-message {
  background: #f0fff4;
  border: 2px solid #c6f6d5;
  color: #22543d;
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.warning-message {
  background: #fffaf0;
  border: 2px solid #fed7d7;
  color: #742a2a;
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.success-message svg {
  width: 20px;
  height: 20px;
  color: #48bb78;
  flex-shrink: 0;
  margin-top: 2px;
}

.warning-message svg {
  width: 20px;
  height: 20px;
  color: #e53e3e;
  flex-shrink: 0;
  margin-top: 2px;
}

.success-message p,
.warning-message p {
  margin: 0;
  font-size: 13px;
  line-height: 1.4;
}

.warning-message a {
  color: #667eea;
  text-decoration: underline;
  cursor: pointer;
}

/* Appointment Summary */
.appointment-summary {
  background: #f7f9fc;
  border-radius: 16px;
  padding: 24px;
}

.appointment-summary h5 {
  font-size: 18px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 20px;
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
  padding-bottom: 12px;
  border-bottom: 1px solid #e2e8f0;
}

.summary-row:last-child {
  border-bottom: none;
}

.summary-row.total {
  padding-top: 12px;
  border-top: 2px solid #e2e8f0;
  font-size: 18px;
}

.total-amount {
  color: #667eea;
  font-size: 24px;
}

/* Payment Methods */
.payment-methods {
  margin-top: 24px;
}

.payment-methods h5 {
  font-size: 18px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 20px;
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
  padding: 20px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
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
  width: 48px;
  height: 48px;
  background: #f7f9fc;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.payment-icon svg {
  width: 24px;
  height: 24px;
  color: #667eea;
}

.payment-info {
  flex: 1;
}

.payment-info h6 {
  font-size: 16px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 4px;
}

.payment-info p {
  font-size: 13px;
  color: #718096;
  margin-bottom: 4px;
}

.wallet-balance {
  font-size: 12px;
  color: #48bb78;
  font-weight: 600;
}

.gateway-info {
  font-size: 12px;
  color: #667eea;
  font-weight: 600;
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

/* Payment Validation */
.payment-validation {
  margin-top: 24px;
}

.insufficient-balance {
  padding: 20px;
  background: #fff5f5;
  border: 2px solid #fed7d7;
  border-radius: 16px;
  text-align: center;
}

.insufficient-balance svg {
  width: 48px;
  height: 48px;
  color: #e53e3e;
  margin-bottom: 16px;
}

.insufficient-balance p {
  color: #c53030;
  margin-bottom: 16px;
  font-weight: 500;
}

.switch-to-gateway {
  padding: 12px 24px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.switch-to-gateway:hover {
  background: #5a67d8;
  transform: translateY(-2px);
}

.confirmation-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  color: #4a5568;
  font-size: 14px;
}

.checkbox-container input {
  display: none;
}

.checkmark {
  width: 20px;
  height: 20px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  position: relative;
  flex-shrink: 0;
  margin-top: 2px;
}

.checkbox-container input:checked + .checkmark {
  background: #667eea;
  border-color: #667eea;
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

.confirm-payment-btn {
  padding: 18px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s ease;
}

.confirm-payment-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.confirm-payment-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.confirm-payment-btn .spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.payment-note {
  font-size: 12px;
  color: #718096;
  text-align: center;
  margin: 0;
}

/* Navigation Buttons */
.next-step-btn {
  width: 100%;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  margin-top: 20px;
}

.next-step-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.next-step-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.next-step-btn svg {
  width: 20px;
  height: 20px;
}

/* Contact Card */
.contact-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
}

.contact-card h4 {
  font-size: 18px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 8px;
}

.contact-card p {
  color: #718096;
  font-size: 14px;
  margin-bottom: 20px;
}

.contact-support-btn {
  width: 100%;
  padding: 14px;
  background: #f7f9fc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #4a5568;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.contact-support-btn:hover {
  background: #edf2f7;
  border-color: #cbd5e0;
  color: #667eea;
}

.contact-support-btn svg {
  width: 20px;
  height: 20px;
}

/* Success Modal */
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
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 24px;
  width: 100%;
  max-width: 500px;
  animation: modalSlideIn 0.3s ease;
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

.appointment-details-modal {
  background: #f7f9fc;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 32px;
}

.appointment-details-modal .detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #e2e8f0;
}

.appointment-details-modal .detail-row:last-child {
  border-bottom: none;
}

.appointment-details-modal .detail-row .amount {
  color: #667eea;
  font-size: 20px;
}

.modal-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.modal-btn {
  flex: 1;
  padding: 16px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modal-btn.secondary {
  background: #f7f9fc;
  border: 2px solid #e2e8f0;
  color: #4a5568;
}

.modal-btn.secondary:hover {
  background: #edf2f7;
  border-color: #cbd5e0;
}

.modal-btn.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
}

.modal-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.modal-note {
  font-size: 12px;
  color: #718096;
  margin: 0;
}

/* Spinner Animation */
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>