import { Project, Sector, Service, NewsArticle, JobOpening } from '../types';

export const STATIC_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Metro Rail Corridor Phase 2',
    slug: 'metro-rail-corridor-phase-2',
    description: 'Design and construction of a 34-km elevated and underground transit corridor including 18 stations, cutting-edge signaling and traction power systems.',
    location: 'Riyadh, Saudi Arabia',
    sector: 'Transportation',
    status: 'Ongoing',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    published: true,
    client: 'National Transport Authority',
    completionDate: '2027',
    scopeOfWork: 'Comprehensive EPC scope covering viaduct erection, dual tunneling via TBMs, architectural station finishing, track-laying and MEP works.',
    highlights: [
      '34 km total corridor length with 14 elevated and 4 underground stations',
      'Zero Lost-Time Incidents achieved across 8 million safe man-hours to date',
      'High-speed automated train control and modern passenger concourses'
    ],
    specifications: {
      'Route Length': '34.2 Kilometers',
      'Stations Count': '18 Integrated Stations',
      'TBM Tunnels': '11.4 Kilometers (Twin Tube)',
      'Contract Type': 'Turnkey EPC Lump-Sum'
    }
  },
  {
    id: 'p2',
    title: 'Al-Khobar Seawater Desalination Plant',
    slug: 'al-khobar-seawater-desalination-plant',
    description: 'Mega-scale reverse osmosis desalination facility producing 600,000 m3/day of potable drinking water with high-efficiency energy recovery.',
    location: 'Eastern Province, Saudi Arabia',
    sector: 'Water Infrastructure',
    status: 'Completed',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    published: true,
    client: 'Saline Water Conversion Authority',
    completionDate: '2025',
    scopeOfWork: 'Turnkey engineering, seawater intake marine piping, pre-treatment filtration, high-pressure RO racks and post-treatment remineralization.',
    highlights: [
      'Supplies over 2.5 million residents with uninterrupted potable water',
      'Lowest power consumption per cubic meter in the region via isobaric energy recovery',
      'Awarded Global Water Distinction 2025 for environmental excellence'
    ],
    specifications: {
      'Daily Capacity': '600,000 Cubic Meters/day',
      'Technology': 'Seawater Reverse Osmosis (SWRO)',
      'Substation': '380kV dedicated electrical substation',
      'Footprint': '320,000 Square Meters'
    }
  },
  {
    id: 'p3',
    title: 'Solar PV 800MW Utility Park',
    slug: 'solar-pv-800mw-utility-park',
    description: 'State-of-the-art clean energy generation plant featuring single-axis tracking solar PV systems connected directly to the national high-voltage grid.',
    location: 'Tabuk Region, Saudi Arabia',
    sector: 'Power',
    status: 'Completed',
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    published: true,
    client: 'Renewable Energy Procurement Office',
    completionDate: '2024',
    scopeOfWork: 'Civil grading, pile-driving, mounting tracker installation, 1.8M bifacial solar panels, central inverter stations, and 400kV GIS grid tie-in.',
    highlights: [
      'Displaces 1.2 million tonnes of CO2 emissions annually',
      'Bifacial glass-on-glass modules with robotic autonomous dry-cleaning systems',
      'Commissioned 2 months ahead of schedule'
    ],
    specifications: {
      'Installed Capacity': '800 MWac / 1050 MWp',
      'Land Area': '14.5 Square Kilometers',
      'Modules': '1,840,000 Bifacial Tier-1 Panels',
      'Grid Connection': '400kV Direct Transmission Interconnect'
    }
  },
  {
    id: 'p4',
    title: 'Integrated Petrochemical Cracker Complex',
    slug: 'integrated-petrochemical-cracker-complex',
    description: 'Heavy industrial refinery offsite utilities, high-integrity piping, cryogenic storage tanks and furnace erection for downstream chemical derivatives.',
    location: 'Jubail Industrial City, Saudi Arabia',
    sector: 'Oil & Gas',
    status: 'Ongoing',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: true,
    published: true,
    client: 'National Petrochemical Holding Co.',
    completionDate: '2026',
    scopeOfWork: 'Heavy structural steel fabrication (45,000 MT), piping pre-fabrication and erection (650,000 dia-inches), and electrical/instrumentation integration.',
    highlights: [
      'World-scale steam cracker unit producing polymer-grade ethylene',
      'Peak deployment of over 6,500 skilled engineers and technicians',
      'Implementation of 3D laser-scanning and BIM 4D digital progress tracking'
    ],
    specifications: {
      'Ethylene Capacity': '1.5 Million Tonnes Per Annum (MTPA)',
      'Structural Steel': '45,000 Metric Tonnes',
      'Piping Volume': '650,000 Diameter-Inches',
      'Man-Hours Total': '22 Million Safe Man-Hours'
    }
  },
  {
    id: 'p5',
    title: 'King Salman Financial Boulevard Tower',
    slug: 'king-salman-financial-boulevard-tower',
    description: 'Iconic 62-storey commercial headquarters featuring LEED Platinum sustainable engineering, high-efficiency facade glazing and intelligent building BMS.',
    location: 'Riyadh, Saudi Arabia',
    sector: 'Urban Infrastructure',
    status: 'Completed',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false,
    published: true,
    client: 'Capital Investment Authority',
    completionDate: '2024',
    scopeOfWork: 'Deep foundation diaphragm walls, post-tensioned core & slab structural execution, double-skin unitized curtain walling, and prime commercial fit-outs.',
    highlights: [
      'LEED Platinum Certified commercial skyscraper',
      'Smart elevator destination dispatch and automated solar heat control',
      'Architectural centerpiece of the new banking precinct'
    ],
    specifications: {
      'Height': '285 Meters (62 Floors)',
      'Built-up Area': '185,000 Square Meters',
      'Certifications': 'LEED Platinum & WELL Gold',
      'Deep Basements': '5 Level Automated Parking (2,200 cars)'
    }
  },
  {
    id: 'p6',
    title: 'Modern Direct Reduced Iron (DRI) Plant',
    slug: 'modern-direct-reduced-iron-plant',
    description: 'Green steel manufacturing facility capable of utilizing hydrogen fuel blends to produce high-grade sponge iron for regional electric arc furnaces.',
    location: 'Ras Al-Khair, Saudi Arabia',
    sector: 'Metals & Minerals',
    status: 'Ongoing',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false,
    published: true,
    client: 'Gulf Steel Consortium',
    completionDate: '2027',
    scopeOfWork: 'Shaft furnace erection, reformer modules, heat-recovery gas cleaning systems, and material handling conveyor conveyors.',
    highlights: [
      'Hydrogen-ready shaft design facilitating low-carbon metallics',
      '2.2 MTPA output of Hot Direct Reduced Iron (HDRI) and Cold DRI',
      'Direct pneumatic transfer to adjacent steel melting shop'
    ],
    specifications: {
      'Annual Output': '2.2 MTPA DRI / HBI',
      'Gas Reforming': 'Low-Emission Catalytic Gas Reformer',
      'Stack Height': '135 Meters Main Shaft Reactor',
      'Hydrogen Blend': 'Up to 30% H2 Fuel Capable'
    }
  },
  {
    id: 'p7',
    title: 'Aerospace & EV Precision Component Factory',
    slug: 'aerospace-and-ev-precision-component-factory',
    description: 'Cleanroom manufacturing halls, heavy testing bays, automated automated guided vehicle (AGV) logistics routes and precision CNC foundation beds.',
    location: 'Dammam, Saudi Arabia',
    sector: 'Manufacturing',
    status: 'Completed',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false,
    published: true,
    client: 'National Advanced Industrial Corp.',
    completionDate: '2023',
    scopeOfWork: 'Complete turnkey architectural design and civil build, vibration-isolated foundation slabs, ISO Class 7 cleanrooms, and robotic cell utilities.',
    highlights: [
      'Zero-vibration seismic slab isolation for sub-micron precision machining',
      'Fully automated rooftop solar self-generation providing 60% daytime load',
      'Completed in record 14 months duration'
    ],
    specifications: {
      'Enclosed Area': '48,000 Square Meters',
      'Cleanrooms': '8,500 Square Meters (ISO-7)',
      'Foundation Depth': '18-meter micro-piled isolated beds',
      'HVAC Capacity': '3,200 Refrigeration Tonnes'
    }
  },
  {
    id: 'p8',
    title: 'Tier IV Hyperscale Cloud Data Centre',
    slug: 'tier-iv-hyperscale-cloud-data-centre',
    description: 'Mission-critical Tier IV data facility engineered for 99.995% uptime availability with concurrent maintainability and dual 2N redundant electrical topologies.',
    location: 'Jeddah, Saudi Arabia',
    sector: 'Advanced Technology',
    status: 'Ongoing',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80'
    ],
    featured: false,
    published: true,
    client: 'Global Cloud Infrastructure Telecom',
    completionDate: '2025',
    scopeOfWork: 'Substructure civil hardening, EMP shielding, 2N UPS battery rooms, diesel rotary standby generators, and closed-loop adiabatic chilling plant.',
    highlights: [
      'Uptime Institute Tier IV design and construction certification',
      'Designed PUE of 1.25 under challenging ambient temperatures',
      'Supports high-density AI clusters up to 40kW per rack'
    ],
    specifications: {
      'IT Critical Load': '40 Megawatts (MW)',
      'White Space': '12,000 Square Meters across 8 Data Halls',
      'Redundancy': '2(N+1) Electrical & Mechanical Topologies',
      'Uptime Standard': 'Tier IV Concurrent & Fault Tolerant'
    }
  }
];

