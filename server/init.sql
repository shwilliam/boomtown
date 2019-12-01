-- init
CREATE TABLE public.users (
  "id" SERIAL PRIMARY KEY,
  "fullname" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "bio" TEXT
);
CREATE TABLE public.items (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "desc" TEXT NOT NULL,
  "image_url" TEXT,
  "owner_id" INTEGER REFERENCES public.users (id),
  "borrower_id" INTEGER REFERENCES public.users (id),
  "created_at" TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE TABLE public.tags (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL
);
CREATE TABLE public.item_tags (
  "item_id" INTEGER REFERENCES public.items (id),
  "tag_id" INTEGER REFERENCES public.tags (id)
);

-- example tags
INSERT INTO public.tags ("id", "title")
  VALUES (1, 'Household Items');
INSERT INTO public.tags ("id", "title")
  VALUES (2, 'Tools');
INSERT INTO public.tags ("id", "title")
  VALUES (3, 'Electronics');
INSERT INTO public.tags ("id", "title")
  VALUES (4, 'Physical Media');
INSERT INTO public.tags ("id", "title")
  VALUES (5, 'Sporting Goods');
INSERT INTO public.tags ("id", "title")
  VALUES (6, 'Musical Instruments');

