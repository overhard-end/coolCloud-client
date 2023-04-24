import {
  Delete,
  Download,
  DriveFileRenameOutline,
  Info,
  OpenInBrowser,
  Send,
} from '@mui/icons-material';
import { Menu, MenuItem, Typography } from '@mui/material';
import React from 'react';
import { removeFile, downloadFile } from '../redux/actions/filesActions';
import { useDispatch } from 'react-redux';

export const FileContextMenu = ({ openFile, file, anchorEl, open, handleCloseContextMenu }) => {
  const dispatch = useDispatch();
  const contextMenuOptions = [
    { action: openFile, id: 0, name: 'Открыть', icon: <OpenInBrowser /> },
    { id: 1, name: 'Отправить', icon: <Send /> },
    { action: downloadFile, id: 2, name: 'Скачать', icon: <Download /> },
    { action: removeFile, id: 3, name: 'Удалить', icon: <Delete /> },
    { id: 4, name: 'Показать свойства', icon: <Info /> },
    { id: 5, name: 'Переименовать', icon: <DriveFileRenameOutline /> },
  ];

  return (
    <Menu id="lock-menu" anchorEl={anchorEl} open={open} onClose={handleCloseContextMenu}>
      {contextMenuOptions.map((item, index) => (
        <MenuItem
          dense={true}
          key={index}
          onClick={() => {
            handleCloseContextMenu();
            dispatch(item.action(file));
          }}>
          {item.icon}
          <Typography>{item.name}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );
};
