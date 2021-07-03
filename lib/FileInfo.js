class FileInfo {
  constructor(path, type, md5) {
    this.path = path;
    this.type = type;
    this.md5 = md5;
  }
}

module.exports = FileInfo;
