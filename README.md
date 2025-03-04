# PromptArchitect

A powerful tool that transforms project ideas into structured markdown prompts for AI coding projects. PromptArchitect helps developers create comprehensive, well-organized requirement documents that can be used to guide AI assistants in coding tasks.

**Powered by the Victor Collective**

## Features

- **AI-Powered Generation**: Transform simple project ideas into comprehensive specifications
- **Multiple Project Types**: Support for Frontend, Backend, Full Stack, Mobile, and Data Science projects
- **Multiple AI Models**: Integration with OpenAI, Anthropic Claude, Google Gemini, and Deepseek
- **Section Regeneration**: Request alternative versions of specific sections
- **Live Markdown Preview**: See your prompt take shape in real-time
- **Export Options**: Copy to clipboard or download as markdown files
- **Responsive Design**: Works on all devices with dark mode support
- **Blueprint-Inspired UI**: Technical, precise aesthetic
- **Robust Error Handling**: User-friendly error messages with detailed logging
- **Advanced Logging System**: Component-level logging with stack trace support

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Hustada/prompt-architect.git
   cd prompt-architect
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.local.example .env.local
   ```
   Then edit `.env.local` to add your API keys for the AI services you want to use:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `ANTHROPIC_API_KEY`: Your Anthropic Claude API key
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `DEEPSEEK_API_KEY`: Your Deepseek API key

4. Run the development server
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3001](http://localhost:3001) with your browser to see the application

## Usage

1. Enter your project idea in the text area
2. Select your project type (Frontend, Backend, Full Stack, Mobile, or Data Science)
3. Choose your preferred AI model (OpenAI, Claude, Gemini, or Deepseek)
4. Click 'Generate Prompt' to create your structured prompt
5. Review the generated prompt sections
6. Hover over any section heading to see the option to regenerate that specific section
7. Copy the complete prompt to clipboard or download it as a .md file
8. Use the generated prompt with your preferred AI coding assistant

## Project Structure

```
/
├── app/                  # Next.js app directory
│   ├── api/              # API routes
│   │   └── generate/     # AI prompt generation endpoint
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Main application page
├── components/           # React components
│   ├── error-message.tsx # User-friendly error display
│   ├── idea-input.tsx    # Form for entering project ideas
│   ├── prompt-preview.tsx # Preview of generated prompt
│   └── section-editor.tsx # Section editing component
├── lib/                  # Utility functions and services
│   ├── api.ts            # API client for AI models
│   ├── logger.ts         # Advanced logging utility
│   └── promptTemplates.ts # Prompt generation templates
├── scripts/              # Utility scripts
│   └── test-error-handling.ts # Error handling test script
└── public/               # Static assets
```

## Technologies Used

- [Next.js 15](https://nextjs.org/) - React framework
- [React 19](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [Heroicons](https://heroicons.com/) - Icons

## AI Integration

PromptArchitect supports the following AI models:

- **OpenAI GPT-4**: Powerful general-purpose language model
- **Anthropic Claude**: Excellent for detailed, nuanced content
- **Google Gemini**: Strong technical and reasoning capabilities
- **Deepseek**: Specialized for technical content generation

Each model requires its own API key to be set in the `.env.local` file.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the need for structured AI prompts
- Based on best practices for AI-assisted development

## Contact

For questions, feedback, or support, please contact:

- Email: victorhustad@victorcollective.com
- Website: [The Victor Collective](https://victorcollective.com)
