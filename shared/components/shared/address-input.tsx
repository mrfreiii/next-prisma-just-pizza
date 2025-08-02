"use client";

import { FC } from "react";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

type Props = {
    onChange?: (value?: string) => void;
}

export const AddressInput: FC<Props> = ({onChange}) => {
    return (
        <AddressSuggestions
            token={process.env.NEXT_PUBLIC_DADATA_API_KEY as string}
            onChange={(data) => onChange?.(data?.value)}
        />
    )
}
