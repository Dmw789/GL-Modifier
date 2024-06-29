import React, { useState } from 'react';
import styles from './form.module.css';

interface FormData {
  openAIKey: string;
  intendedGL: string;
  subject: string;
  file: File | null;
  additionalConsiderations: string;
}

const Form: React.FC = () => {
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
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        file: e.target.files[0]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleRegenerate = () => {
    // Add your regenerate logic here
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>OpenAI Key</label>
          <input
            type="text"
            name="openAIKey"
            value={formData.openAIKey}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Intended Grade Level</label>
          <input
            type="text"
            name="intendedGL"
            value={formData.intendedGL}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>File</label>
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <label>Additional Considerations</label>
          <input
            type="text"
            name="additionalConsiderations"
            value={formData.additionalConsiderations}
            onChange={handleChange}
          />
        </div>
        <div className={styles.buttons}>
          <button type="button" onClick={handleRegenerate}>Regenerate</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
