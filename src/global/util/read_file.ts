import fs from 'node:fs';
import path from 'node:path';
import { validateMarkdown } from './validate_file';

const readFile = (templatePath: string) => {
  const filesToMerge = fs.readdirSync(templatePath);
  const contentToMerge = filesToMerge.map((file: string) =>{
    if (validateMarkdown(file)) {
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
  fs.writeFileSync(`${writePath}/README.md`, contentToMerge.join(''), 'utf8');
};

export { readFile };
