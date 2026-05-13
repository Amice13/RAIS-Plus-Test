importScripts('/import/comlink.js')

/*@
 * Function to parse CSV files
 * Credits to Trevor Dixon https://stackoverflow.com/questions/1293147/how-to-parse-csv-data
 */

function parseCSV (str, delimiter = '\t') {
  const rows = []
  let row = []
  let field = ''

  let quote = false
  let fieldStart = true

  for (let i = 0; i < str.length; i++) {
    const c = str[i]
    const n = str[i + 1]

    if (c === '"' && quote && n === '"') {
      field += '"'
      i++
      fieldStart = false
      continue
    }

    if (c === '"' && fieldStart) {
      quote = true
      fieldStart = false
      continue
    }

    if (c === '"' && quote) {
      quote = false
      continue
    }

    if (!quote && c === delimiter) {
      row.push(field)
      field = ''
      fieldStart = true
      continue
    }

    if (!quote && (c === '\n' || c === '\r')) {
      row.push(field)
      field = ''
      fieldStart = true

      rows.push(row)
      row = []

      if (c === '\r' && n === '\n') i++
      continue
    }

    field += c
    fieldStart = false
  }

  row.push(field)

  if (row.length > 1 || row[0] !== '') {
    rows.push(row)
  }

  return rows
}

const parser = async (string, delimiter) => {
  let rows = parseCSV(string, delimiter)
  // if (rows.length < 2) return { headers: [], data: [] }
  return rows
}

Comlink.expose(parser)