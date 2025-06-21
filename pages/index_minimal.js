import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function Home() {
  return (
    <>
      <Head>
        <title>Portfolio - Developer</title>
        <meta name="description" content="Professional developer portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Portfolio Loading...
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Debugging component issues
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
