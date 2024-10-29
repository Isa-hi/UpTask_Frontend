import { Note } from "@/types/index";
import AddNoteForm from "./AddNoteForm";
import NoteDetail from "./NoteDetail";

type NotePanelProps = {
  notes: Note[];
};

export default function NotesPanel({ notes }: NotePanelProps) {
  return (
    <>
      <AddNoteForm />

      <div className="divide-y divide-gray-300 mt-10">
        {notes.length ? (
          <>
            <p className="text-2xl font-bold text-slate-600">Notas: </p>
            {notes.map(note => <NoteDetail key={note._id} note={note} />)}
          </>
        ) : 
          <p className="text-center ">No hay notas aún</p>
        }
      </div>
    </>
  );
}
