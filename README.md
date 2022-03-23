# Clon de Jira

Utilizando NextJS con TypeScript, Context API, MaterialUI, MongoDB y Docker.

Para correr MongoDB con Docker:

```
docker-compose up -d
```

- -d significa _detached_
- Se excluye en el .gitignore la carpeta mongo/ creada por Docker para la persistencia de datos

MongoDB URI local:

```
mongodb://localhost:27017/jira-app
```

## APIs

Llenar la db con datos de prueba

```
http://localhost:3000/api/seed
```

Para las entradas:

```
http://localhost:3000/api/entries
```

- **GET**: Para obtener todas las entradas
- **POST**: Crear una nueva

```
http://localhost:3000/api/entries/:id
```

- **PUT**: Actualizar entrada por su id
- **GET**: Obtener una
