# luna-江河荟 产品资料

本仓库存放 luna-江河荟官网及运营管理系统的产品需求文档（PRD）和页面原型，供产品、设计、前后端研发和测试共读。

## 模块

| 模块 | PRD | 原型 |
| --- | --- | --- |
| 信息公开 | [prd/info-disclosure/](prd/info-disclosure/) | [prototype/info-disclosure/](prototype/info-disclosure/) |
| 关于我们 | [prd/about-us/](prd/about-us/) | [prototype/about-us/](prototype/about-us/) |

## PRD 分册

每个模块的 PRD 按固定册号分册，放在同一目录下，册与册之间用相对链接互相引用：

- `01-functions`：功能与业务规则
- `02-flows`：流程图与状态机（Mermaid）
- `03-notifications`：消息通知，仅当模块自己发送消息时才有；没有这一册的模块会在 01 开头说明
- `04-acceptance`：验收标准

## 原型

原型是单文件静态 HTML，不依赖脚本和外部资源，下载后双击即可在浏览器打开。页面从上到下依次排列，每页上方标有编号和名称，文件顶部有页面清单；按钮和链接只展示样式，不会跳转。页面中的人员、文字、图片和文件均为示例数据。

| 模块 | 文件 | 内容 |
| --- | --- | --- |
| 信息公开 | [luna-info-disclosure.html](prototype/info-disclosure/luna-info-disclosure.html) | 官网 9 页 + 运营管理系统 18 页 |
| 关于我们 | [luna-about-us-site.html](prototype/about-us/luna-about-us-site.html) | 官网 4 页 |
| 关于我们 | [luna-about-us-admin.html](prototype/about-us/luna-about-us-admin.html) | 运营管理系统 12 页 |

## 维护约定

- 目录里只放当前有效版本；修订时直接替换同名文件，历史版本通过 Git 记录查看。
- 不要移动或拆开同一模块的分册，否则册间链接会失效。
- PRD 由产品维护，原型由设计维护。
