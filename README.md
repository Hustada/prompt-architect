# AI Prompt Formatter

A tool to format text input into structured markdown files for AI coding projects. This application helps developers create well-organized requirement documents that can be used to guide AI assistants in coding tasks.

## Features

- Multiple pre-defined templates (Backend, Frontend, Full Stack)
- Customizable sections
- Live markdown preview
- Copy to clipboard functionality
- Download formatted markdown files
- Responsive design for all devices

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/ai-prompt-formatter.git
   cd ai-prompt-formatter
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Run the development server
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application

## Usage

1. Select a template from the sidebar (Backend, Frontend, Full Stack, or Custom)
2. Fill in the details for each section
3. View the formatted markdown in real-time
4. Copy the markdown to clipboard or download it as a .md file
5. Use the generated markdown to guide AI coding assistants

## Project Structure

```
/
├── app/                  # Next.js app directory
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Main application page
├── components/           # React components
│   ├── prompt-form.tsx   # Form for entering prompt details
│   └── template-selector.tsx # Template selection component
├── lib/                  # Utility functions and hooks
│   └── store.ts          # Zustand state management
└── public/               # Static assets
```

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [Heroicons](https://heroicons.com/) - Icons

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the need for structured AI prompts
- Based on best practices for AI-assisted development
