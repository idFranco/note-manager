# NoteManager

This project was created with [Angular CLI](https://github.com/angular/angular-cli) versión 19.0.7.

Contains the following components:

- [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
```bash
npm install idb
```

- [CryptoES](https://www.npmjs.com/package/crypto-es)
```bash
npm install crypto-es        
```

## Description

NoteManager is a web site application for note management. This allows users to create, list, and delete notes, as well as manage secret keys.
The information is stored in client-side database (IndexedDB) and encrypted (in some cases) with CryptoES.

## Project Structure:

### Principals components

- **LoginComponent**: Component for log in and credential management.
  - **CreateCredentialComponent**: Component to create a new credential.
  - **ChangeCredentialComponent**: Component to modify a credential.

- **AdministrationComponent**: Main component of the Management Notes.
  - **AddNoteComponent**: Component to add a new note.
  - **EditNoteModalComponent**: Component to edit note.
  - **ListNoteComponent**: Component to list all notes.

### Services

- **NoteService**: Service to notes management.
- **CredentialService**: Service to manage user credential.

### Infraestructure - Services

- **CryptoService**: Data encryption and decryption service.
- **IDBNoteService**: Service to interact with IndexedDB and extract notes.
- **IDBCredentialService**: Service to interact with IndexedDB and extract credentials.

### Guards

- **AuthGuard**: Protect routes with authentication request.
- **AuthSetPasswordGuard**: Protect routes associated with master password configuration.

## Project structure

```markdown
public/
src/
  app/
    components/
      administration/
        list-note/
        record-note/
          record/
      login/
        credential-administration/
          credential/
      shared/
    core/
      enums/
      guards/
      handlers/
      helpers/
      models/
      services/
    infraestructure/
      integration.cryptoES/
      persistence.indexedDB/
    material.imports.ts
    app.component.ts
    app.config.ts
    app.routes.ts
    environments/
  index.html
  main.ts
  styles.scss
.editorconfig
.gitignore
angular.json
package.json
```

## Configuration

### Enviroment variables

The enviroment variables are located in the path `src/environments/environment.ts` and `src/environments/environment.prod.ts`.

#### Configuration Enviroment

- `DATA_BASE_NAME`: Data Base name.
- `DATA_BASE_VERSION`: Data base version number.
- `DATA_BASE_STORE_NAME`: Entity name.
- `CRYPTO_SECRET_KEY`: Personal encryption key.

### Angular configuration

The Angular configuration is in the file `angular.json`.

## Avaible scripts

The following scripts are contained in the `package.json` file:

- `ng`: Run Angular CLI.
- `start`: Init the server development.
- `build`: Proyect build.
- `watch`: Proyect build in watch mode.

## Development server

To init development server, run:
```bash
ng serve
```
Once the server is running, open your browser and navigate to http://localhost:4200/. The application will automatically reload each time you modify any of the source files.

## 

## Additional resources


For more information about using the Angular CLI, including detailed command references, visit [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
