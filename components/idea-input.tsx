'use client';

import { useState } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface IdeaInputProps {
  onGenerate: (prompt: any) => void;
  isGenerating: boolean;
}

const IdeaInput = ({ onGenerate, isGenerating }: IdeaInputProps) => {
  const [idea, setIdea] = useState('');
  const [projectType, setProjectType] = useState('fullstack');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This is a placeholder for the actual API call
    // In a real implementation, we would call an API endpoint
    const mockGeneratedPrompt = {
      title: 'Generated Project Prompt',
      sections: [
        {
          title: 'Project Overview',
          content: idea,
        },
        {
          title: 'Tech Stack',
          content: projectType === 'frontend' 
            ? '- React\n- TypeScript\n- Tailwind CSS\n- Next.js' 
            : projectType === 'backend'
            ? '- Node.js\n- Express\n- MongoDB\n- TypeScript'
            : '- React\n- TypeScript\n- Tailwind CSS\n- Next.js\n- Node.js\n- Express\n- MongoDB',
        },
        {
          title: 'Features',
          content: '- User authentication\n- Data persistence\n- Responsive design\n- API integration',
        },
        {
          title: 'Requirements',
          content: '1. Implement user authentication\n2. Create a responsive UI\n3. Connect to database\n4. Deploy to production',
        },
      ],
      markdown: `# Project Overview\n${idea}\n\n# Tech Stack\n${projectType === 'frontend' 
        ? '- React\n- TypeScript\n- Tailwind CSS\n- Next.js' 
        : projectType === 'backend'
        ? '- Node.js\n- Express\n- MongoDB\n- TypeScript'
        : '- React\n- TypeScript\n- Tailwind CSS\n- Next.js\n- Node.js\n- Express\n- MongoDB'}\n\n# Features\n- User authentication\n- Data persistence\n- Responsive design\n- API integration\n\n# Requirements\n1. Implement user authentication\n2. Create a responsive UI\n3. Connect to database\n4. Deploy to production`
    };
    
    onGenerate(mockGeneratedPrompt);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Project Type
        </label>
        <select
          id="projectType"
          value={projectType}
          onChange={(e) => setProjectType(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="fullstack">Full Stack</option>
        </select>
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
        className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-md transition-colors duration-200"
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
