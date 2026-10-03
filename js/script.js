const nombres = [];
const notas = [];
const limiteNotas = 3;
const limiteAlumnos = 10;

const formulario = document.getElementsByClassName('formulario');
const nombre = document.getElementById('nombre');
const nota1 = parseFloat(document.getElementById('nota1'));
const nota2 = parseFloat(document.getElementById('nota2'));
const nota3 = parseFloat(document.getElementById('nota3'));

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

formulario.addEventListener('submit', (event) => {
  event.preventDefault();
  if (nombres.length >= limiteAlumnos) {
    alert('Se ha alcanzado el límite de alumnos permitidos.');
    return;
  }

  if (!nombre || isNaN(nota1) || isNaN(nota2) || isNaN(nota3)) {
    alert('Por favor, complete todos los campos correctamente.');
    return;
  }

  nombres.push(nombre.value);
  notas.push([nota1, nota2, nota3]);

  formulario.reset();
  alert(`Alumno ${nombre.value} agregado correctamente.`);

  if (nombres.length === limiteAlumnos) {
    procesarYMostrarResultados();
  }
});

const procesarYMostrarResultados = () => {
  const promediosAlumnos = notas.map((notasAlumno) =>
    calcularPromedioAlumno(notasAlumno),
  );

  const promediosPorCertamen = calcularPromedioCertanemes(notas);
  const promedioGeneral = calcularPromedioGeneral(promediosAlumnos);
  const rendimiento = evaluarRendimiento(promediosAlumnos);
  const ranking = ordernarRankings(nombres, promediosAlumnos);

  const resultadosDiv = document.getElementById('resultados');
  resultadosDiv.innerHTML = `<h2>Resultados del Curso</h2>
        
        <h3>Promedios por Certamen</h3>
        <p>Certamen 1: ${promediosPorCertamen[0].toFixed(2)}</p>
        <p>Certamen 2: ${promediosPorCertamen[1].toFixed(2)}</p>
        <p>Certamen 3: ${promediosPorCertamen[2].toFixed(2)}</p>
        
        <h3>Rendimiento General</h3>
        <p>Promedio General del Curso: ${promedioGeneral.toFixed(2)}</p>
        <p>Alumnos Aprobados (>= 55): ${rendimiento.aprobados}</p>
        <p>Alumnos Reprobados (< 55): ${rendimiento.desaprobados}</p>

        <h3>Ranking de Alumnos (Ordenados por Promedio)</h3>
        <ol>
            ${ranking.map((alumno) => `<li>${alumno.nombre}:${alumno.promedio.toFixed(2)}</li>`).join('')}
        </ol>
    `;
};
