# Calculadora Clínica — Valores Normativos ENASEM 2012

Velocidad de marcha (4m) y fuerza de prensión manual para adultos mayores mexicanos.

**Autor:** Dr. Mario René Alvarado Lara  
**Datos:** ENASEM 2012, n = 1,102  
**Método:** LMS (BCCGo) con gamlss

---

## Instrucciones para publicar el sitio web

### Opción A: Vercel (recomendada, la más fácil)

#### Paso 1: Crear cuenta en GitHub
1. Ve a https://github.com y crea una cuenta (gratis)
2. Haz clic en **"New repository"**
3. Nombre: `calculadora-enasem`
4. Déjalo como **Public**
5. Haz clic en **"Create repository"**

#### Paso 2: Subir los archivos
En tu Mac, abre Terminal y ejecuta:

```bash
# Navegar a la carpeta del proyecto
cd ~/Documents/calculadora-enasem

# Inicializar git
git init
git add .
git commit -m "Calculadora clínica ENASEM 2012"

# Conectar con GitHub (reemplaza TU-USUARIO)
git remote add origin https://github.com/TU-USUARIO/calculadora-enasem.git
git branch -M main
git push -u origin main
```

#### Paso 3: Publicar en Vercel
1. Ve a https://vercel.com y haz clic en **"Sign Up"** → **"Continue with GitHub"**
2. Haz clic en **"Add New Project"**
3. Busca `calculadora-enasem` y haz clic en **"Import"**
4. Vercel detecta automáticamente que es un proyecto Vite
5. Haz clic en **"Deploy"**
6. En 30 segundos tendrás tu URL: `https://calculadora-enasem.vercel.app`

#### Paso 4 (opcional): Dominio personalizado
- Si compras un dominio (ej: `enasem-calculator.org` en https://namecheap.com, ~$10/año)
- En Vercel → Settings → Domains → agrega tu dominio
- Vercel configura HTTPS automáticamente

---

### Opción B: Netlify (alternativa igual de fácil)

1. Ve a https://app.netlify.com
2. Primero, en tu Mac ejecuta:
```bash
cd ~/Documents/calculadora-enasem
npm install
npm run build
```
3. Arrastra la carpeta `dist/` generada al área de Netlify
4. Listo — URL instantánea

---

### Para desarrollo local (probar antes de publicar)

```bash
cd ~/Documents/calculadora-enasem
npm install
npm run dev
```
Abre http://localhost:5173 en tu navegador.

---

## Estructura del proyecto

```
calculadora-enasem/
├── index.html          ← Página principal
├── package.json        ← Dependencias
├── vite.config.js      ← Configuración de Vite
├── README.md           ← Este archivo
└── src/
    ├── main.jsx        ← Punto de entrada
    └── App.jsx         ← Calculadora (todo el código)
```

## Citar como

Alvarado-Lara MR. Valores normativos por edad y sexo de la velocidad de la marcha y la fuerza de prensión en personas mayores mexicanas: análisis secundario del ENASEM 2012. Tesis de Maestría, Hospital General "Dr. Manuel Gea González", 2026.
