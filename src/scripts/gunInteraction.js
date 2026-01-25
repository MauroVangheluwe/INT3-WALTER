// Gun & Gun-Shape interactie
export function initGunInteraction() {
  // Aantal clicks bijhouden
  let clickCount = 0;
  const maxClicks = 4;
  
  const gun = document.querySelector('.gun');
  const gunShape = document.querySelector('.gun-shape');

  if (gun && gunShape) {
    gun.addEventListener('click', () => {
      // Stop animation on first click
      gun.classList.add('clicked');
      
      // trigger weerstand on Gun
      gun.classList.add('recoil');
      setTimeout(() => gun.classList.remove('recoil'), 200);

      // trigger the viewport shake
      document.body.classList.add('shake');
      setTimeout(() => document.body.classList.remove('shake'), 200);
      
      if (clickCount < maxClicks) {
        clickCount++;
        gunShape.setAttribute('data-reveal', clickCount);
        console.log(`Gun clicked: ${clickCount}/${maxClicks}`);
      }
    });
  }
}
