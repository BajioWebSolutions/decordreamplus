import React from 'react';

const styles = [
  {
    id: 'modern',
    name: 'Modern Minimalist',
    description: 'Clean lines, neutral colors, and uncluttered spaces'
  },
  {
    id: 'scandinavian',
    name: 'Scandinavian',
    description: 'Light woods, white spaces, and cozy minimalism'
  },
  {
    id: 'industrial',
    name: 'Industrial Loft',
    description: 'Raw materials, exposed elements, and urban aesthetics'
  },
  {
    id: 'bohemian',
    name: 'Bohemian',
    description: 'Eclectic patterns, vibrant colors, and artistic flair'
  },
  {
    id: 'japandi',
    name: 'Japandi',
    description: 'Japanese minimalism meets Scandinavian comfort'
  },
  {
    id: 'coastal',
    name: 'Coastal',
    description: 'Beach-inspired, airy spaces with natural textures'
  },
  {
    id: 'mid-century',
    name: 'Mid-Century Modern',
    description: 'Retro-inspired furniture with contemporary touches'
  },
  {
    id: 'art-deco',
    name: 'Art Deco',
    description: 'Glamorous, geometric patterns with bold accents'
  },
  {
    id: 'contemporary',
    name: 'Contemporary Luxe',
    description: 'Sophisticated blend of comfort and modern luxury'
  },
  {
    id: 'rustic',
    name: 'Modern Rustic',
    description: 'Warm woods, natural materials, and cozy comfort'
  },
  {
    id: 'mediterranean',
    name: 'Mediterranean',
    description: 'Warm colors, terracotta, and elegant archways'
  },
  {
    id: 'zen',
    name: 'Zen Garden',
    description: 'Peaceful minimalism with natural elements'
  }
];

interface StyleSelectorProps {
  selectedStyle: string;
  onStyleSelect: (style: string) => void;
}

export function StyleSelector({ selectedStyle, onStyleSelect }: StyleSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2">
      {styles.map((style) => (
        <button
          key={style.id}
          onClick={() => onStyleSelect(style.id)}
          className={`p-4 rounded-lg border-2 text-left transition-all hover:shadow-md ${
            selectedStyle === style.id
              ? 'border-indigo-600 bg-indigo-50 shadow-md'
              : 'border-gray-200 hover:border-indigo-200'
          }`}
        >
          <h4 className="font-semibold mb-1">{style.name}</h4>
          <p className="text-sm text-gray-600 line-clamp-2">{style.description}</p>
        </button>
      ))}
    </div>
  );
}