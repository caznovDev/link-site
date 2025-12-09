# SFW-Hub

Site de previews SFW de conteúdo TikTok/YouTube com visual estilo Netflix.

## Stack

- **Frontend**: React + Vite + TailwindCSS
- **Player**: Plyr
- **Backend**: Cloudflare Pages Functions
- **Database**: Cloudflare D1
- **Storage**: Cloudflare R2

## Deploy no Cloudflare Pages

### 1. Criar Database D1

```bash
wrangler d1 create sfwdb
```

Copie o `database_id` gerado e atualize o `wrangler.toml`.

### 2. Criar Bucket R2

```bash
wrangler r2 bucket create sfw-bucket
```

Configure o bucket como público e copie a URL pública para `PUBLIC_R2` no `wrangler.toml`.

### 3. Executar Schema

```bash
wrangler d1 execute sfwdb --file=./database/schema.sql
```

Opcional - adicionar dados de exemplo:
```bash
wrangler d1 execute sfwdb --file=./database/seed.sql
```

### 4. Configurar Secrets

No dashboard do Cloudflare Pages (Settings > Environment Variables), configure a variável `ADMIN_KEY` com uma chave secreta forte.

**IMPORTANTE**: A autenticação admin é feita pelo backend (Cloudflare Functions). A chave NUNCA é exposta no frontend - ela é verificada via endpoint `/api/auth-check` no servidor.

### 5. Deploy

```bash
npm install
npm run build
wrangler pages deploy dist
```

## Rotas

### Frontend
- `/` - Home com lista de criadores
- `/model/:slug` - Página do criador com vídeos
- `/watch/:slug` - Player de vídeo
- `/admin?key=ADMIN_KEY` - Painel administrativo

### API
- `GET /api/models` - Lista modelos (paginado)
- `POST /api/models?key=ADMIN_KEY` - Criar modelo
- `GET /api/model-[slug]` - Dados de um modelo
- `GET /api/model-videos-[slug]` - Vídeos de um modelo
- `GET /api/video-[slug]` - Dados de um vídeo
- `POST /api/videos?key=ADMIN_KEY` - Criar vídeo
- `POST /api/upload?key=ADMIN_KEY` - Upload para R2
- `POST /api/crawler?key=ADMIN_KEY` - Importar JSON em lote
- `GET /api/gateway-[slug]` - Redirect 307 para URL +18

## Estrutura do JSON para Importação

```json
{
  "videos": [
    {
      "model_slug": "nome-do-modelo",
      "slug": "slug-do-video",
      "title": "Título do Vídeo",
      "video_url": "https://...",
      "thumbnail_url": "https://...",
      "duration_seconds": 120
    }
  ]
}
```

## Desenvolvimento Local

```bash
npm install
npm run dev
```

Para testar as funções localmente:
```bash
wrangler pages dev dist
```
