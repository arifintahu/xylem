import { Github, Heart } from 'lucide-react';
import pkg from '../../package.json';

export const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 mt-auto transition-colors duration-200">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start space-y-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Xylem</h3>
            <p className="text-xs text-gray-500 dark:text-gray-500 font-medium">
              Stateless EVM Blockchain Explorer
            </p>
            <div className="flex items-center space-x-1.5 text-xs text-gray-400 dark:text-gray-500 pt-1">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end space-y-2">
            <a
              href="https://github.com/arifintahu/xylem"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <span className="text-xs text-gray-400 dark:text-gray-600 font-mono">
              v{pkg.version}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
