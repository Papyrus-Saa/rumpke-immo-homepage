import React, { useRef, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputImageGalleryProps {
  label: string;
  name: string;
  register: UseFormRegisterReturn;
  error?: string;
  className?: string;
  onUpload?: (files: File[]) => void; // Para integración con Cloudinary
  value?: string[]; // URLs de imágenes ya subidas
  disabled?: boolean;
}

const InputImageGallery: React.FC<InputImageGalleryProps> = ({
  label,
  name,
  register,
  error,
  className = "",
  onUpload,
  value = [],
  disabled = false,
}) => {
  const [previews, setPreviews] = useState<string[]>(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
      if (onUpload) onUpload(files);
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-xs font-medium mb-1">{label}</label>
      <input
        type="file"
        id={name}
        multiple
        accept="image/*"
        {...register}
        ref={fileInputRef}
        onChange={handleFilesChange}
        disabled={disabled}
        className="px-3 py-2 rounded border text-sm bg-card-secondary-bg-l dark:bg-card-secondary-bg-d text-admin-title-l dark:text-admin-title-d border-admin-border-l dark:border-admin-border-d focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <div className="flex flex-wrap gap-2 mt-2">
        {previews.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`preview-${idx}`}
            className="w-20 h-20 object-cover rounded border border-admin-border-l dark:border-admin-border-d"
          />
        ))}
      </div>
      {error && <span className="text-error text-xs mt-1">{error}</span>}
    </div>
  );
};

export default InputImageGallery;
