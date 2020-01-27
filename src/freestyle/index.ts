import tl = require('azure-pipelines-task-lib/task');
import tr = require('azure-pipelines-task-lib/toolrunner');

async function run() {
  const cwd = tl.getInput('cwd');

  tl.debug(`Executing NPM Command in: ${cwd}`);
  const npm = new tr.ToolRunner('npm');
  npm.line('run sentry -- ' + tl.getInput('command') || '--help');
  npm
    .exec({
      cwd: cwd
    } as any)
    .then(async success => {
      tl.setResult(
        tl.TaskResult.Succeeded,
        `Succesfully run command`
      );
    }, async error => {
      tl.setResult(tl.TaskResult.Failed, error.message);
    });
}


run();
