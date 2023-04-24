export class FileDto {
  constructor(file) {
    this.name = file.name;
    this.size = file.size;
    this.type = file.type;
    this.webkitRelativePath = file.webkitRelativePath;
  }
}
