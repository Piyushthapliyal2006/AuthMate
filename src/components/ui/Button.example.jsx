// Button Component Usage Examples
import React from 'react';
import Button from './Button';
import { 
  PlusIcon, 
  TrashIcon, 
  PencilIcon, 
  ArrowRightIcon,
  CloudArrowUpIcon,
  HeartIcon 
} from '@heroicons/react/24/outline';

const ButtonExamples = () => {
  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold mb-6">Button Component Examples</h2>
      
      {/* Basic Buttons */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Sizes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </div>
      </section>

      {/* With Icons */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">With Icons</h3>
        <div className="flex flex-wrap gap-4">
          <Button icon={<PlusIcon className="w-5 h-5" />}>
            Add Item
          </Button>
          <Button 
            icon={<TrashIcon className="w-5 h-5" />} 
            variant="outline"
            iconPosition="left"
          >
            Delete
          </Button>
          <Button 
            icon={<ArrowRightIcon className="w-5 h-5" />} 
            iconPosition="right"
            variant="secondary"
          >
            Next Step
          </Button>
        </div>
      </section>

      {/* Icon Only Buttons */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Icon Only</h3>
        <div className="flex flex-wrap gap-4">
          <Button icon={<PencilIcon className="w-5 h-5" />} size="sm" />
          <Button icon={<HeartIcon className="w-5 h-5" />} variant="outline" />
          <Button icon={<CloudArrowUpIcon className="w-5 h-5" />} variant="ghost" />
        </div>
      </section>

      {/* States */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">States</h3>
        <div className="flex flex-wrap gap-4">
          <Button loading>Loading...</Button>
          <Button disabled>Disabled</Button>
          <Button 
            loading 
            icon={<CloudArrowUpIcon className="w-5 h-5" />}
          >
            Uploading
          </Button>
        </div>
      </section>

      {/* As Links */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">As Links</h3>
        <div className="flex flex-wrap gap-4">
          <Button to="/profile" icon={<ArrowRightIcon className="w-5 h-5" />}>
            Go to Profile
          </Button>
          <Button to="/settings" variant="outline">
            Settings
          </Button>
        </div>
      </section>

      {/* Complex Examples */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Complex Examples</h3>
        <div className="flex flex-wrap gap-4">
          <Button 
            variant="primary"
            size="lg"
            icon={<PlusIcon className="w-6 h-6" />}
            className="shadow-lg hover:shadow-xl"
          >
            Create New Project
          </Button>
          
          <Button 
            variant="outline"
            icon={<CloudArrowUpIcon className="w-5 h-5" />}
            iconPosition="right"
            className="border-blue-500 text-blue-600 hover:bg-blue-50"
          >
            Upload Files
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ButtonExamples;
