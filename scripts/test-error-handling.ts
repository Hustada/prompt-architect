/**
 * This script tests the error handling capabilities of the PromptArchitect application
 */

import logger from '../lib/logger';
import { generatePrompt, AIModel } from '../lib/api';
import { ProjectType } from '../lib/promptTemplates';

async function testErrorHandling() {
  console.log('Starting error handling tests...');
  
  // Test 1: Missing API key
  try {
    console.log('\nTest 1: Testing with missing API key...');
    // Temporarily store the original env variable
    const originalKey = process.env.OPENAI_API_KEY;
    // Set it to an empty string to simulate missing key
    process.env.OPENAI_API_KEY = '';
    
    await generatePrompt({
      projectType: 'frontend',
      projectIdea: 'A test project',
      model: 'openai',
    });
    
    console.log('❌ Test 1 failed: Expected an error but none was thrown');
    // Restore the original key
    process.env.OPENAI_API_KEY = originalKey;
  } catch (error) {
    console.log('✅ Test 1 passed: Correctly caught missing API key error');
    logger.error('Missing API key error', error);
    // Restore the original key if it exists
    if (process.env.OPENAI_API_KEY === '') {
      delete process.env.OPENAI_API_KEY;
    }
  }
  
  // Test 2: Invalid project type
  try {
    console.log('\nTest 2: Testing with invalid project type...');
    await generatePrompt({
      projectType: 'invalid_type' as ProjectType,
      projectIdea: 'A test project',
      model: 'openai',
    });
    
    console.log('❌ Test 2 failed: Expected an error but none was thrown');
  } catch (error) {
    console.log('✅ Test 2 passed: Correctly caught invalid project type error');
    logger.error('Invalid project type error', error);
  }
  
  // Test 3: Empty project idea
  try {
    console.log('\nTest 3: Testing with empty project idea...');
    await generatePrompt({
      projectType: 'frontend',
      projectIdea: '',
      model: 'openai',
    });
    
    console.log('❌ Test 3 failed: Expected an error but none was thrown');
  } catch (error) {
    console.log('✅ Test 3 passed: Correctly caught empty project idea error');
    logger.error('Empty project idea error', error);
  }
  
  // Display all error logs
  console.log('\nAll error logs:');
  const errorLogs = logger.getErrors();
  console.log(`Found ${errorLogs.length} error logs`);
  
  console.log('\nError handling tests completed.');
}

// Run the tests
testErrorHandling().catch(error => {
  console.error('Test script failed:', error);
  process.exit(1);
});
