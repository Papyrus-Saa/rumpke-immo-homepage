import React from 'react';
import { OperationType, OPERATION_TYPE_COLOR } from '@/store/ui/ui-store';

interface PropertyTypeCornerProps {
  type: OperationType;
  size?: number;
  style?: React.CSSProperties;
}


const PropertyTypeCorner: React.FC<PropertyTypeCornerProps> = ({ type, size = 7, style }) => {
  return (
    <span
      style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: size,
        height: size,
        borderTopLeftRadius: 2,
        background: OPERATION_TYPE_COLOR[type],
        display: 'inline-block',
        zIndex: 2,
        ...style,
      }}
      aria-label={type === OperationType.SELL ? 'Kauf' : 'Miete'}
      title={type === OperationType.SELL ? 'KAUF' : 'MIETE'}
    />
  );
};

export default PropertyTypeCorner;
