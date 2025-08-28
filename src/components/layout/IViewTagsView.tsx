import React from 'react';
import { X } from 'lucide-react';

interface Tag {
  id: string;
  label: string;
  path: string;
  closable?: boolean;
}

interface TagsViewProps {
  tags: Tag[];
  activeTag: string;
  onTagClick: (tagId: string) => void;
  onTagClose: (tagId: string) => void;
}

export function IViewTagsView({ tags, activeTag, onTagClick, onTagClose }: TagsViewProps) {
  return (
    <div className="h-10 bg-[var(--tags-bg)] border-b border-[var(--tags-border)] flex items-center px-4 overflow-x-auto">
      <div className="flex items-center gap-1">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs rounded cursor-pointer transition-all duration-200 whitespace-nowrap border ${
              activeTag === tag.id
                ? 'bg-[var(--tags-active-bg)] text-[var(--tags-active-text)] border-[var(--primary)] shadow-sm'
                : 'bg-white text-[var(--foreground)] border-[var(--border)] hover:bg-[var(--tags-hover-bg)] hover:border-[var(--primary)] hover:text-[var(--primary)]'
            }`}
            onClick={() => onTagClick(tag.id)}
          >
            <span>{tag.label}</span>
            {tag.closable && tag.id !== 'overview' && (
              <X 
                className={`w-3 h-3 ml-1 rounded transition-colors ${
                  activeTag === tag.id 
                    ? 'hover:bg-white/20' 
                    : 'hover:bg-[var(--muted)]'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onTagClose(tag.id);
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}