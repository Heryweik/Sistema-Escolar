"use server";

import { revalidatePath, unstable_noStore as noStore } from "next/cache";

export async function getDataHandler({ noteId }: { noteId: string }) {
  noStore();

  //Ejemplo con axios
  /* try {
    const response = await axios.post('/api/login', { email, password }) // Aquí se haría la petición a la API
    console.log(response.data)
    const data = response.data
  } catch (error) {
    console.error(error)
  } */

  // Aquí se haría la petición a la API para obtener la nota
  /* const data = await prisma.note.findUnique({
      where: {
        id: noteId,
        userId: user?.id as string,
      },
      select: {
          title: true,
          description: true,
          content: true,
          id: true,
      }
    }); */

  // Retornamos la data
  return /* data */;
}
