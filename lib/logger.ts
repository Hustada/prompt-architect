/**
 * Logger utility for tracking application events and errors
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
  requestId?: string;
  stack?: string;
  component?: string;
}

class Logger {
  private logs: LogEntry[] = [];
  private listeners: ((entry: LogEntry) => void)[] = [];
  
  /**
   * Log a debug message
   */
  debug(message: string, data?: any, requestId?: string): void {
    this.log('debug', message, data, requestId);
  }
  
  /**
   * Log an info message
   */
  info(message: string, data?: any, requestId?: string): void {
    this.log('info', message, data, requestId);
  }
  
  /**
   * Log a warning message
   */
  warn(message: string, data?: any, requestId?: string): void {
    this.log('warn', message, data, requestId);
  }
  
  /**
   * Log an error message with enhanced error information
   * @param message The error message
   * @param data Additional data or error object
   * @param requestId Optional request ID for tracking
   * @param component Optional component name where the error occurred
   */
  error(message: string, data?: any, requestId?: string, component?: string): void {
    let stack: string | undefined;
    let enhancedData = data;
    
    // Extract stack trace if data contains an error object
    if (data && data.error instanceof Error) {
      stack = data.error.stack;
      // Create a clean copy of the data without circular references
      enhancedData = {
        ...data,
        error: {
          message: data.error.message,
          name: data.error.name,
          // Include other properties that might be useful
        }
      };
    } else if (data instanceof Error) {
      stack = data.stack;
      enhancedData = {
        message: data.message,
        name: data.name
      };
    }
    
    this.log('error', message, enhancedData, requestId, stack, component);
  }
  
  /**
   * Get all logs
   */
  getLogs(): LogEntry[] {
    return [...this.logs];
  }
  
  /**
   * Clear all logs
   * @param level Optional log level to clear (if not provided, clears all logs)
   */
  clearLogs(level?: LogLevel): void {
    if (level) {
      this.logs = this.logs.filter(log => log.level !== level);
    } else {
      this.logs = [];
    }
  }
  
  /**
   * Get logs filtered by level
   * @param level The log level to filter by
   */
  getLogsByLevel(level: LogLevel): LogEntry[] {
    return this.logs.filter(log => log.level === level);
  }
  
  /**
   * Get error logs
   */
  getErrors(): LogEntry[] {
    return this.getLogsByLevel('error');
  }
  
  /**
   * Add a listener for new log entries
   * @param listener Function to call when a new log entry is added
   * @param levels Optional array of log levels to filter for
   */
  addListener(listener: (entry: LogEntry) => void, levels?: LogLevel[]): () => void {
    const wrappedListener = (entry: LogEntry) => {
      if (!levels || levels.includes(entry.level)) {
        listener(entry);
      }
    };
    
    this.listeners.push(wrappedListener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== wrappedListener);
    };
  }
  
  /**
   * Generate a unique request ID
   */
  generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }
  
  private log(level: LogLevel, message: string, data?: any, requestId?: string, stack?: string, component?: string): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      requestId,
      stack,
      component,
    };
    
    this.logs.push(entry);
    
    // Notify listeners
    this.listeners.forEach(listener => listener(entry));
    
    // Also log to console
    const consoleMethod = level === 'debug' ? 'log' : level;
    const componentPrefix = component ? `[${component}] ` : '';
    
    if (data) {
      console[consoleMethod](`[${level.toUpperCase()}] ${componentPrefix}${message}`, data);
    } else {
      console[consoleMethod](`[${level.toUpperCase()}] ${componentPrefix}${message}`);
    }
    
    // Log stack trace for errors if available
    if (stack && level === 'error') {
      console.error('Stack trace:', stack);
    }
  }
}

// Create a singleton instance
const logger = new Logger();

export default logger;
