const fs = require('fs');

const head = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>LYNK — Move money across Africa in 10 seconds</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/src/index.css" />
<style>
${fs.readFileSync('new_style.css', 'utf-8')}
</style>
<!-- Import Map for Three.js -->
<script type="importmap">
  {
    "imports": {
      "three": "https://unpkg.com/three@0.160.0/build/three.module.js",
      "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/"
    }
  }
</script>
</head>
<body>
`;

const nav = `
<nav class="top" id="topNav">
  <div class="inner">
    <a href="#" class="logo-mark">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-1)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>
      LYNK
    </a>
    <div class="links">
      <a href="#why">Why LYNK</a>
      <a href="#how">How it works</a>
      <a href="#links">Payment Links</a>
      <a href="#pricing">Pricing</a>
    </div>
    <div class="hidden md:flex items-center gap-[16px]">
      <a href="#waitlist" class="btn btn-primary">Join waitlist</a>
    </div>
  </div>
</nav>
`;

const hero = `
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
          <div class="flex gap-[6px]"><svg width="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg></div>
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

const why = `
<section id="why">
  <div class="container relative z-10">
    <div class="section-tag reveal">WHY LYNK</div>
    <h2 class="section-title reveal stagger-1">What makes LYNK different.</h2>
    <p class="section-sub reveal stagger-2">Built to be taken seriously — by our users, by regulators, and by the infrastructure partners who move money with us.</p>
    
    <div class="mt-[56px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-[24px] gap-x-[20px]">
      <div class="card-elev reveal">
        <canvas class="feature-canvas w-[96px] h-[96px] mb-[24px]" data-shape="clock"></canvas>
        <h3 class="text-[20px] font-semibold text-[var(--text)] mb-[16px] leading-snug">10-second settlement</h3>
        <p class="text-[15px] text-[var(--text-muted)] leading-relaxed">USDC on Solana handles cross-border settlement in under a second. Local fiat legs take another few seconds. Total delivery time: under 10 seconds, any African country to any other.</p>
      </div>
      
      <div class="card-elev reveal stagger-1">
        <canvas class="feature-canvas w-[96px] h-[96px] mb-[24px]" data-shape="shield"></canvas>
        <h3 class="text-[20px] font-semibold text-[var(--text)] mb-[16px] leading-snug">Regulated in Rwanda</h3>
        <p class="text-[15px] text-[var(--text-muted)] leading-relaxed">Registered with the Rwanda Development Board. Engaging early with the National Bank of Rwanda. Compliance-first architecture from day one — AML, KYC built into the core.</p>
      </div>
      
      <div class="card-elev reveal stagger-2">
        <canvas class="feature-canvas w-[96px] h-[96px] mb-[24px]" data-shape="chart"></canvas>
        <h3 class="text-[20px] font-semibold text-[var(--text)] mb-[16px] leading-snug">Transparent unit economics</h3>
        <p class="text-[15px] text-[var(--text-muted)] leading-relaxed">A flat 1.5% fee plus $0.99 per transaction. Mid-market FX rate published in real time. No hidden exchange rate spreads. What you see is what your recipient gets.</p>
      </div>

      <div class="card-elev reveal">
        <canvas class="feature-canvas w-[96px] h-[96px] mb-[24px]" data-shape="rings"></canvas>
        <h3 class="text-[20px] font-semibold text-[var(--text)] mb-[16px] leading-snug">Payment Links — a category first</h3>
        <p class="text-[15px] text-[var(--text-muted)] leading-relaxed">Generate a shareable URL that anyone in any country can pay. Sender pays in their currency. Recipient receives in theirs. Built for WhatsApp, Instagram bios, freelancers.</p>
      </div>

      <div class="card-elev reveal stagger-1">
        <canvas class="feature-canvas w-[96px] h-[96px] mb-[24px]" data-shape="cube"></canvas>
        <h3 class="text-[20px] font-semibold text-[var(--text)] mb-[16px] leading-snug">Provider-agnostic infrastructure</h3>
        <p class="text-[15px] text-[var(--text-muted)] leading-relaxed">Built with a provider abstraction layer. Integrates with multiple partners. Routes each transaction to the best available rail automatically. No single point of failure.</p>
      </div>

      <div class="card-elev reveal stagger-2">
        <canvas class="feature-canvas w-[96px] h-[96px] mb-[24px]" data-shape="continent"></canvas>
        <h3 class="text-[20px] font-semibold text-[var(--text)] mb-[16px] leading-snug">Africa-native, not Africa-adapted</h3>
        <p class="text-[15px] text-[var(--text-muted)] leading-relaxed">Built in Kigali by Africans who've lived the problem. Launching on the Nigeria-Rwanda-Kenya corridor. Expanding to Ghana, Tanzania, Uganda, and South Africa.</p>
      </div>
    </div>
  </div>
</section>
`;

