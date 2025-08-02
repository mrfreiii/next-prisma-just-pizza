import { FC } from "react";
import { WhiteBlock } from "@/shared/components/shared/white-block";
import { FormTextarea } from "@/shared/components/shared/form/form-textarea";
import { AddressInput } from "@/shared/components/shared/address-input";
import { Controller, useFormContext } from "react-hook-form";
import { ErrorText } from "@/shared/components/shared/error-text";

type Props = {
    className?: string;
}

export const CheckoutAddress: FC<Props> = ({className}) => {
    const {control} = useFormContext();

    return (
        <WhiteBlock title={"3. Адрес доставки"} className={className}>
            <div className={"flex flex-col gap-5"}>
                <Controller
                    control={control}
                    name={"address"}
                    render={({field, fieldState}) =>
                        <>
                            <AddressInput onChange={field.onChange}/>
                            {fieldState.error?.message && <ErrorText text={fieldState.error.message}/>}
                        </>

                    }
                />


                <FormTextarea
                    name={"comment"}
                    rows={5}
                    placeholder={"Комментарий к заказу"}
                    className={"text-base"}
                />
            </div>
        </WhiteBlock>
    )
}