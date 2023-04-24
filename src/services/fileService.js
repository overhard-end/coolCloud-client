import axios from 'axios';
import Http from '../api/api';
import store from '../redux/store';
class FileService {
  chunkSize = 10 * 1024 * 1024;
  sourse = axios.CancelToken.source();
  api = new Http({ withAuth: true });
  progressArray = [];
  getFiles() {
    return new Promise(async (resolve) => {
      await this.api.get('/files').then((res) => resolve(res));
    });
  }
  async removeFiles(filePath) {
    return await this.api.post('/fileRemove', { filePath: filePath });
  }
  getRelativePath(currentPath, file) {
    let webkitRelativePath = file.webkitRelativePath.split('/');
    webkitRelativePath.pop();
    const relativeFilePath = webkitRelativePath.join('/');
    if (currentPath) return currentPath + '/' + relativeFilePath;
    return relativeFilePath;
  }
  checkFile({ fileName, fileHash, chunkList }) {
    return new Promise(async (resolve) => {
      await this.api.post('/fileCheck', { fileName: fileName, fileHash: fileHash }).then((res) => {
        const { exist, lastIndex } = res.data;
        if (!lastIndex) return resolve({ exist: exist, newChunkList: chunkList });
        const newChunkList = chunkList.filter((chunk) => !lastIndex.includes(chunk.index));
        return resolve({ exist: exist, newChunkList: newChunkList });
      });
    });
  }
  createFileChunk(file) {
    const chunkList = [];
    let cur = 0;
    let index = 0;
    while (cur < file.size) {
      let chunkItem = { index: index, chunk: file.slice(cur, cur + this.chunkSize) };
      chunkList.push(chunkItem);
      cur += this.chunkSize;
      index++;
    }
    console.log(chunkList);
    return chunkList;
  }

  fileUploadProgress = (chunksProgress, chunksLenght) => {
    this.progressArray[chunksProgress.index] = chunksProgress.percent;
    let totalChunksPercent = this.progressArray.reduce((sum, current) => sum + current, 0);
    return Math.round((totalChunksPercent / (chunksLenght * 100)) * 100);
  };
  async createDir(dirName) {
    const currentDir = store.getState().filesReducer.selectedFile.path;
    const dirPath = currentDir + '/' + dirName;
    return await this.api.post('/createDir', { dirPath: dirPath });
  }
  chunkUploadProgress = (chunkIndex, progress) => {
    const percent = Math.round((progress.loaded / progress.total) * 100);
    return { index: chunkIndex, percent: percent };
  };
  downloadFile(filePath, handleDownloadProgress) {
    return this.api.get('/fileDownload', {
      responseType: 'blob',
      onDownloadProgress: handleDownloadProgress,
      params: { filePath: filePath },
    });
  }
  async chunksRequestPool(chunkList, fileHash, handleUploadProgress) {
    return await Promise.all(
      chunkList.map((chunk) => {
        const chunkName = `${fileHash}-${chunk.chunk.size}-${chunk.index}`;
        const config = {
          onUploadProgress: handleUploadProgress(chunk.index),
        };
        return this.sendChunk(chunkName, chunk.chunk, config);
      }),
    );
  }
  ganerateHash(chunkList, handleHashingProgress) {
    return new Promise((resolve) => {
      const worker = new Worker(new URL('../longProcesses/hashFile.js', import.meta.url));
      worker.postMessage(chunkList);
      let progress;
      worker.onmessage = (e) => {
        if (e.data.progress !== progress) {
          progress = e.data.progress;
          handleHashingProgress(e.data.progress);
        }
        if (e.data.ready) {
          return resolve(e.data.hash);
        }
      };
    });
  }
  sendChunk(chunkName, chunk, config) {
    const formData = new FormData();
    formData.append(chunkName, chunk);
    return this.api.post('/chunk', formData, {
      ...config,
      cancelToken: this.sourse.token,
    });
  }
  cancelRequests() {
    this.sourse.cancel();
  }
  mergeChunks(data) {
    data.size = this.chunkSize;
    return this.api.post('/fileMerge', data);
  }
}
export default new FileService();
