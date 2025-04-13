import React from 'react';

const certificationsData = {
  "Professional Memberships": [
    {
      title: "Certificate of IEEE Membership",
      issuer: "IEEE",
      issued: "Mar 2025",
      link: "#",
      icon: "👥"  // Added icons for visual enhancement
    },
    {
      title: "Certificate of Membership for IEEE Women in Engineering (WIE)",
      issuer: "IEEE",
      issued: "Mar 2025",
      link: "#",
      icon: "👥"
    },
    {
      title: "Certificate of Membership for the IEEE Circuits and Systems Society (CAS)",
      issuer: "IEEE",
      issued: "Mar 2025",
      link: "#",
      icon: "👥"
    }, 
  ],
  "Workshops & Competitions": [
    {
      title: "FigMate UI/UX Figma Workshop",
      issuer: "NSBM Green University",
      issued: "Mar 2025",
      link: "#",
      icon: "🏆"
    },
    {
      title: "Pixels 2 Podium Workshop",
      issuer: "Hackathon Hub NSBM",
      issued: "Feb 2025",
      link: "#",
      icon: "🏆"
    },
    {
      title: "Data Dive - Power BI Workshop & Competition",
      issuer: "NSBM Green University",
      issued: "Jan 2025",
      link: "#",
      icon: "🏆"
    }, 
  ],
  "Certifications": [
    {
      title: "Social Media Marketing Certified",
      issuer: "HubSpot Academy",
      issued: "Oct 2023",
      link: "#",
      icon: "🔖"
    },
    {
      title: "Bitcoin Certified",
      issuer: "Great Learning",
      issued: "Sep 2023",
      link: "#",
      icon: "🔖"
    },
    {
      title: "Blockchain Certified",
      issuer: "BitDegree",
      issued: "Sep 2023",
      link: "#",
      icon: "🔖"
    }, 
  ]
};

const Certifications = () => {
  return (
    <div className="certifications-container">
      <h1 className="certifications-title">Certifications & Achievements</h1>
      <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="linkedin-link">
        <span className="linkedin-icon">🔗</span>View my complete profile on LinkedIn
      </a>

      <div className="certifications-grid">
        {Object.entries(certificationsData).map(([section, items]) => (
          <div className="certification-category" key={section}>
            <h2 className="category-title">{section}</h2>
            <div className="certification-items">
              {items.map((cert, index) => (
                <div className="certification-card" key={index}>
                  <div className="cert-icon">{cert.icon}</div>
                  <div className="cert-content">
                    <h3 className="cert-title">{cert.title}</h3>
                    <p className="cert-issuer">{cert.issuer}</p>
                    <p className="cert-date">{cert.issued}</p>
                  </div>
                  <a href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-link">
                    View Certificate
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .certifications-container {
          padding: 2rem 0;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .certifications-title {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: #333;
          text-align: center;
        }
        
        .linkedin-link {
          display: block;
          text-align: center;
          margin-bottom: 2rem;
          color: #0077b5;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s;
        }
        
        .linkedin-link:hover {
          color: #004471;
          text-decoration: underline;
        }
        
        .linkedin-icon {
          margin-right: 8px;
        }
        
        .certifications-grid {
          display: grid;
          gap: 2rem;
        }
        
        .certification-category {
          margin-bottom: 1rem;
        }
        
        .category-title {
          font-size: 1.75rem;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #eaeaea;
          color: #444;
        }
        
        .certification-items {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        
        .certification-card {
          background-color: #fff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s, box-shadow 0.3s;
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 1.5rem;
          position: relative;
        }
        
        .certification-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
        }
        
        .cert-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #555;
        }
        
        .cert-content {
          flex-grow: 1;
        }
        
        .cert-title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #333;
          line-height: 1.4;
        }
        
        .cert-issuer {
          color: #666;
          font-weight: 500;
          margin-bottom: 0.25rem;
        }
        
        .cert-date {
          color: #888;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }
        
        .cert-link {
          display: inline-block;
          background-color: #0077b5;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 500;
          transition: background-color 0.3s;
          text-align: center;
        }
        
        .cert-link:hover {
          background-color: #005582;
        }
        
        @media (max-width: 768px) {
          .certification-items {
            grid-template-columns: 1fr;
          }
          
          .certifications-title {
            font-size: 2rem;
          }
          
          .category-title {
            font-size: 1.5rem;
          }
          
          .certification-card {
            padding: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Certifications;
