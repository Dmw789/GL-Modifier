import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import styles from './button.module.css';

const Button = () => {
    const handleClick = () => {
    };

    return (
        <div className={styles.floatingButton} onClick={handleClick}>
            <FontAwesomeIcon icon={faArrowsRotate} className={styles.icon} />
        </div>
    );
};

export default Button;