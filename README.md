# KCSolution - Sistema de Gestión de Pedidos

Sistema web completo para la gestión de pedidos, clientes y productos desarrollado con tecnologías modernas.

## 🚀 Tecnologías Utilizadas

### Backend
- **ASP.NET Core 8.0** - Web API
- **Entity Framework Core** - ORM
- **SQL Server** - Base de datos
- **MediatR** - CQRS Pattern
- **FluentValidation** - Validaciones
- **AutoMapper** - Mapeo de objetos

### Frontend
- **React 18** - Framework de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool
- **React Hook Form** - Manejo de formularios
- **Yup** - Validaciones del frontend
- **Axios** - Cliente HTTP

### DevOps
- **Docker** - Containerización
- **Docker Compose** - Orquestación
- **Nginx** - Servidor web para producción

## 📁 Estructura del Proyecto

```
KSSolution/
├── KCSolution.API/              # Web API
├── KCSolution.Application/      # Lógica de aplicación (CQRS)
├── KCSolution.Domain/           # Entidades de dominio
├── KCSolution.Infrastructure/   # Acceso a datos
├── KCSolution.Common/           # Utilidades comunes
├── KCSolutions.Application.Shared/ # DTOs compartidos
├── kcsolution.frontend/         # Aplicación React
├── docker-compose.yml           # Orquestación para producción
├── docker-compose.dev.yml       # Orquestación para desarrollo
└── README.md
```

## 🏗️ Arquitectura

El proyecto sigue los principios de **Clean Architecture** y **Domain Driven Design**:

- **Domain Layer**: Entidades de negocio y reglas de dominio
- **Application Layer**: Casos de uso, CQRS con MediatR
- **Infrastructure Layer**: Implementación de repositorios y servicios externos
- **Presentation Layer**: Web API y Frontend React

## 📊 Modelo de Datos

### Entidades Principales
- **Cliente**: Información de clientes
- **Producto**: Catálogo de productos
- **Pedido**: Órdenes de compra
- **DetallePedido**: Líneas de productos en cada pedido

## 🚀 Instalación y Configuración

### Prerrequisitos
- .NET 8.0 SDK
- Node.js 18+
- SQL Server (LocalDB o instancia completa)
- Docker (opcional)

### Configuración Local

#### Backend
```bash
cd KCSolution.API
dotnet restore
dotnet ef database update
dotnet run
```

#### Frontend
```bash
cd kcsolution.frontend
npm install
npm run dev
```

### Configuración con Docker

#### Desarrollo
```bash
docker-compose -f docker-compose.dev.yml up --build
```

#### Producción
```bash
docker-compose up --build
```

## 🌐 URLs de Acceso

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **Swagger UI**: http://localhost:8080/swagger

## 📋 Funcionalidades

### ✅ Implementadas
- [x] Gestión de clientes (CRUD)
- [x] Gestión de productos (CRUD)
- [x] Gestión de pedidos (CRUD)
- [x] Cálculo automático de totales
- [x] Validaciones en frontend y backend
- [x] Interfaz responsive
- [x] Arquitectura limpia con CQRS
- [x] Containerización con Docker

### 🔄 En Desarrollo
- [ ] Autenticación y autorización
- [ ] Reportes y estadísticas
- [ ] Notificaciones
- [ ] Tests unitarios e integración
- [ ] CI/CD Pipeline

## 🛠️ Scripts Disponibles

### Backend
```bash
dotnet build                 # Compilar
dotnet test                  # Ejecutar tests
dotnet ef migrations add     # Crear migración
dotnet ef database update    # Actualizar BD
```

### Frontend
```bash
npm run dev                  # Desarrollo
npm run build               # Compilar para producción
npm run preview             # Vista previa de producción
npm run lint                # Linter
```

## 🐳 Docker Commands

```bash
# Desarrollo
docker-compose -f docker-compose.dev.yml up --build

# Producción
docker-compose up --build

# Detener servicios
docker-compose down

# Ver logs
docker-compose logs -f [servicio]
```

## 📝 Variables de Entorno

### Backend
```
ASPNETCORE_ENVIRONMENT=Development|Production
ConnectionStrings__DefaultConnection=Server=...
```

### Frontend
```
VITE_API_URL=http://localhost:8080
NODE_ENV=development|production
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Kevin GTO** - [GTOKevin](https://github.com/GTOKevin)

## 📞 Contacto

Si tienes alguna pregunta o sugerencia, no dudes en contactarme:

- GitHub: [@GTOKevin](https://github.com/GTOKevin)
- Email: [tu-email@ejemplo.com]

---

⭐ ¡No olvides dar una estrella al proyecto si te ha sido útil!