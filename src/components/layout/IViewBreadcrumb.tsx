import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function IViewBreadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="h-12 bg-[var(--tags-bg)] border-b border-[var(--tags-border)] flex items-center px-6">
      <nav className="flex items-center space-x-1 text-sm">
        <Home className="w-4 h-4 text-[var(--muted-foreground)]" />
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <ChevronRight className="w-3 h-3 text-[var(--muted-foreground)] mx-1" />
            <span 
              className={`${
                index === items.length - 1 
                  ? 'text-[var(--foreground)] font-medium' 
                  : 'text-[var(--muted-foreground)] hover:text-[var(--primary)] cursor-pointer transition-colors'
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