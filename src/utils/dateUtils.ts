/**
 * Formats a date (string or Firestore Timestamp) into a more readable format
 * @param dateInput - ISO date string or Firestore Timestamp object
 * @returns Formatted date string
 */
export function formatDate(dateInput: any): string {
  if (!dateInput) return '';

  let date: Date;
  if (typeof dateInput?.toDate === 'function') {
    date = dateInput.toDate(); // Convert Firestore Timestamp to JavaScript Date
  } else if (typeof dateInput === 'string') {
    date = new Date(dateInput); // Try to parse as a standard date string
  } else if (typeof dateInput === 'number') {
    date = new Date(dateInput); // Try to parse as a Unix timestamp (milliseconds)
  } else {
    console.error('Invalid date format:', dateInput);
    return 'Invalid Date';
  }

  if (isNaN(date.getTime())) {
    console.error('Invalid time value:', dateInput);
    return 'Invalid Date';
  }

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/**
 * Formats a Unix timestamp into a readable date string
 * @param timestamp - Unix timestamp in seconds or milliseconds
 * @returns Formatted date string
 */
export function formatTimestamp(timestamp: number): string {
  if (!timestamp) return '';

  // Convert seconds to milliseconds if needed
  const milliseconds = timestamp < 10000000000
    ? timestamp * 1000
    : timestamp;

  const date = new Date(milliseconds);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/**
 * Returns a relative time string (e.g., "2 hours ago")
 * @param dateString - ISO date string or timestamp
 * @returns Relative time string
 */
export function getRelativeTime(dateInput: string | number | any): string {
  if (!dateInput) return '';

  let date: Date;
  if (typeof dateInput?.toDate === 'function') {
    date = dateInput.toDate(); // Convert Firestore Timestamp to JavaScript Date
  } else if (typeof dateInput === 'string') {
    date = new Date(dateInput);
  } else if (typeof dateInput === 'number') {
    date = new Date(dateInput < 10000000000 ? dateInput * 1000 : dateInput);
  } else {
    return '';
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`;
}