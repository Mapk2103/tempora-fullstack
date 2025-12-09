# Guía de Deployment - Témpora

## Problema: Frontend no se conecta al Backend

Si ves "Cargando productos..." infinitamente o error 404, es porque **Vercel no tiene configurada la variable de entorno** para conectarse al backend en Render.

## Solución: Configurar Variable de Entorno en Vercel

### Paso 1: Acceder a la configuración de Vercel

1. Ve a tu dashboard de Vercel: https://vercel.com/dashboard
2. Selecciona tu proyecto **tempora** (o como lo hayas nombrado)
3. Ve a **Settings** (Configuración)
4. En el menú lateral, selecciona **Environment Variables**

### Paso 2: Agregar la variable VITE_API_URL

1. En el campo **Key** (Nombre), escribe:
   ```
   VITE_API_URL
   ```

2. En el campo **Value** (Valor), escribe:
   ```
   https://tempora-fullstack.onrender.com/api
   ```

3. Selecciona los ambientes donde aplicará:
   - ✅ **Production**
   - ✅ **Preview** (opcional)
   - ✅ **Development** (opcional)

4. Haz clic en **Save** (Guardar)

### Paso 3: Re-deploy del Frontend

Después de agregar la variable de entorno, debes hacer un nuevo deploy:

**Opción A: Desde Vercel Dashboard**
1. Ve a la pestaña **Deployments**
2. Busca el último deployment
3. Haz clic en los tres puntos (⋯)
4. Selecciona **Redeploy**
5. Confirma el redeploy

**Opción B: Desde Git (Recomendado)**
1. Haz push de cualquier cambio al repositorio
2. Vercel automáticamente hará un nuevo deploy con las variables actualizadas

```bash
git add .
git commit -m "Update deployment configuration"
git push origin main
```

### Paso 4: Verificar que funcione

1. Espera 2-3 minutos a que el deploy termine
2. Ve a tu sitio: https://tempora.nexar.services
3. Navega a **Productos**
4. Deberías ver los productos cargándose correctamente

---

## Re-deploy del Backend en Render (Si es necesario)

Si también actualizaste el código del backend (CORS), necesitas hacer redeploy en Render:

1. Ve a tu dashboard de Render: https://dashboard.render.com/
2. Selecciona tu servicio **tempora-fullstack**
3. Haz clic en **Manual Deploy** → **Deploy latest commit**
4. O haz push al repositorio y Render se actualizará automáticamente

---

## Variables de Entorno Necesarias

### Frontend (Vercel)
```env
VITE_API_URL=https://tempora-fullstack.onrender.com/api
```

### Backend (Render)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://martinpeniaklam_db_user:Ekl3x9oadUJt2vA@temporadb.qa73gy1.mongodb.net/tempora_db?appName=TemporaDB
JWT_SECRET=tu_clave_secreta_aqui
JWT_EXPIRE=30d
```

**IMPORTANTE:** Estas variables ya deben estar configuradas en Render. Solo verifica que estén correctas.

---

## Troubleshooting

### Error: "Cargando productos..." infinito
- ✅ Verifica que `VITE_API_URL` esté configurada en Vercel
- ✅ Verifica que el backend esté activo en Render
- ✅ Abre la consola del navegador (F12) para ver errores

### Error: CORS
- ✅ Verifica que el backend tenga la configuración de CORS actualizada
- ✅ Redeploy el backend en Render

### Error: 404 en el backend
- ✅ Verifica que la URL del backend sea correcta
- ✅ Prueba la API directamente: https://tempora-fullstack.onrender.com/api/products

---

## Contacto

Si tienes problemas, revisa:
1. Los logs de Vercel (en la pestaña Deployments)
2. Los logs de Render (en tu dashboard de Render)
3. La consola del navegador (F12 → Console)
