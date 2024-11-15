'use client';
import Image from 'next/image';
import { ColumnDef } from '@tanstack/react-table';

export type Deviant = {
  id: number;
  slug: string;
  image?: string;
  type: string;
  preferences: string[];
  seasons: string[];
  acquisitionMethods: string[];
}

export const preferenceIcons: { [key: string]: string } = {
  'flower': '/deviants/default.png',
  'toys': '/deviants/default.png',
  'green light': '/deviants/default.png',
};

export const createColumns = (t: (key: string) => string): ColumnDef<Deviant>[] => [
  {
    accessorKey: 'image',
    header: 'Icon',
    cell: ({ row }) => (
      <Image
        src={`/deviants/${row.original.slug}.png`}
        alt={row.original.slug}
        width={64}
        height={64}
      />
    ),
  },
  {
    accessorKey: 'slug',
    header: 'Name',
    cell: ({ row }) => <span>{t('list.' + row.original.slug.toLowerCase() + '.name')}</span>,
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'preferences',
    header: 'Preferences',
    cell: ({ row }) => (
      <ul className="flex flex-col gap-2">
        {row.original.preferences.map((preference) => (
          <li key={preference} className="flex items-center space-x-1">
            {preferenceIcons[preference.toLowerCase()] ? (
              <Image
                src={preferenceIcons[preference.toLowerCase()]}
                alt={preference}
                width={20}
                height={20}
              />
            ) : null}
            <span>{preference}</span>
          </li>
        ))}
      </ul>
    ),
  },
];
