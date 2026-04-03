---
permalink: /systems/denitrification/
title: "脱硝系统"
author_profile: false
---

<div class="kg-system-page" data-page="system-home" data-system="denitrification">
  <section class="kg-page-hero kg-shell" data-reveal="up">
    <div class="kg-breadcrumbs"><a href="{{ '/' | relative_url }}">首页</a><span>/</span><strong>脱硝系统</strong></div>
    <div class="kg-system-hero" id="kg-system-hero"></div>
  </section>

  <section class="kg-shell kg-section" data-reveal="up">
    <div class="kg-section__head kg-section__head--wide">
      <div>
        <p class="kg-kicker">System Frame</p>
        <h2>系统框架</h2>
      </div>
      <p class="kg-muted">单页集中呈现系统层、设备层、操作层和故障层，不再继续拆分跳转。</p>
    </div>
    <div class="kg-layer-anchor-grid" id="kg-layer-entry"></div>
  </section>

  <section class="kg-shell kg-system-columns" data-reveal="up">
    <div class="kg-panel">
      <div class="kg-panel__head"><p class="kg-kicker">Units</p><h2>系统单元</h2></div>
      <div id="kg-unit-grid" class="kg-unit-grid"></div>
    </div>
    <div class="kg-panel">
      <div class="kg-panel__head"><p class="kg-kicker">Preview</p><h2>系统预览</h2></div>
      <div class="kg-mini-canvas"><svg id="kg-system-graph" viewBox="0 0 1000 620" preserveAspectRatio="xMidYMid meet"></svg></div>
    </div>
  </section>

  <section class="kg-shell kg-section" data-reveal="up">
    <div class="kg-section__head">
      <p class="kg-kicker">Process Interface</p>
      <h2>工艺接口与测点</h2>
    </div>
    <div class="kg-system-info-grid" id="kg-system-info-grid"></div>
  </section>

  <section class="kg-shell kg-section" data-reveal="up">
    <div class="kg-section__head">
      <p class="kg-kicker">Operations</p>
      <h2>运行关注</h2>
    </div>
    <div class="kg-system-focus-grid" id="kg-system-focus-grid"></div>
  </section>

  <section class="kg-shell kg-section" data-reveal="up" id="section-overview">
    <div class="kg-section__head">
      <p class="kg-kicker">Overview</p>
      <h2>系统层</h2>
    </div>
    <div class="kg-layer-grid" id="kg-layer-grid-overview"></div>
    <div class="kg-layer-detail-grid" id="kg-layer-summary-grid-overview"></div>
    <div class="kg-layer-detail-grid kg-layer-detail-grid--wide" id="kg-layer-detail-grid-overview"></div>
  </section>

  <section class="kg-shell kg-section" data-reveal="up" id="section-equipment">
    <div class="kg-section__head">
      <p class="kg-kicker">Equipment</p>
      <h2>设备层</h2>
    </div>
    <div class="kg-layer-grid" id="kg-layer-grid-equipment"></div>
    <div class="kg-layer-detail-grid" id="kg-layer-summary-grid-equipment"></div>
    <div class="kg-layer-detail-grid kg-layer-detail-grid--wide" id="kg-layer-detail-grid-equipment"></div>
  </section>

  <section class="kg-shell kg-section" data-reveal="up" id="section-operations">
    <div class="kg-section__head">
      <p class="kg-kicker">Operations</p>
      <h2>操作层</h2>
    </div>
    <div class="kg-layer-grid" id="kg-layer-grid-operations"></div>
    <div class="kg-layer-detail-grid" id="kg-layer-summary-grid-operations"></div>
    <div class="kg-layer-detail-grid kg-layer-detail-grid--wide" id="kg-layer-detail-grid-operations"></div>
  </section>

  <section class="kg-shell kg-section" data-reveal="up" id="section-faults">
    <div class="kg-section__head">
      <p class="kg-kicker">Faults</p>
      <h2>故障层</h2>
    </div>
    <div class="kg-layer-grid" id="kg-layer-grid-faults"></div>
    <div class="kg-layer-detail-grid" id="kg-layer-summary-grid-faults"></div>
    <div class="kg-layer-detail-grid kg-layer-detail-grid--wide" id="kg-layer-detail-grid-faults"></div>
  </section>
</div>
