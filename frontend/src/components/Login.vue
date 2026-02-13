<template>
  <div class="auth-container">
    <!-- Animated Background -->
    <div class="animated-bg">
      <div class="bg-circle circle-1"></div>
      <div class="bg-circle circle-2"></div>
      <div class="bg-circle circle-3"></div>
      <div class="bg-pulse"></div>
    </div>

    <div class="auth-card">
      <!-- Header Section -->
      <div class="auth-header">
        <div class="logo-container">
          <div class="logo-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
            </svg>
          </div>
          <div>
            <h1 class="logo-text">MediCare<span class="logo-highlight">Pro</span></h1>
            <p class="tagline">Advanced Medical Consultation Platform</p>
          </div>
        </div>
      </div>

      <!-- Toggle between Login and Signup -->
      <div class="auth-toggle">
        <div class="toggle-container">
          <button 
            :class="['toggle-btn', { active: isLoginMode }]" 
            @click="toggleMode(true)"
          >
            <svg v-if="isLoginMode" class="toggle-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z" clip-rule="evenodd" />
            </svg>
            Sign In
          </button>
          <button 
            :class="['toggle-btn', { active: !isLoginMode }]" 
            @click="toggleMode(false)"
          >
            <svg v-if="!isLoginMode" class="toggle-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clip-rule="evenodd" />
            </svg>
            Create Account
          </button>
          <div class="toggle-indicator" :class="{ 'right': !isLoginMode }"></div>
        </div>
      </div>

      <!-- Success/Error Messages -->
      <div v-if="message.text" :class="['message', message.type]">
        <div class="message-icon">
          <svg v-if="message.type === 'success'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="message-content">
          <strong>{{ message.type === 'success' ? 'Success!' : 'Error!' }}</strong>
          <p>{{ message.text }}</p>
        </div>
      </div>

      <!-- Login Form -->
      <form v-if="isLoginMode" @submit.prevent="handleLogin" class="auth-form">
        <div class="form-section">
          <h3 class="section-title">Welcome Back</h3>
          <p class="section-subtitle">Sign in to access your medical dashboard</p>
        </div>

        <div class="form-group">
          <label for="loginIdentifier">
            <span>Email or Phone Number</span>
            <span class="required">*</span>
          </label>
          <div class="input-container">
            <div class="input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>
            </div>
            <input
              id="loginIdentifier"
              v-model="loginData.identifier"
              type="text"
              placeholder="Enter email or phone number"
              required
              @input="validateIdentifier"
            />
            <div v-if="identifierType" class="input-badge">
              {{ identifierType === 'email' ? '📧' : '📱' }}
            </div>
          </div>
          <div v-if="identifierError" class="input-error">{{ identifierError }}</div>
        </div>

        <div class="form-group">
          <label for="loginPassword">
            <span>Password</span>
            <span class="required">*</span>
          </label>
          <div class="input-container">
            <div class="input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clip-rule="evenodd" />
              </svg>
            </div>
            <input
              id="loginPassword"
              v-model="loginData.password"
              :type="showLoginPassword ? 'text' : 'password'"
              placeholder="Enter your password"
              required
            />
            <button type="button" class="password-toggle" @click="showLoginPassword = !showLoginPassword">
              <svg v-if="showLoginPassword" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
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
          <div class="password-strength" v-if="loginData.password">
            <div class="strength-bar" :class="getPasswordStrength(loginData.password)"></div>
          </div>
        </div>

        <div class="form-options">
          <label class="checkbox-container">
            <input type="checkbox" v-model="loginData.rememberMe">
            <span class="checkmark"></span>
            Remember me
          </label>
          <a href="#" class="forgot-link" @click.prevent="showForgotPassword = true">
            Forgot Password?
          </a>
        </div>

        <button type="submit" :disabled="isLoading || !isValidLogin" class="submit-btn">
          <span v-if="isLoading" class="spinner"></span>
          <span v-else>Sign In to Dashboard</span>
          <svg v-if="!isLoading" class="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z" clip-rule="evenodd" />
          </svg>
        </button>

        <div class="divider">
          <span>or continue with</span>
        </div>

        
      </form>

      <!-- Signup Form -->
      <form v-else @submit.prevent="handleSignup" class="auth-form signup-form">
        <!-- Step 1: Basic Information -->
        <div v-if="signupStep === 1" class="form-step">
          <div class="form-section">
            <h3 class="section-title">Create Your Account</h3>
            <p class="section-subtitle">Step 1: Basic Information</p>
            <div class="step-indicator">
              <div class="step active">1</div>
              <div class="step">2</div>
              <div class="step">3</div>
            </div>
          </div>

          <!-- Profile Image Upload -->
          <div class="form-group">
            <label class="profile-label">Profile Image (Optional)</label>
            <div class="profile-upload" @click="triggerFileUpload">
              <div v-if="signupData.profileImage" class="profile-preview">
                <img :src="signupData.profileImage" alt="Profile Preview">
                <button type="button" class="remove-image" @click.stop="removeProfileImage">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
              <div v-else class="upload-placeholder">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
                </svg>
                <span>Click to upload profile image</span>
                <small>Max 2MB • JPG, PNG</small>
              </div>
            </div>
            <input 
              type="file" 
              ref="fileInput"
              accept="image/*"
              @change="handleImageUpload"
              class="hidden-input"
            />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="firstName">
                <span>First Name</span>
                <span class="required">*</span>
              </label>
              <div class="input-container">
                <div class="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <input
                  id="firstName"
                  v-model="signupData.firstName"
                  type="text"
                  placeholder="Enter first name"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label for="lastName">
                <span>Last Name</span>
                <span class="required">*</span>
              </label>
              <div class="input-container">
                <div class="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clip-rule="evenodd" />
                    <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
                  </svg>
                </div>
                <input
                  id="lastName"
                  v-model="signupData.lastName"
                  type="text"
                  placeholder="Enter last name"
                  required
                />
              </div>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="form-group">
            <label class="contact-label">
              <span>Contact Information</span>
              <span class="required">*</span>
              <span class="label-note">(Email or Phone required)</span>
            </label>
            
            <div class="contact-toggle">
              <button 
                type="button"
                :class="['contact-option', { active: signupData.useEmail }]"
                @click="signupData.useEmail = true"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
                Use Email
              </button>
              <button 
                type="button"
                :class="['contact-option', { active: !signupData.useEmail }]"
                @click="signupData.useEmail = false"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clip-rule="evenodd" />
                </svg>
                Use Phone
              </button>
            </div>

            <div v-if="signupData.useEmail" class="input-container">
              <div class="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
              </div>
              <input
                v-model="signupData.email"
                type="email"
                placeholder="Enter your email address"
                required
              />
            </div>
            <div v-else class="input-container">
              <div class="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clip-rule="evenodd" />
                </svg>
              </div>
              <input
                v-model="signupData.phone"
                type="tel"
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>

          <!-- Password -->
          <div class="form-row">
            <div class="form-group">
              <label for="signupPassword">
                <span>Password</span>
                <span class="required">*</span>
              </label>
              <div class="input-container">
                <div class="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clip-rule="evenodd" />
                  </svg>
                </div>
                <input
                  id="signupPassword"
                  v-model="signupData.password"
                  :type="showSignupPassword ? 'text' : 'password'"
                  placeholder="Create a strong password"
                  required
                  @input="validatePassword"
                />
                <button type="button" class="password-toggle" @click="showSignupPassword = !showSignupPassword">
                  <svg v-if="showSignupPassword" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
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
              <div v-if="passwordStrength" class="password-strength">
                <div class="strength-label">Strength: {{ passwordStrength }}</div>
                <div class="strength-bar" :class="passwordStrength.toLowerCase()"></div>
                <ul class="strength-requirements">
                  <li :class="{ met: /[A-Z]/.test(signupData.password) }">Uppercase letter</li>
                  <li :class="{ met: /[a-z]/.test(signupData.password) }">Lowercase letter</li>
                  <li :class="{ met: /\d/.test(signupData.password) }">Number</li>
                  <li :class="{ met: /[!@#$%^&*]/.test(signupData.password) }">Special character</li>
                  <li :class="{ met: signupData.password.length >= 8 }">8+ characters</li>
                </ul>
              </div>
            </div>

            <div class="form-group">
              <label for="confirmPassword">
                <span>Confirm Password</span>
                <span class="required">*</span>
              </label>
              <div class="input-container">
                <div class="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clip-rule="evenodd" />
                  </svg>
                </div>
                <input
                  id="confirmPassword"
                  v-model="signupData.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="Confirm your password"
                  required
                />
                <button type="button" class="password-toggle" @click="showConfirmPassword = !showConfirmPassword">
                  <svg v-if="showConfirmPassword" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
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
              <div v-if="signupData.confirmPassword && signupData.password !== signupData.confirmPassword" 
                   class="input-error">Passwords do not match</div>
            </div>
          </div>

          <!-- Role Selection -->
          <div class="form-group">
            <label class="role-label">I am registering as:</label>
            <div class="role-selection">
              <div 
                :class="['role-card', { selected: !signupData.isDoctor }]"
                @click="signupData.isDoctor = false"
              >
                <div class="role-icon patient">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                  </svg>
                </div>
                <div class="role-info">
                  <h3>Patient</h3>
                  <p>Book appointments, consult doctors, manage health records</p>
                </div>
                <div class="role-check">
                  <div class="check-circle" :class="{ checked: !signupData.isDoctor }"></div>
                </div>
              </div>
              
              <div 
                :class="['role-card', { selected: signupData.isDoctor }]"
                @click="signupData.isDoctor = true"
              >
                <div class="role-icon doctor">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0l-.34-.18-.003-.002a49.95 49.95 0 00-9.903-3.912.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
                    <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z" />
                    <path d="M4.462 19.462c.42-.419.753-.89.99-1.394.237-.504.377-1.038.417-1.58a.75.75 0 00-.709-.796c-.375-.026-.75.013-1.124.04a5.56 5.56 0 00-2.077.442.75.75 0 00-.564.78c.014.643.093 1.283.237 1.909.144.626.352 1.234.618 1.816.237.54.568 1.01.991 1.428a.75.75 0 001.06-1.06z" />
                  </svg>
                </div>
                <div class="role-info">
                  <h3>Doctor</h3>
                  <p>Provide consultations, manage patients, access medical tools</p>
                </div>
                <div class="role-check">
                  <div class="check-circle" :class="{ checked: signupData.isDoctor }"></div>
                </div>
              </div>
            </div>
          </div>

          <button type="button" @click="nextStep" class="submit-btn next-btn" :disabled="!isStep1Valid">
            Continue to Step 2
            <svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>

        <!-- Step 2: Role-specific Information -->
        <div v-else-if="signupStep === 2" class="form-step">
          <div class="form-section">
            <h3 class="section-title">{{ signupData.isDoctor ? 'Doctor Information' : 'Patient Information' }}</h3>
            <p class="section-subtitle">Step 2: {{ signupData.isDoctor ? 'Medical Details' : 'Health Profile' }}</p>
            <div class="step-indicator">
              <div class="step completed">1</div>
              <div class="step active">2</div>
              <div class="step">3</div>
            </div>
          </div>

          <!-- Patient Information -->
          <div v-if="!signupData.isDoctor" class="role-form">
            <div class="form-row">
              <div class="form-group">
                <label for="age">
                  <span>Age</span>
                  <span class="required">*</span>
                </label>
                <div class="input-container">
                  <div class="input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="age"
                    v-model="signupData.age"
                    type="number"
                    min="1"
                    max="120"
                    placeholder="Enter your age"
                    required
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="gender">
                  <span>Gender</span>
                  <span class="required">*</span>
                </label>
                <div class="input-container">
                  <div class="input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <select id="gender" v-model="signupData.gender" required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>

          </div>

          <!-- Doctor Information -->
          <div v-else class="role-form">
            <div class="form-group">
              <label for="medicalCode">
                <span>Medical License Number</span>
                <span class="required">*</span>
              </label>
              <div class="input-container">
                <div class="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
                  </svg>
                </div>
                <input
                  id="medicalCode"
                  v-model="signupData.medicalCode"
                  type="text"
                  placeholder="Enter your medical license number"
                  required
                />
              </div>
              <div class="input-hint">Format: State-License-Number (e.g., CA-123456)</div>
            </div>

            <div class="form-group">
              <label for="contactInfo">
                <span>Contact Information</span>
                <span class="required">*</span>
              </label>
              <div class="input-container">
                <div class="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clip-rule="evenodd" />
                  </svg>
                </div>
                <input
                  id="contactInfo"
                  v-model="signupData.contactInfo"
                  type="text"
                  placeholder="Clinic phone or direct line"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label for="categories">
                <span>Medical Specialties</span>
                <span class="required">*</span>
                <span class="label-note">(Select at least one)</span>
              </label>
              <div class="categories-container">
                <div 
                  v-for="category in medicalCategories" 
                  :key="category.id"
                  :class="['category-tag', { selected: signupData.categories.includes(category.id) }]"
                  @click="toggleCategory(category.id)"
                >
                  {{ category.name }}
                </div>
              </div>
              <div v-if="signupData.categories.length > 0" class="selected-categories">
                <strong>Selected:</strong> {{ selectedCategoriesText }}
              </div>
            </div>

            <div class="form-group">
              <label for="yearsOfExperience">
                <span>Years of Experience</span>
              </label>
              <div class="input-container">
                <div class="input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd" />
                  </svg>
                </div>
                <input
                  id="yearsOfExperience"
                  v-model="signupData.yearsOfExperience"
                  type="number"
                  min="0"
                  max="60"
                  placeholder="Years of medical practice"
                />
              </div>
            </div>
          </div>

          <div class="step-navigation">
            <button type="button" @click="prevStep" class="back-btn">
              <svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clip-rule="evenodd" />
              </svg>
              Back
            </button>
            <button type="button" @click="nextStep" class="submit-btn next-btn" :disabled="!isStep2Valid">
              Continue to Step 3
              <svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Step 3: Terms & Confirmation -->
        <div v-else class="form-step">
          <div class="form-section">
            <h3 class="section-title">Terms & Confirmation</h3>
            <p class="section-subtitle">Step 3: Review and agree to terms</p>
            <div class="step-indicator">
              <div class="step completed">1</div>
              <div class="step completed">2</div>
              <div class="step active">3</div>
            </div>
          </div>

          <div class="review-section">
            <h4>Review Your Information</h4>
            <div class="review-card">
              <div class="review-row">
                <span>Name:</span>
                <strong>{{ signupData.firstName }} {{ signupData.lastName }}</strong>
              </div>
              <div class="review-row">
                <span>Contact:</span>
                <strong>{{ signupData.useEmail ? signupData.email : signupData.phone }}</strong>
              </div>
              <div class="review-row">
                <span>Account Type:</span>
                <strong :class="signupData.isDoctor ? 'doctor' : 'patient'">
                  {{ signupData.isDoctor ? 'Doctor' : 'Patient' }}
                </strong>
              </div>
              <div v-if="!signupData.isDoctor" class="review-row">
                <span>Age & Gender:</span>
                <strong>{{ signupData.age }}, {{ signupData.gender }}</strong>
              </div>
              <div v-else class="review-row">
                <span>Medical License:</span>
                <strong>{{ signupData.medicalCode }}</strong>
              </div>
              <div v-if="signupData.isDoctor && signupData.categories.length > 0" class="review-row">
                <span>Specialties:</span>
                <strong>{{ selectedCategoriesText }}</strong>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label class="checkbox-container terms-checkbox">
              <input type="checkbox" v-model="signupData.agreeTerms" required>
              <span class="checkmark"></span>
              I agree to the <a href="#" @click.prevent="showTerms = true">Terms of Service</a> and 
              <a href="#" @click.prevent="showPrivacy = true">Privacy Policy</a>
            </label>
          </div>

          

          <div class="step-navigation">
            <button type="button" @click="prevStep" class="back-btn">
              <svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clip-rule="evenodd" />
              </svg>
              Back
            </button>
            <button type="submit" :disabled="isLoading || !signupData.agreeTerms" class="submit-btn create-btn">
              <span v-if="isLoading" class="spinner"></span>
              <span v-else>Create Account</span>
              <svg v-if="!isLoading" class="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <div class="auth-footer">
          <p>Already have an account? <a href="#" @click.prevent="toggleMode(true)">Sign In</a></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EnhancedLoginPage',
  data() {
    return {
      isLoginMode: true,
      isLoading: false,
      signupStep: 1,
      showForgotPassword: false,
      showLoginPassword: false,
      showSignupPassword: false,
      showConfirmPassword: false,
      showTerms: false,
      showPrivacy: false,
      identifierType: null,
      identifierError: '',
      passwordStrength: '',
      
      loginData: {
        identifier: '',
        password: '',
        rememberMe: false
      },
      
      signupData: {
        profileImage: null,
        firstName: '',
        lastName: '',
        useEmail: true,
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        isDoctor: false,
        age: '',
        gender: '',
        medicalCode: '',
        contactInfo: '',
        categories: [],
        yearsOfExperience: '',
        agreeTerms: false,
        receiveUpdates: true
      },
      
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
      
      message: {
        text: '',
        type: ''
      },
      
      // Store API URLs
      apiBaseUrl: 'http://localhost:8000',
      accessToken: null,
      userRole: null
    }
  },
  
  computed: {
    isValidLogin() {
      return this.loginData.identifier && this.loginData.password && !this.identifierError
    },
    
    isStep1Valid() {
      return this.signupData.firstName && 
             this.signupData.lastName && 
             (this.signupData.useEmail ? this.signupData.email : this.signupData.phone) &&
             this.signupData.password &&
             this.signupData.confirmPassword &&
             this.signupData.password === this.signupData.confirmPassword
    },
    
    isStep2Valid() {
      if (!this.signupData.isDoctor) {
        return this.signupData.age && this.signupData.gender
      } else {
        return this.signupData.medicalCode && 
               this.signupData.contactInfo && 
               this.signupData.categories.length > 0
      }
    },
    
    selectedCategoriesText() {
      return this.signupData.categories
        .map(id => this.medicalCategories.find(c => c.id === id)?.name)
        .join(', ')
    }
  },
  
  methods: {
    toggleMode(isLogin) {
      this.isLoginMode = isLogin
      this.signupStep = 1
      this.message.text = ''
      this.resetSignupData()
    },
    
    resetSignupData() {
      this.signupData = {
        profileImage: null,
        firstName: '',
        lastName: '',
        useEmail: true,
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        isDoctor: false,
        age: '',
        gender: '',
        medicalCode: '',
        contactInfo: '',
        categories: [],
        yearsOfExperience: '',
        agreeTerms: false,
        receiveUpdates: true
      }
    },
    
    validateIdentifier() {
      const identifier = this.loginData.identifier.trim()
      
      // Check if it's an email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      // Check if it's a phone number
      const phoneRegex = /^[+]?[0-9\s\-()]{3,}$/
      
      if (emailRegex.test(identifier)) {
        this.identifierType = 'email'
        this.identifierError = ''
      } else if (phoneRegex.test(identifier)) {
        this.identifierType = 'phone'
        this.identifierError = ''
      } else if (identifier) {
        this.identifierType = null
        this.identifierError = 'Please enter a valid email or phone number'
      } else {
        this.identifierType = null
        this.identifierError = ''
      }
    },
    
    validatePassword() {
      const password = this.signupData.password
      let strength = 0
      
      if (password.length >= 8) strength++
      if (/[A-Z]/.test(password)) strength++
      if (/[a-z]/.test(password)) strength++
      if (/\d/.test(password)) strength++
      if (/[!@#$%^&*]/.test(password)) strength++
      
      switch (strength) {
        case 0:
        case 1:
          this.passwordStrength = 'Weak'
          break
        case 2:
        case 3:
          this.passwordStrength = 'Medium'
          break
        case 4:
          this.passwordStrength = 'Strong'
          break
        case 5:
          this.passwordStrength = 'Very Strong'
          break
        default:
          this.passwordStrength = ''
      }
    },
    
    getPasswordStrength(password) {
      const strength = this.calculatePasswordStrength(password)
      return strength.toLowerCase().replace(' ', '-')
    },
    
    calculatePasswordStrength(password) {
      if (!password) return ''
      let strength = 0
      if (password.length >= 8) strength++
      if (/[A-Z]/.test(password)) strength++
      if (/[a-z]/.test(password)) strength++
      if (/\d/.test(password)) strength++
      if (/[!@#$%^&*]/.test(password)) strength++
      
      switch (strength) {
        case 0:
        case 1: return 'weak'
        case 2:
        case 3: return 'medium'
        case 4: return 'strong'
        case 5: return 'very-strong'
        default: return ''
      }
    },
    
    triggerFileUpload() {
      this.$refs.fileInput.click()
    },
    
    handleImageUpload(event) {
      const file = event.target.files[0]
      if (!file) return
      
      if (file.size > 2 * 1024 * 1024) {
        this.showMessage('Image size should be less than 2MB', 'error')
        return
      }
      
      const validTypes = ['image/jpeg', 'image/png', 'image/gif']
      if (!validTypes.includes(file.type)) {
        this.showMessage('Please upload a valid image (JPEG, PNG, GIF)', 'error')
        return
      }
      
      const reader = new FileReader()
      reader.onload = (e) => {
        this.signupData.profileImage = e.target.result
      }
      reader.readAsDataURL(file)
    },
    
    removeProfileImage() {
      this.signupData.profileImage = null
      this.$refs.fileInput.value = ''
    },
    
    toggleCategory(categoryId) {
      const index = this.signupData.categories.indexOf(categoryId)
      if (index === -1) {
        this.signupData.categories.push(categoryId)
      } else {
        this.signupData.categories.splice(index, 1)
      }
    },
    
    nextStep() {
      if (this.signupStep === 1 && !this.isStep1Valid) {
        this.showMessage('Please fill in all required fields', 'error')
        return
      }
      if (this.signupStep === 2 && !this.isStep2Valid) {
        this.showMessage('Please fill in all required fields', 'error')
        return
      }
      this.signupStep++
    },
    
    prevStep() {
      if (this.signupStep > 1) {
        this.signupStep--
      }
    },
    
    async handleLogin() {
      if (!this.isValidLogin) {
        this.showMessage('Please fill in all fields correctly', 'error')
        return
      }
      
      this.isLoading = true
      this.message.text = ''
      
      try {
        // API call for login
        let body = '';
        if (this.loginData.identifier.includes('@')) {
          body = {
            email: this.loginData.identifier, // Based on your API, it seems to expect phone_number
            password: this.loginData.password,
          }
        } else {
          body = {
            phone_number: this.loginData.identifier, // Based on your API, it seems to expect phone_number
            password: this.loginData.password,
          }
        }
        const response = await fetch(`${this.apiBaseUrl}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body)
        })
        
        const data = await response.json()
        
        if (response.ok) {
          this.showMessage('Login successful! Redirecting...', 'success')
          
          // Store authentication data
          this.accessToken = data.accessToken
          this.userRole = data.role
          
          localStorage.setItem('authToken', data.accessToken)
          localStorage.setItem('userData', JSON.stringify(data.user))
          localStorage.setItem('userId',data.id)
          
          // Redirect based on role
          setTimeout(() => {
            if (data.user.role === 'doctor') {
              this.$router.push('/mypannel')
            } else if (data.user.role === 'patient') {
              this.$router.push('/doctors')
            } else {
              // Default redirect if role not specified
              this.$router.push('/dashboard')
            }
          }, 1500)
        } else {
          this.showMessage(data.message || 'Invalid credentials. Please try again.', 'error')
        }
      } catch (error) {
        console.error('Login error:', error)
        this.showMessage('Network error. Please check your connection.', 'error')
      } finally {
        this.isLoading = false
      }
    },
    
    async handleSignup() {
      if (!this.signupData.agreeTerms) {
        this.showMessage('Please agree to the terms and conditions', 'error')
        return
      }
      
      this.isLoading = true
      this.message.text = ''
      
      try {
        // Step 1: Register user
        const signupPayload = {
          first_name: this.signupData.firstName,
          last_name: this.signupData.lastName,
          phone: this.signupData.useEmail ? '' : this.signupData.phone,
          email: this.signupData.useEmail ? this.signupData.email : '',
          role: this.signupData.isDoctor ? 'doctor' : 'patient',
          password: this.signupData.password
        }
        
        console.log('Registering user with:', signupPayload)
        
        const registerResponse = await fetch(`${this.apiBaseUrl}/auth/register/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(signupPayload)
        })
        
        const registerData = await registerResponse.json()
        
        if (!registerResponse.ok) {
          throw new Error(registerData.message || 'Registration failed')
        }
        
        console.log('Registration successful:', registerData)
        
        // Store the access token for the next API call
        this.accessToken = registerData.accessToken
        this.userRole = registerData.user.role
        
        // Step 2: Complete profile based on role
        if (this.signupData.isDoctor) {
          // Complete doctor profile
          const doctorProfilePayload = {
            medicalCode: this.signupData.medicalCode,
            contactInfo: this.signupData.contactInfo,
            category: this.signupData.categories[0]
            // Note: Your API example shows "contactInfo" but might need adjustment
          }
          
          console.log('Completing doctor profile with:', doctorProfilePayload)
          
          const doctorProfileResponse = await fetch(`${this.apiBaseUrl}/doctors/profile`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.accessToken}`
            },
            body: JSON.stringify(doctorProfilePayload)
          })
          
          if (!doctorProfileResponse.ok) {
            const errorData = await doctorProfileResponse.json()
            throw new Error(`Doctor profile creation failed: ${errorData.message || 'Unknown error'}`)
          }
          
          console.log('Doctor profile completed successfully')
        } else {
          // Complete patient profile
          const patientProfilePayload = {
            age: parseInt(this.signupData.age),
            gender: this.signupData.gender
          }
          
          console.log('Completing patient profile with:', patientProfilePayload)
          
          const patientProfileResponse = await fetch(`${this.apiBaseUrl}/patients/profile`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.accessToken}`
            },
            body: JSON.stringify(patientProfilePayload)
          })
          
          if (!patientProfileResponse.ok) {
            const errorData = await patientProfileResponse.json()
            throw new Error(`Patient profile creation failed: ${errorData.message || 'Unknown error'}`)
          }
          const data = await patientProfileResponse.json()
          localStorage.setItem('userId',data.id)
          console.log('Patient profile completed successfully')
        }
        
        // Store auth data in localStorage
        localStorage.setItem('authToken', this.accessToken)
        localStorage.setItem('userData', JSON.stringify(registerData.user))
        
        this.showMessage('Account created successfully! You are now logged in.', 'success')
        
        // Auto-login and redirect
        setTimeout(() => {
          if (this.signupData.isDoctor) {
            this.$router.push('/mypannel')
          } else {
            this.$router.push('/doctors')
          }
        }, 2000)
        
      } catch (error) {
        console.error('Signup error:', error)
        this.showMessage(error.message || 'Signup failed. Please try again.', 'error')
      } finally {
        this.isLoading = false
      }
    },
    
    socialLogin(provider) {
      this.showMessage(`Redirecting to ${provider} login...`, 'success')
      // In a real app, you would redirect to OAuth endpoint
    },
    
    showMessage(text, type) {
      this.message.text = text
      this.message.type = type
      
      // Clear message after 5 seconds
      setTimeout(() => {
        this.message.text = ''
      }, 5000)
    }
  }
}
</script>

