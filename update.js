const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Replace <style> block
const newStyle = fs.readFileSync('new_style.css', 'utf8');
html = html.replace(/<style>[\s\S]*?<\/style>/, `<style>\n${newStyle}\n</style>`);

// 2. Replace Hero Section
const heroRegex = /<section class="hero"[\s\S]*?<\/section>/;
const newHero = `
<div class="parallax-blur pb-1"></div>
<div class="parallax-blur pb-2"></div>
<div class="parallax-blur pb-3"></div>

<section class="hero" id="hero">
  <div id="webgl-hero-container"></div>
  <div id="css-hero-container">
    <div id="phone-overlay" class="phone-screen-html">
      <div class="phone-screen-inner">
        <div class="phone-statusbar">
          <span>9:41</span>
          <div class="flex gap-1.5"><svg width="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg></div>
        </div>
        <div class="phone-content">
          <div class="pc-title">Transfer detail</div>
          <div class="pc-sub">Today at 10:42 AM</div>
          <div class="viz">
            <div class="viz-path"><svg viewBox="0 0 200 60"><path d="M 0 30 Q 100 -20 200 30"/></svg></div>
            <div class="viz-dot"></div>
            <div class="viz-avatar send">AK<div class="label">You</div></div>
            <div class="viz-avatar recv">JD<div class="label">John</div></div>
          </div>
          <div class="pc-rows">
            <div class="pc-row done">
              <div class="pc-row-icon"><svg width="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>
              <div>Sent 50,000 NGN</div>
            </div>
            <div class="pc-row active">
              <div class="pc-row-icon"><svg width="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
              <div>Converting to RWF (29,400)</div>
            </div>
            <div class="pc-row pending">
              <div class="pc-row-icon"><svg width="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/></svg></div>
              <div>Arriving in MTN Mobile Money</div>
            </div>
          </div>
          <div class="pc-ref">REF: LYNK-84A9</div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="container reveal">
    <div class="hero-copy">
      <div class="hero-badge">
        <div class="dot"></div> Early Access Beta
      </div>
      <h1>Move money across Africa in <span class="mint-word">10 seconds.</span></h1>
      <p class="hero-sub">The cross-border payment protocol for the next billion. Fast, secure, and regulated infrastructure bridging African economies.</p>
      <div class="hero-cta">
        <a href="#waitlist" class="btn btn-primary">Join waitlist</a>
        <a href="#how" class="btn btn-secondary">See how it works</a>
      </div>
      <div class="hero-meta">
        <div class="meta-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg> Regulated infrastructure</div>
        <div class="meta-item"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> 10s average settlement</div>
      </div>
    </div>
    <div class="scene-container"></div>
  </div>
</section>
`;
html = html.replace(heroRegex, newHero);


fs.writeFileSync('index.html', html);
console.log('Update complete');
