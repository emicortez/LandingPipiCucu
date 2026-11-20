# Guía para administrar la web de Pipí Cucú

Esta guía explica cómo cambiar los contenidos de la web desde el panel de administración (Sanity Studio). No hace falta saber programar.

La web muestra y cuenta las obras. **La venta sigue en Empretienda**: la web no tiene carrito ni precios, solo lleva a la tienda.

---

## 1. Entrar al panel

1. Abrí la dirección del panel que te pasó quien armó la web.
2. Entrá con la cuenta (Google, GitHub o correo) que fue invitada al proyecto.
3. A la izquierda vas a ver el menú: **Página de inicio**, **Configuración del sitio**, **Obras**, **Categorías**, **Novedades** y **Artistas**.

Si no podés entrar, pedí que te inviten al proyecto con tu correo.

---

## 2. Guardar y publicar

Todo lo que escribís se guarda solo como **borrador**. El borrador **no se ve en la web**.

- Cuando esté listo, tocá el botón verde **Publish** (Publicar), abajo a la derecha.
- Si cambiás algo ya publicado, vuelve a quedar un borrador hasta que publiques de nuevo.
- Si un campo obligatorio está vacío o algo está mal, el panel lo marca en rojo y no deja publicar. Los avisos en amarillo son sugerencias: se puede publicar igual.

---

## 3. Cargar una obra nueva

1. Entrá a **Obras** y tocá el lápiz (crear nuevo).
2. **Nombre de la obra**: el nombre tal como querés que aparezca.
3. **Dirección web (slug)**: tocá **Generate**. Se crea a partir del nombre.
4. **Fotos**: subí al menos una. La primera es la principal. Podés arrastrarlas para cambiar el orden.
5. En cada foto, completá el **Texto alternativo**: una frase que describa la obra para personas ciegas que usan lectores de pantalla. Ejemplo: *"Cuadro de un gato blanco dormido entre flores, pintado en acrílico"*. Es obligatorio.
6. **Categoría**: elegí una de la lista.
7. **Descripción corta**: una frase para el catálogo.
8. **Descripción**: el texto de la ficha. Dejá una línea en blanco para empezar otro párrafo.
9. En **Detalles** (opcionales): técnica, medidas (ej. "40 x 50 cm"), etiquetas para la búsqueda, si es **destacada**, si está **visible** y el **orden** (los números más bajos aparecen primero).
10. En **Tienda**:
    - **Enlace a la obra en Empretienda**: abrí la obra en tu tienda, copiá la dirección de la barra del navegador y pegala acá. Tiene que ser de `pipicucupc.empretienda.com.ar`. Si lo dejás vacío, la web lleva a la categoría en la tienda o, si no hay, a la tienda general.
    - **Se puede pedir personalizada**: marcalo si aceptan encargos parecidos.
11. **Buscadores (SEO)** es opcional. Si lo dejás vacío se usan el nombre, la descripción corta y la primera foto.
12. Tocá **Publish**.

**Ocultar una obra sin borrarla**: apagá **Visible en la web** y publicá. En la lista aparece con "(oculta)".

---

## 4. Categorías

En **Categorías** cargás los grupos de obras (por ejemplo, Cuadros o Navidad).

- **Nombre** y **Dirección web**: obligatorios (tocá **Generate**).
- **Descripción** e **Imagen de portada**: opcionales. Si cargás imagen, completá su texto alternativo.
- **Orden** y **Visible en la web** funcionan igual que en las obras.
- **Enlace en Empretienda**: la página de esa categoría en tu tienda.

---

## 5. Página de inicio

En **Página de inicio** elegís qué se destaca al entrar a la web. Hay una sola página de inicio: no se puede crear otra ni borrarla.

- **Título principal** y **Texto de bienvenida**: lo primero que se lee.
- **Obra principal**: la obra grande de arriba de todo.
- **Obras elegidas**: hasta 8 obras. Arrastralas para cambiar el orden.
- **Categorías elegidas**: las categorías que se muestran en la portada.
- **Nosotras**, **Personalizados** y **Cierre de la página**: un título y un texto cada uno.

Cualquier campo que quede vacío muestra el texto predeterminado de la web.

---

## 6. Novedades y borradores

En **Novedades** podés contar noticias, ferias u obras nuevas.

- **Título**, **Dirección web**, **Resumen** y **Fecha de publicación** son obligatorios.
- **Contenido**: podés usar subtítulos, citas, listas, negrita, cursiva y enlaces (que empiecen con `https://` o `mailto:`).
- **Enlace externo**: opcional, por ejemplo la publicación original en Instagram.

Podés escribir una novedad de a poco: mientras no toques **Publish** queda como borrador y nadie la ve. Para sacarla de la web, abrí el menú de la novedad (los tres puntos junto a **Publish**) y elegí **Unpublish**.

---

## 7. Artistas

En **Artistas** está la presentación de cada una: **Nombre**, **Rol**, **Foto** (con texto alternativo), **Biografía** y **Orden**. En la foto podés marcar el punto de foco para elegir qué parte no se recorta.

---

## 8. Configuración del sitio

Datos generales que aparecen en toda la web. Hay una sola configuración: no se puede crear otra ni borrarla.

- **Marca**: nombre, descripción (ej. "Pintura decorativa"), logo y logo alternativo para fondos oscuros.
- **Contacto y enlaces**:
  - **Tienda Empretienda**: obligatoria.
  - **Página de personalizados en Empretienda**: opcional.
  - **Instagram**, **Ubicación** y **Horarios de atención**.
  - **Número de WhatsApp**: solo números, con código de país, sin `+` ni espacios (ej. `549...`). **Mientras esté vacío, el botón de WhatsApp queda oculto en la web.** Cargalo solo cuando quieran recibir consultas por ahí.
- **Buscadores (SEO)**: título y descripción generales, y la imagen que se ve al compartir la web (recomendado 1200 x 630 px).

---

## 9. Consejos para las fotos

- Mostrá **la obra completa**, sin cortar los bordes.
- **Buena luz**, mejor natural y sin reflejos ni sombras fuertes.
- **No uses capturas de pantalla** de Instagram ni fotos con texto, stickers o marcos encima.
- Que el lado más largo tenga **al menos 1600 px**. Las fotos del celular suelen alcanzar.
- Un fondo neutro ayuda a que se luzcan los colores.

---

## 10. ¿Cuándo se ve el cambio en la web?

Después de tocar **Publish**, el panel avisa a la web y se arma una versión nueva automáticamente. Tarda **unos minutos**. Si pasado un rato no ves el cambio, recargá la página. Los detalles técnicos están en `DEPLOYMENT.md`.

Los borradores nunca se ven en la web: solo lo publicado.
