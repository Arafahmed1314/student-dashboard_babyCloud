const Footer = () => {
  return (
    <footer className="bg-[#FFFFFF] border-t border-[#E5E7EB] py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-[#6B7280] text-center">
          &copy; {new Date().getFullYear()} Student Management Dashboard. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
