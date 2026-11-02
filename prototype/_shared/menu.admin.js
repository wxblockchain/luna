/* 企业端（运营管理系统）侧栏菜单：所有企业端模块共用，新增或调整菜单只改这里。
   key 能在某个模块的 route.js 里找到时可点击；没有 key 的菜单项不在原型范围内，只展示。
   数组内容须为合法 JSON，export.py 会直接读取。 */
LUNA.defineMenu("admin", [
  {"label": "项目成果列表"},
  {"label": "新闻中心列表"},
  {"label": "生物库列表"},
  {"key": "about", "label": "关于我们"},
  {"key": "info", "label": "信息公开"},
  {"label": "用户管理"},
  {"label": "打卡管理"}
]);
