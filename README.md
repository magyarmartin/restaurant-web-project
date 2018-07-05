# Dokumentáció

## Követelmények

### Célkitűzés
A project fő célja egy olyan (kitalált) étterem honlapjának elkészítése amit akár a valóságban is használhatna.
Fontos volt hogy hogy az információk megtekintése mellett a felhasználók bejelentkezés után leadhassák rendelésüket,
illetve az étteremtulajdonos belépés után nyomon tudja követni őket.

### Funkcionális elvárások
#### Felhasználói szemszögből
* Felhasználóként szeretném megnézni az oldal főoldalát, az étlapot és az étterem információs oldalát hogy megtudjam érdemes-e regisztrálni
* Szeretnék tudni regisztrálni
* Szeretnék tudni bejelentkezni
* Szeretnék tudni kijelentkezni
* Szeretném módosítani az adataimat
* Szeretnék rendelni és visszajelzést kapni ennek sikerességéről

#### Adminisztrátori szemszögből
* Szeretném elérni az összes funkciót amit a felhasználók is elérniek
* Ezen felül szeretném megtekinteni a beérkezett rendeléseket, és törölni a már teljesítetteket

### Nem funkcionális követelmények
* Felhasználóbarát, mobile-friendli ergonomikus design
* Gyors működés
* Biztonságos működés

### Szerepkörök
**vendég**: meg tudja tekinteni a főoldalt, az étlapot és az információs oldalt, tud regisztrálni, de rendelni nem tud

**felhasználó**: a vendék körét bővíti ki az adatok módosításának lehetőségével és ő már tud rendelni is

**adminisztrátor**: a felhasználó körét bővíti ki, megtekintheti az eddig leadott rendeléseket és törölhet közülük

### Használati esetek
![Használati esetek](docs/images/hasznalati_eset_diagram.jpg)
### Folyamatábra
![Rendelés folyamata](docs/images/folyamat_diagram.jpg)

## Tervezés

### Architectura terv
#### Oldaltérkép
Publikus:

- index
- aboutus
- menu
- signUp
- login

Felhasználó:

- index
- aboutus
- menu
  - rendelés leadása
- signUp
- login/logout

Admin:

- index
- aboutus
- menu
  - rendelés leadása
- signUp
- login/logout
- orders
  - rendelés törlése

#### Végpontok

* GET  / föoldal
* GET  /login bejelentkező oldal
* POST /login bejelentkezési adatok felküldése
* GET  /signUp regisztrációs oldal
* POST /signUp Regisztrációs adatok felküldése
* GET  /aboutus informásiós oldal
* GET  /menu étlap megtekintése
* POST /menu rendelés elküldése
* GET  /orders rendelések megtekintése
* POST /orders rendelés törlése

### Felhasználóifelület-modell
#### Oldalvázlatok

Főoldal
![Főoldal](docs/images/fooldal.png)
Rólunk
![Rólunk](docs/images/aboutus.jpg)
Étlap
![Étlap](docs/images/menu.jpg)
Rengelések
![Rendelések](docs/images/orders.jpg)
Regisztráció
![Regisztráció](docs/images/signup.jpg)

### Osztálymodell
![indexjs](docs/images/indexjs.jpg)

## Implementáció
### Fejlesztői környezet
Az alkalmazást a cloud9 fejlesztői környezet segítségével fejlesztettem
### Könyvtárstruktúra
- **docs** ide kerülnek a dokumentumok
  - **images** ide kerülnek a dokumentumokhoz tartozó képek
- **json** mivel ebben a beadandóban nem szabadott adatbázist használni a különböző adatokat json-okba mentettem amiket ide helyeztem el
- **node_modules** ide kerülnek a dependenciák. Az általam felhasznált dependenciák a következők: express, body-parser, hbs, md5
- **public** ide azok a statikus dolgok kerülnek mappákba szervezve amiket az oldalak el tudnak érni
  - **CSS**
  - **JS**
  - **images**
- **views** a különböző nézetek
- **test** a tesztek

## Tesztek
### Unit tesztek
Az index.test.js ellenőrzi az index.js-ben található fájlbeolvasó függvényket.
### Funkcionális tesztek
A functionalTest.js ellenőrzi hogy betölt-e a kezdőlap

## Felhasználói dokumentáció

### Telepítés
A program elérhető a (https://restaurant-web-project.herokuapp.com/) linken. Ha valaki mindenképpen telepíteni szeretné a gépére ahhoz git-re van szüksége.
Első körben telepíteni kell a git-et, majd parancssorba a *git clone https://github.com/martin4955/restaurant-web-project.git* parancsal lehet letölteni az aktuális mappába.
A futtatáshoz nodejs-re van szükség. Ennek letültése után a program az npm start parancsal futtatható.
### Használat
A felhasználó először a kezdőlapon találja magát. A bal felső sávban található regisztráció vagy belépés gombbal tud regisztrálni illetve belépni.
Ha rendelni szeretne akkor először regisztrálnia kell majd miután belépett az *Étlap* oldalon tud válogatni az aktuális ételek közül és a **+** jellel tudja hozzáadni a kosárhoz.
Ha végzett az ételek kiválasztásával akkor a küldés gombbal tudja leadni azokat. Ha valamelyik ételt mégsem kívánja megvenni, azt a szemetes gombbal törölheti.
Ha az összeset törölni szeretné, használja a törlés gombbot.
