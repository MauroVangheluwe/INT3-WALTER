import '../styles/reset.css'
import '../styles/style.css'
import $ from 'jquery'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initGunInteraction } from './gunInteraction.js'

// GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// Progressive Enhancement
document.addEventListener('DOMContentLoaded', () => {

  document.documentElement.classList.add('js-enabled');

  // Init gun interaction
  initGunInteraction();
});