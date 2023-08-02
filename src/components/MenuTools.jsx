import { Add, CreateNewFolder, DriveFolderUpload, UploadFile } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchFiles, uploadFile } from '../redux/actions/filesActions';
import fileService from '../services/fileService';

export const MenuTools = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [dirName, setDirName] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openCreateDir, setOpenCreateDir] = React.useState(false);
  const [validate, setValidate] = React.useState(false);

  const openMenuTools = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
    setDirName('');
  };

  const handleCreateDir = async () => {
    if (dirName.length < 1) return setValidate('Поле не должо быть пустым !');
    await fileService
      .createDir(dirName)
      .then(() => {
        dispatch(fetchFiles());
        setOpenCreateDir(false);
        setOpen(false);
      })
      .catch((result) => {
       
        setValidate(result.data.message);
      });
  };
  return (
    <>
      <Button
        sx={{ borderRadius: '50px' }}
        startIcon={<Add />}
        variant="outlined"
        color="inherit"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={(e) => openMenuTools(e)}>
        Создать
      </Button>
      <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={() => setOpen(false)}>
        <MenuItem
          id="create-new-dir"
          onClick={() => {
            setOpenCreateDir(true);
          }}>
          <CreateNewFolder />
          Создать папку
        </MenuItem>
        <Dialog
          aria-labelledby="create-new-folder"
          open={openCreateDir}
          onClose={() => {
            setOpen(false);
            setOpenCreateDir(false);
          }}>
          <DialogContent>
            <DialogContentText>Не давай тупое название по типу 'аааа' или '5555'</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="folderName"
              label="Введите название папки"
              error={validate ? true : false}
              helperText={validate ? validate : ''}
              type="text"
              fullWidth
              value={dirName}
              onChange={(e) => {
                setValidate(false);
                setDirName(e.target.value);
              }}
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleCreateDir()}>Создать </Button>
          </DialogActions>
        </Dialog>
        <Divider />
        <MenuItem variant="contained" component="label">
          <input
            id="filesInput"
            onChange={(e) => dispatch(uploadFile(e.target.files))}
            onClick={(e) => (e.target.value = null)}
            hidden
            accept="file/*"
            multiple
            type="file"
          />
          <UploadFile />
          Загрузить файл
        </MenuItem>
        <MenuItem variant="contained" component="label">
          <input
            id="dirInput"
            onChange={(e) => dispatch(uploadFile(e.target.files))}
            onClick={(e) => (e.target.value = null)}
            hidden
            webkitdirectory="true"
            directory="true"
            multiple
            type="file"
          />
          <DriveFolderUpload />
          Загрузить папку
        </MenuItem>
      </Menu>
    </>
  );
};
