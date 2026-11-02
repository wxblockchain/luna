/* 面客端（官网）一级导航：所有面客端模块共用，新增或调整菜单只改这里。
   key 能在某个模块的 route.js 里找到时可点击（同模块内切换画面，跨模块打开对应文件）；
   没有 key 的栏目不在原型范围内，只展示。数组内容须为合法 JSON，export.py 会直接读取。 */
LUNA.defineMenu("site", [
  {"label": "羡山植物园"},
  {"label": "杭州多样道"},
  {"label": "鄯善水合子"},
  {"label": "姥山实验岛"},
  {"label": "生物库"},
  {"label": "新闻中心"},
  {"label": "自然地动态"},
  {"key": "about", "label": "关于我们", "children": [
    {"key": "about-org", "label": "组织信息"},
    {"key": "about-charter", "label": "组织章程"},
    {"key": "about-rules", "label": "管理制度"},
    {"key": "about-people", "label": "人员情况"}
  ]},
  {"key": "info", "label": "信息公开"}
]);
