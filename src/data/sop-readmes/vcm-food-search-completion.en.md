# Food Library Search Result Cleaning and Nutrition Estimation Skill

## Flowchart Reference

This README corresponds to the project flowchart:

```text
artifacts/vcm_food_project_flow_4x3.svg
```

The flowchart theme is:

```text
Food library processing SOP based on raw_data, language allowlist, Python multilingual cleaning, and nutrition-estimation split delivery
```

Core scripts:

```text
vcm_food_clean.py
vcm_food_nutri.py
```

Final deliverables:

```text
vcm_food_clean.csv
vcm_food_nutri_part*.xlsx
```

## 1. Input and Processing Scope Confirmation

This stage confirms the raw data, language scope, and runtime basics.

### Raw Search Data

The cleaning script reads:

```text
raw_data.xlsx
```

The path is calculated relative to `vcm_food_clean.py`, so the whole project folder can be moved and rerun elsewhere.

The raw table must include:

- `content`: original search term or food name
- `lang`: source language value carried by the raw data

The process preserves original statistics fields and appends structured fields later.

### Language Allowlist

The allowed language set is read from:

```text
lang.xlsx
```

The script maps the raw `lang` value to a language value allowed by `lang.xlsx`.

Current mapping rules:

- Raw `lang` values `en_TH` or `en-TH` output `th`
- Raw `lang` values `zh-CN` or `zh-MY` output `zh-cn`
- Other values starting with `zh` output `zh`
- Other languages use the first two letters and match against `lang.xlsx`
- Rows that cannot match an allowed language are removed

### Runtime Configuration

The cleaning script runs locally with Python.

Core input and output paths:

```text
raw_data.xlsx
lang.xlsx
vcm_food_clean.csv
```

Optional online and LLM configuration comes from:

```text
account.yaml
```

`account.yaml` is local private configuration for runtime use only and is not part of the public delivery package.

### Filtering Rules

Before formal cleaning, the script skips data that should clearly not enter the food library.

Skip rules include:

- Empty `content`
- `content` equal to `未知`
- `content` unrelated to food or brands, such as `21世紀`
- Source language cannot be mapped to `lang.xlsx`

## 2. Food Cleaning, Translation, and Structuring Mainline

This stage maps to the second row of the flowchart and is the core processing path of `vcm_food_clean.py`.

### Row-by-Row Reading

The script reads raw data row by row and normalizes `content`.

Main processing:

- Trim leading and trailing spaces
- Remove food quantities, such as turning `2个水煮蛋` into `水煮蛋`
- Preserve original fields for analysis

### Language Mapping

The output `lang` field is based primarily on the raw data's own `lang` field instead of re-guessing.

This field also constrains later fields:

- `food_name` must use the language corresponding to `lang`
- `brand` must use the language corresponding to `lang`
- `unit` must use the language corresponding to `lang`
- `trans` is fixed as a Simplified Chinese explanation

### Brand Recognition

The script determines whether `content` contains a brand.

Recognition sources:

- Local brand alias dictionary
- Explicit product rules, such as McNuggets or FamilyMart tea eggs
- Online search results and LLM-assisted judgment
- Non-brand exclusion terms, such as common food words, alcoholic beverage names, and protein terms

`brand` field rules:

- If a brand is identified, fill in the most standard and common brand spelling for that language
- Within one language, keep only one spelling for the same brand
- If no brand is identified, leave the field empty

### Food Name Generation

`food_name` must be a specific food name, never only a brand name.

Generation rules:

- If `content` is a common food, clean it into a concrete food name in the target language
- If `content` contains a brand and food, output `Brand, Food`
- If `content` contains only a brand, choose a specific, short, common signature food from that brand
- If the model returns the wrong language for `lang`, repair it with local rules
- Traditional Chinese content remains Traditional Chinese and is not auto-converted to Simplified Chinese

Brand-food examples:

```text
KFC, Biscuit
麥當勞, 麥樂雞
全家, 茶葉蛋
丸亀製麺, うどん
```

### Chinese Explanation

The `trans` field stores the Simplified Chinese translation or explanation of `food_name`.

Principles:

- `trans` must not be empty
- Brand foods are translated into a combined Simplified Chinese result
- Japanese, Thai, Italian, and other non-Chinese content prefer local dictionaries or online translation fallback
- If online access fails, the script falls back to a local explainable result instead of stopping

### Unit and Amount

The script infers the most suitable `unit` from `content` and `food_name`.

Unit rules:

