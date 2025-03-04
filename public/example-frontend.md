# Project Overview
Create a modern task management web application with a clean, intuitive user interface.

# Feature Requirements
- User authentication (login, register, password reset)
- Dashboard showing task overview and statistics
- Task list with filtering and sorting options
- Task creation and editing with rich text support
- Due date selection with calendar integration
- Task categories and tags
- Dark/light theme toggle
- Responsive design for mobile and desktop

# File Structure
```
/src
  /components
    /auth
      LoginForm.tsx
      RegisterForm.tsx
      PasswordReset.tsx
    /dashboard
      Dashboard.tsx
      TaskStats.tsx
    /tasks
      TaskList.tsx
      TaskItem.tsx
      TaskForm.tsx
      TaskFilter.tsx
    /ui
      Button.tsx
      Input.tsx
      Modal.tsx
      ThemeToggle.tsx
  /pages
    Home.tsx
    Login.tsx
    Register.tsx
    Dashboard.tsx
    TaskDetail.tsx
  /hooks
    useAuth.ts
    useTasks.ts
    useTheme.ts
  /context
    AuthContext.tsx
    TaskContext.tsx
    ThemeContext.tsx
  /api
    authApi.ts
    taskApi.ts
  /utils
    dateUtils.ts
    validationUtils.ts
```

# UI Components
1. **Navigation**
   - Top navigation bar with app logo, user profile, and theme toggle
   - Sidebar with links to dashboard, tasks, settings

2. **Dashboard**
   - Task statistics (total, completed, upcoming)
   - Recent tasks list
   - Calendar view of upcoming tasks

3. **Task List**
   - Filterable and sortable list of tasks
   - Quick actions (complete, edit, delete)
   - Pagination or infinite scroll

4. **Task Form**
   - Title and description fields
   - Due date picker
   - Category and tag selection
   - Priority selection

# API Integration
- Connect to backend API endpoints for all CRUD operations
- Implement proper error handling and loading states
- Use JWT for authentication
- Cache responses where appropriate

# Relevant Docs
- Use React Query for API data fetching and caching
- Implement form validation with Zod or Yup
- Use Tailwind CSS for styling
- Consider using Framer Motion for animations

# Rules
- Use TypeScript for all components and functions
- Follow atomic design principles for components
- Implement proper error boundaries
- Write unit tests for critical components
- Use ESLint and Prettier for code quality
