import { Cancel, Check } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';

import { useSelector } from 'react-redux';

export const FileDownloadProgress = () => {
  const selector = useSelector;
  const { isDownloading, progress, fileName, files } = selector((state) => state.downloadReducer);
  return (
    <Container sx={{ position: 'absolute' }} maxWidth="lg">
      <Dialog open={isDownloading}>
        <DialogTitle> Downloading </DialogTitle>
        <List disablePadding>
          {files.map((file, index) => (
            <ListItem sx={{ display: 'flex', flexDirection: 'column' }} key={index}>
              <Box display="flex" justifyContent="space-between" width="100%">
                <ListItemAvatar>
                  <Avatar>
                    <Box sx={{ position: 'absolute', display: 'inline-flex' }}>
                      <CircularProgress variant="determinate" value={progress} />
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
                          {`${progress}%`}
                        </Typography>
                      </Box>
                    </Box>
                  </Avatar>
                </ListItemAvatar>

                <ListItemText>{fileName}</ListItemText>

                {progress === 100 ? (
                  <IconButton edge="end" disabled>
                    <Check />
                  </IconButton>
                ) : (
                  <IconButton edge="end" aria-label="cancel">
                    <Cancel />
                  </IconButton>
                )}
              </Box>
            </ListItem>
          ))}
        </List>
        <DialogActions>
          <Button>Cancel Downloaging</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
