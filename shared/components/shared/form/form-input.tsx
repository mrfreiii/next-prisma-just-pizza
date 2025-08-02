import { FC, InputHTMLAttributes } from "react";
import { RequiredSymbol } from "@/shared/components/shared/required-symbol";
import { Input } from "@/shared/components/ui";
import { ErrorText } from "@/shared/components/shared/error-text";
import { ClearButton } from "@/shared/components/shared/clear-button";
import { useFormContext } from "react-hook-form";

type Props = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
}

export const FormInput: FC<Props> = ({name, label, required, className,...props}) => {
    const {
        register,
        formState: {errors},
        watch,
        setValue
    } =useFormContext();

    const value = watch(name);
    const errorText = errors[name]?.message as string;

    const onClickClear = () => {
        setValue(name, "", { shouldValidate: true })
    }

    return (
        <div className={className}>
            {label && (
                <p className={"font-medium mb-2"}>
                    {label} {required && <RequiredSymbol />}
                </p>
            )}

            <div className={"relative"}>
                <Input className={"h-12 text-md"} {...register(name)} {...props} />

                {value && <ClearButton onClick={onClickClear}/>}
            </div>

            {errorText && <ErrorText text={errorText} className={"mt-2"}/>}
        </div>
    )
}