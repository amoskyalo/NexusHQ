# Database Architecture - Simplified

## Overview

Each microservice has its OWN database. Services communicate via APIs and share data using IDs.

```
┌──────────────┐       ┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│ Auth Service │       │  Core API    │       │  AI Service  │       │   Website    │
│              │       │   Service    │       │              │       │   Builder    │
└──────┬───────┘       └──────┬───────┘       └──────┬───────┘       └──────┬───────┘
       │                      │                       │                      │
       ▼                      ▼                       ▼                      ▼
┌──────────────┐       ┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│ PostgreSQL   │       │ PostgreSQL + │       │  (No DB)     │       │   MongoDB    │
│              │       │  MongoDB +   │       │  Just calls  │       │              │
│ - users      │       │  Redis       │       │  external    │       │ - websites   │
│ - sessions   │       │              │       │  AI APIs     │       │ - pages      │
│ - oauth      │       │ - businesses │       │              │       │ - templates  │
│              │       │ - social_acc │       │              │       │              │
└──────────────┘       │ - messages   │       └──────────────┘       └──────────────┘
                       │ - posts      │
                       │ - analytics  │
                       └──────────────┘
```

## 1. Auth Service Database (PostgreSQL)

### Tables

#### users
```
┌─────────────────────────────────────────────────┐
│                     users                        │
├──────────────┬──────────────┬───────────────────┤
│ id           │ UUID         │ PRIMARY KEY       │
│ email        │ VARCHAR(255) │ UNIQUE NOT NULL   │
│ password_hash│ VARCHAR(255) │ NOT NULL          │
│ full_name    │ VARCHAR(255) │                   │
│ phone        │ VARCHAR(50)  │                   │
│ avatar_url   │ VARCHAR(500) │                   │
│ email_verified│ BOOLEAN     │ DEFAULT FALSE     │
│ is_active    │ BOOLEAN      │ DEFAULT TRUE      │
│ created_at   │ TIMESTAMP    │ DEFAULT NOW()     │
│ updated_at   │ TIMESTAMP    │ DEFAULT NOW()     │
└──────────────┴──────────────┴───────────────────┘
```

#### sessions
```
┌─────────────────────────────────────────────────┐
│                   sessions                       │
├──────────────┬──────────────┬───────────────────┤
│ id           │ UUID         │ PRIMARY KEY       │
│ user_id      │ UUID         │ FK -> users.id    │
│ token        │ TEXT         │ NOT NULL          │
│ refresh_token│ TEXT         │                   │
│ ip_address   │ VARCHAR(50)  │                   │
│ user_agent   │ TEXT         │                   │
│ expires_at   │ TIMESTAMP    │ NOT NULL          │
│ created_at   │ TIMESTAMP    │ DEFAULT NOW()     │
└──────────────┴──────────────┴───────────────────┘
```

#### oauth_connections
```
┌─────────────────────────────────────────────────┐
│              oauth_connections                   │
├──────────────┬──────────────┬───────────────────┤
│ id           │ UUID         │ PRIMARY KEY       │
│ user_id      │ UUID         │ FK -> users.id    │
│ provider     │ VARCHAR(50)  │ (facebook, google)│
│ provider_id  │ VARCHAR(255) │                   │
│ access_token │ TEXT         │ ENCRYPTED         │
│ refresh_token│ TEXT         │ ENCRYPTED         │
│ expires_at   │ TIMESTAMP    │                   │
│ created_at   │ TIMESTAMP    │ DEFAULT NOW()     │
└──────────────┴──────────────┴───────────────────┘
```

### Relationships

```
users (1) ──────< (many) sessions
users (1) ──────< (many) oauth_connections
```

---

## 2. Core API Service Databases

### PostgreSQL Tables

#### businesses
```
┌─────────────────────────────────────────────────┐
│                   businesses                     │
├──────────────┬──────────────┬───────────────────┤
│ id           │ UUID         │ PRIMARY KEY       │
│ owner_id     │ UUID         │ (from Auth DB)    │
│ name         │ VARCHAR(255) │ NOT NULL          │
│ industry     │ VARCHAR(100) │                   │
│ description  │ TEXT         │                   │
│ email        │ VARCHAR(255) │                   │
│ phone        │ VARCHAR(50)  │                   │
│ address      │ TEXT         │                   │
│ logo_url     │ VARCHAR(500) │                   │
│ website_url  │ VARCHAR(500) │                   │
│ timezone     │ VARCHAR(50)  │ DEFAULT 'UTC'     │
│ created_at   │ TIMESTAMP    │ DEFAULT NOW()     │
│ updated_at   │ TIMESTAMP    │ DEFAULT NOW()     │
└──────────────┴──────────────┴───────────────────┘
```

