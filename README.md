<div align="center">

  <img src="./public/brand/logo.png" alt="Rin no Mori Logo" width="160" height="160" style="border-radius: 50%;" />

  # 輪の森 · Rin no Mori
  ### *Pastelería Artesanal de Inspiración Japonesa & E-Commerce de Autor*

  <p align="center">
    Una experiencia culinaria y digital única que fusiona el arte de la repostería tradicional japonesa con un diseño web orgánico, cálido y minimalista (estética <i>wabi-sabi</i>).
  </p>

  <p align="center">
    <a href="#-características-destacadas">Características</a> •
    <a href="#-tecnologías">Stack Tecnológico</a> •
    <a href="#-capturas--experiencia-visual">Experiencia Visual</a> •
    <a href="#-arquitectura-del-proyecto">Arquitectura</a> •
    <a href="#-instalación-y-despliegue">Instalación</a> •
    <a href="#-variables-de-entorno">Configuración</a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 16" />
    <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 19" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Prisma_ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma ORM" />
    <img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
    <img src="https://img.shields.io/badge/Mercado_Pago-009EE3?style=for-the-badge&logo=mercadopago&logoColor=white" alt="Mercado Pago" />
  </p>
</div>

---

## 🍵 Sobre el Proyecto

**Rin no Mori** (輪の森 - *El Bosque en Armonía*) es una plataforma completa de comercio electrónico para una pastelería artesanal de alta gama inspirada en los sabores e ingredientes botánicos de Japón: té matcha ceremonial de Uji, té hojicha tostado, sésamo negro, flor de cerezo (sakura), cítrico yuzu y chocolate de origen.

Más que una tienda online convencional, el proyecto está concebido con una dirección de arte cuidada al detalle: bordes orgánicos con trazo hecho a mano mediante filtros SVG personalizados, animaciones táctiles fluidas, notas de cata sensoriales y un exclusivo **creador interactivo de cajas de regalo personalizadas**.

---

## ✨ Características Destacadas

### 🥮 1. Catálogo Sensorial & Ficha de Producto de Autor
* **Notas de Cata & Origen:** Cada producto incluye perfil de sabor, ingredientes seleccionados, alérgenos y valoración de clientes.
* **Filtros Dinámicos:** Exploración por categorías (*Regalos*, *Mini Pastelería*, *Eventos*, *Postres*) y etiquetas (*Bestseller*, *Orgánico*, *Vegano*).
* **Buscador Rápido:** Modal interactivo para encontrar delicias al instante con autocompletado y atajos de teclado.

### 🎁 2. Creador Interactivo de Cajas de Regalo (`/personalizar`)
* **Arma tu propia caja:** Elige entre cajas de 6, 12 o 24 piezas.
* **Surtido personalizado:** Selección visual pieza por pieza con control de capacidad en tiempo real.
* **Detalles artesanales:** Elección del color de lazo, temática aromática y dedicatoria personalizada impresa con tipografía japonesa.

### 🛍️ 3. Carrito Dinámico & Checkout Multicanal
* **Persistencia total:** Carrito interactivo con actualización en tiempo real de subtotales, envío y opciones de regalo.
* **Pasarela Mercado Pago:** Integración lista para producción con generación de preferencias y recepción de webhooks.
* **Simulador Sandbox (Dummy Checkout):** Entorno de pruebas integrado para testear el ciclo completo de órdenes sin necesidad de tarjetas reales en desarrollo.

### 🔐 4. Autenticación, Favoritos y Área de Cliente
* **NextAuth v5 (Auth.js):** Registro e inicio de sesión seguros con encriptación bcrypt.
* **Lista de Favoritos en Tiempo Real:** Guarda y sincroniza postres favoritos con un solo clic.
* **Panel de Cuenta (`/cuenta`):** Historial detallado de pedidos anteriores, direcciones guardadas y estado de órdenes.

### 📊 5. Panel Administrativo Integral (`/admin`)
* **Gestor de Productos:** Creación, edición, control de stock, precios, imágenes y activación/desactivación de catálogo.
* **Control de Pedidos en Vivo:** Gestión de estados en ciclo de vida completo (`PENDIENTE` ➔ `PAGADO` ➔ `EN_PREPARACION` ➔ `ENVIADO` ➔ `ENTREGADO` ➔ `CANCELADO`).
* **Directorio de Clientes:** Métricas de compradores, consumo recurrente y datos de contacto.

