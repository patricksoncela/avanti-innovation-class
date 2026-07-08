# Innovation Class

Repositório para os dois projetos desenvolvidos para o processo seletivo Innovation Class

## Projetos

### Projeto 1 - Desenvolvimento do Layout

Landing page desenvolvida com HTML, CSS e JavaScript a partir do layout do Figma.

Como executar:

1. Abra a pasta `Projeto 1`.
2. Abra o arquivo `index.html` no navegador.
3. Também é possível usar a extensão Live Server no VS Code.

### Projeto 2 - Busca de Perfil no GitHub

Aplicação React criada com Vite para buscar perfis do GitHub e exibir as informações do usuário conforme o layout proposto no Figma.

Principais pontos implementados:

- Campo de busca para pesquisar usuários do GitHub.
- Consumo da API pública do GitHub.
- Exibição de nome, foto de perfil e bio.
- Mensagem de erro para perfil não encontrado.
- Estado de carregamento durante a requisição.
- Alternância visual de tema com troca de background.

Como executar:

```bash
cd "Projeto 2"
npm install
npm run dev
```

Depois, acesse o endereço exibido no terminal, normalmente:

```txt
http://localhost:5173/
```

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- React
- Vite
- Swiper
- API do GitHub

## Estrutura

```txt
innovation-class/
├── Projeto 1/
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── assets/
├── Projeto 2/
│   ├── src/
│   ├── public/
│   ├── index.html
│   └── package.json
├── .gitignore
└── README.md
```

## Observações

Os projetos foram desenvolvidos seguindo as referências do Figma, priorizando fidelidade visual, responsividade e implementação dos comportamentos solicitados nos requisitos.
