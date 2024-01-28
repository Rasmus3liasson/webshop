## Beskrivning

Detta är en e-commerce sida där man kan handla kläder.

Fungerar att logga in på sitt konto för att inkludera sparade uppgifter i din order(endast email).

Kläderna tillhandanhålls från ett api av HM som finns att tillgå [här](https://rapidapi.com/apidojo/api/hm-hennes-mauritz/). Jag har gjort en mapp som innehåller mockad data från detta api då jag inte vill betala ifall requesten skulle överstiga den fria tillgången

Stripe är integerat och fungerar i en testmiljö så denna applikation tar 
<span style="text-decoration:underline">**inte**</span> emot några "riktiga pengar" om man skulle ange autentisk information i betalningsprocessen.

# Deployad sida (Ingen databas för ordrar)
Deployad webbsida är hostad av netlify och hittas [här](https://webshopclothes.netlify.app/) 

# Projektet inkluderat med databas
Skulle du vilja ha egna värden så kan du använda `.env.example` och fylla i den med egna värden.

Annars finns konfiguration med Infisical att använda mina värden utan att behöva fixa egna. 

Guide för detta hittas [här](./docs/infisical.md)

## Krav

En Docker engine i gång (Docker Desktop).

## Starta projekt

### Steg 1 : Klona repo

```
git clone https://github.com/Rasmus3liasson/webshop.git
```

### Steg 2 : Installera dependencies

```
npm install
```

### Steg 3 : Kör projektet wia docker-compose
**Med egna värden:**

```
docker-compose up -d --build
```

**Med Infisical:**

```
infisical run -- docker-compose up -d --build
```


### Steg 4: Besök applikationen
Applikationen hittas på port [3000](http://localhost:3000/)

## Avsluta programmet

```
docker-compose down
```

## Api dokumentation

Dokumentation för api:er hittar ni i mappen [docs/api](./docs/api)

## Stripe betalning

Använd dessa testkort för betalningar:

- **CVC:** Valfritt tre-siffrigt nummer
- **Utgångsdatum:** Ange ett framtida datum

### <span style="color:#03fc7f"> Lyckad </span> transaktion

- **Kortnummer:** `4242 4242 4242 4242`

### <span style="color:#fc4e03"> Misslyckad </span> transaktion

- **Kortnummer:** `4000 0000 0000 0002`

## Använd egen Databas

Ändra MySQL-databasvärden i MySQL konfigurationen. För att använda egen databas lokalt. Anges inget värde till **MYSQL_USER** tilldelas det värdet **root** automatiskt.

    MYSQL_HOST=din_host (127.0.0.1)
    MYSQL_PORT=3306
    MYSQL_DATABASE=web_shop
    MYSQL_USER=ditt_mysql_användarnamn (default:root)
    MYSQL_ROOT_PASSWORD=ditt_mysql_lösenord

## Använd Docker-compose

Värderna för att köra genom docker-compose volymen i mappen

    MYSQL_HOST=din_host=db
    MYSQL_PORT=3306
    MYSQL_DATABASE=web_shop
    MYSQL_ROOT_PASSWORD=något_lösenord