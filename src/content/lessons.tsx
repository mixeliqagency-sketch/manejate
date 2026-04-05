// === CONTENIDO DE LECCIONES ===
// Contenido real basado en el Manual del Conductor CABA 2019.
// Cada lección tiene: content (JSX), metadatos de quiz incluidos en quiz.json.
// Fuente: Manual del Conductor IF-2019-22993784-GCABA-DGHCT

import type { ReactNode } from 'react'
import KeyFact from '@/components/lecciones/KeyFact'

// --- Tipo de contenido de lección ---
export interface LessonContent {
  slug: string
  content: ReactNode
}

// === LECCIÓN 1: El conductor responsable ===
const lessonElConductorResponsable: LessonContent = {
  slug: 'el-conductor-responsable',
  content: (
    <div className="prose-lesson">
      <p>
        Conducir es una responsabilidad que va más allá de saber manejar un vehículo. Involucra el estado físico y mental del conductor, su actitud y el respeto por los demás usuarios de la vía.
      </p>

      <h2>Cinturón de seguridad</h2>
      <p>
        El uso del cinturón de seguridad es obligatorio para todos los ocupantes del vehículo, tanto el conductor como los acompañantes, en todos los asientos. El cinturón debe ajustarse <strong>antes de poner el vehículo en marcha</strong>.
      </p>

      <KeyFact type="danger" title="Obligación legal">
        El cinturón de seguridad debe abrocharse antes de arrancar el vehículo. Intentar abrochárselo mientras se conduce es una distracción peligrosa que está prohibida.
      </KeyFact>

      <h2>Uso del celular al volante</h2>
      <p>
        El uso del teléfono celular al conducir es una de las principales causas de distracciones al volante. Esto incluye:
      </p>
      <ul>
        <li>Manipular el teléfono directamente</li>
        <li>Hablar con altavoz o auriculares</li>
        <li>Leer o escribir mensajes</li>
      </ul>

      <KeyFact type="warning" title="Importante">
        Incluso hablar por teléfono con altavoz es peligroso. La distracción cognitiva persiste aunque tengamos las manos libres, ya que la mente deja de estar 100% enfocada en el tránsito.
      </KeyFact>

      <p>Consejos para evitar el uso del celular al conducir:</p>
      <ul>
        <li>Apagar el celular antes de arrancar</li>
        <li>Ponerlo en modo avión</li>
        <li>Guardarlo en la guantera o el baúl</li>
        <li>Pedir a un acompañante que atienda los llamados</li>
      </ul>
      <p>
        Si esperás una llamada urgente, debés colocar las balizas (luces intermitentes de emergencia) y detenerte en un lugar permitido antes de atender.
      </p>

      <h2>Alcohol y conducción</h2>
      <p>
        El alcohol afecta el sistema nervioso central y deteriora las capacidades necesarias para conducir de forma segura: tiempo de reacción, coordinación, juicio y percepción del riesgo.
      </p>

      <KeyFact type="danger" title="Tolerancia cero en CABA">
        La Ley 2148 de CABA establece que el conductor no puede conducir bajo los efectos del alcohol. Para conductores profesionales y menores de 18 años, la tolerancia es cero (0,0 g/l). Para el resto de los conductores, el límite es 0,5 g/l de alcohol en sangre.
      </KeyFact>

      <h2>Otras distracciones</h2>
      <p>
        Existen muchas acciones que no deben realizarse mientras se conduce porque distraen al conductor y ponen en riesgo a todos los usuarios de la vía:
      </p>
      <ul>
        <li>Cambiar de radio o CD</li>
        <li>Mirar un DVD portátil</li>
        <li>Maquillarse</li>
        <li>Mirar o hablar con los demás ocupantes</li>
        <li>Intentar quitarse un abrigo</li>
        <li>Estirarse para cerrar una puerta</li>
        <li>Buscar dinero antes de un peaje</li>
      </ul>

      <KeyFact type="info" title="Regla de oro">
        Todo lo que distrae la atención del conductor —aunque sea por un segundo— aumenta el riesgo de accidente. A 60 km/h, 1 segundo equivale a 16,7 metros recorridos sin mirar la ruta.
      </KeyFact>

      <h2>Estado psicofísico del conductor</h2>
      <p>
        El conductor debe estar en condiciones óptimas físicas y mentales para manejar. El cansancio, el sueño, el estrés o el efecto de medicamentos pueden afectar gravemente la capacidad de conducir de forma segura.
      </p>
    </div>
  ),
}

