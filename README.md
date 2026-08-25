# EN
# Project Portfolio - Vue.js
### My personal full-stack portfolio website. Main technologies: Vue.js and FastAPI

### Project Diet
<p align="center">
   <img width="100%" align="left" alt="photo" src="https://github.com/1ChaLLengeR1/1ChaLLengeR1/blob/main/images/arturscibor.png" />
</p>

- link to the page: https://arturscibor.pl/

# Project idea:
###### When I built this project I wanted a website about myself, and a chance to learn a new backend language. I chose Python (FastAPI), because in college I had lectures and classes about Python. Django and Flask were the other candidates - Django felt too large for this scope, Flask too minimal for what I wanted to build. FastAPI won on performance, being the newest of the three, and its documentation. The main goal was to build my own site on top of tools I actually wanted to learn well.

# What the project presents:
The site is about me, split into a few sections, each backed by its own REST API domain (see `docs/rest_api_docs.json`). Home shows a rotating photo gallery and info about me, with a CV download. Work lists the companies I've worked at and my positions there. Tools shows the skills I use, with a progress bar per skill. Projects is a gallery of everything I've built, each with its own case-study page (image gallery, description, technologies, links). Contact is a message form to reach me directly. Everything is manageable from a JWT-protected admin panel - adding, editing, removing entries in every section above, including image uploads.

# Architecture:
The frontend talks to the backend through a typed, per-domain layer: `src/api/<domain>/` (public + `admin/`) wraps the REST calls, `src/storage/<domain>/` (Vuex) holds the app state built on top of it. File uploads (CV, photos, project galleries, tool/company logos) share one handshake: `init -> upload bytes -> confirm -> attach`, implemented once in `src/storage/common/fileUpload.ts` and reused by every domain that needs it. UI text is bilingual (PL/EN) via `vue-i18n`. Design notes for each section's migration live in `docs/*.md`.

# Technologies:
### Frontend:
- Vue.js 3 + TypeScript (API/storage layers)
- Vuex
- Vue Router
- Vuetify
- vue-i18n (PL/EN)
- CSS/SCSS
### Backend
- FastAPI
- SQLAlchemy + Alembic
- PostgreSQL
### DevOps
- Docker + Docker Swarm
- Traefik
- Nginx
- Ansible (deploy automation)
- GitHub Actions (CI/CD)
- VPS hosting -> ovh.pl
- Linux
