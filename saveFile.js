const fs = require('fs').promises

function saveFile(fileName, data) {
  const filePath = __dirname + '/data/' + fileName
    return fs.writeFile(filePath, JSON.stringify(data, null, 2))
}
module.exports = saveFile