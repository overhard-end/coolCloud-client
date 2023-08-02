import { ArrowDownward, ErrorOutline, SubdirectoryArrowLeft } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { FileItem } from '../components/FileItem';

import { fetchFiles, returnFile } from '../redux/actions/filesActions';
import Header from '../components/Header';
import { SideBar } from '../components/SideBar';
import { FilesProgresUI } from '../components/FilesProgresUI';

import { useDispatch, useSelector } from 'react-redux';
import { FileUploadProgress } from '../components/FileUploadProgress';
import { FileDownloadProgress } from '../components/fileDownloadProgress';

export const FileList = () => {
  const dispatch = useDispatch();
  const { error, isLoading, fileStack, selectedFile } = useSelector((state) => state.filesReducer);

  const selectedFilePath = fileStack[fileStack.length - 1]?.path.split('/');
  
  useEffect(() => {
    dispatch(fetchFiles());
  }, []);

  return (
    <>
      <Header />
      <SideBar />
      <Container sx={{ paddingLeft: '240px' }} maxWidth="lg" disableGutters={true}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <FilesProgresUI />
        </Box>
        <FileUploadProgress />
        <FileDownloadProgress />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          <Box sx={{ width: '100%' }}>
            <ListItemButton onClick={() => dispatch(returnFile())} sx={{ width: '150px' }}>
              <SubdirectoryArrowLeft />
              <Typography
                sx={{
                  fontWeight: '600',
                  fontSize: '15px',
                }}>
                Вернуться
              </Typography>
            </ListItemButton>

            <List sx={{ display: 'inline-block' }}>
              {selectedFilePath
                ? selectedFilePath.map((path, index) => (
                    <Box key={index} sx={{ display: 'inline-block' }}>
                      <>
                        <ListItemButton
                          sx={{
                            margin: 0,
                            padding: 0,
                            color: 'grey',
                          }}>
                          <Typography variant="caption"> {`${path ? path : ''}/`} </Typography>
                        </ListItemButton>
                      </>
                    </Box>
                  ))
                : ''}
            </List>

            <ListItem disableGutters={true}>
              <ListItemIcon>
                <ArrowDownward />
              </ListItemIcon>
              <ListItemText secondary="Название" />

              <ListItemText sx={{ padding: '0 10px', textAlign: 'right' }} secondary="Размер" />
            </ListItem>

            <Divider />
          </Box>
        </Box>

        {error ? (
          <Typography sx={{ fontSize: '26px', color: 'grey' }} variant="overline" component="h3">
            {error}
            <ErrorOutline sx={{ fontSize: '50px' }} />
          </Typography>
        ) : isLoading ? (
          <CircularProgress />
        ) : (
          <Grid item xs={12} md={6}>
            <List>
              {selectedFile.children
                ? selectedFile.children.map((file, index) => (
                    <FileItem file={file} key={index} dispatch={dispatch} />
                  ))
                : ''}
            </List>
          </Grid>
        )}
      </Container>
    </>
  );
};
