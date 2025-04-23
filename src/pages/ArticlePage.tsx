import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Alert} from "../components/ui/alert";
import { AlertTitle } from "../components/ui/alert-title";
import { AlertDescription } from "../components/ui/alert-description";

import { AlertCircle, Loader2 } from "lucide-react";

const ArticlePage = () => {
  const { articleUrl } = useParams<{ articleUrl: string }>();
  const [decodedUrl, setDecodedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!articleUrl) {
      setError("No article URL provided");
      return;
    }

    try {
      const decoded = decodeURIComponent(articleUrl);
      new URL(decoded); // Validate URL
      setDecodedUrl(decoded);
    } catch (err) {
      setError("Invalid article URL");
      console.error("URL validation failed:", err);
    }
  }, [articleUrl]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
          <Link to="/">
            <Button variant="outline" className="mt-4">Back to Home</Button>
          </Link>
        </Alert>
      </div>
    );
  }

  if (!decodedUrl) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="py-4 px-6 bg-gray-100 border-b border-gray-200">
        <Link to="/">
          <Button variant="outline">Back to News</Button>
        </Link>
      </header>
      <main className="flex-1">
        <iframe
          src={decodedUrl}
          title="Article content"
          className="w-full h-full"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          allowFullScreen
        />
      </main>
    </div>
  );
};

export default ArticlePage;