import Navigation from './components/Navigation';

export const metadata = {
  title: 'PokeMan',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
