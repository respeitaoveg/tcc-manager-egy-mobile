# TCC - Sistema de gestão de negócio
## EGY Mobile

### Trabalho de conclusão do curso Tecnologia em Análise e Desenvolvimento de Sistemas (TADS) na Universidade Federal do Paraná (UFPR).

#### Motivação
Este repositõrio foi criado para ser parte móvel do sistema, focado principalmente na venda de produtos e geração de orçamentos e notas fiscais.

#### Ambiente
Tudo foi desenvolvido no Linux Fedora 36. A IDE foi o famoso VScode. Por fim, o Firefox foi o browser principal para rodar o sistema.

#### Tecnologias
- Reactjs
- Typescript
- Chakra UI
- React forms

#### Instalação
1. Clonar este repositório
    1. git clone git@github.com:respeitaoveg/tcc-manager-egy-mobile.git
2. Entrar no diretório "tcc-manager-egy-mobile"
3. Instalar as dependências com o comando "yarn"
4. Criar o arquivo oculto ".env.local" na raíz e adicionar a variável "VITE_BASE_URL" recebendo o valor do caminho para a API
    1. Por exemplo: echo VITE_BASE_URL=https://192.168.0.10/api >> .env.local
5. Executar o comando "yarn dev" para rodar o sistema
6. Entrar no link gerado para abrir o sistema no browser
