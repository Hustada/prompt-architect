'use client';

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
  const handleRegenerateClick = async () => {
    logger.info(`User requested regeneration of section: ${title}`);
    await onRegenerateSection(title);
  };
  
  return (
    <div className="relative border-b border-gray-200 dark:border-gray-700 pb-4 mb-6 last:border-0 last:mb-0 last:pb-0">
      <div className="mb-4">
        <div className="flex justify-between items-start gap-4">
          <h2 className="text-xl font-bold text-black dark:text-white font-mono">
            {title}
          </h2>
          
          <button
            onClick={handleRegenerateClick}
            disabled={isRegenerating}
            className="shrink-0 inline-flex items-center px-2 py-1 text-xs font-medium rounded-md bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-200 dark:border-gray-700 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-700"
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
        </div>
        
        <div className="mt-2 prose dark:prose-invert max-w-none">
          {(() => {
            // Special handling for Code Snippets section
            const isCodeSnippetsSection = title === 'Code Snippets';
            
            const lines = content.split('\n');
            const result = [];
            let inCodeBlock = false;
            let codeBlockContent = [];
            let codeBlockLanguage = '';
            let key = 0;

            for (let i = 0; i < lines.length; i++) {
              const line = lines[i];
              
              // Check for code block markers ```
              if (line.trim().startsWith('```')) {
                if (!inCodeBlock) {
                  // Start of code block
                  inCodeBlock = true;
                  codeBlockLanguage = line.substring(3).trim(); // Get language if specified
                  codeBlockContent = [];
                  
                  // If this is in Code Snippets section, also add the preceding line as a label
                  if (isCodeSnippetsSection && i > 0 && lines[i-1].trim() !== '') {
                    result.push(<p key={key++} className="font-medium text-black dark:text-white mt-4">{lines[i-1]}</p>);
                  }
                } else {
                  // End of code block
                  inCodeBlock = false;
                  result.push(
                    <div key={key++} className="bg-gray-100 dark:bg-gray-900 rounded-md p-4 my-4 overflow-x-auto border border-gray-200 dark:border-gray-700 shadow-sm">
                      <pre className="text-sm font-mono text-black dark:text-white">
                        <code className={`language-${codeBlockLanguage}`}>
                          {codeBlockContent.join('\n')}
                        </code>
                      </pre>
                    </div>
                  );
                }
                continue;
              }

              if (inCodeBlock) {
                // Inside code block, collect lines
                codeBlockContent.push(line);
              } else {
                // Skip lines that are labels for code blocks in the Code Snippets section
                if (isCodeSnippetsSection && 
                    i < lines.length - 1 && 
                    lines[i+1].trim().startsWith('```') && 
                    line.trim() !== '') {
                  continue;
                }
                
                // Regular markdown processing
                if (line.startsWith('- ')) {
                  result.push(
                    <li key={key++} className="ml-4 list-disc">
                      {line.substring(2)}
                    </li>
                  );
                } else if (/^\d+\./.test(line)) {
                  result.push(
                    <li key={key++} className="ml-4 list-decimal">
                      {line.substring(line.indexOf('.') + 1).trim()}
                    </li>
                  );
                } else if (line.trim() === '') {
                  result.push(<div key={key++} className="h-4"></div>);
                } else {
                  result.push(<p key={key++}>{line}</p>);
                }
              }
            }

            return result;
          })()}
        </div>
      </div>
    </div>
  );
};

export default SectionEditor;
