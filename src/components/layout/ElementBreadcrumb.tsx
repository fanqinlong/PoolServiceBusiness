import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function ElementBreadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="h-10 bg-[var(--navbar-bg)] border-b border-[var(--navbar-border)] flex items-center px-5">
      <nav className="flex items-center space-x-1 text-sm">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <ChevronRight className="w-3 h-3 text-gray-400 mx-1" />
            )}
            <span 
              className={`${
                index === items.length - 1 
                  ? 'text-gray-900 font-medium' 
                  : 'text-gray-500 hover:text-[var(--primary)] cursor-pointer'
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