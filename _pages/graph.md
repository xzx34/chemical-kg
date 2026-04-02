---
permalink: /graph/
title: "图谱系统"
author_profile: false
---

<div class="kg-graph-page" data-page="graph">
  <section class="kg-section kg-section--graph-head">
    <div class="kg-section__head kg-section__head--wide">
      <div>
        <p class="kg-kicker">Knowledge Canvas</p>
        <h1 class="kg-page-title">图谱系统</h1>
      </div>
      <div class="kg-filter-row">
        <button class="kg-chip is-active" data-filter="all">全部</button>
        <button class="kg-chip" data-filter="Equipment">设备</button>
        <button class="kg-chip" data-filter="Operation">操作</button>
        <button class="kg-chip" data-filter="Fault">故障</button>
      </div>
    </div>
  </section>

  <div class="kg-graph-layout">
    <aside class="kg-panel">
      <div class="kg-panel__head">
        <p class="kg-kicker">Systems</p>
        <h2>系统导航</h2>
      </div>
      <div id="kg-system-list" class="kg-system-list"></div>
    </aside>

    <section class="kg-panel kg-panel--canvas">
      <div class="kg-canvas-head">
        <div>
          <h2 id="kg-canvas-title">知识星图</h2>
          <p id="kg-canvas-subtitle" class="kg-muted"></p>
        </div>
        <div class="kg-story-grid" id="kg-story-grid"></div>
      </div>
      <div class="kg-canvas-wrap">
        <svg id="kg-graph-canvas" viewBox="0 0 1000 760" preserveAspectRatio="xMidYMid meet"></svg>
      </div>
    </section>

    <aside class="kg-panel">
      <div class="kg-panel__head">
        <p class="kg-kicker">Inspector</p>
        <h2>节点详情</h2>
      </div>
      <div id="kg-detail-pane"></div>
    </aside>
  </div>
</div>
