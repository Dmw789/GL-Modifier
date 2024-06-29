import styles from './index.module.css';
import Form from './components/form';
import Preview from './components/preview';

const App = () => {
  return (
    <div className={styles.container}>
      <Form />
      <Preview />
    </div>
  );
};

export default App;