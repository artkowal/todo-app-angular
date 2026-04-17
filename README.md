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

### Lab 7: Formularze i walidacja danych (Zod + Angular Reactive Forms)

Wdrożono wieloetapowy formularz rejestracji oparty o zaawansowane mechanizmy walidacji. Ponieważ projekt korzysta z ekosystemu Angulara, narzędzia z React Hook Form (RHF) zostały zastąpione ich odpowiednikami z `ReactiveFormsModule`, przy jednoczesnym zachowaniu pełnej zgodności z biblioteką **Zod** (zgodnie z wymogiem).

> 💡 Aby przejść do zaimplementowanego formularza i przetestować mechanizmy walidacji, otwórz lewy panel boczny aplikacji (Sidebar) i kliknij zakładkę **`Zarejestruj się`**.

| Wymóg / Koncepcja z React Hook Form | Realizacja w Angular + Zod | Uzasadnienie i efekt |
| :--- | :--- | :--- |
| **`useForm()` i persystencja danych** | **Nadrzędny `FormGroup` w kontrolerze** | Formularz nie gubi danych przy kliknięciu "Wstecz". Jeden obiekt `registrationForm` przetrzymuje podgrupy (Krok 1, 2, 3), symulując trwały stan z RHF. |
| **`register` / `Controller`** | **`formControlName` / `formGroup`** | Pola HTML są dyrektywami podpięte bezpośrednio do kontrolerów. |
| **Integracja z Zod i polskie błędy** | **Własny `zodValidator` (Adapter)** | Stworzono funkcję mapującą błędy Zoda (z `safeParse`) na obiekty błędów Angulara. Wszystkie komunikaty w `z.object()` są zdefiniowane po polsku. |
| **Funkcja Zod `refine()`** | **Walidacja na poziomie `FormGroup`** | Zastosowano `.refine()` do weryfikacji zgodności hasła i jego potwierdzenia w Kroku 1. Błąd poprawnie wyświetla się pod odpowiednim polem. |
| **Pola opcjonalne z Regexem** | **`z.string().optional().refine(...)`** | Numer telefonu w Kroku 2 nie blokuje formularza (jest opcjonalny), ale wpisanie choćby jednego znaku wymusza walidację Regexem (dokładnie 9 cyfr). |
| **`setError` (Obsługa błędów serwera)** | **Metoda `setErrors()` na polu** | Zaimplementowano symulację opóźnienia serwera. Po 1.5 sekundy, w przypadku "błędu 409", aplikacja cofa na Krok 1 i precyzyjnie nakłada błąd na pole `email` wywołując `.setErrors({ serverError: '...' })`. |
| **WCAG: Dostępność dla czytników** | **`aria-invalid`, `aria-describedby`, `role="alert"`** | Wdrożono standardy dostępności. Pola informują czytnik ekranu o błędach, a przycisk "Submit" otrzymuje `aria-busy="true"` podczas trwania sztucznego asynchronicznego zapytania. |

### Lab 6: Responsive Design - implementacja

| Wymóg / Narzędzie z Instrukcji | Realizacja w projekcie (Angular + Tailwind) | Uzasadnienie i efekt |
| :--- | :--- | :--- |
| **Podejście Mobile-first** | **Stylowanie domyślne dla mobile + `sm:`, `md:`, `lg:`** | Domyślne klasy (np. `hidden`, `flex-col`) formatują widok pod ekrany <768px. Modyfikatory (np. `sm:flex`, `lg:grid-cols-3`) poszerzają układ na większych urządzeniach. |
| **Collapsible navigation (hamburger menu)** | **`@Output()`, `EventEmitter` oraz Angular Signals** | Wprowadzono przycisk w komponencie `Header`, który przez event powiadamia `LayoutComponent`. Ten używa sygnału `isSidebarOpen` do ukrywania/wysuwania `mat-sidenav` na urządzeniach mobilnych. |
| **Fluid typography z `clamp()`** | **Zmienne CSS w `@layer base` zintegrowane w `tailwind.config.js`** | Zdefiniowano klasy takie jak `text-fluid-h1` czy `text-fluid-body`. Dzięki nim tekst skaluje się płynnie bez skoków typowych dla media queries. |
| **Responsywna siatka z `auto-fit`** | **Arbitrary values w Tailwind (`grid-cols-[...]`)** | W komponencie `StatsGrid` zastosowano właściwość `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`, co uniezależniło siatkę od sztywnych breakpointów. |
| **Kluczowe właściwości mediów** | **Klasy `aspect-square`, `aspect-video` i `object-cover`** | Dodano miniatury do zadań, które na telefonie wymuszają proporcje 1:1, a na desktopie 16:9, bez rozciągania samej grafiki. |
| ***Zadanie dodatkowe** | **Style druku za pomocą modyfikatora `@media print` (Tailwind `print:`)** | Zastosowano specjalne reguły (np. `print:!hidden`, `print:!ml-0`), które wyłączają na wydruku Sidebar, Header, animacje i cienie, formatując tablicę jako czysty dokument A4. |

