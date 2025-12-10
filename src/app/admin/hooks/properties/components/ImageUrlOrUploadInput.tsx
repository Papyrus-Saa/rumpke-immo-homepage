import React, { useRef } from 'react';
import { ControllerRenderProps, FieldError } from 'react-hook-form';
import Button from '@/components/ui/Button';
import { IoClose } from 'react-icons/io5';

interface ImageUrlOrUploadInputProps {
  label: string;
  field: ControllerRenderProps<any, any>;
  error?: FieldError | string;
  required?: boolean;
}

const ImageUrlOrUploadInput: React.FC<ImageUrlOrUploadInputProps> = ({ label, field, error, required }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const value = field.value ?? '';
  const isImage = value && (value.startsWith('http') || value.startsWith('blob:'));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      field.onChange(url);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="block text-sm font-medium text-admin-text-l dark:text-admin-text-d mb-2">
        {label} {required && <span className="">*</span>}
      </label>
      <div className="flex gap-2 items-center">
        <input
          type="url"
          value={value}
          onChange={e => field.onChange(e.target.value)}
          className={`flex-1 px-4 py-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${error ? 'border-error' : ''}`}
          placeholder="https://..."
        />
        {value && (
          <button
            type="button"
            className="p-1 text-error hover:bg-error/10 rounded"
            onClick={() => field.onChange('')}
            title="Bild entfernen"
          >
            <IoClose size={20} />
          </button>
        )}
        <Button
          type="button"
          variant="primary"
          className="whitespace-nowrap"
          onClick={() => fileInputRef.current?.click()}
        >
          Hochladen
        </Button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        {isImage && (
          <img
            src={value}
            alt="Preview"
            width={58}
            height={58}
            className="rounded object-cover ml-2"
          />
        )}
      </div>
      {error && <p className="text-xs text-error mt-1">{typeof error === 'string' ? error : error.message}</p>}
    </div>
  );
};

export default ImageUrlOrUploadInput;
