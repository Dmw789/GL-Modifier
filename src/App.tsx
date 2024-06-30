import React, { useState } from 'react';
import styles from './index.module.css';
import Form from './components/form';
import Preview from './components/preview';

const App: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleFileUpload = (file: File) => {
    const fileURL = URL.createObjectURL(file);
    setUploadedFile(fileURL);
  };

  return (
    <div className={styles.container}>
      <Form onFileUpload={handleFileUpload} />
      <Preview file={uploadedFile}/>
    </div>
  );
};

export default App;
