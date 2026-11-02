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

原型是可点击切换页面的单文件 HTML，不依赖外部资源。克隆或下载后用浏览器打开即可（GitHub 网页上只能看到源码，不能直接预览）。页面中的人员、文字、图片和文件均为示例数据，按钮不会真正保存。

| 模块 | 文件 | 内容 | 操作方式 |
| --- | --- | --- | --- |
| 信息公开 | [luna-info-disclosure.html](prototype/info-disclosure/luna-info-disclosure.html) | 官网 9 页 + 运营管理系统 18 页 | 页签、面包屑、新增、编辑、取消等可点击跳转；右下角“演示 · 页面与状态”默认收起，展开后可直达任意页面或状态 |
| 关于我们 | [luna-about-us-site.html](prototype/about-us/luna-about-us-site.html) | 官网：组织信息、组织章程、管理制度、人员情况 | 一级导航下拉和页签切换；章程和制度可打开在线预览弹窗；支持手机宽度。不依赖脚本和 `#` 锚点，禁止脚本的预览窗口里也能点击 |
| 关于我们 | [luna-about-us-admin.html](prototype/about-us/luna-about-us-admin.html) | 运营管理系统：组织信息、组织章程、管理制度、人员情况 | 页签、面包屑、新增、编辑、取消可切换；发布、下线、删除（含确认弹窗）、必填与 30 字校验可点击查看；新增、编辑人员时按分类显示字段，修改分类会提示将清除的信息。不依赖脚本和 `#` 锚点 |

## 维护约定

- 目录里只放当前有效版本；修订时直接替换同名文件，历史版本通过 Git 记录查看。
- 不要移动或拆开同一模块的分册，否则册间链接会失效。
- PRD 由产品维护，原型由设计维护。
