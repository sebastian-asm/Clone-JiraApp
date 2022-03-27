import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export const distanceToNow = (date: number) =>
  formatDistanceToNow(date, { locale: es });
