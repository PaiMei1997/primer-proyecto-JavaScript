let escenario = document.getElementById("escenario");
      let listaCocineros = [];
      let listaObstaculos = [];
      let listaSushi = [];
      let botonPicar = document.getElementById("botonPicar");
      let puntos = 0;
      let juegoActivo = true;

      let imagenes = [
        'url("src/der2.png")',
        'url("src/v1-drcha.png")',
        'url("src/pers1idle.png")',
      ];

      let imagenesObstaculos = [
        'url("src/obs1.png")',
        'url("src/obs2.png")',
        'url("src/obs3.png")',
        'url("src/obs4.png")',
        'url("src/obs5.png")',
      ];

      let imagenesSushi = [
        'url("src/comida.png")',
        'url("src/comida1.png")',
        'url("src/comida2.png")',
        'url("src/comida3.png")',
        'url("src/comida4.png")',
        'url("src/comida5.png")',
        'url("src/comida6.png")',
      ];
      let frases = [
        "¡Hola!",
        "¿Qué tal?",
        "Estoy cocinando.",
        "¿Necesitas algo?",
        "¡Vamos allá!",
        "Hoy toca sushi",
        "Estoy ocupado",
        "No molestes",
      ];

      document.addEventListener("keydown", function (event) {
        if (!juegoActivo) return;
        moverCocinero(event.key);
        actualizarProximidad();
      });

      // PERSONAJES
      function añadirCocinero() {
        if (!juegoActivo) return;
        let cocinero = document.createElement("div");
        cocinero.classList.add("personaje");

        let bocadillo = document.createElement("div");
        bocadillo.style.position = "absolute";
        bocadillo.style.bottom = "60px";
        bocadillo.style.left = "0px";
        bocadillo.style.padding = "4px 8px";
        bocadillo.style.background = "white";
        bocadillo.style.border = "1px solid black";
        bocadillo.style.borderRadius = "5px";
        bocadillo.style.display = "none";
        bocadillo.style.fontSize = "12px";
        bocadillo.style.zIndex = "100";

        cocinero.appendChild(bocadillo);
        cocinero.bocadillo = bocadillo;

        var paquete = frases.slice();
        paquete.sort(function () {
          return Math.random() - 0.5;
        });

        paquete = paquete.slice(0, 4);
        cocinero.frasesRestantes = paquete;
        cocinero.fraseFinal = "No tengo más que decir";

        let intento = 0;
        let left;
        let top;
        let colision;

        do {
          left = Math.floor(Math.random() * 750);
          top = Math.floor(Math.random() * 550);

          colision = false;

          for (let chef of listaCocineros) {
            if (
              hayColision(
                left,
                top,
                parseInt(chef.style.left),
                parseInt(chef.style.top),
              )
            ) {
              colision = true;
              break;
            }
          }

          for (let obs of listaObstaculos) {
            if (
              hayColision(
                left,
                top,
                parseInt(obs.style.left),
                parseInt(obs.style.top),
              )
            ) {
              colision = true;
              break;
            }
          }

          intento++;
        } while (colision && intento < 50);

        infoPersonaje(cocinero, left, top);

        cocinero.addEventListener("click", function () {
          if (!juegoActivo) return;
          for (let otro of listaCocineros) {
            otro.classList.remove("seleccionado");
            if (otro !== this) otro.bocadillo.style.display = "none";
          }

          this.classList.add("seleccionado");
          actualizarProximidad();

          let recuperar = document.getElementById("recuperarFrases").checked;

          if (recuperar && this.frasesRestantes.length === 0) {
            let copia = frases.slice();
            copia.sort(function () {
              return Math.random() - 0.5;
            });
            this.frasesRestantes = copia.slice(0, 4);
          }

          if (this.frasesRestantes.length > 0) {
            this.bocadillo.innerText = this.frasesRestantes.shift();
          } else {
            this.bocadillo.innerText = this.fraseFinal;
          }

          this.bocadillo.style.display = "block";
        });

        escenario.appendChild(cocinero);
        listaCocineros.push(cocinero);
      }

      //  OBSTÁCULOS
      function añadirObstaculos() {
        if (!juegoActivo) return;
        for (let n = 0; n < 3; n++) {
          let obstaculo = document.createElement("div");
          obstaculo.classList.add("obstaculo");

          let intento = 0,
            left,
            top,
            colision;

          do {
            left = Math.floor(Math.random() * 750);
            top = Math.floor(Math.random() * 550);

            colision = false;

            for (let chef of listaCocineros) {
              if (
                hayColision(
                  left,
                  top,
                  parseInt(chef.style.left),
                  parseInt(chef.style.top),
                )
              ) {
                colision = true;
                break;
              }
            }

            for (let obs of listaObstaculos) {
              if (
                hayColision(
                  left,
                  top,
                  parseInt(obs.style.left),
                  parseInt(obs.style.top),
                )
              ) {
                colision = true;
                break;
              }
            }

            intento++;
          } while (colision && intento < 50);

          infoObstaculo(obstaculo, top, left);

          escenario.appendChild(obstaculo);
          listaObstaculos.push(obstaculo);
        }
      }

      // COMIDA
      function añadirComida() {
        if (!juegoActivo) return;
        for (let n = 0; n < 3; n++) {
          let comida = document.createElement("div");
          comida.classList.add("obstaculo");

          let intento = 0,
            left,
            top,
            colision;

          do {
            left = Math.floor(Math.random() * 750);
            top = Math.floor(Math.random() * 550);

            colision = false;

            for (let chef of listaCocineros) {
              if (
                hayColision(
                  left,
                  top,
                  parseInt(chef.style.left),
                  parseInt(chef.style.top),
                )
              )
                colision = true;
            }

            for (let obs of listaObstaculos) {
              if (
                hayColision(
                  left,
                  top,
                  parseInt(obs.style.left),
                  parseInt(obs.style.top),
                )
              )
                colision = true;
            }

            for (let com of listaSushi) {
              if (
                hayColision(
                  left,
                  top,
                  parseInt(com.style.left),
                  parseInt(com.style.top),
                )
              )
                colision = true;
            }

            intento++;
          } while (colision && intento < 50);

          comida.style.left = left + "px";
          comida.style.top = top + "px";
          comida.style.backgroundImage =
            imagenesSushi[Math.floor(Math.random() * imagenesSushi.length)];
          comida.style.backgroundSize = "cover";
          comida.style.backgroundPosition = "center";

          escenario.appendChild(comida);
          listaSushi.push(comida);
        }
      }

      //MOVIMIENTO
      function moverCocinero(tecla) {
        if (!juegoActivo) return;
        let seleccionado = document.querySelector(".seleccionado");
        if (!seleccionado) return;

        let x = parseInt(seleccionado.style.left);
        let y = parseInt(seleccionado.style.top);
        let nuevoX = x;
        let nuevoY = y;

        switch (tecla) {
          case "ArrowUp":
            nuevoY -= 10;
            break;
          case "ArrowDown":
            nuevoY += 10;
            break;
          case "ArrowLeft":
            nuevoX -= 10;
            seleccionado.style.transform = "scaleX(-1)";
            seleccionado.bocadillo.style.transform = "scaleX(-1)";
            break;
          case "ArrowRight":
            nuevoX += 10;
            seleccionado.style.transform = "scaleX(1)";
            seleccionado.bocadillo.style.transform = "scaleX(1)";
            break;
        }

        if (nuevoX < 0) nuevoX = 0;
        if (nuevoX > 750) nuevoX = 750;

        if (nuevoY < 0) nuevoY = 0;
        if (nuevoY > 550) nuevoY = 550;

        let puedeMover = true;

        for (let otro of listaCocineros) {
          if (otro === seleccionado) continue;
          if (
            hayColision(
              nuevoX,
              nuevoY,
              parseInt(otro.style.left),
              parseInt(otro.style.top),
            )
          ) {
            puedeMover = false;
            break;
          }
        }

        if (puedeMover) {
          for (let obs of listaObstaculos) {
            if (
              hayColision(
                nuevoX,
                nuevoY,
                parseInt(obs.style.left),
                parseInt(obs.style.top),
              )
            ) {
              puedeMover = false;
              break;
            }
          }
        }

        if (puedeMover) {
          seleccionado.style.left = nuevoX + "px";
          seleccionado.style.top = nuevoY + "px";
        }

        actualizarProximidad();
      }

      // UTILIDADES
      function hayColision(x1, y1, x2, y2) {
        return x1 < x2 + 50 && x1 + 50 > x2 && y1 < y2 + 50 && y1 + 50 > y2;
      }

      function infoPersonaje(cocinero, left, top) {
        cocinero.style.left = left + "px";
        cocinero.style.top = top + "px";
        cocinero.style.backgroundImage =
          imagenes[Math.floor(Math.random() * imagenes.length)];
        cocinero.style.backgroundSize = "cover";
        cocinero.style.backgroundPosition = "center";
      }

      function infoObstaculo(obstaculo, top, left) {
        obstaculo.style.left = left + "px";
        obstaculo.style.top = top + "px";
        obstaculo.style.backgroundImage =
          imagenesObstaculos[
            Math.floor(Math.random() * imagenesObstaculos.length)
          ];
        obstaculo.style.backgroundSize = "cover";
        obstaculo.style.backgroundPosition = "center";
      }

      // PICAR
      function actualizarProximidad() {
        let seleccionado = document.querySelector(".seleccionado");
        if (!seleccionado || !juegoActivo) {
          botonPicar.disabled = true;
          botonPicar.dataset.tipo = null;
          botonPicar.dataset.index = null;
          return;
        }

        let x = parseInt(seleccionado.style.left);
        let y = parseInt(seleccionado.style.top);

        let activado = false;

        for (let i = 0; i < listaSushi.length; i++) {
          let sushi = listaSushi[i];
          let sx = parseInt(sushi.style.left);
          let sy = parseInt(sushi.style.top);

          let dx = Math.abs(x - sx);
          let dy = Math.abs(y - sy);

          if (dx <= 30 && dy <= 30) {
            botonPicar.disabled = false;
            botonPicar.dataset.tipo = "sushi";
            botonPicar.dataset.index = i;
            activado = true;
            break;
          }
        }

        if (!activado) {
          botonPicar.disabled = true;
          botonPicar.dataset.tipo = null;
          botonPicar.dataset.index = null;
        }
      }

      function picar() {
        var seleccionado = document.querySelector(".seleccionado");
        if (!seleccionado || !juegoActivo) return;

        var tipo = botonPicar.dataset.tipo;
        var index = botonPicar.dataset.index;

        if (!tipo || index === null) return;

        index = parseInt(index);

        // Guardamos la imagen original del personaje
        var imagenOriginal = seleccionado.style.backgroundImage;

        // Animación de picar
        seleccionado.style.backgroundImage = 'url("src/pers1cocinando.png")';
        seleccionado.style.backgroundSize = "cover";
        seleccionado.style.backgroundPosition = "center";

        setTimeout(function () {
          if (tipo === "sushi") {
            var sushi = listaSushi[index];

            // explosión al picar sushi
            if (Math.random() <= 0.03) {
              juegoActivo = false;
              seleccionado.style.backgroundImage = 'url("src/boom.png")';
              setTimeout(function () {
                alert("GAME OVER: ¡Sushi explosivo!");
                var btnReiniciar = document.createElement("button");
                btnReiniciar.innerText = "Reiniciar Juego";
                btnReiniciar.onclick = function () {
                  location.reload();
                };
                botonPicar.after(btnReiniciar);
              }, 100);
              return;
            }

            //sistemas de recompensas aleatorias a la hora de picar
            var azar = Math.random();
            if (azar <= 0.49) {
              puntos += 0;
            } else if (azar <= 0.74) {
              puntos += 10;
            } else if (azar <= 0.99) {
              puntos += 25;
            } else {
              puntos += 50;
            }

            document.getElementById("marcador").innerText = "Puntos: " + puntos;

            sushi.remove();
            listaSushi.splice(index, 1);
          }

          document.getElementById("marcador").innerText = "Puntos: " + puntos;

          // Restauramos la imagen original del personaje
          seleccionado.style.backgroundImage = imagenOriginal;

          botonPicar.disabled = true;
          actualizarProximidad();
        }, 1000);
      }

      function inspeccionar() {
        let seleccionado = document.querySelector(".seleccionado");
        let panel = document.getElementById("inspeccionContenido");

        if (!seleccionado) {
          panel.innerText = "No hay personaje seleccionado";
          return;
        }
        panel.innerText =
          "Frases restantes:\n\n" + seleccionado.frasesRestantes.join("\n");
      }