import React, { createContext, useState, useContext, ReactNode } from 'react';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export interface TabsProps {
  defaultValue: string;
  children: ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ defaultValue, children, className = '' }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export interface TabsListProps {
  children: ReactNode;
  className?: string;
}

export const TabsList: React.FC<TabsListProps> = ({ children, className = '' }) => {
  return (
    <div className={`inline-flex space-x-1 rounded-md bg-gray-100 p-1 ${className}`}>
      {children}
    </div>
  );
};

export interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, children, className = '' }) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('TabsTrigger must be used within a Tabs component');
  }
  
  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === value;
  
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      data-state={isActive ? 'active' : 'inactive'}
      onClick={() => setActiveTab(value)}
      className={`inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-sm font-medium transition-all
        ${isActive 
          ? 'bg-white text-primary-700 shadow-sm' 
          : 'text-gray-500 hover:text-gray-700'
        } ${className}`}
    >
      {children}
    </button>
  );
};

export interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({ value, children, className = '' }) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('TabsContent must be used within a Tabs component');
  }
  
  const { activeTab } = context;
  
  if (activeTab !== value) {
    return null;
  }
  
  return (
    <div
      role="tabpanel"
      data-state={activeTab === value ? 'active' : 'inactive'}
      className={className}
    >
      {children}
    </div>
  );
};