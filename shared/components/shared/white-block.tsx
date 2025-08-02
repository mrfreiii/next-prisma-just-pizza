import { Title } from './title';
import { FC, ReactNode } from "react";
import { cn } from '@/shared/lib/utils';

interface Props {
  title?: string;
  contentClassName?: string;
  endAdornment?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export const WhiteBlock: FC<Props> = ({
  title,
  endAdornment,
  className,
  contentClassName,
  children,
}) => {
  return (
    <div className={cn('bg-white rounded-3xl', className)}>
      {title && (
        <div className="flex items-center justify-between p-5 px-7 border-b border-gray-100">
          <Title text={title} size="sm" className="font-bold" />
          {endAdornment}
        </div>
      )}

      <div className={cn('px-5 py-4', contentClassName)}>{children}</div>
    </div>
  );
};
