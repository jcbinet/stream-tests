const fs = require('fs')
const csv = require('csv-parser')
const { Benchmark } = require('./../benchmark/benchmark')

const benchmark = new Benchmark()

benchmark.mark('start')
const writeStream = fs.createWriteStream('./data/output.csv')
const readStream = fs.createReadStream('./data/big.csv', { encoding: 'utf8' })
  .on('error', (err) => console.log(err))
  .pipe(csv())
  .pipe(writeStream)
  .on('finish', () => {
    benchmark.measure('Total', 'start')
    benchmark.report()
  })
