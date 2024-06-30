import React, { useEffect, useState } from 'react';
import styles from './fileViewer.module.css';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';

interface FileViewerProps {
  file: File | null;
}

const FileViewer: React.FC<FileViewerProps> = ({ file }) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setFileUrl(null);
    }
  }, [file]);

  if (!fileUrl) {
    return <div className={styles.docxViewerContainer}>No file selected</div>;
  }

  const docs = [
    {
      uri: fileUrl,
      fileType: 'pdf'
    },
  ];

  return (
    <div className={styles.docxViewerContainer}>
      <DocViewer
        pluginRenderers={DocViewerRenderers}
        documents={docs}
        config={{
          header: {
            disableHeader: false,
            disableFileName: false,
            retainURLParams: false,
          },
        }}
        style={{ height: 500 }}
      />
    </div>
  );
};

export default FileViewer;
