import React from 'react';
import styles from './textViewer.module.css';

interface TextViewerProps {
  file: string;
}

const TextViewer: React.FC<TextViewerProps> = ({ file }) => {
  return (
    <div className={styles.textViewerContainer}>
      <pre>{file}</pre>
    </div>
  );
};

export default TextViewer;
