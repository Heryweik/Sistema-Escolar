'use server'

import { revalidatePath, unstable_noStore as noStore  } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteNoteHandler(noteId: string) {

    noStore();

    // Aquí se haría la petición a la API para borrar la nota
    /* await prisma.note.delete({
      where: {
        id: noteId,
        userId: user?.id,
      },
    }); */

    // Esto es porque al borrar la nota siempre queda en cache por lo que se sigue viendo en la UI, con esto se actualiza la página
    revalidatePath('/');
}