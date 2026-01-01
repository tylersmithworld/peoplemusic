# Artist Verification System Spec

## Overview
90-second artist self-verification flow. Proves: catalog ownership, human identity, public presence.

---

## Database Schema

```sql
-- Verification claims (the core record)
create table verifications (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid references artists(id),

  -- Status
  status text check (status in ('pending', 'verified', 'rejected', 'expired')) default 'pending',
  verified_at timestamptz,
  expires_at timestamptz, -- optional: annual renewal?

  -- Step 1: Streaming connection (proves catalog ownership)
  spotify_connected boolean default false,
  spotify_artist_id text,
  spotify_verified_at timestamptz,
  apple_music_connected boolean default false,
  apple_artist_id text,
  distrokid_connected boolean default false,

  -- Step 2: Liveness check (proves human)
  liveness_video_url text, -- stored in Supabase Storage
  liveness_verified boolean default false,
  liveness_verified_at timestamptz,
  liveness_method text check (liveness_method in ('video_selfie', 'live_photo', 'video_call')),

  -- Step 3: Social verification (proves public identity)
  social_platform text, -- 'instagram', 'twitter', 'tiktok', etc.
  social_handle text,
  social_verified boolean default false,
  social_verified_at timestamptz,

  -- Metadata
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  ip_address text,
  user_agent text
);

-- Verification badges (what artists embed/share)
create table badges (
  id uuid primary key default gen_random_uuid(),
  artist_id uuid references artists(id),
  verification_id uuid references verifications(id),

  -- Badge details
  badge_code text unique not null, -- short code like "pm_abc123"
  badge_type text check (badge_type in ('standard', 'premium', 'founding')) default 'standard',

  -- Embed tracking
  embed_views int default 0,
  last_embed_view timestamptz,

  -- Customization
  theme text default 'light', -- 'light', 'dark', 'transparent'

  created_at timestamptz default now(),
  is_active boolean default true
);

-- Badge embed log (analytics)
create table badge_views (
  id uuid primary key default gen_random_uuid(),
  badge_id uuid references badges(id),
  referrer text,
  viewed_at timestamptz default now()
);

-- Indexes
create index verifications_artist_idx on verifications(artist_id);
create index verifications_status_idx on verifications(status);
create index badges_code_idx on badges(badge_code);
create index badges_artist_idx on badges(artist_id);
```

---

## Claim Flow (90 seconds)

### Screen 1: Find Your Artist Profile
- Search box: "Find your artist name"
- Shows matching artists from database
- If not found: "Add yourself" → creates new artist entry
- CTA: "Claim This Profile"

### Screen 2: Connect Streaming (30 sec)
- "Connect one of your streaming accounts"
- Buttons:
  - 🟢 Spotify for Artists (OAuth)
  - 🍎 Apple Music for Artists (OAuth)
  - 📦 Distrokid (OAuth or API key)
- Only need ONE to proceed
- Shows: "✓ Connected as [Artist Name] - 50K monthly listeners"

### Screen 3: Quick Liveness Check (30 sec)
- "Quick selfie to prove you're human"
- Camera opens, face oval guide
- Instructions: "Hold still for 3 seconds"
- AI liveness detection (blink detection, depth, etc.)
- Or: "Take a photo holding today's date written down"
- Stored encrypted, not public

### Screen 4: Social Link (30 sec)
- "Link one social profile"
- Options: Instagram, Twitter/X, TikTok, YouTube
- Method: Post a specific code to verify, OR OAuth
- Shows: "✓ Verified @artistname on Instagram"

### Screen 5: Success! 🎉
- Big green badge animation
- "You're verified as a human artist"
- Copy embed code button
- Copy shareable link button
- Download badge image button
- QR code display

---

## Badge System

### Embed Code (for websites/Linktree)
```html
<a href="https://peoplemusic.org/artist/artist-name" target="_blank">
  <img src="https://peoplemusic.org/badge/pm_abc123.svg"
       alt="PeopleMusic Verified Human Artist"
       width="200" />
</a>
```

### Shareable Link
```
https://peoplemusic.org/v/pm_abc123
```
→ Redirects to artist page with badge highlight

### Badge Designs
1. **Standard** - "✓ Verified Human Artist" - green/black
2. **Founding** - "Founding Verified Artist" - gold - for first 1000
3. **Premium** - Custom colors, larger, annual fee (V2)

### Badge API Endpoint
```
GET /api/badge/[code].svg
GET /api/badge/[code].png
GET /api/badge/[code].json → { verified: true, artist: "Name", since: "2025-01" }
```

---

## V2 Features (Later)

### Browser Extension
- Detects Spotify/Apple Music pages
- Shows overlay: "✓ Verified Human" or "⚠️ Suspected AI" or "❓ Unknown"
- Links to PeopleMusic page

### Fan Lookup
- Anyone can search any artist
- Shows verification status
- "Request Verification" button → notifies artist

### Playlist Criteria
- "PeopleMusic Verified" playlist
- Only verified human artists
- Curated or algorithmic

### API for Platforms
```
GET /api/v1/check?spotify_id=xxx
GET /api/v1/check?artist_name=xxx
→ { status: "verified_human", verified_since: "2025-01", badge_url: "..." }
```

---

## Security Considerations

1. **Liveness video** - Store encrypted, delete after verification, never public
2. **OAuth tokens** - Don't store, just verify once
3. **Rate limiting** - Prevent spam claims
4. **Appeal process** - If someone claims your profile wrongly
5. **Revocation** - If artist is later found to be AI

---

## Revenue Model (Optional)

- Free tier: Basic badge, standard embed
- Premium ($5/mo): Custom badge, analytics, priority support
- API access: Per-query pricing for platforms
- Founding artist: One-time $20, lifetime premium

---

## Technical Stack

- **Liveness detection**: Use Veriff, Onfido, or AWS Rekognition
- **OAuth**: Spotify API, Apple MusicKit, Distrokid API
- **Badge generation**: SVG templates, cached at edge
- **Storage**: Supabase Storage for liveness videos (encrypted)
- **Auth**: Supabase Auth for artist accounts
