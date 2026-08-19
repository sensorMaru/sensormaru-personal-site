# EMG 肌电 EDF 解析与疲劳对比 Skill
## 一、输入与实验口径确认

这一阶段对应流程图第一行，用于确认实验数据、运行基础和肌肉分组边界。

### SOP / 任务口径

执行前先确认每个 EDF 文件对应的实验条件。

当前文件命名口径：

- 角度：例如 `45`、`80`、`180`
- 任务：例如 `画画`、`看书`、`积木`
- 时段：例如 `0-150`、`10-140`、`20-150`
- 文件类型：EDF 原始肌电数据

文件名本身是批量对比报告中的主要实验标签，因此建议后续采集继续保持同一命名规则。

### EDF 文件目录

当前 EDF 文件集中存放在：

```text
mat-edf/
```

批量模式会读取该目录下的所有 `.edf` 文件，并按文件名排序逐个分析。

典型运行命令：

```bash
cd /Users/xy/Documents/EMG
python3 emg_analysis.py --batch --report emg_comparison.html
```

### 运行环境

当前项目使用 Python 本地脚本，核心解析与报告生成只依赖 Python 标准库。

无需额外安装第三方依赖。

验证命令：

```bash
python3 -m unittest tests/test_emg_analysis.py
python3 -m py_compile emg_analysis.py tests/test_emg_analysis.py
```

### 通道与肌肉分组

当前 EDF 文件包含 4 个肌电通道，按原始通道标签合并为两块肌肉。

当前分组逻辑：

- 相同通道标签视为同一块肌肉的重复采集通道
- 每块肌肉下的重复通道先求平均
- 后续 RMS、MF、MPF 和疲劳评分都基于合并后的肌肉序列计算

典型通道示例：

```text
EMG A, X, EMG2-R
EMG A, X, EMG2-R #2
EMG B, Y, EMG2-R
EMG B, Y, EMG2-R #2
```

## 二、EDF 解析与肌电指标计算主链路

这一阶段对应流程图第二行，是项目的核心执行链路。

### 读取 EDF

脚本首先解析 EDF 固定宽度头部字段。

解析内容：

- 文件开始日期与时间
- record 数量
- 单个 record 时长
- 通道数量
- 每个通道的标签、单位、物理量程、数字量程、每 record 样本数
- 每个通道采样率

单文件元数据检查命令：

```bash
python3 emg_analysis.py --metadata-only
```

### 物理量转换

EDF 数据区中的原始样本是 little-endian signed 16-bit 数字量。

脚本使用每个通道头部声明的数字量程和物理量程，将原始数字量转换为实际物理单位。

当前肌电单位为：

```text
mV
```

转换后，每个通道会形成一组按时间顺序排列的 mV 样本序列。

### 合并肌肉通道

同一块肌肉的两个重复通道会按采样点求平均。

合并前会校验：

- 同组通道采样率一致
- 同组通道样本数一致
- 合并后样本序列不能为空

如果 EDF 文件不能被归并为两块肌肉，脚本会抛出错误，避免输出误导性结果。

### RMS 与对称性

RMS 用于表示肌电幅值强度，可作为肌肉发力水平的主要幅值指标。

计算公式：

```text
RMS = sqrt(mean(x^2))
```

两块肌肉发力对称性基于两块肌肉的全程 RMS 计算。

计算公式：

```text
Asymmetry = abs(RMS_A - RMS_B) / (RMS_A + RMS_B) * 100
Symmetry = 100 - Asymmetry
```

同时输出：

- 两块肌肉各自 RMS
- 发力对称性百分比
- 发力不对称性百分比
- 更活跃的肌肉

### MF / MPF 疲劳

频域指标用于判断肌肉疲劳趋势。

当前使用首尾窗口比较：

- First-window：文件开头指定时长窗口
- Last-window：文件结尾指定时长窗口
- 默认窗口：30 秒

可通过命令调整窗口：

```bash
python3 emg_analysis.py --fatigue-window 20
```

中值频率 Median Frequency, MF：

```text
功率谱累计功率达到总功率 50% 时对应的频率
```

