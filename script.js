class Aluno {
  constructor(nome, idade, curso, notaFinal) {
    this.nome = nome;
    this.idade = idade;
    this.curso = curso;
    this.notaFinal = notaFinal;
  }

  isAprovado() {
    return this.notaFinal >= 7;
  }

  toString() {
    const situacao = this.isAprovado() ? "Aprovado" : "Reprovado";
    return `${this.nome} (${this.idade} anos) - ${this.curso} - Nota: ${this.notaFinal} - ${situacao}`;
  }
}

const alunos = [];
let indiceEdicao = -1;

const form = document.getElementById("form-aluno");
const btnCadastrar = document.getElementById("btn-cadastrar");
const btnCancelar = document.getElementById("btn-cancelar");
const corpoTabela = document.getElementById("corpo-tabela");

const adicionarAluno = (aluno) => alunos.push(aluno);
const atualizarAluno = (indice, aluno) => { alunos[indice] = aluno; };
const removerAluno = (indice) => alunos.splice(indice, 1);

const limparFormulario = () => {
  form.reset();
  indiceEdicao = -1;
  btnCadastrar.textContent = "Cadastrar";
};

const renderizarTabela = () => {
  corpoTabela.innerHTML = "";

  alunos.forEach((aluno, indice) => {
    const linha = corpoTabela.insertRow();
    linha.insertCell().textContent = aluno.nome;
    linha.insertCell().textContent = aluno.idade;
    linha.insertCell().textContent = aluno.curso;
    linha.insertCell().textContent = aluno.notaFinal;

    const celulaSituacao = linha.insertCell();
    const selo = document.createElement("span");
    selo.className = aluno.isAprovado() ? "badge bg-success" : "badge bg-danger";
    selo.textContent = aluno.isAprovado() ? "Aprovado" : "Reprovado";
    celulaSituacao.appendChild(selo);

    const celulaAcoes = linha.insertCell();

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.className = "btn btn-warning btn-sm me-1";
    btnEditar.addEventListener("click", () => editarAluno(indice));

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.className = "btn btn-danger btn-sm";
    btnExcluir.addEventListener("click", () => excluirAluno(indice));

    celulaAcoes.appendChild(btnEditar);
    celulaAcoes.appendChild(btnExcluir);
  });
};

const editarAluno = (indice) => {
  const aluno = alunos[indice];
  document.getElementById("nome").value = aluno.nome;
  document.getElementById("idade").value = aluno.idade;
  document.getElementById("curso").value = aluno.curso;
  document.getElementById("notaFinal").value = aluno.notaFinal;

  indiceEdicao = indice;
  btnCadastrar.textContent = "Salvar alterações";
  console.log(`Editando: ${aluno.toString()}`);
};

const excluirAluno = (indice) => {
  const [removido] = removerAluno(indice);
  limparFormulario();
  renderizarTabela();
  alert(`Aluno "${removido.nome}" excluído.`);
  console.log(`Excluído: ${removido.toString()}`);
};

btnCadastrar.addEventListener("click", function () {
  const nome = document.getElementById("nome").value.trim();
  const idade = document.getElementById("idade").value;
  const curso = document.getElementById("curso").value;
  const notaFinal = document.getElementById("notaFinal").value;

  if (nome === "" || idade === "" || notaFinal === "") {
    alert("Preencha todos os campos!");
    return;
  }

  const aluno = new Aluno(nome, Number(idade), curso, Number(notaFinal));

  if (indiceEdicao === -1) {
    adicionarAluno(aluno);
    alert(`Aluno "${aluno.nome}" cadastrado com sucesso!`);
    console.log(`Cadastrado: ${aluno.toString()}`);
  } else {
    atualizarAluno(indiceEdicao, aluno);
    alert(`Aluno "${aluno.nome}" atualizado com sucesso!`);
    console.log(`Atualizado: ${aluno.toString()}`);
  }

  limparFormulario();
  renderizarTabela();
});

btnCancelar.addEventListener("click", function () {
  limparFormulario();
  console.log("Edição cancelada.");
});