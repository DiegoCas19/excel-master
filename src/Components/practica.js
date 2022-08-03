const data = [
    {
        nombre: 'Daniel',
        edad: 38,
        equipo: 'Boca',
        estadoCivil: 'Casado',
        nivleEstudios: 'Terciario',
    },
    {
        nombre: 'Martín',
        edad: 46,
        equipo: 'River',
        estadoCivil: 'Casado',
        nivleEstudios: 'Terciario',
    },
    {
        nombre: 'Daniel',
        edad: 31,
        equipo: 'Boca',
        estadoCivil: 'Soltero',
        nivleEstudios: 'Universitario',
    },
    {
        nombre: 'Matías',
        edad: 38,
        equipo: 'Huracán',
        estadoCivil: 'Soltero',
        nivleEstudios: 'Universitario',
    },
    {
        nombre: 'Martín',
        edad: 37,
        equipo: 'Velez',
        estadoCivil: 'Casado',
        nivleEstudios: 'Terciario',
    },
    {
        nombre: 'Daniel',
        edad: 56,
        equipo: 'Boca',
        estadoCivil: 'Casado',
        nivleEstudios: 'Secundario',
    },
    {
        nombre: 'Juan',
        edad: 50,
        equipo: 'Gimnasia LP',
        estadoCivil: 'Casado',
        nivleEstudios: 'Terciario',
    },
    {
        nombre: 'Alejo',
        edad: 67,
        equipo: 'Boca',
        estadoCivil: 'Soltero',
        nivleEstudios: 'Secundario',
    },
    {
        nombre: 'Federico',
        edad: 31,
        equipo: 'Estudiantes',
        estadoCivil: 'Casado',
        nivleEstudios: 'Universitario',
    },
    {
        nombre: 'Anibal',
        edad: 22,
        equipo: 'Boca',
        estadoCivil: 'Casado',
        nivleEstudios: 'Universitario',
    },
    {
        nombre: 'Alejo',
        edad: 37,
        equipo: 'Boca',
        estadoCivil: 'Soltero',
        nivleEstudios: 'Terciario',
    },
];

console.log(' 1. Cantidad total personas registradas', data.length);

console.log(
    '\n 2. Promedio edad socios Racing',
    (() => {
        // obtengo suma edades
        const edades = data.reduce(
            (prev, current) =>
                current.equipo === 'Racing' ? current.edad + prev : prev,
            0
        );
        // obtengo cantidad
        const cant = data.reduce(
            (prev, current) => (current.equipo === 'Racing' ? prev + 1 : prev),
            0
        );
        // retorno promedio
        return edades / cant;
    })()
);

console.log(
    '\n 3. Listado 3 primeras personas: casado, univ, sort by edad',
    (() => {
        // obtengo las personas según la condición
        const personas = data.filter((d) => {
            if (
                d.estadoCivil === 'Casado' &&
                d.nivleEstudios === 'Universitario'
            ) {
                return d;
            }
        });

        // con esto no muto la data
        const newPersonas = personas.map((p) => {
            return {
                nombre: p.nombre,
                edad: p.edad,
                equipo: p.equipo,
            };
        });

        // ordeno
        newPersonas.sort((a, b) => {
            return a.edad - b.edad;
        });

        return newPersonas;
    })()
);

console.log(
    '\n 4. 2 Nombre más comunes con los hinchas de River',
    // 3 daniel
    //  1 alejo
    //  1 anibal
    (() => {
        // obtengo el equipo
        const delEquipo = data.filter((d) => {
            if (d.equipo === 'River') {
                return d;
            }
        });

        // obtengo arr de nombres
        const nombres = delEquipo.map((data) => {
            return data.nombre;
        });

        // console.log({ nombres });
        const arr = [];
        for (const value of nombres) {
            if (!arr.includes(value)) {
                arr.push();
            }
        }

        // acumulo nombres iguales y corto el array a 2 (en el ejercicio es 5)
        const arrNombresUnicos = [...new Set(nombres)];
        return arrNombresUnicos;
    })()
);

console.log(
    '\n 5. Listado',
    (() => {
        // lista = {
        //     boca: {
        //         socios: 3,
        //         edadPromedio: 48.333,
        //         mayorEdad: 67,
        //         menorEdad: 22
        //     },
        //     river: {
        //         socios: 2,
        //         edadPromedio: 48.333,
        //         mayorEdad: 67,
        //         menorEdad: 22
        //     }
        // }

        const listadoEquipos = data.map((d) => {
            return d.equipo;
        });
        const arrNombresUnicos = [...new Set(listadoEquipos)];

        let = objEquipos = [];
        arrNombresUnicos.forEach((item) => {
            data.forEach((d) => {
                if (d.equipo === item) {
                    objEquipos.push({
                        [item]: {
                            socios: data.reduce(
                                (prev, current) =>
                                    current.equipo === item ? prev + 1 : prev,
                                0
                            ),
                            edadPromedio:
                                data.reduce(
                                    (prev, current) =>
                                        current.equipo === item
                                            ? current.edad + prev
                                            : prev,
                                    0
                                ) /
                                data.reduce(
                                    (prev, current) =>
                                        current.equipo === item
                                            ? prev + 1
                                            : prev,
                                    0
                                ),
                            mayorEdad: '0',
                            menorEdad: '0',
                        },
                    });
                }
            });
        });
        return objEquipos;
    })()
);
