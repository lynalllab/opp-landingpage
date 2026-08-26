---
layout: default
title: Open Psychiatry Project
description: "Open science for mental health — connecting molecular data with real-world impact. A new UK platform making mental health biomarker data openly accessible."
---

<!-- ═══════════════════════════════════════════════════════════════
     HERO
     Edit: heading, taglines, button text, funding line
     Edit stat numbers: data-target attribute (integers) or hero-stat-value text (non-numeric)
     ═══════════════════════════════════════════════════════════════ -->
<section class="hero" id="home" aria-labelledby="hero-heading">
  <canvas id="hero-canvas" aria-hidden="true"></canvas>
  <div class="container">
    <span class="hero-badge">UKRI MRC &amp; NIHR Funded</span>
    <h1 id="hero-heading">Open Psychiatry Project</h1>
    <p class="hero-tagline">Open science for mental health &mdash; connecting molecular data with real-world impact.</p>
    <p class="hero-sub">{{ site.data.site.sub_tagline }}</p>
    <div class="hero-actions">
      <a href="{{ site.data.site.qualtrics_form_url }}" class="btn btn--primary js-register-open" target="_blank" rel="noopener">Register Your Interest &rarr;</a>
      <a href="#about" class="btn btn--outline-light">Learn more</a>
    </div>

    <!-- Stats row — numbers animate on page load -->
    <div class="hero-stats" role="list">
      <div class="hero-stat" role="listitem">
        <span class="hero-stat-value">
          &pound;<span class="stat-number" data-target="2.3" data-decimal="1">2.3</span>M
        </span>
        <span class="hero-stat-label">UKRI Funding</span>
      </div>
      <div class="hero-stat" role="listitem">
        <span class="hero-stat-value">
          <span class="stat-number" data-target="8">8</span>
        </span>
        <span class="hero-stat-label">Partner Institutions</span>
      </div>
      <div class="hero-stat" role="listitem">
        <span class="hero-stat-value">2</span>
        <span class="hero-stat-label">Lead Institutions</span>
      </div>
   
    </div>

    <p class="hero-funding"><strong>Funded by</strong> UKRI&rsquo;s Medical Research Council (MRC) and the National Institute for Health and Care Research (NIHR)</p>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════════
     ABOUT
     Edit: heading and body paragraphs below
     ═══════════════════════════════════════════════════════════════ -->
<section class="about" id="about" aria-labelledby="about-heading">
  <div class="container">
    <div class="about-inner reveal">
      <h2 id="about-heading">What is the Open Psychiatry Project?</h2>
      <p class="about-lead">The Open Psychiatry Project is a &pound;2.3M initiative building the UK&rsquo;s first open, publicly accessible resource for exploring how genes, cells, and molecules influence mental health conditions.</p>
      <p>Led by Dr Mary-Ellen Lynall at the University of Cambridge in partnership with Dr Ellen McDonagh at EMBL-EBI, the project extends the globally used Open Targets Platform &mdash; a major hub for drug and target discovery &mdash; to integrate a wide range of mental-health&ndash;relevant molecular datasets.</p>
      <p>The result will be an interactive website presenting clear, accessible summaries of potential biomarkers, drug targets, and treatments for mental health conditions. The platform is designed for everyone: researchers advancing the science, clinicians seeking new insights, industry partners identifying opportunities, and people with direct lived experience of mental illness.</p>
      <p>
      Our goal is to speed up the discovery of better, more personalised treatments for mental health conditions.
      </p>
      <div class="about-callout reveal reveal--delay-1">
        <p>Mental health biomarker data is currently fragmented across many platforms and secure environments, making it difficult to assess how genes and molecules affect mental health. This project changes that.</p>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════════
     HOW IT WORKS
     Edit: section heading below
     Edit feature cards in _data/features.yml
     ═══════════════════════════════════════════════════════════════ -->
<section class="how-it-works" id="how-it-works" aria-labelledby="how-heading">
  <div class="container">
    <h2 id="how-heading" class="reveal">How it works</h2>
    {% include features.html %}
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════════
     PARTNERS
     Edit: section heading below
     Add/remove partners in _data/partners.yml
     ═══════════════════════════════════════════════════════════════ -->
<section class="partners" id="partners" aria-labelledby="partners-heading">
  <div class="container">
    <h2 id="partners-heading" class="reveal">Our Partners</h2>
    {% include partners.html %}
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════════
     AUDIENCE — "BUILT FOR EVERYONE"
     Edit: heading, intro paragraph, and each card's heading + description
     ═══════════════════════════════════════════════════════════════ -->
<section class="audience" id="audience" aria-labelledby="audience-heading">
  <div class="container">
    <h2 id="audience-heading" class="reveal">Built for everyone</h2>
    <p class="audience-intro reveal reveal--delay-1">Whether you approach mental health from the bench, the clinic, industry, or your own lived experience &mdash; this platform is for you.</p>
    <div class="audience-grid">

      <div class="audience-card reveal">
        <div class="audience-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"/>
          </svg>
        </div>
        <h3>Researchers</h3>
        <p>Access curated molecular datasets, explore drug targets, and build on existing biomarker evidence to advance mental health science.</p>
      </div>

      <div class="audience-card reveal reveal--delay-1">
        <div class="audience-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
          </svg>
        </div>
        <h3>Health Professionals</h3>
        <p>Discover emerging evidence on genetic and molecular factors that may inform clinical decision-making and patient care.</p>
      </div>

      <div class="audience-card reveal reveal--delay-2">
        <div class="audience-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="20" x2="18" y2="10"/>
            <line x1="12" y1="20" x2="12" y2="4"/>
            <line x1="6"  y1="20" x2="6"  y2="14"/>
            <line x1="2"  y1="20" x2="22" y2="20"/>
          </svg>
        </div>
        <h3>Industry Partners</h3>
        <p>Identify validated drug targets and biomarkers to support R&amp;D pipelines in mental health therapeutics and diagnostics.</p>
      </div>

      <div class="audience-card reveal reveal--delay-3">
        <div class="audience-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </div>
        <h3>People with Lived Experience</h3>
        <p>Access plain-language summaries of the science and help shape how the platform evolves to meet your needs.</p>
      </div>

    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════════
     PROJECT TIMELINE
     Edit: heading, lede, and closing FAQs link below
     Edit each project's copy in _data/projects.yml
     ═══════════════════════════════════════════════════════════════ -->
<section class="timeline" id="timeline" aria-labelledby="timeline-heading">
  <div class="container">
    <h2 id="timeline-heading" data-anim>What you&rsquo;d be part of</h2>
    <p class="timeline-lede" data-anim>We have divided the main tasks into 3 different projects, running across the life of the award.</p>
    {% include timeline.html %}
  </div>
</section>

<!-- ═══════════════════════════════════════════════════════════════
     GET INVOLVED (register)
     Edit: pitch copy and "what it asks" summary in _includes/get-involved-section.html
     The form itself is external — see _data/site.yml: qualtrics_form_url
     ═══════════════════════════════════════════════════════════════ -->
<section id="register" aria-labelledby="register-heading">
  <div class="container">
    <h2 id="register-heading" class="reveal">Help shape this</h2>
    {% include get-involved-section.html %}
  </div>
</section>
