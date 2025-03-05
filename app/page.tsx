'use client';

import { useState } from 'react';
import IdeaInput from '@/components/idea-input';
import PromptPreview from '@/components/prompt-preview';
import ErrorMessage from '@/components/error-message';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { generatePrompt, AIModel } from '@/lib/api';
import { ProjectType } from '@/lib/promptTemplates';
import logger from '@/lib/logger';

interface ErrorState {
  message: string;
  details?: string;
}

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<ErrorState | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<{
    markdown: string;
    projectType: ProjectType;
    projectIdea: string;
    model: AIModel;
    requestId: string;
    timestamp: string;
  } | null>(null);
  
  const handleGeneratePrompt = async (projectType: ProjectType, projectIdea: string, model: AIModel) => {
    // Clear any existing errors
    setError(null);
    
    try {
      setIsGenerating(true);
      logger.info('Generating prompt', { projectType, model });
      
      // Call the API to generate the prompt
      const response = await generatePrompt({
        projectType,
        projectIdea,
        model,
      });
      
      // Update the state with the generated prompt
      setGeneratedPrompt({
        markdown: response.markdown,
        projectType,
        projectIdea,
        model,
        requestId: response.requestId,
        timestamp: response.timestamp,
      });
      
      logger.info('Prompt generated successfully', { requestId: response.requestId });
    } catch (error) {
      logger.error('Failed to generate prompt', { error: error.message });
      
      // Set error state to display to the user
      setError({
        message: 'Failed to generate prompt',
        details: error.message || 'Please check your API keys and try again.'
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleUpdatePrompt = async (updatedMarkdown: string) => {
    if (generatedPrompt) {
      setGeneratedPrompt({
        ...generatedPrompt,
        markdown: updatedMarkdown,
      });
    }
  };
  
  const handleRegenerationError = (sectionTitle: string, errorMessage: string) => {
    setError({
      message: `Failed to regenerate section: ${sectionTitle}`,
      details: errorMessage
    });
  };
  
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {error && (
        <ErrorMessage 
          message={error.message} 
          details={error.details} 
          onDismiss={() => setError(null)}
        />
      )}
      
      <div className="flex flex-col space-y-8">
        {/* Input Section */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-blue-100 dark:border-blue-900 shadow-sm">
          <h2 className="text-2xl font-mono font-bold text-blue-800 dark:text-blue-400 mb-4">Your Idea</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Describe your project idea, and our AI will transform it into a structured prompt
          </p>
          <IdeaInput
            onGenerate={handleGeneratePrompt}
            isGenerating={isGenerating}
          />
        </div>
        
        {/* How It Works Section */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-blue-100 dark:border-blue-900 shadow-sm">
          <h2 className="text-xl font-mono font-bold text-blue-800 dark:text-blue-400 mb-4">How It Works</h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
            <li>Enter your project idea or concept</li>
            <li>Select your project type and preferred AI model</li>
            <li>Review and customize the generated prompt</li>
            <li>Regenerate specific sections if needed</li>
            <li>Export the finalized prompt for your AI coding project</li>
          </ol>
        </div>
        
        {/* Generated Prompt Section */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-blue-100 dark:border-blue-900 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-mono font-bold text-blue-800 dark:text-blue-400">Generated Prompt</h2>
            {isGenerating && (
              <div className="flex items-center text-blue-600 dark:text-blue-400">
                <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                <span>Generating...</span>
              </div>
            )}
          </div>
          <PromptPreview 
            prompt={generatedPrompt} 
            onUpdatePrompt={handleUpdatePrompt}
            onError={handleRegenerationError}
          />
        </div>
      </div>
    </div>
  );
}