export const STATIC_SECTORS: Sector[] = [
  {
    id: 's1',
    title: 'Urban Infrastructure',
    slug: 'urban-infrastructure',
    description: 'Transforming skylines and municipal services through smart commercial towers, civic centres, and master-planned townships.',
    overview: 'BAYAN PROJECTS has pioneered large-scale urban regeneration and mixed-use commercial projects. From high-rise architectural marvels to smart master-planned communities, we deliver resilient, digitally enabled urban spaces built to withstand future population demands.',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    published: true,
    highlights: [
      'Super-tall landmark towers and corporate headquarters',
      'Master civic and convention centres with integrated public spaces',
      'Smart utility networks, district cooling and automated solid waste systems',
      'LEED Platinum and Net-Zero energy building design capabilities'
    ],
    capabilities: [
      'Pre-construction planning & 4D BIM digital twins',
      'Deep foundations, diaphragm walls & structural engineering',
      'High-performance facade engineering & acoustics',
      'Complete mechanical, electrical and plumbing (MEP) integration'
    ]
  },
  {
    id: 's2',
    title: 'Transportation',
    slug: 'transportation',
    description: 'Connecting communities through high-speed railways, modern metro networks, complex highway interchanges and airport hubs.',
    overview: 'Our Transportation division drives national connectivity. We deliver complex civil engineering works for metro rails, regional high-speed rail lines, multi-level flyovers, tunnels, bridges, and aviation airside infrastructure under tight urban and desert constraints.',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1200&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1600&q=80',
    published: true,
    highlights: [
      'Over 250 kilometers of high-capacity rail and metro networks delivered',
      'State-of-the-art Tunnel Boring Machine (TBM) subterranean engineering',
      'Expressways, cable-stayed bridges and elevated viaduct systems',
      'Runway airfield paving, taxiways and passenger terminal expansions'
    ],
    capabilities: [
      'Underground TBM and cut-and-cover civil tunneling',
      'Precast segmental girder erection and bridge engineering',
      'Railway ballastless track-laying, overhead electrification & signalling',
      'Traffic management systems and smart expressway tolling'
    ]
  },
  {
    id: 's3',
    title: 'Oil & Gas',
    slug: 'oil-gas',
    description: 'Engineering and constructing downstream processing units, chemical crackers, pipelines and high-integrity storage terminals.',
    overview: 'With deep domain experience in hydrocarbon engineering, BAYAN PROJECTS executes EPC and mechanical packages for refinery offsites, petrochemical plants, gas compressor stations, and bulk liquid terminals with uncompromising safety and quality metrics.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
    published: true,
    highlights: [
      'Turnkey execution of complex steam crackers and refining units',
      'Over 1,200 km of cross-country crude, gas and product pipeline networks',
      'Cryogenic LNG/LPG and atmospheric storage tank farms',
      'ASME Code stamps and highest international safety certifications'
    ],
    capabilities: [
      'Process equipment heavy rigging and tandem lifting',
      'High-alloy piping fabrication and automated orbital welding',
      'Shutdown, turnaround maintenance and revamping works',
      'Hazardous area electrical and distributed control system (DCS) commissioning'
    ]
  },
  {
    id: 's4',
    title: 'Power',
    slug: 'power',
    description: 'Powering economic progress with utility-scale solar PV farms, wind installations, substation networks and HV transmission lines.',
    overview: 'As the global energy landscape transitions toward decarbonization, BAYAN PROJECTS leads in building renewable solar parks, hybrid battery energy storage systems (BESS), and robust high-voltage transmission substations ensuring stable electrical grids.',
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1600&q=80',
    published: true,
    highlights: [
      'Gigawatt-scale solar photovoltaic (PV) turnkey EPC capability',
      '380kV / 400kV gas-insulated substations (GIS) and switchyards',
      'Hundreds of kilometers of overhead high-voltage transmission corridors',
      'Battery energy storage systems (BESS) for grid frequency stabilization'
    ],
    capabilities: [
      'Solar plant robotic pile-driving and tracker mechanical assembly',
      'High-voltage transformer installation and SF6 gas handling',
      'Substation automation and SCADA protection relay engineering',
      'Underground high-voltage power cable trenching and jointing'
    ]
  },
  {
    id: 's5',
    title: 'Metals & Minerals',
    slug: 'metals-minerals',
    description: 'Heavy industrial engineering for integrated steel mills, direct reduced iron (DRI) complexes, aluminum smelters and mining plants.',
    overview: 'BAYAN PROJECTS provides end-to-end industrial engineering for mineral beneficiation, pelletizing plants, blast furnaces, and secondary metal smelting facilities. We turn raw mineral wealth into finished industrial capital.',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80',
    published: true,
    highlights: [
      'Green steel direct reduced iron (DRI) shaft reactors and melting shops',
      'Bulk material handling systems including stackers, reclaimers & conveyors',
      'High-capacity smelter potlines and casting facilities',
      'Air pollution control baghouses and zero-emission dust capture'
    ],
    capabilities: [
      'Heavy mechanical machinery assembly and mill align-testing',
      'Refractory brick lining and high-temperature furnace casing',
      'Industrial process water recirculating systems',
      'Dynamic foundation civil construction for vibrating heavy machinery'
    ]
  },
  {
    id: 's6',
    title: 'Water Infrastructure',
    slug: 'water-infrastructure',
    description: 'Securing life-critical water supplies via mega-scale SWRO desalination, potable transmission lines and wastewater reclamation.',
    overview: 'Water scarcity requires uncompromising engineering precision. BAYAN PROJECTS designs and builds massive seawater reverse osmosis (SWRO) plants, strategic water reservoirs, transmission mains and tertiary wastewater recycling facilities.',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
    published: true,
    highlights: [
      'Over 1.5 million cubic meters per day of combined desalination capacity',
      'Long-distance strategic water transmission pipelines up to 2.4m diameter',
      'High-recovery industrial effluent and wastewater treatment systems',
      'Advanced dissolved air flotation (DAF) and ultrafiltration pre-treatment'
    ],
    capabilities: [
      'Marine intake and outfall pipe tunneling and subsea outfall diffusers',
      'High-pressure pump skids and isobaric energy recovery devices',
      'Prestressed concrete cylindrical water reservoir construction',
      'SCADA centralized telemetry and water distribution network automation'
    ]
  },
  {
    id: 's7',
    title: 'Manufacturing',
    slug: 'manufacturing',
    description: 'Specialized industrial facilities for automotive assembly, pharmaceuticals, cleanroom electronics and heavy machinery.',
    overview: 'We empower modern industrialization by creating precision-engineered manufacturing plants. Our facilities integrate automated logistics, high-tolerance flooring, controlled cleanroom environments, and dedicated industrial utility infrastructure.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80',
    published: true,
    highlights: [
      'Advanced automotive, electric vehicle and battery gigafactories',
      'GMP-compliant pharmaceutical formulation and packaging plants',
      'High-bay automated storage and retrieval systems (ASRS) warehouses',
      'Super-flat industrial laser-screed concrete floors'
    ],
    capabilities: [
      'Cleanroom HVAC zoning and HEPA air filtering validation',
      'Process gas piping, demineralized water and steam networks',
      'Vibration-isolated foundations for high-speed CNC centers',
      'Heavy overhead gantry crane runway design and erection'
    ]
  },
  {
    id: 's8',
    title: 'Advanced Technology',
    slug: 'advanced-technology',
    description: 'Mission-critical digital infrastructure including Tier IV hyperscale data centres, telecom hubs and smart city command centres.',
    overview: 'The digital economy demands infallible reliability. BAYAN PROJECTS builds the critical backbone for tech giants and governments, delivering hyper-scale data centres with 2N electrical redundancy, high-density liquid cooling, and stringent physical security.',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80',
    published: true,
    highlights: [
      'Tier III and Tier IV Uptime Institute certified facilities',
      'Ultra-efficient PUE designs utilizing indirect evaporative cooling',
      'Integrated security command & operations centres (SOC/NOC)',
      'High-density server hall layouts supporting up to 50 kW per rack'
    ],
    capabilities: [
      'Substation and emergency standby generator synchronized integration',
      'Uninterruptible Power Supply (UPS) battery systems and busway distribution',
      'Chilled water thermal energy storage and direct-to-chip liquid cooling',
      'Integrated Building Management Systems (IBMS) with AI power optimization'
    ]
  }
];

