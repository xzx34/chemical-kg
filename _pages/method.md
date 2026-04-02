---
permalink: /method/
title: "证据与方法"
author_profile: false
---

<div class="kg-method-page">
  <section class="kg-section">
    <div class="kg-section__head">
      <p class="kg-kicker">Method</p>
      <h1 class="kg-page-title">证据与方法</h1>
      <p class="kg-lead">
        当前站点优先解决“可展示、可扩展、可发布”的骨架问题，因此知识图谱先做轻量本体，再逐步补正文抽取和大模型归一化。
      </p>
    </div>
  </section>

  <section class="kg-method-grid">
    <article class="kg-note-card">
      <h3>第一阶段目标</h3>
      <p>把脱硫脱硝运维资料整理成 GitHub Pages 可发布的知识图谱站点，先形成系统、设备、操作、故障和证据文档的基础结构。</p>
    </article>
    <article class="kg-note-card">
      <h3>当前图谱本体</h3>
      <p>节点控制在 System、Equipment、Operation、Fault、Document 五类，关系以 HAS_EQUIPMENT、HAS_OPERATION、HAS_FAULT、EVIDENCE_FOR 为主。</p>
    </article>
    <article class="kg-note-card">
      <h3>后续填充方向</h3>
      <p>后续将继续补设备功能、操作步骤、故障现象、原因和处置措施，并接入强模型 API 做结构化归一化和问答链路。</p>
    </article>
  </section>

  <section class="kg-section">
    <div class="kg-section__head">
      <p class="kg-kicker">Roadmap</p>
      <h2>施工路线</h2>
    </div>
    <div class="kg-timeline">
      <div class="kg-timeline__item">
        <span>01</span>
        <div><h3>站点骨架</h3><p>重构模板，完成首页、图谱页、方法页和 GitHub Pages 发布结构。</p></div>
      </div>
      <div class="kg-timeline__item">
        <span>02</span>
        <div><h3>图谱骨架</h3><p>先用轻量 payload 驱动系统级可视化，保证页面可展示、可导航、可讲述。</p></div>
      </div>
      <div class="kg-timeline__item">
        <span>03</span>
        <div><h3>图谱填充</h3><p>持续回填设备功能、参数、故障与操作细节，逐步替换占位内容。</p></div>
      </div>
      <div class="kg-timeline__item">
        <span>04</span>
        <div><h3>问答与训练</h3><p>接入强模型 API、证据回链和 QA 数据采集，服务于后续小模型 SFT。</p></div>
      </div>
    </div>
  </section>
</div>
