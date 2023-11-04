"use client";
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: ReactNode;
}

export function SessProvider(props: Props) {
  return <SessionProvider>{props.children}</SessionProvider>;
}
