---
title: Transformer 模型中 Positional Encoding 维度不匹配
date: 2025-05-20
status: resolved
severity: high
tags: ["Transformer", "Positional Encoding", "PyTorch"]
solution: 检查 Positional Encoding 的输出维度是否为 [batch_size, seq_len, d_model]，而输入到 Transformer Encoder 时需要的是 [seq_len, batch_size, d_model]。解决方案是在 PE 输出后调用 `.permute(1, 0, 2)` 调整维度顺序，或者在自定义 Transformer 中设置 `batch_first=True`。
relatedEntry: Transformer 学习笔记
---

从零实现 Transformer 模型时，Positional Encoding 加上 Word Embedding 后输入到 Transformer Encoder 时报维度错误：

```
RuntimeError: Expected size for first two dimensions of batch2 tensor to be: [64, 8] but got: [8, 64]
```

## 排查过程

1. 检查 Embedding 输出维度：`[batch_size, seq_len, d_model]` — 正常
2. 检查 Positional Encoding 输出维度：`[seq_len, d_model]` — PE 没有 batch_size 维度
3. 广播后得到 `[batch_size, seq_len, d_model]` — 看起来没问题
4. 检查 Transformer Encoder 的输入要求：PyTorch 默认需要 `[seq_len, batch_size, d_model]`
5. 找到根本原因：维度顺序不匹配

## 解决方案

在输入到 TransformerEncoder 之前，对张量调用 `.permute(1, 0, 2)`，将维度从 `[batch, seq, d_model]` 转换为 `[seq, batch, d_model]`。

或者更简单的方式：在 `nn.Transformer` 初始化时设置 `batch_first=True`，这样可以直接使用 `[batch, seq, d_model]` 格式。
