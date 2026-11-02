/* 面客端 · 关于我们 · 仓库联看路由：菜单 key → 本模块画面。group 是页面单选框的 name。 */
LUNA.registerModule({
  "id": "site-about", "end": "site", "menu": "about", "name": "关于我们",
  "file": "关于我们.html", "group": "S",
  "routes": {"about": "org", "about-org": "org", "about-charter": "charter", "about-rules": "rules", "about-people": "people"}
});
