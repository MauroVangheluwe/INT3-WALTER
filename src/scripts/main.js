import '../styles/reset.css'
import '../styles/style.css'
import $ from 'jquery'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initGunInteraction } from './gunInteraction.js'
import { CensuurSlider } from './censuurSlider.js'
import { TshirtProduction } from './tshirtProduction.js'

// GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// Progressive Enhancement
document.addEventListener('DOMContentLoaded', () => {

  document.documentElement.classList.add('js-enabled');

  // Init gun interaction
  initGunInteraction();
  
  // Init censuur slider
  new CensuurSlider();
  
  // Init tshirt production
  new TshirtProduction();
});