import styles from '../styles/DiagramStub.module.css';

export default function DiagramStub() {
  return (
    <div className={styles.diagramContainer}>
      <div className={styles.diagram}>
        <div className={styles.bar} style={{ height: '60%' }}>
          <span className={styles.label}>Initiative 1</span>
          <span className={styles.value}>1500</span>
        </div>
        <div className={styles.bar} style={{ height: '90%' }}>
          <span className={styles.label}>Initiative 2</span>
          <span className={styles.value}>2300</span>
        </div>
        <div className={styles.bar} style={{ height: '35%' }}>
          <span className={styles.label}>Initiative 3</span>
          <span className={styles.value}>890</span>
        </div>
      </div>
      <p className={styles.note}>
        This is a stub diagram component. Replace with a charting library like Chart.js or Recharts.
      </p>
    </div>
  );
}
