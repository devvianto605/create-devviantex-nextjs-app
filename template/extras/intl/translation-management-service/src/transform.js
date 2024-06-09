const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

// Function to transform CSV data into nested JSON
function transformCsvToJson(filePath) {
  return new Promise((resolve, reject) => {
    const resultEn = {};
    const resultTh = {};

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        const { group, subgroup, key, en, th } = row;

        if (!resultEn[group]) {
          resultEn[group] = {};
        }
        if (!resultTh[group]) {
          resultTh[group] = {};
        }

        if (subgroup) {
          if (!resultEn[group][subgroup]) {
            resultEn[group][subgroup] = {};
          }
          if (!resultTh[group][subgroup]) {
            resultTh[group][subgroup] = {};
          }
          resultEn[group][subgroup][key] = en;
          resultTh[group][subgroup][key] = th;
        } else {
          resultEn[group][key] = en;
          resultTh[group][key] = th;
        }
      })
      .on('end', () => {
        resolve({ en: resultEn, th: resultTh });
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

// Path to the CSV file
const csvFilePath = path.join(__dirname, '../data/translations.csv');

// Transform CSV to JSON and write the results to files
transformCsvToJson(csvFilePath)
  .then(({ en, th }) => {
    fs.writeFileSync(path.join(__dirname, '../output/en.json'), JSON.stringify(en, null, 2));
    fs.writeFileSync(path.join(__dirname, '../output/th.json'), JSON.stringify(th, null, 2));
    console.log('Translations have been written to en.json and th.json');
  })
  .catch((error) => {
    console.error('Error:', error);
  });
