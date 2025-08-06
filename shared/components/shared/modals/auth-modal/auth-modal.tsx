import { FC, useState } from "react";
import { Button, Dialog } from "@/shared/components/ui";
import { DialogContent } from "@/shared/components/ui/dialog";
import { signIn } from "next-auth/react";
import { LoginForm } from "@/shared/components/shared/modals/auth-modal/forms/login-form";
import {
    RegisterForm
} from "@/shared/components/shared/modals/auth-modal/forms/register-form";

type Props = {
    open: boolean;
    onClose: () => void;
}

export const AuthModal: FC<Props> = ({open, onClose}) => {
    const [type, setType] = useState<"login" | "register">("login");

    const switchType = () => {
        setType((prev) => prev === "login" ? "register" : "login");
    }

    const handleClose = () => {
        onClose()
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className={"w-[450px] bg-white p-10"}>
                {type === "login" ? (
                    <LoginForm onClose={handleClose}/>
                ) : (
                    <RegisterForm onClose={handleClose}/>
                )}

                <hr/>
                <div className={"flex gap-2"}>
                    <Button
                        variant={"secondary"}
                        onClick={() =>
                            signIn("github", {
                                callbackUrl: "/",
                                redirect: true,
                            })}
                        type={"button"}
                        className={"gap-2 h-12 p-2 flex-1"}
                    >
                        <img className={"2-6 h-6"}
                             src="https://github.githubassets.com/favicons/favicon.svg"
                             alt="github"/>
                        GitHub
                    </Button>

                    <Button
                        variant={"secondary"}
                        onClick={() =>
                            signIn("google", {
                                callbackUrl: "/",
                                redirect: true,
                            })}
                        type={"button"}
                        className={"gap-2 h-12 p-2 flex-1"}
                    >
                        <img className={"2-6 h-6"}
                             src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
                             alt="google"/>
                        Google
                    </Button>
                </div>

                <Button variant={"outline"} onClick={switchType} type={"button"}
                        className={"h-12"}>
                    {type === "login" ? "Регистрация" : "Войти"}
                </Button>
            </DialogContent>
        </Dialog>
    )
}