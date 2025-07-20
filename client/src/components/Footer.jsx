import { FaBug, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white border-t border-gray-700 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FaBug className="text-2xl text-yellow-400" />
              <h3 className="text-xl font-bold">Bug Tracker</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Streamline your bug tracking process with our powerful and intuitive solution for development teams.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href="https://github.com/Mbarak-jr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <FaGithub className="text-xl" />
              </a>
              <a
                href="https://www.linkedin.com/in/mohammed-mbarak/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Report Bug</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Bug Status</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Team Members</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Settings</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">Stay Updated</h4>
            <p className="text-gray-400 mb-3">
              Subscribe to our newsletter for the latest updates and features.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full"
              />
              <button className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-white px-4 py-2 rounded-r-lg transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Bug Tracker Pro. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
