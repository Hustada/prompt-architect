/**
 * Templates for generating prompts to different AI models
 */

export type ProjectType = 'frontend' | 'backend' | 'fullstack';

interface PromptTemplateParams {
  projectType: ProjectType;
  projectIdea: string;
  sectionToRegenerate?: string;
  previousResponse?: string;
}

/**
 * Generate a prompt for OpenAI models
 */
export function generateOpenAIPrompt(params: PromptTemplateParams): string {
  const { projectType, projectIdea, sectionToRegenerate, previousResponse } = params;
  
  if (sectionToRegenerate && previousResponse) {
    return `You are PromptArchitect, an expert in creating structured project specifications. 
    
Previously, you generated the following markdown document for a ${projectType} project:

${previousResponse}

The user would like you to regenerate the "${sectionToRegenerate}" section with a different approach or more details.

Please provide ONLY the content for the "${sectionToRegenerate}" section. Do not include any other sections.

Format your response as clean markdown without the section heading.`;
  }
  
  return `You are PromptArchitect, an expert in creating structured project specifications. 
Your task is to take a user's project idea and transform it into a comprehensive markdown document.

USER'S PROJECT TYPE: ${projectType} (frontend, backend, or fullstack)
USER'S PROJECT IDEA: ${projectIdea}

Generate a structured markdown document with the following sections:
1. Project Overview - A clear, concise description of the project
2. Tech Stack - Recommended technologies appropriate for this ${projectType} project
3. Features - Key functionality the application should include
4. Requirements - Specific implementation details and constraints
5. Architecture - High-level system design (if applicable)
${projectType !== 'frontend' ? '6. API Endpoints - For backend/fullstack projects' : ''}
${projectType !== 'backend' ? '7. UI Components - For frontend/fullstack projects' : ''}
${projectType !== 'frontend' ? '8. Database Schema - For backend/fullstack projects (if applicable)' : ''}
9. Deployment - Recommendations for deployment and hosting

Format your response as clean markdown with proper headings (# for main sections), 
lists (- for bullet points), and code blocks (\`\`\` for code snippets).

IMPORTANT: Your entire response must be valid markdown that can be directly used as a project specification.`;
}

/**
 * Generate a prompt for Anthropic Claude models
 */
export function generateClaudePrompt(params: PromptTemplateParams): string {
  // Claude responds well to the same format as OpenAI
  return generateOpenAIPrompt(params);
}

/**
 * Generate a prompt for Google's Gemini models
 */
export function generateGeminiPrompt(params: PromptTemplateParams): string {
  // Gemini responds well to the same format as OpenAI
  return generateOpenAIPrompt(params);
}

/**
 * Generate a prompt for Deepseek models
 */
export function generateDeepseekPrompt(params: PromptTemplateParams): string {
  // Deepseek responds well to the same format as OpenAI
  return generateOpenAIPrompt(params);
}

/**
 * Parse markdown into sections
 */
export function parseMarkdownSections(markdown: string): Record<string, string> {
  const sections: Record<string, string> = {};
  
  // Split by main headings (# )
  const sectionRegex = /^# (.+)$/gm;
  let match;
  let lastIndex = 0;
  let lastHeading = '';
  
  while ((match = sectionRegex.exec(markdown)) !== null) {
    if (lastHeading) {
      // Extract content from last heading to current heading
      const content = markdown.substring(lastIndex, match.index).trim();
      sections[lastHeading] = content;
    }
    
    lastHeading = match[1].trim();
    lastIndex = match.index + match[0].length;
  }
  
  // Don't forget the last section
  if (lastHeading) {
    const content = markdown.substring(lastIndex).trim();
    sections[lastHeading] = content;
  }
  
  return sections;
}

/**
 * Combine sections into a single markdown document
 */
export function combineSections(sections: Record<string, string>): string {
  return Object.entries(sections)
    .map(([heading, content]) => `# ${heading}\n\n${content}`)
    .join('\n\n');
}
