/* 面客端（官网）一级导航：所有面客端模块共用，新增或调整菜单只改这里。
   key 能在某个模块的 route.js 里找到时可点击（同模块内切换画面，跨模块打开对应文件）；
   没有 key 的栏目不在原型范围内，只展示。数组内容须为合法 JSON，export.py 会直接读取。
   en 为官网英文界面的菜单名，只在声明 data-i18n 的页面里随中 / EN 切换显示。 */
LUNA.defineMenu("site", [
  {"label": "羡山植物园", "en": "Xianshan Botanic Garden"},
  {"label": "杭州多样道", "en": "Hangzhou Duoyang Dao"},
  {"label": "鄯善水合子", "en": "Shanshan Shuihezi"},
  {"label": "姥山实验岛", "en": "Laoshan Experimental Island"},
  {"label": "生物库", "en": "Biorepository"},
  {"label": "新闻中心", "en": "News Center"},
  {"label": "自然地动态", "en": "The Dynamics"},
  {"key": "about", "label": "关于我们", "en": "About Us", "children": [
    {"key": "about-org", "label": "组织信息", "en": "Organization"},
    {"key": "about-charter", "label": "组织章程", "en": "Articles of Association"},
    {"key": "about-rules", "label": "管理制度", "en": "Policies"},
    {"key": "about-people", "label": "人员情况", "en": "People"}
  ]},
  {"key": "info", "label": "信息公开", "en": "Information Disclosure"}
]);
