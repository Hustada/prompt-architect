import { create } from 'zustand';

type Section = {
  id: string;
  name: string;
  required: boolean;
};

type TemplateStore = {
  selectedTemplate: string | null;
  sections: Section[];
  setTemplate: (templateId: string) => void;
  setSections: (sections: Section[]) => void;
  addSection: (section: Section) => void;
  removeSection: (sectionId: string) => void;
};

export const useTemplateStore = create<TemplateStore>((set) => ({
  selectedTemplate: 'backend',
  sections: [
    { id: 'overview', name: 'Project Overview', required: true },
    { id: 'tech-stack', name: 'Tech Stack', required: true },
    { id: 'db-schema', name: 'Database Schema', required: false },
    { id: 'requirements', name: 'Requirements', required: true },
    { id: 'api-endpoints', name: 'API Endpoints', required: false },
    { id: 'auth', name: 'Authentication', required: false },
    { id: 'docs', name: 'Documentation', required: false },
  ],
  setTemplate: (templateId) => set({ selectedTemplate: templateId }),
  setSections: (sections) => set({ sections }),
  addSection: (section) => set((state) => ({
    sections: [...state.sections, section]
  })),
  removeSection: (sectionId) => set((state) => ({
    sections: state.sections.filter((section) => section.id !== sectionId)
  })),
}));
