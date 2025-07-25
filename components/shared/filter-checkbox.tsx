import { FC, ReactNode } from "react";
import { Checkbox } from '../ui/checkbox';

export interface FilterCheckboxProps {
    text: string;
    value: string;
    endAdornment?: ReactNode;
    onCheckedChange?: (checked: boolean) => void;
    checked?: boolean;
    name?: string;
}

export const FilterCheckbox: FC<FilterCheckboxProps> = ({
                                                                 text,
                                                                 value,
                                                                 endAdornment,
                                                                 onCheckedChange,
                                                                 checked,
                                                                 name,
                                                             }) => {
    return (
        <div className="flex items-center space-x-2">
            <Checkbox
                onCheckedChange={onCheckedChange}
                checked={checked}
                value={value}
                className="rounded-[8px] w-6 h-6"
                id={`checkbox-${String(name)}-${String(value)}`}
            />
            <label
                htmlFor={`checkbox-${String(name)}-${String(value)}`}
                className="leading-none cursor-pointer flex-1">
                {text}
            </label>
            {endAdornment}
        </div>
    );
};
