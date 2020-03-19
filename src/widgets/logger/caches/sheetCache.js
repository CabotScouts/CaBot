const { LOG_SHEET } = require('../../../../credentials.json')
const { GoogleSpreadsheet } = require('google-spreadsheet')
const doc = new GoogleSpreadsheet(LOG_SHEET)
var sheets = new Map()

module.exports = {
  getDoc : () => {
    return doc
  },

  hasSheet : (sheet) => {
    return sheets.has(sheet)
  },

  getSheet : (sheet) => {
    // get the ID of the target sheet
    return sheets.get(sheet)
  },

  getSheets : () => {
    return sheets
  },

  setSheets : (updated) => {
    sheets = updated
  },

  addSheet : (title, id) => {
    // add sheet by title
    sheets.set(title, id)
  }
}
