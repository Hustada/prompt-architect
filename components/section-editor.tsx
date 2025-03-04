'use client';

import { useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import logger from '@/lib/logger';

interface SectionEditorProps {
  title: string;
  content: string;
  onRegenerateSection: (title: string) => Promise<void>;
  isRegenerating: boolean;
}

const SectionEditor = ({ 
  title, 
  content, 
  onRegenerateSection,
  isRegenerating 
}: SectionEditorProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleRegenerateClick = async () => {
    logger.info(`User requested regeneration of section: ${title}`);
    await onRegenerateSection(title);
  };
  
  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-blue-800 dark:text-blue-400 font-mono">
            {title}
          </h2>
          
          {(isHovered || isRegenerating) && (
            <button
              onClick={handleRegenerateClick}
              disabled={isRegenerating}
              className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors disabled:opacity-50"
              title="Generate alternative for this section"
            >
              {isRegenerating ? (
                <>
                  <ArrowPathIcon className="h-3 w-3 mr-1 animate-spin" />
                  Regenerating...
                </>
              ) : (
                <>
                  <ArrowPathIcon className="h-3 w-3 mr-1" />
                  Alternative
                </>
              )}
            </button>
          )}
        </div>
        
        <div className="mt-2 prose dark:prose-invert max-w-none">
          {content.split('\n').map((line, index) => {
            if (line.startsWith('- ')) {
              return (
                <li key={index} className="ml-4 list-disc">
                  {line.substring(2)}
                </li>
              );
            } else if (/^\d+\./.test(line)) {
              return (
                <li key={index} className="ml-4 list-decimal">
                  {line.substring(line.indexOf('.') + 1).trim()}
                </li>
              );
            } else if (line.trim() === '') {
              return <div key={index} className="h-4"></div>;
            } else {
              return <p key={index}>{line}</p>;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default SectionEditor;
