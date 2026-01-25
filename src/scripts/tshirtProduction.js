export class TshirtProduction {
  constructor() {
    this.button = document.querySelector('.button-tshirt');
    this.container = document.querySelector('.tshirt-stack-container');
    this.count = 1; // Start with 1 (initial tshirt)
    this.maxCount = 5;
    
    this.init();
  }
  
  init() {
    if (!this.button || !this.container) return;
    
    this.button.addEventListener('click', (e) => {
      e.preventDefault();
      this.addTshirt();
    });
  }
  
  addTshirt() {
    if (this.count >= this.maxCount) return;
    
    // Create picture element for responsive images
    const picture = document.createElement('picture');
    
    // AVIF source (best compression)
    const avifSource = document.createElement('source');
    avifSource.type = 'image/avif';
    avifSource.srcset = './src/assets/t-shirt-400.avif 400w, ./src/assets/t-shirt-800.avif 800w, ./src/assets/t-shirt-1200.avif 1200w';
    avifSource.sizes = '(max-width: 768px) 80vw, 50vw';
    
    // WebP source (fallback)
    const webpSource = document.createElement('source');
    webpSource.type = 'image/webp';
    webpSource.srcset = './src/assets/t-shirt-400.webp 400w, ./src/assets/t-shirt-800.webp 800w, ./src/assets/t-shirt-1200.webp 1200w';
    webpSource.sizes = '(max-width: 768px) 80vw, 50vw';
    
    // Create img element (final fallback)
    const tshirt = document.createElement('img');
    tshirt.src = './src/assets/t-shirt.png';
    tshirt.alt = "Walter's T-shirt";
    tshirt.classList.add('tshirt-item');
    tshirt.dataset.index = this.count;
    
    // Calculate progressive effects
    const scale = 1 - (this.count * 0.05); // 5% smaller each time
    const rotation = (Math.random() - 0.5) * 120; // Random -60 to +60 degrees (bigger rotation)
    const saturation = 100 - (this.count * 25); // From 100% to 0% over 5 shirts (0, 1, 2, 3, 4)
    const blur = this.count * 0.5; // Increase blur by 0.5px each time
    const zIndex = this.count;
    
    // Random positioning offset (not completely centered)
    const offsetX = (Math.random() - 0.5) * 40; // -20px to +20px
    const offsetY = (Math.random() - 0.5) * 40; // -20px to +20px
    
    // Apply styles
    tshirt.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale}) rotate(${rotation}deg)`;
    tshirt.style.filter = `saturate(${saturation}%) blur(${blur}px)`;
    tshirt.style.zIndex = zIndex;
    tshirt.style.opacity = '0';
    
    // Append sources and img to picture
    picture.appendChild(avifSource);
    picture.appendChild(webpSource);
    picture.appendChild(tshirt);
    
    // Add picture to container
    this.container.appendChild(picture);
    
    // Trigger animation
    requestAnimationFrame(() => {
      tshirt.style.opacity = '1';
    });
    
    this.count++;
    
    // Update button if at max
    if (this.count >= this.maxCount) {
      const buttonText = this.button.querySelector('span');
      if (buttonText) buttonText.textContent = 'Uitverkocht!';
      this.button.style.opacity = '0.5';
      this.button.style.cursor = 'not-allowed';
    }
  }
}