平均功率频率 Mean Power Frequency, MPF：

```text
MPF = sum(frequency * power) / sum(power)
```

一般解释：

- MF / MPF 下降：提示肌电频谱向低频移动，疲劳证据增强
- MF / MPF 稳定：疲劳证据不明显
- MF / MPF 上升：可能与动作策略、发力变化、信号噪声或非疲劳因素有关，需要结合 RMS 和实验过程判断

### 综合疲劳评分

当前脚本输出 0-100 的疲劳证据分数。

当前评分口径：

- MF 下降：40%
- MPF 下降：40%
- RMS 上升：20%

每个分项以 50% 变化作为封顶归一化尺度。分数越高，疲劳证据越强。

疲劳等级：

- `low`：小于 25
- `moderate`：25 到 55 之间
- `high`：大于等于 55

注意：该评分是当前上肢实验的工程化比较规则，用于同一批实验内部对比。若后续改成下肢行走实验，应结合足底压力、步态事件和左右腿分组重新定义规则。

## 异常处理与诊断输出

流程图第二行下方包含两类辅助链路。

### 异常处理

需要重点处理的异常包括：

- EDF 头部不足或字段无法解析
- EDF 声明的数据长度与实际数据长度不一致
- 通道数或通道标签不能归并为两块肌肉
- 同组通道采样率不一致
- CSV 导出时各通道样本数不一致
- 频域分析窗口过短

处理原则：

- 优先暴露明确错误信息
- 避免在通道结构不符合预期时继续计算
- 批量模式下按文件逐个解析，便于定位问题文件

### 终端诊断

单文件模式会输出：

- 文件路径
- 起始时间
- records 数量
- record duration
- 总时长
- 通道数量
- 每个通道的采样率、单位和样本数
- EMG 分析指标

典型命令：

```bash
python3 emg_analysis.py
```

## 三、批量对比、可视化交付与复核

这一阶段对应流程图第三行，用于生成可读、可复盘的批量对比结果。

### 批量分析

批量模式会遍历输入目录下所有 `.edf` 文件。

默认目录来自输入路径：

- 输入是目录：分析该目录
- 输入是文件：分析该文件所在目录
- 未提供输入：默认分析 `mat-edf/` 中的文件

典型命令：

```bash
python3 emg_analysis.py --batch --report emg_comparison.html
```

终端会输出每个文件的：

- 对称性
- 综合疲劳评分
- 疲劳等级
- 两块肌肉 RMS

### HTML 对比报告

批量模式生成 HTML 报告。

当前默认文件：

```text
emg_comparison.html
```

报告包含：

- RMS by Muscle
- Symmetry
- Fatigue Score
- Median Frequency Values
- Median Frequency Change
- Mean Power Frequency Values
- Mean Power Frequency Change
- Results Table

结果表中包含每个 EDF 文件、每块肌肉的 RMS、MF 起止值、MF 变化、MPF 起止值、MPF 变化、疲劳方向、疲劳评分、疲劳等级，以及整体对称性和更活跃肌肉。

### CSV 可选导出

单文件模式支持导出对齐后的原始采样表。

典型命令：

```bash
python3 emg_analysis.py --csv emg_output.csv
```

CSV 字段：

- `time_s`
- 每个 EDF 通道的唯一标签

每行代表一个采样时刻，通道值单位为 mV。

### 测试与复盘

当前测试文件：

```text
tests/test_emg_analysis.py
```

测试覆盖：

- EDF 元数据和样本读取
- 重复标签唯一化
- CSV 导出
- 两肌肉 RMS、MF、MPF、疲劳评分结构
- EDF 批量发现
- HTML 报告关键内容

推荐复盘方式：

```bash
python3 -m unittest tests/test_emg_analysis.py
python3 emg_analysis.py --batch --report emg_comparison.html
```

然后根据 HTML 报告比较不同角度、不同任务下的：

- 发力对称性是否更高
- RMS 是否明显增大
- MF / MPF 是否从首窗口到尾窗口下降
- 综合疲劳评分是否更低

