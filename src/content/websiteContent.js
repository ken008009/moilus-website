import { useTranslation } from 'react-i18next';
import { orderByLanguage, orderNav } from '../i18n/siteConfig.js';
import websiteTranslations from './websiteTranslations.generated.json';

const en = {
  nav: orderNav({
    home: 'Home',
    staking: 'Staking',
    community: 'Community',
    ecosystem: 'Ecosystem',
    protocol: 'Protocol',
    token: 'Trade',
    whitepaper: 'Whitepaper',
  }),
  common: {
    scrollCue: 'Scroll to enter the continuum',
    continueLoop: 'Continue the loop',
    marquee: ['Public chain', 'On-chain governance', 'Global payments', 'Texas Hold’em', 'MS DAO', 'Encrypted chat'],
    footerTagline: 'One surface. No boundaries.',
    footerRisk: 'Mobius Strip is an experimental digital-asset ecosystem. Nothing on this site is financial advice or a guarantee of returns.',
    notFoundEyebrow: 'Outside the surface',
    notFoundTitle: 'This path does not continue.',
    returnHome: 'Return home',
  },
  home: {
    hero: {
      eyebrow: 'The continuous on-chain economy', title: ['One surface', 'No boundaries'],
      copy: 'Mobius Strip connects infrastructure, governance, payments, GameFi and communication in one open, self-circulating ecosystem.',
      primary: 'Explore the ecosystem', secondary: 'See how it holds',
    },
    overview: {
      eyebrow: 'Everything stays connected', title: 'An economy designed as one uninterrupted surface.',
      copy: 'Every Mobius product has its own role, but none lives in isolation. Governance, ownership, play and coordination move through the same system.',
      cards: [
        ['Five products, one state', 'The full ecosystem'],
        ['Rules that react', 'Protocol mechanics'],
        ['Transparent allocation', 'One billion MS'],
      ],
    },
    statement: ['Value enters through an open network, moves through a living', 'economy and returns with new utility.'],
    journey: {
      eyebrow: 'Built to keep moving', title: ['One path.', 'Three layers.'],
      copy: 'Scroll through the system from infrastructure to human use. The title holds while the surface keeps moving.',
      link: 'Enter the ecosystem',
      chapters: [
        ['Public chain', 'A BSC-based settlement layer designed to keep each product on one open, observable surface.'],
        ['Governance and coordination', 'Proposals, delegation and transparent voting designed as a native part of the system.'],
        ['Wallet and global payments', 'A single interface for ownership, transfer and participation across the wider Mobius economy.'],
      ],
    },
    action: {
      title: 'The system is bigger than a token.',
      copy: 'Follow the full product loop, then examine the mechanics that keep circulation moving.',
      primary: 'Explore every layer', secondary: 'View token model',
    },
  },
  ecosystem: {
    hero: {
      eyebrow: 'Five products. One shared state.', title: 'A network that becomes an economy.',
      copy: 'Mobius connects the rails, governance, interfaces, experiences and conversations required for an on-chain ecosystem to feel whole.',
      primary: 'Understand the protocol', secondary: 'View MS economics',
    },
    productsHeading: {
      eyebrow: 'From rails to real use', title: 'Expand the system.',
      copy: 'Each vertical slice is a distinct Mobius product. Click or tap a layer to open it and see how it connects.',
    },
    products: [
      ['MS Chain', 'Public infrastructure', 'The base layer connects staking, governance, payments and interactive contracts through one shared state.'],
      ['MS DAO', 'Governance platform', 'An on-chain governance platform for proposals, delegation and transparent collective decision-making.'],
      ['MS Wallet', 'Ownership and payments', 'Self-custody and global value movement, with the wider ecosystem only one gesture away.'],
      ['MS GameFi', 'Texas Hold’em', 'A live Texas Hold’em layer that turns digital ownership into play, progression and community.'],
      ['MS Chat', 'Dark-mode messenger', 'An encrypted messenger that closes the loop between identity, coordination and on-chain action.'],
    ],
    journeyHeading: {
      eyebrow: 'The continuous journey', title: 'Utility compounds when products connect.',
      copy: 'The interface changes. The underlying ownership does not. These chapters stack into a single participant journey.',
    },
    journey: [
      ['Enter', 'Access Mobius through a wallet and move value onto the shared network.'],
      ['Participate', 'Govern, stake, play and coordinate without leaving the ecosystem surface.'],
      ['Circulate', 'Liquidity and utility return to the network rather than ending at a product boundary.'],
    ],
    action: {
      title: 'Utility is only durable when the rules are visible.',
      copy: 'See the thresholds, release logic and circulation mode described by the Mobius protocol.',
      primary: 'Open protocol mechanics', secondary: 'Inspect allocation',
    },
  },
  protocol: {
    hero: {
      eyebrow: 'A system that responds', title: 'Protection is a behavior, not a promise.',
      copy: 'Mobius describes a sequence of on-chain responses designed to slow concentrated selling, reinforce liquidity and restart circulation.',
      primary: 'See the thresholds', secondary: 'View token model',
    },
    bandsHeading: {
      eyebrow: 'Published response logic', title: 'One market cycle. Three response bands.',
      copy: 'The supplied cycle chart shows repeated growth, correction and recovery. The response bands beside it describe intended mechanics, not guaranteed market outcomes.',
    },
    cycleCaption: 'Market growth cycle / supplied protocol visual',
    bands: [
      ['15% cumulative decline', 'First stabilisation band', 'The source protocol applies 35% transaction slippage, directing it to repurchase MS and send it to the burn address.', '−15%', '35% response'],
      ['30% cumulative decline', 'Deep stabilisation band', 'The slippage parameter rises to 50%, maintaining the same repurchase-and-burn path described in the protocol deck.', '−30%', '50% response'],
      ['50% cumulative decline', 'Circulation mode', 'Existing profit-release schedules pause while new accounts and dynamic tier rewards continue. Normal operation resumes after a 48-hour recovery period.', '−50%', '48h recovery'],
    ],
    circulation: {
      eyebrow: 'Circulation mode', title: 'Pause. Protect. Recover. Resume.',
      copy: 'At a 50% cumulative decline, the source model pauses existing release schedules. New accounts and dynamic differential rewards remain active. Once price recovery holds for 48 hours, normal operations resume.',
      label: 'Compensation described in source', detail: 'of paused quota during circulation mode, subject to the implemented contract terms.',
    },
    stakingHeading: {
      eyebrow: 'Staking model', title: 'Clear inputs. Scheduled release.',
      copy: 'The supplied deck presents a staking model with the following published parameters. Any live implementation should be verified on-chain before participation.',
    },
    parameters: [
      ['Minimum order', '200 USDT', 'Entry threshold stated in the source model.'],
      ['Published aggregate target', '300%', 'A model parameter, not a guaranteed return.'],
      ['Linear release period', '365 days', 'Release schedule stated in the supplied deck.'],
    ],
    risk: 'Digital assets and DeFi protocols involve substantial risk. Protection mechanics can influence incentives, but cannot eliminate liquidity, smart-contract, market or loss risk.',
    action: {
      title: 'Mechanics matter. Verification matters more.',
      copy: 'Continue into supply, allocation and the staged product rollout behind MS.',
      primary: 'Explore token economics', secondary: 'Return to products',
    },
  },
  token: {
    hero: {
      eyebrow: 'MS economic model', title: 'A fixed supply with a job to do.',
      copy: 'The supplied model divides one billion MS between the staking settlement system and public liquidity for the wider ecosystem.',
      primary: 'Inspect allocation', secondary: 'See product utility',
    },
    allocationAria: 'Token allocation: 30 percent settlement reserve and 70 percent ecosystem liquidity',
    total: 'total MS', eyebrow: 'Two connected pools', title: 'Every token enters the model with a defined role.',
    allocations: [
      ['300M MS', 'Allocated in the source model to support the staking ecosystem settlement system.'],
      ['700M MS', 'Allocated to public liquidity and the card-based GameFi economy.'],
    ],
    roadmapEyebrow: 'A staged launch', roadmapTitle: 'Build the foundation, open the market, expand the utility.',
    roadmap: [
      ['Foundation', 'Staking launch', 'Establish the participation model and the first layer of ecosystem circulation.'],
      ['Circulation', 'MS market launch', 'Enable open trading, market liquidity and public price discovery.'],
      ['Expansion', 'Privacy ecosystem and public chain launch in stages', 'The privacy ecosystem and public chain will roll out progressively, expanding network capabilities and application boundaries.'],
    ],
    action: {
      title: 'Supply defines scarcity. Utility defines relevance.',
      copy: 'See how the products turn a fixed MS supply into movement across one connected ecosystem.',
      primary: 'Follow the utility loop', secondary: 'Review safeguards',
    },
  },
  whitepaper: {
    hero: {
      eyebrow: 'Whitepaper, May 2026', title: 'Read the full system.',
      copy: 'An 18-page overview of the Mobius Strip architecture, applications, economics, roadmap and disclosed risks.',
      button: 'View available file', edition: 'English edition', pages: '18 pages', coverAlt: 'Cover of the Mobius Strip English whitepaper',
    },
    downloadHeading: {
      eyebrow: 'Available edition', title: 'Keep the source document close.',
      copy: 'Download the supplied English edition or open it in a new browser tab for quick reference.',
    },
    fileTitle: 'Mobius Strip whitepaper', fileMeta: 'English PDF / May 2026 / 18 pages / 589 KB', open: 'Open PDF', download: 'Download PDF',
    index: {
      eyebrow: 'Inside the paper', title: 'The complete system, in one document.',
      copy: 'The paper presents the project as proposed by its issuing entity. Treat technical, market and regulatory claims as material to verify independently.',
    },
    topics: [
      ['Architecture', 'Chain design, consensus, masternodes and the proposed three-layer privacy protocol.'],
      ['Applications', 'MS Swap, Card Game, Pay, Chat and DAO across one connected product surface.'],
      ['Economics', 'Fixed supply, allocation, ecosystem fees and the published burn model.'],
      ['Security', 'Cryptography, contract, network and asset-security considerations.'],
      ['Roadmap', 'Testnet, mainnet, ecosystem expansion and the planned global rollout.'],
      ['Risk and compliance', 'Technical, market, regulatory and economic risks described by the issuing entity.'],
    ],
    action: {
      title: 'From the document to the working model.',
      copy: 'Continue through the protocol mechanics or see where each product fits inside the ecosystem.',
      primary: 'Review the protocol', secondary: 'Explore the ecosystem',
    },
  },
};

