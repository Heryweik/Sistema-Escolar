

// Informacion inventada de los estudiantes
export const infoStudents = [
    {
      id: 1,
      name: "Maryori",
      course: "II BTP",
      classes: [
        {
          id: 1,
          name: "Matemáticas",
          teacher: "Luis",
          students: 30,
        },
        {
          id: 2,
          name: "Física",
          teacher: "Luis",
          students: 30,
        },
      ],
      assignments: [],
      atention: [
        {
          id: 1,
          name: "mala actitud",
          course: "II BTP",
          class: "Matemáticas",
        },
      ],
      route: {
        id: 1,
        name: "Instituto central - UNAH",
      },
      parent: {
        id: 1,
        name: "Juan alberto rosales valladares",
        phone: "1234567890",
        email: "example@gmail.com",
      },
    },
    {
      id: 2,
      name: "Brayan",
      course: "III BTP",
      classes: [
        {
          id: 1,
          name: "Matemáticas",
          teacher: "Frankil",
          students: 30,
        },
        {
          id: 2,
          name: "Física",
          teacher: "Frankil",
          students: 30,
        },
      ],
      assignments: [
        {
          id: 1,
          name: "Tarea 1",
          class: "Física",
          description: "Descripcion de la asignacion",
          allDay: true,
          dateStart: "2024-05-25",
          dateFinish: "2024-05-30",
        },
        {
          id: 2,
          name: "Tarea 2",
          class: "Física",
          description: "Descripcion de la asignacion",
          allDay: false,
          dateStart: "2024-05-30T12:00:00",
          dateFinish: "2024-05-30T16:00:00",
        },
      ],
      atention: [],
    route: {
      id: 1,
      name: "Ruta 24",
    },
    parent: {
      id: 1,
      name: "Juan",
      phone: "1234567890",
      email: "example@gmail.com",
    },
    },
    {
      id: 3,
      name: "Katia",
      course: "I BTP",
      classes: [
        {
          id: 1,
          name: "Matemáticas",
          teacher: "Carlos",
          students: 30,
        },
        {
          id: 2,
          name: "Física",
          teacher: "Carlos",
          students: 30,
        },
      ],
      assignments: [
        {
          id: 1,
          name: "Tarea 1",
          class: "Matemáticas",
          description: "Descripcion de la asignacion",
          allDay: false,
          dateStart: "2024-05-30T12:00:00",
          dateFinish: "2024-05-30T18:00:00",
        },
        {
          id: 2,
          name: "Tarea 2",
          class: "Matemáticas",
          description: "Descripcion de la asignacion",
          allDay: true,
          dateStart: "2024-05-28",
          dateFinish: "2024-05-30",
        },
      ],atention: [
        {
          id: 1,
          name: "mala actitud",
          course: "II BTP",
          class: "Matemáticas",
        },
        {
          id: 2,
          name: "Falta de respeto",
          course: "II BTP",
          class: "Matemáticas",
        },
      ],
      route: {
        id: 1,
        name: "Ruta 24",
      },
      parent: {
        id: 1,
        name: "Juan",
        phone: "1234567890",
        email: "example@gmail.com",
      },
    },
  ];