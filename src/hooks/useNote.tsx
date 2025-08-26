"use client";

import { NoteProviderContextType } from "@/providers/NoteProvider";
import { use, useContext } from "react";

function useNote() {
    const context = useContext(NoteProviderContextType);

    if(!context) throw new Error("useNote must be used within a NoteProvider");

    return context;
}

export default useNote;