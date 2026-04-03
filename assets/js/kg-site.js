(function () {
  const typeLabelMap = { System: '系统', Equipment: '设备', Operation: '操作', Fault: '故障' };
  const layerLabelMap = { overview: '系统层', equipment: '设备层', operations: '操作层', faults: '故障层' };
  const PROCESS_ROUTE = [
    {
      code: 'BLR',
      title: '锅炉',
      target: '烟气源头',
      summary: '烟气自锅炉出口进入后续环保处理链。',
      bullets: ['锅炉出口形成原始烟气', '作为 SCR 入口前置工况'],
      action: null,
    },
    {
      code: 'SCR',
      title: 'SCR 脱硝反应器',
      target: '脱除 NOx',
      summary: '先完成氨喷射与催化反应，监测 SCR 入口与出口。',
      bullets: ['氨水喷射系统', '稀释风机', '催化剂层', 'CEMS：SCR 入口 / SCR 出口'],
      action: '/systems/denitrification/',
    },
    {
      code: 'FGD',
      title: 'FGD 吸收塔',
      target: '脱除 SO2',
      summary: '湿法脱硫主系统，围绕吸收塔、浆液循环和氧化风运行。',
      bullets: ['浆液循环泵（甲/乙/丙）', 'pH 控制、密度控制', '除雾器', '氧化风机', 'CEMS：脱硫出口'],
      action: '/systems/desulfurization/',
    },
    {
      code: 'WESP',
      title: '湿式电除尘器',
      target: '脱除粉尘',
      summary: '末端除尘与冲洗循环系统，承接脱硫后烟气。',
      bullets: ['高压供电', '冲洗循环', '气动阀甲/乙/丙/丁', 'CEMS：湿电出口'],
      action: '/systems/dedusting/',
    },
    {
      code: 'CEMS',
      title: '烟囱与在线监测',
      target: '最终排口',
      summary: '烟囱入口设置最终在线监测点，形成全链监管闭环。',
      bullets: ['SO2', 'NOx', '粉尘', 'O2', '温度 / 压力 / 流量 / 湿度'],
      action: null,
    },
  ];
  const SYSTEM_DEFS = {
    desulfurization: {
      title: '脱硫系统',
      code: 'FGD',
      index: '02',
      target: '脱除 SO2',
      route: 'SCR 后 -> WESP 前',
      lead: '围绕吸收塔、浆液循环、氧化空气和除雾出口监测构建的湿法脱硫主系统。',
      description: '系统重点覆盖吸收塔本体、浆液循环泵组、pH/密度控制、除雾器、氧化风机和脱硫出口监测。',
      sourceSystems: ['system::脱硫系统', 'system::石灰石系统', 'system::废水系统'],
      units: [
        { name: '吸收塔单元', text: '吸收 SO2 的核心反应空间，承接塔内浆液与烟气接触。' },
        { name: '浆液循环单元', text: '以甲乙丙浆液循环泵为核心，维持塔内喷淋和液气接触效率。' },
        { name: '氧化与副产物单元', text: '依赖氧化风机和液位控制促进亚硫酸盐氧化，并衔接石膏与废水处理。' },
        { name: '除雾与出口监测单元', text: '通过除雾器和脱硫出口 CEMS 保证进入湿电前的烟气状态。' },
      ],
      interfaces: [
        { label: '上游接口', value: 'SCR 出口烟道' },
        { label: '下游接口', value: 'WESP 入口烟道' },
        { label: '关键测点', value: '脱硫出口 CEMS' },
        { label: '主要控制', value: 'pH、密度、液位、氧化风' },
      ],
      monitorPoints: [
        '脱硫出口 CEMS 用于观察 SO2 去除效果与后续入湿电烟气状态',
        '塔内液位和浆液密度决定循环稳定性与副产物品质',
        '氧化风量直接影响亚硫酸盐氧化和石膏结晶条件',
      ],
      operationFocusCards: [
        {
          title: '日常运行',
          items: ['保持甲乙丙循环泵按负荷组合运行', '结合 pH 与密度调整石灰石浆液补给', '关注除雾器压差和冲洗效果'],
        },
        {
          title: '关键设备',
          items: ['吸收塔', '浆液循环泵组', '氧化风机', '除雾器'],
        },
        {
          title: '异常关注',
          items: ['塔内压差升高', '浆液循环中断', '氧化不足导致亚硫酸盐偏高', '除雾器堵塞带出液滴'],
        },
      ],
      layerPanels: {
        overview: {
          summary: [
            { title: '上游边界', items: ['承接 SCR 出口烟气', '烟气状态直接影响脱硫吸收负荷'] },
            { title: '下游衔接', items: ['脱硫出口进入 WESP', '出口 SO2 与湿度影响后续除尘表现'] },
          ],
          detail: [
            { title: '系统层重点', items: ['吸收塔承担主反应', '循环泵维持液气接触', '氧化风与副产物处理共同决定结晶与浆液品质'] },
            { title: '观测指标', items: ['pH', '密度', '液位', '脱硫出口 CEMS'] },
          ],
        },
        equipment: {
          summary: [
            { title: '设备簇', items: ['吸收塔与除雾器', '甲乙丙浆液循环泵', '氧化风机'] },
            { title: '设备角色', items: ['吸收 SO2', '维持循环喷淋', '促进氧化结晶'] },
          ],
          detail: [
            { title: '关键设备观察点', items: ['循环泵组合运行', '除雾器压差', '风机风量反馈', '塔内液位与密度'] },
          ],
        },
        operations: {
          summary: [
            { title: '核心动作', items: ['循环泵切换', 'pH / 密度调整', '氧化风投运'] },
            { title: '控制目标', items: ['保持 SO2 去除率', '维持浆液品质', '避免除雾带液'] },
          ],
          detail: [
            { title: '推荐操作顺序', items: ['确认塔内液位与浆液品质', '调整循环泵和石灰石补给', '投氧化风并观察出口测点', '根据压差与出口趋势调整除雾冲洗'] },
          ],
        },
        faults: {
          summary: [
            { title: '典型异常', items: ['塔内压差高', '浆液循环异常', '氧化不足'] },
            { title: '排查方向', items: ['先看出口 SO2 与压差', '再看循环泵和液位', '最后看氧化风与除雾器'] },
          ],
          detail: [
            { title: '处置优先级', items: ['确认出口测点和压差变化', '检查循环泵状态与阀位', '核对氧化风与浆液品质', '必要时安排除雾冲洗或负荷调整'] },
          ],
        },
      },
      focus: ['equipment::吸收塔', 'equipment::浆液循环泵', 'equipment::氧化风机', 'equipment::除雾器'],
      layerFocus: {
        overview: ['吸收反应边界', '浆液循环路径', '氧化风与副产物耦合', '脱硫出口监测'],
        equipment: ['吸收塔', '浆液循环泵组', '除雾器', '氧化风机'],
        operations: ['启停切换', 'pH 与密度控制', '氧化风投运', '除雾冲洗'],
        faults: ['塔内压差异常', '浆液循环异常', '氧化不足', '除雾堵塞'],
      },
    },
    denitrification: {
      title: '脱硝系统',
      code: 'SCR',
      index: '01',
      target: '脱除 NOx',
      route: '锅炉后 -> FGD 前',
      lead: '围绕氨水喷射、稀释风机、催化剂层和前后测点组织的 SCR 脱硝系统。',
      description: '系统重点覆盖氨水喷射系统、稀释风机、催化剂反应层以及 SCR 入口/出口 CEMS。',
      sourceSystems: ['system::氨水系统'],
      units: [
        { name: '氨水喷射单元', text: '负责氨水输送、蒸发和喷射，是 NOx 还原剂入口。' },
        { name: '稀释风单元', text: '通过稀释风机改善氨气混合与喷射均匀性。' },
        { name: '催化反应单元', text: '以催化剂层为核心完成脱硝反应，决定 NOx 去除效率。' },
        { name: 'SCR 监测单元', text: '布设 SCR 入口与出口测点，观察反应前后 NOx 变化。' },
      ],
      interfaces: [
        { label: '上游接口', value: '锅炉出口烟气' },
        { label: '下游接口', value: 'FGD 入口烟道' },
        { label: '关键测点', value: 'SCR 入口 / 出口 CEMS' },
        { label: '主要控制', value: '喷氨量、稀释风、反应温度' },
      ],
      monitorPoints: [
        'SCR 入口 NOx 为喷氨控制提供基准',
        'SCR 出口 NOx 与氨逃逸共同反映反应效率',
        '稀释风和阀门动作直接影响喷射均匀性',
      ],
      operationFocusCards: [
        {
          title: '日常运行',
          items: ['根据入口 NOx 与负荷调节喷氨', '确认稀释风机投运和风量稳定', '校核 SCR 入口出口测点趋势'],
        },
        {
          title: '关键设备',
          items: ['氨水喷射系统', '稀释风机', '催化剂层', '喷射阀组'],
        },
        {
          title: '异常关注',
          items: ['喷氨不均导致出口 NOx 波动', '阀门卡涩或执行机构异常', '催化剂活性下降', 'SCR 出口超标'],
        },
      ],
      layerPanels: {
        overview: {
          summary: [
            { title: '上游边界', items: ['锅炉出口烟气进入 SCR', '入口 NOx 和烟温决定喷氨控制窗口'] },
            { title: '下游衔接', items: ['SCR 出口进入 FGD', '出口 NOx 趋势影响后续排放链判断'] },
          ],
          detail: [
            { title: '系统层重点', items: ['氨水喷射单元与稀释风共同决定喷射均匀性', '催化剂层是反应效率核心区段', 'SCR 入口 / 出口测点提供反应前后对比'] },
            { title: '观测指标', items: ['入口 NOx', '出口 NOx', '烟温', '阀门开度与风量反馈'] },
          ],
        },
        equipment: {
          summary: [
            { title: '设备簇', items: ['氨水蒸发器与喷射阀组', '稀释风机', 'SCR 烟道与执行机构'] },
            { title: '设备角色', items: ['提供还原剂', '提供混合风量', '保证喷射与反应边界稳定'] },
          ],
          detail: [
            { title: '关键设备观察点', items: ['氨水蒸发器供给稳定性', '阀门动作反馈', '风机运行状态', '烟道测点布置'] },
          ],
        },
        operations: {
          summary: [
            { title: '核心动作', items: ['喷氨投运', '联锁启停', '阀门切换'] },
            { title: '控制目标', items: ['出口 NOx 稳定', '避免喷氨过量', '保持稀释风和温度窗口'] },
          ],
          detail: [
            { title: '推荐操作顺序', items: ['确认入口 NOx 与负荷', '投稀释风与喷氨系统', '观察 SCR 出口反馈', '根据偏差修正喷氨量'] },
          ],
        },
        faults: {
          summary: [
            { title: '典型异常', items: ['出口 NOx 偏高', '喷氨不均', '阀门异常'] },
            { title: '排查方向', items: ['先看测点趋势', '再看喷射与风量', '最后检查催化反应区'] },
          ],
          detail: [
            { title: '处置优先级', items: ['确认测点是否可信', '检查喷射阀组与稀释风机', '评估催化剂与反应温度', '必要时回退喷氨策略'] },
          ],
        },
      },
      focus: ['equipment::氨水蒸发器', 'equipment::电动阀', 'equipment::烟道'],
      layerFocus: {
        overview: ['还原剂进入路径', '气固反应边界', 'SCR 前后测点', '与锅炉和 FGD 的接口'],
        equipment: ['氨水蒸发器', '喷射与阀门部件', '稀释风机相关部件', 'SCR 烟道段'],
        operations: ['喷氨投运', '联锁启停', '阀门切换', '催化剂工况确认'],
        faults: ['喷氨不均', '阀门异常', '反应效率下降', '出口 NOx 偏高'],
      },
    },
    dedusting: {
      title: '除尘系统',
      code: 'WESP',
      index: '03',
      target: '脱除粉尘',
      route: 'FGD 后 -> 烟囱前',
      lead: '围绕湿式电除尘器、高压供电、冲洗循环阀组和出口监测组织的末端除尘系统。',
      description: '系统重点覆盖湿电本体、高压供电、冲洗循环、气动阀组和湿电出口 CEMS。',
      sourceSystems: ['system::湿电系统'],
      units: [
        { name: '湿电本体单元', text: '作为末端电除尘核心设备，承接脱硫后的含雾烟气。' },
        { name: '高压供电单元', text: '提供电场所需高压，决定颗粒荷电与捕集效果。' },
        { name: '冲洗循环单元', text: '围绕冲洗循环与甲乙丙丁阀组，维持内部洁净与通畅。' },
        { name: '出口监测单元', text: '通过湿电出口 CEMS 与烟囱监测衔接末端排放表现。' },
      ],
      interfaces: [
        { label: '上游接口', value: 'FGD 出口烟气' },
        { label: '下游接口', value: '烟囱排口' },
        { label: '关键测点', value: '湿电出口 CEMS' },
        { label: '主要控制', value: '高压供电、冲洗循环、阀组切换' },
      ],
      monitorPoints: [
        '湿电出口粉尘趋势反映末端除尘效果',
        '冲洗循环和压差变化用于判断内部结垢与堵塞',
        '高压供电状态决定颗粒荷电和捕集效率',
      ],
      operationFocusCards: [
        {
          title: '日常运行',
          items: ['保持高压供电稳定', '按计划执行冲洗循环', '确认甲乙丙丁阀组切换反馈正常'],
        },
        {
          title: '关键设备',
          items: ['湿电除尘器', '高压供电系统', '冲洗循环泵阀', '湿电出口测点'],
        },
        {
          title: '异常关注',
          items: ['出口粉尘上升', '电场异常退出', '冲洗循环堵塞', '阀组失灵导致分配异常'],
        },
      ],
      layerPanels: {
        overview: {
          summary: [
            { title: '上游边界', items: ['承接 FGD 出口烟气', '关注含雾烟气进入湿电前的状态'] },
            { title: '下游衔接', items: ['湿电出口接烟囱排口', '出口粉尘与烟囱最终指标直接相关'] },
          ],
          detail: [
            { title: '系统层重点', items: ['湿电本体负责末端捕集', '高压供电决定电场效果', '冲洗循环决定内部洁净与压差'] },
            { title: '观测指标', items: ['湿电出口 CEMS', '压差', '高压供电状态', '冲洗循环反馈'] },
          ],
        },
        equipment: {
          summary: [
            { title: '设备簇', items: ['湿电除尘器本体', '高压供电系统', '冲洗阀组'] },
            { title: '设备角色', items: ['末端捕集颗粒', '维持电场', '完成内壁冲洗分配'] },
          ],
          detail: [
            { title: '关键设备观察点', items: ['高压状态是否稳定', '阀组反馈是否一致', '冲洗循环是否通畅', '出口测点趋势'] },
          ],
        },
        operations: {
          summary: [
            { title: '核心动作', items: ['高压投运', '冲洗切换', '阀组确认'] },
            { title: '控制目标', items: ['保持粉尘达标', '避免内部堵塞', '维持高压稳定'] },
          ],
          detail: [
            { title: '推荐操作顺序', items: ['确认入口烟气状态', '投高压并检查反馈', '按计划切换冲洗循环', '观察湿电出口与烟囱指标'] },
          ],
        },
        faults: {
          summary: [
            { title: '典型异常', items: ['出口粉尘升高', '压差高', '电场异常退出'] },
            { title: '排查方向', items: ['先看出口趋势', '再看高压供电', '最后看冲洗循环与阀组'] },
          ],
          detail: [
            { title: '处置优先级', items: ['确认湿电出口与烟囱测点', '检查高压供电状态', '核对冲洗循环与阀组反馈', '必要时安排停运冲洗与检修'] },
          ],
        },
      },
      focus: ['equipment::湿电除尘器', 'equipment::烟道', 'equipment::电动阀'],
      layerFocus: {
        overview: ['湿电入口边界', '高压供电路径', '冲洗循环路径', '出口排放监测'],
        equipment: ['湿电除尘器', '高压供电相关部件', '冲洗阀组', '烟道接口'],
        operations: ['高压投运', '冲洗切换', '阀组动作确认', '停运保养'],
        faults: ['出口粉尘偏高', '冲洗堵塞', '压差升高', '电场异常'],
      },
    },
  };
  const layerDescriptions = {
    overview: '说明系统在主工艺链中的位置、上下游接口、单元划分和测点布局。',
    equipment: '聚焦系统内的关键设备、泵阀风机和监测点接口。',
    operations: '聚焦启停、切换、投运、冲洗、联锁与参数控制等动作。',
    faults: '聚焦排放异常、设备异常、监测异常与相应处置线索。',
  };
  const MONITOR_POINTS = [
    { name: 'SCR 入口 / 出口', text: '用于对比脱硝前后 NOx 变化，判断喷氨与催化反应效果。'},
    { name: '脱硫出口', text: '观察 SO2、湿度和后续进入湿电前的烟气状态。'},
    { name: '湿电出口', text: '观察末端粉尘治理效果，为烟囱排口做前置判断。'},
    { name: '烟囱最终 CEMS', text: '统一监测 SO2、NOx、粉尘、O2、温度、压力、流量、湿度。'},
  ];
  const FINAL_METRICS = ['SO2', 'NOx', '粉尘', 'O2', '温度', '压力', '流量', '湿度'];

  async function boot() {
    const root = document.querySelector('[data-page]');
    if (!root) return;
    installReveal();
    const payload = await fetch(withBase('/assets/data/demo_payload.json')).then((r) => r.json()).catch(() => null);
    if (!payload) return;
    const page = root.dataset.page;
    if (page === 'home') renderHome(payload);
    if (page === 'systems-overview') renderSystemsOverview(payload);
    if (page === 'system-home') renderSystemHome(payload, root.dataset.system);
    if (page === 'system-layer') renderSystemLayer(payload, root.dataset.system, root.dataset.layer);
    if (page === 'graph') renderGraphPage(payload);
  }

  function withBase(path) {
    const base = document.documentElement.getAttribute('data-baseurl') || '';
    return `${base}${path}`.replace(/\/\//g, '/');
  }
  function nodeMap(payload) { return new Map(payload.nodes.map((node) => [node.id, node])); }
  function payloadSystemMap(payload) { return new Map((payload.systems || []).map((system) => [system.id, system])); }

  function aggregateSystem(payload, slug) {
    const def = SYSTEM_DEFS[slug];
    const systems = payloadSystemMap(payload);
    const nodeById = nodeMap(payload);
    const source = def.sourceSystems.map((id) => systems.get(id)).filter(Boolean);
    const memberIds = [...new Set(source.flatMap((item) => item.members || []))];
    const members = memberIds.map((id) => nodeById.get(id)).filter(Boolean);
    const equipment = members.filter((node) => node.type === 'Equipment');
    const operations = members.filter((node) => node.type === 'Operation');
    const faults = members.filter((node) => node.type === 'Fault');
    return {
      id: slug,
      title: def.title,
      code: def.code,
      index: def.index,
      target: def.target,
      route: def.route,
      lead: def.lead,
      description: def.description,
      units: def.units,
      focus: def.focus,
      layerFocus: def.layerFocus,
      layerPanels: def.layerPanels,
      equipment,
      operations,
      faults,
      documentCount: source.reduce((sum, item) => sum + (item.document_count || 0), 0),
      equipmentCount: equipment.length,
      operationCount: operations.length,
      faultCount: faults.length,
    };
  }
  function allSystems(payload) { return Object.keys(SYSTEM_DEFS).map((slug) => aggregateSystem(payload, slug)); }

  function renderHome(payload) {
    const systems = allSystems(payload);
    const stats = [
      ['系统分区', systems.length],
      ['核心设备', systems.reduce((sum, item) => sum + item.equipmentCount, 0)],
      ['关键测点', MONITOR_POINTS.length],
      ['排口指标', FINAL_METRICS.length],
    ];
    document.getElementById('kg-stat-grid').innerHTML = stats.map(([label, value]) => `<div class="kg-stat-card"><span>${label}</span><strong>${value}</strong></div>`).join('');
    document.getElementById('kg-process-route').innerHTML = PROCESS_ROUTE.map(processStageMarkup).join('');
    document.getElementById('kg-system-grid').innerHTML = systems.map(systemCardMarkup).join('');
    document.getElementById('kg-monitor-board').innerHTML = monitorBoardMarkup();
  }

  function renderSystemsOverview(payload) {
    const systems = allSystems(payload);
    document.getElementById('kg-overview-route').innerHTML = PROCESS_ROUTE.map(processStageMarkup).join('');
    document.getElementById('kg-overview-systems').innerHTML = systems.map((system) => `
      <article class="kg-system-card">
        <div class="kg-system-stack__copy">
          <div class="kg-system-card__head">
            <div>
              <p class="kg-kicker">${system.code}</p>
              <h3>${system.title}</h3>
            </div>
            <span class="kg-system-card__index">${system.index}</span>
          </div>
          <p class="kg-muted">${system.description}</p>
          <div class="kg-meta-row">
            <span class="kg-pill">${system.target}</span>
            <span class="kg-pill">${system.route}</span>
            <span class="kg-pill">${system.documentCount} 文档</span>
          </div>
          <div class="kg-system-stack__actions">
            <a class="kg-button kg-button--primary" href="${withBase(`/systems/${system.id}/`)}">进入系统主页</a>
            <a class="kg-button kg-button--ghost" href="${withBase(`/systems/${system.id}/overview/`)}">查看系统层</a>
          </div>
        </div>
        <div class="kg-system-stack__side">
          <div class="kg-system-card__route">
            <p class="kg-kicker">工艺位置</p>
            <strong>${system.route}</strong>
            <p class="kg-muted">${system.target}</p>
          </div>
          ${system.units.map((unit) => `<div><p class="kg-kicker">Unit</p><strong>${unit.name}</strong><p class="kg-muted">${unit.text}</p></div>`).join('')}
        </div>
      </article>
    `).join('');
  }

  function renderSystemHome(payload, slug) {
    const system = aggregateSystem(payload, slug);
    document.getElementById('kg-system-hero').innerHTML = systemHeroMarkup(system);
    document.getElementById('kg-layer-entry').innerHTML = layerAnchorMarkup();
    document.getElementById('kg-unit-grid').innerHTML = system.units.map((unit, index) => `
      <article class="kg-unit-card">
        <div class="kg-layer-card__head">
          <div>
            <p class="kg-kicker">Unit ${index + 1}</p>
            <h3>${unit.name}</h3>
          </div>
        </div>
        <p>${unit.text}</p>
      </article>
    `).join('');
    const nodes = [{ id: system.id, name: system.title, type: 'System' }, ...pickFocusNodes(system, 4, 3, 3)];
    renderSvg(document.getElementById('kg-system-graph'), nodes, buildSyntheticLinks(system.id, nodes), system.id, system.id);
    renderSystemSections(system);
    Object.keys(layerLabelMap).forEach((layer) => {
      const grid = document.getElementById(`kg-layer-grid-${layer}`);
      if (grid) grid.innerHTML = buildLayerCards(system, layer).join('');
      renderLayerSections(system, layer, {
        summaryGridId: `kg-layer-summary-grid-${layer}`,
        detailGridId: `kg-layer-detail-grid-${layer}`,
      });
    });
  }

  function renderSystemLayer(payload, slug, layer) {
    const system = aggregateSystem(payload, slug);
    document.getElementById('kg-layer-hero').innerHTML = `
      <div class="kg-system-hero">
        <div class="kg-system-hero__copy">
          <p class="kg-eyebrow">${system.code} · ${layerLabelMap[layer]}</p>
          <h1>${system.title}</h1>
          <p class="kg-lead">${layerDescriptions[layer]}</p>
          <div class="kg-pill-row">
            ${(system.layerFocus[layer] || []).map((item) => `<span class="kg-pill">${item}</span>`).join('')}
          </div>
        </div>
        <div class="kg-system-badges">
          <div class="kg-system-badge"><span class="kg-kicker">脱除目标</span><strong>${system.target}</strong></div>
          <div class="kg-system-badge"><span class="kg-kicker">工艺位置</span><strong>${system.route}</strong></div>
        </div>
      </div>
    `;
    document.getElementById('kg-layer-nav').innerHTML = layerEntryMarkup(slug, layer);
    document.getElementById('kg-layer-title').textContent = `${system.title} · ${layerLabelMap[layer]}`;
    document.getElementById('kg-layer-grid').innerHTML = buildLayerCards(system, layer).join('');
    renderLayerSections(system, layer);
  }

  function renderGraphPage(payload) {
    const systems = allSystems(payload);
    const params = new URLSearchParams(location.search);
    let currentSystemId = params.get('system') || systems[0]?.id;
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
      systemList.innerHTML = systems.map((system) => `
        <button class="kg-system-card ${system.id === currentSystemId ? 'is-active' : ''}" data-system-id="${system.id}">
          <p class="kg-kicker">${system.code}</p>
          <h3>${system.title}</h3>
          <div class="kg-meta-row">
            <span class="kg-pill">${system.target}</span>
            <span class="kg-pill">${system.route}</span>
          </div>
        </button>
      `).join('');
      systemList.querySelectorAll('[data-system-id]').forEach((button) => {
        button.addEventListener('click', () => {
          currentSystemId = button.dataset.systemId;
          currentNodeId = currentSystemId;
          const search = new URLSearchParams(location.search);
          search.set('system', currentSystemId);
          history.replaceState(null, '', `${location.pathname}?${search.toString()}`);
          draw();
        });
      });
    }
    function draw() {
      drawSystems();
      const system = systems.find((item) => item.id === currentSystemId) || systems[0];
      const nodes = [{ id: system.id, name: system.title, type: 'System' }, ...system.equipment, ...system.operations, ...system.faults].filter((node) => currentFilter === 'all' || node.id === system.id || node.type === currentFilter);
      const links = buildSyntheticLinks(system.id, nodes);
      document.getElementById('kg-canvas-title').textContent = `${system.title} · 知识星图`;
      document.getElementById('kg-canvas-subtitle').textContent = `${system.route} · ${system.documentCount} 份文档参与骨架构建`;
      document.getElementById('kg-story-grid').innerHTML = `
        <div class="kg-story-card"><span class="kg-kicker">脱除目标</span><strong>${system.target}</strong></div>
        <div class="kg-story-card"><span class="kg-kicker">设备簇</span><strong>${system.equipmentCount}</strong></div>
        <div class="kg-story-card"><span class="kg-kicker">故障簇</span><strong>${system.faultCount}</strong></div>
      `;
      renderSvg(canvas, nodes, links, currentNodeId, system.id, (nodeId) => { currentNodeId = nodeId; draw(); });
      if (currentNodeId === system.id) renderAggregateDetail(detailPane, system);
      else renderNodeDetail(detailPane, payload, currentNodeId, system.title);
    }
    draw();
  }

  function processStageMarkup(stage) {
    return `
      <article class="kg-process-stage">
        <div class="kg-process-stage__head">
          <span class="kg-process-stage__code">${stage.code}</span>
          <span class="kg-process-stage__target">${stage.target}</span>
        </div>
        <div>
          <h3>${stage.title}</h3>
          <p class="kg-muted">${stage.summary}</p>
        </div>
        <ul>${stage.bullets.map((item) => `<li>${item}</li>`).join('')}</ul>
        ${stage.action ? `<a class="kg-process-stage__action" href="${withBase(stage.action)}">查看详情</a>` : `<span class="kg-process-stage__action">流程起点</span>`}
      </article>
    `;
  }

  function monitorBoardMarkup() {
    return `
      <article class="kg-monitor-card">
        <p class="kg-kicker">测点</p>
        <h3>关键测点</h3>
        <div class="kg-monitor-list">
          ${MONITOR_POINTS.map((item) => `<div class="kg-detail-item"><strong>${item.name}</strong><div class="kg-muted">${item.text}</div></div>`).join('')}
        </div>
      </article>
      <article class="kg-monitor-card">
        <p class="kg-kicker">监测项</p>
        <h3>排口在线指标</h3>
        <div class="kg-monitor-pill-row">${FINAL_METRICS.map((item) => `<span class="kg-monitor-pill">${item}</span>`).join('')}</div>
      </article>
    `;
  }

  function buildLayerCards(system, layer) {
    if (layer === 'overview') {
      return system.units.map((unit, index) => `
        <article class="kg-layer-card">
          <div class="kg-layer-card__head">
            <div>
              <p class="kg-kicker">Unit ${index + 1}</p>
              <h3>${unit.name}</h3>
            </div>
            <span class="kg-layer-card__index">${system.code}</span>
          </div>
          <div class="kg-layer-card__list"><span>${unit.text}</span></div>
        </article>
      `);
    }
    const source = layer === 'equipment' ? system.equipment : layer === 'operations' ? system.operations : system.faults;
    const title = layer === 'equipment' ? '核心设备' : layer === 'operations' ? '运行动作' : '异常模式';
    return source.slice(0, 12).map((node, index) => `
      <article class="kg-layer-card">
        <div class="kg-layer-card__head">
          <div>
            <p class="kg-kicker">${title}</p>
            <h3>${node.name}</h3>
          </div>
          <span class="kg-layer-card__index">${String(index + 1).padStart(2, '0')}</span>
        </div>
        <div class="kg-layer-card__list">${detailRowsForNode(node, layer).map((item) => `<span>${item}</span>`).join('')}</div>
      </article>
    `);
  }

  function detailRowsForNode(node, layer) {
    if (layer === 'equipment') return [node.function || '功能描述待补充', ...(node.key_parameters || []).slice(0, 3)];
    if (layer === 'operations') return [...(node.preconditions || []).slice(0, 2), ...(node.steps || []).slice(0, 2), '后续将补充标准步骤与条件'].slice(0, 4);
    if (layer === 'faults') return [...(node.symptoms || []).slice(0, 2), ...(node.possible_causes || []).slice(0, 2), ...(node.actions || ['后续将补充处置动作'])].slice(0, 4);
    return ['后续填充'];
  }

  function renderSystemSections(system) {
    const infoGrid = document.getElementById('kg-system-info-grid');
    const focusGrid = document.getElementById('kg-system-focus-grid');
    if (infoGrid) {
      infoGrid.innerHTML = `
        <article class="kg-info-card">
          <p class="kg-kicker">Interface</p>
          <h3>工艺接口</h3>
          <div class="kg-info-list">
            ${(system.interfaces || []).map((item) => `<div class="kg-detail-item"><strong>${item.label}</strong><div class="kg-muted">${item.value}</div></div>`).join('')}
          </div>
        </article>
        <article class="kg-info-card">
          <p class="kg-kicker">Monitoring</p>
          <h3>关键测点</h3>
          <div class="kg-info-list">
            ${(system.monitorPoints || []).map((item) => `<div class="kg-detail-item">${item}</div>`).join('')}
          </div>
        </article>
      `;
    }
    if (focusGrid) {
      focusGrid.innerHTML = (system.operationFocusCards || []).map((card) => `
        <article class="kg-focus-card">
          <p class="kg-kicker">Focus</p>
          <h3>${card.title}</h3>
          <div class="kg-info-list">
            ${card.items.map((item) => `<div class="kg-detail-item">${item}</div>`).join('')}
          </div>
        </article>
      `).join('');
    }
  }

  function renderLayerSections(system, layer, options) {
    const summaryGrid = document.getElementById(options?.summaryGridId || 'kg-layer-summary-grid');
    const detailGrid = document.getElementById(options?.detailGridId || 'kg-layer-detail-grid');
    const panel = (system.layerPanels || {})[layer] || { summary: [], detail: [] };
    if (summaryGrid) {
      summaryGrid.innerHTML = (panel.summary || []).map((card) => `
        <article class="kg-layer-detail-card">
          <p class="kg-kicker">Summary</p>
          <h3>${card.title}</h3>
          <div class="kg-info-list">
            ${card.items.map((item) => `<div class="kg-detail-item">${item}</div>`).join('')}
          </div>
        </article>
      `).join('');
    }
    if (detailGrid) {
      detailGrid.innerHTML = (panel.detail || []).map((card) => `
        <article class="kg-layer-detail-card">
          <p class="kg-kicker">Detail</p>
          <h3>${card.title}</h3>
          <div class="kg-info-list">
            ${card.items.map((item) => `<div class="kg-detail-item">${item}</div>`).join('')}
          </div>
        </article>
      `).join('');
    }
  }

  function systemHeroMarkup(system) {
    return `
      <div class="kg-system-hero__copy">
        <p class="kg-eyebrow">${system.code} · ${system.target}</p>
        <h1>${system.title}</h1>
        <p class="kg-lead">${system.description}</p>
        <div class="kg-pill-row">
          <span class="kg-pill">${system.route}</span>
          <span class="kg-pill">单页四段结构</span>
          <span class="kg-pill">测点纳入系统框架</span>
        </div>
      </div>
      <div class="kg-system-badges">
        <div class="kg-system-badge"><span class="kg-kicker">目标</span><strong>${system.target}</strong></div>
        <div class="kg-system-badge"><span class="kg-kicker">位置</span><strong>${system.route}</strong></div>
        <div class="kg-system-badge"><span class="kg-kicker">文档</span><strong>${system.documentCount}</strong></div>
      </div>
    `;
  }

  function systemCardMarkup(system) {
    return `
      <a class="kg-system-card" href="${withBase(`/systems/${system.id}/`)}" data-reveal="scale">
        <div class="kg-system-card__head">
          <div>
            <p class="kg-kicker">${system.code}</p>
            <h3>${system.title}</h3>
          </div>
          <span class="kg-system-card__index">${system.index}</span>
        </div>
        <p class="kg-muted">${system.lead}</p>
        <div class="kg-meta-row">
          <span class="kg-pill">${system.target}</span>
          <span class="kg-pill">${system.route}</span>
        </div>
      </a>
    `;
  }

  function layerEntryMarkup(slug, activeLayer) {
    return Object.entries(layerLabelMap).map(([layerSlug, label], index) => `
      <a class="kg-layer-card ${activeLayer === layerSlug ? 'is-active' : ''}" href="${withBase(`/systems/${slug}/${layerSlug}/`)}">
        <div class="kg-layer-card__head">
          <div>
            <p class="kg-kicker">Layer ${index + 1}</p>
            <h3>${label}</h3>
          </div>
          <span class="kg-layer-card__index">0${index + 1}</span>
        </div>
        <div class="kg-layer-card__list"><span>${layerDescriptions[layerSlug]}</span></div>
      </a>
    `).join('');
  }

  function layerAnchorMarkup() {
    return Object.entries(layerLabelMap).map(([layerSlug, label], index) => `
      <a class="kg-layer-card" href="#section-${layerSlug}">
        <div class="kg-layer-card__head">
          <div>
            <p class="kg-kicker">Section ${index + 1}</p>
            <h3>${label}</h3>
          </div>
          <span class="kg-layer-card__index">0${index + 1}</span>
        </div>
        <div class="kg-layer-card__list"><span>${layerDescriptions[layerSlug]}</span></div>
      </a>
    `).join('');
  }

  function pickFocusNodes(system, equipmentCount, operationCount, faultCount) {
    const focusIds = new Set(system.focus || []);
    const equipment = system.equipment.filter((node) => focusIds.has(node.id)).concat(system.equipment.filter((node) => !focusIds.has(node.id))).slice(0, equipmentCount);
    return equipment.concat(system.operations.slice(0, operationCount)).concat(system.faults.slice(0, faultCount));
  }
  function buildSyntheticLinks(systemId, nodes) {
    const links = [];
    if (!nodes.find((node) => node.id === systemId)) return links;
    nodes.forEach((node) => { if (node.id !== systemId) links.push({ source: systemId, target: node.id }); });
    const equipments = nodes.filter((node) => node.type === 'Equipment');
    const operations = nodes.filter((node) => node.type === 'Operation');
    const faults = nodes.filter((node) => node.type === 'Fault');
    operations.forEach((node, index) => { const equipment = equipments[index % Math.max(equipments.length, 1)]; if (equipment) links.push({ source: equipment.id, target: node.id }); });
    faults.forEach((node, index) => { const equipment = equipments[index % Math.max(equipments.length, 1)]; if (equipment) links.push({ source: equipment.id, target: node.id }); });
    return links;
  }

  function renderAggregateDetail(container, system) {
    container.innerHTML = `
      <div class="kg-detail-card">
        <p class="kg-kicker">系统概览</p>
        <h3>${system.title}</h3>
        <p class="kg-muted">${system.description}</p>
      </div>
      <div class="kg-detail-card">
        <h4>工艺位置</h4>
        <div class="kg-detail-list">
          <div class="kg-detail-item">脱除目标 · ${system.target}</div>
          <div class="kg-detail-item">处理链位置 · ${system.route}</div>
          ${system.units.map((unit) => `<div class="kg-detail-item">${unit.name} · ${unit.text}</div>`).join('')}
        </div>
      </div>
      <div class="kg-detail-card">
        <h4>系统跳转</h4>
        <div class="kg-detail-list">
          <a class="kg-detail-item" href="${withBase(`/systems/${system.id}/`)}">进入 ${system.title} 主页</a>
          <a class="kg-detail-item" href="${withBase(`/systems/${system.id}/equipment/`)}">查看设备层</a>
          <a class="kg-detail-item" href="${withBase(`/systems/${system.id}/operations/`)}">查看操作层</a>
          <a class="kg-detail-item" href="${withBase(`/systems/${system.id}/faults/`)}">查看故障层</a>
        </div>
      </div>
    `;
  }

  function renderSvg(svg, nodes, links, selectedId, systemId, onClick) {
    const grouped = { System: nodes.filter((node) => node.type === 'System'), Equipment: nodes.filter((node) => node.type === 'Equipment'), Operation: nodes.filter((node) => node.type === 'Operation'), Fault: nodes.filter((node) => node.type === 'Fault') };
    const layout = new Map();
    if (grouped.System[0]) layout.set(grouped.System[0].id, { x: 500, y: 330, r: 56 });
    placeGroup(grouped.Equipment, layout, { cx: 290, cy: 330, rx: 210, ry: 210, r: 30 });
    placeGroup(grouped.Operation, layout, { cx: 735, cy: 220, rx: 170, ry: 130, r: 23 });
    placeGroup(grouped.Fault, layout, { cx: 735, cy: 470, rx: 170, ry: 145, r: 23 });
    const related = new Set([selectedId]);
    links.forEach((link) => { if (link.source === selectedId) related.add(link.target); if (link.target === selectedId) related.add(link.source); });
    svg.innerHTML = '';
    links.forEach((link) => {
      const a = layout.get(link.source); const b = layout.get(link.target); if (!a || !b) return;
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', a.x); line.setAttribute('y1', a.y); line.setAttribute('x2', b.x); line.setAttribute('y2', b.y);
      line.setAttribute('class', `kg-svg-link ${(link.source === selectedId || link.target === selectedId) ? 'is-focus' : ''}`); svg.appendChild(line);
    });
    nodes.forEach((node, index) => {
      const pos = layout.get(node.id); if (!pos) return;
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      const dimmed = selectedId && !related.has(node.id) && node.id !== systemId;
      g.setAttribute('class', `kg-svg-node kg-type-${node.type} ${node.id === selectedId ? 'is-selected' : ''} ${dimmed ? 'is-dimmed' : ''}`);
      g.setAttribute('transform', `translate(${pos.x}, ${pos.y})`); g.style.transitionDelay = `${index * 20}ms`;
      if (onClick) g.addEventListener('click', () => onClick(node.id));
      const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); c.setAttribute('r', pos.r); g.appendChild(c);
      const t = document.createElementNS('http://www.w3.org/2000/svg', 'text'); t.setAttribute('dy', '0.35em'); t.textContent = node.name.length > 8 ? `${node.name.slice(0, 8)}…` : node.name; g.appendChild(t);
      svg.appendChild(g);
    });
  }
  function placeGroup(nodes, layout, cfg) { if (!nodes.length) return; nodes.forEach((node, index) => { const angle = (-Math.PI / 2) + (index / nodes.length) * Math.PI * 2; layout.set(node.id, { x: cfg.cx + Math.cos(angle) * cfg.rx, y: cfg.cy + Math.sin(angle) * cfg.ry, r: cfg.r }); }); }

  function renderNodeDetail(container, payload, nodeId, systemTitle) {
    const map = nodeMap(payload); const node = map.get(nodeId);
    if (!node) { container.innerHTML = '<div class="kg-detail-card"><p class="kg-muted">当前没有可展示内容。</p></div>'; return; }
    const evidence = payload.evidence[node.id] || [];
    const sections = [
      ['功能说明', node.function ? [node.function] : []], ['关键参数', node.key_parameters || []], ['关联操作', node.common_operations || node.applies_to || []], ['常见故障', node.common_faults || []], ['前置条件', node.preconditions || []], ['执行步骤', node.steps || []], ['风险提示', node.risks || []], ['故障现象', node.symptoms || []], ['可能原因', node.possible_causes || []], ['处置动作', node.actions || []],
    ].filter(([, values]) => values && values.length);
    container.innerHTML = `
      <div class="kg-detail-card">
        <p class="kg-kicker">${typeLabelMap[node.type] || node.type}</p>
        <h3>${node.name}</h3>
        <p class="kg-muted">${systemTitle || node.system || `${node.evidence_count || 0} 份证据文档支撑`}</p>
      </div>
      ${sections.map(([title, values]) => `<div class="kg-detail-card"><h4>${title}</h4><div class="kg-detail-list">${values.slice(0, 6).map((value) => `<div class="kg-detail-item">${value}</div>`).join('')}</div></div>`).join('')}
      <div class="kg-detail-card">
        <h4>证据文档</h4>
        <div class="kg-evidence-list">
          ${evidence.length ? evidence.slice(0, 8).map((doc) => `<div class="kg-evidence-item"><strong>${doc.name}</strong><div class="kg-muted">${doc.category} · ${doc.suffix.toUpperCase()} · ${doc.char_count || 0} chars</div>${doc.preview ? `<div class="kg-muted">${doc.preview}</div>` : ''}</div>`).join('') : '<div class="kg-evidence-item">当前还没有挂接到证据文档。</div>'}
        </div>
      </div>
    `;
  }

  function installReveal() {
    const items = [...document.querySelectorAll('[data-reveal]')];
    items.forEach((item) => { const delay = item.getAttribute('data-delay'); if (delay) item.style.setProperty('--kg-delay', `${delay}ms`); });
    if (!('IntersectionObserver' in window)) { items.forEach((item) => item.classList.add('is-visible')); return; }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
    }, { threshold: 0.18 });
    items.forEach((item) => observer.observe(item));
  }
  document.addEventListener('DOMContentLoaded', boot);
})();
