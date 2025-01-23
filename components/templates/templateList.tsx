import { useGetTemplatesQuery } from '@/redux/services/api';
import { Template } from '@/types';
import Link from 'next/link';
import React from 'react';
import DeleteTemplateButton from './deleteTemplate';

export const TemplateList = () => {
  // Fetch templates with RTK Query
  const { data, error, isLoading } = useGetTemplatesQuery({ page: 1, limit: 10 });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: Failed to fetch templates</div>;
  }

  return (
    <div className="space-y-4">
      {data?.data.map((template:Template) => (
        <div
          key={template.id}
          className="flex items-center justify-between bg-gradient-to-r from-deepBlue to-lightBlue text-white py-3 px-4 rounded-lg shadow-md"
        >
          {/* Template Info */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-blue-600 font-bold">
              {template.name.charAt(0)}
            </div>
            <div>
              <p className="text-lg font-medium">{template.name}</p>
              <p className="text-sm font-light">{template.language}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 items-center">
            <Link
              href={`/home/templates/${template.id}`}
              className=" underline text-white "
            >
              Edit
            </Link>
            <DeleteTemplateButton templateId={template.id} templateName={template.name}/>
          </div>
        </div>
      ))}
    </div>
  );
};
