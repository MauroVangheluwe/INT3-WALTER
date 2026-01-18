import './style.css'
import $ from 'jquery'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// GSAP Plugins registreren
gsap.registerPlugin(ScrollTrigger);

// Wachten tot de DOM klaar is via jQuery
$(document).ready(function() {
  console.log("jQuery en Vite zijn succesvol gekoppeld!");

  // Voorbeeld van de jQuery focus uit je opdracht:
  // We stylen de titel direct via jQuery ipv CSS om aan de eis te voldoen
  $('#main-title').css({
    'font-size': '2rem',
    'text-transform': 'uppercase',
    'letter-spacing': '0.1em'
  });

  // Een simpele GSAP animatie om te testen of het werkt
  gsap.from("#main-title", {
    duration: 1.5,
    y: 50,
    opacity: 0,
    ease: "power4.out"
  });
});