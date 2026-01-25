import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initScrollSmoother() {
  // Skip ScrollSmoother if reduced motion is preferred
  if (prefersReducedMotion) {
    console.log('ScrollSmoother disabled: reduced motion preferred');
    return;
  }

  ScrollSmoother.create({
    smooth: 1.5,
    effects: true,
    smoothTouch: 0.1,
  });
}

export function initAnimations() {
  // Skip all animations if reduced motion is preferred
  if (prefersReducedMotion) {
    console.log('GSAP animations disabled: reduced motion preferred');
    return;
  }

  // all text & h3's --fade in anim
  gsap.utils.toArray('p, h3').forEach(p => {
    gsap.from(p, {
      scrollTrigger: {
        trigger: p,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power2.out'
    });
  });
  
  // header --loading anim
const headerTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  
  headerTl
    .from('.logo', {
      opacity: 0,
      y: -50,
      rotation: -180,
      duration: 1.2
    })
    .from('.gun-wrapper', {
      opacity: 0,
      scale: 0.8,
      duration: 1.2,
      ease: 'back.out(1.7)'
    }, '-=0.9')
    .from('.hero-title', {
      opacity: 0,
      x: -100,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.4');
  
  // h2 slides
  gsap.utils.toArray('section h2').forEach(h2 => {
    gsap.from(h2, {
      scrollTrigger: {
        trigger: h2,
        start: 'top 85%',
        end: 'top 50%',
        scrub: 1,
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      x: h2.classList.contains('section-h2-white-right') ? -200 : 200,
      skewX: 10,
      ease: 'power2.out'
    });
  });
  
  // parallax on images
  const createParallax = (selector, speed = 1) => {
    const elements = gsap.utils.toArray(selector);
    elements.forEach(el => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        },
        y: -150 * speed,
        ease: 'none'
      });
    });
  };
  
  createParallax('.intro-img', 1.5);
  createParallax('.walter-incognito-img', 0.5);
  createParallax('.materials-collage', 0.8);
  
  // Hover magnetic buttons
  const applyMagneticEffect = (selector) => {
    const buttons = gsap.utils.toArray(selector);
    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)'
        });
      });
    });
  };
  
  applyMagneticEffect('.button-ticket, .button-tshirt, .button-story, .button-ticket-2');
  
  // Blockquote --anim
  gsap.utils.toArray('blockquote').forEach(quote => {
    quote.addEventListener('mouseenter', () => {
      const tl = gsap.timeline();
      
      tl.to(quote, {
        x: -5,
        duration: 0.05,
        repeat: 3,
        yoyo: true
      })
      .to(quote, {
        x: 5,
        duration: 0.05,
        repeat: 2,
        yoyo: true
      }, '+=0.05')
      .to(quote, {
        x: 0,
        duration: 0.1
      });
    });
  });

  gsap.from('blockquote', {
    scrollTrigger: {
      trigger: 'blockquote',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    scale: 0.9,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });

  
  // Materials --anim
  ScrollTrigger.create({
    trigger: '.materials-section',
    start: 'top 60%',
    onEnter: () => {
      const tl = gsap.timeline();
      
      tl.from('.materials-collage', {
        scale: 0.7,
        opacity: 0,
        rotation: -15,
        duration: 1.2,
        ease: 'back.out(1.5)'
      })
      .from('.materials-text-shape', {
        opacity: 0,
        x: 100,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.6');
    },
    once: true
  });
  
  // Footer --anim
  ScrollTrigger.create({
    trigger: 'footer',
    start: 'top 80%',
    onEnter: () => {
      const tl = gsap.timeline();
      
      tl.from('.footer-title', {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: 'back.out(2)'
      })
      .from('.footer-img', {
        opacity: 0,
        scale: 0.9,
        rotation: -5,
        duration: 1,
        ease: 'back.out(1.5)'
      }, '-=0.5')
      .from('.footer-button-container a', {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 0.7,
        ease: 'back.out(2)'
      }, '-=0.6');
    },
    once: true
  });
  
  
  // Production section --anim
  ScrollTrigger.create({
    trigger: '.section-production',
    start: 'top 60%',
    onEnter: () => {
      gsap.from('.section-production h2', {
        opacity: 0,
        x: 300,
        duration: 1.2,
        ease: 'power3.out'
      });
    },
    once: true
  });
}