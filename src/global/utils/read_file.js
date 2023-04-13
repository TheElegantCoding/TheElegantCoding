const fs = require('fs');
const path = require('path');
const { validateMarkdown } = require('./validate_file');

const readFile = (templatePath) =>
{
  const filesToMerge = fs.readdirSync(templatePath);
  const contentToMerge = filesToMerge.map((file) =>
  {
    if (validateMarkdown(file))
    {
      const origFilePath = path.join(templatePath, file);
      const stats = fs.statSync(origFilePath);
      if (stats.isFile())
      {
        const contents = fs.readFileSync(origFilePath, 'utf8');
        return contents;
      }
    }
    return '';
  });

  const writePath = path.join(process.cwd());
  fs.writeFileSync(`${writePath}/README.md`, contentToMerge.join('<br />'), 'utf8');
};

module.exports = { readFile };