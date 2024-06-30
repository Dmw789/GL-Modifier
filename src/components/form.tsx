import React, { useState } from 'react';
import Button from './button';
import styles from './form.module.css';

interface FormData {
  openAIKey: string;
  fromGradeLevel: string;
  toGradeLevel: string;
  subject: string;
  file: File | null;
  additionalConsiderations: string;
}

interface FormProps {
  onFileUpload: (file: File) => void;
}

const Form: React.FC<FormProps> = ({ onFileUpload }) => {
  const gradeLevels = ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const subjects = ['english', 'science', 'math'];

  const [formData, setFormData] = useState<FormData>({
    openAIKey: '',
    fromGradeLevel: '2',
    toGradeLevel: '1',
    subject: 'english',
    file: null,
    additionalConsiderations: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      subject: value,
      toGradeLevel: "1"
    });
  };

  const getToGradeOptions = () => {
    const fromIndex = gradeLevels.indexOf(formData.fromGradeLevel);
    if (formData.subject === 'math') {
      const options = gradeLevels.map((level, index) => {
        if (
          index === fromIndex - 1 ||
          index === fromIndex + 1
        ) {
          return <option key={level} value={level}>{level}</option>;
        }
        return (
          <option key={level} value={level} disabled>
            {level}
          </option>
        );
      });
      return options;
    } else {
      return gradeLevels.map((level) => (
        <option key={level} value={level} disabled={level === formData.fromGradeLevel}>
          {level}
        </option>
      ));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleRegenerate = () => {
    console.log('Regenerate clicked');
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
        <div className={styles.gradeLevelContainer}>
          <div>
            <label>From Grade Level</label>
            <select
              name="fromGradeLevel"
              value={formData.fromGradeLevel}
              onChange={handleChange}
            >
              {gradeLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>To Grade Level</label>
            <select
              name="toGradeLevel"
              value={formData.toGradeLevel}
              onChange={handleChange}
            >
              {getToGradeOptions()}
            </select>
          </div>
        </div>
        <div>
          <label>Subject</label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleSubjectChange}
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
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
        </div>
      </form>
    </div>
  );
};

export default Form;
