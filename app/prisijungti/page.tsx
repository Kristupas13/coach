"use client";

import { AuthDialog } from "@/components/auth-dialog";
import { redirect } from "next/navigation";

export default function LoginPage() {
    return (
        <AuthDialog open={true} onOpenChange={() => redirect('/')} redirectTo="/pratimai" />
    )
}