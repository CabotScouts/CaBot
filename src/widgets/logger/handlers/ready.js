var { getDoc, getSheets, setSheets } = require('../caches/sheetCache')

module.exports = async client => {
  var doc = getDoc()
  var sheets = getSheets()

  await doc.useServiceAccountAuth(require('../../../../google-service-account'))
  await doc.loadInfo()
  doc.sheetsByIndex.map(sheet => sheets.set(sheet.title, sheet.sheetId))
  setSheets(sheets)

  console.log('logger: ready')
}
