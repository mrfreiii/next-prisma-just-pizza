import { FC } from "react";
import { WhiteBlock } from "@/shared/components/shared/white-block";
import { FormInput } from "@/shared/components/shared/form/form-input";

type Props = {
    className?: string;
}

export const CheckoutPersonalInfo: FC<Props> = ({className}) => {
    return (
        <WhiteBlock title={"2. Персональные данные"} className={className}>
            <div className={"grid grid-cols-2 gap-5"}>
                <FormInput name={"firstName"} className={"text-base"} placeholder={"Имя"}/>
                <FormInput name={"lastName"} className={"text-base"} placeholder={"Фамилия"}/>
                <FormInput name={"email"} className={"text-base"} placeholder={"E-Mail"}/>
                <FormInput name={"phone"} className={"text-base"} placeholder={"Телефон"}/>
            </div>
        </WhiteBlock>
    )
}