-- Table: public.lichess_puzzles

-- DROP TABLE IF EXISTS public.lichess_puzzles;

CREATE TABLE IF NOT EXISTS public.lichess_puzzles
(
    id character varying(10) COLLATE pg_catalog."default" NOT NULL,
    fen character varying(93) COLLATE pg_catalog."default" NOT NULL,
    moves character varying(300) COLLATE pg_catalog."default" NOT NULL,
    rating smallint NOT NULL DEFAULT nextval('lichess_puzzles_rating_seq'::regclass),
    rating_deviation smallint NOT NULL DEFAULT nextval('lichess_puzzles_rating_deviation_seq'::regclass),
    nb_plays integer NOT NULL DEFAULT nextval('lichess_puzzles_nb_plays_seq'::regclass),
    themes character varying(300) COLLATE pg_catalog."default" NOT NULL,
    opening_tags character varying(100) COLLATE pg_catalog."default" NOT NULL,
    popularity smallint NOT NULL DEFAULT nextval('lichess_puzzles_popularity_seq'::regclass),
    CONSTRAINT lichess_puzzles_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.lichess_puzzles
    OWNER to postgres;