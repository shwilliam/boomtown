-- init
CREATE TABLE public.users (
  "id" SERIAL PRIMARY KEY,
  "fullname" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "password" TEXT NOT NULL
);
CREATE TABLE public.items (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "desc" TEXT NOT NULL,
  "image_url" TEXT,
  "owner_id" INTEGER REFERENCES public.users (id),
  "borrower_id" INTEGER REFERENCES public.users (id),
  "created_at" DATE NOT NULL DEFAULT CURRENT_DATE
);
CREATE TABLE public.tags (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL
);
CREATE TABLE public.item_tags (
  "item_id" INTEGER REFERENCES public.items (id),
  "tag_id" INTEGER REFERENCES public.tags (id)
);
