# Zaawansowany interfejs użytkownika – To-Do App
**Realizacja:** Angular (wersja z Standalone Components i Signals)
>This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.5.


## 🔗 Linki
- [Design (Figma) Prototyp](https://www.figma.com/proto/350F65pB86AMl4kyUmAwIQ/Adrian_Kowal_ToDoAp?node-id=24-781&p=f&t=FMr1jvgyGFMgrhGn-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=24%3A781)


## 🛠 Wymagania techniczne

| Wymóg | Odpowiednik w środowisku Angular |
| :--- | :--- |
| **React 18 z hookami (bez klas)** | **Angular 18/19 (Standalone Components).** Zamiast hooków (`useState`) użyto nowoczesnych Sygnałów (Signals). |
| **TypeScript 5 w trybie strict** | **TypeScript wbudowany.** Projekt Angular posiada domyślnie włączony tryb *strict* w pliku `tsconfig.json`. |
|**Vite 5 jako bundler** | **Angular CLI (esbuild/Vite).** Angular CLI korzysta teraz z Vite i esbuild pod maską. Nie ma pliku `vite.config.ts`, ponieważ narzędzie zarządza budowaniem wewnętrznie przez `angular.json`. |
|**Brak bibliotek UI (czysty CSS)**  | **Czysty CSS.** Projekt wygenerowano z flagą `--style=css`.

## 📖 Dziennik Laboratoriów

### Lab 4: Komponenty i zarządzanie stanem

Wymagania zostały zrealizowane zgodnie ze wszystkimi wymogami funkcjonalnymi:
- operacje CRUD, 
- filtrowanie: Wszystkie/Aktywne/Ukończone, 
- licznik zadań

Główne koncepcje dydaktyczne, takie jak zarządzanie stanem, rozwiązywanie problemu *props drilling* czy typowanie, zostały odwzorowane przy użyciu natywnych wzorców architektury Angulara.

| Koncepcja / Wymóg (React) | Implementacja w projekcie (Angular) | Uzasadnienie architektoniczne |
| :--- | :--- | :--- |
| **Bundler (Vite 5)** | **Angular CLI (esbuild/Vite)** | Angular wewnętrznie korzysta z tych samych nowoczesnych narzędzi do budowania i serwowania deweloperskiego. |
| **Hooki funkcyjne (bez klas)** | **Standalone Components (Klasy)** | Nowoczesny Angular wykorzystuje komponenty Standalone (bez modułów ngModule), które pełnią tę samą funkcję co wyizolowane komponenty funkcyjne w React. |
| **Props (przekazywanie danych)** np. `todo`, `onToggle`| **Dekoratory `@Input()` i `@Output()`** | Zamiast przekazywać funkcje w dół jako *props*, użyto `EventEmitter` do emitowania zdarzeń z komponentu dziecka (`TodoItem`) do rodzica. |
| **Lokalny stan (`useState`)** | **Właściwości klasy / `signal()`** | Do zarządzania widocznością formularza czy wpisywanym tekstem użyto dwukierunkowego wiązania `[(ngModel)]` oraz prostych sygnałów. |
| **Złożony stan (`useReducer`)** | **Serwis (`TodoService`) z użyciem `signal()`** | Zamiast akcji (ADD, TOGGLE, DELETE) rozgłaszanych przez *dispatch*, użyto wstrzykiwanego Serwisu, który przechowuje listę zadań w reaktywnym `signal<Todo[]>`. |
|**Rozwiązanie *props drilling*** (`Context API`) | **Dependency Injection (Wstrzykiwanie zależności)** | Angular natywnie rozwiązuje problem *props drilling* poprzez wstrzykiwanie serwisów (DI) na poziomie głównego injectora (`providedIn: 'root'`). |
| **Stan wyliczany (`useMemo` / *derived state*)** | **Sygnały wyliczane (`computed()`)** | Zliczanie aktywnych zadań oraz logika filtrowania opiera się na wydajnym `computed()`, które przelicza się tylko przy mutacji stanu bazowego. |
| **Warunkowe stylowanie** np. `style={{...}}` | **Dyrektywy `[class.active]` oraz `[ngClass]`** | Osiągnięto wymóg wizualnego wyróżnienia aktywnego filtra natywnymi dyrektywami Angulara. |
| ***Persystencja danych (`useLocalStorage`)** | **Funkcja `effect()` + `localStorage`** | Wykorzystano natywny mechanizm reagowania na zmiany sygnałów w Angularze. Funkcja `effect()` w serwisie nasłuchuje zmian na liście i automatycznie serializuje stan do pamięci przeglądarki. |
| ***Animacje (Framer Motion)** | **Moduł `@angular/animations`** | Wykorzystano wbudowany silnik animacji. Zdefiniowano wyzwalacze `@listAnimation` z przejściami `:enter` (wjazd z góry) oraz `:leave` (wyjazd w prawo przy usunięciu). |
---


## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
