import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import InputMask from "react-input-mask";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'


export default () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [nome, setNome] = useState("")
  const [cpf, setCPF] = useState("")
  const [email, setEmail] = useState("")
  const [telefone, setTelefone] = useState("")
  const [celular, setCelular] = useState("")
  const [nascimento, setNascimento] = useState("")
  const [pessoas, setPessoas] = useState(JSON.parse(localStorage.getItem("Pessoas")))

  const salvar = () => {
    let obj = {
      nome: nome,
      cpf: cpf,
      email: email,
      telefone: telefone,
      celular: celular,
      nascimento: nascimento
    }

    let arrayPessoas = JSON.parse(localStorage.getItem("Pessoas")) || [];

    let pessoa = arrayPessoas.find(pessoa => pessoa.cpf === obj.cpf)
    arrayPessoas.push(obj);

    let stringPessoas = JSON.stringify(arrayPessoas)
    localStorage.setItem("Pessoas", stringPessoas);
    window.location.reload();

  }

  const deletar = (posicao) => {
    let pessoa = pessoas[posicao]
    pessoas.splice(posicao, 1)
    let stringPessoas = JSON.stringify(pessoas)
    localStorage.setItem("Pessoas", stringPessoas);
    window.location.reload();
  }

  return (
    <>
      
      <h1> Cadastro de clientes</h1>
      <Button className="cadastro" variant="primary" onClick={handleShow}>
        Cadastrar cliente
      </Button>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>Celular</th>
            <th>Nascimento</th>
            <th className="acoes">Ações</th>
          </tr>
        </thead>
        <tbody>
          {pessoas?.map((e, i) => (
            <tr key={i}>
              <td>{e.nome}</td>
              <td>{e.cpf}</td>
              <td>{e.email}</td>
              <td>{e.telefone}</td>
              <td>{e.celular}</td>
              <td>{e.nascimento}</td>

              <Button variant="secondary" className="editar" onClick={handleShow}>
              <FontAwesomeIcon icon={faPen} />
              </Button>
              <Button variant="primary" className="deletar" onClick={() => deletar(i)}>
              <FontAwesomeIcon icon={faTrash} />
              </Button>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar novo cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="mb-3">
            <label className="form-label">Nome</label>
            <input type="text" className="form-control" id="nome" onChange={event => setNome(event.target.value)}></input>
          </div>

          <div class="mb-3">
            <label className="form-label">CPF</label>
            <InputMask mask="999.999.999-99" type="text" className="form-control" id="cpf" onChange={event => setCPF(event.target.value)} ></InputMask>
          </div>
          
          <div class="mb-3">
            <label className="form-label">E-mail</label>
            <input type="text" className="form-control" id="email" onChange={event => setEmail(event.target.value)}></input>
          </div>

          <div class="mb-3">
            <label className="form-label">Telefone</label>
            <InputMask mask="(99)9999-9999" type="text" className="form-control" id="telefone" onChange={event => setTelefone(event.target.value)}></InputMask>
          </div>

          <div class="mb-3">
            <label className="form-label">Celular</label>
            <InputMask mask="(99)99999-9999" type="text" className="form-control" id="celular" onChange={event => setCelular(event.target.value)}></InputMask>
          </div>

          <div class="mb-3">
            <label className="form-label">Nascimento</label>
            <input type="date" className="form-control" id="nascimento" onChange={event => setNascimento(event.target.value)}></input>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Voltar
          </Button>
          <Button variant="primary" onClick={salvar}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
