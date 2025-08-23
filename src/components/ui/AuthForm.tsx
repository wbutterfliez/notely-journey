'use client;'

import router, { useRouter } from "next/navigation";
import {toast} from "sonner";
import { CardContent, CardFooter } from "./card";
import { Label } from "./label";
import { Input } from "./input";
import { useTransition } from "react";
import { Button } from "./button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { loginAction, signupAction } from "@/actions/users";

type Props = {
    type: 'login' | 'signup';
}

function AuthForm({type}: Props) {
    const isLoginForm = type === 'login';

    const router = useRouter();

    const [isPending, startTransition] = useTransition();

    const handleSubmit = (formData: FormData) => {
        console.log("form submitted");
        startTransition(async () => {
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;

            let errorMsg;
            let title;
            let description;
            if(isLoginForm){
                errorMsg = (await loginAction(email, password)).errorMsg;
                title = 'Logged in'
                description = 'You have been logged in successfully.'
            } else {
                errorMsg = (await signupAction(email, password)).errorMsg;
                title = 'Signed up'
                description = 'Check your email for the confirmation link.'
            }

            if(!errorMsg) {
                toast.success(title!, {description});
                router.replace("/");
            } else {
                toast.error(errorMsg);
            }
        })
    };

    return (
        <form action={handleSubmit}>
            <CardContent className="grid w-full items-center password">
                <div className="flex flex-col space-y-1.5 mb-3">
                    <Label htmlFor="email">Email</Label>
                    <Input placeholder="Enter your email" id="email" name="email" type="email" required disabled={isPending}/>
                </div>
                <div className="flex flex-col space-y-1.5 mt-3">
                    <Label htmlFor="password">Password</Label>
                    <Input placeholder="Enter your password" id="password" name="password" type="password" required disabled={isPending}/>
                </div>
            </CardContent>
            <CardFooter className="mt-7 flex flex-col gap-6">
                <Button className="w-full">
                    {isPending ? (
                        <Loader2 className="animate-spin"/> 
                    ) : isLoginForm ? (
                        "Login"
                    ) : (
                        "Sign Up"
                    )}
                </Button>
                <p className="text-xs">
                    {isLoginForm ? "Don't have an account? " : "Already have an account? "}{" "}
                    <Link 
                    href={isLoginForm ? "/signup" : "/login"} 
                    className={`text-blue-500 underline ${isPending ? "pointer-events-none opacity-50" : ""}`}>
                        {isLoginForm ? "Sign Up" : "Login"}
                    </Link>
                </p>
            </CardFooter>
        </form>
    )
}

export default AuthForm