// === LECCIÓN 2: Prioridad normativa ===
const lessonPrioridadNormativa: LessonContent = {
  slug: 'prioridad-normativa',
  content: (
    <div className="prose-lesson">
      <p>
        La Ley 2148 de la Ciudad Autónoma de Buenos Aires establece un <strong>orden de prioridad normativo</strong>. Esto significa que cuando existan indicaciones contradictorias, el conductor debe respetar aquella que tenga mayor prioridad según el siguiente orden.
      </p>

      <KeyFact type="info" title="¿Por qué existe un orden de prioridad?">
        A veces pueden surgir contradicciones en la vía: por ejemplo, el semáforo puede estar en verde pero un agente de tránsito indicar que hay que detenerse. En ese caso, prevalece la indicación del agente por sobre el semáforo.
      </KeyFact>

      <h2>1° Señales u órdenes de la autoridad de control</h2>
      <p>
        Las indicaciones de los agentes de tránsito, la Policía de la Ciudad, el personal autorizado de obra y el personal ferroviario están <strong>por encima de cualquier señalización</strong>.
      </p>
      <p>
        En CABA existe el Cuerpo de Agentes de Control de Tránsito y Seguridad Vial, responsable del ordenamiento del tránsito y el cumplimiento de las normas vigentes. Sus indicaciones siempre prevalecen.
      </p>

      <h2>2° Señales transitorias</h2>
      <p>
        Son señales temporales utilizadas para indicar trabajos de construcción o mantenimiento en la vía. Tienen <strong>prioridad sobre la señalización permanente</strong> porque informan sobre una situación de riesgo actual.
      </p>
      <p>
        Su <strong>color predominante es el naranja</strong>. Incluyen conos, vallas y carteles verticales con forma de rombo.
      </p>

      <KeyFact type="warning" title="Color naranja = señal transitoria">
        Cuando veas señales de color naranja en la vía, siempre tienen prioridad sobre los carteles permanentes. Respetá su indicación aunque parezca contradecir la señalización habitual.
      </KeyFact>

      <h2>3° Semáforos</h2>
      <p>
        Las señales luminosas regulan la circulación mediante colores, flechas o figuras. La luz puede ser continua o intermitente.
      </p>
      <ul>
        <li><strong>Luz roja:</strong> detenerse antes de la senda peatonal o la línea de detención</li>
        <li><strong>Luz roja intermitente:</strong> detener la marcha; reiniciar solo si no hay riesgo</li>
        <li><strong>Luz amarilla:</strong> detenerse si no se llega a cruzar la encrucijada antes del rojo</li>
        <li><strong>Luz amarilla intermitente:</strong> efectuar el cruce con precaución</li>
        <li><strong>Luz verde:</strong> habilitado para avanzar, verificando que haya espacio al otro lado</li>
      </ul>

      <KeyFact type="danger" title="Luz amarilla no es &quot;apurate&quot;">
        La luz amarilla significa DETENERSE si no llegás a cruzar antes del rojo. No significa acelerar. Muchos accidentes ocurren por conductores que aceleran al ver el amarillo.
      </KeyFact>

      <h2>4° Demarcación horizontal y señalización vertical</h2>
      <p>
        Incluye todas las marcas sobre la calzada (líneas, sendas, flechas, inscripciones) y los carteles colocados al costado de la vía o sobre ella.
      </p>
      <p>
        Ambas tienen el <strong>mismo nivel de prioridad</strong> y deben respetarse independientemente de cuál aparezca sola.
      </p>

      <h2>5° Normas legales de carácter general</h2>
      <p>
        Son las reglas que aplican cuando no hay ninguna señalización específica en la vía. En CABA, rigen las normas de la Ley 2148.
      </p>

      <KeyFact type="info" title="Resumen del orden de prioridad">
        <strong>1°</strong> Agente de control → <strong>2°</strong> Señales transitorias (naranja) → <strong>3°</strong> Semáforos → <strong>4°</strong> Señalización horizontal y vertical → <strong>5°</strong> Normas legales generales
      </KeyFact>
    </div>
  ),
}

