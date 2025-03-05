/**
 * API client for interacting with AI models
 */

import logger from './logger';
import {
  ProjectType,
  generateOpenAIPrompt,
  generateClaudePrompt,
  generateGeminiPrompt,
  generateDeepseekPrompt,
} from './promptTemplates';

export type AIModel = 'openai' | 'claude' | 'gemini' | 'grok';

interface GeneratePromptParams {
  projectType: ProjectType;
  projectIdea: string;
  model?: AIModel;
  sectionToRegenerate?: string;
  previousResponse?: string;
}

interface AIResponse {
  markdown: string;
  requestId: string;
  model: AIModel;
  timestamp: string;
}

/**
 * Generate a prompt using the specified AI model
 */
export async function generatePrompt(params: GeneratePromptParams): Promise<AIResponse> {
  const { projectType, projectIdea, model = 'openai', sectionToRegenerate, previousResponse } = params;
  const requestId = logger.generateRequestId();
  
  logger.info(
    `Generating prompt for ${projectType} project using ${model}`,
    { projectType, model, sectionToRegenerate },
    requestId
  );
  
  try {
    // Call the API route instead of direct API calls
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        projectType,
        projectIdea,
        model,
        sectionToRegenerate,
        previousResponse,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      logger.error(
        `Error from API: ${response.status}`,
        errorData,
        requestId
      );
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    logger.info(
      `Successfully generated prompt using ${model}`,
      { responseLength: data.markdown?.length || 0 },
      requestId
    );
    
    return data;
  } catch (error) {
    logger.error(
      `Failed to generate prompt using ${model}`,
      { error: error.message },
      requestId
    );
    throw error;
  }
}

// The following functions are now moved to the server-side API route
// They are kept here for reference but are not used directly from the client

/**
 * Call the OpenAI API (server-side only)
 */
export async function callOpenAI(prompt: string, requestId: string): Promise<Response> {
  logger.debug('Calling OpenAI API', { promptLength: prompt.length }, requestId);
  
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OpenAI API key not found');
  }
  
  return fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are PromptArchitect, an expert in creating structured project specifications.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    }),
  });
}

/**
 * Call the Anthropic Claude API (server-side only)
 */
export async function callClaude(prompt: string, requestId: string): Promise<Response> {
  logger.debug('Calling Claude API', { promptLength: prompt.length }, requestId);
  
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('Claude API key not found');
  }
  
  return fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-3-opus-20240229',
      max_tokens: 2000,
      messages: [
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    }),
  });
}

/**
 * Call the Google Gemini API (server-side only)
 */
export async function callGemini(prompt: string, requestId: string): Promise<Response> {
  logger.debug('Calling Gemini API', { promptLength: prompt.length }, requestId);
  
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Gemini API key not found');
  }
  
  return fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: prompt },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2000,
      },
    }),
  });
}

/**
 * Call the Deepseek API (server-side only)
 */
export async function callDeepseek(prompt: string, requestId: string): Promise<Response> {
  logger.debug('Calling Deepseek API', { promptLength: prompt.length }, requestId);
  
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    throw new Error('Deepseek API key not found');
  }
  
  return fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: 'You are PromptArchitect, an expert in creating structured project specifications.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    }),
  });
}

/**
 * Call the Grok API (server-side only)
 */
export async function callGrok(prompt: string, requestId: string): Promise<Response> {
  logger.debug('Calling Grok API', { promptLength: prompt.length }, requestId);
  
  const apiKey = process.env.GROK_API_KEY;
  if (!apiKey) {
    throw new Error('Grok API key not found');
  }
  
  return fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'grok-2-latest',
      messages: [
        { role: 'system', content: 'You are PromptArchitect, an expert in creating structured project specifications.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      stream: false
    }),
  });
}

/**
 * Extract markdown from API response based on the model (server-side only)
 */
export function extractMarkdown(data: any, model: AIModel): string {
  switch (model) {
    case 'openai':
      return data.choices?.[0]?.message?.content || '';
    case 'claude':
      return data.content?.[0]?.text || '';
    case 'gemini':
      return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    case 'grok':
      return data.choices?.[0]?.message?.content || '';
    default:
      return '';
  }
}
