const Footer = () => {
  return (
    <footer style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
      <p>&copy; {new Date().getFullYear()} Premium Portfolio. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
