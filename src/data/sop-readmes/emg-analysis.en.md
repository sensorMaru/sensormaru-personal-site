# EMG EDF Parsing and Fatigue Comparison Skill

## 1. Input and Experiment Scope Confirmation

This stage maps to the first row of the flowchart and confirms the experiment data, runtime baseline, and muscle-grouping boundaries.

### SOP / Task Scope

Before running the script, confirm the experiment condition represented by each EDF file.

Current file-naming scope:

- Angle: for example `45`, `80`, `180`
- Task: for example `drawing`, `reading`, `blocks`
- Time segment: for example `0-150`, `10-140`, `20-150`
- File type: raw EDF EMG data

The file name is the primary experiment label in the batch comparison report, so future collection should keep the same naming convention.

### EDF File Directory

Current EDF files are stored in:

```text
mat-edf/
```

Batch mode reads all `.edf` files in this directory and analyzes them one by one in filename order.

Typical command:

```bash
cd /Users/xy/Documents/EMG
python3 emg_analysis.py --batch --report emg_comparison.html
```

### Runtime Environment

The project uses a local Python script. Core parsing and report generation only depend on the Python standard library.

No extra third-party dependencies are required.

Validation commands:

```bash
python3 -m unittest tests/test_emg_analysis.py
python3 -m py_compile emg_analysis.py tests/test_emg_analysis.py
```

### Channel and Muscle Grouping

Each EDF file currently contains 4 EMG channels, merged by original channel label into two muscles.

Current grouping logic:

- Channels with the same label are treated as repeated capture channels for the same muscle
- Repeated channels under each muscle are averaged first
- RMS, MF, MPF, and fatigue score calculations are based on the merged muscle series

Example channel labels:

```text
EMG A, X, EMG2-R
EMG A, X, EMG2-R #2
EMG B, Y, EMG2-R
EMG B, Y, EMG2-R #2
```

## 2. EDF Parsing and EMG Metric Calculation Mainline

This stage maps to the second row of the flowchart and is the core execution path.

### Read EDF

The script first parses the fixed-width EDF header fields.

Parsed content:

- File start date and time
- Record count
- Duration of a single record
- Channel count
- Each channel's label, unit, physical range, digital range, and samples per record
- Sampling rate for each channel

Single-file metadata check command:

```bash
python3 emg_analysis.py --metadata-only
```

### Physical Unit Conversion

Raw samples in the EDF data area are little-endian signed 16-bit digital values.

The script uses each channel's declared digital range and physical range to convert raw digital values into physical units.

Current EMG unit:

```text
mV
```

After conversion, each channel becomes a time-ordered mV sample series.

### Merge Muscle Channels

The two repeated channels for the same muscle are averaged point by point.

Checks before merging:

- Channels in the same group use the same sampling rate
- Channels in the same group have the same sample count
- The merged sample series is not empty

If an EDF file cannot be reduced into two muscles, the script raises an error to avoid misleading output.

### RMS and Symmetry

RMS represents EMG amplitude strength and serves as the main amplitude metric for muscle activation.

Formula:

```text
RMS = sqrt(mean(x^2))
```

Activation symmetry between the two muscles is calculated from their full-duration RMS values.

Formula:

```text
Asymmetry = abs(RMS_A - RMS_B) / (RMS_A + RMS_B) * 100
Symmetry = 100 - Asymmetry
```

The script also outputs:

- RMS for each muscle
- Activation symmetry percentage
- Activation asymmetry percentage
- More active muscle

### MF / MPF Fatigue

Frequency-domain metrics are used to judge muscle fatigue trends.

The current method compares the first and last windows:

- First window: a configured duration at the beginning of the file
- Last window: a configured duration at the end of the file
- Default window: 30 seconds

The window can be adjusted with:

```bash
python3 emg_analysis.py --fatigue-window 20
```

Median Frequency, MF:

```text
The frequency where cumulative power reaches 50% of total power
```

Mean Power Frequency, MPF:

