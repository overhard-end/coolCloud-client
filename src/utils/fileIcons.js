import {
  Compress,
  DocumentScannerOutlined,
  FilePresent,
  Folder,
  FormatListNumbered,
  Http,
  InsertPhoto,
  Link,
  MusicNote,
  PlayArrow,
  Settings,
  TextSnippet,
  PictureAsPdf,
  InsertDriveFileOutlined,
} from '@mui/icons-material';
export const fileIcon = (extension, type) => {
  if (type && type !== 'file') return <Folder />;
  switch (extension) {
    case '.pdf':
      return <PictureAsPdf />;
    case '.jpg':
      return <InsertPhoto />;
    case '.png':
      return <InsertPhoto />;
    case '.gif':
      return <InsertPhoto />;
    case '.lnk':
      return <Link />;
    case '.url':
      return <Http />;
    case '.doc':
      return <DocumentScannerOutlined />;
    case '.docx':
      return <DocumentScannerOutlined />;
    case '.xlsx':
      return <FormatListNumbered />;
    case '.pptx':
      return <FilePresent />;
    case '.txt':
      return <TextSnippet />;
    case '.ini':
      return <Settings />;
    case '.exe':
      return <PlayArrow />;
    case '.rar':
      return <Compress />;
    case '.mp3':
      return <MusicNote />;
    case '.m4a':
      return <MusicNote />;
    default:
      return <InsertDriveFileOutlined />;
  }
};