export const STATIC_SERVICES: Service[] = [
  {
    id: 'sv1',
    title: 'Engineering',
    slug: 'engineering',
    description: 'Multi-disciplinary front-end and detailed engineering encompassing civil, structural, mechanical, electrical, instrumentation, and process disciplines.',
    fullDescription: 'At BAYAN PROJECTS, engineering is the foundation of our execution excellence. Our in-house engineering centres of excellence leverage advanced Building Information Modeling (BIM 4D/5D), finite element structural analysis, computational fluid dynamics (CFD) and digital twin technology to optimize designs for safety, constructability, and operational lifecycle cost.',
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80',
    published: true,
    features: [
      'Conceptual Studies & Front-End Engineering Design (FEED)',
      'Detailed multidisciplinary engineering using integrated 3D/4D BIM',
      'Value engineering and constructability design reviews',
      'Geotechnical investigation and seismic load modeling',
      'Process simulation, hazard and operability (HAZOP) assessments'
    ],
    deliverables: [
      'Comprehensive FEED and detailed engineering drawing packages',
      'Equipment specifications, mechanical data sheets and bills of quantities',
      'Structural calculation dossiers and 3D clash-detection reports',
      'Process flow diagrams (PFD) and piping & instrumentation diagrams (P&ID)'
    ]
  },
  {
    id: 'sv2',
    title: 'Procurement',
    slug: 'procurement',
    description: 'Strategic global supply chain management delivering premium materials, heavy machinery and engineered packages on time and within budget.',
    fullDescription: 'Our strategic procurement division connects projects with pre-qualified tier-1 suppliers across the globe. Through strategic vendor partnerships, rigorous factory quality inspections, real-time logistics tracking and competitive bulk-buying power, we safeguard project schedules against global supply chain volatility.',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80',
    published: true,
    features: [
      'International supplier qualification and ESG ethical compliance vetting',
      'Critical path equipment expediting and on-site factory acceptance testing (FAT)',
      'Global freight forwarding, port customs clearance and oversized transport',
      'Inventory warehousing and just-in-time site staging systems'
    ],
    deliverables: [
      'Comprehensive procurement plans and procurement schedule milestones',
      'Third-party material inspection and test certificates (MTR/FAT)',
      'Vendor document registers and operations maintenance manuals',
      'Transparent landed cost audits and warranty documentation'
    ]
  },
  {
    id: 'sv3',
    title: 'Construction',
    slug: 'construction',
    description: 'World-class field execution with unwavering focus on safety, rigorous quality control, modern plant machinery, and scheduled delivery.',
    fullDescription: 'Construction is the heart of what we do. BAYAN PROJECTS mobilizes vast specialized equipment fleets and disciplined multi-tier field teams to execute complex infrastructure projects. From massive earthworks and heavy concrete casting to specialized mechanical rigging and high-precision instrumentation, we bring designs into reality with uncompromising safety.',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1200&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1600&q=80',
    published: true,
    features: [
      'Turnkey civil, structural, architectural and MEP field execution',
      'Target Zero safety framework embedded into every tool-box talk',
      'Extensive modern fleet of owned cranes, earthmovers, and heavy plant',
      'Modular pre-fabrication and off-site assembly to compress schedules'
    ],
    deliverables: [
      'Fully executed physical civil structures and integrated systems',
      'Quality assurance/quality control (QA/QC) inspection documentation',
      'Redline as-built drawings and safety statistical tracking records',
      'Successful interim client phase handovers and occupancy approvals'
    ]
  },
  {
    id: 'sv4',
    title: 'Project Management',
    slug: 'project-management',
    description: 'Rigorous schedule control, risk mitigation, commercial management, and digital monitoring keeping capital investments on track.',
    fullDescription: 'Our certified Project Management Professionals (PMP/PRINCE2) employ integrated project management systems across the entire project lifecycle. Combining Primavera P6 schedule scheduling, Earned Value Management (EVM), digital drone site tracking and risk-matrix mitigation, we provide clients with 100% visibility and confidence.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80',
    published: true,
    features: [
      'Comprehensive baseline scheduling and resource leveling in Primavera P6',
      'Proactive cost control and earned-value milestone tracking',
      'Integrated risk registers and contingency mitigation modeling',
      'Cloud-based stakeholder collaboration dashboards and reporting'
    ],
    deliverables: [
      'Weekly and monthly executive project health status dashboards',
      'Critical path variance analysis and look-ahead action items',
      'Commercial contract administration and risk mitigation reports',
      'Audited project accounting and cost forecasts'
    ]
  },
  {
    id: 'sv5',
    title: 'Commissioning',
    slug: 'commissioning',
    description: 'Systematic pre-commissioning, functional testing, integration trials and seamless handover ensuring operational reliability from day one.',
    fullDescription: 'The transition from construction to live operation demands systematic rigor. Our dedicated commissioning specialists carry out pre-commissioning loop checks, dynamic mechanical run-tests, safety interlock validations, and performance guarantee trials to guarantee all facilities perform to design criteria.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80',
    published: true,
    features: [
      'Cold and hot pre-commissioning checks across all electrical & mechanical systems',
      'Integrated systems testing (IST) and emergency failover demonstrations',
      'Performance guarantee demonstration runs under operational peak loads',
      'Comprehensive operator training and standard operating procedure (SOP) delivery'
    ],
    deliverables: [
      'Signed pre-commissioning punchlists and completion certificates',
      'Performance test run logs and utility consumption efficiency audits',
      'Operational turnover dossier (OTD) and equipment history records',
      'Client staff operational certification and training documentation'
    ]
  },
  {
    id: 'sv6',
    title: 'Operations & Maintenance',
    slug: 'operations-maintenance',
    description: 'Lifecycle asset management, predictive maintenance, shutdown servicing, and facility optimization safeguarding long-term asset value.',
    fullDescription: 'BAYAN PROJECTS extends value well beyond initial handover. Through our Asset Operations & Maintenance (O&M) division, we offer long-term asset management, computerized maintenance management systems (CMMS), IoT vibration monitoring, turnaround overhauls and efficiency upgrades that maximize operating life and reliability.',
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=80',
    published: true,
    features: [
      '24/7 on-site operations staffing and facility monitoring',
      'Predictive condition-based maintenance utilizing AI sensor telemetry',
      'Major plant shutdown, turnaround overhaul and catalyst change-out servicing',
      'Energy efficiency audits and operational decarbonization upgrades'
    ],
    deliverables: [
      'Real-time asset reliability and mean-time-between-failure (MTBF) tracking',
      'Scheduled preventive maintenance completion reports',
      'Statutory compliance certifications and environmental emission audits',
      'Spare-parts inventory optimization and lifecycle capital forecast plans'
    ]
  }
];