const zhCN = {
  nav: orderNav({
    home: '首页',
    staking: '理财',
    community: '社区',
    ecosystem: '生态',
    protocol: '协议',
    token: '交易',
    whitepaper: '白皮书',
  }),
  common: {
    scrollCue: '向下滚动，进入无限生态', continueLoop: '继续探索',
    marquee: ['公链', '链上治理', '全球支付', '德州扑克', 'MS DAO', '加密通信'],
    footerTagline: '同一表面，无边界。',
    footerRisk: 'Mobius Strip 是一个实验性的数字资产生态系统。本站内容不构成财务建议，也不保证任何回报。',
    notFoundEyebrow: '超出生态边界', notFoundTitle: '这条路径无法继续。', returnHome: '返回首页',
  },
  home: {
    hero: { eyebrow: '持续运转的链上经济', title: ['同一表面', '没有边界'], copy: 'Mobius Strip 将基础设施、治理、支付、GameFi 与通信连接成一个开放、自循环的生态系统。', primary: '探索生态系统', secondary: '了解运行机制' },
    overview: { eyebrow: '一切始终相连', title: '一个不间断表面上的完整经济体。', copy: '每个 Mobius 产品都有自己的职责，但都不是孤立存在。治理、所有权、娱乐和协作在同一系统中流动。', cards: [['五个产品，一个状态', '完整生态系统'], ['能够响应的规则', '协议机制'], ['透明分配', '十亿枚 MS']] },
    statement: ['价值从开放网络进入，在持续运转的', '经济中流动，并带着新的效用回归。'],
    journey: { eyebrow: '持续向前构建', title: ['一条路径。', '三个层级。'], copy: '从基础设施一路探索到真实用户场景。标题保持不动，生态表面持续延展。', link: '进入生态系统', chapters: [['公链', '基于 BSC 的结算层，让每个产品都运行在同一个开放、可观察的表面上。'], ['治理与协作', '提案、委托和透明投票是系统的原生组成部分。'], ['钱包与全球支付', '通过一个界面完成所有权管理、转账并参与整个 Mobius 经济。']] },
    action: { title: '这个系统远不止一种代币。', copy: '沿着完整的产品闭环继续探索，并了解维持流通的核心机制。', primary: '探索每一个层级', secondary: '查看代币模型' },
  },
  ecosystem: {
    hero: { eyebrow: '五个产品，一个共享状态。', title: '一个网络，成长为完整经济体。', copy: 'Mobius 将链上基础设施、治理、交互界面、体验和通信连接起来，让生态成为完整整体。', primary: '了解协议', secondary: '查看 MS 经济模型' },
    productsHeading: { eyebrow: '从基础设施到真实应用', title: '展开整个系统。', copy: '每个纵向区域代表一个独立的 Mobius 产品。点击或轻触即可展开，查看它们如何互相连接。' },
    products: [['MS Chain', '公共基础设施', '基础层通过共享状态连接质押、治理、支付和交互式合约。'], ['MS DAO', '治理平台', '用于提案、委托和透明集体决策的链上治理平台。'], ['MS Wallet', '所有权与支付', '提供自托管和全球价值流动，并可快速进入整个生态系统。'], ['MS GameFi', '德州扑克', '链上德州扑克把数字所有权转化为游戏、成长和社区体验。'], ['MS Chat', '深色加密通信', '加密通信工具连接身份、协作和链上操作，闭合整个生态循环。']],
    journeyHeading: { eyebrow: '持续不断的旅程', title: '产品相连，效用才能持续累积。', copy: '界面会变化，但底层所有权不会。这些层级共同组成一条完整的参与路径。' },
    journey: [['进入', '通过钱包进入 Mobius，并把价值转入共享网络。'], ['参与', '无需离开生态即可治理、质押、游戏和协作。'], ['循环', '流动性和效用会重新回到网络，而不是停留在产品边界。']],
    action: { title: '只有规则可见，效用才能持久。', copy: '查看 Mobius 协议中的阈值、释放逻辑和循环模式。', primary: '打开协议机制', secondary: '查看代币分配' },
  },
  protocol: {
    hero: { eyebrow: '能够响应的系统', title: '保护是一种行为，而不是承诺。', copy: 'Mobius 设计了一系列链上响应机制，用于减缓集中抛售、增强流动性并重新启动循环。', primary: '查看响应阈值', secondary: '查看代币模型' },
    bandsHeading: { eyebrow: '公开的响应逻辑', title: '一个市场周期，三个响应区间。', copy: '周期图展示了增长、回调和恢复的重复过程。旁边的响应区间描述的是预设机制，并不保证市场结果。' },
    cycleCaption: '市场增长周期 / 协议原始图示',
    bands: [['累计下跌 15%', '第一稳定区间', '协议采用 35% 的交易滑点，用于回购 MS 并发送至销毁地址。', '−15%', '35% 响应'], ['累计下跌 30%', '深度稳定区间', '滑点参数提高到 50%，继续执行相同的回购和销毁路径。', '−30%', '50% 响应'], ['累计下跌 50%', '循环模式', '暂停现有收益释放计划，同时保留新账户和动态级差奖励。价格恢复并保持 48 小时后恢复正常运行。', '−50%', '恢复 48 小时']],
    circulation: { eyebrow: '循环模式', title: '暂停、保护、恢复、重启。', copy: '累计下跌达到 50% 时，模型会暂停现有释放计划。新账户和动态级差奖励继续运行；价格恢复并保持 48 小时后，系统恢复正常。', label: '原始资料描述的补偿', detail: '暂停额度的补偿比例，实际执行以已部署合约条款为准。' },
    stakingHeading: { eyebrow: '质押模型', title: '输入清晰，按计划释放。', copy: '原始资料给出了以下质押参数。参与前应通过链上数据核实实际实现。' },
    parameters: [['最低订单', '200 USDT', '原始模型规定的参与门槛。'], ['公开的总体目标', '300%', '这是模型参数，不代表保证收益。'], ['线性释放周期', '365 天', '原始资料规定的释放周期。']],
    risk: '数字资产和 DeFi 协议具有重大风险。保护机制可以影响参与者激励，但无法消除流动性、智能合约、市场或损失风险。',
    action: { title: '机制很重要，验证更加重要。', copy: '继续了解 MS 的供应量、分配和分阶段产品计划。', primary: '探索代币经济', secondary: '返回产品生态' },
  },
  token: {
    hero: { eyebrow: 'MS 经济模型', title: '固定供应，每一枚都有用途。', copy: '模型将十亿枚 MS 分配给质押结算系统和整个生态的公共流动性。', primary: '查看分配', secondary: '查看产品效用' },
    allocationAria: '代币分配：30% 结算储备，70% 生态流动性', total: 'MS 总量', eyebrow: '两个相连的资金池', title: '每一枚代币进入模型时都有明确职责。',
    allocations: [['3 亿 MS', '用于支持质押生态结算系统。'], ['7 亿 MS', '用于公共流动性和卡牌 GameFi 经济。']],
    roadmapEyebrow: '分阶段启动', roadmapTitle: '建立基础，开放市场，扩展效用。', roadmap: [['基础阶段', '启动质押', '建立参与模型和第一层生态循环。'], ['流通阶段', 'MS 市场启动', '开放交易、市场流动性和公开价格发现。'], ['扩展阶段', '隐私生态和公链陆续启动', '隐私生态与公链将分阶段上线，持续扩展网络能力与应用边界。']],
    action: { title: '供应决定稀缺性，效用决定价值。', copy: '了解各项产品如何让固定供应的 MS 在整个生态中持续流动。', primary: '查看效用闭环', secondary: '检查保护机制' },
  },
  whitepaper: {
    hero: { eyebrow: '白皮书，2026 年 5 月', title: '阅读完整系统。', copy: '一份 18 页的 Mobius Strip 架构、应用、经济模型、路线图和风险披露概览。', button: '查看文件', edition: '英文版', pages: '18 页', coverAlt: 'Mobius Strip 英文白皮书封面' },
    downloadHeading: { eyebrow: '可用版本', title: '随时查阅原始文件。', copy: '下载英文版白皮书，或在新的浏览器标签页中打开以便快速查阅。' },
    fileTitle: 'Mobius Strip 白皮书', fileMeta: '英文 PDF / 2026 年 5 月 / 18 页 / 589 KB', open: '打开 PDF', download: '下载 PDF',
    index: { eyebrow: '白皮书内容', title: '一份文件，呈现完整系统。', copy: '白皮书展示了发行主体提出的项目方案。技术、市场和监管相关声明均应独立核实。' },
    topics: [['架构', '链设计、共识、主节点和拟议的三层隐私协议。'], ['应用', '在同一产品生态中的 MS Swap、Card Game、Pay、Chat 和 DAO。'], ['经济模型', '固定供应、分配、生态费用和公开销毁模型。'], ['安全', '密码学、合约、网络和资产安全考虑。'], ['路线图', '测试网、主网、生态扩展和计划中的全球部署。'], ['风险与合规', '发行主体披露的技术、市场、监管和经济风险。']],
    action: { title: '从文档走向实际模型。', copy: '继续了解协议机制，或查看每项产品在生态中的位置。', primary: '查看协议', secondary: '探索生态系统' },
  },
};

