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
    
    // alle elementen cachen die geblurred moeten worden, voor performance
    this.blurElements = [];
    if (this.section) {
      // base image toevoegen
      this.blurElements.push(...this.section.querySelectorAll('.censored-base-image'));
      
      // alle p tags behalve titel en uitleg
      const paragraphs = this.section.querySelectorAll('p:not(.censuur-meter-title):not(.censuur-uitleg)');
      this.blurElements.push(...paragraphs);
      
      // alle h3 tags
      const h3s = this.section.querySelectorAll('h3');
      this.blurElements.push(...h3s);
      
      // carousel
      const carousel = this.section.querySelector('.ktf-carousel-container');
      if (carousel) this.blurElements.push(carousel);
      
      // walter img
      const walterImg = this.section.querySelector('.walter-incognito-img');
      if (walterImg) this.blurElements.push(walterImg);
    }
    
    // labels cachen voor click handlers
    this.labels = this.section ? Array.from(this.section.querySelectorAll('.censored-label')) : [];
    
    this.init();
  }
  
  init() {
    if (!this.slider) return;
    
    // Mouse events
    this.slider.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    document.addEventListener('mouseup', () => this.handleMouseUp());
    
    // Touch events
    this.slider.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: false });
    document.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
    document.addEventListener('touchend', () => this.handleTouchEnd());
    
    // Click op track
    this.slider.addEventListener('click', (e) => this.handleTrackClick(e));
        // Keyboard accessibility
    this.slider.setAttribute('tabindex', '0');
    this.slider.setAttribute('role', 'slider');
    this.slider.setAttribute('aria-valuemin', '0');
    this.slider.setAttribute('aria-valuemax', '100');
    this.slider.setAttribute('aria-label', 'Censuur percentage');
    
    this.slider.addEventListener('keydown', (e) => this.handleKeyDown(e));
        // will-change op blur elementen
    this.blurElements.forEach(el => {
      if (el) {
        el.style.willChange = 'filter';
        el.style.transition = 'filter 0.2s ease';
        
        // hover listeners
        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
          el.addEventListener('mouseenter', () => {
            el.dataset.hovered = 'true';
            el.style.filter = 'blur(0px)';
          });
          
          el.addEventListener('mouseleave', () => {
            delete el.dataset.hovered;
            // herbereken blur op basis van huidige percentage
            const blurAmount = (this.percentage / 100) * this.maxBlur;
            el.style.filter = `blur(${blurAmount}px)`;
          });
        }
      }
    });
    
    // click handler voor labels
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
  
  handleKeyDown(e) {
    // verhoog censuur met 5% (pijltjes links/rechts)
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const newPercentage = Math.max(0, this.percentage - 5);
      this.updateSlider(newPercentage);
    }
    
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const newPercentage = Math.min(100, this.percentage + 5);
      this.updateSlider(newPercentage);
    }
  }
  
  updateFromEvent(e) {
    const rect = this.slider.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    // previous frame uitzetten als die er is
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    
    // request frame voor smoother effect
    this.animationFrameId = requestAnimationFrame(() => {
      this.updateSlider(percentage);
    });
  }
  
  updateSlider(percentage) {
    this.percentage = percentage;
    
    // Updaten fill width
    this.fill.style.width = `${percentage}%`;
    
    // Updaten percentage display
    this.percentageDisplay.textContent = `${Math.round(percentage)}%`;
    
    // Updaten ARIA attribute
    this.slider.setAttribute('aria-valuenow', Math.round(percentage));
    
    // blur effect
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
