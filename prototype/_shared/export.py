"""导出单模块附件：内联共用样式，按 menu.*.js 与本模块 route.js 预先写好菜单，去掉仓库联看脚本。
生成的文件不依赖脚本，可在禁止脚本的预览窗口里点击切换；只含本模块画面，跨模块菜单项只展示。
生成件不入库。用法（在 prototype/ 下执行）：
  python3 _shared/export.py 面客端/信息公开/信息公开.html <仓库外路径>.html
"""
import html
import json
import os
import re
import sys

SHARED = os.path.dirname(os.path.abspath(__file__))
ITEM_CLASS = {'site': '', 'admin': 'mi'}


def read_call(path, fn):
    text = open(path, encoding='utf-8').read()
    m = re.search(r'LUNA\.%s\((.*)\);\s*$' % fn, text, re.S)
    return m.group(1)


def load_menu(end):
    args = read_call(os.path.join(SHARED, 'menu.%s.js' % end), 'defineMenu')
    name, items = args.split(',', 1)
    return json.loads(items)


def link(end, item, module):
    key = item.get('key')
    on = key is not None and key == module['menu'] and end == module['end']
    cls = (ITEM_CLASS[end] + (' is-on' if on else '')).strip()
    start = '<a' + (' class="%s"' % cls if cls else '') + (' aria-current="page"' if on else '')
    text = html.escape(item['label'])
    screen = module['routes'].get(key) if end == module['end'] else None
    if screen:
        return '<label class="go" for="%s-%s">%s>%s</a></label>' % (module['group'], screen, start, text)
    return '%s>%s</a>' % (start, text)


def render(end, flat, module):
    out = []
    for item in load_menu(end):
        drop = ''
        if item.get('children') and not flat:
            drop = '<div class="drop">%s</div>' % ''.join(link(end, c, module) for c in item['children'])
        out.append('<li>%s%s</li>' % (link(end, item, module), drop))
    return ''.join(out)


def main(source, output):
    page = open(source, encoding='utf-8').read()
    module = json.loads(read_call(os.path.join(os.path.dirname(source), 'route.js'), 'registerModule'))

    def inline_css(m):
        path = os.path.join(os.path.dirname(source), m.group(1))
        return '<style>\n%s</style>' % open(path, encoding='utf-8').read()
    page = re.sub(r'<link rel="stylesheet" href="([^"]+)">', inline_css, page)
    page = re.sub(r'<script src="[^"]*_shared/navigation\.js"></script>\n?', '', page)

    def fill(m):
        attrs = m.group(1)
        end = re.search(r'data-menu="(\w+)"', attrs).group(1)
        return '<ul%s>%s</ul>' % (attrs, render(end, 'data-menu-flat' in attrs, module))
    page = re.sub(r'<ul([^>]*data-menu="\w+"[^>]*)></ul>', fill, page)
    hint = '<p>本文件只含本模块。在仓库中打开 prototype/index.html，可切换面客端 / 企业端与其他模块。</p>'
    page = page.replace('<nav aria-label="演示目录">', '<nav aria-label="演示目录">' + hint, 1)
    open(output, 'w', encoding='utf-8').write(page)


if __name__ == '__main__':
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
