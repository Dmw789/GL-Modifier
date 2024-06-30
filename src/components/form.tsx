import React, { useState } from 'react';
import Button from './button';
import styles from './form.module.css';

interface FormData {
  openAIKey: string;
  intendedGL: string;
  subject: string;
  file: File | null;
  additionalConsiderations: string;
}

interface FormProps {
  onFileUpload: (file: File) => void;
}

const Form: React.FC<FormProps> = ({ onFileUpload }) => {
  const [formData, setFormData] = useState<FormData>({
    openAIKey: '',
    intendedGL: '',
    subject: '',
    file: null,
    additionalConsiderations: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData({
      ...formData,
      file: file
    });
    if (file) {
      onFileUpload(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleRegenerate = () => {
    console.log('Regenerate clicked');
  };

  const handleDownload = () => {
    console.log('Download clicked');
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formHeader}>Grade Level Modifier</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>OpenAI Key</label>
          <input
            type="text"
            name="openAIKey"
            value={formData.openAIKey}
            onChange={handleChange}
            placeholder="Enter your OpenAI Key"
          />
        </div>
        <div>
          <label>Intended Grade Level</label>
          <input
            type="text"
            name="intendedGL"
            value={formData.intendedGL}
            onChange={handleChange}
            placeholder="Enter Grade Level"
          />
        </div>
        <div>
          <label>Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Enter Subject"
          />
        </div>
        <div>
          <label>File</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div>
          <label>Additional Considerations</label>
          <input
            type="text"
            name="additionalConsiderations"
            value={formData.additionalConsiderations}
            onChange={handleChange}
            placeholder="Enter any additional considerations"
          />
        </div>
        <div className={styles.buttons}>
          <Button onClick={handleRegenerate}/>
          <Button onClick={handleDownload}/>
        </div>
      </form>
    </div>
  );
};

export default Form;
