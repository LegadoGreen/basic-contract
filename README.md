# Projecto de creacion basica de Smart Contract Legado

Este proyecto ha sido creado usando Hardhat, e incluye contratos, scripts de despliegue (ignitors) y tests para contratos de prueba con distintos fines. Algunos de estos contratos son PixelCanvas y ChangeUri.

El contrato PixelCanvas ha sido desplegado en la red de pruebas de Polygon y se encuentra en la siguiente dirección: `0xFB98f5b50B8dbFB7583d36236893285D6150023E`.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [npm](https://www.npmjs.com/) (gestor de paquetes de Node.js)
- [Hardhat](https://hardhat.org/) (entorno de desarrollo para Ethereum)

## Instalación

Sigue estos pasos para configurar el proyecto en tu máquina local:

1. Clona el repositorio:
  ```bash
  git clone (project)
  ```

2. Navega al directorio del proyecto:
  ```bash
  cd legado-projects/basic-contract
  ```

3. Instala las dependencias:
  ```bash
  yarn
  ```

## Uso

### Compilar los Contratos

Para compilar los contratos inteligentes, ejecuta el siguiente comando:
```bash
npx hardhat compile
```

### Desplegar los Contratos

Para desplegar los contratos en la red de pruebas de Polygon, utiliza el siguiente comando:
```bash
npx hardhat ignition deploy ignition/modules/PixelCanvas.ts --network amoy
```

### Ejecutar Tests

Para ejecutar los tests y asegurarte de que todo funciona correctamente, usa:
```bash
npx hardhat test
```

## Estructura del Proyecto

El proyecto tiene la siguiente estructura de directorios:

```
basic-contract/
├── contracts/          # Contratos inteligentes
│   └── PixelCanvas.sol
│   └── ChangeUri.sol
├── ignition/            # Scripts de despliegue
│   └── PixelCanvas.ts
│   └── ChangeUri.ts
├── test/               # Tests para los contratos
│   └── PixelCanvas.ts
│   └── ChangeUri.ts
├── hardhat.config.js   # Configuración de Hardhat
└── README.md           # Este archivo
```

## Contribuir

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Sube tus cambios a tu fork (`git push origin feature/nueva-funcionalidad`).
5. Crea un Pull Request.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## Contacto

Para cualquier consulta o sugerencia, puedes contactar al autor del proyecto en [d.vargas@legado.green](mailto:d.vargas@legado.green).
