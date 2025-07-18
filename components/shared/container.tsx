import { cn } from '@/lib/utils';
import { FC, ReactNode } from "react";

interface Props {
    className?: string;
    children?: ReactNode;
}

export const Container: FC<Props> = ({ className, children }) => {
    return (
        <div className={cn('mx-auto max-w-[1280px]', className)}>
            {children}
        </div>
    )
};
