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
10. Recommended APIs & Data Sources - Specific APIs and data sources that would be useful for this project
11. Recommended Tools & Services - Third-party tools and services to enhance development and functionality
12. Implementation Resources - Links to helpful documentation, tutorials, or GitHub repositories
13. Potential Challenges & Solutions - Common technical hurdles and approaches to overcome them
14. Scalability Considerations - Recommendations for how the project could scale as user base or data volume grows
15. Alternative Approaches - 1-2 alternative architectural decisions with pros/cons for each
16. DevOps Recommendations - CI/CD pipeline suggestions, testing strategies, and monitoring tools
17. Security Considerations - Project-specific security concerns and mitigation strategies
18. Cost Estimation - Rough estimates for hosting, API usage, and third-party services
19. Code Snippets - Small, useful code examples for key functionality
20. Mobile-Specific Considerations - Recommendations for responsive design or native app alternatives
21. Competitive Analysis - Brief overview of similar projects and what makes this implementation unique
22. Future Enhancement Roadmap - Suggestions for version 2.0 features to consider after initial implementation

Format your response as clean markdown with proper headings (# for main sections), 
lists (- for bullet points), and code blocks (\`\`\` for code snippets).

For the Recommended APIs & Data Sources section, include 3-5 specific, named APIs that would be useful for this project, with a brief description of each.

For the Recommended Tools & Services section, suggest 3-5 specific third-party tools or services that would enhance development or functionality, explaining their purpose.

For the Implementation Resources section, provide 2-3 links to relevant documentation, tutorials, or GitHub repositories with descriptive text.

For the Potential Challenges & Solutions section, identify 2-3 likely technical hurdles and suggest practical approaches to overcome them.

For the Scalability Considerations section, provide specific recommendations for handling increased load, users, or data volume.

For the Alternative Approaches section, present 1-2 alternative architectural decisions with clear pros/cons for each.

For the DevOps Recommendations section, suggest specific CI/CD tools, testing frameworks, and monitoring solutions.

For the Security Considerations section, identify project-specific vulnerabilities and mitigation strategies.

For the Cost Estimation section, provide rough monthly estimates for hosting, API usage, and third-party services.

For the Code Snippets section, include 1-2 small, practical code examples that demonstrate key functionality (e.g., API connection, data transformation).

For the Mobile-Specific Considerations section, provide concrete recommendations for responsive design or native app alternatives.

For the Competitive Analysis section, name 2-3 similar existing projects and what makes this implementation unique.

For the Future Enhancement Roadmap section, suggest 3-5 features for a version 2.0 release.

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
 * Generate a prompt for Grok models
 */
export function generateGrokPrompt(params: PromptTemplateParams): string {
  // Grok can use the same prompt template as OpenAI
  return generateOpenAIPrompt(params);
}

// Deepseek model removed

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
