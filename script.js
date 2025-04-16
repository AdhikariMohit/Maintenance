document.addEventListener('DOMContentLoaded', function() {
    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      
      cursorFollower.style.left = e.clientX + 'px';
      cursorFollower.style.top = e.clientY + 'px';
    });
    
    // Cursor effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, .countdown-value');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.backgroundColor = 'var(--accent)';
        cursorFollower.style.width = '30px';
        cursorFollower.style.height = '30px';
        cursorFollower.style.borderColor = 'white';
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '12px';
        cursor.style.height = '12px';
        cursor.style.backgroundColor = 'var(--accent)';
        cursorFollower.style.width = '24px';
        cursorFollower.style.height = '24px';
        cursorFollower.style.borderColor = 'var(--primary)';
      });
    });
    
    // Create animated binary code background
    const bgAnimation = document.getElementById('bgAnimation');
    const binaryChars = ['0', '1'];
    
    for (let i = 0; i < 50; i++) {
      const binary = document.createElement('div');
      binary.className = 'binary-code';
      
      // Generate random binary string
      let binaryString = '';
      for (let j = 0; j < 20; j++) {
        binaryString += binaryChars[Math.floor(Math.random() * binaryChars.length)];
      }
      
      binary.textContent = binaryString;
      binary.style.left = Math.random() * 100 + '%';
      binary.style.animationDuration = (Math.random() * 10 + 10) + 's';
      binary.style.animationDelay = (Math.random() * 5) + 's';
      
      bgAnimation.appendChild(binary);
    }
    
    // Countdown timer (24 hours from now)
    const countdownDate = new Date();
    countdownDate.setHours(countdownDate.getHours() + 24);
    
    function updateCountdown() {
      const now = new Date().getTime();
      const distance = countdownDate - now;
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      document.getElementById('days').textContent = days.toString().padStart(2, '0');
      document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
      document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
      document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
      
      if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById('countdown').innerHTML = 
          '<div class="countdown-value" style="animation: pulse 1s infinite;">Maintenance Complete!</div>';
      }
    }
    
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    // Notification system
    const notification = document.getElementById('notification');
    
    function showNotification(message) {
      notification.textContent = message;
      notification.classList.add('show');
      
      setTimeout(() => {
        notification.classList.remove('show');
      }, 3000);
    }
    
    // Form submission
    const subscribeForm = document.getElementById('subscribeForm');
    subscribeForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value;
      
      // Validate email
      if (!email.includes('@') || !email.includes('.')) {
        showNotification('Please enter a valid email address');
        return;
      }
      
      // Simulate form submission
      setTimeout(() => {
        showNotification(`Thank you! We'll notify you at ${email}`);
        emailInput.value = '';
      }, 500);
    });
  });