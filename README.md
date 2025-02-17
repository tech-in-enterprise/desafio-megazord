Magazord Test Front-end 

# Funcionalidades
- Está setado para começar com meu usuário de um dos meus perfis do github. 
- Busca de repositórios por usuário (usando Zustand para armazenar o nome do usuário).
- Filtra entre repositórios públicos do usuário e os favoritos(starred)
- Direciona o usuário para o github quando clica em um repositório
- Componente de busca que pesquisa pelo usuário e seus respectivos diretório e demais informações referentes ao usuário quando aperta no ícone de busca

# Tecnologias
- TypeScript como linguagem principal.
- Zustand para estado global.
- React Query para gerenciamento de requisições, cache
- TailwindCSS para estilização rápida.
- Axios para chamadas HTTP.
- Vercel para deploy rápido.

# Desafios
- Nunca havia utitilizado o Zustand, apenas o Redux e achei bem mais fácil configurar o Zustand
- Também não havia utilizado o React Query e tive que aprender a como usar para gerenciar melhor as requisições do projeto
- Aparentemente parece ser um projeto bem mais simples do que de fato foi, então parecia que não ia ser muito grande, mas a medida que foi crescendo tive que refatorar e separar as responsabilidades, por exemplo, das stores para ficar um código limpo

# Melhorias
- Com mais tempo, daria para tratar melhor os retornos dos erros
- Coloquei o botão abaixo da barra de busca em tela mobile para melhorar o design, já que agora busca direto pelo usuário
- Botão para alternar a pesquisa entre usuário e a busca de repositórios desse usuário


# Como Executar

1. Clonar o repositório:
   git clone https://github.com/tech-in-enterprise/desafio-megazord.git
2. Rodar npm (ou usar outro gerenciador de pacotes) install no diretório raíz do projeto (considerando que você já tenha o node instalado)
3. Depois de baixar as dependências do projeto basta rodar o comando 'npm run dev' e acessar o link que vai aparecer
