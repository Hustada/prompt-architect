'use client';

import { useState } from 'react';
import IdeaInput from '@/components/idea-input';
import PromptPreview from '@/components/prompt-preview';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState(null);
  
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-blue-100 dark:border-blue-900 shadow-sm">
            <h2 className="text-2xl font-mono font-bold text-blue-800 dark:text-blue-400 mb-4">Your Idea</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Describe your project idea, and our AI will transform it into a structured prompt
            </p>
            <IdeaInput
              onGenerate={(prompt) => {
                setIsGenerating(true);
                // Simulate API call
                setTimeout(() => {
                  setGeneratedPrompt(prompt);
                  setIsGenerating(false);
                }, 1500);
              }}
              isGenerating={isGenerating}
            />
          </div>
          
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-blue-100 dark:border-blue-900 shadow-sm">
            <h2 className="text-xl font-mono font-bold text-blue-800 dark:text-blue-400 mb-4">How It Works</h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
              <li>Enter your project idea or concept</li>
              <li>Our AI analyzes and structures your idea</li>
              <li>Review and customize the generated prompt</li>
              <li>Export the finalized prompt for your AI coding project</li>
            </ol>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-blue-100 dark:border-blue-900 shadow-sm h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-mono font-bold text-blue-800 dark:text-blue-400">Generated Prompt</h2>
              {isGenerating && (
                <div className="flex items-center text-blue-600 dark:text-blue-400">
                  <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                  <span>Generating...</span>
                </div>
              )}
            </div>
            <PromptPreview prompt={generatedPrompt} />
          </div>
        </div>
      </div>
    </div>
  );
}
