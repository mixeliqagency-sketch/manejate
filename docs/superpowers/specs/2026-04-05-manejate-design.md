# Manejate — Spec de Diseño

## Resumen ejecutivo

Plataforma web educativa gamificada para aprender las normas de tránsito y aprobar el examen teórico de manejo en CABA. Combina contenido oficial del Manual del Conductor CABA 2019 (Ley 2148) con 11 juegos interactivos, exámenes multinivel y un sistema de progresión tipo Duolingo. Monetización vía Google AdSense + suscripción "Manejate Pro". Fase 2: canal de YouTube con videos auto-generados via Remotion que alimentan tráfico al sitio.

**Reglas de diseño inamovibles:**
1. El usuario capta en 3 segundos qué es el sitio y cómo le resuelve un problema
2. Retención: siempre hay un "siguiente paso" claro, el usuario nunca queda en un callejón sin salida
3. SEO: cada página ataca una keyword real y tiene contenido que resuelve una búsqueda concreta

---

## 1. Identidad

| Campo | Valor |
|---|---|
| **Nombre** | Manejate |
| **Dominio** | manejate.com.ar o manejate.ar (verificar disponibilidad) |
| **Tagline** | "Aprendé a manejar jugando. Aprobá el examen de CABA." |
| **Tono contenido** | Profesional, confiable, claro (es seguridad vial) |
| **Tono juegos** | Gamificado, motivador, adictivo |
| **Público** | Primera licencia (17-25 años) + Renovación/repaso (cualquier edad) |
| **Alcance inicial** | CABA (Ley 2148). Expandible a otras provincias/Ley Nacional 24.449 |

### Paleta de colores

| Color | Hex | Uso |
|---|---|---|
| Azul vial | #1565C0 | Color primario, navegación, headers |
| Amarillo precaución | #FFB300 | CTAs, botones primarios, highlights |
| Verde semáforo | #2E7D32 | Respuestas correctas, progreso, éxito |
| Rojo semáforo | #C62828 | Errores, alertas, respuestas incorrectas |
| Gris asfalto | #37474F | Texto principal, fondos oscuros |
| Blanco | #FAFAFA | Fondos claros |

### Tipografía

- Familia única: **Inter** (bold para títulos, regular para cuerpo)
- Una sola familia = carga más rápida

---

## 2. Stack técnico

| Componente | Tecnología |
|---|---|
| Framework | Next.js (App Router, SSG) |
| Lenguaje | TypeScript + React |
| Contenido | Archivos MDX en `/content/lecciones/` |
| Datos de juegos | Archivos JSON en `/data/` organizados por tema |
| Progreso usuario | localStorage (default) + Google Sheets vía n8n (con registro) |
| Autenticación | Opcional. Google login o email simple |
| Deploy | Vercel (cuenta existente de Pablo) |
| Repositorio | GitHub (mixeliqagency-sketch) — repo propio |
| Estilos | Tailwind CSS |
| Animaciones | Framer Motion (transiciones y feedback de juegos) |

---

## 3. Estructura de páginas

### 3.1 Home (`/`)

- **Hero:** Fondo con ilustración vial estilizada. Título grande: "Aprendé a manejar jugando". Subtítulo: "Practicá gratis para el examen teórico de CABA". CTA principal: "Empezar ahora" (amarillo).
- **Selector de camino:** "¿Es tu primera licencia?" → Sí / No. Redirige al camino correspondiente.
- **Preview de juegos:** Grilla visual con los 11 juegos, iconos representativos, click lleva al juego.
- **Stats del sitio:** Contadores animados (preguntas respondidas, juegos jugados — pueden ser simulados al inicio).
- **Sección SEO:** Bloque de texto "¿Cómo es el examen teórico en CABA?" con contenido indexable.
- **Footer:** Links a lecciones, juegos, exámenes, sobre nosotros, contacto.

### 3.2 Lecciones (`/lecciones`)

**Página índice:** Mapa visual del camino progresivo (12 nodos conectados). Los de primera licencia ven el camino recomendado. Los de renovación ven todas las lecciones accesibles con indicador de tema.

**Cada lección (`/lecciones/[slug]`):**
- Contenido MDX del manual oficial, reescrito de forma clara y amigable
- Datos clave resaltados en cards visuales
- Imágenes/íconos SVG de señales de tránsito
- Mini-quiz al final (3-5 preguntas rápidas)
- CTA: "Practicá este tema" → lleva a juegos filtrados por ese tema
- Navegación: anterior / siguiente lección
- Barra de progreso visible

### Las 12 lecciones