- Eggs and fruit use item-like units
- Milk, coffee, tea, juice, latte, and similar drinks use cup-like units
- McNuggets, fries, burgers, rice, noodles, sushi, and similar foods use serving-like units
- If the unit cannot be determined, use `g`

`unit` should be localized according to `lang`; `g` remains English.

`amount` rules:

- Gram-based units, including `g` and localized gram spellings, use `100`
- Serving, item, cup, and other non-gram units use `1`

### Online Fallback and Error Handling

When local rules cannot reliably determine the brand, food, or translation, the script can use online search and LLM results as auxiliary signals.

Error handling principles:

- Network timeouts or connection resets should not crash the script
- Missing LLM configuration falls back to local rules
- Search or model results are only auxiliary; final output still passes language consistency, brand format, and non-empty checks

### Quality Closure

Before writing the CSV, the script performs final fixes.

Key fixes:

- Clean results such as `Brand, , Food`
- Avoid `food_name` containing only a brand
- Avoid repeated brand or food names
- Normalize brand spelling within the same language
- Deduplicate by `lang + brand + food_name`, keeping the first record

## 3. Cleaning Results, Nutrition Estimation, and Delivery Acceptance

This stage generates final deliverable files.

### Cleaning CSV

Running `vcm_food_clean.py` generates:

```text
vcm_food_clean.csv
```

The file contains original fields and appended fields:

- `food_name`
- `trans`
- `lang`
- `brand`
- `unit`
- `amount`

The terminal shows key fields for manual spot checks:

```text
content
food_name
trans
lang
brand
unit
```

### Nutrition Estimation

The nutrition script reads:

```text
vcm_food_clean.csv
```

It estimates nutrition from:

- `food_name`
- `unit`
- `amount`
- `trans`

Estimation logic:

- Match built-in per-100g nutrition profiles
- Convert values according to the current unit and amount
- Use a generic food profile if the item cannot be recognized
- Nutrition fields output numbers only, with no units
- Decimals are rounded to one digit
- `calories(kcal)` is rounded to an integer when needed
- Nutrition values equal to `0` are output as empty

### Excel Splitting

Running `vcm_food_nutri.py` outputs:

```text
vcm_food_nutri_part1.xlsx
vcm_food_nutri_part2.xlsx
...
```

Split rules:

- Output one xlsx file per 180 rows
- Each xlsx file keeps the header row
- Field order starts with `food_name`, `brand`, `lang`, `unit`, and `amount`
- Nutrition fields are appended in later columns

### Acceptance Review

Before delivery, check each item against the flowchart.

Cleaning result acceptance:

- `vcm_food_clean.csv` has been generated
- `food_name` is not empty
- `food_name` is not only a brand name
- `food_name` language matches `lang`
- `brand` language matches `lang`
- `trans` is not empty and is Simplified Chinese
- `unit` is not empty and matches `lang`
- Duplicate same-language, same-brand, same-food records have been removed

Nutrition result acceptance:

- `vcm_food_nutri_part*.xlsx` has been generated
- Each file has at most 180 rows
- Each file keeps the header row
- `calories(kcal)` is an integer
- Other nutrition fields keep at most one decimal
- Zero-value nutrition fields are empty

## Output List

A complete run should produce the following artifacts.

### Cleaning Result

```text
vcm_food_clean.csv
```

This file is the nutrition-estimation input and the main review source for food name, brand, translation, language, unit, and amount.

### Nutrition Split Files

```text
vcm_food_nutri_part*.xlsx
```

These are the final delivery spreadsheets, split into one file per 180 rows.

### Project Notes

```text
PROJECT_STATUS.md
skills/README.md
artifacts/vcm_food_project_flow_4x3.svg
```

These files explain the current project status, SOP flow, and reusable execution rules.

## Future Extension Directions

### Add Brand and Food Rules

When manual review finds new brands or misclassifications, prioritize adding:

- Brand aliases
- Standard brand spellings
- Signature foods for brands
- Common food term exclusion rules

### Stabilize Regression Samples

Extract samples from raw data that cover multiple languages, brands, common foods, quantities, units, and deduplication for repeatable tests.

Key samples:

- Traditional Chinese foods
- Simplified Chinese foods
- Japanese brands and foods
- Thai foods
- English or European-language fruit and drinks
- Brand-only input
- Food-only input that can clearly belong to a brand

### Improve Nutrition Profiles

Current nutrition results are estimates. Future work can extend:

- Common branded fast-food profiles
- Drink profiles
- Regional food profiles for rice, noodles, hotpot, sushi, and more
- More precise unit-to-weight mappings

All nutrition extensions should keep numeric-only field output and preserve the split-delivery rule.
