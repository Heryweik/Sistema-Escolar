'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateDatahandler(formData: FormData, noteId: string, content: string) {

    const title = formData.get('title') as string
    const description = formData.get('description') as string

    // Aquí se haría la petición a la API para actualizar la nota
    /* await prisma.note.update({
        where: {
            id: noteId,
            userId: user?.id,
        },
        data: {
            title,
            description,
            content,
        }
    }) */

    // Esto es para que se actualice la página
    revalidatePath('/dashboard')

    return redirect('/dashboard')
}