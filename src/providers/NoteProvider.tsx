"use client";

import { createContext, useState } from "react";

type NoteProviderContextType = {
    noteText: string;
    setNoteText: (noteText: string) => void;
}

export const NoteProviderContextType = createContext<NoteProviderContextType>({
    noteText: "",
    setNoteText: () => {},
})

function NoteProvider({children}: {children: React.ReactNode}) {
    const [noteText, setNoteText] = useState("");

    return (
        <NoteProviderContextType.Provider value={{noteText, setNoteText}}>
            {children}
        </NoteProviderContextType.Provider>
    )
}

export default NoteProvider;