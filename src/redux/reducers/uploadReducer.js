import {
  FILE_UPLOADED,
  HASHING_PROGRESS,
  SET_UPLOAD,
  UPLOADING_PROGRESS,
  UPLOAD_DONE,
  UPLOAD_ERROR,
  SET_CURRENT_FILE,
} from '../actions/types';

const inintialState = {
  files: [],
  currentFile: {},
  uploadProgress: 0,
  download: false,
  hashProgress: 0,
  uploadedFiles: [],
  error: [],
};

const uploadReducer = (state = inintialState, action) => {
  switch (action.type) {
    case SET_UPLOAD:
      return {
        ...state,
        files: action.payload,
      };
    case HASHING_PROGRESS:
      return {
        ...state,
        hashProgress: action.payload,
      };

    case SET_CURRENT_FILE:
      return {
        ...state,
        currentFile: action.payload,
        uploadProgress: 0,
        hashProgress: 0,
      };
    case UPLOADING_PROGRESS:
      return {
        ...state,
        uploadProgress: action.payload,
      };
    case FILE_UPLOADED:
      return {
        ...state,
        uploadedFiles: [...state.uploadedFiles, action.payload],
      };
    case UPLOAD_DONE:
      return {
        ...state,
        files: [],
        currentFile: {},
        uploadProgress: 0,
        hashProgress: 0,
        uploadedFiles: [],
        error: [],
      };
    case UPLOAD_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case 'DOWNLOAD_ALERT':
      return {
        ...state,
        download: action.payload,
      };
    default:
      return state;
  }
};
export default uploadReducer;
