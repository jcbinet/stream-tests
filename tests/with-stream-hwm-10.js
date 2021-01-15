const fs = require('fs')
const { Benchmark } = require('./../benchmark/benchmark')

const benchmark = new Benchmark()

benchmark.mark('start')
const writeStream = fs.createWriteStream('./data/output.csv')
const readStream = fs.createReadStream('./data/big.csv', { highWaterMark: 10 })
  .on('error', (err) => console.log(err))
  .pipe(writeStream)
  .on('finish', () => {
    benchmark.measure('Total', 'start')
    benchmark.report()
  })
