import React from 'react';
import styles from './preview.module.css';
import TextViewer from './textViewer';

interface PreviewProps {
  file: string | null;
}

const Preview: React.FC<PreviewProps> = ({ file }) => {
  return (
    <div className={styles.previewContainer}>
      <h2>Preview</h2>
      {file ? <TextViewer file={file} /> : <p>No preview available</p>}
    </div>
  );
};

export default Preview;
