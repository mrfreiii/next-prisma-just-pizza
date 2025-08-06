"use client"

import { FC } from "react";
import { User } from "@prisma/client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    formRegisterSchema, TFormRegisterValues
} from "@/shared/components/shared/modals/auth-modal/forms/schemas";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { Container } from "@/shared/components/shared/container";
import { Title } from "@/shared/components/shared/title";
import { FormInput } from "@/shared/components/shared/form/form-input";
import { Button } from "@/shared/components/ui";
import { updateUserInfo } from "@/app/actions";

type Props = {
    user: User;
    className?: string;
}

export const ProfileForm: FC<Props> = ({user, className}) => {
    const form = useForm({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            fullName: user.fullName,
            email: user.email,
            password: "",
            confirmPassword: ""
        }
    })

    const onSubmit = async (data: TFormRegisterValues) => {
        try {
            await updateUserInfo({
                email: data.email,
                fullName: data.fullName,
                password: data.password,
            })

            toast.success("Данные обновлены 📝", {
                icon: '✅',
            })
        } catch (e) {
            console.error(e);
            toast.error("Ошибка при обновлении данных", {
                icon: "❌",
            });
        }
    }

    const onClickSignOut = () => {
        signOut({
            callbackUrl: "/"
        })
    }

    return (
        <Container className={"my-10"}>
            <Title text={"Личные данные"} size={"md"} className={"font-bold"}/>

            <FormProvider {...form}>
                <form className={"flex flex-col gap-5 w-96 mt-10"} onSubmit={form.handleSubmit(onSubmit)}>
                    <FormInput name={"email"} label={"E-Mail"} required />
                    <FormInput name={"fullName"} label={"Полное имя"} required />

                    <FormInput type={"password"} name={"password"} label={"Новый пароль"} required />
                    <FormInput type={"password"} name={"confirmPassword"} label={"Повторите пароль"} required />

                    <Button disabled={form.formState.isSubmitting} className={"text-base mt-10"} type={"submit"}>
                        Сохранить
                    </Button>

                    <Button
                        onClick={onClickSignOut}
                        variant={"secondary"}
                        disabled={form.formState.isSubmitting}
                        className={"text-base"}
                        type={"button"}
                    >
                        Выйти
                    </Button>
                </form>
            </FormProvider>
        </Container>
    )
}