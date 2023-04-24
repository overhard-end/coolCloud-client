import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { FileContextMenu } from './FileContextMenu';
import { selectFile } from '../redux/actions/filesActions';
import { fileIcon } from '../utils/fileIcons';
import { formatSizeUnits } from '../utils/sizeFormat';

export const FileItem = ({ file, dispatch }) => {
  const fileSize = formatSizeUnits(file.size);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState('');

  function handleOpenContextMenu(e) {
    e.preventDefault();
    if (!e.currentTarget === anchorEl) {
      setOpen(false);
    }
    setAnchorEl(e.currentTarget);
    setOpen(true);
  }
  return (
    <>
      <ListItemButton
        onClick={() => dispatch(selectFile(file))}
        onContextMenu={(e) => handleOpenContextMenu(e)}
        divider={true}>
        <ListItemIcon>{fileIcon(file.extension, file.type)}</ListItemIcon>
        <ListItemText
          primary={file.name}
          sx={{ width: '80px' }}
          primaryTypographyProps={{
            variant: 'subtitle1',
            style: {
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
          }}
        />

        <ListItemText
          secondaryTypographyProps={{ variant: 'overline' }}
          sx={{ padding: '0 10px', display: 'flex', justifyContent: 'right' }}
          secondary={file.type === 'file' ? fileSize : ''}
        />
      </ListItemButton>

      <FileContextMenu
        anchorEl={anchorEl}
        handleCloseContextMenu={() => {
          setAnchorEl(null);
          setOpen(false);
        }}
        open={open}
        file={file}
      />
    </>
  );
};
