const fs = require('fs')
const { createConnection } = require('mysql2')
const stringify = require('csv-stringify')
const { Benchmark } = require('./../benchmark/benchmark')

const benchmark = new Benchmark()

benchmark.mark('start')

async function run() {
  const mysql = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'test'
  })

  const readStream = mysql.query('select * from data union all select * from data').stream({})
  const writeStream = fs.createWriteStream('./data/output.csv')

  readStream
    .pipe(stringify())
    .pipe(writeStream)

  const wait = new Promise((resolve, reject) => {
    writeStream.on('close', () => resolve());
    readStream.on('error', reject);
  });

  await wait

  mysql.end()
}

run()
  .then(() => {
    benchmark.measure('Total', 'start')
    benchmark.report()
  })
  .catch((error) => console.error(error))
