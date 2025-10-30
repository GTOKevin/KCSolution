# KCSolution - Sistema de Gestión de Pedidos

## 📋 Instrucciones para Ejecutar el Proyecto

### Prerrequisitos
- .NET 8.0 SDK
- Node.js 18+
- SQL Server (LocalDB o instancia completa)
- Visual Studio 2022 o VS Code (recomendado)

### Configuración de Base de Datos
1. Asegúrate de tener SQL Server ejecutándose
2. Actualiza la cadena de conexión en `appsettings.json` si es necesario:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=DESKTOP-5V0UKL7\\SQLEXPRESS;Database=KCSolution;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

### Ejecución del Backend (.NET API)
```bash
# Navegar al directorio del API
cd KSSolution/KCSolution.API

# Restaurar paquetes NuGet
dotnet restore

# Aplicar migraciones de base de datos
dotnet ef database update

# Ejecutar la aplicación
dotnet run
```
La API estará disponible en: `https://localhost:5001` y `http://localhost:5000`

### Ejecución del Frontend (React)
```bash
# Navegar al directorio del frontend
cd KSSolution/kcsolution.frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```
La aplicación estará disponible en: `http://localhost:3000`

### Ejecución con Docker (Opcional)
```bash
# Desarrollo
docker-compose -f docker-compose.dev.yml up --build

# Producción
docker-compose up --build
```

### Datos de Prueba
Ejecuta los scripts SQL incluidos para poblar la base de datos:
- `seed_clientes.sql` - Datos de clientes
- `seed_productos.sql` - Datos de productos

## 🏗️ Arquitectura Elegida y Decisiones Técnicas

### Arquitectura General
El proyecto implementa **Clean Architecture** con **Domain Driven Design (DDD)**, organizando el código en capas bien definidas:

```
┌─────────────────────────────────────┐
│           Presentation              │
│    (KCSolution.API + Frontend)      │
├─────────────────────────────────────┤
│           Application               │
│     (KCSolution.Application)        │
├─────────────────────────────────────┤
│            Domain                   │
│      (KCSolution.Domain)            │
├─────────────────────────────────────┤
│         Infrastructure              │
│    (KCSolution.Infrastructure)      │
└─────────────────────────────────────┘
```

### Decisiones Técnicas del Backend

#### 1. **CQRS (Command Query Responsibility Segregation)**
- **Decisión**: Implementación de CQRS ligero con MediatR
- **Razón**: Separación clara entre operaciones de lectura y escritura, mejor escalabilidad y mantenibilidad
- **Implementación**: 
  - Commands para operaciones de escritura (Create, Update, Delete)
  - Queries para operaciones de lectura (Get, GetAll)

#### 2. **Entity Framework Core con Code First**
- **Decisión**: ORM con enfoque Code First
- **Razón**: Facilita el control de versiones de la base de datos y permite un desarrollo más ágil
- **Configuración**: Fluent API para configuraciones complejas

#### 3. **Patrón Repository**
- **Decisión**: Implementación del patrón Repository en la capa de Infrastructure
- **Razón**: Abstracción del acceso a datos, facilita testing y cambios de tecnología

#### 4. **Validaciones en Múltiples Capas**
- **Decisión**: FluentValidation en Application Layer + Data Annotations en Domain
- **Razón**: Validaciones robustas y reutilizables, separación de responsabilidades

### Decisiones Técnicas del Frontend

#### 1. **React con TypeScript**
- **Decisión**: React 18 + TypeScript + Vite
- **Razón**: Tipado estático, mejor experiencia de desarrollo, build rápido con Vite

#### 2. **Gestión de Estado Local**
- **Decisión**: React Hook Form + useState/useEffect
- **Razón**: Para la complejidad actual del proyecto, no se requiere Redux/Zustand

#### 3. **Validaciones del Cliente**
- **Decisión**: Yup para esquemas de validación
- **Razón**: Integración perfecta con React Hook Form, validaciones declarativas

#### 4. **Comunicación con API**
- **Decisión**: Axios con custom hooks
- **Razón**: Interceptors para manejo de errores, mejor control de requests

## 📦 Paquetes NuGet y Librerías Principales

### Backend (.NET 8)

#### **KCSolution.API**
```xml
<PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="8.0.0" />
<PackageReference Include="Swashbuckle.AspNetCore" Version="6.4.0" />
<PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="8.0.0" />
```

#### **KCSolution.Application**
```xml
<PackageReference Include="MediatR" Version="12.2.0" />
<PackageReference Include="FluentValidation" Version="11.9.0" />
<PackageReference Include="FluentValidation.DependencyInjectionExtensions" Version="11.9.0" />
<PackageReference Include="AutoMapper" Version="12.0.1" />
<PackageReference Include="AutoMapper.Extensions.Microsoft.DependencyInjection" Version="12.0.1" />
```

#### **KCSolution.Infrastructure**
```xml
<PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="8.0.0" />
<PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="8.0.0" />
```

#### **KCSolution.Domain**
```xml
<PackageReference Include="System.ComponentModel.Annotations" Version="5.0.0" />
```

### Frontend (React + TypeScript)

#### **Dependencias Principales**
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "typescript": "~5.6.2",
  "vite": "^6.0.1"
}
```

#### **Gestión de Formularios y Validaciones**
```json
{
  "react-hook-form": "^7.53.2",
  "yup": "^1.4.0",
  "@hookform/resolvers": "^3.9.1"
}
```

#### **Comunicación HTTP**
```json
{
  "axios": "^1.7.9"
}
```

#### **Herramientas de Desarrollo**
```json
{
  "@vitejs/plugin-react": "^4.3.4",
  "eslint": "^9.15.0",
  "@typescript-eslint/eslint-plugin": "^8.15.0",
  "@typescript-eslint/parser": "^8.15.0"
}
```

### Justificación de Paquetes Seleccionados

#### **MediatR (12.2.0)**
- **Propósito**: Implementación del patrón Mediator para CQRS
- **Beneficio**: Desacoplamiento entre controladores y lógica de negocio

#### **FluentValidation (11.9.0)**
- **Propósito**: Validaciones fluidas y expresivas
- **Beneficio**: Validaciones complejas, reutilizables y testeable

#### **Entity Framework Core (8.0.0)**
- **Propósito**: ORM para acceso a datos
- **Beneficio**: Migrations, LINQ, change tracking automático

#### **AutoMapper (12.0.1)**
- **Propósito**: Mapeo automático entre entidades y DTOs
- **Beneficio**: Reduce código boilerplate, mapeos configurables

#### **React Hook Form (7.53.2)**
- **Propósito**: Gestión eficiente de formularios
- **Beneficio**: Menos re-renders, validaciones integradas, mejor performance

#### **Yup (1.4.0)**
- **Propósito**: Esquemas de validación para JavaScript
- **Beneficio**: Validaciones declarativas, integración con React Hook Form

#### **Axios (1.7.9)**
- **Propósito**: Cliente HTTP para JavaScript
- **Beneficio**: Interceptors, transformaciones automáticas, mejor manejo de errores