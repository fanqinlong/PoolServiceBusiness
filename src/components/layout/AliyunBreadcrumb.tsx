import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function AliyunBreadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="h-10 bg-white border-b border-gray-200 flex items-center px-6">
      <nav className="flex items-center space-x-1 text-xs">
        <Home className="w-3 h-3 text-gray-400" />
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <ChevronRight className="w-3 h-3 text-gray-300 mx-1" />
            <span 
              className={`${
                index === items.length - 1 
                  ? 'text-gray-800 font-medium' 
                  : 'text-gray-500 hover:text-[var(--primary)] cursor-pointer transition-colors'
              }`}
            >
              {item.label}
            </span>
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
}