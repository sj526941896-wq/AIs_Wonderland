---
title: tmux翻页
date: 2026-05-19
tags:
  - AI
achievement: 编写成就感想
draft: true
aliases:
  - tmux翻页
linter-yaml-title-alias: tmux翻页
date created: Tuesday, May 19th 2026, 12:00:48 am
date modified: Tuesday, May 19th 2026, 12:04:29 am
---
# tmux翻页
- 被 tmux 给折腾疯了，用鼠标翻页，结果只在输入命令的地方疯狂更换上一个命令，但输出框纹丝不动，找了教程，也没有看懂，后来问了 gemini，认真实践了下，算搞懂了

键盘翻页快捷键进入复制模式后，使用以下按键进行翻页：￼￼
- 整页滚动： 按 Page Up 
- 向上翻页，Page Down 
- 向下翻页（macOS 键盘使用 Fn + ↑ / Fn + ↓）。
- 半页滚动： 按 Ctrl + u 向上翻半页，Ctrl + d 向下翻半页。
- 逐行滚动： 按键盘 ↑ / ↓ 键逐行查看。
- 退出翻页： 按 q 键退出复制模式，返回终端正常输入状态。￼￼

- 开启鼠标滚轮翻页（推荐）如果你习惯直接使用鼠标滚轮，可以在终端临时开启鼠标支持：￼
1. 按下 Ctrl + b 释放后，输入 : 进入命令模式。

2. 输入 set -g mouse on 并按回车。
3. 之后即可直接通过鼠标滚轮上下翻屏。

- 实践
- 实践
实践出真知！