| # | Slug | Título | Temas del manual |
|---|---|---|---|
| 1 | el-conductor-responsable | El conductor responsable | Cinturón, celular, alcohol, distracciones |
| 2 | prioridad-normativa | Prioridad normativa | Orden: agente > señal transitoria > semáforo > señalización > ley |
| 3 | semaforos-y-luces | Semáforos y luces | Tipos, colores, intermitentes, peatonales |
| 4 | señales-reglamentarias | Señales reglamentarias | Prohibición, obligación, prioridad (PARE, ceda el paso) |
| 5 | señales-preventivas | Señales preventivas | Curvas, cruces, peligros |
| 6 | señales-informativas | Señales informativas | Servicios, destinos, referencias |
| 7 | demarcacion-horizontal | Demarcación horizontal | Líneas, sendas, cordones de colores, isletas |
| 8 | prioridad-de-paso | Prioridad de paso | Emergencias, rotondas, intersecciones |
| 9 | giros-y-adelantamiento | Giros y adelantamiento | Giro izquierda/derecha, sobrepaso |
| 10 | velocidades | Velocidades | Máximas y mínimas por zona |
| 11 | estacionamiento | Estacionamiento | Paralelo, 45°, 90°, prohibiciones |
| 12 | conduccion-especial | Conducción especial | Autopistas, lluvia, niebla, noche |

### 3.3 Juegos (`/juegos`)

**Página índice:** Grilla de cards con los 11 juegos. Cada card tiene: ícono, nombre, descripción breve, dificultad, y filtro por tema/lección.

**Cada juego (`/juegos/[tipo]`):** Pantalla completa del juego con controles claros.

### 3.4 Exámenes (`/examenes`)

**Página índice:** 4 niveles presentados como escalera de dificultad.

| Nivel | Preguntas | Timer | Explicaciones | Acceso |
|---|---|---|---|---|
| Fácil | 10 | Sin timer | Sí, inmediatas | Gratis ilimitado |
| Medio | 20 | 30 seg/pregunta | Al final | Gratis ilimitado |
| Difícil | 30 | 20 seg/pregunta | Al final | Gratis ilimitado |
| Simulacro Real | 30 | 45 min total, 70% para aprobar | Al final con detalle | Gratis 3/día, ilimitado Pro |

**Pantalla de resultado:** Nota grande, aprobado/desaprobado, desglose por tema, temas a repasar con link directo a la lección, CTA para reintentar o compartir resultado.

### 3.5 Mi Progreso (`/progreso`)

- Dashboard personal
- Nivel actual y barra de XP hacia el siguiente
- Lecciones completadas (checklist visual)
- Badges obtenidos
- Historial de exámenes con notas
- Gráfico de temas fuertes vs débiles
- Racha diaria
- Si no tiene cuenta: banner "Registrate para no perder tu progreso"

### 3.6 Blog (`/blog`)

Artículos SEO que capturan búsquedas informacionales:
- "Cómo es el examen teórico de manejo en CABA 2026"
- "10 errores más comunes en el examen de manejo"
- "Requisitos para sacar la licencia de conducir en CABA"
- "Diferencia entre licencia profesional y particular"
- Cada artículo termina con CTA hacia lecciones/juegos/exámenes

---

## 4. Los 11 juegos — Especificación

Todos los juegos comparten:
- Otorgan XP al completar
- Pueden filtrarse por lección/tema
- Responsive: touch (mobile) y mouse (desktop)
- Guardan mejor puntaje en progreso del usuario
- Feedback inmediato (visual + sonido sutil)
- Botón "Siguiente" o "Jugar de nuevo" siempre visible

### 4.1 Memory (Cartas)
- Grilla de cartas boca abajo
- Cada par: señal de tránsito + su significado (texto)
- Dar vuelta 2 cartas: si matchean, quedan visibles
- Métricas: tiempo + cantidad de intentos
- Dificultades: 6 pares (fácil), 10 pares (medio), 15 pares (difícil)

### 4.2 Quiz / Trivia
- Pregunta + 4 opciones
- Feedback inmediato: verde si acertó, rojo si falló + explicación
- Rondas de 10 preguntas
- Filtrable por tema o mezcla general

### 4.3 Verdadero o Falso
- Afirmación sobre una norma de tránsito
- El usuario toca V o F (botones grandes, mobile-friendly)
- Feedback instantáneo con la fuente del manual
- Rondas rápidas de 15 afirmaciones

### 4.4 Completar la frase
- Regla de tránsito con un hueco
- 3 opciones para completar
- Feedback con la regla completa y su explicación

### 4.5 Crucigrama
- Grilla clásica de crucigrama
- Definiciones = conceptos de tránsito
- Crucigramas temáticos (uno por lección) + general
- Teclado virtual en mobile
- Se puede pedir pista (pierde puntos)

### 4.6 Sopa de letras
- Grilla de letras con términos de tránsito escondidos
- Lista de palabras a encontrar al costado
- Al encontrar una: se tacha y aparece su definición breve
- Horizontal, vertical y diagonal