// === LECCIÓN 3: Semáforos y luces ===
const lessonSemaforosYLuces: LessonContent = {
  slug: 'semaforos-y-luces',
  content: (
    <div className="prose-lesson">
      <p>
        Los semáforos y el sistema de luces del vehículo son herramientas fundamentales para la comunicación entre conductores, peatones y ciclistas. Conocerlos bien puede salvar vidas.
      </p>

      <h2>Tipos de semáforos</h2>
      <p>En CABA existen varios tipos de semáforos:</p>
      <ul>
        <li><strong>De tres tiempos (convencional):</strong> rojo, amarillo y verde</li>
        <li><strong>De giro a la izquierda:</strong> con flecha específica</li>
        <li><strong>Peatonales o para ciclistas</strong></li>
        <li><strong>Ferroviarios o de premetro</strong></li>
        <li><strong>De cambio de circulación:</strong> en vías reversibles</li>
        <li><strong>De salida de vehículos de emergencia, garaje</strong></li>
      </ul>

      <h2>Significado de cada color</h2>

      <KeyFact type="danger" title="Luz ROJA — Alto obligatorio">
        Detenerse completamente antes de la senda peatonal o la línea de detención. No se puede continuar hasta que cambie a verde.
      </KeyFact>

      <KeyFact type="warning" title="Luz AMARILLA — Preparar para detener">
        Si no llegás a cruzar la encrucijada (bocacalle) antes de que cambie a rojo, debés detenerte. Solo continuás si ya iniciaste el cruce con seguridad.
      </KeyFact>

      <KeyFact type="info" title="Luz VERDE — Avanzar con precaución">
        Estás habilitado para avanzar, pero antes verificá que no haya vehículos o peatones que hayan iniciado su paso antes del cambio de luz, y que haya espacio suficiente al otro lado sin obstruir la circulación transversal.
      </KeyFact>

      <h2>Luces intermitentes del semáforo</h2>
      <ul>
        <li><strong>Rojo intermitente:</strong> detenerse; reiniciar solo cuando no haya riesgo (similar a un PARE)</li>
        <li><strong>Amarillo intermitente:</strong> cruzar con precaución (no obliga a detenerse, pero exige reducir velocidad)</li>
      </ul>

      <h2>Luces del vehículo</h2>
      <p>
        Además de iluminar, las luces del vehículo son un sistema de comunicación con los demás usuarios de la vía.
      </p>

      <h3>Luces de posición</h3>
      <p>
        Indican la posición y el ancho del vehículo. <strong>Las delanteras son blancas o amarillas</strong> y las <strong>traseras rojas</strong>. El color informa sobre el sentido de marcha: blanco/amarillo = viene de frente; rojo = va en el mismo sentido.
      </p>

      <h3>Luces bajas</h3>
      <p>
        Obligatorias en condiciones de poca luz (lluvia, niebla, noche). En CABA, son <strong>obligatorias las 24 horas</strong> en autopistas, Av. Intendente Cantilo, Av. Leopoldo Lugones y Av. Gral. Paz. Los motovehículos deben usarlas siempre.
      </p>

      <h3>Luces altas</h3>
      <p>
        Prohibidas en zonas urbanas (excepto como luz de guiñada). Solo se usan en rutas poco iluminadas. Ante un vehículo que viene de frente con luces altas, hacer una guiñada para alertarlo y mirar hacia el borde del camino.
      </p>

      <KeyFact type="warning" title="Encandilamiento">
        La ceguera temporal por luces altas puede durar entre 4 y 7 segundos. A 60 km/h, eso equivale a más de 100 metros manejando sin ver correctamente.
      </KeyFact>

      <h3>Luces de giro (guiño)</h3>
      <p>
        Deben accionarse <strong>al menos 5 segundos antes</strong> de cambiar de carril, o <strong>30 metros antes</strong> de incorporarse a otra vía.
      </p>

      <h3>Balizas (luces intermitentes de emergencia)</h3>
      <p>
        Se activan al accionar ambas luces de giro simultáneamente. Se usan cuando el vehículo está detenido, próximo a una maniobra de detención, estacionamiento o en emergencia.
      </p>

      <KeyFact type="danger" title="Error común: balizas en niebla">
        No se deben usar las balizas mientras se circula en condiciones de niebla, ya que los demás conductores pueden creer que el vehículo está detenido, lo que aumenta el riesgo de colisión trasera.
      </KeyFact>

      <h3>Luces de retroceso</h3>
      <p>
        Son blancas y se encienden automáticamente al engranar la marcha atrás. Alertan que el vehículo circula hacia atrás.
      </p>

      <h2>Maniobras y el orden RSM</h2>
      <p>
        Para anticipar maniobras, existe un orden lógico y cronológico: <strong>R</strong>etrovisión → <strong>S</strong>eñal → <strong>M</strong>aniobra. Primero observar el entorno, luego señalizar, y por último ejecutar la acción.
      </p>
    </div>
  ),
}

