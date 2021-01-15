const { Mark } = require('./mark')

/**
 * Benchmark
 * Using this utility class, you can benchmark pieces of code
 *
 * Use .mark to capture memoryUsage and time
 * Use .measure to create and save a new capture compared to previous specified mark
 * Use .report to print the result of each measures
 */
class Benchmark {

  constructor() {
    this.marks = []
    this.measures = []
  }

  /**
   * Add a performance mark
   * @param markName
   */
  mark(markName) {
    this.marks[markName] = new Mark()
  }

  /**
   * Measure memory against a previously set mark
   * @param measureName
   * @param againstMarkName
   * @param saveAsMark
   */
  measure(measureName, againstMarkName, saveAsMark = null) {

    const againstMark = this.marks[againstMarkName]

    // Validate that the mark exists
    if (!againstMark) throw new Error(`Mark ${againstMarkName} does not exist`)

    const mark = new Mark()

    if (saveAsMark) {
      this.marks[saveAsMark] = mark
    }

    // Difference of current memory usage against a specified captured mark
    const resultMemoryUsage = {
      rss: mark.memoryUsage.rss - againstMark.memoryUsage.rss,
      heapTotal: mark.memoryUsage.heapTotal - againstMark.memoryUsage.heapTotal,
      heapUsed: mark.memoryUsage.heapUsed - againstMark.memoryUsage.heapUsed,
      external: mark.memoryUsage.external - againstMark.memoryUsage.external
    }

    // Difference of current time against specified captured mark time to get execution time
    const resultTimestamp = mark.timestamp - againstMark.timestamp

    // Add the results to a new measure
    this.measures[measureName] = new Mark(resultMemoryUsage, resultTimestamp)
  }

  /**
   * Report measure results to console
   */
  report() {
    const measureKeys = Object.keys(this.measures)

    measureKeys.forEach(key => {
      const m = this.measures[key]

      this.logMeasure(key, m)
    })
  }

  logMeasure(name, measure) {
    console.log(`----------------------------------------`)
    console.log(`Measure: ${name}`)
    console.log(`Memory Used: ${Math.round(measure.memoryUsage.heapUsed / 1024 / 1024 * 100) / 100} MB`)
    console.log(`Execution time: ${measure.timestamp} ms`)
    console.log(`----------------------------------------`)
  }

}

exports.Benchmark = Benchmark
