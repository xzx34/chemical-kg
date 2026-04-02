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
      <p class="kg-eyebrow">Flue Gas Treatment Atlas</p>
      <h1>围绕 SCR、FGD、WESP 与 CEMS 的工业知识门户</h1>
      <p class="kg-hero__text">
        站点不再泛泛地谈“化工知识图谱”，而是直接围绕实际烟气处理路径组织页面。用户先看到工艺主链，再进入系统层、设备层、操作层和故障层。
      </p>
      <div class="kg-hero__actions">
        <a class="kg-button kg-button--primary" href="{{ '/systems/' | relative_url }}">查看处理链</a>
        <a class="kg-button kg-button--ghost" href="{{ '/graph/' | relative_url }}">进入图谱浏览</a>
      </div>
    </div>
    <div class="kg-home-hero__aside" data-reveal="up" data-delay="120">
      <div class="kg-orbit-card">
        <p class="kg-kicker">Main Route</p>
        <div class="kg-orbit-card__rings">
          <span>BLR</span>
          <span>SCR</span>
          <span>FGD</span>
          <span>WESP</span>
          <span>CEMS</span>
        </div>
        <p class="kg-muted">主流程固定为锅炉 -> 脱硝 -> 脱硫 -> 湿电除尘 -> 烟囱在线监测，页面结构完全服务于这条链。</p>
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
      <a class="kg-inline-link" href="{{ '/systems/' | relative_url }}">按系统展开</a>
    </div>
    <div class="kg-process-route" id="kg-process-route"></div>
  </section>

  <section class="kg-shell kg-section" data-reveal="up">
    <div class="kg-section__head kg-section__head--wide">
      <div>
        <p class="kg-kicker">System Entry</p>
        <h2>三大系统入口</h2>
      </div>
      <a class="kg-inline-link" href="{{ '/systems/' | relative_url }}">查看完整结构</a>
    </div>
    <div class="kg-system-grid kg-system-grid--hero" id="kg-system-grid"></div>
  </section>

  <section class="kg-shell kg-section kg-section--layers" data-reveal="up">
    <div class="kg-section__head">
      <p class="kg-kicker">Monitoring</p>
      <h2>CEMS 与关键监测点</h2>
    </div>
    <div class="kg-monitor-board" id="kg-monitor-board"></div>
  </section>

  <section class="kg-shell kg-section kg-section--spotlight" data-reveal="up">
    <div class="kg-section__head kg-section__head--wide">
      <div>
        <p class="kg-kicker">Live Preview</p>
        <h2>系统级图谱预览</h2>
      </div>
      <a class="kg-inline-link" href="{{ '/graph/' | relative_url }}">进入可视化浏览器</a>
    </div>
    <div class="kg-preview-panel">
      <div class="kg-preview-canvas">
        <svg id="kg-home-graph" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid meet"></svg>
      </div>
      <div class="kg-preview-detail" id="kg-preview-detail"></div>
    </div>
  </section>
</div>