#### team_members
```
┌─────────────────────────────────────────────────┐
│                 team_members                     │
├──────────────┬──────────────┬───────────────────┤
│ id           │ UUID         │ PRIMARY KEY       │
│ business_id  │ UUID         │ FK -> businesses  │
│ user_id      │ UUID         │ (from Auth DB)    │
│ role         │ VARCHAR(50)  │ admin/editor/view │
│ permissions  │ JSONB        │                   │
│ invited_at   │ TIMESTAMP    │ DEFAULT NOW()     │
│ joined_at    │ TIMESTAMP    │                   │
│ is_active    │ BOOLEAN      │ DEFAULT TRUE      │
└──────────────┴──────────────┴───────────────────┘
```

#### subscriptions
```
┌─────────────────────────────────────────────────┐
│                 subscriptions                    │
├──────────────┬──────────────┬───────────────────┤
│ id           │ UUID         │ PRIMARY KEY       │
│ business_id  │ UUID         │ FK -> businesses  │
│ plan         │ VARCHAR(50)  │ free/pro/enterprise│
│ status       │ VARCHAR(50)  │ active/cancelled  │
│ billing_cycle│ VARCHAR(20)  │ monthly/yearly    │
│ amount       │ DECIMAL(10,2)│                   │
│ start_date   │ TIMESTAMP    │                   │
│ end_date     │ TIMESTAMP    │                   │
│ created_at   │ TIMESTAMP    │ DEFAULT NOW()     │
└──────────────┴──────────────┴───────────────────┘
```

#### social_accounts
```
┌─────────────────────────────────────────────────┐
│               social_accounts                    │
├──────────────┬──────────────┬───────────────────┤
│ id           │ UUID         │ PRIMARY KEY       │
│ business_id  │ UUID         │ FK -> businesses  │
│ platform     │ VARCHAR(50)  │ facebook/instagram│
│ account_id   │ VARCHAR(255) │ Platform user ID  │
│ account_name │ VARCHAR(255) │                   │
│ access_token │ TEXT         │ ENCRYPTED         │
│ refresh_token│ TEXT         │ ENCRYPTED         │
│ token_expires│ TIMESTAMP    │                   │
│ is_active    │ BOOLEAN      │ DEFAULT TRUE      │
│ connected_at │ TIMESTAMP    │ DEFAULT NOW()     │
│ last_sync    │ TIMESTAMP    │                   │
└──────────────┴──────────────┴───────────────────┘
```

#### analytics_summary
```
┌─────────────────────────────────────────────────┐
│              analytics_summary                   │
├──────────────┬──────────────┬───────────────────┤
│ id           │ UUID         │ PRIMARY KEY       │
│ business_id  │ UUID         │ FK -> businesses  │
│ date         │ DATE         │                   │
│ platform     │ VARCHAR(50)  │                   │
│ total_posts  │ INTEGER      │                   │
│ total_reach  │ INTEGER      │                   │
│ total_engagement│ INTEGER   │                   │
│ followers    │ INTEGER      │                   │
│ messages_received│ INTEGER  │                   │
│ created_at   │ TIMESTAMP    │ DEFAULT NOW()     │
└──────────────┴──────────────┴───────────────────┘
```

#### ad_campaigns
```
┌─────────────────────────────────────────────────┐
│                 ad_campaigns                     │
├──────────────┬──────────────┬───────────────────┤
│ id           │ UUID         │ PRIMARY KEY       │
│ business_id  │ UUID         │ FK -> businesses  │
│ platform     │ VARCHAR(50)  │ facebook/google   │
│ campaign_name│ VARCHAR(255) │                   │
│ status       │ VARCHAR(50)  │ active/paused/done│
│ budget       │ DECIMAL(10,2)│                   │
│ spent        │ DECIMAL(10,2)│                   │
│ start_date   │ TIMESTAMP    │                   │
│ end_date     │ TIMESTAMP    │                   │
│ created_at   │ TIMESTAMP    │ DEFAULT NOW()     │
└──────────────┴──────────────┴───────────────────┘
```

### MongoDB Collections

