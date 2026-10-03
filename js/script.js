const nombres = [];
const notas = [];
const limiteNotas = 3;
const limiteAlumnos = 10;

const calcularPromedioAlumno = (notas) => {
  const suma = 0;
  for (let i = 0; i < notas.length; i++) {
    suma += notas[i];
  }
  return suma / notas.length;
};

const calcularPromedioGeneral = (promedioAlumnos) => {
  const promedios = promedioAlumnos.reduce((acc, prom) => acc + prom, 0);
  return promedios / limiteAlumnos;
};

const calcularPromedioCertanemes = (matrizNotas) => {
  const promedios = [];
  for (let i = 0; i < limiteNotas; i++) {
    const notasCertamen = matrizNotas.map((filas) => filas[i]);
    const suma = notasCertamen.reduce(
      (acumulador, nota) => acumulador + nota,
      0,
    );
    promedios.push(suma / notasCertamen.length);
  }
  return promedios;
};

const evaluarRendimiento = (promedioAlumnos) => {
  const aprobados = promedioAlumnos.filter((promedio) => promedio >= 55).length;
  const desaprobados = promedioAlumnos.filter(
    (promedio) => promedio <= 55,
  ).length;

  return { aprobados, desaprobados };
};

const ordernarRankings = (arreglosNombres, arregloPromedios) => {
  const dataUnificada = arreglosNombres.map((nombre, index) => {
    return { nombre: nombre, promedio: arregloPromedios[index] };
  });

  return dataUnificada.sort((a, b) => b.promedio - a.promedio);
};