### 🎨 6. Diseño Wabi-Sabi & Experiencia Móvil
* **Estilo Artesanal Hand-Drawn:** Filtros SVG que proporcionan a los contenedores y botones un contorno orgánico simulando trazo de pincel japonés.
* **Navegación Móvil Adaptativa:** Menú inferior fijo (`BottomNav`) para una experiencia nativa en smartphones.
* **Canal Directo de WhatsApp:** Botón flotante para pedidos corporativos o atención personalizada.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnologías |
| :--- | :--- |
| **Frontend** | [Next.js 16](https://nextjs.org/) (App Router), [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/) |
| **Estilos & Animaciones** | [Tailwind CSS v4](https://tailwindcss.com/), [Motion (Framer Motion)](https://motion.dev/), Lucide Icons, Shadcn UI / Radix UI |
| **Base de Datos & ORM** | [PostgreSQL](https://www.postgresql.org/), [Prisma ORM v7](https://www.prisma.io/) con soporte PG Adapter |
| **Autenticación** | [NextAuth v5 / Auth.js](https://authjs.dev/), Bcryptjs para hashing de contraseñas |
| **Pagos** | [Mercado Pago SDK](https://www.mercadopago.com.mx/developers) + Dummy Gateway para Sandbox |
| **Validación & Datos** | [Zod](https://zod.dev/), Server Actions seguras, Route Handlers |

---

## 📂 Arquitectura del Proyecto

```text
rin-no-mori/
├── prisma/
│   ├── schema.prisma          # Modelos de BD (User, Product, Order, GiftBox, etc.)
│   ├── seed.ts                # Semilla de catálogo, usuarios y categorías iniciales
│   └── migrations/            # Historial de migraciones SQL
├── public/
│   └── brand/                 # Logotipos, mascotas, hojas botánicas e ilustraciones
├── src/
│   ├── app/
│   │   ├── (auth)/            # Rutas de Login y Registro
│   │   ├── actions/           # Server Actions (checkout, favoritos, admin)
│   │   ├── admin/             # Panel backoffice (productos, pedidos, clientes)
│   │   ├── api/               # Webhooks de Mercado Pago y rutas de Auth
│   │   ├── carrito/           # Vista completa del carrito de compras
│   │   ├── catalogo/          # Explorador de productos con filtros
│   │   ├── checkout/          # Flujo de pago, éxito y simulador dummy
│   │   ├── cuenta/            # Perfil de usuario e historial
│   │   ├── favoritos/         # Lista de deseos sincronizada
│   │   ├── personalizar/      # Box Builder interactivo de cajas de regalo
│   │   ├── productos/[slug]/  # Detalle de producto y notas sensoriales
│   │   ├── globals.css        # Variables estéticas, filtros SVG y temas
│   │   ├── layout.tsx         # Layout principal con navegación y proveedores
│   │   └── page.tsx           # Landing page interactiva
│   ├── components/
│   │   ├── brand/             # Elementos de marca (Logo, Mascota, Hojas)
│   │   ├── layout/            # Header, Footer, Navegación
│   │   ├── products/          # Cards de producto con badges y animaciones
│   │   └── ui/                # Componentes accesibles base (dialog, badge, etc.)
│   ├── context/               # Proveedores de estado (CartContext, AuthProvider)
│   ├── data/                  # Datos semilla y catálogo inicial
│   ├── lib/                   # Clientes de Prisma, utilidades y configuración auth
│   └── types.ts               # Tipado TypeScript del dominio
```

---

## 🚀 Instalación y Despliegue Local

### 1. Prerrequisitos
* **Node.js** v20 o superior
* **PostgreSQL** instalado o una base de datos en la nube (ej. Supabase, Neon, Railway)

### 2. Clonar el repositorio
```bash
git clone https://github.com/Miguelin-Luna/Rin-no-mori.git
cd Rin-no-mori
```

### 3. Instalar dependencias
```bash
npm install
```

### 4. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto a partir de la siguiente plantilla:

```env
# Conexión a Base de Datos PostgreSQL
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/rin_no_mori?schema=public"

# NextAuth / Auth.js
NEXTAUTH_SECRET="tu-clave-secreta-aleatoria-aqui"
NEXTAUTH_URL="http://localhost:3000"

# Pasarela de Pagos (Mercado Pago)
MERCADOPAGO_ACCESS_TOKEN="TEST-tu-access-token-de-mercadopago"
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY="TEST-tu-public-key"

# URL Base de la aplicación
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 5. Configurar y poblar la Base de Datos
Ejecuta las migraciones de Prisma y carga el catálogo inicial con la semilla:

```bash
# Aplicar migraciones a PostgreSQL
npx prisma migrate dev --name init

# Poblar con productos, categorías y usuarios de prueba
npm run prisma:seed # o: npx tsx prisma/seed.ts
```

### 6. Iniciar el servidor de desarrollo
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la tienda en funcionamiento.

---

## 🍵 Credenciales de Prueba por Defecto

Tras ejecutar la semilla (`seed.ts`), tendrás acceso a las siguientes cuentas de prueba:

* **Administrador:**
  * **Email:** `admin@rinnomori.com`
  * **Contraseña:** `Admin123!`
  * **Acceso:** [http://localhost:3000/admin](http://localhost:3000/admin)

* **Cliente:**
  * **Email:** `cliente@rinnomori.com`
  * **Contraseña:** `Cliente123!`

---

## 🤝 Contribución y Créditos

Desarrollado con dedicación y pasión por la artesanía japonesa por **[Miguelin Luna](https://github.com/Miguelin-Luna)**.

Las sugerencias, *pull requests* y comentarios son siempre bienvenidos. Si te gusta el proyecto, ¡no olvides dejarle una ⭐ al repositorio!
