# 🍣 Sushi Chef Simulator: Explosive Edition

¡Bienvenido a **Sushi Chef Simulator**! Un juego interactivo desarrollado con **JavaScript vanila** donde controlas a un equipo de cocineros en una carrera por preparar el mejor sushi, evitando obstáculos y... ¡sushi explosivo!

## 📖 Descripción del Juego
En este simulador, puedes añadir varios cocineros al escenario. Tu misión es seleccionar a uno, moverlo por la cocina y recolectar diferentes tipos de sushi para ganar puntos. Pero ten cuidado: no todos los ingredientes son estables. Si intentas picar un sushi defectuoso, ¡podría terminar en un **Game Over** instantáneo!

## 🎮 Mecánicas Principales
- **Gestión de Cocineros:** Añade múltiples chefs. Cada uno tiene su propia personalidad y un set de frases aleatorias que puedes ver al interactuar con ellos.
- **Sistema de Colisiones:** Los cocineros no pueden atravesarse entre sí ni pasar por encima de los obstáculos de la cocina (cuchillos, tablas, etc.).
- **Minijuego de "Picar":** Cuando estés cerca de una pieza de sushi, el botón "Picar" se activará. Al pulsarlo, el chef entrará en una animación de cocina de 1 segundo.
- **Recompensas Aleatorias:** Picar sushi puede darte 0, 10, 25 o hasta 50 puntos según tu suerte.
- **Riesgo de Explosión:** Hay un 3% de probabilidad de que el sushi explote al ser manipulado. ¡Cuidado con el "Boom"!

## ⌨️ Controles
| Acción | Control |
| :--- | :--- |
| **Seleccionar Cocinero** | Clic izquierdo sobre el chef |
| **Moverse** | Flechas de dirección (`↑`, `↓`, `←`, `→`) |
| **Cerrar Diálogos** | Los bocadillos cambian al moverte o seleccionar otro chef |
| **Acciones Especiales** | Botones de la interfaz (Añadir, Picar, Inspeccionar) |

## 🛠️ Detalles Técnicos (JS)
Este proyecto demuestra habilidades avanzadas en:
- **Manipulación Dinámica del DOM:** Creación y eliminación de elementos en tiempo real.
- **Lógica de Colisiones AABB:** Algoritmo para detectar solapamientos entre personajes y objetos.
- **Gestión de Estados:** Uso de la variable `juegoActivo` para pausar todas las acciones tras un Game Over.
- **Simulación de IA de Diálogo:** Sistema de "paquetes de frases" aleatorias con barajado dinámico.

## 🚀 Cómo empezar
1. Asegúrate de tener la carpeta `src/` con todas las imágenes necesarias (`der2.png`, `boom.png`, `comida.png`, etc.).
2. Abre el archivo `index.html` en cualquier navegador moderno.
3. ¡Empieza a cocinar!

---
Desarrollado por [PaiMei1997](https://github.com/PaiMei1997) como parte de su formación en desarrollo Web.