<style scoped>
/* Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.auth-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  position: relative;
  overflow: hidden;
}

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

/* Auth Card */
.auth-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  width: 100%;
  max-width: 800px;
  margin: 20px;
  overflow: hidden;
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;
}

.auth-card:hover {
  transform: translateY(-5px);
}

/* Header */
.auth-header {
  padding: 40px 40px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 20px;
}

.logo-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.logo-icon svg {
  width: 32px;
  height: 32px;
}

.logo-text {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.5px;
  margin-bottom: 5px;
}

.logo-highlight {
  color: #ffd700;
}

.tagline {
  font-size: 14px;
  opacity: 0.9;
  font-weight: 500;
}

/* Toggle */
.auth-toggle {
  padding: 0 40px;
  margin: 20px 0;
}

.toggle-container {
  display: flex;
  background: #f7f9fc;
  border-radius: 12px;
  padding: 4px;
  position: relative;
}

.toggle-btn {
  flex: 1;
  padding: 16px 24px;
  border: none;
  background: transparent;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #6c757d;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  z-index: 1;
}

.toggle-icon {
  width: 20px;
  height: 20px;
}

.toggle-btn.active {
  color: #667eea;
}

.toggle-indicator {
  position: absolute;
  top: 4px;
  left: 4px;
  width: calc(50% - 4px);
  height: calc(100% - 8px);
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
  transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.toggle-indicator.right {
  transform: translateX(100%);
}

/* Messages */
.message {
  margin: 0 40px 20px;
  padding: 16px 20px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message.success {
  background: #e8f5e9;
  border: 1px solid #a5d6a7;
  color: #2e7d32;
}

.message.error {
  background: #ffebee;
  border: 1px solid #ef9a9a;
  color: #c62828;
}

.message-icon svg {
  width: 24px;
  height: 24px;
}

.message-content {
  flex: 1;
}

.message-content strong {
  display: block;
  font-size: 14px;
  margin-bottom: 2px;
}

.message-content p {
  font-size: 13px;
  opacity: 0.9;
}

/* Forms */
.auth-form {
  padding: 0 40px 40px;
}

.signup-form {
  padding-bottom: 30px;
}

.form-section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 8px;
}

.section-subtitle {
  font-size: 14px;
  color: #718096;
  margin-bottom: 20px;
}

.step-indicator {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.step {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #718096;
  font-size: 14px;
  transition: all 0.3s ease;
}

.step.active {
  background: #667eea;
  color: white;
  transform: scale(1.1);
}

.step.completed {
  background: #48bb78;
  color: white;
}

/* Form Groups */
.form-group {
  margin-bottom: 24px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #4a5568;
  font-size: 14px;
}

.required {
  color: #e53e3e;
  margin-left: 2px;
}

.label-note {
  font-weight: normal;
  color: #718096;
  font-size: 12px;
  margin-left: 6px;
}

/* Input Containers */
.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 16px;
  color: #a0aec0;
  pointer-events: none;
}

.input-icon svg {
  width: 20px;
  height: 20px;
}

.input-badge {
  position: absolute;
  right: 16px;
  background: #edf2f7;
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 12px;
  color: #4a5568;
}

input, select, textarea {
  width: 100%;
  padding: 16px 16px 16px 48px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 15px;
  font-family: inherit;
  background: white;
  transition: all 0.3s ease;
  color: #2d3748;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  background: #fafbff;
}

input::placeholder, textarea::placeholder {
  color: #a0aec0;
}

select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234a5568'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 20px;
  padding-right: 48px;
}

