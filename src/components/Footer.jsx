const Footer = () => {
  return (
    <footer className="py-20 px-4 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-2xl font-outfit font-bold text-white mb-2 tracking-tight">Khim<span className="text-primary">.</span></h2>
            <p className="text-sm text-textSecondary font-medium">Aspiring IT Professional & Digital Designer</p>
        </div>
        
        <div className="flex gap-10 text-textSecondary text-sm font-bold">
            <a href="#hero" className="hover:text-white transition-colors">Home</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#certifications" className="hover:text-white transition-colors">Certs</a>
        </div>
        
        <p className="text-sm text-textSecondary">
           &copy; {new Date().getFullYear()} Khim Mesiona. Crafted with Precision.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
