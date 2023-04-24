import { DOWNLOAD_START, DOWNLOAD_DONE, DOWNLOAD_PROGRESS } from '../actions/types';
const initialState = {
  isDownloading: false,
  progress: 0,
  fileName: '',
  files: [],
};

const downloadReducer = (state = initialState, action) => {
  switch (action.type) {
    case DOWNLOAD_START:
      return {
        ...state,
        isDownloading: true,
        fileName: action.payload,
        files: [...state.files, action.payload],
      };
    case DOWNLOAD_PROGRESS:
      return {
        ...state,
        progress: action.payload,
      };
    case DOWNLOAD_DONE:
      return {
        ...state,
        isDownloading: false,
        progress: 0,
        fileName: '',
        files: [],
      };

    default:
      return state;
  }
};
export default downloadReducer;