textarea {
  min-height: 100px;
  resize: vertical;
  padding: 16px;
  font-family: inherit;
}

.char-count {
  text-align: right;
  font-size: 12px;
  color: #718096;
  margin-top: 4px;
}

.input-error {
  color: #e53e3e;
  font-size: 12px;
  margin-top: 4px;
}

.input-hint {
  font-size: 12px;
  color: #718096;
  margin-top: 4px;
  font-style: italic;
}

/* Password Toggle */
.password-toggle {
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  color: #a0aec0;
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s ease;
}

.password-toggle:hover {
  color: #667eea;
}

.password-toggle svg {
  width: 20px;
  height: 20px;
}

/* Password Strength */
.password-strength {
  margin-top: 12px;
}

.strength-label {
  font-size: 12px;
  color: #4a5568;
  margin-bottom: 6px;
  font-weight: 600;
}

.strength-bar {
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 8px;
  position: relative;
}

.strength-bar::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0;
  transition: width 0.3s ease, background-color 0.3s ease;
}

.strength-bar.weak::after {
  width: 25%;
  background: #e53e3e;
}

.strength-bar.medium::after {
  width: 50%;
  background: #d69e2e;
}

.strength-bar.strong::after {
  width: 75%;
  background: #38a169;
}

.strength-bar.very-strong::after {
  width: 100%;
  background: #2f855a;
}

