export class TshirtProduction {
  constructor() {
    this.button = document.querySelector('.button-tshirt');
    this.container = document.querySelector('.tshirt-stack-container');
    this.count = 1; // Starten met 1 (start tshirt)
    this.maxCount = 5;
    
    // originele picture als template ophalen
    this.templatePicture = this.container?.querySelector('picture');
    
    this.init();
  }
  
  init() {
    if (!this.button || !this.container || !this.templatePicture) return;
    
    this.button.addEventListener('click', (e) => {
      e.preventDefault();
      this.addTshirt();
    });
  }
  
  addTshirt() {
    if (this.count >= this.maxCount) return;
    
    // originele picture klonen
    const picture = this.templatePicture.cloneNode(true);
    const tshirt = picture.querySelector('img');
    
    // attributen updaten
    tshirt.dataset.index = this.count;
    tshirt.removeAttribute('loading'); // lazy loading uit voor animatie
    
    // effecten berekenen
    const scale = 1 - (this.count * 0.05); // 5% kleiner elke keer
    const rotation = (Math.random() - 0.5) * 120; // Random -60 tot +60 graden
    const saturation = 100 - (this.count * 25); // Van 100% naar 0% over 5 shirts
    const blur = this.count * 0.5; // Verhoog blur met 0.5px elke keer
    const zIndex = this.count;
    
    // Random offset op positie
    const offsetX = (Math.random() - 0.5) * 40; // -20px tot +20px
    const offsetY = (Math.random() - 0.5) * 40; // -20px tot +20px
    
    // stijlen toepassen
    tshirt.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale}) rotate(${rotation}deg)`;
    tshirt.style.filter = `saturate(${saturation}%) blur(${blur}px)`;
    tshirt.style.zIndex = zIndex;
    tshirt.style.opacity = '0';
    
    // picture aan container toevoegen
    this.container.appendChild(picture);
    
    // animatie starten
    requestAnimationFrame(() => {
      tshirt.style.opacity = '1';
    });
    
    this.count++;
    
    // button updaten als max  wordt bereikt
    if (this.count >= this.maxCount) {
      const buttonText = this.button.querySelector('span');
      if (buttonText) buttonText.textContent = 'Uitverkocht!';
      this.button.style.opacity = '0.5';
      this.button.style.cursor = 'not-allowed';
    }
  }
}