export class CensuurSlider {
  constructor() {
    this.slider = document.querySelector('.censuur-slider-track');
    this.fill = document.querySelector('.censuur-slider-fill');
    this.percentageDisplay = document.querySelector('.censuur-percentage');
    this.section = document.querySelector('.slogan-section');
    this.censuurContainer = document.querySelector('.censuur-meter-container');
    
    // Random percentage tussen 60 en 100
    this.percentage = Math.floor(Math.random() * 41) + 60;
    this.isDragging = false;
    this.animationFrameId = null;
    
    // Maximum blur in pixels (pas dit aan om meer/minder blur te krijgen)
    this.maxBlur = 5;
    
    // Cache alle elementen die blur moeten krijgen
    this.blurElements = [];
    if (this.section) {
      // Voeg base images toe
      this.blurElements.push(...this.section.querySelectorAll('.censored-base-image'));
      
      // Voeg alle p tags toe (behalve censuur-meter-title en censuur-uitleg)
      const paragraphs = this.section.querySelectorAll('p:not(.censuur-meter-title):not(.censuur-uitleg)');
      this.blurElements.push(...paragraphs);
      
      // Voeg h3 tags toe
      const h3s = this.section.querySelectorAll('h3');
      this.blurElements.push(...h3s);
      
      // Voeg carousel toe
      const carousel = this.section.querySelector('.ktf-carousel-container');
      if (carousel) this.blurElements.push(carousel);
      
      // Voeg walter-incognito-img toe
      const walterImg = this.section.querySelector('.walter-incognito-img');
      if (walterImg) this.blurElements.push(walterImg);
    }
    
    // Cache labels voor click handlers
    this.labels = this.section ? Array.from(this.section.querySelectorAll('.censored-label')) : [];
    
    this.init();
  }
  
  init() {
    if (!this.slider) return;
    
    // Mouse events
    this.slider.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    document.addEventListener('mouseup', () => this.handleMouseUp());
    
    // Touch events voor mobile
    this.slider.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: false });
    document.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
    document.addEventListener('touchend', () => this.handleTouchEnd());
    
    // Click op track
    this.slider.addEventListener('click', (e) => this.handleTrackClick(e));
    
    // Set will-change op blur elementen
    this.blurElements.forEach(el => {
      if (el) {
        el.style.willChange = 'filter';
        el.style.transition = 'filter 0.2s ease';
        
        // Add hover listeners
        el.addEventListener('mouseenter', () => {
          el.dataset.hovered = 'true';
          el.style.filter = 'blur(0px)';
        });
        
        el.addEventListener('mouseleave', () => {
          delete el.dataset.hovered;
          // Reapply current blur
          const blurAmount = (this.percentage / 100) * this.maxBlur;
          el.style.filter = `blur(${blurAmount}px)`;
        });
      }
    });
    
    // Add click handlers to labels
    this.labels.forEach(label => {
      label.addEventListener('click', () => {
        label.style.opacity = '0';
        label.style.pointerEvents = 'none';
      });
      label.style.cursor = 'pointer';
      label.style.transition = 'opacity 0.3s ease';
    });
    
    this.updateSlider(this.percentage);
  }
  
  handleMouseDown(e) {
    this.isDragging = true;
    this.updateFromEvent(e);
  }
  
  handleMouseMove(e) {
    if (!this.isDragging) return;
    this.updateFromEvent(e);
  }
  
  handleMouseUp() {
    this.isDragging = false;
  }
  
  handleTouchStart(e) {
    this.isDragging = true;
    this.updateFromEvent(e.touches[0]);
  }
  
  handleTouchMove(e) {
    if (!this.isDragging) return;
    e.preventDefault();
    this.updateFromEvent(e.touches[0]);
  }
  
  handleTouchEnd() {
    this.isDragging = false;
  }
  
  handleTrackClick(e) {
    this.updateFromEvent(e);
  }
  
  updateFromEvent(e) {
    const rect = this.slider.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    // Cancel previous animation frame
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    
    // Use requestAnimationFrame for smooth updates
    this.animationFrameId = requestAnimationFrame(() => {
      this.updateSlider(percentage);
    });
  }
  
  updateSlider(percentage) {
    this.percentage = percentage;
    
    // Update fill width
    this.fill.style.width = `${percentage}%`;
    
    // Update percentage display
    this.percentageDisplay.textContent = `${Math.round(percentage)}%`;
    
    // Apply blur effect
    this.applyBlurEffect(percentage);
  }
  
  applyBlurEffect(percentage) {
    // Blur van maxBlur bij 100% naar 0px bij 0%
    const blurAmount = (percentage / 100) * this.maxBlur;
    
    // Update blur elementen (maar skip gehovered elementen)
    this.blurElements.forEach(el => {
      if (el && !el.dataset.hovered) {
        el.style.filter = `blur(${blurAmount}px)`;
      }
    });
  }
}