const how = `
<section id="how">
  <div class="container relative z-10">
    <div class="section-tag reveal">How it works</div>
    <h2 class="section-title reveal stagger-1">Three steps. Any country. Any currency.</h2>
    <p class="section-sub reveal stagger-2">No physical branches, no waiting days, no deciphering fee schedules. Just pick who, how much, and tap send.</p>

    <div class="steps mt-[64px]">
      <div class="step reveal card-elev p-0">
        <div class="p-[32px]">
          <span class="step-num">01</span>
          <div class="step-illus">
            <canvas class="step-scene w-full h-[180px]" id="step1-scene" data-step="1"></canvas>
          </div>
          <div class="step-title">Choose a recipient</div>
          <div class="step-desc">Pick from your contacts or paste a phone number. Works in 8 countries at launch, more on the way.</div>
        </div>
      </div>
      <div class="step reveal stagger-1 card-elev p-0">
        <div class="p-[32px]">
          <span class="step-num">02</span>
          <div class="step-illus">
            <canvas class="step-scene w-full h-[180px]" id="step2-scene" data-step="2"></canvas>
          </div>
          <div class="step-title">See the exact rate</div>
          <div class="step-desc">The mid-market rate, our rate, and the fee — side by side, always. No hidden markup buried in the FX.</div>
        </div>
      </div>
      <div class="step reveal stagger-2 card-elev p-0">
        <div class="p-[32px]">
          <span class="step-num">03</span>
          <div class="step-illus">
            <canvas class="step-scene w-full h-[180px]" id="step3-scene" data-step="3"></canvas>
          </div>
          <div class="step-title">Send in 10 seconds</div>
          <div class="step-desc">Auth with FaceID and the money is delivered instantly to their mobile money wallet or bank account.</div>
        </div>
      </div>
    </div>
  </div>
</section>
`;

const linksSection = `
<section id="links">
  <div class="container relative z-10">
    <div class="section-tag reveal">Payment Links</div>
    <h2 class="section-title reveal stagger-1">Get paid across borders, without writing a line of code.</h2>
    <p class="section-sub reveal stagger-2">Generate a universal payment link. Share it on WhatsApp, email, or your invoice. Let anyone in Africa pay you in their local currency.</p>

    <div class="links-showcase reveal">
      <div class="links-info">
        <h3 class="text-[28px] font-semibold text-[var(--text)] mb-[16px] tracking-tight">The easiest way to invoice.</h3>
        <p class="text-[16px] text-[var(--text-muted)] leading-relaxed">Stop calculating exchange rates for your clients. Set the amount you want to receive, and we automatically show them the exact amount in their currency.</p>
        
        <div class="links-feature-list mt-[48px]">
          <div class="links-feature reveal">
            <div class="check"><svg width="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>
            <span><strong>No app required</strong> — Sender pays via web interface</span>
          </div>
          <div class="links-feature reveal stagger-1">
            <div class="check"><svg width="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>
            <span><strong>Multi-channel</strong> — Works seamlessly in WhatsApp & Instagram</span>
          </div>
          <div class="links-feature reveal stagger-2">
            <div class="check"><svg width="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>
            <span><strong>Instant settlement</strong> — Funds land in your wallet immediately</span>
          </div>
        </div>
      </div>

      <div class="links-card-wrap reveal stagger-1" id="links-card-interactive">
        <div class="links-card">
          <canvas id="links-card-scene" class="w-full h-full"></canvas>
          <div class="links-card-light"></div>
          <div class="links-card-content">
            <div class="flex items-center gap-[16px] mb-[24px]">
              <div class="w-[48px] h-[48px] bg-[var(--accent-1)] text-white rounded-[12px] flex items-center justify-center font-bold text-[20px]">KD</div>
              <div>
                <div class="font-semibold text-[16px]">Kigali Designs Ltd</div>
                <div class="text-[13px] text-[var(--text-faint)]">Requesting payment</div>
              </div>
            </div>
            <div class="text-[40px] font-bold tracking-tight mb-[8px] text-[var(--text)]">200,000 <span class="text-[var(--text-muted)] text-[24px]">RWF</span></div>
            <div class="text-[14px] text-[var(--text-faint)] mb-[32px]">~ 236,150 NGN using mid-market rate</div>
            
            <div class="link-url mt-[24px]">
              <svg width="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              <div class="link-url-text font-mono text-[13px]">lynk.app/pay/r/kigali-designs/inv-042</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`;

