/**
 * 新疆维吾尔自治区城市活动断层探测与地震危险性评价信息数据库
 * 模拟数据集 (符合系统设计方案 V1.0)
 * 包含：项目树结构、空间地理数据(GeoJSON)、字段别名字典
 */

// --- 1. 字段别名定义 (用于地图弹窗将数据库键名翻译为业务中文名) ---
export const FIELD_ALIAS = {
  // 通用字段
  name: '名称',
  id: '要素编号',
  project: '所属项目',
  date: '调查日期',
  observer: '调查人/负责人',
  // 断裂相关专业字段
  fault_code: '断裂代码',
  activity: '活动性',
  age: '形成年代',
  dip: '倾角(°)',
  dip_dir: '倾向',
  length: '断裂长度(km)',
  slip_rate: '滑动速率(mm/a)',
  // 钻探相关专业字段
  depth: '孔深(m)',
  hole_type: '钻孔类型',
  lithology: '揭露地层',
  water_level: '静止水位(m)',
  // 地球物理勘探字段
  method: '勘探方法',
  line_length: '测线长度(m)',
  frequency: '采样频率(Hz)',
  // 探槽相关
  trench_size: '规模(长x宽x深)',
  sample_id: '样品编号'
};

// --- 2. 导出项目树结构 (按方案业务模块组织) ---
export const PROJECTS_TREE = [
  {
    id: 'xj_kashgar',
    label: '喀什市城市活动断层探测项目',
    type: 'project',
    children: [
      {
        id: 'ks_rs',
        label: '遥感解译图层',
        type: 'layer',
        dataType: 'line',
        color: '#ff00ff', // 紫色
        info: '基于高分卫星影像的线性构造解译'
      },
      {
        id: 'ks_geology',
        label: '地震地质调查',
        type: 'layer',
        dataType: 'point',
        color: '#ff4d4f', // 红色
        info: '野外地质露头、地貌陡坎调查点'
      },
      {
        id: 'ks_seismic',
        label: '浅层人工地震勘探',
        type: 'layer',
        dataType: 'line',
        color: '#1890ff', // 蓝色
        info: '高分辨率反射波地震测线分布'
      },
      {
        id: 'ks_drill',
        label: '联合钻孔探测',
        type: 'layer',
        dataType: 'point',
        color: '#52c41a', // 绿色
        info: '第四纪盖层厚度与地层对比钻孔'
      }
    ]
  },
  {
    id: 'xj_urumqi',
    label: '乌鲁木齐市活断层精细定位项目',
    type: 'project',
    children: [
      { id: 'ur_fault', label: '主干断裂分布', type: 'layer', dataType: 'line', color: '#f5222d' },
      { id: 'ur_trench', label: '大型探槽工程', type: 'layer', dataType: 'point', color: '#fa8c16' }
    ]
  },
  {
    id: 'xj_korla',
    label: '库尔勒-孔雀河断裂危险性评价',
    type: 'project',
    children: [
      { id: 'kr_geology', label: '活动构造调查', type: 'layer', dataType: 'point', color: '#eb2f96' }
    ]
  }
];

// --- 3. 导出空间地理数据 (GeoJSON 格式，坐标参考真实新疆活动带) ---
export const SPATIAL_DATA = {
  // 喀什：地质调查点
  'ks_geology': {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "id": "KS-G01",
        "geometry": { "type": "Point", "coordinates": [75.9234, 39.5123] },
        "properties": {
          "name": "浩罕乡地貌陡坎调查点",
          "id": "KS-2023-G01",
          "project": "喀什市活断层探测项目",
          "observer": "张卫国 (地调院)",
          "date": "2023-05-14",
          "activity": "全新世活动",
          "age": "12.4±1.2ka (OSL测年)",
          "desc": "河流一级阶地被错断，可见高度约2.5m的陡坎。"
        }
      },
      {
        "type": "Feature",
        "id": "KS-G02",
        "geometry": { "type": "Point", "coordinates": [76.0145, 39.4212] },
        "properties": {
          "name": "疏勒北缘地层出露点",
          "id": "KS-2023-G02",
          "observer": "李明",
          "date": "2023-06-01",
          "lithology": "中更新统冲洪积砂砾层",
          "activity": "晚更新世活动"
        }
      }
    ]
  },

  // 喀什：地震测线 (LineString)
  'ks_seismic': {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "id": "KS-S01",
        "geometry": {
          "type": "LineString",
          "coordinates": [[75.85, 39.40], [75.95, 39.40], [76.10, 39.40]]
        },
        "properties": {
          "name": "喀什南环路地震勘探线",
          "id": "KS-2023-LINE-01",
          "method": "浅层人工反射波地震勘探",
          "line_length": "2500",
          "frequency": "100Hz",
          "observer": "石油物探研究所"
        }
      }
    ]
  },

  // 喀什：钻孔数据
  'ks_drill': {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "id": "KS-ZK01",
        "geometry": { "type": "Point", "coordinates": [75.987, 39.456] },
        "properties": {
          "name": "喀什大学标准对比孔",
          "depth": "150.5",
          "hole_type": "联合钻孔探测",
          "lithology": "粉质黏土/砂砾石/基岩",
          "water_level": "18.2",
          "date": "2023-08-20"
        }
      }
    ]
  },

  // 乌鲁木齐：主干断裂 (LineString)
  'ur_fault': {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "id": "UR-F01",
        "geometry": {
          "type": "LineString",
          "coordinates": [[87.40, 43.70], [87.65, 43.85], [87.90, 43.95]]
        },
        "properties": {
          "name": "九家湾断裂 (F09)",
          "fault_code": "F09-JJW",
          "activity": "全新世活动",
          "dip": "70",
          "dip_dir": "北东",
          "length": "18.5",
          "slip_rate": "0.45"
        }
      }
    ]
  },

  // 乌鲁木齐：探槽 (Point)
  'ur_trench': {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "id": "UR-TC01",
        "geometry": { "type": "Point", "coordinates": [87.55, 43.78] },
        "properties": {
          "name": "水磨沟2号大型探槽",
          "trench_size": "20m x 5m x 4m",
          "sample_id": "UR-C14-2023-001",
          "observer": "地震局现场工作组",
          "date": "2023-11-02"
        }
      }
    ]
  }
};