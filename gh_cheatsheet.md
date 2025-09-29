# GitHub CLI (`gh`) コマンドチートシート

よく使う `gh` コマンドの操作方法をまとめます。

## アカウント認証

### ログイン
対話形式でGitHubアカウントにログインします。ブラウザでの認証が簡単です。
```bash
gh auth login
```
- `--web`: ブラウザを使ってログインします。
- `--with-token`: 標準入力から認証トークンを読み込ませます。

**例:**
```bash
# ブラウザでログインする場合
gh auth login --web
```

---

## Issue

### Issueの作成
新しいIssueをインタラクティブに、または引数で指定して作成します。
```bash
gh issue create
```
- `-t, --title <string>`: Issueのタイトル
- `-b, --body <string>`: Issueの本文
- `-w, --web`: 作成後にブラウザでIssueを開きます。

**例:**
```bash
# タイトルと本文を指定してIssueを作成
gh issue create --title "新しい機能の実装" --body "ここにIssueの詳細を記述します。"
```

### Issueの情報取得

#### 一覧表示
現在のリポジトリのIssueを一覧表示します。
```bash
gh issue list
```
- `--limit <int>`: 表示する最大件数
- `--state <string>`: Issueの状態 (`open`, `closed`, `all`)

**例:**
```bash
# オープンなIssueを10件表示
gh issue list --limit 10 --state open
```

#### 詳細表示
指定した番号のIssueの詳細を表示します。
```bash
gh issue view <issue-number>
```
- `-w, --web`: ブラウザでIssueを開きます。

**例:**
```bash
# 123番のIssueをブラウザで表示
gh issue view 123 --web
```

---

## プルリクエスト (PR)

### プルリクエストの作成
新しいプルリクエストを作成します。
```bash
gh pr create
```
- `-t, --title <string>`: PRのタイトル
- `-b, --body <string>`: PRの本文
- `-B, --base <branch>`: ベースブランチ (マージ先)
- `-H, --head <branch>`: ヘッドブランチ (マージ元)
- `-f, --fill`: コミットメッセージからタイトルと本文を自動入力します。
- `-w, --web`: 作成後にブラウザでPRを開きます。

**例:**
```bash
# mainブランチに向けて現在のブランチからPRを作成
gh pr create --base main --title "新機能の追加" --body "変更点の概要です。"
```

### プルリクエストの情報取得

#### 一覧表示
現在のリポジトリのプルリクエストを一覧表示します。
```bash
gh pr list
```
- `--limit <int>`: 表示する最大件数
- `--state <string>`: PRの状態 (`open`, `closed`, `merged`, `all`)

**例:**
```bash
# オープンなPRを5件表示
gh pr list --limit 5 --state open
```

#### 詳細表示
指定した番号のプルリクエストの詳細を表示します。
```bash
gh pr view <pr-number>
```
- `-w, --web`: ブラウザでPRを開きます。

**例:**
```bash
# 456番のPRをターミナルで表示
gh pr view 456
```