const pricing = `
<section id="pricing">
  <div class="container relative z-10">
    <div class="section-tag reveal">PRICING</div>
    <h2 class="section-title reveal stagger-1">Real mid-market rates. Transparent infrastructure fee.</h2>
    <p class="section-sub reveal stagger-2">We built LYNK to end the era of hidden FX spreads. Our unit economics are clear, published, and applied to every transaction without exception.</p>

    <div class="pricing-card reveal mt-[64px]">
      <canvas id="pricing-bg-scene" class="w-full h-full"></canvas>
      <div class="pricing-left relative z-10">
        <div class="price-amount">1.5<span>%</span> <span class="text-[24px] text-[var(--text-muted)] ml-[8px]">+$0.99</span></div>
        <div class="price-detail mb-[32px]">Flat fee applied after standard currency conversion.<br>No weekend markups. No minimums.</div>
        
        <div class="price-features mt-[32px]">
          <div class="price-feature">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            10-second settlement guaranteed
          </div>
          <div class="price-feature">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>
            Direct to Mobile Money or Bank Account
          </div>
          <div class="price-feature">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Institutional-grade security
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`;

const trustAndWaitlist = `
<section id="trust">
  <div class="container relative z-10">
    <div class="trust reveal">
      <div class="trust-content">
        <h3 class="text-[32px] font-semibold tracking-tight text-[var(--text)] mb-[16px]">Built on regulated global rails</h3>
        <p class="text-[16px] text-[var(--text-muted)] leading-relaxed mb-[48px]">LYNK operates structurally as an international payment facilitator, meaning we partner with licensed entities in every operating market.</p>
        
        <div class="trust-list mt-[48px]">
          <div class="trust-item">
            <div class="icon"><svg width="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
            <span>End-to-end FDIC-insured fiat legs</span>
          </div>
          <div class="trust-item">
            <div class="icon"><svg width="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg></div>
            <span>Real-time transaction monitoring</span>
          </div>
          <div class="trust-item">
            <div class="icon"><svg width="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>
            <span>Automated AML/KYC screening</span>
          </div>
        </div>
      </div>
      
      <div class="trust-stat-wrap mx-auto text-center">
        <canvas id="trust-chart-scene"></canvas>
        <div class="trust-stat" id="trust-counter">0</div>
        <div class="text-[14px] text-[var(--text-muted)] mt-[8px]">Availability SLA</div>
      </div>
    </div>
  </div>
</section>

<section id="waitlist" class="final-cta">
  <canvas id="waitlist-particles"></canvas>
  <div class="container relative z-10">
    <h2 class="text-[40px] font-bold mb-[16px] tracking-tight text-[var(--text)]">Secure your early access.</h2>
    <p class="text-[18px] text-[var(--text-muted)] max-w-[500px] mx-auto leading-relaxed">Join the waitlist. We are rolling out access to the beta program in batches.</p>
    
    <div id="waitlist-form-container">
      <form class="waitlist-form relative" id="waitlist-form">
        <input type="email" id="waitlist-email" placeholder="name@company.com" class="waitlist-input" required autocomplete="email" />
        <button type="button" id="waitlist-submit-btn" class="waitlist-btn">Join waitlist</button>
      </form>
      <div id="waitlist-error" class="hidden text-center text-[var(--error)] text-[14px] mt-[16px]">Please enter a valid email address</div>
    </div>

    <div id="waitlist-success" class="hidden my-[48px] max-w-[480px] mx-auto text-center p-[40px] border border-[var(--success)] bg-[rgba(0,212,184,0.05)] rounded-[20px]">
      <div class="success-icon-anim w-[64px] h-[64px] mx-auto bg-[var(--success)] rounded-full flex items-center justify-center text-[#0B0F1A] mb-[24px]">
        <svg width="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <h3 class="text-[24px] font-semibold text-[var(--text)] mb-[12px]">You're on the list</h3>
      <p class="text-[15px] text-[var(--text-muted)]">We will be in touch soon with your exclusive beta invite.</p>
    </div>
    
    <div class="waitlist-note mt-[24px]">No spam, ever. Unsubscribe at any time.</div>
  </div>
</section>

<footer>
  <div class="container inner border-t border-[var(--border)] pt-[32px] mt-[32px]">
    <div class="logo-mark"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-1)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg> LYNK</div>
    <div class="foot-links">
      <a href="#why">Why LYNK</a>
      <a href="#how">How it works</a>
    </div>
    <div class="flex gap-[24px]">
      <a href="mailto:partnerships@lynk.app">partnerships@lynk.app</a>
      <div class="">&copy; 2025 LYNK Inc. All rights reserved.</div>
    </div>
  </div>
</footer>

<script type="module" src="/src/main.js"></script>
<script type="module" src="/src/three-scene-advanced.js"></script>
</body>
</html>
`;

fs.writeFileSync('index.html', head + nav + hero + why + how + linksSection + pricing + trustAndWaitlist);
console.log('Successfully wrote index.html');
