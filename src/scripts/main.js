import '../styles/reset.css'
import '../styles/style.css'
import $ from 'jquery'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initGunInteraction } from './gunInteraction.js'

// GSAP Plugins registreren
gsap.registerPlugin(ScrollTrigger);

// Progressive Enhancement
document.addEventListener('DOMContentLoaded', () => {
  // JavaScript-dependent stijl
  document.documentElement.classList.add('js-enabled');

  // Initialize gun interaction
  initGunInteraction();
});