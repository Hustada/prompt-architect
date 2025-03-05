'use client';

import { useState } from 'react';
import { ClipboardDocumentIcon, ArrowDownTrayIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import SectionEditor from './section-editor';
import { parseMarkdownSections, combineSections } from '@/lib/promptTemplates';
import logger from '@/lib/logger';
import { generatePrompt, AIModel } from '@/lib/api';
import { ProjectType } from '@/lib/promptTemplates';

interface PromptPreviewProps {
  prompt: {
    markdown: string;
    projectType: ProjectType;
    projectIdea: string;
    model: AIModel;
  } | null;
  onUpdatePrompt: (updatedMarkdown: string) => void;
  onClear: () => void;
  onError?: (sectionTitle: string, errorMessage: string) => void;
}

const PromptPreview = ({ prompt, onUpdatePrompt, onClear, onError }: PromptPreviewProps) => {
  const [copied, setCopied] = useState(false);
  const [regeneratingSections, setRegeneratingSections] = useState<string[]>([]);
  
  if (!prompt) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 p-8">
        <div className="text-center space-y-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-blue-300 dark:text-blue-600 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-lg font-medium">Your structured prompt will appear here</p>
          <p className="text-sm">Enter your project idea and click "Generate Prompt"</p>
        </div>
      </div>
    );
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt.markdown)
      .then(() => {
        setCopied(true);
        logger.info('User copied prompt to clipboard');
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(error => {
        logger.error('Failed to copy to clipboard', { error: error.message });
        if (onError) {
          onError('Copy to Clipboard', 'Failed to copy content to clipboard');
        }
      });
  };

  const downloadMarkdown = () => {
    try {
      // Generate a filename based on project type and idea
      const projectTitle = prompt.projectIdea
        .split(' ')
        .slice(0, 5) // Take first 5 words max
        .join('-')
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, ''); // Remove special characters
      
      const filename = `${prompt.projectType}-${projectTitle}.md`;
      
      const blob = new Blob([prompt.markdown], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      logger.info('User downloaded prompt as markdown file', { filename });
    } catch (error) {
      logger.error('Failed to download markdown file', { error: error.message });
      if (onError) {
        onError('Download', 'Failed to download the markdown file');
      }
    }
  };

  const handleRegenerateSection = async (sectionTitle: string) => {
    try {
      setRegeneratingSections(prev => [...prev, sectionTitle]);
      logger.info(`Regenerating section: ${sectionTitle}`);
      
      // Parse the current markdown into sections
      const sections = parseMarkdownSections(prompt.markdown);
      
      // Generate a new version of the requested section
      const response = await generatePrompt({
        projectType: prompt.projectType,
        projectIdea: prompt.projectIdea,
        model: prompt.model,
        sectionToRegenerate: sectionTitle,
        previousResponse: prompt.markdown,
      });
      
      // Update the section in our sections object
      sections[sectionTitle] = response.markdown;
      
      // Combine the sections back into a single markdown document
      const updatedMarkdown = combineSections(sections);
      
      // Update the prompt
      onUpdatePrompt(updatedMarkdown);
      
      logger.info(`Successfully regenerated section: ${sectionTitle}`);
    } catch (error) {
      logger.error(`Failed to regenerate section: ${sectionTitle}`, { error });
      // Call the onError callback if provided
      if (onError) {
        onError(sectionTitle, error.message || 'An error occurred while regenerating this section');
      }
    } finally {
      setRegeneratingSections(prev => prev.filter(s => s !== sectionTitle));
    }
  };

  // Parse the markdown into sections for display
  const sections = parseMarkdownSections(prompt.markdown);

  return (
    <div className="space-y-4">
      <div className="flex justify-end space-x-2">
        <button
          onClick={onClear}
          className="depth-button inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 border border-gray-200 dark:border-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <XMarkIcon className="h-4 w-4 mr-1" />
          Clear
        </button>
        <button
          onClick={copyToClipboard}
          className="depth-button inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-200 dark:border-gray-700"
        >
          {copied ? (
            <>
              <CheckIcon className="h-4 w-4 mr-1" />
              Copied
            </>
          ) : (
            <>
              <ClipboardDocumentIcon className="h-4 w-4 mr-1" />
              Copy
            </>
          )}
        </button>
        <button
          onClick={downloadMarkdown}
          className="depth-button inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-200 dark:border-gray-700"
        >
          <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
          Download
        </button>
      </div>
      
      <div className="depth-card">
        <div className="p-4 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-mono text-sm font-medium text-gray-700 dark:text-gray-300">prompt.md</h3>
        </div>
        <div className="p-4 bg-white dark:bg-gray-900 max-w-none">
          {Object.keys(sections).length > 0 ? (
            Object.entries(sections).map(([title, content]) => (
              <SectionEditor
                key={title}
                title={title}
                content={content}
                onRegenerateSection={handleRegenerateSection}
                isRegenerating={regeneratingSections.includes(title)}
              />
            ))
          ) : (
            <div className="text-center p-4 text-gray-700 dark:text-gray-300">
              <p>No sections found in the generated prompt. The format may be incorrect.</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="depth-card p-4 mt-4">
        <h3 className="font-medium text-black dark:text-white mb-2">AI Suggestions</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Hover over any section heading to see the option to generate an alternative version of that section.
        </p>
      </div>
    </div>
  );
};

export default PromptPreview;
