import Head from 'next/head';
import { useState } from 'react';

import data from '../data.json';
const loadingTexts = [
  'slumpar recept...',
  'ignorerar kakor...',
  'dubbelfriterar touchbaren...',
  'bakar saffransloopen...',
];

export default function Home() {
  const [current, setCurrent] = useState();
  const [loadingText, setLoadingText] = useState();
  const [stage, setStage] = useState('initial');

  async function start() {
    window.scrollTo(0, 0);
    setStage('running');
    setLoadingText('initialiserar kodsnittar...');
    await new Promise(r => setTimeout(r, 2000));
    setLoadingText('laddar recept...');
    await new Promise(r => setTimeout(r, 1000));
    const step = loadingTexts.length / (data.length * 3);
    let i = 0;
    for (const item of data.concat(data).concat(data)) {
      const c = Math.floor(i * step);
      setLoadingText(
        `[${c + 1}/${loadingTexts.length}] ${loadingTexts[Math.floor(i * step)]}`,
      );
      setCurrent(item);
      await new Promise(r => setTimeout(r, 100));
      i++;
    }
    const theOne = data[Math.floor(Math.random() * data.length)];
    setCurrent(theOne);
    setStage('done');
  }

  return (
    <div className="container">
      <Head>
        <title>Brinken bankar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Låt Brinken Bakar bestämma din nyårsdessert!</h1>

        {stage === 'initial' ? (
          <button className="fade-in" onClick={() => start()}>
            Överraska mig!
          </button>
        ) : stage === 'done' ? (
          <p className="fade-in">Grattis! Du ska bjuda på:</p>
        ) : (
          <p className="fade-in">
            <code>{loadingText}</code>
          </p>
        )}

        {current && (
          <div className={`card ${stage === 'done' ? 'fade-in' : ''}`}>
            <a href={current.url} target="_blank" rel="noopener noreferrer">
              <img src={current.imageUrl} />
              <h2>{current.title}</h2>
              {stage === 'done' && <button>Klicka för recept!</button>}
            </a>
          </div>
        )}

        {stage === 'done' && (
          <p className="fade-in">
            <small>
              Inte nöjd? Du kan{' '}
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  start();
                }}
              >
                försöka igen genom att klicka här
              </a>
              .
            </small>
          </p>
        )}
      </main>

      <footer>
        <a
          href="https://brinkenbakar.se"
          target="_blank"
          rel="noopener noreferrer"
        >
          Recept från brinkenbakar.se
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 450px;
          text-align: center;
        }

        h1 {
          margin-bottom: 10px;
        }

        .card {
          width: 300px;
          text-align: center;
          margin-bottom: 20px;
        }

        .card img {
          max-width: 100%;
        }

        .card button {
          cursor: pointer;
        }

        button {
          all: unset;
          background-color: #000;
          color: #fff;
          line-height: 40px;
          font-size: 20px;
          padding: 0 15px;
          min-width: 120px;
          cursor: pointer;
          border-radius: 3px;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }
        @keyframes fadein {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .fade-in {
          animation: fadein 0.3s;
          transition: opacity 0.3s;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
