"""Run the package's actual build steps directly, avoiding nested npm startup."""
import json
import shlex
import subprocess
import time
import argparse
from pathlib import Path

root = Path(__file__).resolve().parents[3]
scripts = json.loads((root / 'package.json').read_text(encoding='utf-8'))['scripts']
parser = argparse.ArgumentParser()
parser.add_argument('--skip-thumbnails', action='store_true', help='Use unchanged existing thumbnails when no images changed.')
parser.add_argument('--log-file', default='docs/reviews/material-batch-20261018/build-verified.log')
options = parser.parse_args()

def expand(script):
    for command in scripts[script].split(' && '):
        args = shlex.split(command)
        if args[:2] == ['npm', 'run']:
            yield from expand(args[2])
        else:
            yield args

log_file = root / options.log_file
log_file.parent.mkdir(parents=True, exist_ok=True)
with log_file.open('w', encoding='utf-8') as log:
    for args in [*([] if options.skip_thumbnails else expand('prebuild')), *expand('build')]:
        for attempt in range(3):
            result = subprocess.run(args, cwd=root, capture_output=True, encoding='utf-8', errors='replace')
            output = result.stdout + result.stderr
            log.write('> ' + ' '.join(args) + '\n' + output + '\n')
            log.flush()
            if result.returncode == 0:
                print(output.strip(), flush=True)
                break
            if 'UNKNOWN: unknown error, open' in output and attempt < 2:
                print('Transient Windows file lock; retrying the same step.', flush=True)
                time.sleep(5)
                continue
            print(output, flush=True)
            raise SystemExit(result.returncode)
