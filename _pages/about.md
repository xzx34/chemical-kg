---
permalink: /
title: ""
excerpt: ""
author_profile: false
redirect_from:
  - /about/
  - /about.html
---

<div class="kg-home" data-page="home">
  <section class="kg-home-hero kg-shell">
    <div class="kg-home-hero__copy" data-reveal="up">
      <p class="kg-eyebrow">Flue Gas Control Atlas</p>
      <h1>燃煤机组烟气净化知识图谱</h1>
      <p class="kg-hero__text">
        覆盖 SCR 脱硝、FGD 湿法脱硫、WESP 湿式电除尘与烟囱 CEMS 在线监测，聚焦工艺链、关键设备、运行操作与异常处置。
      </p>
      <div class="kg-hero__actions">
        <a class="kg-button kg-button--primary" href="{{ '/systems/' | relative_url }}">查看处理链</a>
        <a class="kg-button kg-button--ghost" href="{{ '/graph/' | relative_url }}">查看系统图谱</a>
      </div>
    </div>
    <div class="kg-home-hero__aside" data-reveal="up" data-delay="120">
      <div class="kg-orbit-card kg-home-callout">
        <p class="kg-kicker">Main Route</p>
        <div class="kg-orbit-card__rings">
          <span>BLR</span>
          <span>SCR</span>
          <span>FGD</span>
          <span>WESP</span>
          <span>CEMS</span>
        </div>
        <p class="kg-muted">锅炉出口烟气依次经过脱硝、脱硫、湿电除尘，最终在烟囱排口完成在线监测。</p>
      </div>
      <div class="kg-stat-grid" id="kg-stat-grid"></div>
    </div>
  </section>

  <section class="kg-shell kg-section" data-reveal="up">
    <div class="kg-section__head kg-section__head--wide">
      <div>
        <p class="kg-kicker">Process Route</p>
        <h2>烟气处理路径</h2>
      </div>
      <a class="kg-inline-link" href="{{ '/systems/' | relative_url }}">查看系统分解</a>
    </div>
    <div class="kg-process-route" id="kg-process-route"></div>
  </section>

  <section class="kg-shell kg-section" data-reveal="up">
    <div class="kg-section__head kg-section__head--wide">
      <div>
        <p class="kg-kicker">Systems</p>
        <h2>系统入口</h2>
      </div>
      <a class="kg-inline-link" href="{{ '/systems/' | relative_url }}">进入系统总览</a>
    </div>
    <div class="kg-system-grid kg-system-grid--hero" id="kg-system-grid"></div>
  </section>

  <section class="kg-shell kg-section kg-section--layers" data-reveal="up">
    <div class="kg-section__head">
      <p class="kg-kicker">Monitoring</p>
      <h2>关键监测与排口指标</h2>
    </div>
    <div class="kg-monitor-board" id="kg-monitor-board"></div>
  </section>

  <section class="kg-shell kg-section kg-section--spotlight" data-reveal="up">
    <div class="kg-section__head kg-section__head--wide">
      <div>
        <p class="kg-kicker">Knowledge View</p>
        <h2>系统关系预览</h2>
      </div>
      <a class="kg-inline-link" href="{{ '/graph/' | relative_url }}">进入可视化图谱</a>
    </div>
    <div class="kg-preview-panel">
      <div class="kg-preview-canvas">
        <svg id="kg-home-graph" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid meet"></svg>
      </div>
      <div class="kg-preview-detail" id="kg-preview-detail"></div>
    </div>
  </section>
</div>
