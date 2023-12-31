"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export function SignOutButton() {
  return (
    <Button size="sm" variant="outline" onClick={() => signOut()}>
      Sair
    </Button>
  );
}
