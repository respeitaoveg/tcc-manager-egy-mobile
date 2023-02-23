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
2. Executar o comando YARN para instalar as dependências
3. Criar o arquivo .env.local com a variável "VITE_BASE_URL" recebendo o valor do caminho para as chamadas da API
    1. VITE_BASE_URL=https://www.minhaapi.com.br/api
4. Executar o comando YARN DEV para rodar o sistema
