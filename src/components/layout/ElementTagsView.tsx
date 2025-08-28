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

export function ElementTagsView({ tags, activeTag, onTagClick, onTagClose }: TagsViewProps) {
  return (
    <div className="h-8 bg-[var(--tags-bg)] border-b border-[var(--tags-border)] flex items-center px-4 overflow-x-auto">
      <div className="flex items-center gap-1">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className={`flex items-center gap-1 px-3 py-1 text-xs rounded cursor-pointer transition-colors duration-200 whitespace-nowrap ${
              activeTag === tag.id
                ? 'bg-[var(--tags-active-bg)] text-[var(--tags-active-text)] border border-[var(--primary)]'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => onTagClick(tag.id)}
          >
            <span>{tag.label}</span>
            {tag.closable && tag.id !== 'overview' && (
              <X 
                className="w-3 h-3 ml-1 hover:bg-gray-200 rounded" 
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