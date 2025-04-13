'use client';

import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';

// Import the deployed Amplify configuration
import amplifyConfig from '../../amplify_outputs.json';

Amplify.configure(amplifyConfig);

// Generate the client for use in your app
export const client = generateClient<Schema>();

export default Amplify; 