// === LECCIONES PLACEHOLDER (4-12) ===
// Contenido resumido para las lecciones que aún no tienen contenido completo.

function makePlaceholderLesson(slug: string, title: string, icon: string): LessonContent {
  return {
    slug,
    content: (
      <div className="prose-lesson">
        <KeyFact type="info" title="Contenido en desarrollo">
          Esta lección está siendo preparada con contenido detallado basado en el Manual del Conductor CABA 2019.
          Mientras tanto, podés practicar con los juegos y los exámenes disponibles.
        </KeyFact>
        <p>
          La lección <strong>{icon} {title}</strong> cubrirá todos los temas indicados según el manual oficial.
          Volvé pronto para acceder al contenido completo.
        </p>
      </div>
    ),
  }
}

// Mapa de todo el contenido disponible
const allLessons: LessonContent[] = [
  lessonElConductorResponsable,
  lessonPrioridadNormativa,
  lessonSemaforosYLuces,
  makePlaceholderLesson('senales-reglamentarias', 'Señales reglamentarias', '🚫'),
  makePlaceholderLesson('senales-preventivas', 'Señales preventivas', '⚠️'),
  makePlaceholderLesson('senales-informativas', 'Señales informativas', 'ℹ️'),
  makePlaceholderLesson('demarcacion-horizontal', 'Demarcación horizontal', '🛣️'),
  makePlaceholderLesson('prioridad-de-paso', 'Prioridad de paso', '🔄'),
  makePlaceholderLesson('giros-y-adelantamiento', 'Giros y adelantamiento', '↩️'),
  makePlaceholderLesson('velocidades', 'Velocidades', '🏎️'),
  makePlaceholderLesson('estacionamiento', 'Estacionamiento', '🅿️'),
  makePlaceholderLesson('conduccion-especial', 'Conducción especial', '🌧️'),
]

// Función para obtener el contenido de una lección por slug
export function getLessonContent(slug: string): LessonContent | null {
  return allLessons.find(l => l.slug === slug) ?? null
}
