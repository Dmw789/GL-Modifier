import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import styles from './button.module.css';

interface ButtonProps {
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <div className={styles.floatingButton} onClick={onClick}>
      <FontAwesomeIcon icon={faArrowsRotate} className={styles.icon} />
    </div>
  );
};

export default Button;
