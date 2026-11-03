/* 仓库联看（仅仓库使用，export.py 导出单模块附件时不包含）。
   读取 menu.*.js、modules.js 与各模块 route.js：按共用菜单渲染导航，同模块内切换画面，
   跨模块打开对应文件；在演示工具顶部加面客端 / 企业端与模块切换；给入口页生成端与模块列表。
   路径相对 prototype/，按本脚本位置解析，file:// 双击即可，无需启动服务。
   只做画面跳转，不保存数据、不模拟登录或权限。 */
(function (LUNA) {
  var root = new URL('../', document.currentScript.src);
  var ENDS = [
    {id: 'site', label: '面客端', desc: '官网'},
    {id: 'admin', label: '企业端', desc: '运营管理系统'}
  ];
  // 各端菜单项的样式类：两个模块的壳层沿用各自已确认的样式，菜单项结构统一。
  var ITEM_CLASS = {site: '', admin: 'mi'};
  var menus = {}, modules = [], current = null;

  LUNA.defineMenu = function (end, items) { menus[end] = items; };
  LUNA.registerModule = function (m) {
    m.url = new URL(m.file, document.currentScript.src);
    modules.push(m);
  };
  // 由解析器插入的脚本按顺序执行，都在 DOMContentLoaded 之前完成，file:// 下同样可用。
  LUNA.loadModules = function (dirs) {
    document.write(dirs.map(function (dir) {
      return '<script src="' + new URL(dir + '/route.js', root).href + '"><\/script>';
    }).join(''));
  };
  document.write(['_shared/menu.site.js', '_shared/menu.admin.js', '_shared/modules.js'].map(function (p) {
    return '<script src="' + new URL(p, root).href + '"><\/script>';
  }).join(''));

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]; });
  }
  function route(end, key) {
    if (!key) return null;
    var list = current ? [current].concat(modules) : modules;
    for (var i = 0; i < list.length; i++) {
      var m = list[i];
      if (m.end === end && m.routes[key]) return {module: m, screen: m.routes[key]};
    }
    return null;
  }
  function screenHref(m, screen) {
    var url = new URL(m.url.href);
    url.hash = screen;
    return url.href;
  }
  function homeHref(m) { return screenHref(m, m.routes[m.menu]); }

  function menuLink(end, item) {
    var r = route(end, item.key);
    var on = current && current.end === end && item.key && item.key === current.menu;
    var cls = ITEM_CLASS[end] + (on ? ' is-on' : '');
    var open = '<a' + (cls.trim() ? ' class="' + cls.trim() + '"' : '') + (on ? ' aria-current="page"' : '');
    var text = esc(item.label);
    if (item.en && document.body.hasAttribute('data-i18n')) {
      text = '<span class="zh">' + text + '</span><span class="en">' + esc(item.en) + '</span>';
    }
    if (r && r.module === current) {
      return '<label class="go" for="' + current.group + '-' + r.screen + '">' + open + '>' + text + '</a></label>';
    }
    if (r) return open + ' href="' + screenHref(r.module, r.screen) + '">' + text + '</a>';
    return open + '>' + text + '</a>';
  }
  function renderMenu(el) {
    var end = el.getAttribute('data-menu'), flat = el.hasAttribute('data-menu-flat');
    el.innerHTML = (menus[end] || []).map(function (item) {
      var drop = !flat && item.children ? '<div class="drop">' + item.children.map(function (c) {
        return menuLink(end, c);
      }).join('') + '</div>' : '';
      return '<li>' + menuLink(end, item) + drop + '</li>';
    }).join('');
  }

  function show(screen) {
    var radio = current && document.getElementById(current.group + '-' + screen);
    if (radio && radio.name === current.group) radio.checked = true;
  }

  // 演示工具（默认收起）顶部：端与模块切换、全部入口。不进入产品界面。
  function chip(text, href, on) {
    return '<a class="demo-chip" href="' + href + '"' + (on ? ' aria-current="true"' : '') + '>' + text + '</a>';
  }
  function endTarget(end) {
    var same = modules.filter(function (m) { return m.end === end && m.menu === current.menu; })[0];
    return same || modules.filter(function (m) { return m.end === end; })[0];
  }
  function renderSwitch(nav) {
    var ends = ENDS.map(function (e) {
      var m = endTarget(e.id);
      return m ? chip(e.label + '<small>' + e.desc + '</small>', homeHref(m), e.id === current.end) : '';
    }).join('');
    var mods = modules.filter(function (m) { return m.end === current.end; }).map(function (m) {
      return chip(esc(m.name), homeHref(m), m === current);
    }).join('');
    nav.insertAdjacentHTML('afterbegin',
      '<div class="demo-switch" role="group" aria-label="端与模块">' +
      '<h2>端</h2><div class="demo-chips">' + ends + '</div>' +
      '<h2>模块</h2><div class="demo-chips">' + mods + '</div>' +
      '<a class="demo-entry" href="' + new URL('index.html', root).href + '">全部端与模块</a></div>');
  }

  // 入口页：按端列出模块，进入后用真实菜单和演示工具切换。
  LUNA.renderEntry = function (el) {
    el.innerHTML = ENDS.map(function (e) {
      var list = modules.filter(function (m) { return m.end === e.id; });
      if (!list.length) return '';
      return '<section class="entry-end"><h2>' + e.label + '<small>' + e.desc + '</small></h2><div class="entry-mods">' +
        list.map(function (m) { return '<a href="' + homeHref(m) + '">' + esc(m.name) + '</a>'; }).join('') +
        '</div></section>';
    }).join('');
  };

  document.addEventListener('DOMContentLoaded', function () {
    var path = location.pathname;
    current = modules.filter(function (m) { return m.url.pathname === path; })[0] || null;
    if (!current) return;
    document.querySelectorAll('[data-menu]').forEach(renderMenu);
    var nav = document.querySelector('.demo nav');
    if (nav) renderSwitch(nav);
    if (location.hash) show(decodeURIComponent(location.hash.slice(1)));
    // 记下当前画面，刷新或复制网址后仍停在这一屏。
    document.addEventListener('change', function (e) {
      var t = e.target;
      if (t.name === current.group && t.checked) {
        history.replaceState(null, '', '#' + t.id.slice(current.group.length + 1));
      }
    });
    window.addEventListener('hashchange', function () { show(decodeURIComponent(location.hash.slice(1))); });
  });
})(window.LUNA = window.LUNA || {});
