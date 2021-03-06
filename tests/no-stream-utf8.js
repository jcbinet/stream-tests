const fs = require('fs')
const { Benchmark } = require('./../benchmark/benchmark')

const benchmark = new Benchmark()

benchmark.mark('start')
const file = fs.readFileSync('./data/big.csv', { encoding: 'utf8' })
fs.writeFileSync('./data/output.csv', file)
benchmark.measure('Total', 'start')
benchmark.report()
