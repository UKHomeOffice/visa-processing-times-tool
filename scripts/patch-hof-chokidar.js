/* eslint-disable eol-last */
'use strict';

const fs = require('fs');
const path = require('path');

const watchTaskPath = path.join(
  __dirname,
  '..',
  'node_modules',
  'hof',
  'build',
  'tasks',
  'watch',
  'index.js'
);

const source = fs.readFileSync(watchTaskPath, 'utf8');
const requireStatement = "const chokidar = require('chokidar');";
const watchFunctionStart = '  function watch() {\n    return new Promise(resolve => {';
const watchFunctionEnd = '    });\n  }\n\n  function loadenv() {';
const originalWatchStatement = '      const watcher = chokidar.watch(watchLocation, { ignored });';
const patchedWatchStatement = '      const { watch: watchFiles } = await import(\'chokidar\');\n' +
  '      const watcher = watchFiles(watchLocation, { ignored });';

if (source.includes('return import(\'chokidar\').then')) {
  // Already patched.
} else if (source.includes(watchFunctionStart) && source.includes(watchFunctionEnd) &&
  (source.includes(originalWatchStatement) || source.includes(patchedWatchStatement))) {
  const updatedSource = source
    .replace(requireStatement, '')
    .replace(
      watchFunctionStart,
      '  function watch() {\n' +
        '    return import(\'chokidar\').then(({ watch: watchFiles }) => new Promise(resolve => {'
    )
    .replace(
      source.includes(patchedWatchStatement) ? patchedWatchStatement : originalWatchStatement,
      '      const watcher = watchFiles(watchLocation, { ignored });'
    )
    .replace(watchFunctionEnd, '    }));\n  }\n\n  function loadenv() {');

  fs.writeFileSync(watchTaskPath, updatedSource);
} else {
  throw new Error(`Unexpected HOF watch task structure: ${watchTaskPath}`);
}
