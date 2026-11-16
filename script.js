let alunos = [];

let indiceEdicao = -1;

function salvarAluno() {
  const nome = document.getElementById("nome").value.trim();
  const idade = document.getElementById("idade").value;
  const curso = document.getElementById("curso").value;
  const notaFinal = document.getElementById("notaFinal").value;

  if (nome === "" || idade === "" || notaFinal === "") {
    alert("Preencha todos os campos!");
    return;
  }

  const aluno = {
    nome: nome,
    idade: Number(idade),
    curso: curso,
    notaFinal: Number(notaFinal)
  };

  if (indiceEdicao === -1) {
    alunos.push(aluno);
  } else {
    alunos[indiceEdicao] = aluno;
    indiceEdicao = -1;
    document.getElementById("btn-cadastrar").textContent = "Cadastrar";
  }

  limparFormulario();
  renderizarTabela();
}

function limparFormulario() {
  document.getElementById("form-aluno").reset();
}

function renderizarTabela() {
  const corpo = document.getElementById("corpo-tabela");
  corpo.innerHTML = "";

  for (let i = 0; i < alunos.length; i++) {
    const a = alunos[i];
    corpo.innerHTML += `
      <tr>
        <td>${a.nome}</td>
        <td>${a.idade}</td>
        <td>${a.curso}</td>
        <td>${a.notaFinal}</td>
        <td>
          <button class="btn btn-warning btn-sm me-1" onclick="editarAluno(${i})">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="excluirAluno(${i})">Excluir</button>
        </td>
      </tr>`;
  }
}

function editarAluno(indice) {
  const a = alunos[indice];
  document.getElementById("nome").value = a.nome;
  document.getElementById("idade").value = a.idade;
  document.getElementById("curso").value = a.curso;
  document.getElementById("notaFinal").value = a.notaFinal;

  indiceEdicao = indice;
  document.getElementById("btn-cadastrar").textContent = "Salvar alterações";
}

function excluirAluno(indice) {
  alunos.splice(indice, 1);

  if (indiceEdicao !== -1) {
    cancelarEdicao();
  }
  renderizarTabela();
}

function cancelarEdicao() {
  indiceEdicao = -1;
  limparFormulario();
  document.getElementById("btn-cadastrar").textContent = "Cadastrar";
}