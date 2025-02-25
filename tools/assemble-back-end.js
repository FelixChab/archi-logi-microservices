const fs = require('fs');
const path = require('path');

const patternsToRemoveFromPackageJson = ['@angular/', '@ngrx/', '@ngx', 'firebase', 'ngx-', 'rxjs', 'zone.js'];

async function execute() {
  rewritePackageJson(path.join('dist/apps/referential', 'package.json'), patternsToRemoveFromPackageJson);

  console.log('Copying package and package-lock files... DONE!');
  console.log('ALL DONE!');
}

function rewritePackageJson(targetPath, patternsToRemove) {
  const packageJsonContent = fs.readFileSync('./package.json', 'utf8');
  const packageJson = JSON.parse(packageJsonContent);
  packageJson['devDependencies'] = {};
  packageJson['scripts'] = {};

  const dependencies = {};

  for (let key in packageJson['dependencies']) {
    if (patternsToRemove.some((pattern) => key.includes(pattern))) {
      continue;
    }
    dependencies[key] = packageJson['dependencies'][key];
  }
  packageJson['dependencies'] = dependencies;
  packageJson['overrides'] = {};

  fs.writeFileSync(targetPath, JSON.stringify(packageJson, null, 2));
}

execute();
