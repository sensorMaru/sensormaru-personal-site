# Brazilian Portuguese CSV Translation Skill

## 1. Input and Runtime Confirmation

This stage corresponds to the first row of the flowchart. It confirms the CSV input contract, API configuration, and local execution method.

### CSV Input Contract

The script does not depend on header names. The first row is preserved as the header.

Starting from the second row, fields are handled by fixed column positions:

- Column 1: English source text
- Column 2: Brazilian Portuguese translation output

Default input file:

```text
/Users/xy/Documents/BP_translator/wisemeal-bundle-2.csv
```

If a row has fewer than two columns, the script pads the second column with an empty string to avoid write errors. Rows with an empty first column are skipped because there is no source text to translate.

### Runtime Configuration

The script reads this file by default:

```text
/Users/xy/Documents/BP_translator/account.yaml
```

Configuration fields include:

- `base_url`
- `api_key`
- `model_name`

Environment variables can override the file configuration:

```text
OPENAI_BASE_URL
OPENAI_API_KEY
OPENAI_MODEL
AZURE_OPENAI_ENDPOINT
AZURE_OPENAI_API_KEY
```

### Local Execution Entry

The current project is intended to run directly from the PyCharm terminal.

Common command:

```bash
cd /Users/xy/Documents/BP_translator
python3 bp_trans.py
```

During execution, the script prints:

- Input file path
- Output file path
- Processing range
- Number of selected translation rows
- Number of skipped empty source rows
- Batch progress
- Final write path

### Processing Scope

By default, all data rows are processed and existing values in the second column are overwritten.

Optional arguments:

```bash
python3 bp_trans.py --limit 300
python3 bp_trans.py --skip-existing
python3 bp_trans.py --batch-size 20
```

Argument meanings:

- `--limit`: process only the first N data rows, useful for trial runs
- `--skip-existing`: skip rows where the second column already has a value
- `--batch-size`: adjust the number of texts sent to the model per request

## 2. Batch Translation and Format Protection Mainline

This stage corresponds to the second row of the flowchart and is the core execution chain.

### Read CSV

The script reads the file with Python standard library `csv.reader`.

Reading rules:

- Encoding: `utf-8-sig`
- First row: preserved as the header
- From the second row onward: handled as data rows
- Row order: preserved in the output

### Select Rows

The script checks the English source text in the first column row by row.

Processing rules:

- Non-empty first column: add to the translation queue
- Empty first column: skip
- Existing second-column content: overwritten by default
- With `--skip-existing`: skip rows where the second column already has content

The key SOP point is that "process all data" means all rows with English source text in the first column. Empty source rows do not call the translation API.

### Batch Requests

Rows waiting for translation are grouped by `batch-size` and sent to the Chat Completions API.

Request strategy:

- Output format is required to be a JSON object
- Result array fields support `translations`, `items`, or `results`
- Each result must contain `id` and `translation`
- API failures, timeouts, and JSON parse failures are retried automatically

Default retry parameters:

```text
timeout = 120
retries = 3
```

### pt-BR Translation

The model prompt asks for English UI and data text to be translated into:

```text
Brazilian Portuguese (pt-BR)
```

Translation principles:

- Keep mobile App localization natural
- Preserve brand names and units when appropriate
- Do not output explanations
- Do not add extra line breaks
- Translate line by line when the source text contains line breaks

### Format Validation

The script strictly validates two format-sensitive cases.

Placeholder rules:

- If the English source contains `%@`, the translation must keep the same number of `%@`
- If the counts differ, the script stops with an error

Line-break rules:

- English without line breaks: translation is compressed to a single line
- English with line breaks: translation must return the same number of lines
- For multi-line source text, the script requires `translation_lines`
- If the line count differs, the script stops with an error

This avoids merging multiple bullets into one line or introducing incorrect line breaks inside a sentence.

### Write Back to In-Memory Rows

After each batch is translated, the script writes the translation back to the second column of the corresponding data row by `id`.

Write-back rules:

- Only the second column is modified
- The first-column source text is preserved
- Other columns and the original order are preserved
- Valid line breaks inside CSV fields are preserved

## Error Handling and Diagnostic Output

The lower part of the second flowchart row contains two supporting paths.

### Error Handling

Important exception cases include:

- Missing `account.yaml` or missing configuration
- Unavailable API key or endpoint
- API timeout or request failure
- Model returns non-JSON content
- Returned results miss a row `id`
- Empty translation
- `%@` placeholder count mismatch
- Source text has line breaks but translated line count differs

Handling principles:

- Stop immediately when format risk appears
- Do not generate obviously misaligned or format-breaking translations
- Use terminal errors to locate the specific batch or CSV row

### Diagnostic Output

The script prints common diagnostic information to the terminal.

Common output includes:

```text
Rows selected for translation
Skipped empty source rows
Skipped existing translations
Translating rows X-Y of Z
Batch failed on attempt ...
Wrote /Users/xy/Documents/BP_translator/loco_add.csv
```

These messages help confirm:

- Whether the script scanned the full dataset
- How many rows were skipped because the first column was empty
- Whether API retries were triggered
- Whether the output file was written to the expected path

## 3. CSV Delivery and Review Acceptance

This stage corresponds to the third row of the flowchart and verifies that the final CSV is deliverable and rerunnable.

### Generate loco_add.csv

Default output file:

```text
/Users/xy/Documents/BP_translator/loco_add.csv
```

Output rules:

- Encoding: `utf-8-sig`
- Preserve the original header
- Preserve the original row order
- Write Brazilian Portuguese translations into the second column

### Structure Review

Before delivery, review:

- The output CSV row count matches the input CSV
- Rows with a non-empty first column have translations in the second column
- Rows with an empty first column remain empty
- The header is still the first row

Review script:

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

### Format Review

Focus on two format-sensitive cases:

- `%@`: source and translation must contain the same count
- Line breaks: translation should keep the same number of lines as the source

If the script completes normally, both cases have already been validated programmatically. Manual review can prioritize rows containing `%@` or line breaks.

### Rerun Strategy

Common rerun command:

```bash
python3 bp_trans.py
```

By default, this regenerates the final translation by overwriting the second column.

Small-batch verification:

```bash
python3 bp_trans.py --limit 50
```

Keep existing translations and translate only blank target cells:

```bash
python3 bp_trans.py --skip-existing
```

Adjust batch size:

```bash
python3 bp_trans.py --batch-size 10
```

Smaller batches can reduce the chance of a single request failing. Larger batches reduce request count but depend more on API stability.
