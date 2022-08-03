import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';


function App() {
   

    const [excelArchivo, setExcelArchivo] = useState(null);
    const [excelArchivoError, setExcelArchivoError] = useState(null);

    // 1.
    const [cant, setCant] = useState(0);

    // 2.
    const [edad, setEdad] = useState(0);
    const [cantEquipo, setCantEquipo] = useState(0);

    // 3.
    const [personas, setPersonas] = useState([]);

    // 4.
    const [nombres, setNombres] = useState([]);

    // 5.
    const [equipos, setEquipos] = useState([]);

    
  
    const [excelData, setExcelData] = useState(null);
    

   
    const tipoArchivo = ['application/vnd.ms-excel'];

    // 3.
    const puntoTres = () => {
        const personas = excelData.filter((item) => {
            if (item.Estado === 'Casado' && item.Estudios === 'Universitario') {
                const { Estado, Estudios, ...rest } = item;
                return rest;
            }
        });

        // ordeno
        personas.sort((a, b) => {
            return a.Edad - b.Edad;
        });

        return personas.slice(0, 100);
    };

    // 4.
    const puntoCuatro = () => {
        const delEquipo = excelData.filter((item) => item.Equipo === 'River');
        const nombres = delEquipo.map((item) => item.Nombre);
        nombres.sort();

        const resultado = nombres.reduce(
            (prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev),
            {}
        );

        const data = [Object.entries(resultado)];
        const arr = [];
        for (const value of data) {
            for (const data of value) {
                arr.push({
                    nombre: data[0],
                    cant: data[1],
                });
            }
        }

        arr.sort((a, b) => {
            return a.cant + b.cant;
        });

        return arr.slice(0, 5);
    };

    // 5.
    const puntoCinco = () => {
        const listadoEquipos = excelData.map((d) => {
            return d.Equipo;
        });
        listadoEquipos.sort();
        const arrEquiposUnicos = [...new Set(listadoEquipos)];

        const data = [Object.entries(arrEquiposUnicos)];
        const arr = [];
        for (const value of data) {
            for (const data of value) {
                arr.push({
                    equipo: data[1],
                    info: { socios: 0 },
                });
            }
        }

        const resultado = arr.map((item) => {
            let socios = 0;
            excelData.forEach((data) => {
                if (data.Equipo === item.equipo) {
                    socios = socios + 1;
                    return;
                }
            });

            const sumaEdades = excelData.reduce(
                (prev, current) =>
                    current.Equipo === item.equipo ? current.Edad + prev : prev,
                0
            );

            const cantPorEquipo = excelData.reduce(
                (prev, current) =>
                    current.Equipo === item.equipo ? prev + 1 : prev,
                0
            );

            const edadesPorEquipo = { [item.equipo]: [] };
            excelData.forEach((data) => {
                if (data.Equipo === item.equipo) {
                    edadesPorEquipo[item.equipo].push(data.Edad);
                }
            });

            edadesPorEquipo[item.equipo].sort();

            const maxEdad = (arr) => {
                return Math.max.apply(null, arr);
            };
            const minEdad = (arr) => {
                return Math.min.apply(null, arr);
            };

            return {
                ...item,
                info: {
                    ...item.info,
                    socios: socios,
                    promedioEdades: sumaEdades / cantPorEquipo,
                    mayorEdad: maxEdad(edadesPorEquipo[item.equipo]),
                    menorEdad: minEdad(edadesPorEquipo[item.equipo]),
                },
            };
        });

        return resultado;
    };

    // 1.
    useEffect(() => {
        if (excelData) {
            setCant(excelData.reduce((prev, current) => prev + 1, 0));
        }
    }, [excelData]);

    // 2.
    useEffect(() => {
        if (excelData) {
            setEdad(
                excelData.reduce(
                    (prev, current) =>
                        current.Equipo === 'Racing'
                            ? current.Edad + prev
                            : prev,
                    0
                )
            );
        }
    }, [excelData]);
    // 2.
    useEffect(() => {
        if (excelData) {
            setCantEquipo(
                excelData.reduce(
                    (prev, current) =>
                        current.Equipo === 'Racing' ? prev + 1 : prev,
                    0
                )
            );
        }
    }, [excelData]);

    // 3.
    useEffect(() => {
        if (excelData) {
            setPersonas(puntoTres());
        }
    }, [excelData]);

    // 4.
    useEffect(() => {
        if (excelData) {
            setNombres(puntoCuatro());
            console.log(nombres);
        }
    }, [excelData]);

    // 5.
    useEffect(() => {
        if (excelData) {
            setEquipos(puntoCinco());
        }
        console.log({ equipos });
    }, [excelData]);

    const handleFile = (e) => {
        let seleccionarArchivo = e.target.files[0];
        if (seleccionarArchivo) {
            

            if (
                seleccionarArchivo &&
                tipoArchivo.includes(seleccionarArchivo.type)
            ) {
                let leer = new FileReader();
                leer.readAsArrayBuffer(seleccionarArchivo);
                leer.onload = (e) => {
                    setExcelArchivoError(null);
                    setExcelArchivo(e.target.result);
                };
            } else {
                setExcelArchivoError('por favor seleccione un archivo xls');
                setExcelArchivo(null);
            }
        } else {
            console.log('por favor seleccione su archivo');
        }
    };

    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (excelArchivo !== null) {
            const workbook = XLSX.read(excelArchivo, { type: 'buffer' });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            setExcelData(data);
        } else {
            setExcelData(null);
        }
    };

    return (
        <div className='container'>
           
            <div className='form'>
                <form
                    className='form-group'
                    autoComplete='off'
                    onSubmit={handleSubmit}
                >
                    <label>
                        <h5>Subir Archivo Excel</h5>
                    </label>
                    <br></br>

                    <input
                        type='file'
                        className='form-control'
                        onChange={handleFile}
                        required
                    ></input>

                    {excelArchivoError && (
                        <div
                            className='text-danger'
                            style={{ marginTop: 5 + 'px' }}
                        >
                            {excelArchivoError}
                        </div>
                    )}

                    <button
                        type='submit'
                        className='btn btn-success'
                        style={{ marginTop: 5 + 'px' }}
                    >
                        Cargar
                    </button>
                </form>
            </div>

            <br></br>
            <hr></hr>

            
            <h5>Ver archivo de excel</h5>
            <div className='viewer'>
                {excelData === null && <>No selecciono ningun archivo</>}
                {excelData !== null && (
                    <div className='table-responsive'>
                        <p>1. Total de registros: ({cant})</p>
                        <p>
                            2. Promedio de edades de los hinchas de Racing: (
                            {(edad / cantEquipo).toFixed(2)})
                        </p>

                        <p>
                            3. Listado con las 100 primeras personas casadas,
                            con estudios Universitarios, ordenadas de menor a
                            mayor según su edad
                        </p>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th scope='col'>#</th>
                                    <th scope='col'>Nombre</th>
                                    <th scope='col'>Edad</th>
                                    <th scope='col'>Equipo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {personas.length > 0 &&
                                    personas.map((item, idx) => (
                                        <tr key={idx}>
                                            <td>{idx + 1}</td>
                                            <td>{item.Nombre}</td>
                                            <td>{item.Edad}</td>
                                            <td>{item.Equipo}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        <p>
                            4. Un listado con los 5 nombres más comunes entre
                            los hinchas de River
                        </p>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th scope='col'>#</th>
                                    <th scope='col'>Nombre</th>
                                    <th scope='col'>Cant. Repetida</th>
                                </tr>
                            </thead>
                            <tbody>
                                {nombres.length > 0 &&
                                    nombres.map((item, idx) => (
                                        <tr key={idx}>
                                            <td>{idx + 1}</td>
                                            <td>{item.nombre}</td>
                                            <td>{item.cant}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        <p>
                            5. Un listado, ordenado de mayor a menor según la
                            cantidad de socios, que enumere, junto con cada
                            equipo, el promedio de edad de sus socios, la menor
                            edad registrada y la mayor edad registrada.
                        </p>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th scope='col'>#</th>
                                    <th scope='col'>Equipo</th>
                                    <th scope='col'>Socios</th>
                                    <th scope='col'>Promedio Edades</th>
                                    <th scope='col'>Mayor Edad</th>
                                    <th scope='col'>Menor Edad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {equipos.length > 0 &&
                                    equipos.map((item, idx) => (
                                        <tr key={idx}>
                                            <td>{idx + 1}</td>
                                            <td>{item.equipo}</td>
                                            <td>{item.info.socios}</td>
                                            <td>{item.info.promedioEdades}</td>
                                            <td>{item.info.mayorEdad}</td>
                                            <td>{item.info.menorEdad}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
