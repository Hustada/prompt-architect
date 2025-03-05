import { NextRequest, NextResponse } from 'next/server';
import { AIModel, callOpenAI, callClaude, callGemini, extractMarkdown } from '@/lib/api';
import { ProjectType, generateOpenAIPrompt, generateClaudePrompt, generateGeminiPrompt } from '@/lib/promptTemplates';
import logger from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const requestId = logger.generateRequestId();
    logger.info('Received prompt generation request', {}, requestId);
    
    const body = await request.json();
    const { projectType, projectIdea, model = 'openai', sectionToRegenerate, previousResponse } = body;
    
    // Validate request parameters
    if (!projectType || !projectIdea) {
      logger.warn('Missing required parameters', { projectType, projectIdea }, requestId);
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }
    
    // Generate the prompt
    let response: Response;
    let promptText: string;
    
    switch (model) {
      case 'openai':
        promptText = generateOpenAIPrompt({ projectType, projectIdea, sectionToRegenerate, previousResponse });
        response = await callOpenAI(promptText, requestId);
        break;
      case 'claude':
        promptText = generateClaudePrompt({ projectType, projectIdea, sectionToRegenerate, previousResponse });
        response = await callClaude(promptText, requestId);
        break;
      case 'gemini':
        promptText = generateGeminiPrompt({ projectType, projectIdea, sectionToRegenerate, previousResponse });
        response = await callGemini(promptText, requestId);
        break;
      // Deepseek model removed due to account balance issues
      default:
        throw new Error(`Unsupported model: ${model}`);
    }
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      logger.error(
        `Error from ${model} API: ${response.status}`,
        errorData,
        requestId
      );
      return NextResponse.json(
        { error: `API error: ${response.status}`, details: errorData },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    const markdown = extractMarkdown(data, model as AIModel);
    
    logger.info('Successfully generated prompt', { model, responseLength: markdown.length }, requestId);
    
    return NextResponse.json({
      markdown,
      requestId,
      model,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Error generating prompt', { error: error.message });
    
    return NextResponse.json(
      { error: 'Failed to generate prompt', message: error.message },
      { status: 500 }
    );
  }
}
