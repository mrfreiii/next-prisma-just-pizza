import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
    formLoginSchema,
    TFormLoginValues
} from "@/shared/components/shared/modals/auth-modal/forms/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Title } from "@/shared/components/shared";
import { FormInput } from "@/shared/components/shared/form/form-input";
import { Button } from "@/shared/components/ui";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

type Props = {
    onClose: () => void;
}

export const LoginForm: FC<Props> = ({onClose}) => {
    const form = useForm<TFormLoginValues>({
        resolver: zodResolver(formLoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (data: TFormLoginValues)=>{
        try {
            const res = await signIn("credentials", {
                ...data,
                redirect: false,
            })

            if(!res?.ok){
                throw new Error();
            }

            toast.success("Вы успешно вошли в аккаунт", {
                icon: '✅',
            })
            onClose();
        } catch (e){
            console.error("[LOGIN], Error:", e);
            toast.error("Не удалось зайти в аккаунт", {
                icon: "❌",
            })
        }
    }

    return (
        <FormProvider {...form}>
            <form className={"flex flex-col gap-5"} onSubmit={form.handleSubmit(onSubmit)}>
                <div className={"flex justify-between items-center"} >
                    <div className={"mr-2"}>
                        <Title text={"Вход в аккаунт"} size={"md"} className={"font-bold"}/>
                        <p className={"text-gray-400"}>Введите свою почту, чтобы войти в аккаунт</p>
                    </div>

                    {/*<img src="" alt=""/>*/}
                </div>

                <FormInput name={"email"} label={"E-Mail"} required />
                <FormInput name={"password"} label={"Пароль"} type={"password"} required />

                <Button loading={form.formState.isSubmitting} className={"h-12 text-base"} type={"submit"}>
                    Войти
                </Button>
            </form>
        </FormProvider>
    )
}