import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Developer Portfolio</title>
        <meta name="description" content="My professional develope portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to My Portfolio</h1>
        <p>This is my developer portfolio built with Next.js</p>
      </main>

      <footer>
        <p>© {new Date().getFullYear()} My Portfolio</p>
      </footer>
    </div>
  );
}