### 4.7 Arrastra y suelta (Clasificador)
- Señales aparecen en el centro
- Zonas de destino: Reglamentaria / Preventiva / Informativa / Transitoria
- Drag en desktop, touch-drag en mobile
- Timer opcional
- Feedback por señal: correcta o "esta señal es [categoría] porque..."

### 4.8 Ahorcado
- Dibujo progresivo del ahorcado
- Palabra = término de tránsito
- Pista = definición del término
- Teclado de letras clickeable
- 6 intentos

### 4.9 Situaciones viales
- Ilustración SVG de una intersección o situación
- Elementos: calles, semáforos, vehículos, señales, peatones
- Pregunta: "¿Quién tiene prioridad?" / "¿Qué debés hacer?"
- 3-4 opciones
- Feedback con explicación legal (artículo de la Ley 2148)

### 4.10 Simulacro de examen
- Réplica del formato real del examen teórico CABA
- 30 preguntas, timer de 45 minutos, 70% para aprobar
- No se puede volver atrás (como en el real)
- Resultado: nota, desglose, recomendaciones
- Gratis: 3 intentos por día. Pro: ilimitado

### 4.11 Ordená los pasos
- Lista de pasos desordenados
- Drag & drop para reordenar
- Ejemplos: "Pasos para estacionar en paralelo", "Qué hacer antes de arrancar", "Secuencia para girar a la izquierda"
- Feedback visual cuando el orden es correcto

---

## 5. Sistema de gamificación

### Puntos (XP)

| Acción | XP |
|---|---|
| Completar una lección | +50 |
| Ganar un juego | +10 a +30 según dificultad |
| Aprobar examen fácil | +100 |
| Aprobar examen medio | +200 |
| Aprobar examen difícil | +300 |
| Aprobar simulacro real | +500 |
| Racha diaria (entrar consecutivamente) | +25 bonus |

### Niveles

| Nivel | XP necesario | Nombre |
|---|---|---|
| 1 | 0 | Peatón |
| 2 | 200 | Acompañante |
| 3 | 500 | Aprendiz |
| 4 | 1000 | Conductor Novato |
| 5 | 2000 | Conductor Seguro |
| 6 | 3500 | Conductor Experto |
| 7 | 5000 | Instructor |

### Badges

| Badge | Condición |
|---|---|
| Primera lección | Completar lección 1 |
| Memoria de acero | Ganar Memory sin errores |
| Crucigrama Master | Completar un crucigrama |
| Aprobado! | Aprobar el primer simulacro |
| Racha de 7 | Entrar 7 días seguidos |
| Sabelotodo | 50 respuestas correctas seguidas |
| Estudioso | Completar las 12 lecciones |
| Completista | Jugar los 11 juegos al menos una vez |

### Almacenamiento de progreso

- **Sin cuenta:** localStorage del navegador. Banner recordando que puede perder el progreso.
- **Con cuenta:** Sync a Google Sheets vía n8n. Login con Google o email.

---

## 6. Monetización

### 6.1 Google AdSense (ingreso base)
- Banner debajo del nav (no invasivo)
- Ad entre lecciones (después de completar, antes de la siguiente)
- Ad en sidebar de resultados de exámenes
- NUNCA ads dentro de juegos mientras se juega
- Estimación: 10K visitas/mes → $30-80 USD. 50K → $150-400 USD

### 6.2 Manejate Pro (suscripción o pago único)
- **Precio:** $1.500 ARS/mes o $5.000 ARS pago único (ajustable según mercado)
- **Pasarela de pago:** MercadoPago (checkout API, ya integrada en proyectos anteriores)
- Sin publicidad
- Simulacros ilimitados (free: 3/día)
- Estadísticas avanzadas (evolución, predicción, comparación)
- Certificado PDF descargable
- Badge exclusivo "Pro"

### 6.3 Contenido SIEMPRE gratis (nunca se bloquea)
- Las 12 lecciones completas
- Los 11 juegos
- Exámenes fácil, medio y difícil
- Blog completo

### 6.4 Futuro
- Guía PDF descargable "Resumen express para el examen"
- Directorio de autoescuelas CABA (si hay tracción)
- PWA → app nativa si tiene sentido

---

## 7. Estrategia SEO

### Keywords principales

| Keyword | Página objetivo |
|---|---|
| examen de manejo caba | /examenes |
| simulacro examen manejo caba | /examenes (simulacro) |
| señales de tránsito argentina | /lecciones/señales-reglamentarias |
| preguntas examen manejo | /juegos/quiz |
| manual del conductor caba | /lecciones |
| prioridad de paso argentina | /lecciones/prioridad-de-paso |
| velocidades máximas argentina | /lecciones/velocidades |
| estacionar en paralelo | /lecciones/estacionamiento |

