import React, { useEffect, useRef, useState, FormEvent } from 'react';
import { initThreeScenes, cleanupThreeScenes } from './three-scene-advanced.js';

export default function App() {
  const navRef = useRef<HTMLDivElement>(null);
  const trustCounterRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [waitlistState, setWaitlistState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    // 1. Mount Three.js Scenes
    initThreeScenes();

    // 2. Scrolled Nav Logic
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY > 20) {
          navRef.current.classList.add('scrolled');
        } else {
          navRef.current.classList.remove('scrolled');
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 3. Scroll Reveals
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 4. Trust Counter Animation
    const counterEl = trustCounterRef.current;
    let hasRun = false;
    const counterObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasRun && counterEl) {
        hasRun = true;
        let start = 0;
        const end = 85;
        const duration = 1400;
        const startTime = performance.now();
        
        function update(currentTime: number) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // ease out cubic
          const ease = 1 - Math.pow(1 - progress, 3);
          const current = start + (end - start) * ease;
          
          if (counterEl) {
            counterEl.innerHTML = Math.round(current) + '<span>%</span>';
          }
          
          if (progress < 1) {
            requestAnimationFrame(update);
          } else if (counterEl) {
            counterEl.innerHTML = '85<span>%</span>';
          }
        }
        requestAnimationFrame(update);
      }
    }, { threshold: 0.5 });
    
    if (counterEl) counterObserver.observe(counterEl);

    // 5. Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      counterObserver.disconnect();
      cleanupThreeScenes();
    }
  }, []);

  const handleWaitlistSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    
    // Validate
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.') || cleanEmail.length < 5) {
      setWaitlistState('error');
      return;
    }

    setWaitlistState('loading');

    const WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbzDkvr8Sej7qTL4Ar78PS4QErR1Bx_0fwBJ6wIEeP3G2zYuoaU2jzO4X4ineoTlEF3irQ/exec';
    const formData = new FormData();
    formData.append('email', cleanEmail);

    fetch(WEBAPP_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    }).then(() => {
      setWaitlistState('success');
      setTimeout(() => {
        setWaitlistState('idle');
        setEmail('');
      }, 3500);
    }).catch(err => {
      console.error('Waitlist submit error:', err);
      setWaitlistState('idle');
    });
  };

  return (
    <>
      <nav ref={navRef}>
        <div className="container inner">
          <a href="#" className="logo">LYNK</a>
          <div className="nav-links">
            <a href="#features">Infrastructure</a>
            <a href="#how-it-works">Mechanics</a>
            <a href="#pricing">Economics</a>
          </div>
        </div>
      </nav>

      <section className="pb-12 pt-8">
        <div className="container">
          <div className="hero-grid reveal">
            <div className="hero-content">
              <div className="eyebrow mb-6">CROSS-BORDER FINANCIAL INFRASTRUCTURE · RWANDA</div>
              <h1 className="hero-headline font-serif italic mb-8">
                Money moves <span className="wave-underline">differently</span><br/> across Africa.
              </h1>
              <p className="font-sans text-[18px] text-[var(--ink-body)] max-w-[480px] mb-12">
                LYNK is a new kind of payment rail, built in Kigali, serving the continent. We move your money between African countries in ten seconds, at fees you can read without a magnifying glass.
              </p>
              <div className="flex items-center gap-8">
                <a href="#waitlist" className="btn-primary">Join the waitlist</a>
                <a href="#features" className="text-link">Read our thesis &rarr;</a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-glow"></div>
              <canvas id="webgl-hero-container"></canvas>
            </div>
          </div>
          
          <div className="hero-meta-row reveal">
            <div>RWF &times; NGN &times; KES &times; GHS &times; TZS</div>
            <div className="hidden md:block w-1 h-1 bg-[var(--ink-faint)] rounded-full"></div>
            <div>REGULATED UNDER BNR</div>
            <div className="hidden md:block w-1 h-1 bg-[var(--ink-faint)] rounded-full"></div>
            <div>PRE-LAUNCH &middot; Q1 2026</div>
          </div>
        </div>
      </section>

      <section id="features" className="bg-soft">
        <div className="container">
          <div className="eyebrow mb-6 reveal">WHAT MAKES LYNK DIFFERENT</div>
          <div className="features-grid">
            <div className="feature-col reveal">
              <div className="feature-item">
                <div className="feature-num">01</div>
                <h3 className="font-serif text-[28px] text-[var(--ink)] mb-4">10-second settlement</h3>
                <p>USDC on Solana handles cross-border settlement in under a second. Local fiat legs take another few seconds. Total delivery time: under 10 seconds, any African country to any other.</p>
              </div>
              <div className="feature-item">
                <div className="feature-num">02</div>
                <h3 className="font-serif text-[28px] text-[var(--ink)] mb-4">Regulated in Rwanda</h3>
                <p>Registered with the Rwanda Development Board. Engaging early with the National Bank of Rwanda. Compliance-first architecture from day one — AML, KYC built into the core.</p>
              </div>
              <div className="feature-item">
                <div className="feature-num">03</div>
                <h3 className="font-serif text-[28px] text-[var(--ink)] mb-4">Transparent unit economics</h3>
                <p>A flat 1.5% fee plus $0.99 per transaction. Mid-market FX rate published in real time. No hidden exchange rate spreads. What you see is what your recipient gets.</p>
              </div>
            </div>
            <div className="feature-col reveal">
              <div className="feature-item">
                <div className="feature-num">04</div>
                <h3 className="font-serif text-[28px] text-[var(--ink)] mb-4">Payment Links — a category first</h3>
                <p>Generate a shareable URL that anyone in any country can pay. Sender pays in their currency. Recipient receives in theirs. Built for WhatsApp, Instagram bios, freelancers.</p>
              </div>
              <div className="feature-item">
                <div className="feature-num">05</div>
                <h3 className="font-serif text-[28px] text-[var(--ink)] mb-4">Provider-agnostic infrastructure</h3>
                <p>Built with a provider abstraction layer. Integrates with multiple partners. Routes each transaction to the best available rail automatically. No single point of failure.</p>
              </div>
              <div className="feature-item">
                <div className="feature-num">06</div>
                <h3 className="font-serif text-[28px] text-[var(--ink)] mb-4">Africa-native, not Africa-adapted</h3>
                <p>Built in Kigali by Africans who've lived the problem. Launching on the Nigeria-Rwanda-Kenya corridor. Expanding to Ghana, Tanzania, Uganda, and South Africa.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works">
        <div className="container">
          <div className="text-center max-w-[720px] mx-auto reveal">
            <div className="eyebrow mb-6">HOW IT WORKS</div>
            <h2 className="section-headline mb-6">Three steps. Any country. Any currency.</h2>
            <p className="text-[20px] text-[var(--ink-muted)]">No physical branches, no waiting days, no deciphering fee schedules. Just pick who, how much, and tap send.</p>
          </div>
          
          <div className="steps-grid reveal">
            <div>
              <div className="step-num">01</div>
              <h3 className="font-serif font-medium text-[24px] text-[var(--ink)] mb-4">Choose a recipient</h3>
              <p className="text-[15px]">Pick from your contacts or paste a phone number. Works in 8 countries at launch, more on the way.</p>
            </div>
            <div>
              <div className="step-num">02</div>
              <h3 className="font-serif font-medium text-[24px] text-[var(--ink)] mb-4">See the exact rate</h3>
              <p className="text-[15px]">The mid-market rate, our rate, and the fee — side by side, always. No hidden markup buried in the FX.</p>
            </div>
            <div>
              <div className="step-num">03</div>
              <h3 className="font-serif font-medium text-[24px] text-[var(--ink)] mb-4">Send in 10 seconds</h3>
              <p className="text-[15px]">Auth with FaceID and the money is delivered instantly to their mobile money wallet or bank account.</p>
            </div>
          </div>
          
          <div className="mt-24 text-center reveal">
            <p className="pull-quote max-w-[720px] mx-auto">"What takes banks three days, we do before your tea gets cold."</p>
          </div>
        </div>
      </section>

      <section id="payment-links" className="bg-soft">
        <div className="container showcase-grid">
          <div className="reveal">
            <div className="eyebrow mb-6">PAYMENT LINKS</div>
            <h2 className="section-headline mb-8">Get paid across borders, without writing code.</h2>
            <p className="text-[18px] mb-8">Generate a universal payment link. Share it on WhatsApp, email, or your invoice. Let anyone in Africa pay you in their local currency.</p>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-[16px]">
                <span className="text-[var(--ochre)] font-serif mt-1">&rarr;</span>
                <span>No app required — Sender pays via web interface</span>
              </li>
              <li className="flex items-start gap-3 text-[16px]">
                <span className="text-[var(--ochre)] font-serif mt-1">&rarr;</span>
                <span>Multi-channel — Works seamlessly in WhatsApp & Instagram</span>
              </li>
              <li className="flex items-start gap-3 text-[16px]">
                <span className="text-[var(--ochre)] font-serif mt-1">&rarr;</span>
                <span>Instant settlement — Funds land in your wallet immediately</span>
              </li>
            </ul>
          </div>
          <div className="showcase-visual reveal">
            <canvas id="webgl-card-container"></canvas>
          </div>
        </div>
      </section>

      <section id="personas">
        <div className="container reveal">
          <div className="rule-line-small mb-12"></div>
          <div className="personas-grid">
            <div className="persona-item">
              <div className="eyebrow mb-4">FREELANCER</div>
              <p className="font-serif italic text-[20px] text-[var(--ink)] mb-4">"I finally stopped losing 8% of my income to arbitrary exchange rates when clients in Kenya pay me."</p>
              <p className="text-[14px] text-[var(--ink-muted)]">Kigali, Rwanda</p>
            </div>
            <div className="persona-item">
              <div className="eyebrow mb-4">MERCHANT</div>
              <p className="font-serif italic text-[20px] text-[var(--ink)] mb-4">"I send a link on WhatsApp, they pay with M-PESA, I receive Naira in seconds."</p>
              <p className="text-[14px] text-[var(--ink-muted)]">Lagos, Nigeria</p>
            </div>
            <div className="persona-item">
              <div className="eyebrow mb-4">FAMILY</div>
              <p className="font-serif italic text-[20px] text-[var(--ink)] mb-4">"Supporting my sister in university in Accra is finally as fast as sending a text message."</p>
              <p className="text-[14px] text-[var(--ink-muted)]">Nairobi, Kenya</p>
            </div>
            <div className="persona-item">
              <div className="eyebrow mb-4">STARTUP</div>
              <p className="font-serif italic text-[20px] text-[var(--ink)] mb-4">"We pay our remote contractors across four countries with a single click. Compliance is built in."</p>
              <p className="text-[14px] text-[var(--ink-muted)]">Cape Town, SA</p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-soft">
        <div className="container reveal">
          <div className="text-center max-w-[720px] mx-auto mb-16">
            <div className="eyebrow mb-6">DYNAMIC PRICING</div>
            <h2 className="section-headline mb-6">Real mid-market rates. Transparent fee.</h2>
            <p className="text-[20px] text-[var(--ink-muted)]">We built LYNK to end the era of hidden FX spreads. Our unit economics are clear and published.</p>
          </div>
          
          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="pricing-monogram">i</div>
              <h3 className="font-serif font-medium text-[22px] text-[var(--ink)] mb-4">Individuals</h3>
              <p className="text-[15px] mb-6">For personal remittances and family support. Send up to $1,000/day.</p>
              <div className="font-mono text-[var(--forest)] text-[15px]">1.5% + $0.99</div>
            </div>
            <div className="pricing-card">
              <div className="pricing-monogram">B</div>
              <h3 className="font-serif font-medium text-[22px] text-[var(--ink)] mb-4">Freelancers & Businesses</h3>
              <p className="text-[15px] mb-6">Payment links, invoicing, and higher limits. Verified business accounts.</p>
              <div className="font-mono text-[var(--forest)] text-[15px]">1.2% + $0.99</div>
            </div>
            <div className="pricing-card">
              <div className="pricing-monogram">I</div>
              <h3 className="font-serif font-medium text-[22px] text-[var(--ink)] mb-4">Institutions</h3>
              <p className="text-[15px] mb-6">API access for bulk payouts and platform integrations. Custom SLAs.</p>
              <div className="font-mono text-[var(--forest)] text-[15px]">Custom volume pricing</div>
            </div>
          </div>
        </div>
      </section>

      <section id="trust">
        <div className="container reveal trust-block">
          <div id="trust-counter-container">
            <div className="trust-number" id="trust-counter" ref={trustCounterRef}>0</div>
            <p className="font-serif italic text-[20px] mb-2">of surveyed Africans said they'd switch to LYNK</p>
            <p className="font-mono text-[14px] text-[var(--ink-muted)]">n = 34, across 8 countries</p>
          </div>
          
          <div className="rule-line-small my-12"></div>
          
          <div className="trust-indicators">
            <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[var(--ochre)] rounded-full"></div> End-to-end fiat legs</div>
            <div className="hidden md:block text-[var(--ink-muted)]">&middot;</div>
            <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[var(--ochre)] rounded-full"></div> Real-time monitoring</div>
            <div className="hidden md:block text-[var(--ink-muted)]">&middot;</div>
            <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[var(--ochre)] rounded-full"></div> Automated AML/KYC</div>
          </div>
        </div>
      </section>

      <section id="partnerships" className="bg-soft">
        <div className="container reveal">
          <div className="max-w-[640px]">
            <div className="eyebrow mb-6">FOR PARTNERSHIP INQUIRIES</div>
            <h2 className="font-serif text-[36px] font-medium text-[var(--ink)] mb-6">Moving money is a team sport.</h2>
            <p className="text-[16px] mb-12">If you represent a licensed mobile money operator, commercial bank, or liquidity provider in our target markets, we'd like to talk about integrating your rails into the LYNK protocol.</p>
            
            <a href="mailto:partnerships@lynkpay.app" className="font-serif text-[24px] text-[var(--ink)] border-b-2 border-[var(--ochre)] pb-1 inline-flex items-center gap-4 hover:opacity-80 transition-opacity">
              partnerships@lynkpay.app
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            </a>
          </div>
        </div>
      </section>

      <section id="waitlist">
        <div className="container reveal text-center">
          <div className="eyebrow mb-6">JOIN THE WAITLIST</div>
          <h2 className="section-headline mb-6">Be among the first.</h2>
          <p className="text-[18px] max-w-[560px] mx-auto text-[var(--ink-muted)] mb-12">We are rolling out access to the closed beta program in deliberate batches to ensure network stability.</p>
          
          {waitlistState !== 'success' && (
            <div id="waitlist-form-container" className="max-w-[480px] mx-auto">
              <form id="waitlist-form" className="flex flex-col sm:flex-row gap-4" onSubmit={handleWaitlistSubmit}>
                <input 
                  type="email" 
                  id="waitlist-email" 
                  placeholder="Email address" 
                  className="waitlist-input" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                <button 
                  type="submit" 
                  id="waitlist-submit-btn" 
                  className="btn-primary"
                  disabled={waitlistState === 'loading'}
                  style={{ opacity: waitlistState === 'loading' ? 0.7 : 1 }}
                >
                  {waitlistState === 'loading' ? 'Joining...' : 'Join the list \u2192'}
                </button>
              </form>
              {waitlistState === 'error' && (
                <div id="waitlist-error" className="text-center text-[#E5484D] text-[14px] mt-4">Please enter a valid email address.</div>
              )}
            </div>
          )}
          
          {waitlistState === 'success' && (
            <div id="waitlist-success" className="max-w-[480px] mx-auto text-center mt-8">
              <div className="flex items-center justify-center gap-3 font-serif italic text-[24px] text-[var(--ink)]">
                You're on the list. We'll be in touch. <span className="text-[var(--ochre)]">✓</span>
              </div>
            </div>
          )}
        </div>
      </section>

      <footer className="pt-16 pb-8 border-t border-[var(--ink-rule)]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div>
              <div className="logo mb-2">LYNK</div>
              <p className="text-[14px] text-[var(--ink-muted)]">A new rail for African money.<br/>Kigali, Rwanda.</p>
            </div>
            <div>
              <div className="flex flex-col gap-3 text-[14px] text-[var(--ink-muted)]">
                <a href="#" className="hover:text-[var(--indigo)] transition-colors w-fit">Privacy Policy</a>
                <a href="#" className="hover:text-[var(--indigo)] transition-colors w-fit">Terms of Service</a>
                <a href="mailto:partnerships@lynkpay.app" className="hover:text-[var(--indigo)] transition-colors w-fit">Contact</a>
              </div>
            </div>
            <div className="md:text-right">
              <p className="font-mono text-[14px] text-[var(--ink-faint)]">&copy; 2026 LYNK Technologies</p>
            </div>
          </div>
          <div className="text-center">
            <p className="font-serif italic text-[14px] text-[var(--ink-faint)]">Built with intention, in Kigali</p>
          </div>
        </div>
      </footer>
    </>
  );
}
