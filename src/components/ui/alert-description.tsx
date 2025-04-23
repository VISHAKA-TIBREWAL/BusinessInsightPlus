// alert-description.tsx
import React from "react";

interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const AlertDescription = React.forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
  ({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={`text-sm [&_p]:leading-relaxed ${className}`}
    {...props}
  />
));

AlertDescription.displayName = "AlertDescription";

export { AlertDescription };