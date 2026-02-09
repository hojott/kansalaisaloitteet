import Head from 'next/head';
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import DiagramStub from '../components/DiagramStub';

export default function Home() {
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from API endpoints
    const fetchData = async () => {
      try {
        const [response1, response2] = await Promise.all([
          fetch('/api/data1'),
          fetch('/api/data2')
        ]);

        const json1 = await response1.json();
        const json2 = await response2.json();

        setData1(json1);
        setData2(json2);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Kansalaisaloitteet</title>
        <meta name="description" content="Kansalaisaloitteet - Single Page Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Kansalaisaloitteet
        </h1>

        <p className={styles.description}>
          A Next.js single page application template
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>API Data 1</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <p>{data1 ? JSON.stringify(data1) : 'No data'}</p>
            )}
          </div>

          <div className={styles.card}>
            <h2>API Data 2</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <p>{data2 ? JSON.stringify(data2) : 'No data'}</p>
            )}
          </div>
        </div>

        <div className={styles.diagramSection}>
          <h2 className={styles.diagramTitle}>Data Visualization</h2>
          <DiagramStub />
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© 2024 Kansalaisaloitteet</p>
      </footer>
    </div>
  );
}
