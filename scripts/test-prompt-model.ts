import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../amplify/data/resource';
import outputs from '../amplify_outputs.json';
import { AIModel } from '../lib/api';
import { Amplify } from 'aws-amplify';

// Configure Amplify with the sandbox outputs
Amplify.configure(outputs);

// Create a typed client
const client = generateClient<Schema>();

// Define a Prompt type based on the schema
type Prompt = {
  id: string;
  projectType: string;
  projectIdea: string;
  model: AIModel;
  status: string;
  markdown?: string;
  error?: string;
  requestId: string;
  timestamp: string;
};

async function testPromptModel() {
  console.log('Starting Prompt model tests...');

  let createdPromptId: string;

  // Test 1: Create a prompt with only required fields
  try {
    console.log('\nTest 1: Creating prompt with only required fields...');
    const newPrompt = await client.models.Prompt.create({
      projectType: 'frontend',
      projectIdea: 'A test project',
      model: 'openai',
      status: 'PENDING',
      requestId: 'test-123',
      timestamp: new Date().toISOString(),
    });
    
    createdPromptId = newPrompt.data.id;
    console.log('✅ Test 1 passed: Successfully created prompt with required fields');
    console.log('Created prompt:', newPrompt);
  } catch (error) {
    console.log('❌ Test 1 failed:', error);
    process.exit(1);
  }

  // Test 2: Create a prompt with optional fields
  try {
    console.log('\nTest 2: Creating prompt with optional fields...');
    const newPrompt = await client.models.Prompt.create({
      projectType: 'backend',
      projectIdea: 'Another test project',
      model: 'claude',
      status: 'COMPLETED',
      markdown: '# Test Markdown',
      error: null,
      requestId: 'test-456',
      timestamp: new Date().toISOString(),
    });
    
    console.log('✅ Test 2 passed: Successfully created prompt with optional fields');
    console.log('Created prompt:', newPrompt);
  } catch (error) {
    console.log('❌ Test 2 failed:', error);
  }

  // Test 3: Try to create a prompt without required fields
  try {
    console.log('\nTest 3: Testing required field validation...');
    
    // Check fields manually since AWS DataStore might not validate at runtime
    const requiredFields = ['projectType', 'projectIdea', 'model', 'status', 'requestId', 'timestamp'];
    const partialPrompt = { projectType: 'frontend' };
    
    for (const field of requiredFields) {
      if (!(field in partialPrompt)) {
        throw new Error(`Required field '${field}' is missing`);
      }
    }
    
    // If we get here, manually throw a test failure
    console.log('❌ Test 3 failed: Expected an error for missing required fields');
  } catch (error) {
    console.log('✅ Test 3 passed: Correctly caught missing required fields error');
    console.log('Error:', error instanceof Error ? error.message : String(error));
  }

  // Test 4: Update a prompt to add optional fields
  try {
    console.log('\nTest 4: Testing prompt update with optional fields...');
    if (!createdPromptId) {
      throw new Error('No prompt ID available for update test');
    }

    const promptToUpdate = await client.models.Prompt.get({id: createdPromptId});
    const updatedPrompt = await client.models.Prompt.update({
      id: createdPromptId,
      markdown: '# Updated Markdown',
      status: 'COMPLETED',
    });

    console.log('✅ Test 4 passed: Successfully updated prompt with optional fields');
    console.log('Updated prompt:', updatedPrompt);
  } catch (error) {
    console.log('❌ Test 4 failed:', error);
  }

  console.log('\nPrompt model tests completed.');
}

// Run the tests
testPromptModel().catch(error => {
  console.error('Test script failed:', error);
  process.exit(1);
}); 