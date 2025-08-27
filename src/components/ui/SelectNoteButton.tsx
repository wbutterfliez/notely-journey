"use client";
import {Note} from "@prisma/client";
import { useSearchParams } from "next/navigation";
import useNote from "@/hooks/useNote";
import { useEffect, useState } from "react";
import { SidebarMenuButton } from "./sidebar";
import Link from "next/link";
import { format } from "date-fns";

type Props ={
    note: Note;
}

function SelectNoteButton({note}: Props) {
    const noteId = useSearchParams().get("noteId") || "";

    const {noteText: selectedNoteText} = useNote()
    const [shouldUseGlobalNoteText, setshouldUseGlobalNoteText] = useState(false)
    const [localNoteText, setlocalNoteText] = useState(note.text)

    useEffect(() => {

        if(note.id === noteId){
            setshouldUseGlobalNoteText(true)
        } else {
            setshouldUseGlobalNoteText(false)
            setlocalNoteText(note.text)
        }
    }, [noteId, note.id])

    useEffect(() => {
      
        if(shouldUseGlobalNoteText){
            setlocalNoteText(selectedNoteText)
        }
    }, [selectedNoteText, setshouldUseGlobalNoteText])
    

    const blankNoteText = "EMPTY NOTE"
    let noteText = localNoteText || blankNoteText;
    if (shouldUseGlobalNoteText) {
        noteText = selectedNoteText || blankNoteText;
    }

  return (
    <SidebarMenuButton 
     asChild 
     className={`items-start gap-0 pr-12 ${note.id === noteId ? "bg-sidebar-accent/50" : ""}`}
    >
        <Link href={`/?noteId=${note.id}`} className="flex h-fit flex-col">
            <p className="w-full overflow-hidden truncate text-ellipsis whitespace-nowrap">
                {noteText}
            </p>
            <p className="text-muted-foreground text-xs">
                {format(new Date(note.updatedAt), "dd/MM/yyyy")}
            </p>
        </Link>
            
    </SidebarMenuButton>
  )
}

export default SelectNoteButton