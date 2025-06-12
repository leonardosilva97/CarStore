# CarStore - Aplicativo de Loja de Carros

## Visão Geral

**CarStore** é um aplicativo móvel desenvolvido com **React Native** e **Expo** que oferece uma plataforma para compra e venda de carros. O aplicativo inclui autenticação de usuários, navegação entre telas e uma interface de usuário moderna e responsiva.

---

## Arquitetura

O projeto segue uma **arquitetura em camadas**, com separação clara de responsabilidades:

### Camadas da Aplicação

#### Apresentação (UI)
- `screens/`: Componentes de tela completos
- `components/`: Componentes reutilizáveis da UI
- `routes/`: Configuração de navegação

#### Lógica de Negócios
- `context/`: Gerenciamento de estado global
- `hooks/`: Lógica reutilizável
- `services/`: Lógica de negócios e comunicação com APIs

#### Acesso a Dados
- `api/`: Comunicação com serviços externos
- `storage/`: Persistência local de dados

### Padrões Arquiteturais
- **Context API**: Gerenciamento de estado global para autenticação
- **Service Layer**: Encapsulamento da lógica de negócios
- **Repository Pattern**: Abstração do acesso a dados
- **Form Handling**: Uso de React Hook Form para gerenciamento de formulários

---

## Tecnologias Utilizadas

### Core
- **React Native**: Framework para desenvolvimento móvel
- **Expo**: Plataforma para desenvolvimento com React Native
- **TypeScript**: Linguagem tipada para maior segurança e produtividade

### UI/UX
- **NativeWind**: Tailwind CSS para React Native
- **React Navigation**: Navegação entre telas
- **React Native Reanimated**: Animações fluidas
- **Bottom Sheet**: Interface de usuário para painéis deslizantes

### Autenticação
- **Firebase Authentication**: Autenticação de usuários
- **Google Sign-In**: Login social com Google

### Gerenciamento de Estado e Dados
- **React Query**: Gerenciamento de estado do servidor
- **React Hook Form**: Gerenciamento de formulários
- **Zod**: Validação de esquemas

### Infraestrutura
- **Axios**: Cliente HTTP para requisições à API
- **Async Storage**: Armazenamento local persistente

---

## Estrutura de Diretórios

```bash
src/
├── api/              # Configuração e clientes de API
├── components/       # Componentes reutilizáveis
├── context/          # Contextos React para estado global
├── domain/           # Lógica de domínio e serviços
│   ├── auth/         # Autenticação
│   └── ...           # Outros domínios
├── hooks/            # Hooks personalizados
├── routes/           # Configuração de navegação
├── screens/          # Componentes de tela
├── schemas/          # Esquemas de validação
├── storage/          # Persistência local
└── utils/            # Utilitários e helpers
```

---

## Fluxo de Autenticação

O aplicativo implementa um sistema de autenticação completo com:

- **Login com Email/Senha**: Autenticação tradicional
- **Login Social com Google**: Integração com Google Sign-In
- **Registro de Usuários**: Criação de novas contas
- **Persistência de Sessão**: Mantém o usuário logado entre sessões
- **Gerenciamento de Tokens**: Armazenamento seguro de tokens de autenticação

---

## Configuração e Instalação

### Pré-requisitos

- Node.js (versão recomendada: 18+)
- Yarn ou npm
- Expo CLI
- Conta no Firebase

### Instalação e Execução

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/carstore.git
cd carstore

# Instale as dependências
npm install
# ou
yarn install

# Execute o app
npx expo prebuild

# Para iOS
npx expo run:ios

# Para Android
npx expo run:android
```

### Configuração do Firebase

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
2. Adicione aplicativos Android e iOS
3. Baixe os arquivos de configuração:
   - `google-services.json`
   - `GoogleService-Info.plist`
4. Coloque os arquivos na raiz do projeto conforme necessário

---

## Contribuição

Contribuições são bem-vindas!  
Sinta-se à vontade para enviar **pull requests** ou abrir **issues** para melhorias ou correções.

---

## Licença

Este projeto está licenciado sob a **Licença MIT**.  
Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.
