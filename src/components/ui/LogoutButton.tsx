"use client";
import React, { useState } from 'react'
import { Button } from './button'
import { Loader2 } from 'lucide-react'
import { toast } from "sonner"
import { useRouter } from 'next/navigation';
import { logOutAction } from '@/actions/users';

function LogOutButton() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true)

        const {errorMsg} = await logOutAction();

        if (!errorMsg) {
            toast.success("Logged Out", {
                description: "You have been logged out successfully.",
            })
        } else {
            toast.error("Error",{
                description: errorMsg,
            })
        }


        setLoading(false)


        console.log("Logging out...")
    }
  return (
    <Button className='w-24' variant={'outline'} 
      onClick={handleLogout} disabled={loading}>
        {loading ? <Loader2 className='animate-spin'/> : "Log Out"}
    </Button>
  )
}

export default LogOutButton