const fs = require('fs');

const globby = require('globby');

const postsPath = './content/_posts';

(async () => {
  const paths = await globby([`${postsPath}`]);

  /* eslint-disable-next-line array-callback-return */
  paths.map(path => {
    let file = fs.readFileSync(path).toString();
    if (!file.startsWith('---')) {
      file = `---\n${file}`;
      fs.writeFileSync(path, file);
    }
  });
})();