.strength-requirements {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 6px;
  font-size: 11px;
}

.strength-requirements li {
  color: #718096;
  padding-left: 16px;
  position: relative;
}

.strength-requirements li::before {
  content: '○';
  position: absolute;
  left: 0;
  color: #cbd5e0;
}

.strength-requirements li.met {
  color: #38a169;
}

.strength-requirements li.met::before {
  content: '✓';
  color: #38a169;
}

/* Contact Toggle */
.contact-toggle {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}

.contact-option {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  color: #4a5568;
}

.contact-option svg {
  width: 18px;
  height: 18px;
}

.contact-option:hover {
  border-color: #cbd5e0;
}

.contact-option.active {
  border-color: #667eea;
  background: #f7f9fc;
  color: #667eea;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1);
}

/* Profile Upload */
.profile-upload {
  width: 120px;
  height: 120px;
  border: 2px dashed #cbd5e0;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
}

.profile-upload:hover {
  border-color: #667eea;
  background: #f7f9fc;
}

.upload-placeholder {
  text-align: center;
  color: #718096;
}

.upload-placeholder svg {
  width: 32px;
  height: 32px;
  margin-bottom: 8px;
  color: #a0aec0;
}

.upload-placeholder span {
  display: block;
  font-size: 12px;
  margin-bottom: 4px;
}

