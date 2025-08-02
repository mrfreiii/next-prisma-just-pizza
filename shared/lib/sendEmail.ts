import { Resend } from "resend";
import { ReactNode } from "react";

export const sendEmail = async ({to, subject, template}: {
    to: string;
    subject: string;
    template: ReactNode;
}) => {
    const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY)

    const { data, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to,
        subject,
        text: "",
        react: template
    })

    if (error) {
        throw error;
    }

    return data;
}