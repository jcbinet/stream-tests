class Mark {
  constructor(memoryUsage, timestamp) {
    this.memoryUsage = memoryUsage || process.memoryUsage()
    this.timestamp = isNaN(timestamp) ? Date.now() : timestamp
  }
}

exports.Mark = Mark
