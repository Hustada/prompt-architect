import PromptForm from '@/components/prompt-form';
import TemplateSelector from '@/components/template-selector';

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
          AI Prompt Formatter
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Format your project requirements into structured markdown for AI coding projects
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4">
          <TemplateSelector />
        </div>
        <div className="md:col-span-8">
          <PromptForm />
        </div>
      </div>
    </div>
  );
}
