'use client';

import { useState } from 'react';
import { ClipboardDocumentIcon, ArrowDownTrayIcon, CheckIcon } from '@heroicons/react/24/outline';

interface PromptPreviewProps {
  prompt: any;
}

const PromptPreview = ({ prompt }: PromptPreviewProps) => {
  const [copied, setCopied] = useState(false);
  
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
    navigator.clipboard.writeText(prompt.markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadMarkdown = () => {
    const blob = new Blob([prompt.markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prompt.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderMarkdown = (markdown: string) => {
    return markdown.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return (
          <h2 key={index} className="text-xl font-bold mt-6 mb-3 text-blue-800 dark:text-blue-400 font-mono">
            {line.substring(2)}
          </h2>
        );
      } else if (line.startsWith('## ')) {
        return (
          <h3 key={index} className="text-lg font-bold mt-4 mb-2 text-blue-700 dark:text-blue-500 font-mono">
            {line.substring(3)}
          </h3>
        );
      } else if (line.startsWith('- ')) {
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
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end space-x-2">
        <button
          onClick={copyToClipboard}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
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
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
        >
          <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
          Download
        </button>
      </div>
      
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <div className="p-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-mono text-sm font-medium text-gray-500 dark:text-gray-400">prompt.md</h3>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 prose dark:prose-invert max-w-none">
          {renderMarkdown(prompt.markdown)}
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4">
        <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">AI Suggestions</h3>
        <p className="text-sm text-blue-700 dark:text-blue-400">
          Consider adding more specific details about your project's target audience and success metrics.
        </p>
      </div>
    </div>
  );
};

export default PromptPreview;
