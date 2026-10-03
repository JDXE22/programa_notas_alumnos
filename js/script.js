const nombres = [];
const notas = [];
const limiteNotas = 3;
const limiteAlumnos = 10;

const formulario = document.getElementById('formulario');
const nombre = document.getElementById('nombre');
const nota1 = document.getElementById('nota1');
const nota2 = document.getElementById('nota2');
const nota3 = document.getElementById('nota3');

const validarNotas = (arregloNotas) => {
  return arregloNotas.every((nota) => !isNaN(nota) && nota >= 0 && nota <= 100);
};

const calcularPromedioAlumno = (notas) => {
  let suma = 0;
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
    (promedio) => promedio < 55,
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

  const nombreAlumno = nombre.value.trim();
  const notasAlumno = [
    parseFloat(nota1.value),
    parseFloat(nota2.value),
    parseFloat(nota3.value),
  ];

  if (!nombreAlumno) {
    alert('Por favor, ingrese el nombre del alumno.');
    return;
  }

  if (!validarNotas(notasAlumno)) {
    alert('Las notas deben ser números entre 0 y 100.');
    return;
  }

  nombres.push(nombreAlumno);
  notas.push(notasAlumno);

  formulario.reset();
  alert(`Alumno ${nombreAlumno} agregado correctamente.`);

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

  const resultadosDiv = document.getElementById('resultado');
  resultadosDiv.innerHTML = `<h2>Resultados del Curso</h2>
        
        <h3>Notas de los Alumnos</h3>
        <table>
          <thead>
            <tr><th>Alumno</th><th>Certamen 1</th><th>Certamen 2</th><th>Certamen 3</th><th>Promedio</th></tr>
          </thead>
          <tbody>
            ${nombres.map((nombreAlumno, index) => `<tr><td>${nombreAlumno}</td><td>${notas[index][0]}</td><td>${notas[index][1]}</td><td>${notas[index][2]}</td><td>${promediosAlumnos[index].toFixed(2)}</td></tr>`).join('')}
          </tbody>
        </table>

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
            ${ranking.map((alumno) => `<li>${alumno.nombre}: ${alumno.promedio.toFixed(2)}</li>`).join('')}
        </ol>
    `;
};