#### messages
```javascript
{
  _id: ObjectId,
  business_id: "uuid-from-postgres",
  conversation_id: "uuid",
  platform: "facebook" | "instagram" | "whatsapp" | "twitter",
  platform_message_id: "msg_123_from_platform",

  sender: {
    id: "sender_platform_id",
    name: "John Doe",
    username: "johndoe",
    profile_pic: "https://..."
  },

  content: {
    type: "text" | "image" | "video" | "audio" | "file",
    text: "Message content here",
    media_url: "https://...",
    thumbnail_url: "https://..."
  },

  direction: "inbound" | "outbound",
  status: "sent" | "delivered" | "read" | "failed",

  // AI Analysis
  sentiment: "positive" | "neutral" | "negative",
  priority: "high" | "normal" | "low",

  is_read: false,
  replied_to: ObjectId,  // If this is a reply

  created_at: ISODate("2026-01-09T10:00:00Z"),
  updated_at: ISODate("2026-01-09T10:00:00Z")
}
```

#### conversations
```javascript
{
  _id: ObjectId,
  business_id: "uuid-from-postgres",
  platform: "facebook",

  participant: {
    id: "platform_user_id",
    name: "John Doe",
    profile_pic: "https://..."
  },

  last_message: {
    text: "Last message preview",
    timestamp: ISODate("2026-01-09T10:00:00Z"),
    direction: "inbound"
  },

  unread_count: 3,
  is_archived: false,
  tags: ["urgent", "customer"],

  created_at: ISODate("2026-01-09T09:00:00Z"),
  updated_at: ISODate("2026-01-09T10:00:00Z")
}
```

#### posts
```javascript
{
  _id: ObjectId,
  business_id: "uuid-from-postgres",

  title: "My Post Title",
  content: "Post content here with #hashtags",

  media: [
    {
      type: "image",
      url: "https://s3.../image.jpg",
      thumbnail: "https://s3.../thumb.jpg",
      width: 1200,
      height: 800
    }
  ],

  // Multi-platform publishing
  platforms: [
    {
      name: "facebook",
      platform_post_id: "fb_123456",
      status: "published",
      scheduled_at: null,
      published_at: ISODate("2026-01-09T10:00:00Z"),
      custom_content: null,  // Different text for this platform
      url: "https://facebook.com/..."
    },
    {
      name: "instagram",
      platform_post_id: "ig_789012",
      status: "published",
      scheduled_at: null,
      published_at: ISODate("2026-01-09T10:00:00Z"),
      custom_content: "Instagram specific caption",
      url: "https://instagram.com/..."
    }
  ],

  ai_generated: {
    caption: true,
    image: false,
    hashtags: true
  },

  analytics: {
    likes: 150,
    comments: 25,
    shares: 10,
    reach: 5000,
    impressions: 8000,
    engagement_rate: 3.7,
    last_updated: ISODate("2026-01-09T12:00:00Z")
  },

  status: "draft" | "scheduled" | "published" | "failed",
  scheduled_for: ISODate("2026-01-10T14:00:00Z"),

  created_by: "uuid-user-id",
  created_at: ISODate("2026-01-09T09:00:00Z"),
  updated_at: ISODate("2026-01-09T10:00:00Z")
}
```

#### content_calendar
```javascript
{
  _id: ObjectId,
  business_id: "uuid-from-postgres",

  year: 2026,
  month: 1,

  scheduled_posts: [
    {
      post_id: ObjectId,
      date: ISODate("2026-01-15T10:00:00Z"),
      platforms: ["facebook", "instagram"],
      status: "scheduled"
    }
  ],

  created_at: ISODate("2026-01-09T10:00:00Z"),
  updated_at: ISODate("2026-01-09T10:00:00Z")
}
```

### Redis Cache (Key-Value Store)

```
# Session Cache
session:{token} -> { userId: "uuid", businessId: "uuid", expires: timestamp }

# User Cache
user:{userId}:profile -> { full_name: "...", email: "...", ... }

# Business Cache
business:{businessId}:info -> { name: "...", logo: "...", ... }

# Rate Limiting
ratelimit:{userId}:api -> count (TTL: 60 seconds)

# WebSocket Connections
ws:connections:{businessId} -> Set of socket IDs

# Real-time Message Queue
inbox:{businessId}:messages -> List of recent message IDs
```

### PostgreSQL Relationships

```
businesses (1) ──────< (many) team_members
businesses (1) ──────< (many) social_accounts
businesses (1) ──────< (many) subscriptions
businesses (1) ──────< (many) analytics_summary
businesses (1) ──────< (many) ad_campaigns
```

---

## 3. Website Builder Database (MongoDB)

