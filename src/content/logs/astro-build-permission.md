---
title: Astro 构建失败：GPT 分区目录权限问题
date: 2025-05-15
status: resolved
severity: high
tags: ["Astro", "构建", "权限"]
solution: 将项目移出 GPT 分区（/Volumes/GPT/...），放回 Mac 本地磁盘（如 ~/Documents）后重新 npm install 和 build 即可。GPT 分区为 exFAT 格式，不支持 Unix 符号链接和某些文件权限，导致 node_modules 中的包无法正常工作。
---

在 Mac 上使用 Astro 构建静态站点时，执行 `npm run build` 一直报错，提示权限相关或 `EPERM` 错误。

最初以为是 `node_modules` 损坏，删除并重新 `npm install` 后仍无法解决。

## 排查过程

1. 检查 npm 和 node 版本——正常
2. 删除 node_modules 和 package-lock.json 重装——依然失败
3. 检查错误日志，发现报错涉及符号链接操作失败
4. 注意到项目位于 `/Volumes/GPT/AIs_Wonderland/`，这是一个外置 GPT 分区（exFAT 格式）
5. exFAT 不支持 Unix 符号链接，而许多 npm 包在 postinstall 阶段需要创建符号链接

## 解决方案

将项目复制到本地磁盘（`~/Documents/GitHub/` 目录），重新安装依赖，构建成功。