export const STATIC_NEWS: NewsArticle[] = [
  {
    id: 'n1',
    title: 'BAYAN PROJECTS Secures Major EPC Package for Riyadh Metro Phase 2 Extension',
    slug: 'bayan-projects-secures-major-epc-package-for-riyadh-metro-phase-2',
    description: 'The award marks another landmark transit milestone, encompassing 34 kilometers of elevated and underground track along with modern multimodal stations.',
    content: `BAYAN PROJECTS has officially been awarded the primary engineering, procurement, and construction (EPC) contract for the landmark Metro Rail Corridor Phase 2 extension in Riyadh.

The extensive scope of work comprises 34 kilometers of dual-track transit corridor, including 14 architectural elevated stations, 4 deep-cut subterranean stations, comprehensive MEP fitouts, automated signaling integration, and traction substations.

"This landmark win reinforces our strategic role as the infrastructure partner of choice for ambitious national transit initiatives," said the Managing Director of BAYAN PROJECTS. "Our engineering teams are prepared to deploy state-of-the-art Tunnel Boring Machines and digital 4D BIM construction controls to ensure this vital public transport artery is delivered with world-class safety and quality standards."

Mobilization on site has commenced, with peak civil works expected to generate over 4,500 direct engineering and construction jobs over the four-year project lifecycle.`,
    category: 'Projects',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1200&q=80',
    published: true,
    publishedAt: 'October 24, 2026',
    author: 'Corporate Communications',
    readTime: '4 min read'
  },
  {
    id: 'n2',
    title: 'Bayan Projects Achieves 15 Million Safe Man-Hours Milestone on Desalination Project',
    slug: 'bayan-projects-achieves-15-million-safe-man-hours',
    description: 'Demonstrating an uncompromising commitment to workplace health and safety, the company celebrates zero Lost Time Incidents across the Al-Khobar mega project.',
    content: `BAYAN PROJECTS is proud to celebrate reaching 15,000,000 safe man-hours without a single Lost Time Incident (LTI) during the construction and commissioning of the Al-Khobar Seawater Reverse Osmosis Desalination facility.

The milestone was commemorated on-site with senior representatives from the client authority, project management consultants, and the 3,800 on-site personnel whose daily dedication made this safety benchmark possible.

"Safety at BAYAN PROJECTS is not just a regulatory checklist; it is an intrinsic core value embedded into our company DNA," noted the Head of Health, Safety, and Environment (HSE). "To reach 15 million safe man-hours in a heavy industrial marine and civil setting with complex heavy lifts and confined spaces is a testament to our proactive hazard identification culture and continuous workforce training."

The Al-Khobar facility will supply 600,000 m3/day of clean drinking water, setting new benchmarks for energy conservation in seawater desalination.`,
    category: 'Corporate',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    published: true,
    publishedAt: 'September 15, 2026',
    author: 'HSE Division',
    readTime: '3 min read'
  },
  {
    id: 'n3',
    title: 'Unveiling the 2035 Net-Zero Operational Roadmap: Sustainable Engineering in Action',
    slug: 'unveiling-2035-net-zero-operational-roadmap',
    description: 'Our comprehensive sustainability framework details concrete actions to reduce carbon intensity across corporate offices, project jobsites, and heavy fleet operations.',
    content: `In alignment with regional and global decarbonization commitments, BAYAN PROJECTS has unveiled its comprehensive "Roadmap to 2035: Building a Sustainable Tomorrow."

The ambitious framework outlines measurable targets across three foundational pillars: Environmental Stewardship, Circular Engineering, and Sustainable Community Development.

Key commitments under the Roadmap include:
1. Transitioning 100% of temporary jobsite power from diesel generators to hybrid solar-battery systems by 2028.
2. Mandating low-carbon concrete mixes with pozzolanic slag replacements, reducing embodied structural carbon by 35%.
3. Achieving a 90% landfill diversion rate through comprehensive construction and demolition waste recycling programs.
4. Investing in electrified and alternative-fuel heavy earthmoving plant machinery.

"Engineering companies have an ethical imperative to shape a cleaner, more resilient future," stated the Chief Sustainability Officer. "Our 2035 Roadmap represents actionable, audited engineering practices that deliver sustainable infrastructure without compromising on commercial viability."`,
    category: 'Sustainability',
    imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80',
    published: true,
    publishedAt: 'August 08, 2026',
    author: 'Sustainability Board',
    readTime: '5 min read'
  },
  {
    id: 'n4',
    title: 'Bayan Projects Awarded EPC Contractor of the Year at Infrastructure Middle East Awards',
    slug: 'bayan-projects-awarded-epc-contractor-of-the-year',
    description: 'Recognized by an independent panel of industry peers for technical engineering excellence, safety leadership, and consistent on-time project execution.',
    content: `At the prestigious Middle East Infrastructure & Construction Awards gala held last evening, BAYAN PROJECTS was honored with the coveted "EPC Contractor of the Year" accolade.

The judging panel, comprising senior engineers, infrastructure economists, and academic leaders, recognized BAYAN PROJECTS for its exceptional portfolio of megaprojects executed over the preceding 24 months, particularly praising the company's rapid deployment of digital BIM workflows and advanced modular construction methodologies.

Accepting the award, the Chief Operating Officer expressed gratitude to the company's dedicated employees: "This recognition belongs to our 8,000+ engineers, surveyors, project managers, and craft professionals who braved challenging environmental conditions to deliver complex national infrastructure on schedule."

The company was also highly commended in the "Water Project of the Year" and "Excellence in Digital Construction" categories.`,
    category: 'Awards',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    published: true,
    publishedAt: 'July 19, 2026',
    author: 'Corporate Relations',
    readTime: '3 min read'
  },
  {
    id: 'n5',
    title: 'Commissioning Commences on 800MW Utility-Scale Solar PV Park in Tabuk',
    slug: 'commissioning-commences-on-800mw-solar-pv-park',
    description: 'First clean electricity synchronizes with the national grid as the mega renewable project transitions into final functional performance test runs.',
    content: `BAYAN PROJECTS is pleased to announce that energization and first grid synchronization have been successfully achieved at the 800MW utility-scale Solar Photovoltaic Park in the Tabuk province.

Spanning over 14.5 square kilometers of desert terrain, the facility incorporates more than 1.8 million high-efficiency bifacial solar modules mounted on single-axis tracker systems, maximizing solar yield throughout peak daylight hours.

The commissioning scope involves rigorous loop testing of all 40 inverter stations, checking automatic tracker tracking algorithms, validating SCADA data transmission to the national load dispatch center, and conducting thermal imaging scans across the entire panel array.

Once fully commercialized next month, the solar park will generate enough clean, renewable electricity to power roughly 160,000 homes while abating over 1.2 million tonnes of carbon dioxide annually.`,
    category: 'Energy',
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    published: true,
    publishedAt: 'June 02, 2026',
    author: 'Renewables Division',
    readTime: '4 min read'
  },
  {
    id: 'n6',
    title: 'Launch of the 2027 Graduate Engineering Development Programme',
    slug: 'launch-of-the-2027-graduate-engineering-development-programme',
    description: 'Providing young engineering graduates with 24 months of rotational project exposure, mentorship from technical leaders, and fast-track career development.',
    content: `Applications are now officially open for the 2027 intake of the BAYAN PROJECTS Graduate Engineering Development Programme (GEDP), the company's flagship technical talent initiative.

Targeting recent graduates in Civil, Structural, Mechanical, Electrical, Environmental, and Industrial Engineering, the two-year rotational programme immerses recruits directly into major infrastructure jobsites, technical design offices, and procurement centers.

Each graduate is paired with a senior mentor (Chartered Engineer or Project Director) who guides their development plan, technical certifications, and leadership competencies.

"Building world-class infrastructure begins with cultivating world-class engineering talent," remarked the Chief Human Resources Officer. "Our GEDP provides graduates with real responsibilities on complex megaprojects, creating the future engineering leaders of our nation."

Applications remain open through the company's online careers portal until December 15, 2026.`,
    category: 'Careers',
    imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80',
    published: true,
    publishedAt: 'May 14, 2026',
    author: 'Human Resources',
    readTime: '3 min read'
  }
];