### websites
```javascript
{
  _id: ObjectId,
  business_id: "uuid-from-core-api",

  site_name: "My Restaurant",
  subdomain: "myrestaurant",  // myrestaurant.yourdomain.com
  custom_domain: "www.myrestaurant.com",  // Optional

  template_id: "template_modern_restaurant",

  theme: {
    primary_color: "#FF6B6B",
    secondary_color: "#4ECDC4",
    font_family: "Inter",
    logo_url: "https://s3.../logo.png"
  },

  pages: [
    {
      id: "home",
      name: "Home",
      slug: "/",
      is_active: true,

      sections: [
        {
          type: "hero",
          content: {
            title: "Welcome to My Restaurant",
            subtitle: "Best food in town",
            image: "https://s3.../hero.jpg",
            cta_text: "Order Now",
            cta_link: "/menu"
          }
        },
        {
          type: "about",
          content: {
            title: "About Us",
            text: "We have been serving...",
            image: "https://s3.../about.jpg"
          }
        },
        {
          type: "gallery",
          content: {
            images: [
              "https://s3.../img1.jpg",
              "https://s3.../img2.jpg"
            ]
          }
        }
      ],

      seo: {
        title: "My Restaurant - Best Food in Town",
        description: "Discover amazing food at My Restaurant",
        keywords: ["restaurant", "food", "dining"],
        og_image: "https://s3.../og-image.jpg"
      }
    },
    {
      id: "menu",
      name: "Menu",
      slug: "/menu",
      is_active: true,
      sections: [
        // ... menu sections
      ],
      seo: { /* ... */ }
    },
    {
      id: "contact",
      name: "Contact",
      slug: "/contact",
      is_active: true,
      sections: [
        // ... contact sections
      ],
      seo: { /* ... */ }
    }
  ],

  ai_generated: true,

  settings: {
    analytics_enabled: true,
    google_analytics_id: "GA-XXXXX",
    contact_email: "info@myrestaurant.com",
    social_links: {
      facebook: "https://facebook.com/...",
      instagram: "https://instagram.com/..."
    }
  },

  is_published: true,
  published_url: "https://myrestaurant.yourdomain.com",
  published_at: ISODate("2026-01-09T10:00:00Z"),

  created_at: ISODate("2026-01-08T14:00:00Z"),
  updated_at: ISODate("2026-01-09T10:00:00Z")
}
```

### templates
```javascript
{
  _id: ObjectId,
  template_id: "template_modern_restaurant",
  name: "Modern Restaurant",
  category: "restaurant",
  thumbnail: "https://s3.../templates/modern-restaurant-thumb.jpg",

  default_structure: {
    pages: [
      {
        name: "Home",
        sections: ["hero", "about", "menu_preview", "gallery", "contact"]
      },
      {
        name: "Menu",
        sections: ["menu_full", "special_offers"]
      },
      {
        name: "Contact",
        sections: ["contact_form", "map", "hours"]
      }
    ]
  },

  is_active: true,
  created_at: ISODate("2026-01-01T00:00:00Z")
}
```

---

## 4. How Databases Relate (Cross-Service)

### Diagram of Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    DATA RELATIONSHIPS                        │
└─────────────────────────────────────────────────────────────┘

┌──────────────────┐
│   Auth Service   │
│   PostgreSQL     │
│                  │
│  users           │
│  ├─ id (UUID) ◄──┼──────┐
│  ├─ email        │      │
│  └─ password     │      │
└──────────────────┘      │
                          │ Reference via user_id
                          │
┌──────────────────┐      │
│   Core API       │      │
│   PostgreSQL     │      │
│                  │      │
│  businesses      │      │
│  ├─ id (UUID)    │      │
│  ├─ owner_id ◄───┼──────┘
│  │
│  └─ name         │
│                  │
│  team_members    │
│  ├─ id           │
│  ├─ business_id ─┼─┐
│  └─ user_id ◄────┼─┼─── References user from Auth DB
│                  │ │
│  social_accounts │ │
│  ├─ id           │ │
│  └─ business_id ─┼─┤
│                  │ │
│  subscriptions   │ │
│  ├─ id           │ │
│  └─ business_id ─┼─┤
└──────────────────┘ │
                     │
┌──────────────────┐ │
│   Core API       │ │
│   MongoDB        │ │
│                  │ │
│  messages        │ │
│  ├─ _id          │ │
│  └─ business_id ─┼─┤ Reference to businesses.id
│                  │ │
│  posts           │ │
│  ├─ _id          │ │
│  ├─ business_id ─┼─┤
│  └─ created_by ──┼─┼─── References user from Auth DB
│                  │ │
│  conversations   │ │
│  ├─ _id          │ │
│  └─ business_id ─┼─┤
└──────────────────┘ │
                     │
