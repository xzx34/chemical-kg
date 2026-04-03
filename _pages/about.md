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
        <a class="kg-button kg-button--primary" href="#kg-home-route">查看处理链</a>
        <a class="kg-button kg-button--ghost" href="#kg-home-systems">进入系统</a>
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

  <section class="kg-shell kg-section" data-reveal="up" id="kg-home-route">
    <div class="kg-section__head kg-section__head--wide">
      <div>
        <p class="kg-kicker">Process Route</p>
        <h2>烟气处理路径</h2>
      </div>
      <span class="kg-inline-link kg-inline-link--static">BLR -> SCR -> FGD -> WESP -> 烟囱</span>
    </div>
    <div class="kg-process-route" id="kg-process-route"></div>
  </section>

  <section class="kg-shell kg-section" data-reveal="up" id="kg-home-systems">
    <div class="kg-section__head kg-section__head--wide">
      <div>
        <p class="kg-kicker">Systems</p>
        <h2>系统入口</h2>
      </div>
      <span class="kg-inline-link kg-inline-link--static">选择一个方向进入单系统页面</span>
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
</div>
