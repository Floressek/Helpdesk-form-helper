# AI Form Assistant

Aplikacja wykorzystująca generatywną sztuczną inteligencję (Google Gemini) do pomocy użytkownikom w wypełnianiu formularza helpdesk. Użytkownicy mogą prowadzić konwersację z asystentem AI, który zbiera potrzebne informacje i wypełnia formularz.

## Technologie

### Backend:
- Django 5.2
- Django REST Framework
- Python 3.12+
- Google Generative AI API (Gemini)

### Frontend:
- React
- TypeScript
- Axios (komunikacja z API)
- React Router
- CSS (lub Tailwind/Material UI)

## Struktura projektu
```

project/
├── client/                  # Frontend React
├── server/                  # Backend Django
│   ├── DjangoProject/       # Konfiguracja Django
│   ├── api/                 # Aplikacja API
│   ├── chat/                # Aplikacja obsługująca czat
│   ├── form/                # Aplikacja obsługująca formularze
│   ├── manage.py
│   ├── pyproject.toml       # Zależności Poetry
│   └── .env                 # Zmienne środowiskowe (klucz API)
└── docker-compose.yml       # Konfiguracja konteneryzacji
```
## Funkcje

- Konwersacja z AI w interfejsie czatu
- Dynamiczne wypełnianie formularza na podstawie rozmowy
- Podgląd aktualnego stanu formularza w dowolnym momencie
- Walidacja pól formularza (format e-mail, długości pól itp.)
- Zapisywanie wypełnionego formularza w formacie JSON

## Wymagania

- Docker i Docker Compose
- Klucz API Google Gemini (do umieszczenia w pliku .env)

## Instalacja i uruchomienie

### Klonowanie repozytorium

```bash
git clone https://github.com/twoj-username/ai-form-assistant.git
cd ai-form-assistant
```

### Konfiguracja zmiennych środowiskowych

Utwórz plik `.env` w katalogu `server/` z następującą zawartością:

```
GEMINI_API_KEY=twoj-klucz-api
DEBUG=False
SECRET_KEY=twoj-tajny-klucz-django
ALLOWED_HOSTS=localhost,127.0.0.1
```


### Uruchomienie za pomocą Docker Compose

```shell script
docker-compose up --build
```


Aplikacja będzie dostępna pod adresem:
- Frontend: http://localhost:code
- Backend API: http://localhost:code/api/

## Użytkowanie

1. Otwórz aplikację w przeglądarce (http://localhost:3000)
2. Rozpocznij konwersację z asystentem AI, który będzie zadawać pytania potrzebne do wypełnienia formularza
3. Po wypełnieniu wszystkich pól formularz zostanie zapisany w formacie JSON
4. Możesz edytować formularz ręcznie lub kontynuować rozmowę z asystentem

## Struktura formularza

Formularz helpdesk zawiera następujące pola:
- Imię (string, max 20 znaków)
- Nazwisko (string, max 20 znaków)
- Email (string, walidacja formatu)
- Powód kontaktu (string, max 100 znaków)
- Pilność (liczba całkowita, zakres 1-10)

## Rozwój projektu

### Wymagania deweloperskie

Dla backendu (serwer Django):
```shell script
cd server
poetry install
```


Dla frontendu (aplikacja React):
```shell script
cd client
npm install
```


### Uruchamianie w trybie deweloperskim

Backend:
```shell script
cd server
poetry run python manage.py runserver
```


Frontend:
```shell script
cd client
npm start
```


## Pierwsze uruchomienie

Backend:
```shell script
cd server
python manage.py makemigrations
python manage.py migrate
poetry run python manage.py runserver
```


Frontend:
```shell script
cd client
npm install
```


## Budowa Dockera

Projekt zawiera pliki Dockerfile dla frontendu i backendu, a także docker-compose.yml do łatwego uruchamiania całej aplikacji.

## Autor

Szymon Florek