### Keywords long tail

| Keyword | Página |
|---|---|
| juegos para aprender a manejar | /juegos |
| crucigrama señales de tránsito | /juegos/crucigrama |
| como aprobar examen teórico manejo caba | /blog/como-aprobar |
| qué significa línea amarilla en la calle | /lecciones/demarcacion-horizontal |
| colores de cordón vereda caba | /lecciones/demarcacion-horizontal |

### SEO técnico
- `title`, `meta description` y `og:image` únicos por página
- URLs limpias en español (`/lecciones/semaforos-y-luces`)
- Schema markup: `EducationalOrganization` + `Quiz`
- Sitemap.xml autogenerado por Next.js
- Contenido mínimo 800 palabras por lección
- Internal linking entre lecciones y juegos del tema
- Velocidad objetivo: <2 segundos (SSG + Vercel)

---

## 8. Fase 2 — Canal de YouTube + Remotion

### Concepto
Cada lección del sitio se convierte en un video de YouTube auto-generado. El canal complementa la web: YouTube trae tráfico → la web retiene y gamifica → más tiempo → más SEO → más ads → más Pro.

### Stack de producción de videos

| Componente | Herramienta |
|---|---|
| Guión | Contenido de las lecciones MDX (ya escrito) |
| Narración | Edge TTS (español nativo, gratis) |
| Renderizado | Remotion (React, programático) |
| Subtítulos | Whisper (auto-generados) |
| Estilo visual | Animaciones con señales, textos, transiciones. Misma paleta de colores que la web |
| Upload | Manual o automatizable con YouTube Data API |

### Videos planificados (1 por lección + extras)

| # | Video | Duración estimada |
|---|---|---|
| 1 | El conductor responsable: lo que nadie te dice | 5-7 min |
| 2 | Prioridad normativa: ¿quién manda en la calle? | 5-7 min |
| 3 | Semáforos: no es solo rojo, amarillo y verde | 5-7 min |
| 4 | Todas las señales reglamentarias explicadas | 8-10 min |
| 5 | Señales preventivas: las que te salvan la vida | 5-7 min |
| 6 | Señales informativas: las que nadie mira | 4-6 min |
| 7 | Demarcación horizontal: líneas y cordones | 5-7 min |
| 8 | Prioridad de paso: ¿quién pasa primero? | 6-8 min |
| 9 | Giros y adelantamiento sin cometer infracciones | 5-7 min |
| 10 | Velocidades máximas y mínimas en Argentina | 4-6 min |
| 11 | Estacionamiento: paralelo, 45° y 90° | 5-7 min |
| 12 | Conducción en lluvia, niebla y autopistas | 5-7 min |
| 13 | 10 preguntas que SIEMPRE caen en el examen | 8-10 min |
| 14 | Simulacro completo del examen teórico CABA | 15-20 min |

### Template de Remotion
- Intro con logo Manejate (3 seg)
- Título del tema con animación
- Contenido: texto animado + señales SVG + transiciones
- Dato clave: highlight visual
- Cierre: "Practicá gratis en manejate.com.ar" + CTA suscribirse
- Outro con preview del siguiente video

### Estrategia de canal
- Nombre: "Manejate" (consistente con la web)
- Descripción: link a la web en todas partes
- Cada video: link a la lección correspondiente en la descripción
- Subir 2-3 videos por semana (son auto-generados)
- Thumbnails: señal de tránsito grande + texto corto + fondo de color contrastante

---

## 9. Fuente de contenido

**IMPORTANTE: Todo el contenido educativo sale exclusivamente de:**
- Manual del Conductor CABA 2019 (190 páginas) — `Desktop/manual-transito-caba.pdf`
- Resumen extraído — `Desktop/proyecto-youtube-reddit/docs/manual-transito-resumen.txt`
- Ley 2148 de CABA (Código de Tránsito y Transporte)

**NUNCA se inventa contenido de tránsito.** Si un dato no está en el manual o la ley, no se incluye. Es un tema de seguridad vial donde la información incorrecta puede causar accidentes.

---

## 10. Métricas de éxito

| Métrica | Objetivo mes 1 | Objetivo mes 3 | Objetivo mes 6 |
|---|---|---|---|
| Visitas únicas/mes | 1.000 | 5.000 | 20.000 |
| Páginas por sesión | 3+ | 4+ | 5+ |
| Tiempo en sitio | 3 min | 5 min | 7 min |
| Tasa de rebote | <60% | <50% | <40% |
| Suscriptores Pro | 0 | 20 | 100 |
| Ingresos ads/mes | $5 USD | $30 USD | $150 USD |
| Suscriptores YouTube | 0 | 500 | 2.000 |
