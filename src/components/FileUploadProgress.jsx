import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { Cancel, Check } from '@mui/icons-material';
import { SET_UPLOAD } from '../redux/actions/types';
import { cancelUploading } from '../redux/actions/filesActions';

export function FileUploadProgress() {
  const dispatch = useDispatch();
  const { files, currentFile, uploadProgress, hashProgress, uploadedFiles } = useSelector(
    (state) => state.uploadReducer,
  );
  const isCurrentFile = (file) => file.name === currentFile.name;
  const isUploadedFile = (file) =>
    uploadedFiles.filter((lastFile) => lastFile.name === file.name).length > 0;

  let uploadingFiles = files;

  function deleteFileFromUpload(targetFile) {
    uploadingFiles = uploadingFiles.filter((file) => {
      return file.name !== targetFile.name;
    });
    dispatch({ type: SET_UPLOAD, payload: uploadingFiles });
  }

  return (
    <Container sx={{ position: 'absolute' }} maxWidth="lg">
      <Dialog open={uploadingFiles.length > 0 ? true : false}>
        <DialogTitle> Uploading </DialogTitle>
        <List disablePadding>
          {uploadingFiles.map((file, index) => (
            <ListItem sx={{ display: 'flex', flexDirection: 'column' }} key={index}>
              {isCurrentFile(file) && hashProgress !== 100 ? (
                <Box mb="5px" width="inherit" flexDirection="column" justifyContent="start">
                  <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="text.secondary">
                      Preparing...
                    </Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={hashProgress} />
                </Box>
              ) : (
                ''
              )}
              <Box display="flex" justifyContent="space-between" width="100%">
                <ListItemAvatar>
                  <Avatar>
                    <Box sx={{ position: 'absolute', display: 'inline-flex' }}>
                      <CircularProgress
                        variant="determinate"
                        value={
                          isCurrentFile(file) ? uploadProgress : isUploadedFile(file) ? 100 : 0
                        }
                      />
                      <Box
                        sx={{
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          position: 'absolute',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Typography variant="caption" component="div" color="text.secondary">
                          {`${
                            isCurrentFile(file) ? uploadProgress : isUploadedFile(file) ? 100 : 0
                          }%`}
                        </Typography>
                      </Box>
                    </Box>
                  </Avatar>
                </ListItemAvatar>

                <ListItemText>{file.name}</ListItemText>

                {isUploadedFile(file) ? (
                  <IconButton edge="end" disabled>
                    <Check />
                  </IconButton>
                ) : (
                  <IconButton
                    edge="end"
                    aria-label="cancel"
                    onClick={() => deleteFileFromUpload(file)}>
                    <Cancel />
                  </IconButton>
                )}
              </Box>
            </ListItem>
          ))}
        </List>
        <DialogActions>
          <Button onClick={() => dispatch(cancelUploading())}>Cancel Uploading</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
