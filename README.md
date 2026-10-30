# test_fe
FE Cypress testing

Pruebas end-to-end con [Cypress](https://www.cypress.io/) sobre [Sauce Demo](https://www.saucedemo.com).

## Requisitos

- [Node.js](https://nodejs.org/) (versión LTS recomendada) y npm
- Google Chrome (solo para el modo `cy:headed`)

## Instalación

```bash
npm install
```

## Prueba `test.cy.js`

[cypress/e2e/test.cy.js](cypress/e2e/test.cy.js) cubre el flujo de compra completo:

1. Inicia sesión con el usuario `standard` definido en [cypress/fixtures/users.json](cypress/fixtures/users.json).
2. Agrega los primeros 2 productos al carrito y valida el contador.
3. Abre el carrito y valida productos y cantidades.
4. Llena la información de checkout.
5. Revisa el resumen de la orden y la finaliza.
6. Valida el mensaje de orden completada.

Los page objects usados por la prueba están en [cypress/pages/](cypress/pages/).

### Ejecutar en modo headless

```bash
npm run cy:run -- --spec cypress/e2e/test.cy.js
```

### Ejecutar en Chrome con navegador visible

```bash
npm run cy:headed -- --spec cypress/e2e/test.cy.js
```

### Ejecutar desde la interfaz de Cypress

```bash
npm run cy:open
```

Selecciona **E2E Testing**, elige un navegador y haz clic en `test.cy.js`.

### Ejecutar todas las pruebas

```bash
npm run cy:run
```

## Resultados

- Si una prueba falla, Cypress guarda capturas de pantalla en `cypress/screenshots/`.
- La grabación de video está deshabilitada (`video: false` en [cypress.config.js](cypress.config.js)).

## Notas

- Los scripts de `package.json` usan `set ELECTRON_RUN_AS_NODE=&&` para limpiar esa variable de entorno, lo cual evita que Cypress falle al iniciar cuando se ejecuta desde VS Code. Esta sintaxis es de Windows (`cmd`); en macOS/Linux ejecuta Cypress directamente, por ejemplo:

  ```bash
  npx cypress run --spec cypress/e2e/test.cy.js
  ```
