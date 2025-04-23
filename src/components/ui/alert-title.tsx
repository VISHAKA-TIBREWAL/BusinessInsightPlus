// alert-title.tsx
import React from "react";

interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const AlertTitle = React.forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={`font-medium leading-none tracking-tight ${className}`}
    {...props}
  />
));

AlertTitle.displayName = "AlertTitle";

export { AlertTitle };