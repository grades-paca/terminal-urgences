# Terminal Urgences – Base Symfony + Vite (React + TS)

## Sommaire

1. [Contexte / Objectif du projet](#1-contexte--objectif-du-projet)
2. [Liens utiles](#2-liens-utiles)
3. [Technologies utilisées](#3-technologies-utilisées)
4. [Architecture technique](#4-architecture-technique)
5. [Installation initiale](#5-installation-initiale)
6. [Commandes Make courantes (essentielles)](#6-commandes-make-courantes-essentielles)
7. [Arborescence du projet](#7-arborescence-du-projet)
8. [Tests & Qualité](#8-tests--qualité)

---

## 1. Contexte / Objectif du projet

Ce projet est basé sur le dépôt [Dunglas/symfony-docker](https://github.com/dunglas/symfony-docker), adapté pour une application combinant un backend Symfony et un frontend TypeScript via Vite. Il fournit un environnement Dockerisé prêt à l'emploi, avec les outils nécessaires pour le développement, les tests et l'intégration continue.

> La documentation d'origine est conservée dans `docs/Dunglas.md`.

---

## 2. Liens utiles

* [Documentation Dunglas](docs/Dunglas.md)
* [Repo d'origine](https://github.com/dunglas/symfony-docker)
* [ViteBundle (Pentatrion)](https://github.com/Pentatrion/vite-bundle)

---

## 3. Technologies utilisées

### Backend – Symfony

* PHP >= 8.4.8
* Symfony 7.3
* API Platform
* CORS (Nelmio)
* Doctrine ORM (avec Nelmio Alice pour les fixtures)
* JWT Authentication (Lexik)
* Runtime FrankenPHP
* Redis (sessions, cache, lock distribué)

### Frontend – React + TypeScript (via Vite)

* React 19.1
* TypeScript 4.9
* Vite + vite-plugin-symfony
* React Router DOM 7.6
* @tanstack/react-query
* @tanstack/react-table
* Testing Library (DOM, React, User Event)
* TailwindCSS + Flowbite React
* Icônes : Lucide-react
* SCSS support via `sass`
* Alias de résolution JS/TS

---

### Environnement

* Docker (config dans `.docker/`)
* Makefile (dans `.make/`)
* Outils qualité :

    * ESLint
    * Prettier
    * GrumPHP
    * PHPStan
    * TwigCS
    * Codeception

---

## 4. Architecture technique

* Environnement **full Dockerisé** : API, BDD, Adminer, certif local
* **Backend Symfony** avec API Platform exposé en REST
* **Authentification JWT** (clé privée/publique générée automatiquement)
* **Base MariaDB** avec migration + jeux de données via Alice
* **Frontend React/TS** intégré à Symfony via Vite (dossier `assets/`)
* **HTTPS local** avec certificat racine installé
* **Qualité code** intégrée (GrumPHP, PHPStan, ESLint, Prettier, tests)
* Support Redis pour :

    * Sessions PHP centralisées (multi-instance)
    * Cache partagé (Redis adapter)
    * Locks distribués (Symfony Lock Component)

---

## 5. Installation initiale

### 1. Cloner le projet

```bash
git clone https://github.com/grades-paca/terminal-urgences
cd terminal-urgences
```

### 2. Fichiers d'environnement

Avant toute chose, pensez à copier les fichiers d'exemple d'environnement :

```bash
cp .env.dist .env
cp assets/.env.dist assets/.env
```

### 3. Lancer l’environnement de développement complet

```bash
make install-dev
```

Cette commande :

* Configure les hooks Git (`.hooks/`)
* Stoppe les services dev existants
* Rebuild et relance les conteneurs Docker pour le développement
* Réinitialise la base de données (`reset`, `migrate`, `alice:load`)
* Génère les clés JWT
* Crée un compte admin via `app:create-admin`
* Installe le certificat racine local pour HTTPS (macOS)
* Démarre un service Redis utilisé par Symfony (sessions/cache)

### 3. Accès aux interfaces et identifiants de test

* API (Swagger) : [https://terminal-urgence.localhost:8043/api/docs#](https://terminal-urgence.localhost:8043/api/docs#)
* Frontend : [https://terminal-urgence.localhost:8043/](https://terminal-urgence.localhost:8043/)
* Profiler Symfony : [https://terminal-urgence.localhost:8043/\_profiler/](https://terminal-urgence.localhost:8043/_profiler/)

### 4. Identifiants de test :

* Utilisateur : superAdmin
* Mot de passe : 123ADMIN321

---

## 6. Commandes Make courantes (essentielles)

| Commande                     | Description                                               |
| ---------------------------- | --------------------------------------------------------- |
| `make install-dev`           | Build + BDD + admin + certif : environnement complet prêt |
| `make sh` / `make bash`      | Accès au conteneur PHP (shell)                            |
| `make install-root-cert-dev` | Ajoute le certificat local pour le HTTPS                  |
| `make tscheck`               | Vérifie lint, types, format, tests TS                     |
| `make ts-fix`                | Applique correctifs ESLint + Prettier                     |
| `make test`                  | Exécute les tests backend Codeception                     |
| `make grum`                  | Lance tous les hooks de qualité (précommit)               |

> Pour toutes les commandes disponibles : `make help`

---

## 7. Arborescence du projet

```
terminal-urgences/
├── .docker/         
├── .github/
├── .hooks/          # Hooks Git
├── .make/           # Commandes Make personnalisées
├── assets/          # Code frontend React/TS (via Vite)
├── bin/
├── config/          # Config Symfony
├── docs/            # Documentation projet
├── frankenphp/      # Intégration runtime spécifique
├── migrations/      # Migrations Doctrine
├── public/          # Entrée publique Symfony
├── src/             # Code source Symfony
├── templates/       # Templates Twig
├── tests/           # Tests PHPUnit
```

---

## 8. Tests & Qualité

* ✅ **Codeception** : tests backend (`make test`)
* ✅ **Testing Library** : tests DOM/React dans `assets/src/__tests__`
* ✅ **GrumPHP** : vérification hooks (lint, test, phpstan, etc.)
* ✅ **ESLint + Prettier** : fix auto avec `make ts-fix`
* ✅ **TypeScript** : check complet avec `make tscheck`
* ✅ **Alice** : génération de données de test réalistes

---
