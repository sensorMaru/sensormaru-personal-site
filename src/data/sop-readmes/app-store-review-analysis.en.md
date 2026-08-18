# App Store Review Collection and Analysis Skill

## Flowchart Reference

This README corresponds to:

```text
artifacts/review_analysis_project_flow_4x3.svg
```

Core script:

```text
review_check_v2.py
```

Final deliverables:

```text
review_data.xlsx
qimai_downloads/
logs / diagnostic text files
```

## 1. Input and Scope Confirmation

This stage confirms the task boundary, data scope, and delivery standard.

### SOP / Business Rules

Confirm the review collection scope and delivery requirements before execution.

Current scope:

- Date range: last month
- Rating: all
- Review type: all
- Sort: newest reviews
- Region: United States
- Output format: Excel xlsx
- Output requirement: keep review details and generate an analysis summary

### App List and Links

The App list is maintained in `APP_CONFIGS` inside `review_check_v2.py`.

Each App configuration includes:

- App name
- Qimai review detail page URL

The URL must point to the United States review page and include:

```text
/country/us
```

### Runtime Environment

The project uses a local Python automation workflow.

Core dependencies:

- `Playwright`: opens Qimai pages, sets filters, and triggers export
- `openpyxl`: reads and generates Excel files
- Python standard library: handles paths, dates, CSV, logs, and backups

Installation:

```bash
python3 -m pip install playwright openpyxl
python3 -m playwright install chromium
```

### Login State and Cache

Qimai may require login or verification, so the script opens a visible Chromium window by default.

Login cache file:

```text
qimai_storage_state.json
```

On the first run, complete login or verification in the browser if requested. After login succeeds, the script saves the state and reuses it on later runs.

## 2. Automation Collection and Data Processing Mainline

This stage is the core execution chain.

### Iterate Apps

The script reads `APP_CONFIGS` and opens each App's Qimai review link in order.

Execution strategy:

- Record errors when a single App fails
- Continue processing later Apps as much as possible
- Keep terminal logs for troubleshooting

### Set Filters

After entering the review page, the script sets the base review filters.

Filters:

- Rating: all
- Review type: all
- Sort: newest reviews

These filters are located through visible page text and elements. If Qimai changes its page structure, check the filter click logic first.

### Time and Region

The script then applies date and region criteria.

Filters:

- Date: last month
- Region: United States

The region is also verified through `/country/us` in the URL. If the page cannot click the region filter automatically, check whether the region control is hidden or whether the link already defaults to the United States.

### Export Data

After filters are set, the script clicks the "export data" button on the Qimai page.

Export logic:

- Locate the visible export button
- Listen for the browser download event
- Use a JS fallback click when a normal click fails
- Write diagnostic information when download times out or fails

### Save Raw Table

Each App's raw export file is saved to:

```text
qimai_downloads/
```

Save rules:

- Prefix the file name with the App name
- Avoid overwriting exports from different Apps
- Keep the raw table as evidence for later review

### Parse and Normalize

The script reads Qimai-exported `xlsx` or `csv` files and maps them into a unified schema.

Processing:

- Detect exported table headers
- Map review time, user name, rating, title, and review content
- Clean whitespace and abnormal text
- Deduplicate records
- Generate incremental `review_id` values starting from 1 in each App sheet

## Error Handling and Diagnostic Output

The second row of the flowchart includes two supporting paths.

### Error Handling

Key cases:

- Login / verification failure
- Download failure
- Empty export table
- Parse failure

Principles:

- Preserve onsite information first
- A single App failure should not stop the whole task
- Manually complete Qimai login or verification and rerun when needed

### Diagnostic Output

Common diagnostic files:

```text
qimai_export_debug.txt
qimai_debug_*_low_count.txt
```

Use them to inspect:

- Whether the page loaded successfully
- Whether review counts are unexpectedly low
- Whether the export button is visible
- Whether the download event was triggered
- Whether the raw export table is empty

## 3. Excel Delivery and Review Analysis

This stage generates the final readable and reviewable Excel file.

### Build Sheets by App

The script creates one independent Sheet for each App.

Each detail Sheet contains:

- `review_id`
- `评论时间`
- `用户名`
- `评级`
- `标题`
- `评论内容`
- `评论内容翻译`

`review_id` starts from 1 in each App Sheet.

### Review Content Translation

The current version does not perform automatic translation.

Handling:

- Keep the `评论内容翻译` field
- Leave the field empty
- Later translation results can be written into this field through local or free tools

### Review Analysis Sheet

`review_data.xlsx` adds a Sheet named:

```text
评论分析
```

This Sheet contains:

- `app名称`
- `好评主要原因`
- `差评主要原因`

Analysis requirements:

- Summarize main positive review reasons for each App
- Summarize main negative review reasons for each App
- Mark each reason with corresponding `review_id` evidence
- Let users return to App detail Sheets for review through `review_id`

### Interaction and Acceptance

Excel output should be easy to inspect.

Current interaction and formatting requirements:

- App names in `评论分析` can jump to their corresponding App Sheets
- App jumps use Excel internal link formulas
- Freeze the first row
- Enable filters
- Set reasonable column widths
- Back up old `review_data.xlsx` before generating a new file

Internal link formula example:

```text
=HYPERLINK("#'工作表名'!A1","App 名称")
```

Do not use external file-path hyperlinks, which may cause Excel to report that the specified file cannot be opened.

## Output List

A full run should produce the following artifacts.

### Excel Delivery File

```text
review_data.xlsx
```

This is the final deliverable, including the `评论分析` Sheet and all App detail Sheets.

### Raw Export Tables

```text
qimai_downloads/
```

This directory stores each App's raw review table exported from Qimai.

### Logs / Diagnostic Text

```text
qimai_export_debug.txt
qimai_debug_*_low_count.txt
```

These files help locate login, download, filtering, and parsing issues.

## Acceptance Criteria

Before delivery, confirm against the flowchart:

- Filters are set according to the SOP scope
- All Apps in `APP_CONFIGS` have been processed
- `qimai_downloads/` contains raw export files
- `review_data.xlsx` has been generated
- The `评论分析` Sheet exists
- Each App has a corresponding Sheet
- Each App Sheet has complete fields
- `review_id` increments from 1 in every App Sheet
- `评论内容翻译` exists and may be empty in the current version
- App names in `评论分析` can jump to the corresponding Sheets
- Positive / negative reasons include `review_id` evidence

## Future Extensions

### Add App

Add a new entry in `APP_CONFIGS` inside `review_check_v2.py`.

Confirm:

- The App name is suitable as an Excel Sheet name
- The Qimai link is a review detail page
- The URL region is `/country/us`

### Add Translation

The current workflow only reserves the translation field. To enable translation:

- Prefer local or free libraries
- Keep empty values when translation fails
- Do not affect review details or analysis Sheet generation

### Improve Review Analysis

Current review analysis is based on local rules and review evidence. Future dimensions can include:

- Pricing / subscription issues
- Feature experience
- Recognition accuracy
- Stability and bugs
- Ads or paywalls
- Food database and nutrition logging
- Customer support and developer replies

Every analysis point should keep `review_id` evidence to avoid conclusions that cannot be traced.
