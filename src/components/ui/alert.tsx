import React from "react";
import { AlertCircle } from "lucide-react";

interface AlertProps {
  variant?: "default" | "destructive";
  title?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = "default", title, description, className, children, ...props }, ref) => {
    const variants = {
      default: "bg-blue-50 text-blue-800",
      destructive: "bg-red-50 text-red-800",
    };

    return (
      <div
        ref={ref}
        className={`rounded-lg p-4 ${variants[variant]} ${className}`}
        {...props}
      >
        <div className="flex items-start gap-4">
          {variant === "destructive" && (
            <AlertCircle className="h-5 w-5 mt-0.5" />
          )}
          <div className="flex-1">
            {title && <h3 className="font-medium">{title}</h3>}
            {description && <p className="text-sm mt-1">{description}</p>}
            {children}
          </div>
        </div>
      </div>
    );
  }
);

Alert.displayName = "Alert";

export { Alert };