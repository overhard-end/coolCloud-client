import {
  AccessTime,
  Article,
  AudioFile,
  AutoDelete,
  Folder,
  Image,
  VisibilityOff,
} from '@mui/icons-material';
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import React from 'react';

export const SideBar = () => {
  const [selectedIndex, setSelectedIndex] = React.useState();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: '240px',
        [`& .MuiDrawer-paper`]: { width: '240px', boxSizing: 'border-box', paddingTop: '100px' },
      }}>
      <List>
        {['Недавние', 'Изображения', 'Документы', 'Аудио', 'Все файлы', 'Корзина', 'Скрытые'].map(
          (text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                selected={selectedIndex === index}
                onClick={() => setSelectedIndex(index)}>
                <ListItemIcon>
                  {index === 0 ? <AccessTime /> : ''}
                  {index === 1 ? <Image /> : ''}
                  {index === 2 ? <Article /> : ''}
                  {index === 3 ? <AudioFile /> : ''}
                  {index === 4 ? <Folder /> : ''}
                  {index === 5 ? <AutoDelete /> : ''}
                  {index === 6 ? <VisibilityOff /> : ''}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
              <Divider />
            </ListItem>
          ),
        )}
      </List>
    </Drawer>
  );
};
