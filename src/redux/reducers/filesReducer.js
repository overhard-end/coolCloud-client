import { SET_FILES, SELECT_FILE, RETURN_FILE } from '../actions/types';

const initialState = {
  files: {},
  selectedFile: {},
  fileStack: [],
  size: 0,
  maxSize: 0,
  isLoading: true,
};

const filesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILES:
      return {
        ...state,
        files: action.payload,
        selectedFile: action.payload,
        size: action.payload.size,
        maxSize: action.payload.maxSize,
        fileStack: [action.payload],
        isLoading: false,
      };

    case SELECT_FILE:
      if (!action.payload.children) {
        return state;
      }
      return {
        ...state,
        fileStack: [...state.fileStack, action.payload],
        selectedFile: action.payload,
      };
    case RETURN_FILE:
      if (state.fileStack.length < 2) {
        return state;
      }
      const fileStackPop = state.fileStack;
      fileStackPop.pop();
      return {
        ...state,
        fileStack: fileStackPop,
        selectedFile: state.fileStack.at(-1),
      };
    default:
      return state;
  }
};

export default filesReducer;
