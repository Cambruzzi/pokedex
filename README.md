# 📕 Pokedex com Django e JavaScript

Projeto desenvolvido como parte de um desafio técnico, focado na criação de uma interface interativa para consumo da [PokeAPI](https://pokeapi.co/). 

## 🚀 Funcionalidades Atuais (Nível 2 - Listagem)

- **Busca Individual:** Pesquisa de Pokémon por nome ou número (ID).
- **Listagem Paginada:** Exibição de 20 Pokémons por página com navegação (Anterior/Próximo).
- **Detalhes Expansíveis:** Visualização interativa de tipos, peso e altura ao clicar no card.
- **Tratamento de Erros:** Feedback visual quando um Pokémon não é encontrado.
- **Responsividade:** Layout adaptável para desktop e mobile.

## 💡 Desafios e Aprendizados

Durante o desenvolvimento, enfrentei alguns obstáculos que serviram como ótimo aprendizado técnico:

* **Refatoração e Escalabilidade:** O projeto começou simples, buscando o nome do Pokémon diretamente na URL. Quando avancei para a etapa de listagem, percebi que a arquitetura inicial não suportaria o fluxo de dados (que agora retornava links de detalhes ao invés de dados diretos). Isso exigiu uma refatoração significativa das funções de API para torná-las mais genéricas e reutilizáveis.
* **Arquitetura (Client-side vs Server-side):** Por ser um projeto Django, houve a dúvida entre usar o sistema de Templates do Django (SSR) ou fazer tudo via JavaScript (CSR). Pela praticidade e para garantir uma experiência de usuário mais fluida e dinâmica (sem recarregamentos constantes), decidi manter a lógica de renderização no **Client-side**.
* **Layout e CSS:** Retomar o desenvolvimento Frontend exigiu um aprofundamento em CSS Moderno. O maior desafio foi alinhar os componentes visualmente usando **CSS Grid** e **Flexbox** para garantir que os cards de busca individual tivessem a mesma consistência visual da grade de listagem.

## 📸 Screenshots

<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
  <img src="https://github.com/user-attachments/assets/bbcbb30a-8d2d-4250-a0df-0e136c7c8ba1" alt="Tela de Busca Vazia" width="45%">
  <img src="https://github.com/user-attachments/assets/b1aa612c-5ccf-49ff-a852-e895b44245b9" alt="Busca com Detalhes" width="45%">
</div>
<br>
<div style="display: flex; justify-content: center;">
  <img width="1548" height="861" alt="image" src="https://github.com/user-attachments/assets/8f1b3c30-5478-4eff-bf84-0c86ba6f0335" />
</div>

---

## 📦 Como rodar o projeto

Siga os passos abaixo para executar o projeto localmente:

### 1. Clonar e Configurar
Clone o repositório e entre na pasta:
```bash
git clone [https://github.com/Cambruzzi/pokedex.git](https://github.com/Cambruzzi/pokedex.git)
cd pokedex
```
2. Criar e Ativar o Ambiente Virtual
O ambiente virtual serve para isolar as bibliotecas deste projeto, evitando conflitos com outros projetos no seu computador.

No Windows:

```bash

python -m venv venv
.\venv\Scripts\activate
```
No Linux ou Mac:

```bash
python3 -m venv venv
source venv/bin/activate

```
(Você saberá que funcionou quando aparecer um (venv) no início da linha do terminal)

3. Instalar as Dependências
O arquivo requirements.txt funciona como uma "lista de compras". Ele diz ao Python exatamente quais bibliotecas (Django, etc.) o projeto precisa para funcionar.

Com o ambiente virtual ativado, rode:

```bash

pip install -r requirements.txt

```

5. Iniciar o Projeto
Agora está tudo pronto! Rode o comando abaixo para ligar o servidor:

```bash

python manage.py runserver

```
Acesse o projeto no seu navegador clicando no link que aparecerá no terminal (geralmente é este): 👉 http://127.0.0.1:8000/