┌──────────────────┐ │
│ Website Builder  │ │
│   MongoDB        │ │
│                  │ │
│  websites        │ │
│  ├─ _id          │ │
│  └─ business_id ─┼─┘ Reference to businesses.id
│                  │
│  templates       │
│  └─ _id          │
└──────────────────┘
```

### How Services Share Data

**Example 1: User Creates a Business**

```
1. User registers in Auth Service
   └─ users table gets new row with id = "user-123"

2. User creates business in Core API
   └─ businesses table gets new row with:
      - id = "business-456"
      - owner_id = "user-123" (reference)

3. User creates a post in Core API
   └─ posts collection gets new document:
      - business_id = "business-456" (reference)
      - created_by = "user-123" (reference)

4. User creates website in Website Builder
   └─ websites collection gets new document:
      - business_id = "business-456" (reference)
```

**Example 2: Team Member Access**

```
1. Business owner (user-123) invites team member (user-789)
   └─ team_members table:
      - business_id = "business-456"
      - user_id = "user-789"
      - role = "editor"

2. Team member logs in (Auth Service)
   └─ Auth verifies user-789 exists

3. Team member accesses business (Core API)
   └─ Core API checks:
      - Does user-789 exist in team_members for business-456? YES
      - What role? "editor"
      - Grant access accordingly
```

**Example 3: Cross-Service Data Retrieval**

```
Frontend needs to show user's complete profile with businesses:

1. Frontend calls Core API: GET /api/users/me

2. Core API calls Auth Service: GET /api/auth/verify
   └─ Auth Service returns: { userId: "user-123" }

3. Core API queries its own DB:
   └─ SELECT * FROM businesses WHERE owner_id = 'user-123'
   └─ Returns businesses list

4. Core API queries its MongoDB:
   └─ db.posts.count({ business_id: { $in: [...businessIds] } })
   └─ Returns total posts count

5. Core API calls Auth Service again: GET /api/users/user-123
   └─ Auth Service returns: { name, email, avatar }

6. Core API combines all data and returns to frontend
```

---

## 5. Data Consistency Strategy

### Foreign Key References (Logical, Not Physical)

Since each service has its own database, we use **logical foreign keys** (just storing IDs).

```
Auth DB:
  users.id = "abc-123"

Core API DB:
  businesses.owner_id = "abc-123"  ← Stores the ID, but no FK constraint

When Core API needs user info:
  → Makes HTTP call to Auth Service API
  → Auth Service returns user data
```

### Handling Deleted Users

```javascript
// In Auth Service - Before deleting user
async function deleteUser(userId) {
  // 1. Call Core API to check dependencies
  const response = await axios.get(
    `${CORE_API_URL}/api/internal/user-dependencies/${userId}`
  );

  if (response.data.hasBusinesses) {
    throw new Error('User owns businesses. Transfer ownership first.');
  }

  // 2. Call Core API to anonymize user data
  await axios.post(
    `${CORE_API_URL}/api/internal/anonymize-user/${userId}`
  );

  // 3. Delete user from Auth DB
  await db.users.delete({ id: userId });
}
```

### Data Synchronization

**Cache Invalidation:**
```javascript
// When user updates profile in Auth Service
async function updateUserProfile(userId, updates) {
  // 1. Update in Auth DB
  await db.users.update(userId, updates);

  // 2. Invalidate cache in Redis
  await redis.del(`user:${userId}:profile`);

  // 3. Notify other services (optional webhook)
  await axios.post(`${CORE_API_URL}/webhooks/user-updated`, {
    userId,
    changes: ['name', 'avatar']
  });
}
```

---

## 6. Summary of Databases

| Service | Database Type | What It Stores |
|---------|--------------|----------------|
| **Auth Service** | PostgreSQL | users, sessions, oauth_connections |
| **Core API** | PostgreSQL | businesses, team_members, subscriptions, social_accounts, analytics_summary, ad_campaigns |
| **Core API** | MongoDB | messages, conversations, posts, content_calendar |
| **Core API** | Redis | sessions, cache, rate_limits, websocket_connections |
| **AI Service** | None | Just calls external AI APIs (OpenAI, Claude) |
| **Website Builder** | MongoDB | websites, templates |

### Key Points:

1. **Each service owns its data** - No shared databases
2. **Services communicate via HTTP APIs** - To get data from other services
3. **IDs are references only** - No database-level foreign keys across services
4. **Cache in Redis** - To reduce inter-service calls
5. **Data consistency** - Handled at application level, not database level

This architecture allows each service to scale independently and use the best database for its needs!
