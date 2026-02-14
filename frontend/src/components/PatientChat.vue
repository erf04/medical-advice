<template>
  <div class="chat-container">
    <!-- Animated Background -->
    <div class="animated-bg">
      <div class="bg-circle circle-1"></div>
      <div class="bg-circle circle-2"></div>
      <div class="bg-circle circle-3"></div>
      <div class="bg-pulse"></div>
    </div>

    <!-- Header -->
    <header class="chat-header">
      <div class="header-content">
        <div class="back-btn" @click="goBack">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clip-rule="evenodd" />
          </svg>
        </div>
        
        <div class="doctor-info" @click="showDoctorProfile">
          <div class="doctor-avatar">
            <img :src="consultation?.doctor?.user?.profileImage || defaultDoctorImage" :alt="consultation?.doctor?.user?.firstName">
            <div class="online-status" :class="{ online: isDoctorOnline }"></div>
          </div>
          <div class="doctor-details">
            <h3 class="doctor-name">Dr. {{ consultation?.doctor?.user?.firstName }} {{ consultation?.doctor?.user?.lastName }}</h3>
            <p class="consultation-status">{{ getConsultationStatusText }}</p>
          </div>
        </div>

        <div class="header-actions">
          <!-- Rating Button - Visible for FINISHED consultations that are not rated yet -->
          <button 
            v-if="consultation?.status === 'FINISHED' && !consultation?.rated" 
            class="header-action rating-btn" 
            @click="openRatingModal"
            title="Rate this consultation"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
            </svg>
          </button>
          
          <!-- Info Button -->
          <button class="header-action" @click="showConsultationInfo = !showConsultationInfo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Consultation Info Dropdown -->
      <div v-if="showConsultationInfo" class="consultation-info-dropdown">
        <div class="info-item">
          <span class="info-label">Subject:</span>
          <span class="info-value">{{ consultation?.subject }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Date:</span>
          <span class="info-value">{{ formatJalaliDate(consultation?.reservedDate) }} ({{ consultation?.startTime }} - {{ consultation?.endTime }})</span>
        </div>
        <div class="info-item">
          <span class="info-label">Status:</span>
          <span class="info-value" :class="getStatusClass">{{ consultation?.status }}</span>
        </div>
        <div v-if="consultation?.status === 'ACTIVE'" class="info-item warning">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
          </svg>
          <span>Consultation ends at {{ consultation?.endTime }}. After that, you have 1 week to chat. If no reply within 72 hours, doctor can cancel and you won't get refunded.</span>
        </div>
        <div v-else-if="consultation?.status === 'FINISHED' && isWithinOneWeek" class="info-item warning">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
          </svg>
          <span>Read-only mode. Consultation ended. You have {{ daysRemaining }} days left to view messages.</span>
        </div>
      </div>
    </header>

    <!-- Main Chat Area -->
    <div class="chat-main">
      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading conversation...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-state">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
        </svg>
        <h3>Failed to load chat</h3>
        <p>{{ error }}</p>
        <button @click="loadChatHistory" class="retry-btn">Try Again</button>
      </div>

      <!-- Chat Messages -->
      <div v-else class="chat-messages" ref="messagesContainer">
        <div v-if="messages.length === 0" class="empty-chat">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clip-rule="evenodd" />
          </svg>
          <h3>No messages yet</h3>
          <p>Start the conversation with Dr. {{ consultation?.doctor?.user?.lastName }}</p>
        </div>

        <div v-else>
          <div 
            v-for="message in messages" 
            :key="message.id"
            :class="['message-wrapper', { 'own-message': message.sender.id === currentUserId }]"
          >
            <div class="message-bubble">
              <div v-if="message.fileName" class="file-message" @click="downloadFile(message)">
                <div class="file-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5h-7.5z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="file-info">
                  <span class="file-name">{{ message.fileName }}</span>
                  <span class="file-size">{{ formatFileSize(message.fileSize) }}</span>
                </div>
              </div>
              <div v-else class="text-message">
                <p>{{ message.content }}</p>
              </div>
              <div class="message-meta">
                <span class="message-time">{{ formatTime(message.createdAt) }}</span>
                <span v-if="message.sender.id === currentUserId" class="message-status">
                  <svg v-if="message.delivered" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Input -->
    <div class="chat-footer">
      <div v-if="!canSendMessages" class="read-only-notice">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clip-rule="evenodd" />
        </svg>
        <span>Read-only mode. You can only view messages.</span>
      </div>

      <div v-else class="input-container">
        <button class="attach-btn" @click="triggerFileUpload" :disabled="sendingFile">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.94 10.94a3.75 3.75 0 105.304 5.303l7.693-7.693a.75.75 0 011.06 1.06l-7.693 7.693a5.25 5.25 0 11-7.424-7.424l10.939-10.94a3.75 3.75 0 115.303 5.304L9.097 18.835a2.25 2.25 0 01-3.182-3.182l10.939-10.94a.75.75 0 011.061 1.06L6.978 16.753a.75.75 0 101.06 1.06L18.97 6.84a2.25 2.25 0 000-3.182z" clip-rule="evenodd" />
          </svg>
        </button>
        <input 
          type="file" 
          ref="fileInput" 
          class="hidden-input" 
          @change="handleFileUpload"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
        >
        
        <textarea 
          v-model="newMessage"
          placeholder="Type your message..."
          @keydown.enter.prevent="sendMessage"
          :disabled="sendingMessage"
          rows="1"
        ></textarea>
        
        <button class="send-btn" @click="sendMessage" :disabled="!canSend || sendingMessage">
          <span v-if="sendingMessage" class="spinner-small"></span>
          <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Rating Modal -->
    <div v-if="showRatingModal" class="modal-overlay" @click.self="closeRatingModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Rate Your Consultation</h3>
          <button class="modal-close" @click="closeRatingModal">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="doctor-rating-info">
            <img :src="consultation?.doctor?.user?.profileImage || defaultDoctorImage" :alt="consultation?.doctor?.user?.firstName" class="rating-doctor-img">
            <div>
              <h4>Dr. {{ consultation?.doctor?.user?.firstName }} {{ consultation?.doctor?.user?.lastName }}</h4>
              <p>How was your consultation?</p>
            </div>
          </div>

          <div class="rating-stars">
            <div 
              v-for="star in 5" 
              :key="star"
              :class="['star', { filled: star <= ratingValue }]"
              @click="ratingValue = star"
              @mouseenter="hoverRating = star"
              @mouseleave="hoverRating = 0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>

          <div class="form-group">
            <label for="review">Write a review (optional)</label>
            <textarea 
              id="review"
              v-model="reviewText"
              placeholder="Share your experience with this doctor..."
              rows="4"
            ></textarea>
          </div>

          <div class="modal-footer">
            <button class="modal-btn secondary" @click="closeRatingModal">
              Later
            </button>
            <button 
              class="modal-btn primary" 
              @click="submitRating"
              :disabled="submittingRating || ratingValue === 0"
            >
              <span v-if="submittingRating" class="spinner-small"></span>
              <span v-else>Submit Review</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { io } from 'socket.io-client';
import moment from 'moment-jalaali';

export default {
  name: 'PatientChat',
  
  data() {
    return {
      loading: true,
      error: null,
      consultation: null,
      messages: [],
      currentUserId: null,
      newMessage: '',
      socket: null,
      connected: false,
      sendingMessage: false,
      sendingFile: false,
      showConsultationInfo: false,
      showRatingModal: false,
      ratingValue: 0,
      hoverRating: 0,
      reviewText: '',
      submittingRating: false,
      defaultDoctorImage: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      apiBaseUrl: 'http://localhost:8000',
      socketUrl: 'ws://localhost:8000',
      fileToken: null,
      isDoctorOnline: false
    }
  },

  computed: {
    consultationId() {
      return this.$route.params.id;
    },

    canSendMessages() {
      if (!this.consultation) return false;
      
      if (this.consultation.status === 'ACTIVE') return true;
      
      if (this.consultation.status === 'FINISHED') {
        return this.isWithinOneWeek;
      }
      
      return false;
    },

    isWithinOneWeek() {
      if (!this.consultation?.endedAt) return false;
      
      const endedAt = moment(this.consultation.endedAt);
      const now = moment();
      const daysDiff = now.diff(endedAt, 'days');
      
      return daysDiff <= 7;
    },

    daysRemaining() {
      if (!this.consultation?.endedAt) return 0;
      
      const endedAt = moment(this.consultation.endedAt);
      const now = moment();
      const daysPassed = now.diff(endedAt, 'days');
      
      return 7 - daysPassed;
    },

    getConsultationStatusText() {
      if (!this.consultation) return '';
      
      if (this.consultation.status === 'ACTIVE') {
        return 'Active Consultation';
      } else if (this.consultation.status === 'FINISHED') {
        if (this.isWithinOneWeek) {
          return `Ended - ${this.daysRemaining} days left to view`;
        } else {
          return 'Consultation Ended';
        }
      }
      return this.consultation.status;
    },

    getStatusClass() {
      return {
        'status-active': this.consultation?.status === 'ACTIVE',
        'status-finished': this.consultation?.status === 'FINISHED'
      };
    },

    canSend() {
      return (this.newMessage.trim() || this.fileToken) && this.canSendMessages && !this.sendingMessage;
    }
  },

  async mounted() {
    await this.initializeChat();
  },

  beforeUnmount() {
    this.disconnectSocket();
  },

  methods: {
    async initializeChat() {
      this.loading = true;
      
      try {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        this.currentUserId = userData.id;
        
        if (this.$route.query.data) {
          try {
            this.consultation = JSON.parse(decodeURIComponent(this.$route.query.data));
            console.log('✅ Using consultation data from query:', this.consultation);
          } catch (e) {
            console.error('Error parsing consultation data:', e);
          }
        }
        
        await this.loadChatHistory();
        this.connectSocket();
        
      } catch (err) {
        console.error('Error initializing chat:', err);
        this.error = err.message || 'Failed to load chat';
      } finally {
        this.loading = false;
      }
    },

    async loadConsultationDetails() {
      try {
        const authToken = localStorage.getItem('authToken');
        
        const response = await fetch(`${this.apiBaseUrl}/consultations/${this.consultationId}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to load consultation details');
        }
        
        this.consultation = await response.json();
        
      } catch (err) {
        console.error('Error loading consultation:', err);
        throw err;
      }
    },

    async loadChatHistory() {
      try {
        const authToken = localStorage.getItem('authToken');
        
        const response = await fetch(`${this.apiBaseUrl}/consultations/chat/${this.consultationId}/load`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to load chat history');
        }
        
        this.messages = await response.json();
        
        this.$nextTick(() => {
          this.scrollToBottom();
        });
        
      } catch (err) {
        console.error('Error loading chat history:', err);
        throw err;
      }
    },

    connectSocket() {
      const token = localStorage.getItem('authToken');
      
      this.socket = io(this.socketUrl, {
        transports: ['websocket'],
        auth: { token },
        query: { consultationId: this.consultationId }
      });

      this.socket.on('connect', () => {
        console.log('✅ Connected to chat server');
        this.connected = true;
      });

      this.socket.on('connect_error', (err) => {
        console.error('❌ Socket connection error:', err);
        this.error = 'Connection error. Please refresh the page.';
      });

      this.socket.on('new_message', (message) => {
        console.log('📩 New message received:', message);
        this.messages.push(message);
        
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      });

      this.socket.on('doctor_online', (data) => {
        this.isDoctorOnline = data.online;
      });

      this.socket.on('disconnect', (reason) => {
        alert('disconnected')
        console.log('❌ Disconnected:', reason);
        this.connected = false;
      });
    },

    disconnectSocket() {
      if (this.socket) {
        this.socket.disconnect();
        this.socket = null;
      }
    },

    sendMessage() {
      if (!this.canSend) return;
      
      this.sendingMessage = true;
      
      const messageData = {
        text: this.newMessage.trim()
      };
      
      if (this.fileToken) {
        messageData.fileToken = this.fileToken;
      }
      
      this.socket.emit('send_message', messageData);
      
      this.newMessage = '';
      this.fileToken = null;
      
      setTimeout(() => {
        this.sendingMessage = false;
      }, 300);
    },

    triggerFileUpload() {
      this.$refs.fileInput.click();
    },

    async handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      
      this.sendingFile = true;
      
      try {
        const authToken = localStorage.getItem('authToken');
        
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch(`${this.apiBaseUrl}/consultations/chat/upload-temp/`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authToken}`
          },
          body: formData
        });
        
        if (!response.ok) {
          throw new Error('File upload failed');
        }
        
        const data = await response.json();
        this.fileToken = data.fileToken;
        
        this.sendMessage();
        
      } catch (err) {
        console.error('Error uploading file:', err);
        alert('Failed to upload file. Please try again.');
      } finally {
        this.sendingFile = false;
        this.$refs.fileInput.value = '';
      }
    },

    downloadFile(message) {
      if (!message.filePath) return;
      
      const authToken = localStorage.getItem('authToken');
      const fileUrl = `${this.apiBaseUrl}${message.filePath}`;
      
      const link = document.createElement('a');
      link.href = fileUrl;
      link.setAttribute('download', message.fileName);
      link.setAttribute('Authorization', `Bearer ${authToken}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    formatFileSize(bytes) {
      if (!bytes) return '0 B';
      
      const units = ['B', 'KB', 'MB', 'GB'];
      let size = bytes;
      let unitIndex = 0;
      
      while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
      }
      
      return `${size.toFixed(1)} ${units[unitIndex]}`;
    },

    formatTime(timestamp) {
      return moment(timestamp).format('HH:mm');
    },

    formatJalaliDate(dateString) {
      if (!dateString) return 'N/A';
      const [year, month, day] = dateString.split('-').map(Number);
      return moment(`${year}/${month}/${day}`, 'jYYYY/jM/jD').format('jYYYY/jMM/jDD');
    },

    scrollToBottom() {
      const container = this.$refs.messagesContainer;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    },

    goBack() {
      this.$router.go(-1);
    },

    showDoctorProfile() {
      this.$router.push(`/doctor/${this.consultation?.doctor?.id}`);
    },

    // New method to open rating modal manually
    openRatingModal() {
      this.ratingValue = 0;
      this.reviewText = '';
      this.showRatingModal = true;
    },

    closeRatingModal() {
      this.showRatingModal = false;
      this.ratingValue = 0;
      this.reviewText = '';
    },

    async submitRating() {
      if (this.ratingValue === 0) return;
      
      this.submittingRating = true;
      
      try {
        const authToken = localStorage.getItem('authToken');
        
        const response = await fetch(`${this.apiBaseUrl}/reviews/${this.consultationId}/review/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({
            rating: this.ratingValue,
            comment: this.reviewText
          })
        });
        
        if (!response.ok) {
          throw new Error('Failed to submit rating');
        }
        
        // Mark as rated to hide the rating button
        if (this.consultation) {
          this.consultation.rated = true;
        }
        
        this.closeRatingModal();
        
      } catch (err) {
        console.error('Error submitting rating:', err);
        alert('Failed to submit rating. Please try again.');
      } finally {
        this.submittingRating = false;
      }
    }
  }
}
</script>

