import React, { useEffect } from 'react';
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';

function App() {
  useEffect(() => {
    // Modify the head elements when the component mounts
    document.title = 'KPR Salahalu';  // Set the title
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'index.css';
    document.head.appendChild(link);

    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.href = '../img/pc-logo.png';
    document.head.appendChild(favicon);

    // Cleanup function to remove the elements if needed
    return () => {
      document.head.removeChild(link);
      document.head.removeChild(favicon);
    };
  }, []); // Empty dependency array means it runs only once

  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
