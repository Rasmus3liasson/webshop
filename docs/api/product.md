# API-dokumentation

Dokumentet ger detaljer om API-endpoints för GET-förfrågningar.

# `GET` Endpoints

## Produkter

- **Sökväg:** `/api/items`

### Beskrivning

Denna endpoint hämtar artikeldata för alla produkter.

### Förfrågan

Kräver ingen body i förfrågan

### Svar

#### Lyckat svar

- **Statuskod:** `200 OK`
  ```json
  {
    "itemData": "artikeldata"
  }
  ```

#### Misslyckat svar

```json
{
  "error": "Felmeddelande"
}
```

## Specifik Produkt

- **Sökväg:** `/api/items/[itemId]`

### Beskrivning

Denna endpoint hämtar artikeldata för enskild produkt.

### Förfrågan

Kräver ingen body i förfrågan

### Svar

#### Lyckat svar

- **Statuskod:** `200 OK`
  ```json
  {
    "itemData": "artikeldata"
  }
  ```

#### Misslyckat svar

```json
{
  "error": "Felmeddelande"
}
```

## Filtrering

- **Sökväg:** `/api/filter`

### Beskrivning

Denna endpoint hämtar filtrerings alternativ med bl.a kategori och färg.

### Förfrågan

Kräver ingen body i förfrågan

### Svar

#### Lyckat svar

- **Statuskod:** `200 OK`

  ```json
    "filterOptions": [
      {
        "code": "colors",
        "priority": 0,
        "category": false,
        "multiSelect": false,
        "visible": true,
        "values": [
          {"code": "beige", "count": 47, "selected": false},
        ]
      },
      {
        "code": "productTypes",
        "priority": 0,
        "category": false,
        "multiSelect": false,
        "visible": true,
        "values": [
          {"code": "Blazer", "count": 20, "selected": false},
        ]
      },
      {
        "code": "colorWithNames",
        "priority": 0,
        "category": false,
        "multiSelect": false,
        "visible": true,
        "values": [
          {"code": "black_000000", "count": 59, "selected": false},
        ]
      }
    ]
  ```

#### Misslyckat svar

```json
{
  "error": "Felmeddelande"
}
```