<style scoped>
/* Add rating button specific styles */
.rating-btn {
  color: #ffd700;
}

.rating-btn:hover {
  background: #ffd700 !important;
  border-color: #ffd700 !important;
}

.rating-btn:hover svg {
  color: white !important;
}


.chat-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
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

/* Header */
.chat-header {
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.back-btn {
  width: 40px;
  height: 40px;
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

.back-btn:hover {
  background: #667eea;
  border-color: #667eea;
  transform: translateX(-2px);
}

.back-btn:hover svg {
  color: white;
}

.back-btn svg {
  width: 20px;
  height: 20px;
  color: #4a5568;
  transition: color 0.2s ease;
}

.doctor-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 12px;
  transition: background 0.2s ease;
}

.doctor-info:hover {
  background: #f7f9fc;
}

.doctor-avatar {
  position: relative;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
}

.doctor-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  object-fit: cover;
  border: 2px solid #667eea;
}

.online-status {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
  background: #a0aec0;
}

.online-status.online {
  background: #48bb78;
}

.doctor-details {
  flex: 1;
  min-width: 0;
}

.doctor-name {
  font-size: 16px;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 4px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.consultation-status {
  font-size: 12px;
  color: #718096;
  margin: 0;
}

.header-actions {
  flex-shrink: 0;
}

.header-action {
  width: 40px;
  height: 40px;
  background: #f7f9fc;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.header-action:hover {
  background: #667eea;
  border-color: #667eea;
}

.header-action:hover svg {
  color: white;
}

.header-action svg {
  width: 20px;
  height: 20px;
  color: #4a5568;
  transition: color 0.2s ease;
}

/* Consultation Info Dropdown */
.consultation-info-dropdown {
  background: white;
  border-top: 1px solid #e2e8f0;
  padding: 16px 24px;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.info-item {
  display: flex;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid #f7f9fc;
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  min-width: 80px;
  font-weight: 600;
  color: #4a5568;
  font-size: 13px;
}

.info-value {
  flex: 1;
  color: #2d3748;
  font-size: 13px;
}

.info-value.status-active {
  color: #48bb78;
  font-weight: 600;
}

.info-value.status-finished {
  color: #a0aec0;
  font-weight: 600;
}

.info-item.warning {
  background: #fffaf0;
  padding: 12px;
  border-radius: 8px;
  color: #c05621;
  font-size: 12px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.info-item.warning svg {
  width: 16px;
  height: 16px;
  color: #ed8936;
  flex-shrink: 0;
  margin-top: 2px;
}

/* Main Chat Area */
.chat-main {
  flex: 1;
  position: relative;
  z-index: 1;
  padding: 20px 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
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
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

.loading-state p {
  font-size: 15px;
  color: white;
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

/* Chat Messages */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 0;
}

.empty-chat {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

.empty-chat svg {
  width: 64px;
  height: 64px;
  color: #cbd5e0;
  margin-bottom: 16px;
}

.empty-chat h3 {
  font-size: 18px;
  color: #2d3748;
  margin-bottom: 8px;
  font-weight: 600;
}

.empty-chat p {
  font-size: 14px;
  color: #718096;
  margin: 0;
}

.message-wrapper {
  display: flex;
  margin-bottom: 8px;
}

.message-wrapper.own-message {
  justify-content: flex-end;
}

.message-bubble {
  max-width: 70%;
  background: white;
  border-radius: 18px;
  padding: 12px 16px;
  position: relative;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
}

.own-message .message-bubble {
  background: #667eea;
  border-color: #667eea;
}

.own-message .message-bubble .text-message p {
  color: white;
}

.own-message .message-bubble .message-meta {
  color: rgba(255, 255, 255, 0.8);
}

.text-message p {
  margin: 0;
  color: #2d3748;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
}

.file-message {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 4px;
  border-radius: 8px;
  transition: background 0.2s ease;
}

.file-message:hover {
  background: rgba(0, 0, 0, 0.02);
}

.own-message .file-message:hover {
  background: rgba(255, 255, 255, 0.1);
}

.file-icon {
  width: 40px;
  height: 40px;
  background: #f7f9fc;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.own-message .file-icon {
  background: rgba(255, 255, 255, 0.2);
}

.file-icon svg {
  width: 20px;
  height: 20px;
  color: #667eea;
}

.own-message .file-icon svg {
  color: white;
}

.file-info {
  flex: 1;
  min-width: 0;
}

.file-name {
  display: block;
  font-weight: 600;
  color: #2d3748;
  font-size: 13px;
  margin-bottom: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.own-message .file-name {
  color: white;
}

.file-size {
  font-size: 11px;
  color: #718096;
}

.own-message .file-size {
  color: rgba(255, 255, 255, 0.7);
}

.message-meta {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  margin-top: 4px;
  font-size: 11px;
  color: #718096;
}

.message-time {
  font-size: 10px;
}

.message-status {
  display: flex;
  align-items: center;
}

.message-status svg {
  width: 12px;
  height: 12px;
}

.own-message .message-status svg {
  color: white;
}

/* Chat Footer */
.chat-footer {
  background: white;
  border-top: 1px solid #e2e8f0;
  padding: 16px 24px;
  position: relative;
  z-index: 1;
}

.read-only-notice {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  background: #f7f9fc;
  border-radius: 12px;
  color: #718096;
  font-size: 13px;
}

.read-only-notice svg {
  width: 18px;
  height: 18px;
  color: #a0aec0;
}

.input-container {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  background: #f7f9fc;
  border: 2px solid #e2e8f0;
  border-radius: 24px;
  padding: 8px 8px 8px 16px;
  transition: all 0.3s ease;
}

.input-container:focus-within {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.attach-btn {
  background: none;
  border: none;
  color: #718096;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.attach-btn:hover:not(:disabled) {
  color: #667eea;
  transform: scale(1.1);
}

.attach-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.attach-btn svg {
  width: 20px;
  height: 20px;
}

.input-container textarea {
  flex: 1;
  background: transparent;
  border: none;
  padding: 8px 0;
  font-size: 14px;
  color: #2d3748;
  resize: none;
  max-height: 100px;
  font-family: inherit;
}

.input-container textarea:focus {
  outline: none;
}

.input-container textarea::placeholder {
  color: #a0aec0;
}

.input-container textarea:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.send-btn {
  width: 40px;
  height: 40px;
  background: #667eea;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.send-btn:hover:not(:disabled) {
  background: #5a67d8;
  transform: scale(1.05);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.send-btn svg {
  width: 18px;
  height: 18px;
  color: white;
}

.hidden-input {
  display: none;
}

.spinner-small {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Rating Modal */
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
  padding: 24px 24px 0;
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
  padding: 24px;
}

.doctor-rating-info {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding: 16px;
  background: #f7f9fc;
  border-radius: 12px;
}

.rating-doctor-img {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  object-fit: cover;
  border: 2px solid #667eea;
}

.doctor-rating-info h4 {
  font-size: 16px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 4px;
}

.doctor-rating-info p {
  font-size: 13px;
  color: #718096;
  margin: 0;
}

.rating-stars {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
}

.star {
  cursor: pointer;
  transition: all 0.2s ease;
}

.star:hover {
  transform: scale(1.1);
}

.star svg {
  width: 40px;
  height: 40px;
  color: #e2e8f0;
  transition: color 0.2s ease;
}

.star.filled svg {
  color: #ffd700;
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #4a5568;
  font-size: 14px;
}

.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  color: #2d3748;
  font-family: inherit;
  resize: vertical;
  transition: all 0.3s ease;
}

.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.modal-footer {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.modal-btn {
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 14px;
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

/* Animations */
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    padding: 12px 16px;
  }
  
  .doctor-name {
    font-size: 14px;
  }
  
  .consultation-status {
    font-size: 11px;
  }
  
  .chat-main {
    padding: 16px;
  }
  
  .message-bubble {
    max-width: 85%;
  }
  
  .chat-footer {
    padding: 12px 16px;
  }
  
  .input-container {
    padding: 4px 4px 4px 12px;
  }
}

@media (max-width: 480px) {
  .doctor-info {
    gap: 8px;
  }
  
  .doctor-avatar {
    width: 40px;
    height: 40px;
  }
  
  .message-bubble {
    max-width: 90%;
    padding: 10px 12px;
  }
  
  .rating-stars svg {
    width: 32px;
    height: 32px;
  }
}
</style>