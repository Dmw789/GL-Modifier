import { useState } from 'react';
import styles from './preview.module.css';

const Preview = () => {
  const [imageSrc, setImageSrc] = useState('path/to/your/image.png'); // Set default image path

  return (
    <div className={styles.previewContainer}>
      <h2>Preview</h2>
      <img src={imageSrc} alt="Preview" className={styles.previewImage} />
    </div>
  );
};

export default Preview;
