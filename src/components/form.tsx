import React, { useState } from 'react';
import Button from './button';
import styles from './form.module.css';
import { fetchAIResponse } from '../services/llmService';

interface FormData {
  openAIKey: string;
  fromGradeLevel: string;
  toGradeLevel: string;
  subject: string;
  file: File | null;
  additionalConsiderations: string;
}

interface FormProps {
  onFileUpload: (fileContent: string) => void;
}

const Form: React.FC<FormProps> = ({ onFileUpload }) => {
  const gradeLevels = ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const subjects = ['English', 'Science', 'Math'];

  const [formData, setFormData] = useState<FormData>({
    openAIKey: '',
    fromGradeLevel: '2',
    toGradeLevel: '1',
    subject: 'English',
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
    if (file && file.type === 'text/plain') {
      setFormData({
        ...formData,
        file: file
      });
      readFileContent(file).then((fileContent) => onFileUpload(fileContent));
    } else {
      alert('Please upload a valid TXT file.');
    }
  };

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          resolve(event.target.result as string);
        } else {
          reject('Error reading file');
        }
      };
      reader.onerror = () => {
        reject('Error reading file');
      };
      reader.readAsText(file);
    });
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
    if (formData.subject === 'Math') {
      const options = gradeLevels.map((level, index) => {
        if (index === fromIndex - 1 || index === fromIndex + 1) {
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

  const handleRegenerate = async () => {
    console.log('Regenerate clicked');
  
    if (!formData.file) {
      console.error('No file selected');
      return;
    }
  
    try {
      const generalResponse = await fetch('/general.txt');
      const subjectFiles: { [key: string]: string } = {
        'Math': '/math.txt',
        'Science': '/science.txt',
        'English': '/english.txt'
      };
      const detailResponse = await fetch(subjectFiles[formData.subject]);
  
      const generalText = await generalResponse.text();
      const detailText = await detailResponse.text();
      const notes = formData.additionalConsiderations;
  
      const instruction = `${generalText}\n\n${detailText}\n\nAdditional notes from the teacher: ${notes}`;
  
      const problem = `Convert the following homework assignment from grade ${formData.fromGradeLevel} to grade ${formData.toGradeLevel}`;
      const fileContent = await readFileContent(formData.file);
      const prompt = `${problem}\n\n${fileContent}`;
  
      const response: string | null = await fetchAIResponse(instruction, prompt, formData.openAIKey);
      
      if (response) {
        console.log('AI Response:', response);
        onFileUpload(response);
      } else {
        console.error('No response from AI');
      }
    } catch (err) {
      console.error('Error:', err);
    }
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
          <input type="file" accept=".txt" onChange={handleFileChange} />
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
          <Button onClick={handleRegenerate} />
        </div>
      </form>
    </div>
  );
};

export default Form;