.upload-placeholder small {
  font-size: 10px;
  opacity: 0.7;
}

.profile-preview {
  position: relative;
  width: 100%;
  height: 100%;
}

.profile-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-image {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;
}

.remove-image:hover {
  background: rgba(0, 0, 0, 0.9);
}

.remove-image svg {
  width: 12px;
  height: 12px;
  color: white;
}

.hidden-input {
  display: none;
}

/* Role Selection */
.role-selection {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 8px;
}

@media (max-width: 768px) {
  .role-selection {
    grid-template-columns: 1fr;
  }
}

.role-card {
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.role-card:hover {
  border-color: #cbd5e0;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.role-card.selected {
  border-color: #667eea;
  background: linear-gradient(135deg, #f7f9fc 0%, #ffffff 100%);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
}

.role-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.role-icon svg {
  width: 28px;
  height: 28px;
}

.role-icon.patient {
  background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
  color: white;
}

.role-icon.doctor {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.role-info {
  flex: 1;
}

.role-info h3 {
  font-size: 18px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 4px;
}

.role-info p {
  font-size: 12px;
  color: #718096;
  line-height: 1.4;
}

.role-check {
  position: absolute;
  top: 16px;
  right: 16px;
}

.check-circle {
  width: 24px;
  height: 24px;
  border: 2px solid #e2e8f0;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.check-circle.checked {
  background: #48bb78;
  border-color: #48bb78;
  position: relative;
}

.check-circle.checked::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
  font-weight: bold;
}

/* Categories */
.categories-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 8px;
}

.category-tag {
  padding: 8px 16px;
  background: #edf2f7;
  border: 2px solid #e2e8f0;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s ease;
}

.category-tag:hover {
  background: #e2e8f0;
  transform: translateY(-1px);
}

.category-tag.selected {
  background: #667eea;
  border-color: #667eea;
  color: white;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.selected-categories {
  margin-top: 12px;
  padding: 12px;
  background: #f7f9fc;
  border-radius: 8px;
  font-size: 13px;
  color: #4a5568;
}

.selected-categories strong {
  color: #2d3748;
}

/* Review Section */
.review-section {
  margin-bottom: 30px;
}

.review-section h4 {
  font-size: 18px;
  color: #2d3748;
  margin-bottom: 16px;
}

.review-card {
  background: #f7f9fc;
  border-radius: 16px;
  padding: 24px;
}

.review-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #e2e8f0;
}

.review-row:last-child {
  border-bottom: none;
}

.review-row span {
  color: #718096;
  font-size: 14px;
}

.review-row strong {
  color: #2d3748;
  font-size: 14px;
}

.review-row strong.doctor {
  color: #667eea;
}

.review-row strong.patient {
  color: #4299e1;
}

/* Checkboxes */
.checkbox-container {
  display: block;
  position: relative;
  padding-left: 32px;
  cursor: pointer;
  font-size: 14px;
  color: #4a5568;
  user-select: none;
  line-height: 1.4;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background: white;
  border: 2px solid #cbd5e0;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.checkbox-container:hover input ~ .checkmark {
  border-color: #a0aec0;
}

.checkbox-container input:checked ~ .checkmark {
  background: #667eea;
  border-color: #667eea;
}

.checkmark::after {
  content: '';
  position: absolute;
  display: none;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-container input:checked ~ .checkmark::after {
  display: block;
}

.terms-checkbox a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}

.terms-checkbox a:hover {
  text-decoration: underline;
}

/* Form Options */
.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
}

