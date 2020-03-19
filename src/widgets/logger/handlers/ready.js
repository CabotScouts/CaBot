var { getDoc, getSheets, setSheets } = require('../caches/sheetCache')

module.exports = async client => {
  var doc = await getDoc()
  var sheets = await getSheets()

  await doc.useServiceAccountAuth(require('../../../../google-service-account'))
  await doc.loadInfo()
  doc.sheetsByIndex.map(sheet => sheets.set(sheet.title, sheet.sheetId))
  await setSheets(sheets)

  console.log('logger: ready')
}
