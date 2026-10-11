import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const bundled = path.join(os.homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/python', process.platform === 'win32' ? 'python.exe' : 'bin/python');
const candidates = [...new Set([process.env.PYTHON_EXECUTABLE, bundled, 'python', 'python3'].filter(Boolean))];
let executable;
for (const candidate of candidates) {
  const probe = spawnSync(candidate, ['-c', 'import reportlab, pypdf'], { encoding: 'utf8' });
  if (probe.status === 0) { executable = candidate; break; }
}
if (!executable) throw new Error('Data-sheet generation requires Python with reportlab and pypdf. Set PYTHON_EXECUTABLE to the bundled runtime.');
const result = spawnSync(executable, ['-X', 'utf8', 'tools/generate-standard-sprinkler-datasheet.py'], { encoding: 'utf8' });
process.stdout.write(result.stdout || '');
process.stderr.write(result.stderr || '');
if (result.status !== 0) process.exit(result.status || 1);