.forgot-link {
  color: #667eea;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s ease;
}

.forgot-link:hover {
  color: #5a67d8;
  text-decoration: underline;
}

/* Submit Buttons */
.submit-btn {
  width: 100%;
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
  margin-top: 10px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-icon {
  width: 20px;
  height: 20px;
}

.next-btn, .create-btn {
  margin-top: 30px;
}

/* Step Navigation */
.step-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  gap: 16px;
}

.back-btn {
  padding: 16px 24px;
  background: #f7f9fc;
  color: #4a5568;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  flex: 1;
}

.back-btn:hover {
  background: #edf2f7;
  border-color: #cbd5e0;
  transform: translateY(-1px);
}

/* Divider */
.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 30px 0;
  color: #a0aec0;
  font-size: 14px;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #e2e8f0;
}

.divider span {
  padding: 0 16px;
}

/* Social Login */
.social-login {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.social-btn {
  padding: 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.3s ease;
  color: #4a5568;
}

.social-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.social-btn svg {
  width: 20px;
  height: 20px;
}

.social-btn.google:hover {
  border-color: #4285f4;
  color: #4285f4;
}

.social-btn.microsoft:hover {
  border-color: #737373;
  color: #737373;
}

/* Auth Footer */
.auth-footer {
  text-align: center;
  padding: 20px 40px;
  border-top: 1px solid #e2e8f0;
  color: #718096;
  font-size: 14px;
}

.auth-footer a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.auth-footer a:hover {
  color: #5a67d8;
  text-decoration: underline;
}

/* Spinner */
.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .auth-header,
  .auth-toggle,
  .auth-form,
  .auth-footer {
    padding-left: 24px;
    padding-right: 24px;
  }
  
  .auth-header {
    padding-top: 30px;
    padding-bottom: 20px;
  }
  
  .logo-container {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }
  
  .logo-text {
    font-size: 28px;
  }
  
  .social-login {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .auth-card {
    margin: 10px;
    border-radius: 16px;
  }
  
  .section-title {
    font-size: 20px;
  }
  
  .toggle-btn {
    padding: 14px 16px;
    font-size: 14px;
  }
  
  .submit-btn,
  .back-btn {
    padding: 16px;
  }
}
</style>