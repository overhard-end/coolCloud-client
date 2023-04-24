import fileService from '../../services/fileService';
import {
  SET_FILES,
  SELECT_FILE,
  RETURN_FILE,
  SET_UPLOAD,
  FILE_UPLOADED,
  UPLOAD_ERROR,
  UPLOAD_DONE,
  SET_CURRENT_FILE,
  UPLOADING_PROGRESS,
  HASHING_PROGRESS,
  DOWNLOAD_START,
  DOWNLOAD_PROGRESS,
  DOWNLOAD_DONE,
} from '../actions/types';
import store from '../store';

export function fetchFiles() {
  return async (dispatch) => {
    try {
      fileService
        .getFiles()
        .then((response) => dispatch({ type: SET_FILES, payload: response.data }))
        .catch((err) => err);
    } catch (error) {
      console.log(error);
    }
  };
}

export function uploadFile(files) {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_UPLOAD, payload: [...files] });
      let currentFileIndex = null;
      async function readAndUploadFile() {
        const selectedFile = store.getState().filesReducer.selectedFile;
        const filesForUpload = store.getState().uploadReducer.files;
        const file = filesForUpload[currentFileIndex];
        if (!file) {
          dispatch({ type: UPLOAD_DONE });
          return dispatch(fetchFiles());
        }
        dispatch({ type: SET_CURRENT_FILE, payload: file });
        const fileName = file.name;
        const relativeFilePath = fileService.getRelativePath(selectedFile.path, file);
        let chunkList = fileService.createFileChunk(file);

        const handleHashingProgress = (progress) =>
          dispatch({ type: HASHING_PROGRESS, payload: progress });

        const fileHash = await fileService.ganerateHash(chunkList, handleHashingProgress);

        const { exist, newChunkList } = await fileService.checkFile({
          fileName,
          fileHash,
          chunkList,
        });
        console.log(exist, newChunkList);
        if (exist) {
          dispatch({ type: FILE_UPLOADED, payload: file });
          currentFileIndex++;
          return readAndUploadFile();
        }
        const handleUploadProgress = (chunkIndex) => (progress) => {
          const chunksProgress = fileService.chunkUploadProgress(chunkIndex, progress);
          let percent;
          if (chunksProgress.percent !== percent) {
            percent = chunksProgress.percent;
            const filePercent = fileService.fileUploadProgress(chunksProgress, chunkList.length);
            dispatch({ type: UPLOADING_PROGRESS, payload: filePercent });
          }
        };
        const mergeData = { fileHash, fileName, relativePath: relativeFilePath };
        await fileService
          .chunksRequestPool(newChunkList, fileHash, handleUploadProgress)
          .then(async () => {
            await fileService.mergeChunks(mergeData).then(() => {
              currentFileIndex++;
              dispatch({ type: FILE_UPLOADED, payload: file });
              readAndUploadFile();
            });
          })
          .catch((err) => {
            dispatch({ type: UPLOAD_ERROR, payload: err });
            alert('some peices of file do not was uploaded');
          });
      }
      if (currentFileIndex === null) {
        currentFileIndex = 0;
        readAndUploadFile();
      }
    } catch (error) {
      console.log(error);
    }
  };
}
export function renameFile(fileName) {
  return;
}
export function downloadFile(file) {
  return async (dispatch) => {
    const handleDownloadProgress = (event) => {
      const percent = Math.round((event.loaded / event.total) * 100);
      dispatch({ type: DOWNLOAD_PROGRESS, payload: percent });
      if (percent === 100) return dispatch({ type: DOWNLOAD_DONE });
    };

    if (file.type === 'directory') return;
    dispatch({ type: DOWNLOAD_START, payload: file.name });
    const filePath = file.path;
    const res = await fileService.downloadFile(filePath, handleDownloadProgress);
    const blob = res.data;
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
}
export function cancelUploading() {
  return (dispatch) => {
    fileService.cancelRequests();
    dispatch({ type: UPLOAD_DONE });
  };
}

export function removeFile(file) {
  return async (dispatch) => {
    try {
      await fileService.removeFiles(file.path).then((response) => dispatch(fetchFiles()));
    } catch (error) {
      console.log(error);
    }
  };
}

export const selectFile = (file) => (dispatch) => {
  const action = { type: SELECT_FILE, payload: file };
  dispatch(action);
};

export const returnFile = () => (dispatch) => {
  dispatch({ type: RETURN_FILE });
};
