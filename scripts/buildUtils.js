const fs = require('fs');
export const getFolders = (entry) => {
   const dirs = fs.readdirSync(entry)
   const dirsWithoutIndex = dirs
       .filter(name => name !== 'index.ts')
       .filter(name => name !== 'utils')
       .filter(name => name !== 'reportWebVitals.ts')
       .filter(name => name !== 'setupTests.ts')
       .filter(name => name !== 'stories')
       .filter(name => name !== 'react-app-env.d.ts')
       .filter(name => name !== 'config');

  console.log(dirsWithoutIndex);
  return dirsWithoutIndex
}

export const getFiles = (entry, extensions = [], excludeExtensions = []) => {
  let fileNames = [];
  const dirs = fs.readdirSync(entry);
  dirs.forEach((dir) => {
    const path = `${entry}/${dir}`;
   
    if (fs.lstatSync(path).isDirectory()) {
      fileNames = [
        ...fileNames,
        ...getFiles(path, extensions, excludeExtensions),
      ];

      return;
    }

    if (!excludeExtensions.some((exclude) => dir.endsWith(exclude))
      && extensions.some((ext) => dir.endsWith(ext))
    ) {
      fileNames.push(path);
    }
  });
  return fileNames;
};
