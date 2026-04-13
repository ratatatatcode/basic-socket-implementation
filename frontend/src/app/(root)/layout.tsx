import React from 'react';
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-primary flex min-h-screen w-full flex-col items-center justify-center antialiased">
      {children}
    </div>
  );
}
