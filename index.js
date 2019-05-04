const { emptyDir,rmDir } = require('./lib/handleDir.js');
const { getAllFiles } = require('./lib/getAllFiles.js');

module.exports = Object.freeze({ emptyDir,rmDir,getAllFiles });