export const STATIC_JOB_OPENINGS: JobOpening[] = [
  {
    id: 'job-1',
    title: 'Lead Civil & Structural Engineer',
    slug: 'lead-civil-structural-engineer',
    location: 'Riyadh, Saudi Arabia',
    department: 'Engineering & Design',
    type: 'Full-Time, Permanent',
    experience: '10+ Years',
    description: 'We are seeking an experienced Lead Civil & Structural Engineer to oversee detailed structural analysis, foundation designs, and construction drawing approvals for mega infrastructure and metro rail corridors.',
    responsibilities: [
      'Lead a multi-disciplinary team of structural engineers and CAD/BIM modelers.',
      'Review and approve complex structural calculation packages and geotechnical reports.',
      'Liaise with client representatives, PMC consultants, and independent checking engineers.',
      'Resolve technical constructability queries and non-conformance reports from site teams.'
    ],
    requirements: [
      'Bachelor’s or Master’s Degree in Civil/Structural Engineering from an accredited university.',
      'Minimum 10 years experience on major transportation, bridge, or heavy civil projects.',
      'Proficiency in structural design software (STAAD Pro, ETABS, SAP2000) and BIM protocols.',
      'Chartered Engineer (CEng) or Professional Engineer (PE) status strongly preferred.'
    ]
  },
  {
    id: 'job-2',
    title: 'Senior Project Manager – Heavy Infrastructure',
    slug: 'senior-project-manager-heavy-infrastructure',
    location: 'Eastern Province, Saudi Arabia',
    department: 'Project Management',
    type: 'Full-Time, Permanent',
    experience: '15+ Years',
    description: 'Looking for a seasoned Senior Project Manager to take end-to-end P&L accountability for the turnkey execution of high-value industrial and water infrastructure EPC packages.',
    responsibilities: [
      'Manage complete contractual, commercial, and operational delivery of the project.',
      'Direct on-site construction managers, sub-contractor packages, and equipment allocation.',
      'Enforce rigorous Target Zero HSE policies and project quality assurance protocols.',
      'Maintain strong executive client relationships and deliver monthly milestone milestones.'
    ],
    requirements: [
      'Degree in Engineering with certified PMP, PRINCE2, or equivalent credential.',
      '15+ years of progressive construction experience with at least 5 years as Lead PM.',
      'Proven track record delivering EPC projects valued in excess of USD $150 Million.',
      'Exceptional leadership, contractual acumen, and negotiation capabilities.'
    ]
  },
  {
    id: 'job-3',
    title: 'Senior HSE & Quality Assurance Specialist',
    slug: 'senior-hse-quality-assurance-specialist',
    location: 'Jeddah / Tabuk, Saudi Arabia',
    department: 'Health, Safety & Environment',
    type: 'Full-Time, Permanent',
    experience: '8+ Years',
    description: 'Join our corporate HSE division to drive international safety compliance, ISO audits, behavioral safety programs, and environmental management across mega job sites.',
    responsibilities: [
      'Implement job-specific HSE & Environmental Management Plans in line with ISO 45001 & 14001.',
      'Conduct daily site risk inspections, incident root-cause investigations, and tool-box talks.',
      'Oversee environmental compliance, hazardous waste handling, and emissions monitoring.',
      'Lead comprehensive contractor safety audits and emergency response drill simulations.'
    ],
    requirements: [
      'Relevant degree in Engineering, Occupational Health, or Environmental Sciences.',
      'NEBOSH International Diploma or CSP certification is mandatory.',
      'Minimum 8 years HSE field experience on heavy engineering or oil & gas projects.',
      'Strong communication skills in both English and Arabic are advantageous.'
    ]
  },
  {
    id: 'job-4',
    title: 'Lead MEP & Commissioning Manager',
    slug: 'lead-mep-commissioning-manager',
    location: 'Riyadh, Saudi Arabia',
    department: 'Mechanical & Electrical',
    type: 'Full-Time, Permanent',
    experience: '12+ Years',
    description: 'Responsible for directing the installation, testing, and integrated commissioning of heavy MEP systems, high-voltage substations, HVAC chillers, and building management systems.',
    responsibilities: [
      'Coordinate electrical, mechanical, fire protection, and low-current sub-contractor activities.',
      'Develop comprehensive Integrated Systems Testing (IST) commissioning sequences.',
      'Manage factory acceptance tests (FAT) and on-site functional performance trials.',
      'Ensure flawless handover of operations turnover dossiers to client facility managers.'
    ],
    requirements: [
      'Bachelor’s degree in Mechanical or Electrical Engineering.',
      '12+ years of MEP engineering experience on complex towers, airports, or hospitals.',
      'Hands-on expertise in commissioning management software and SCADA integration.',
      'Demonstrated experience handling local authority statutory utility approvals.'
    ]
  },
  {
    id: 'job-5',
    title: 'Graduate Engineer Trainee (GEDP 2027)',
    slug: 'graduate-engineer-trainee-gedp-2027',
    location: 'Multiple Locations across Saudi Arabia',
    department: 'Graduate Development',
    type: 'Full-Time, 2-Year Program',
    experience: 'Fresh Graduate (0-2 Years)',
    description: 'An outstanding entry-level rotational program for top-tier fresh engineering graduates looking to accelerate their technical careers in world-scale infrastructure construction.',
    responsibilities: [
      'Rotate across site engineering, estimating, procurement, and QA/QC departments.',
      'Assist senior engineers in structural inspections, quantity surveying, and survey checks.',
      'Participate in structured technical training modules and safety leadership certifications.',
      'Prepare engineering reports, schedule updates, and sub-contractor work assessments.'
    ],
    requirements: [
      'Recent graduate (2025/2026/2027) with a Bachelor’s in Civil, Mech, Elec, or Industrial Eng.',
      'Minimum cumulative GPA of 3.2/4.0 or equivalent upper second-class honor.',
      'High enthusiasm, eagerness to work on project jobsites, and strong problem-solving mindset.',
      'Fluent written and verbal English communication abilities.'
    ]
  }
];

export const COMPANY_STATS = [
  { value: '150+', label: 'Delivered Projects', description: 'Across high-impact regional infrastructure' },
  { value: '25+', label: 'Years of Excellence', description: 'Proven engineering legacy since inception' },
  { value: '8', label: 'Core Sectors', description: 'From urban transport to green energy' },
  { value: '12', label: 'Countries of Operation', description: 'Broad footprint spanning global markets' },
  { value: '8,500+', label: 'Skilled Workforce', description: 'Engineers, technical experts, and craftspeople' },
  { value: '99.4%', label: 'On-Time Handover', description: 'Driven by digital 4D BIM controls' }
];

