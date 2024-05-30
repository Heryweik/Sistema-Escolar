'use server'

import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export async function postDataHandler(data: z.infer<typeof FormSchema>) {
  // Esto es para que no se cachee la página
  noStore();

  const email = data.email
  const password = data.password

  //Ejemplo con axios
  /* try {
    const response = await axios.post('/api/login', { email, password }) // Aquí se haría la petición a la API
    
    const data = response.data
  } catch (error) {
    console.error(error)
  } */


  // Aquí se haría la petición a la API para crear la nota
  /* await prisma.note.create({
    data: {
      userId: user?.id,
      title,
      description,
      content,
    },
  }); */
  
  // Esto es para que se actualice la página
  revalidatePath('/dashboard')

  // Redirigimos a la página de administración
  return data;
}
