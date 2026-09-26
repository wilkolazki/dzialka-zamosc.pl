#!/usr/bin/env bash
# Converts .png/.jpg/.jpeg images in img/ to .webp and moves the originals
# into img/orig/. Existing .webp files are never overwritten.
# Requires ImageMagick (`convert`). Run from anywhere; paths are resolved
# relative to the repo root.
set -euo pipefail
shopt -s nullglob nocaseglob

repo_root=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
src_dir="$repo_root/img"
orig_dir="$src_dir/orig"

mkdir -p "$orig_dir"

for f in "$src_dir"/*.png "$src_dir"/*.jpg "$src_dir"/*.jpeg; do
  base=$(basename "$f")
  webp="$src_dir/${base%.*}.webp"
  if [ -e "$webp" ]; then
    echo "Skipped: img/$base (img/$(basename "$webp") already exists)"
    continue
  fi
  if [ -e "$orig_dir/$base" ]; then
    echo "Skipped: img/$base (img/orig/$base already exists)"
    continue
  fi
  convert "$f" -auto-orient -quality 85 "$webp"
  mv "$f" "$orig_dir/$base"
  echo "Converted: img/$base -> img/$(basename "$webp")"
done