```text
MPF = sum(frequency * power) / sum(power)
```

General interpretation:

- MF / MPF decrease: indicates an EMG spectrum shift toward lower frequencies and stronger fatigue evidence
- MF / MPF stable: fatigue evidence is not obvious
- MF / MPF increase: may relate to movement strategy, activation changes, signal noise, or non-fatigue factors, and should be judged together with RMS and experiment context

### Composite Fatigue Score

The script outputs a 0-100 fatigue evidence score.

Current scoring scope:

- MF decrease: 40%
- MPF decrease: 40%
- RMS increase: 20%

Each component uses 50% change as the capped normalization scale. Higher scores mean stronger fatigue evidence.

Fatigue levels:

- `low`: less than 25
- `moderate`: from 25 to 55
- `high`: greater than or equal to 55

Note: this score is an engineered comparison rule for the current upper-limb experiment. If the scope later changes to lower-limb walking experiments, the rule should be redefined with plantar pressure, gait events, and left-right leg grouping.

## Error Handling and Diagnostic Output

The auxiliary paths below the second row of the flowchart cover error handling and diagnostics.

### Error Handling

Key exceptions to handle:

- EDF header is incomplete or fields cannot be parsed
- Declared EDF data length does not match actual data length
- Channel count or labels cannot be grouped into two muscles
- Sampling rates differ within a channel group
- CSV export finds inconsistent sample counts across channels
- Frequency-domain analysis window is too short

Handling principles:

- Prefer explicit error messages
- Avoid continuing calculations when the channel structure does not match expectations
- In batch mode, parse files one by one so problematic files are easy to locate

### Terminal Diagnostics

Single-file mode outputs:

- File path
- Start time
- Record count
- Record duration
- Total duration
- Channel count
- Each channel's sampling rate, unit, and sample count
- EMG analysis metrics

Typical command:

```bash
python3 emg_analysis.py
```

## 3. Batch Comparison, Visual Delivery, and Review

This stage maps to the third row of the flowchart and generates readable, reviewable batch comparison results.

### Batch Analysis

Batch mode scans all `.edf` files in the input directory.

The default directory comes from the input path:

- If the input is a directory: analyze that directory
- If the input is a file: analyze that file's parent directory
- If no input is provided: analyze files under `mat-edf/`

Typical command:

```bash
python3 emg_analysis.py --batch --report emg_comparison.html
```

The terminal prints each file's:

- Symmetry
- Composite fatigue score
- Fatigue level
- RMS for the two muscles

### HTML Comparison Report

Batch mode generates an HTML report.

Current default file:

```text
emg_comparison.html
```

The report includes:

- RMS by Muscle
- Symmetry
- Fatigue Score
- Median Frequency Values
- Median Frequency Change
- Mean Power Frequency Values
- Mean Power Frequency Change
- Results Table

The results table includes each EDF file, each muscle's RMS, MF start/end values, MF change, MPF start/end values, MPF change, fatigue direction, fatigue score, fatigue level, overall symmetry, and more active muscle.

### Optional CSV Export

Single-file mode supports exporting an aligned raw sample table.

Typical command:

```bash
python3 emg_analysis.py --csv emg_output.csv
```

CSV fields:

- `time_s`
- Unique label for each EDF channel

Each row represents one sampling moment, with channel values in mV.

### Testing and Review

Current test file:

```text
tests/test_emg_analysis.py
```

Test coverage:

- EDF metadata and sample reading
- Duplicate label uniquification
- CSV export
- Two-muscle RMS, MF, MPF, and fatigue score structure
- EDF batch discovery
- Key HTML report content

Recommended review commands:

```bash
python3 -m unittest tests/test_emg_analysis.py
python3 emg_analysis.py --batch --report emg_comparison.html
```

Then use the HTML report to compare different angles and tasks:

- Whether activation symmetry is higher
- Whether RMS increases noticeably
- Whether MF / MPF decrease from the first window to the last window
- Whether the composite fatigue score is lower
