
(function () {
  const typeLabelMap = { System: "系统", Equipment: "设备", Operation: "操作", Fault: "故障" };

  async function boot() {
    const root = document.querySelector('[data-page]');
    if (!root) return;
    const page = root.dataset.page;
    const payload = await fetch(withBase('/assets/data/demo_payload.json')).then((r) => r.json());
    if (page === 'home') renderHome(payload);
    if (page === 'graph') renderGraphPage(payload);
  }

  function withBase(path) {
    const base = document.documentElement.getAttribute('data-baseurl') || '';
    return `${base}${path}`.replace(/\/\//g, '/');
  }

  function nodeMap(payload) {
    return new Map(payload.nodes.map((node) => [node.id, node]));
  }

  function renderHome(payload) {
    const stats = [
      ['核心节点', payload.stats.core_nodes],
      ['关系连线', payload.stats.core_links],
      ['证据文档', payload.stats.documents],
      ['系统分区', payload.stats.systems],
    ];
    const statGrid = document.getElementById('kg-stat-grid');
    statGrid.innerHTML = stats.map(([label, value]) => `<div class="kg-stat-card"><span>${label}</span><strong>${value}</strong></div>`).join('');

    const systemGrid = document.getElementById('kg-system-grid');
    systemGrid.innerHTML = payload.systems.map((system) => `
      <a class="kg-system-card" href="${withBase('/graph/')}?system=${encodeURIComponent(system.id)}">
        <p class="kg-kicker">System</p>
        <h3>${system.name}</h3>
        <div class="kg-meta-row">
          <span class="kg-pill">${system.equipment_count} 设备</span>
          <span class="kg-pill">${system.operation_count} 操作</span>
          <span class="kg-pill">${system.fault_count} 故障</span>
        </div>
      </a>
    `).join('');

    const currentSystem = payload.systems[0];
    if (!currentSystem) return;
    const nodes = payload.nodes.filter((node) => currentSystem.members.includes(node.id));
    const links = payload.links.filter((link) => currentSystem.members.includes(link.source) && currentSystem.members.includes(link.target));
    const selectedId = currentSystem.id;
    renderSvg(document.getElementById('kg-home-graph'), nodes, links, selectedId, currentSystem.id);
    renderNodeDetail(document.getElementById('kg-preview-detail'), payload, selectedId);
  }

  function renderGraphPage(payload) {
    const params = new URLSearchParams(location.search);
    let currentSystemId = params.get('system') || payload.systems[0]?.id;
    let currentFilter = 'all';
    let currentNodeId = currentSystemId;

    const systemList = document.getElementById('kg-system-list');
    const detailPane = document.getElementById('kg-detail-pane');
    const canvas = document.getElementById('kg-graph-canvas');

    document.querySelectorAll('.kg-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.kg-chip').forEach((item) => item.classList.remove('is-active'));
        chip.classList.add('is-active');
        currentFilter = chip.dataset.filter;
        draw();
      });
    });

    function drawSystems() {
      systemList.innerHTML = payload.systems.map((system) => `
        <button class="kg-system-card ${system.id === currentSystemId ? 'is-active' : ''}" data-system-id="${system.id}">
          <p class="kg-kicker">System</p>
          <h3>${system.name}</h3>
          <div class="kg-meta-row">
            <span class="kg-pill">${system.equipment_count} 设备</span>
            <span class="kg-pill">${system.operation_count} 操作</span>
            <span class="kg-pill">${system.fault_count} 故障</span>
          </div>
        </button>
      `).join('');
      systemList.querySelectorAll('[data-system-id]').forEach((button) => {
        button.addEventListener('click', () => {
          currentSystemId = button.dataset.systemId;
          currentNodeId = currentSystemId;
          draw();
        });
      });
    }

    function draw() {
      drawSystems();
      const system = payload.systems.find((item) => item.id === currentSystemId) || payload.systems[0];
      const nodes = payload.nodes.filter((node) => system.members.includes(node.id)).filter((node) => currentFilter === 'all' || node.id === system.id || node.type === currentFilter);
      const nodeIds = new Set(nodes.map((node) => node.id));
      const links = payload.links.filter((link) => nodeIds.has(link.source) && nodeIds.has(link.target));
      document.getElementById('kg-canvas-title').textContent = `${system.name} · 知识星图`;
      document.getElementById('kg-canvas-subtitle').textContent = `${system.document_count} 份文档参与了这个系统的知识骨架构建`;
      document.getElementById('kg-story-grid').innerHTML = `
        <div class="kg-story-card"><span class="kg-kicker">设备簇</span><strong>${system.equipment_count}</strong></div>
        <div class="kg-story-card"><span class="kg-kicker">操作簇</span><strong>${system.operation_count}</strong></div>
        <div class="kg-story-card"><span class="kg-kicker">故障簇</span><strong>${system.fault_count}</strong></div>
      `;
      renderSvg(canvas, nodes, links, currentNodeId, system.id, (nodeId) => {
        currentNodeId = nodeId;
        draw();
      });
      renderNodeDetail(detailPane, payload, currentNodeId || system.id);
    }

    draw();
  }

  function renderSvg(svg, nodes, links, selectedId, systemId, onClick) {
    const grouped = {
      System: nodes.filter((node) => node.type === 'System'),
      Equipment: nodes.filter((node) => node.type === 'Equipment'),
      Operation: nodes.filter((node) => node.type === 'Operation'),
      Fault: nodes.filter((node) => node.type === 'Fault'),
    };
    const layout = new Map();
    if (grouped.System[0]) layout.set(grouped.System[0].id, { x: 500, y: 360, r: 54 });
    placeGroup(grouped.Equipment, layout, { cx: 300, cy: 360, rx: 210, ry: 220, r: 30 });
    placeGroup(grouped.Operation, layout, { cx: 730, cy: 245, rx: 195, ry: 160, r: 24 });
    placeGroup(grouped.Fault, layout, { cx: 730, cy: 530, rx: 185, ry: 170, r: 24 });

    const related = new Set([selectedId]);
    links.forEach((link) => {
      if (link.source === selectedId) related.add(link.target);
      if (link.target === selectedId) related.add(link.source);
    });

    svg.innerHTML = '';
    links.forEach((link) => {
      const a = layout.get(link.source);
      const b = layout.get(link.target);
      if (!a || !b) return;
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', a.x); line.setAttribute('y1', a.y);
      line.setAttribute('x2', b.x); line.setAttribute('y2', b.y);
      line.setAttribute('class', `kg-svg-link ${(link.source === selectedId || link.target === selectedId) ? 'is-focus' : ''}`);
      svg.appendChild(line);
    });

    nodes.forEach((node) => {
      const pos = layout.get(node.id); if (!pos) return;
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      const dimmed = selectedId && !related.has(node.id) && node.id !== systemId;
      g.setAttribute('class', `kg-svg-node kg-type-${node.type} ${node.id === selectedId ? 'is-selected' : ''} ${dimmed ? 'is-dimmed' : ''}`);
      g.setAttribute('transform', `translate(${pos.x}, ${pos.y})`);
      if (onClick) g.addEventListener('click', () => onClick(node.id));
      const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      c.setAttribute('r', pos.r); g.appendChild(c);
      const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      t.setAttribute('dy', '0.35em');
      t.textContent = node.name.length > 8 ? `${node.name.slice(0, 8)}…` : node.name;
      g.appendChild(t);
      svg.appendChild(g);
    });
  }

  function placeGroup(nodes, layout, cfg) {
    if (!nodes.length) return;
    nodes.forEach((node, index) => {
      const angle = (-Math.PI / 2) + (index / nodes.length) * Math.PI * 2;
      layout.set(node.id, { x: cfg.cx + Math.cos(angle) * cfg.rx, y: cfg.cy + Math.sin(angle) * cfg.ry, r: cfg.r });
    });
  }

  function renderNodeDetail(container, payload, nodeId) {
    const map = nodeMap(payload);
    const node = map.get(nodeId);
    if (!node) {
      container.innerHTML = '<div class="kg-detail-card"><p class="kg-muted">当前没有可展示内容。</p></div>';
      return;
    }
    const evidence = payload.evidence[node.id] || [];
    const sections = [
      ['功能说明', node.function ? [node.function] : []],
      ['关键参数', node.key_parameters || []],
      ['关联操作', node.common_operations || node.applies_to || []],
      ['常见故障', node.common_faults || []],
      ['前置条件', node.preconditions || []],
      ['执行步骤', node.steps || []],
      ['风险提示', node.risks || []],
      ['故障现象', node.symptoms || []],
      ['可能原因', node.possible_causes || []],
      ['处置动作', node.actions || []],
    ].filter(([, values]) => values && values.length);

    container.innerHTML = `
      <div class="kg-detail-card">
        <p class="kg-kicker">${typeLabelMap[node.type] || node.type}</p>
        <h3>${node.name}</h3>
        <p class="kg-muted">${node.system || `${node.evidence_count || 0} 份证据文档支撑`}</p>
      </div>
      ${sections.map(([title, values]) => `
        <div class="kg-detail-card">
          <h4>${title}</h4>
          <div class="kg-detail-list">${values.slice(0, 6).map((value) => `<div class="kg-detail-item">${value}</div>`).join('')}</div>
        </div>
      `).join('')}
      <div class="kg-detail-card">
        <h4>证据文档</h4>
        <div class="kg-evidence-list">
          ${evidence.length ? evidence.slice(0, 8).map((doc) => `
            <div class="kg-evidence-item">
              <strong>${doc.name}</strong>
              <div class="kg-muted">${doc.category} · ${doc.suffix.toUpperCase()} · ${doc.char_count || 0} chars</div>
              ${doc.preview ? `<div class="kg-muted">${doc.preview}</div>` : ''}
            </div>
          `).join('') : '<div class="kg-evidence-item">当前还没有挂接到证据文档。</div>'}
        </div>
      </div>
    `;
  }

  document.addEventListener('DOMContentLoaded', boot);
})();
