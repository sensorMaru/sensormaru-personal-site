# Brazilian Portuguese CSV 翻译 Skill
## 一、输入与运行基础确认

这一阶段对应流程图第一行，用于确认 CSV 输入规则、API 配置和本地运行方式。

### CSV 输入契约

脚本不依赖表头名称，第一行只作为表头保留。

从第二行开始按固定列位置处理：

- 第 1 列：英文原文
- 第 2 列：Brazilian Portuguese 译文写入位置

默认输入文件：

```text
/Users/xy/Documents/BP_translator/wisemeal-bundle-2.csv
```

如果某一行不足两列，脚本会自动补齐第二列为空字符串，避免写入时报错。第一列为空的行会跳过，因为没有可翻译内容。

### 运行配置

脚本默认读取：

```text
/Users/xy/Documents/BP_translator/account.yaml
```

配置项包括：

- `base_url`
- `api_key`
- `model_name`

也可以用环境变量覆盖：

```text
OPENAI_BASE_URL
OPENAI_API_KEY
OPENAI_MODEL
AZURE_OPENAI_ENDPOINT
AZURE_OPENAI_API_KEY
```

### 本地执行入口

当前项目面向 PyCharm 终端直接运行。

常规命令：

```bash
cd /Users/xy/Documents/BP_translator
python3 bp_trans.py
```

脚本运行时会打印：

- 输入文件路径
- 输出文件路径
- 处理范围
- 选中翻译行数
- 跳过空原文行数
- 批次进度
- 最终写出路径

### 处理范围

默认处理所有数据行，并覆盖第二列已有内容。

可选参数：

```bash
python3 bp_trans.py --limit 300
python3 bp_trans.py --skip-existing
python3 bp_trans.py --batch-size 20
```

参数含义：

- `--limit`：只处理前 N 个数据行，适合试跑
- `--skip-existing`：第二列已有值时跳过该行
- `--batch-size`：调整每次提交给模型的文本数量

## 二、批量翻译与格式保护主链路

这一阶段对应流程图第二行，是项目的核心执行链路。

### 读取 CSV

脚本使用 Python 标准库 `csv.reader` 读取文件。

读取规则：

- 编码：`utf-8-sig`
- 第一行：作为表头原样保留
- 第二行起：作为数据行处理
- 行顺序：输出时保持不变

### 筛选行

脚本逐行检查第一列英文原文。

处理规则：

- 第一列非空：加入翻译队列
- 第一列为空：跳过
- 第二列已有内容：默认覆盖
- 使用 `--skip-existing` 时：第二列已有内容则跳过

当前 SOP 的关键点是“处理所有数据”指处理所有第一列有英文原文的数据行；空原文行不会调用翻译接口。

### 批量请求

脚本将待翻译行按 `batch-size` 分组，并调用 Chat Completions 接口。

请求策略：

- 输出格式要求为 JSON object
- 结果数组字段支持 `translations` / `items` / `results`
- 每个结果必须包含 `id` 和 `translation`
- 接口失败、超时或 JSON 解析失败时自动重试

默认重试参数：

```text
timeout = 120
retries = 3
```

### pt-BR 翻译

模型提示词要求将英文 UI / 数据文本翻译为：

```text
Brazilian Portuguese (pt-BR)
```

翻译原则：

- 保持移动 App 本地化语气自然
- 品牌名和单位在适当场景下保留
- 不输出解释文字
- 不额外添加换行
- 对带换行的原文逐行翻译

### 格式校验

脚本对两个关键格式做强校验。

占位符规则：

- 英文原文中出现 `%@` 时，译文必须保留相同数量的 `%@`
- 数量不一致时直接报错停止

换行规则：

- 英文无换行：译文会压成单行
- 英文有换行：译文必须按相同行数返回
- 对带换行文本，脚本要求模型返回 `translation_lines`
- 行数不一致时直接报错停止

这样可以避免把多条 bullet 合并到一行，或在句子中间错误换行。

### 写回内存行

每批翻译完成后，脚本根据 `id` 将译文写回对应数据行的第二列。

写回规则：

- 只修改第二列
- 保留第一列表达
- 保留其他列和原始顺序
- 保留 CSV 字段内合法换行

## 异常处理与诊断输出

流程图第二行下方包含两类辅助链路。

### 异常处理

需要重点处理的异常包括：

- `account.yaml` 不存在或配置缺失
- API key / endpoint 不可用
- 接口超时或请求失败
- 模型返回非 JSON
- 返回结果缺少某个行 `id`
- 译文为空
- `%@` 占位符数量不一致
- 原文有换行但译文行数不一致

处理原则：

- 格式风险出现时立即停止
- 不生成明显错位或破坏格式的译文
- 根据终端错误定位到具体批次或 CSV 行

### 诊断输出

脚本会在终端输出常用诊断信息。

常见输出包括：

```text
Rows selected for translation
Skipped empty source rows
Skipped existing translations
Translating rows X-Y of Z
Batch failed on attempt ...
Wrote /Users/xy/Documents/BP_translator/loco_add.csv
```

这些信息用于判断：

- 是否真的全量扫描了数据
- 有多少行因为第一列为空被跳过
- 是否触发接口重试
- 输出文件是否写到预期路径

## 三、CSV 交付与复核验收

这一阶段对应流程图第三行，用于确认最终 CSV 可交付、可复跑。

### 生成 loco_add.csv

默认输出文件：

```text
/Users/xy/Documents/BP_translator/loco_add.csv
```

输出规则：

- 编码：`utf-8-sig`
- 保留原始表头
- 保留原始行顺序
- 将 Brazilian Portuguese 译文写入第二列

### 结构复核

交付前建议复核：

- 输出 CSV 行数与输入 CSV 一致
- 第一列非空的行是否已有第二列译文
- 第一列为空的行是否保持为空
- 表头是否仍在第一行

可用检查脚本：

```bash
python3 - <<'PY'
import csv
from pathlib import Path

for name in ["wisemeal-bundle-2.csv", "loco_add.csv"]:
    path = Path("/Users/xy/Documents/BP_translator") / name
    with path.open("r", encoding="utf-8-sig", newline="") as f:
        rows = list(csv.reader(f))
    data = rows[1:]
    print(name)
    print("data rows:", len(data))
    print("source nonempty:", sum(1 for r in data if len(r) > 0 and r[0].strip()))
    print("target nonempty:", sum(1 for r in data if len(r) > 1 and r[1].strip()))
PY
```

### 格式复核

重点复核两类格式：

- `%@`：源文和译文数量必须一致
- 换行：源文有几行，译文也应有几行

如果脚本正常完成，这两类问题已经经过程序校验。人工抽查时可优先查看包含 `%@` 或换行的行。

### 复跑策略

常见复跑方式：

```bash
python3 bp_trans.py
```

默认全量覆盖第二列，适合重新生成最终译文。

小批量验证：

```bash
python3 bp_trans.py --limit 50
```

保留已有译文，只翻译空白目标列：

```bash
python3 bp_trans.py --skip-existing
```

调整批量大小：

```bash
python3 bp_trans.py --batch-size 10
```

批量调小可以降低单次请求失败概率；批量调大可以减少请求次数，但更依赖接口稳定性。
