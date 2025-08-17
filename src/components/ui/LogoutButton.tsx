"use client";
import React, { use, useState } from 'react'
import { Button } from './button'
import { Loader, Loader2 } from 'lucide-react'
import { toast } from "sonner"

function LogoutButton() {
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true)

        await new Promise((resolve) => setTimeout(resolve, 2000));

        const errorMsg = null;

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

export default LogoutButton

function useToast(): { toast: any; } {
    throw new Error('Function not implemented.');
}