## Lab 5: Biblioteki UI (Angular Material vs Tailwind CSS)

| Kryterium | Angular Material (MUI) | Tailwind CSS | Zwycięzca |
| :--- | :--- | :--- | :--- |
| **DX – szybkość startu** | Bardzo wysoka (gotowe, złożone komponenty) | Średnia (wymaga budowania komponentów od zera) | **Material** |
| **DX – czytelność kodu** | Wysoka (czysty HTML z semantycznymi tagami np. `<mat-card>`) | Niska (szablony HTML są bardzo długie od ilości klas) | **Material** |
| **Bundle size (prod)** | Większy (pobieramy silnik i style komponentów) | Minimalny (kompilator usuwa nieużywane klasy CSS) | **Tailwind** |
| **Customizacja stylów** | Uciążliwa (wymaga nadpisywania głębokich klas `::ng-deep`) | Pełna swoboda (zmieniamy każdą właściwość w locie) | **Tailwind** |
| **Wsparcie dla TypeScript** | Znakomite (silnie typowane Inputs/Outputs i walidacja danych) | Brak (Tailwind operuje tylko na stringach w klasach HTML) | **Material** |
| **Dostępność (a11y) out-of-box**| Doskonała (wbudowane ARIA, obsługa klawiatury) | Brak (wymaga ręcznego dodawania atrybutów ARIA) | **Material** |
| **Responsive design** | Wymaga użycia dodatkowych modułów lub własnego CSS | Wbudowany, bardzo intuicyjny (prefiksy `md:`, `lg:`) | **Tailwind** |
| **Theming / design tokens** | Globalny theme narzucający styl całej aplikacji | Globalne zmienne konfigurowane w `tailwind.config.js` | **Remis** |
| **Krzywa uczenia się** | Średnia (wymaga poznania API frameworka i jego specyficznych tagów) | Średnia (wymaga świetnej znajomości CSS i zapamiętania nazw klas) | **Remis** |
| **Integracja z Figma / DS** | Ograniczona (gotowe UI Kity, ale oporne na customowe Design Systemy) | Znakomita (idealne mapowanie tokenów z Figmy 1:1 do pliku konfiguracyjnego) | **Tailwind** |

### Kluczowe spostrzeżenia

> Kiedy wybrać Material / Angular Material? 

Kiedy jest nacisk na bardzo szybkie dowiezienie projektu, panelu administracyjnego itd. Jest to idealne rozwiązanie, gdy nie mamy dedykowanego designera, a chcemy mieć pewność, że aplikacja będzie spójna, dostępna (a11y) i łatwa w obsłudze dla użytkownika. 

> Kiedy wybrać Tailwind CSS?

Kiedy budujemy unikalny, customowy interfejs zaprojektowany od zera przez designera np. w Figmie. Daje 100% kontroli nad wyglądem.

> Kiedy łączyć obie biblioteki?

Główny powtarzalny layout gdzie opieramy się na komponentach Material. Skomplikowane/unikalne elementy wewnątrz aplikacji budujemy za pomocą Tailwinda. Zyskujemy szybkość pisania CSS bez wychodzienia z pliku HTML.

---

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
