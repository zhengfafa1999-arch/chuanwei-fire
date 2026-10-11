# PDF download removal

2026-10-10. User requested removal of PDF downloads and specifically the standard-response sprinkler summary card with version, English language and 310 KB size.

Removed the EN/AR file-page PDF card and the data-building code that reads this PDF. Restored the existing catalog and model-specific document request introduction. The catalog requests, ISO images and patent scans remain available.

Cleared standard-response product downloads and the download validation anchor, removed unused PDF CTA translations, and updated buyer-copy requirements accordingly. Both EN/AR product pages therefore omit the PDF section and its tab. Shared product-template support for possible future files remains dormant.

Removed the npm `datasheet` command and removed PDF generation from `prebuild`; normal builds generate thumbnails only. PDF generation tools are internal historical utilities, not part of current build or the public website.

Moved the existing PDF out of public `assets/downloads/` to `docs/release/pdf-download-removal-20261010/source/standard-response-fire-sprinklers-en.pdf` for recovery. SHA256: `4726e11252e8776a359b726a3d610937bd21913f3f68b13ae679b02a764146c8`. No certificate scan or qualification source was removed.

The current candidate ZIP excludes this PDF and internal docs. Prior candidate ZIPs are historical rollback copies. No deployment was performed. When updating an existing server, remove the old public path `assets/downloads/standard-response-fire-sprinklers-en.pdf` as well as replacing the changed pages; overlay upload alone does not remove obsolete files.

Validation: `npm --ignore-scripts run build` passed for 185 published pages, including 2305 images, 47882 internal references and 846 new-window links. The separate generated-page scan found zero PDF links in all 185 pages, confirmed the removed product section/tab is absent, the old public file is absent, and npm no longer generates it. Evidence: `docs/release/pdf-download-removal-20261010/validation.json`. Changed source files pass `git diff --check`. Candidate ZIP verifies all entries, CRC and SHA256 values. This is a content removal; no new browser interaction or message sending is involved.
