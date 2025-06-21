import Head from 'next/head';
import Certifications from '../components/Certifications';

export default function CertificationsPage() {
  return (
    <>
      <Head>
        <title>Certifications - Developer Portfolio</title>
        <meta name="description" content="View my professional certifications and achievements" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl md:text-6xl font-bold text-center text-white mb-8">
            Certifications
          </h1>
          <Certifications />
        </div>
      </div>
    </>
  );
}