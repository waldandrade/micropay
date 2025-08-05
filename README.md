# MICROPAY

To make this project i'm follow the documentation and using whats docs ask me. I want to show that the most important skill is to adapt fast reading docs and learning.

## 🚀 Features
- **Auth** - Mocked auth with two User/Password or Google Token based provider.

## 📋 Prerequisites

- Node.js (v22.x or higher)
- npm or yarn

## 🛠️ Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Start the development server:
```bash
npm run dev
# or
yarn dev
```
## VSCODE DEBUG
1. Create configuration file launch.json

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "tsx",
            "type": "node",
            "request": "launch",
            "program": "${file}",
            "runtimeExecutable": "tsx", 
            "console": "integratedTerminal",
            "internalConsoleOptions": "neverOpen", 
            "skipFiles": [ 
                "<node_internals>/**", 
                "${workspaceFolder}/node_modules/**"
            ]
        },
        {
            "name": "Attach to process",
            "type": "node",
            "request": "attach",
            "port": 9229,
            "skipFiles": [
                "<node_internals>/**",
                "${workspaceFolder}/node_modules/**",
            ],
        }
    ]
}
```

2. Run with debug

```bash
npm run debug
#or
yarn debug
```