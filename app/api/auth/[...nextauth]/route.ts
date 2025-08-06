import NextAuth, { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/prisma/prisma-client";
import { compare, hashSync } from "bcrypt";
import { UserRole } from "@prisma/client";

export const authOptions: AuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.NEXT_PUBLIC_GITHUB_ID || "",
            clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET || "",
            profile(profile) {
                return {
                    id: profile.id,
                    name: profile.name || profile.login,
                    email: profile.email,
                    image: profile.avatar_url,
                    role: "USER" as UserRole,
                }
            }
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findFirst({
                    where: {
                        email: credentials.email
                    }
                })

                if (!user || !user.verified) {
                    return null;
                }

                const isPasswordValid = await compare(credentials.password, user.password);

                if (!isPasswordValid) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.fullName,
                    role: user.role
                }
            }
        })
    ],
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async signIn({user, account}) {
            try {
                if (account?.provider === "credentials") {
                    return true;
                }

                if (!user.email) {
                    return false;
                }

                const foundUser = await prisma.user.findFirst({
                    where: {
                        OR: [
                            {
                                provider: account?.provider,
                                providerId: account?.providerAccountId
                            },
                            {email: user.email},
                        ]
                    }
                })

                if (foundUser) {
                    await prisma.user.update({
                        where: {
                            id: foundUser.id,
                        },
                        data: {
                            provider: account?.provider,
                            providerId: account?.providerAccountId,
                        }
                    })

                    return true;
                }

                await prisma.user.create({
                    data: {
                        email: user.email,
                        fullName: user.name || `User #${user.id}`,
                        password: hashSync(user.id.toString(), 10),
                        verified: new Date(),
                        provider: account?.provider,
                        providerId: account?.providerAccountId,
                    }
                })

                return true;
            } catch (e) {
                console.error("[SIGNIN, Error:]", e);
                return false;
            }
        },
        async jwt({token}) {
            if(!token.email){
                return token;
            }

            const user = await prisma.user.findFirst({
                where: {
                    email: token.email,
                }
            })

            if (user) {
                token.id = String(user.id);
                token.email = user.email;
                token.fullName = user.fullName;
                token.role = user.role;
            }

            return token;
        },
        session({session, token}) {
            if (session?.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }

            return session;
        }
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