const traditionalMap = new Map([...`个与业东丝两严丧临为丽举义乌乐乔习乡书买乱争于亏云亚产亩亲亵仅从仓仪们价众优会伞伟传伤伦伪体余佣侠侣侥侧侨侦俩俭债倾偿储儿兑党兰关兴养兽冈册写军农冲决况冻净凉减凑几凤凭凯击凿划刘则刚创删别刽剂剐剑剧劝办务动励劲劳势勋匀区医华协单卖卢卫却厅历厉压厌厕厦厨县参双发变叙叶号叹吓吕吗吨听启吴呐员呛呜咏咙咸响哑哗哟唤啧啬啭喂喷嗫嚣团园围国图圆圣场坏块坚坛坝坞坟坠垄垒垦垫垭垱垲埘埙埚堑堕墙壮声壳壶处备复够头夹夺奋奖奥妆妇妈妩姗姜娄娱婴孙学宁宝实宠审宪宫宽宾寝对寻导寿将尔尘尝尧尸层屉届属岁岂岖岗岛岭岳峡巅币帅师帐帘帜带帧帮庄庆庐库应庙庞废开异弃张弥弯弹强归当录彦彻径忆怀态怂总恋恳恶恼悦悬惊惧惨惩惫惬惭惯愤愿懒戏战户执扩扫扬扰抚抛抢护报担拟拢拣拥拦拨择挂挚挛挝挞挟挠挡挣挤挥挽捞损捡换据掳掴掷掺揽搀搁搂搅携摄摆摇摊撑撵撷撸撺擞攒敌数斋斗断无旧时旷昆显晋晒晓晕暂术朴机杀杂权条来杨杰松板极构枢枣枪枫柜柠查栅标栈栋栏树样档桥桨梦检棂椭楼榄榈榉槛横樱橱橹欢欧欲歼残殴毁毕毙气氢汇汉汤沟没沣沤沥沦沧沪泞注泪泷泸泺泻泼泽洁洒浅浆浇济浏浑浒浓浔涂涛涝涞涟涡涣涤润涧涨涩淀渊渍渐渔渗温湾湿溃溅滚滞满滤滥滨滩潆潇潜澜濑灭灯灵灾灿炀炉炖炜炝点炼炽烁烂烃焕焖焘煅煳熏爱爷牍牵牺犊状犹狈狞独狭狮狰狱猎猪猫猬献玛环现玺珐珑琐琼瓮电画畅疗疟疡疮疯痈痉痒瘗瘘瘪瘫瘾癞癣皑皱盏盐监盖盘眍眦着睁睐睑瞒瞩矫矿码砖砚砺砾础硅硕确碍碱礼祎祢祷祸禀离秃秆种积称税稳穷窃窍窑窜窝窥竞笃笋笔笺笼筑筛筹签简箦箧箨篑篮篱簖籁籴类粜粪粮紧絷纠纡红纣纤约级纨纩纪纫纬纭纯纰纱纲纳纵纶纷纸纹纺纽线练组绅细织终绉绊绍绎经绑绒结绕绘给绚络绝绞统绢绣继绩绪续绰绳维绵绶绷绸综绽绿缀缁缄缆缉缎缓缔缕编缘缙缚缜缝缟缠缡缢缤缥缦缧缩缪缫缬缭缮缯缰缴罢罗罚罴羁翘耧耸聂联聪肃肠肤肾肿胀胁胆胜胶脉脏脐脑脓脚脱脸腊腻腾舆舰舱艰艳艺节芜苁苇苈苋苍苏苹范茎茏茑茔茧荆荐荚荛荜荞荟荠荡荣荤荧药莅莱莲莳获莹莺萝萤营萧萨葱蒋蓝蓟蓠蓣蓥蓦蔷蔹蔺蕲蕴薮藓蘖虏虑虚虫虬虮虽虾虿蚀蚁蚂蚕蚝蚬蛊蛎蛏蛮蛰蛱蛲蛳蛴蜕蜗蜡蝇蝈蝉蝼蝾螀蟏衅衔补衬衮袄袜袭装裆裢裤褛褴见观规觅视览觉觊觋觌觎觏觐觑觞触觯誉誊讠计订讣认讥讨让讪训议讯记讲讳讴讵讶讹论讼讽设访诀证诂诃评诅识诈诉诊诋诌词诎诏译诒诓诔试诗诘诙诚诛诜话诞诟诠诡询诣诤该详诧诨诩诫诬语误诰诱诲诳说诵请诸诺读诽课诿谀谁谂调谄谅谆谇谈谊谋谍谎谏谐谑谒谓谙谚谛谜谝谟谠谢谣谤谦谨谩谪谬谭谱谲谴谷贝贞负贡财责贤败账货质贩贪贫贬购贮贯贰贱贲贳贴贵贷贸费贺贻贼贾贿赀赁赂赃资赅赈赉赋赌赍赎赏赐赔赖赘赚赛赞赠赡赢赵赶趋跃跄践跷跸跹跻踊踌踪蹒蹿躏躯车轧轨轩轫转轮软轰轱轲轴轶轻载轿较辅辆辈辉辍辎辏辐辑输辔辞辩辫边辽达迁过迈运还这进远违连迟迩迳迹适选逊递逦逻遗遥邓邮邻郁郏郐郑郓郦酝酱酽释里鉴銮錾钆钇针钉钊钋钌钍钎钏钐钒钓钔钕钗钙钚钛钜钝钞钟钠钡钢钣钤钥钦钧钨钩钪钫钬钭钮钯钰钱钲钳钴钵钶钷钸钹钺钻钼钽钾铀铁铂铃铄铅铆铈铉铊铋铌铍铎铐铒铕铖铗铙铚铛铜铝铠铡铢铣铤铥铧铨铩铪铫铭铬铮铯铰铱铲铳铴银铷铸铺链铿销锁锂锄锅锆锇锋锌锐锑锒锓锔锕锖锗错锚锛锝锞锡锢锣锤锥锦锨锩锫锬锭键锯锰锱锲锴锵锶锷锸锹锺锻锼锾镀镁镂镄镅镆镇镈镉镊镋镌镍镎镏镐镑镒镓镔镕镖镗镘镙镚镛镜镝镞镟镡镢镣镤镥镦镧镨镩镪镫镬镭镯镰镱镲镳镶长门闩闪闫闭问闯闰闱闲闳间闵闶闷闸闹闺闻闼闽闾阀阁阂阃阅阆阈阉阊阋阌阍阎阏阐阑阒阔阕阖阗阙阚队阳阴阵阶际陆陇陈陉陕陧陨险随隐隶难雏雠雳雾霁霉静韦韧韩韪韫韬页顶顷项顺须顽顾顿颀颁颂预颅领颇颈颉颊颌颍颏颐频颓颖颗题颚颛颜额颞颟颠颡颢颤颥颦风飒飓飕飘飙飞饥饧饭饮饯饰饱饲饴饵饶饷饺饼饿馀馁馄馅馆馈馊馋馍馏馐馑馒馓馔馕马驭驮驯驰驱驳驴驵驶驷驸驹驻驼驽驾驿骀骁骂骄骅骆骇骈骊骋验骏骐骑骒骓骖骗骘骚骛骜骝骞骟骠骡骢骤骥骦鱼鲁鲂鲅鲆鲇鲈鲋鲍鲎鲐鲑鲒鲔鲕鲚鲛鲜鲞鲟鲠鲡鲢鲣鲤鲥鲦鲧鲨鲩鲫鲭鲮鲰鲱鲲鲳鲴鲵鲶鲷鲸鲻鲼鲽鳃鳄鳅鳆鳇鳌鳍鳎鳏鳐鳓鳔鳕鳖鳗鳘鳙鳜鳝鳞鳟鳢鸟鸠鸡鸢鸣鸥鸦鸨鸩鸪鸫鸬鸭鸯鸱鸲鸳鸵鸶鸷鸸鸹鸺鸽鸾鸿鹁鹂鹃鹄鹅鹆鹇鹈鹉鹊鹋鹌鹎鹏鹑鹕鹗鹘鹚鹛鹜鹞鹟鹤鹦鹧鹨鹩鹪鹫鹬鹭鹰鹳麦黄黉齐齑齿龀龃龄龅龆龇龈龉龊龋龌龙龚龛龟`].map((char, index) => [char, [...`個與業東絲兩嚴喪臨為麗舉義烏樂喬習鄉書買亂爭於虧雲亞產畝親褻僅從倉儀們價眾優會傘偉傳傷倫偽體餘傭俠侶僥側僑偵倆儉債傾償儲兒兌黨蘭關興養獸岡冊寫軍農沖決況凍淨涼減湊幾鳳憑凱擊鑿劃劉則剛創刪別劊劑剮劍劇勸辦務動勵勁勞勢勳勻區醫華協單賣盧衛卻廳歷厲壓厭廁廈廚縣參雙發變敘葉號嘆嚇呂嗎噸聽啟吳吶員嗆嗚詠嚨鹹響啞嘩喲喚嘖嗇囀餵噴囁囂團園圍國圖圓聖場壞塊堅壇壩塢墳墜壟壘墾墊埡壋塏塒塤堝塹墮牆壯聲殼壺處備復夠頭夾奪奮獎奧妝婦媽嫵姍薑婁娛嬰孫學寧寶實寵審憲宮寬賓寢對尋導壽將爾塵嘗堯屍層屜屆屬歲豈嶇崗島嶺嶽峽巔幣帥師帳簾幟帶幀幫莊慶廬庫應廟龐廢開異棄張彌彎彈強歸當錄彥徹徑憶懷態慫總戀懇惡惱悅懸驚懼慘懲憊愜慚慣憤願懶戲戰戶執擴掃揚擾撫拋搶護報擔擬攏揀擁攔撥擇掛摯攣撾撻挾撓擋掙擠揮輓撈損撿換據擄摑擲摻攬攙擱摟攪攜攝擺搖攤撐攆擷擼攛擻攢敵數齋鬥斷無舊時曠昆顯晉曬曉暈暫術樸機殺雜權條來楊傑鬆板極構樞棗槍楓櫃檸查柵標棧棟欄樹樣檔橋槳夢檢欞橢樓欖櫚櫸檻橫櫻櫥櫓歡歐慾殲殘毆毀畢斃氣氫匯漢湯溝沒灃漚瀝淪滄滬濘注淚瀧瀘濼瀉潑澤潔灑淺漿澆濟瀏渾滸濃潯塗濤澇淶漣渦渙滌潤澗漲澀澱淵漬漸漁滲溫灣濕潰濺滾滯滿濾濫濱灘瀠瀟潛瀾瀨滅燈靈災燦煬爐燉煒熗點煉熾爍爛烴煥燜燾煆煳燻愛爺牘牽犧犢狀猶狽獰獨狹獅猙獄獵豬貓蝟獻瑪環現璽琺瓏瑣瓊甕電畫暢療瘧瘍瘡瘋癰痙癢瘞瘻癟癱癮癩癬皚皺盞鹽監蓋盤瞘眥著睜睞瞼瞞矚矯礦碼磚硯礪礫礎矽碩確礙鹼禮禕禰禱禍稟離禿稈種積稱稅穩窮竊竅窯竄窩窺競篤筍筆箋籠築篩籌簽簡簀篋籜簣籃籬籪籟糴類糶糞糧緊縶糾紆紅紂纖約級紈纊紀紉緯紜純紕紗綱納縱綸紛紙紋紡紐線練組紳細織終縐絆紹繹經綁絨結繞繪給絢絡絕絞統絹繡繼績緒續綽繩維綿綬繃綢綜綻綠綴緇緘纜緝緞緩締縷編緣縉縛縝縫縞纏褵縊繽縹縵縲縮繆繅纈繚繕繒韁繳罷羅罰羆羈翹耬聳聶聯聰肅腸膚腎腫脹脅膽勝膠脈臟臍腦膿腳脫臉臘膩騰輿艦艙艱艷藝節蕪蓯葦藶莧蒼蘇蘋範莖蘢蔦塋繭荊薦莢蕘蓽蕎薈薺蕩榮葷熒藥蒞萊蓮蒔獲瑩鶯蘿螢營蕭薩蔥蔣藍薊蘺蕷鎣驀薔蘞藺蘄蘊藪蘚櫱虜慮虛蟲虯蟣雖蝦蠆蝕蟻螞蠶蠔蜆蠱蠣蟶蠻蟄蛺蟯螄蠐蛻蝸蠟蠅蟈蟬螻蠑螿蠨釁銜補襯袞襖襪襲裝襠褳褲褸襤見觀規覓視覽覺覬覡覿覦覯覲覷觴觸觶譽謄訁計訂訃認譏討讓訕訓議訊記講諱謳詎訝訛論訟諷設訪訣證詁訶評詛識詐訴診詆謅詞詘詔譯詒誆誄試詩詰詼誠誅詵話誕詬詮詭詢詣諍該詳詫諢詡誡誣語誤誥誘誨誑說誦請諸諾讀誹課諉諛誰諗調諂諒諄誶談誼謀諜謊諫諧謔謁謂諳諺諦謎諞謨讜謝謠謗謙謹謾謫謬譚譜譎譴穀貝貞負貢財責賢敗賬貨質販貪貧貶購貯貫貳賤賁貰貼貴貸貿費賀貽賊賈賄貲賃賂贓資賅賑賚賦賭齎贖賞賜賠賴贅賺賽贊贈贍贏趙趕趨躍蹌踐蹺蹕躚躋踴躊蹤蹣躥躪軀車軋軌軒軔轉輪軟轟軲軻軸軼輕載轎較輔輛輩輝輟輜輳輻輯輸轡辭辯辮邊遼達遷過邁運還這進遠違連遲邇逕跡適選遜遞邐邏遺遙鄧郵鄰鬱郟鄶鄭鄆酈醞醬釅釋裡鑒鑾鏨釓釔針釘釗釙釕釷釺釧釤釩釣釔釹釵鈣鈈鈦鉅鈍鈔鐘鈉鋇鋼鈑鈐鑰欽鈞鎢鉤鈳鈁鈥鈄鈕鈀鈺錢鉦鉗鈷缽鈳鉕鈽鈸鉞鑽鉬鉭鉀鈾鐵鉑鈴鑠鉛鉚鈰鉉鉈鉍鈮鈹鐸銬鉺銪鋮鋏鐃銍鐺銅鋁鎧鍘銖銑鋌銥鏵銓鎩鉿銚銘鉻錚銫鉸銥鏟銃鐋銀銣鑄鋪鏈鏗銷鎖鋰鋤鍋鋯鋨鋒鋅銳銻鋃鋟鋦錒錆鍺錯錨錛鍀錁錫錮鑼錘錐錦鍁錈錇錟錠鍵鋸錳錙鍥鍇鏘鍶鍔鍤鍬鍾鍛鎪鐶鍍鎂鏤鐨鎇鏌鎮鎛鎘鑷鎲鐫鎳鎿鎦鎬鎊鎰鎵鑌鎔鏢鏜鏝鏍鏰鏞鏡鏑鏃鏇鐔钁鐐鏷鑥鐓鑭鐠鑹鏹鐙鑊鐳鐲鐮鐿鑔鑣鑲長門閂閃閆閉問闖閏闈閒閎間閔閌悶閘鬧閨聞闥閩閭閥閣閡閫閱閬閾閹閶鬩閿閽閻閼闡闌闃闊闋闔闐闕闞隊陽陰陣階際陸隴陳陘陝隉隕險隨隱隸難雛讎靂霧霽黴靜韋韌韓韙韞韜頁頂頃項順須頑顧頓頎頒頌預顱領頗頸頡頰頜潁頦頤頻頹穎顆題顎顓顏額顳顢顛顙顥顫顬顰風颯颶颼飄飆飛飢餳飯飲餞飾飽飼飴餌饒餉餃餅餓餘餒餛餡館饋餿饞饃餾饈饉饅饊饌饢馬馭馱馴馳驅駁驢駔駛駟駙駒駐駝駑駕驛駘驍罵驕驊駱駭駢驪騁驗駿騏騎騍騅驂騙騭騷騖驁騮騫騸驃騾驄驟驥驦魚魯魴鮁鮃鮎鱸鮒鮑鱟鮐鮭鮚鮪鮞鱭鮫鮮鯗鱘鯁鱺鰱鰹鯉鰣鰷鯀鯊鯇鯽鯖鯪鯫鯡鯤鯧鯝鯢鯰鯛鯨鯔鱝鰈鰓鱷鰍鰒鰉鰲鰭鰨鰥鰩鰳鰾鱈鱉鰻鰵鱅鱖鱔鱗鱒鰲鳥鳩雞鳶鳴鷗鴉鴇鴆鴣鶇鸕鴨鴦鴟鴝鴛鴕鷥鷙鴯鴰鵂鴿鸞鴻鵓鸝鵑鵠鵝鵒鷳鵜鵡鵲鶓鵪鵯鵬鶉鶘鶚鶻鷀鶥鶩鷂鶲鶴鸚鷓鷚鷯鷦鷲鷸鷺鷹鸛麥黃黌齊齏齒齔齟齡齙齠齜齦齬齪齲齷龍龔龕龜`][index]]));

function convertToTraditional(value) {
  if (typeof value === 'string') return [...value].map((char) => traditionalMap.get(char) || char).join('');
  if (Array.isArray(value)) return value.map(convertToTraditional);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, convertToTraditional(item)]));
  }
  return value;
}

const contentByLanguage = orderByLanguage({
  en,
  'en-US': en,
  'en-SG': en,
  'en-IN': en,
  'zh-CN': zhCN,
  'zh-HK': convertToTraditional(zhCN),
  ja: websiteTranslations.ja,
  ko: websiteTranslations.ko,
  ms: websiteTranslations.ms,
  th: websiteTranslations.th,
  ar: websiteTranslations.ar,
  ru: websiteTranslations.ru,
  ur: websiteTranslations.ur,
});

export function useWebsiteContent() {
  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage || i18n.language || 'en';
  const content = contentByLanguage[language] || en;
  return { ...content, nav: orderNav(content.nav) };
}

export { en as englishWebsiteContent };
