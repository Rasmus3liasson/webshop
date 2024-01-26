## Beskrivning

Detta är en e-commerce sida där man kan handla kläder.

Fungerar att logga in på sitt konto för att inkludera sparade uppgifter i din order(endast email).

Kläderna tillhandanhålls från ett api av HM som finns att tillgå [här](https://rapidapi.com/apidojo/api/hm-hennes-mauritz/). Jag har gjort en mapp som innehåller mockad data från detta api då jag inte vill betala ifall requesten skulle överstiga den fria tillgången

Stripe är integerat och fungerar i en testmiljö så denna applikation tar 
<span style="text-decoration:underline">**inte**</span> emot några "riktiga pengar" om man skulle ange autentisk information i betalningsprocessen.

## Krav

En Docker engine i gång (Docker Desktop).

## Starta projekt

### Steg 1 : Klona repo

`git clone https://github.com/Rasmus3liasson/webshop.git`

### Steg 2 : Installera dependencies

`npm install`

### Steg 3 : Kör projektet wia docker-compose

`docker-compose up -d --build`

## Avsluta programmet

`docker-compose down`

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
