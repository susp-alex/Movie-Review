import React from 'react';
import AuthenticatedHeader from "../components/v1/AuthenticatedHeader";

export default function MoviesReviewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
        <section className="dashboard-container">
        <AuthenticatedHeader />
        <div className="dashboard-content">
            {children}
        </div>
        </section>
    </div>
  );
}
