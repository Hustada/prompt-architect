'use client';

import { useState } from 'react';
import { useTemplateStore } from '@/lib/store';

const templates = [
  {
    id: 'backend',
    name: 'Backend',
    description: 'Template for backend development instructions',
    sections: [
      { id: 'overview', name: 'Project Overview', required: true },
      { id: 'tech-stack', name: 'Tech Stack', required: true },
      { id: 'db-schema', name: 'Database Schema', required: false },
      { id: 'requirements', name: 'Requirements', required: true },
      { id: 'api-endpoints', name: 'API Endpoints', required: false },
      { id: 'auth', name: 'Authentication', required: false },
      { id: 'docs', name: 'Documentation', required: false },
    ],
  },
  {
    id: 'frontend',
    name: 'Frontend',
    description: 'Template for frontend development instructions',
    sections: [
      { id: 'overview', name: 'Project Overview', required: true },
      { id: 'features', name: 'Feature Requirements', required: true },
      { id: 'structure', name: 'File Structure', required: false },
      { id: 'ui-components', name: 'UI Components', required: false },
      { id: 'api-integration', name: 'API Integration', required: false },
      { id: 'docs', name: 'Relevant Docs', required: false },
      { id: 'rules', name: 'Rules', required: false },
    ],
  },
  {
    id: 'fullstack',
    name: 'Full Stack',
    description: 'Template for full stack development instructions',
    sections: [
      { id: 'overview', name: 'Project Overview', required: true },
      { id: 'tech-stack', name: 'Tech Stack', required: true },
      { id: 'features', name: 'Features', required: true },
      { id: 'db-schema', name: 'Database Schema', required: false },
      { id: 'api-endpoints', name: 'API Endpoints', required: false },
      { id: 'ui-components', name: 'UI Components', required: false },
      { id: 'auth', name: 'Authentication', required: false },
      { id: 'deployment', name: 'Deployment', required: false },
      { id: 'docs', name: 'Documentation', required: false },
    ],
  },
  {
    id: 'custom',
    name: 'Custom',
    description: 'Create your own template structure',
    sections: [
      { id: 'overview', name: 'Project Overview', required: true },
    ],
  },
];

export default function TemplateSelector() {
  const { selectedTemplate, setTemplate, setSections } = useTemplateStore();
  const [activeTemplate, setActiveTemplate] = useState(selectedTemplate || 'backend');

  const handleTemplateSelect = (templateId: string) => {
    setActiveTemplate(templateId);
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setTemplate(templateId);
      setSections(template.sections);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Choose a Template</h2>
      <div className="space-y-3">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`p-4 rounded-md cursor-pointer transition-colors ${activeTemplate === template.id ? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
            onClick={() => handleTemplateSelect(template.id)}
          >
            <h3 className="font-medium">{template.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{template.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
