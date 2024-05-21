// syntax of (marketing) creates a new route group called marketing.
// allows to set up dedicated root layout for specific routes that's part of this group

import '../globals.css';

export const metadata = {
  title: 'Next.js Page Routing & Rendering',
  description: 'Learn how to route to different pages.',
}

export default function RootLayout({ children }) {
  // Main Header componenet is applied to EVERY layout.
  // 'page' id works as container, giving some default padding.
  return (
    <html lang="en">
      <body>
          {children}
      </body>
    </html>
  )
}
