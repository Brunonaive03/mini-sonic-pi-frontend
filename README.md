# Mini Sonic Pi PT-BR (Frontend)

Este é o repositório do frontend para o projeto **Mini Sonic Pi PT-BR**. A aplicação é uma interface web moderna que permite aos usuários escrever e executar códigos de live coding musical utilizando comandos localizados para o português brasileiro.

A interface foi projetada para reduzir a barreira de entrada no aprendizado de programação musical, oferecendo um ambiente interativo e responsivo.

---

## 🚀 Funcionalidades Principais

* **Editor de Código Interativo:** Ambiente para escrita da DSL musical localizada.
* **Síntese de Áudio em Tempo Real:** Utilização da **Web Audio API** para gerar sons diretamente no navegador a partir das instruções recebidas.
* **Comunicação Assíncrona:** Integração com o backend Ruby para validação e interpretação do código.
* **Gestão de Runtimes:** Controle de execução (Play/Stop) com feedback visual de eventos musicais.

---

## 🛠️ Tecnologias Utilizadas

* **Framework:** [React](https://reactjs.org/) (com [Vite](https://vitejs.dev/) para um build rápido).
* **Áudio:** [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) para síntese e manipulação sonora.
* **Estilização:** CSS moderno (focado em uma interface limpa e de baixa carga cognitiva).

---

## 🏗️ Arquitetura de Integração

O frontend atua como o terminal de entrada e a unidade de saída de áudio. Ele se comunica com o backend dockerizado para processar a lógica da linguagem.

---
## 📜 Ética e Créditos

Este projeto é uma implementação independente desenvolvida para fins de pesquisa acadêmica.

* **Inspiração:** O design da linguagem e o comportamento dos comandos são inspirados no [Sonic Pi](https://sonic-pi.net/), criado pelo **Dr. Sam Aaron**.
* **Originalidade:** Não houve cópia ou redistribuição de código-fonte do projeto original. Trata-se de uma reconstrução focada no estudo de localização e **Teoria da Carga Cognitiva**.
* **Licença:** Este projeto está sob a licença MIT.

---

## 🎓 Contexto Acadêmico

* **Instituição:** Centro de Informática (CIn) - UFPE.
* **Autor:** Bruno Lima.
* **Tema:** Localização de DSLs musicais para o português brasileiro como forma de acessibilidade cognitiva.
* **Metodologia:** O desenvolvimento segue os princípios da *Design Science Research Methodology* (DSRM).

