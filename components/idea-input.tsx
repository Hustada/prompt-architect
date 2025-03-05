'use client';

import { useState } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { ProjectType } from '@/lib/promptTemplates';
import { AIModel } from '@/lib/api';
import logger from '@/lib/logger';

interface IdeaInputProps {
  onGenerate: (projectType: ProjectType, projectIdea: string, model: AIModel) => void;
  isGenerating: boolean;
}

const IdeaInput = ({ onGenerate, isGenerating }: IdeaInputProps) => {
  const [idea, setIdea] = useState('');
  const [projectType, setProjectType] = useState<ProjectType>('fullstack');
  const [model, setModel] = useState<AIModel>('openai');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!idea.trim()) return;
    
    logger.info('User submitted idea for prompt generation', { 
      projectType, 
      model,
      ideaLength: idea.length
    });
    
    onGenerate(projectType, idea, model);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Project Type
          </label>
          <select
            id="projectType"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value as ProjectType)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="fullstack">Full Stack</option>
            <option value="mobile">Mobile App</option>
            <option value="data science">Data Science</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="model" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            AI Model
          </label>
          <select
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value as AIModel)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="openai">OpenAI GPT-4</option>
            <option value="claude">Anthropic Claude</option>
            <option value="gemini">Google Gemini</option>
          </select>
        </div>
      </div>
      
      <div>
        <label htmlFor="idea" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Project Idea
        </label>
        <textarea
          id="idea"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Describe your project idea here..."
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
          required
        />
      </div>
      
      <button
        type="submit"
        disabled={isGenerating || !idea.trim()}
        className="w-full flex items-center justify-center px-4 py-2 bg-gray-800 hover:bg-gray-900 disabled:bg-gray-600 text-white font-medium rounded-md transition-colors duration-200"
      >
        {isGenerating ? 'Generating...' : (
          <>
            Generate Prompt <ArrowRightIcon className="ml-2 h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
};

export default IdeaInput;
