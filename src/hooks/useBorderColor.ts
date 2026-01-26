import { useUIStore, getOperationTypeColor } from '@/store/ui/ui-store';
import { useTheme } from '@/context/ThemeContext';

const PRIMARY_COLOR_LIGHT = 'var(--color-primary)';
const PRIMARY_COLOR_DARK = 'var(--color-primary-dark)';

export function useBorderColor() {
  const { operationType } = useUIStore();
  const { theme } = useTheme();
  const opColor = getOperationTypeColor(operationType);
  if (opColor) return opColor;
  return theme === 'dark' ? PRIMARY_COLOR_DARK : PRIMARY_COLOR_LIGHT;
}
