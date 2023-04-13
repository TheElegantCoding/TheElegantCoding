const validateMarkdown = (file) =>
{
  const arrayFiles = file.split('.');
  const fileExtension = arrayFiles[arrayFiles.length - 1];

  if (fileExtension !== 'md')
  {
    return false;
  }

  return true;
};

module.exports = { validateMarkdown };