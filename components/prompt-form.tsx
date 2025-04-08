'use client';

import { useState, useEffect } from 'react';
import { useTemplateStore } from '@/lib/store';
import { ArrowDownTrayIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import PromptPreview from './prompt-preview';
import logger from '@/lib/logger';
import { ProjectType } from '@/lib/promptTemplates';
import { AIModel } from '@/lib/api';

// Define the PromptData type
interface PromptData {
  markdown: string;
  projectType: ProjectType;
  projectIdea: string;
  model: AIModel;
}

export default function PromptForm() {
  const { selectedTemplate, sections } = useTemplateStore();
  const [sectionContent, setSectionContent] = useState<Record<string, string>>({});
  const [formattedMarkdown, setFormattedMarkdown] = useState('');
  const [copied, setCopied] = useState(false);
  const [prompt, setPrompt] = useState<PromptData | null>(null);

  // Initialize section content when sections change
  useEffect(() => {
    const initialContent: Record<string, string> = {};
    sections.forEach(section => {
      initialContent[section.id] = sectionContent[section.id] || '';
    });
    setSectionContent(initialContent);
  }, [sections]);

  // Generate formatted markdown whenever content changes
  useEffect(() => {
    generateMarkdown();
  }, [sectionContent]);

  const handleSectionChange = (sectionId: string, content: string) => {
    setSectionContent(prev => ({
      ...prev,
      [sectionId]: content
    }));
  };

  const generateMarkdown = () => {
    let markdown = '';
    
    sections.forEach(section => {
      const content = sectionContent[section.id];
      if (content && content.trim()) {
        markdown += `# ${section.name}\n${content}\n\n`;
      }
    });
    
    setFormattedMarkdown(markdown.trim());
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadMarkdown = () => {
    const blob = new Blob([formattedMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedTemplate || 'custom'}_instructions.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setPrompt(null);
    // Add any other state resets needed
    logger.info('User cleared prompt');
  };

  // Define the missing functions
  const handleUpdatePrompt = (updatedMarkdown: string) => {
    setPrompt(prev => prev ? { ...prev, markdown: updatedMarkdown } : null);
  };

  const handleError = (sectionTitle: string, errorMessage: string) => {
    logger.error(`Error in section: ${sectionTitle}`, { errorMessage });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Fill in the Details</h2>
        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.id} className="space-y-2">
              <label className="block text-sm font-medium">
                {section.name}
                {section.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 min-h-[100px]"
                placeholder={`Enter ${section.name.toLowerCase()} details...`}
                value={sectionContent[section.id] || ''}
                onChange={(e) => handleSectionChange(section.id, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Formatted Markdown</h2>
          <div className="flex space-x-2">
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <ClipboardIcon className="h-5 w-5 mr-1" />
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              onClick={downloadMarkdown}
              className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <ArrowDownTrayIcon className="h-5 w-5 mr-1" />
              Download
            </button>
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md">
          <pre className="whitespace-pre-wrap font-mono text-sm">{formattedMarkdown || 'Your formatted markdown will appear here...'}</pre>
        </div>
      </div>

      <PromptPreview 
        prompt={prompt}
        onUpdatePrompt={handleUpdatePrompt}
        onClear={handleClear}
        onError={handleError}
      />
    </div>
  );
}
