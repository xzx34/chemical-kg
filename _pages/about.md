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
  <section class="kg-hero">
    <div class="kg-hero__copy">
      <p class="kg-eyebrow">Chemical Operations Knowledge Graph</p>
      <h1>化工运维知识图谱门户</h1>
      <p class="kg-hero__text">
        这是一个面向脱硫脱硝运维场景的知识图谱站点骨架。当前阶段先搭建系统、设备、操作、故障和证据回链的可视化门户，后续再持续细化图谱内容与问答能力。
      </p>
      <div class="kg-hero__actions">
        <a class="kg-button kg-button--primary" href="{{ '/graph/' | relative_url }}">进入图谱</a>
        <a class="kg-button kg-button--ghost" href="{{ '/method/' | relative_url }}">查看方法</a>
      </div>
    </div>
    <div class="kg-stat-grid" id="kg-stat-grid"></div>
  </section>

  <section class="kg-section">
    <div class="kg-section__head">
      <p class="kg-kicker">System Scope</p>
      <h2>系统入口</h2>
    </div>
    <div class="kg-system-grid" id="kg-system-grid"></div>
  </section>

  <section class="kg-section kg-section--spotlight">
    <div class="kg-section__head">
      <p class="kg-kicker">Preview</p>
      <h2>图谱骨架预览</h2>
    </div>
    <div class="kg-preview-panel">
      <div class="kg-preview-canvas">
        <svg id="kg-home-graph" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid meet"></svg>
      </div>
      <div class="kg-preview-detail" id="kg-preview-detail"></div>
    </div>
  </section>
</div>
