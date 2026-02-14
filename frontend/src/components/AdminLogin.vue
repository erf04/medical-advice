<template>
  <div class="admin-login-container">
    <!-- Animated Background -->
    <div class="animated-bg">
      <div class="bg-circle circle-1"></div>
      <div class="bg-circle circle-2"></div>
      <div class="bg-circle circle-3"></div>
      <div class="bg-pulse"></div>
    </div>

    <div class="login-card">
      <!-- Header Section -->
      <div class="login-header">
        <div class="logo-container">
          <div class="logo-icon admin">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
            </svg>
          </div>
          <div>
            <h1 class="logo-text">MediCare<span class="logo-highlight">Admin</span></h1>
            <p class="tagline">Healthcare Administration Portal</p>
          </div>
        </div>
        <div class="admin-badge">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clip-rule="evenodd" />
          </svg>
          <span>Secure Admin Access</span>
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
      <form @submit.prevent="handleAdminLogin" class="login-form">
        <div class="form-section">
          <h3 class="section-title">Administrator Login</h3>
          <p class="section-subtitle">Enter your credentials to access the admin panel</p>
        </div>

        <div class="form-group">
          <label for="adminIdentifier">
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
              id="adminIdentifier"
              v-model="loginData.identifier"
              type="text"
              placeholder="Enter admin email or phone"
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
          <label for="adminPassword">
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
              id="adminPassword"
              v-model="loginData.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter your admin password"
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

        <button type="submit" :disabled="isLoading || !isValidLogin" class="submit-btn admin-btn">
          <span v-if="isLoading" class="spinner"></span>
          <span v-else>Access Admin Panel</span>
          <svg v-if="!isLoading" class="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z" clip-rule="evenodd" />
          </svg>
        </button>

        <div class="security-notice">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clip-rule="evenodd" />
          </svg>
          <p>This is a secure area. Unauthorized access is prohibited.</p>
        </div>
      </form>

      <div class="login-footer">
        <p>© 2026 MediCarePro. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminLogin',
  
  data() {
    return {
      isLoading: false,
      showPassword: false,
      showForgotPassword: false,
      identifierType: null,
      identifierError: '',
      
      loginData: {
        identifier: '',
        password: '',
        rememberMe: false
      },
      
      message: {
        text: '',
        type: ''
      },
      
      apiBaseUrl: 'http://localhost:8000'
    }
  },
  
  computed: {
    isValidLogin() {
      return this.loginData.identifier && this.loginData.password && !this.identifierError
    }
  },
  
  methods: {
    validateIdentifier() {
      const identifier = this.loginData.identifier.trim()
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const phoneRegex = /^[+]?[0-9\s\-()]{3,}$/
      
      if (emailRegex.test(identifier)) {
        this.identifierType = 'email'
        this.identifierError = ''
      } else if (phoneRegex.test(identifier.replace(/[\s\-()]/g, ''))) {
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
    
    async handleAdminLogin() {
      if (!this.isValidLogin) {
        this.showMessage('Please fill in all fields correctly', 'error')
        return
      }
      
      this.isLoading = true
      this.message.text = ''
      
      try {
        // Prepare login payload
        const loginPayload = {
          phone_number: this.loginData.identifier,
          password: this.loginData.password
        }
        
        // If identifier is email, you might need to adjust based on your API
        // Some APIs accept both, but yours seems to expect phone_number
        // If your API accepts email in phone_number field, it's fine
        
        const response = await fetch(`${this.apiBaseUrl}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginPayload)
        })
        
        const data = await response.json()
        
        if (response.ok) {
          // Check if user is admin
          // Based on your response structure, role is in user.role
          if (data.user && data.user.role === 'admin') {
            this.showMessage('Login successful! Redirecting to admin panel...', 'success')
            
            // Store authentication data
            localStorage.setItem('authToken', data.accessToken)
            localStorage.setItem('userData', JSON.stringify(data.user))
            localStorage.setItem('isAdmin', 'true')
            
            // If remember me is checked, you might want to extend session duration
            // This would typically be handled by the backend with token expiration
            
            setTimeout(() => {
              this.$router.push('/dashboard')
            }, 1500)
          } else {
            // User exists but is not an admin
            this.showMessage('Access denied. This portal is for administrators only.', 'error')
          }
        } else {
          // Handle error responses
          const errorMessage = data.message || data.error || 'Invalid credentials. Please try again.'
          this.showMessage(errorMessage, 'error')
        }
      } catch (error) {
        console.error('Login error:', error)
        this.showMessage('Network error. Please check your connection and try again.', 'error')
      } finally {
        this.isLoading = false
      }
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
.admin-login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1a1f35 0%, #2d3748 100%);
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

.login-card {
  background: rgba(26, 32, 44, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 500px;
  margin: 20px;
  overflow: hidden;
  position: relative;
  z-index: 1;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.login-header {
  padding: 40px 40px 20px;
  background: linear-gradient(135deg, #1a1f35 0%, #2d3748 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo-icon.admin {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #4299e1 0%, #2b6cb0 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 16px rgba(66, 153, 225, 0.3);
}

.logo-icon.admin svg {
  width: 32px;
  height: 32px;
  color: white;
}

.logo-text {
  font-size: 28px;
  font-weight: 800;
  color: white;
  margin-bottom: 4px;
}

.logo-highlight {
  background: linear-gradient(135deg, #667eea 0%, #4299e1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-left: 4px;
}

.tagline {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
}

.admin-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-size: 13px;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.admin-badge svg {
  width: 18px;
  height: 18px;
  color: #4299e1;
}

.login-form {
  padding: 40px;
}

.form-section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
}

.section-subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0;
}

.form-group {
  margin-bottom: 24px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
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
  color: rgba(255, 255, 255, 0.5);
  pointer-events: none;
}

.input-icon svg {
  width: 20px;
  height: 20px;
}

.input-badge {
  position: absolute;
  right: 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
}

input {
  width: 100%;
  padding: 16px 16px 16px 48px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-size: 15px;
  font-family: inherit;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  color: white;
}

input:focus {
  outline: none;
  border-color: #4299e1;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
}

input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.input-error {
  color: #fc8181;
  font-size: 12px;
  margin-top: 6px;
}

.password-toggle {
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s ease;
}

.password-toggle:hover {
  color: #4299e1;
}

.password-toggle svg {
  width: 20px;
  height: 20px;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 0;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}

.checkbox-container input {
  display: none;
}

.checkmark {
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  position: relative;
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

.forgot-link {
  color: #4299e1;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s ease;
}

.forgot-link:hover {
  color: #63b3ed;
  text-decoration: underline;
}

.submit-btn.admin-btn {
  width: 100%;
  padding: 18px 24px;
  background: linear-gradient(135deg, #4299e1 0%, #2b6cb0 100%);
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

.submit-btn.admin-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(66, 153, 225, 0.4);
}

.submit-btn.admin-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-icon {
  width: 20px;
  height: 20px;
}

.security-notice {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
  padding: 16px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.security-notice svg {
  width: 24px;
  height: 24px;
  color: #4299e1;
  flex-shrink: 0;
}

.security-notice p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
  margin: 0;
  line-height: 1.4;
}

.message {
  margin: 0 40px 20px;
  padding: 16px 20px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  animation: slideIn 0.3s ease;
}

.message.success {
  background: rgba(72, 187, 120, 0.1);
  border: 1px solid #48bb78;
  color: #9ae6b4;
}

.message.error {
  background: rgba(252, 129, 129, 0.1);
  border: 1px solid #fc8181;
  color: #fed7d7;
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

.login-footer {
  padding: 24px 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 13px;
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

@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
</style>