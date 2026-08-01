#!/usr/bin/env bash
# Generates gallery thumbnails from full-size images in img/ into img/thumbs/.
# Requires ImageMagick (`convert`). Run from anywhere; paths are resolved
# relative to the repo root.
set -euo pipefail

repo_root=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
src_dir="$repo_root/img"
thumbs_dir="$src_dir/thumbs"

mkdir -p "$thumbs_dir"

for f in "$src_dir"/*.webp; do
  [ -f "$f" ] || continue
  base=$(basename "$f")
  convert "$f" -resize '400x>' -quality 85 "$thumbs_dir/$base"
  echo "Generated: img/thumbs/$base"
done
