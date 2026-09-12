--
-- PostgreSQL database dump
--

\restrict 7BcUvf0hsBRuf3Pow0cPGq1stB1JvfagP7ndUhOkUeyLDsNILwJrAcKFdIpFhGT

-- Dumped from database version 15.18
-- Dumped by pg_dump version 15.18

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: NotificationType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."NotificationType" AS ENUM (
    'NEW_VISITE',
    'NEW_USER',
    'NEW_BIEN',
    'STATUS_CHANGED',
    'NEW_TESTIMONIAL',
    'SECURITY'
);


--
-- Name: Role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."Role" AS ENUM (
    'ADMIN',
    'USER'
);


--
-- Name: ServiceBien; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."ServiceBien" AS ENUM (
    'LOCATION',
    'VENTE'
);


--
-- Name: StatutBien; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."StatutBien" AS ENUM (
    'DISPONIBLE',
    'RESERVE',
    'VENDU',
    'LOUE'
);


--
-- Name: StatutDemande; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."StatutDemande" AS ENUM (
    'EN_ATTENTE',
    'CONTACTE',
    'VISITE_CONFIRMEE',
    'TERMINEE',
    'ANNULEE'
);


--
-- Name: TypeBien; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."TypeBien" AS ENUM (
    'APPARTEMENT',
    'TERRAIN',
    'LOCAL',
    'VILLA'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Agency; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Agency" (
    id integer DEFAULT 1 NOT NULL,
    name text NOT NULL,
    phone text[],
    email text,
    address text NOT NULL,
    "mapsUrl" text,
    "socialLinks" jsonb,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Bien; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Bien" (
    id text NOT NULL,
    nom text NOT NULL,
    description text NOT NULL,
    prix double precision NOT NULL,
    negociable boolean DEFAULT false NOT NULL,
    statut public."StatutBien" DEFAULT 'DISPONIBLE'::public."StatutBien" NOT NULL,
    localisation text NOT NULL,
    superficie double precision NOT NULL,
    type public."TypeBien" NOT NULL,
    service public."ServiceBien" NOT NULL,
    features text[],
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "localisationMap" text
);


--
-- Name: BienImage; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."BienImage" (
    id text NOT NULL,
    url text NOT NULL,
    "publicId" text NOT NULL,
    "bienId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: Commune; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Commune" (
    id text NOT NULL,
    name text NOT NULL,
    "imageUrl" text,
    "imagePublicId" text,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: DemandeVisite; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."DemandeVisite" (
    id text NOT NULL,
    nom text NOT NULL,
    email text NOT NULL,
    telephone text NOT NULL,
    "dateSouhaitee" timestamp(3) without time zone NOT NULL,
    message text,
    statut public."StatutDemande" DEFAULT 'EN_ATTENTE'::public."StatutDemande" NOT NULL,
    "bienId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Notification; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Notification" (
    id text NOT NULL,
    title text NOT NULL,
    message text NOT NULL,
    type public."NotificationType" NOT NULL,
    read boolean DEFAULT false NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: Testimonial; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Testimonial" (
    id text NOT NULL,
    "fullName" text NOT NULL,
    message text NOT NULL,
    rating double precision NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: User; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    "passwordResetExpires" timestamp(3) without time zone,
    "passwordResetToken" text
);


--
-- Name: _BienToUser; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."_BienToUser" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


--
-- Data for Name: Agency; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Agency" (id, name, phone, email, address, "mapsUrl", "socialLinks", "createdAt", "updatedAt") FROM stdin;
1	El Ahlem	{"0550 22 74 73"}	bouraba.morad@gmail.com	Saint Charles, Les vergers, Kouba, Alger	https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d249.57932120943832!2d3.0575804784894007!3d36.72384596490868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fad00531ca6f9%3A0x8a985ede982d69fb!2sBureau%20d'affaire%20el%20wissem!5e1!3m2!1sfr!2sdz!4v1788280822640!5m2!1sfr!2sdz	[{"url": "https://www.facebook.com/p/Agence-Alahlem-100028020596416/", "name": "Facebook"}, {"url": "https://www.tiktok.com/@agencealahlem?_t=ZM-8wKdmNUWTfa&_r=1", "name": "TikTok"}]	2026-09-05 19:58:22.82	2026-09-05 19:58:22.82
\.


--
-- Data for Name: Bien; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Bien" (id, nom, description, prix, negociable, statut, localisation, superficie, type, service, features, "createdAt", "updatedAt", "localisationMap") FROM stdin;
b656dc33-ed5c-46a0-8401-184ee2663b82	Vente Appartement F3 Alger Cheraga	GarageAgence immobilière el ahlem met en vente un appartement f3 au 3ème étage, très propre, bien ensoleillé avec chauffage central, climatiseur, cuisine équipée, suite parentale, dressing, box de stationnement pour 2 véhicules dans une résidence fermée gardé jour et nuit, avec esplanade pour enfants.	36000000	t	DISPONIBLE	Cherage, Alger	120	APPARTEMENT	VENTE	{Papiers,"Acte notarié","Livret foncier",Electricité,gaz,eau,citerne,"cuisine équipé","salle de bain equipée"}	2026-09-07 10:42:30.143	2026-09-07 10:42:30.143	https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56137.9303458435!2d2.8878340324896037!3d36.7593919835311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fb03e932164f9%3A0xb760f1cc8569076a!2zQ2jDqXJhZ2E!5e1!3m2!1sfr!2sdz!4v1788777622281!5m2!1sfr!2sdz
d1cda114-6b17-48ff-a274-4a8ca1de75ff	Appartement F4 Birkhadem les vergers	Agence immobilière el ahlem met en location un appartement f4 au rdc, sup : 130 m² dans une résidence clôturé gardé jour et nuit avec deux façade, cuisine équipée ( four, plaque, réfrigérateur) ,bien ensoleillé.\r\nL'appartement situé a birkhadem, les vergers, pas loin de l école British.	100000	f	DISPONIBLE	Birkhadem, Alger	130	APPARTEMENT	LOCATION	{F4,"Cuisine équipée",Climatisation,Citerne,"Box de stationement","Chauffage centrale",rdc}	2026-09-07 09:57:17.378	2026-09-07 09:59:36.476	https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d877.5502117432117!2d3.0463500704834363!3d36.72483319303347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fada741f82125%3A0xa32db607fc80948c!2sDar%20Mina%2C%20Radia!5e1!3m2!1sfr!2sdz!4v1788774932458!5m2!1sfr!2sdz
899b64b7-2026-44d9-9aec-851f73545b11	Locale Ain Nadjaa	Agence immobilière el ahlem met en location ou vente un local refait neuf au rdc avec un sous sol,\r\n3 min au bouche de métro.ain naadja	13000000	f	DISPONIBLE	3 min da la bouche de métro.ain naadja	35	LOCAL	VENTE	{"sous sol",moderne,proximité}	2026-09-07 10:01:45.361	2026-09-07 10:01:45.361	https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28081.59445744938!2d3.02634996497737!3d36.724866881688364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fad2474e3a0b1%3A0xc9107ce8e237a92a!2sStation%20M%C3%A9tro%20Ain%20Naadja%202!5e1!3m2!1sfr!2sdz!4v1788775247671!5m2!1sfr!2sdz
fdd99c65-53ad-4e6a-b38b-958da4c054ad	Appartement F4 Birhadem	Agence immobilière el ahlem met en vente un f4  a birkhadem. L appartement bien ensoleillé, vue dégagée dans une résidence gardée, accès facile autoroute	36000000	f	DISPONIBLE	Residence la belle colline, birkhadem alger	144	APPARTEMENT	VENTE	{F4,"Cuisine équipée","Air de jeux",citerne,"salle de sport",ascenseur}	2026-09-07 09:46:50.5	2026-09-07 09:52:07.768	https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3511.3504122751865!2d3.0429406115793802!3d36.6996747732438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fadb2b55c7383%3A0xced6989b0f31f626!2sR%C3%A9sidence%20La%20Belle%20Colline%2C%20Bessa%20Promotion%20Immobili%C3%A8re!5e1!3m2!1sfr!2sdz!4v1788774694046!5m2!1sfr!2sdz
109a2816-3ca6-4a18-a1cf-97eab47e5d1e	F3 Birkhadem 2éme étage	Agence immobilière el ahlem met en vente un tres beau appartement f3 au 2ème étage, refait neuf avec deux façade, bien ensoleillé\r\nL appartement avec climatiseur, chauffage central, cuisine équipée, deux balcons dans un endroit stratégique pour habitation où bien investissement immobilière.	20000000	t	DISPONIBLE	Birkhadem, ALger	78	APPARTEMENT	VENTE	{"78 m²","Cuisine equipée","Chauffage centrale",Papiers,Fini,Citerne,"Livret foncier","Acte notarié"}	2026-09-07 10:06:28.296	2026-09-07 10:23:01.36	https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13300.455871597727!2d3.043565782812685!3d36.72050000992709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fada4576043ff%3A0xe4fb52ae50139dd1!2sBirkhadem!5e1!3m2!1sfr!2sdz!4v1788776548777!5m2!1sfr!2sdz
f06e8342-a14e-4a1d-9644-96565c2d2975	F3 Birkhadem immeuble propre	Agence immobilière el ahlem met en vente un  appartement f3 au 2ème étage à Birkhadem dans un immeuble très propre, bien ensoleillé, avec chauffage central climatiseur	16000000	f	DISPONIBLE	Birkhadem, Alger	80	APPARTEMENT	VENTE	{F3,"80 m²","2éme étage","chauffage central",citerne,finition,papiers,"livret foncier","acte notariée","cuisine équipée","Salle de bains equipée"}	2026-09-07 10:28:49.85	2026-09-07 10:28:49.85	https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13300.455871597727!2d3.043565782812685!3d36.72050000992709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fada4576043ff%3A0xe4fb52ae50139dd1!2sBirkhadem!5e1!3m2!1sfr!2sdz!4v1788776680628!5m2!1sfr!2sdz
4fd30e34-8769-463f-a445-8d3498b0da57	Location appartement f3 au 4ème étage à Birkhadem, tixraine	Location appartement f3 au 4ème étage à Birkhadem, tixraine	65000	f	LOUE	Birkhadem, Tixraine	93	APPARTEMENT	LOCATION	{ectricité,Gaz,Eau,"4éme etage"}	2026-09-07 10:38:13.049	2026-09-07 10:38:49.386	https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14041.64450501853!2d3.0195128061536383!3d36.72023230426543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fadc263ff1611%3A0x8e15d328f122ce84!2sTixera%C3%AFne%2C%20Birkhadem!5e1!3m2!1sfr!2sdz!4v1788777361368!5m2!1sfr!2sdz
\.


--
-- Data for Name: BienImage; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."BienImage" (id, url, "publicId", "bienId", "createdAt") FROM stdin;
6fbf9801-0d13-410d-8ea3-cbd610b0bfd5	https://res.cloudinary.com/dub4fhabm/image/upload/v1788774409/Immob/zyb6xkbcppfhlohwg7si.jpg	Immob/zyb6xkbcppfhlohwg7si	fdd99c65-53ad-4e6a-b38b-958da4c054ad	2026-09-07 09:46:50.5
6f068b78-d4f6-457b-a0e6-28673219afc3	https://res.cloudinary.com/dub4fhabm/image/upload/v1788774409/Immob/yqawbrqnk3ciw31zeaey.jpg	Immob/yqawbrqnk3ciw31zeaey	fdd99c65-53ad-4e6a-b38b-958da4c054ad	2026-09-07 09:46:50.5
22b8aca2-41ab-4fad-91a3-8afde33215da	https://res.cloudinary.com/dub4fhabm/image/upload/v1788774409/Immob/bwaeqogmczjolcazvwnh.jpg	Immob/bwaeqogmczjolcazvwnh	fdd99c65-53ad-4e6a-b38b-958da4c054ad	2026-09-07 09:46:50.5
090a948e-bca0-4818-abbc-5079218960ce	https://res.cloudinary.com/dub4fhabm/image/upload/v1788774592/Immob/z2xa6armxkadvtekfd95.jpg	Immob/z2xa6armxkadvtekfd95	fdd99c65-53ad-4e6a-b38b-958da4c054ad	2026-09-07 09:49:53.264
347d3a98-6ad0-44bb-9eae-4b6be4f56d2a	https://res.cloudinary.com/dub4fhabm/image/upload/v1788775036/Immob/colkgnmntqv47yecklnn.jpg	Immob/colkgnmntqv47yecklnn	d1cda114-6b17-48ff-a274-4a8ca1de75ff	2026-09-07 09:57:17.378
bedd3b77-8a3e-4eed-af19-8e02380f226a	https://res.cloudinary.com/dub4fhabm/image/upload/v1788775036/Immob/sdrr2cuqw2ife1tcplhg.jpg	Immob/sdrr2cuqw2ife1tcplhg	d1cda114-6b17-48ff-a274-4a8ca1de75ff	2026-09-07 09:57:17.378
567b967c-fc13-4219-be42-070b369a5cab	https://res.cloudinary.com/dub4fhabm/image/upload/v1788775036/Immob/rune85ug3zh3f5cqvvgn.jpg	Immob/rune85ug3zh3f5cqvvgn	d1cda114-6b17-48ff-a274-4a8ca1de75ff	2026-09-07 09:57:17.378
17d10bf2-7579-4618-9fcc-81c1cf4d6dcf	https://res.cloudinary.com/dub4fhabm/image/upload/v1788775088/Immob/ctlctckek9d3kcstyil4.jpg	Immob/ctlctckek9d3kcstyil4	d1cda114-6b17-48ff-a274-4a8ca1de75ff	2026-09-07 09:58:09.039
79bdd69c-449d-4ba4-b238-b2895efa7ebf	https://res.cloudinary.com/dub4fhabm/image/upload/v1788775088/Immob/czym5b0dutbtrktz7bii.jpg	Immob/czym5b0dutbtrktz7bii	d1cda114-6b17-48ff-a274-4a8ca1de75ff	2026-09-07 09:58:09.039
c06f9423-cbb1-49a3-8f49-63a16a316299	https://res.cloudinary.com/dub4fhabm/image/upload/v1788775088/Immob/ojfqs4hjivxep3l2car3.jpg	Immob/ojfqs4hjivxep3l2car3	d1cda114-6b17-48ff-a274-4a8ca1de75ff	2026-09-07 09:58:09.039
512a6acd-2386-4185-813d-0ac50e6e7b0b	https://res.cloudinary.com/dub4fhabm/image/upload/v1788775088/Immob/xh1qn8c4hv9dnbpezvqr.jpg	Immob/xh1qn8c4hv9dnbpezvqr	d1cda114-6b17-48ff-a274-4a8ca1de75ff	2026-09-07 09:58:09.039
d9d709e5-0604-4b2d-bee1-96b61627dee4	https://res.cloudinary.com/dub4fhabm/image/upload/v1788775088/Immob/mizxfagey0nccx6s0hx0.jpg	Immob/mizxfagey0nccx6s0hx0	d1cda114-6b17-48ff-a274-4a8ca1de75ff	2026-09-07 09:58:09.039
b8b07b02-387a-44a6-9a4b-9024159c482a	https://res.cloudinary.com/dub4fhabm/image/upload/v1788775304/Immob/xuqfs3y954vzyjbje7cr.jpg	Immob/xuqfs3y954vzyjbje7cr	899b64b7-2026-44d9-9aec-851f73545b11	2026-09-07 10:01:45.361
1ee76903-6a6f-4f33-ae8c-3321e11196d5	https://res.cloudinary.com/dub4fhabm/image/upload/v1788775304/Immob/izwrk6mxlrljfwi06wus.jpg	Immob/izwrk6mxlrljfwi06wus	899b64b7-2026-44d9-9aec-851f73545b11	2026-09-07 10:01:45.361
0abaa4b8-a318-40c0-a77f-28c03ee75f3f	https://res.cloudinary.com/dub4fhabm/image/upload/v1788775587/Immob/v2nses96iz1iov9jwbok.jpg	Immob/v2nses96iz1iov9jwbok	109a2816-3ca6-4a18-a1cf-97eab47e5d1e	2026-09-07 10:06:28.296
065804e1-cec2-4896-9327-b037458ed990	https://res.cloudinary.com/dub4fhabm/image/upload/v1788775587/Immob/uiofdnfrjgl4gldap8xz.jpg	Immob/uiofdnfrjgl4gldap8xz	109a2816-3ca6-4a18-a1cf-97eab47e5d1e	2026-09-07 10:06:28.296
160707f0-2352-4432-9d59-0caa9c6e40da	https://res.cloudinary.com/dub4fhabm/image/upload/v1788775587/Immob/dvbgw19iszsiutap1blf.jpg	Immob/dvbgw19iszsiutap1blf	109a2816-3ca6-4a18-a1cf-97eab47e5d1e	2026-09-07 10:06:28.296
562662e1-eac5-4975-8a16-3c94c4e81a38	https://res.cloudinary.com/dub4fhabm/image/upload/v1788775587/Immob/vyg1vgjnaxmnzb2wkkbx.jpg	Immob/vyg1vgjnaxmnzb2wkkbx	109a2816-3ca6-4a18-a1cf-97eab47e5d1e	2026-09-07 10:06:28.296
02f6916a-1b34-436f-9cfb-ad268b3b369a	https://res.cloudinary.com/dub4fhabm/image/upload/v1788775587/Immob/u3uik5nxilzqijlicods.jpg	Immob/u3uik5nxilzqijlicods	109a2816-3ca6-4a18-a1cf-97eab47e5d1e	2026-09-07 10:06:28.296
6bbce573-33db-4bb7-b278-033112264604	https://res.cloudinary.com/dub4fhabm/image/upload/v1788775587/Immob/ae1mgo0uxngfsm5xrmat.jpg	Immob/ae1mgo0uxngfsm5xrmat	109a2816-3ca6-4a18-a1cf-97eab47e5d1e	2026-09-07 10:06:28.296
0be56441-c095-4c43-893f-7214d54be36e	https://res.cloudinary.com/dub4fhabm/image/upload/v1788775587/Immob/zutsftlsjyekszyakysd.jpg	Immob/zutsftlsjyekszyakysd	109a2816-3ca6-4a18-a1cf-97eab47e5d1e	2026-09-07 10:06:28.296
50733f6b-8a1c-498f-80b7-0ecd5dcde8fb	https://res.cloudinary.com/dub4fhabm/image/upload/v1788775587/Immob/d2d0q3bvn5iu0owyjhac.jpg	Immob/d2d0q3bvn5iu0owyjhac	109a2816-3ca6-4a18-a1cf-97eab47e5d1e	2026-09-07 10:06:28.296
72f2d5d0-ca5a-4510-87c2-a1b9bb82e6a3	https://res.cloudinary.com/dub4fhabm/image/upload/v1788775587/Immob/bsluj6qd2ke2xdkaakpq.jpg	Immob/bsluj6qd2ke2xdkaakpq	109a2816-3ca6-4a18-a1cf-97eab47e5d1e	2026-09-07 10:06:28.296
5ca7f05e-4cff-4212-b3b2-b04422c41910	https://res.cloudinary.com/dub4fhabm/image/upload/v1788775587/Immob/boo7syptgbzunmymjm0k.jpg	Immob/boo7syptgbzunmymjm0k	109a2816-3ca6-4a18-a1cf-97eab47e5d1e	2026-09-07 10:06:28.296
d7810641-95f7-40a9-970c-4cbeedbc07c6	https://res.cloudinary.com/dub4fhabm/image/upload/v1788775587/Immob/csgc6a4k0mipaab8stie.jpg	Immob/csgc6a4k0mipaab8stie	109a2816-3ca6-4a18-a1cf-97eab47e5d1e	2026-09-07 10:06:28.296
ca231d51-6758-4d42-808a-3a299db4fa34	https://res.cloudinary.com/dub4fhabm/image/upload/v1788775587/Immob/lgwgwzdfmonbuyhjdv76.jpg	Immob/lgwgwzdfmonbuyhjdv76	109a2816-3ca6-4a18-a1cf-97eab47e5d1e	2026-09-07 10:06:28.296
c695b9ea-322b-411c-a28f-ccf5b330a4f8	https://res.cloudinary.com/dub4fhabm/image/upload/v1788775587/Immob/d9dkzigvzhajz5fofsid.jpg	Immob/d9dkzigvzhajz5fofsid	109a2816-3ca6-4a18-a1cf-97eab47e5d1e	2026-09-07 10:06:28.296
657ee720-3d40-4110-a275-54a394af44e0	https://res.cloudinary.com/dub4fhabm/image/upload/v1788775587/Immob/yjj4ere86heo7bhsjsc7.jpg	Immob/yjj4ere86heo7bhsjsc7	109a2816-3ca6-4a18-a1cf-97eab47e5d1e	2026-09-07 10:06:28.296
7929bd24-d3aa-4281-92e2-d0c3c1eb1b62	https://res.cloudinary.com/dub4fhabm/image/upload/v1788775587/Immob/q2ornurxhrqlv6avjzyz.jpg	Immob/q2ornurxhrqlv6avjzyz	109a2816-3ca6-4a18-a1cf-97eab47e5d1e	2026-09-07 10:06:28.296
a9eb9fc9-0588-4959-842c-6609ebcff3a1	https://res.cloudinary.com/dub4fhabm/image/upload/v1788775587/Immob/kkzzys7ed0fy2gsyzk5n.jpg	Immob/kkzzys7ed0fy2gsyzk5n	109a2816-3ca6-4a18-a1cf-97eab47e5d1e	2026-09-07 10:06:28.296
56c8231c-23e2-4f95-989e-ec5082d7edbd	https://res.cloudinary.com/dub4fhabm/image/upload/v1788775587/Immob/iuuciao8eg0lszirc424.jpg	Immob/iuuciao8eg0lszirc424	109a2816-3ca6-4a18-a1cf-97eab47e5d1e	2026-09-07 10:06:28.296
186e6bb0-6107-4404-88b9-ac9f2dea66c0	https://res.cloudinary.com/dub4fhabm/image/upload/v1788776928/Immob/vbdd1bgnm0aqprbjxzwi.jpg	Immob/vbdd1bgnm0aqprbjxzwi	f06e8342-a14e-4a1d-9644-96565c2d2975	2026-09-07 10:28:49.85
b55dede0-a41e-4adf-b7a8-4d7921b3165c	https://res.cloudinary.com/dub4fhabm/image/upload/v1788776928/Immob/aj4an73kbvvpal37p44k.jpg	Immob/aj4an73kbvvpal37p44k	f06e8342-a14e-4a1d-9644-96565c2d2975	2026-09-07 10:28:49.85
e4bdcd4b-2f1f-49a0-b4e5-dd801718c4b7	https://res.cloudinary.com/dub4fhabm/image/upload/v1788776928/Immob/xpojuf7k1cgrzsz7to5n.jpg	Immob/xpojuf7k1cgrzsz7to5n	f06e8342-a14e-4a1d-9644-96565c2d2975	2026-09-07 10:28:49.85
da2ab349-4d76-4266-8833-a1ed36c46d66	https://res.cloudinary.com/dub4fhabm/image/upload/v1788776928/Immob/imr8jzyuvl7yowqnttkb.jpg	Immob/imr8jzyuvl7yowqnttkb	f06e8342-a14e-4a1d-9644-96565c2d2975	2026-09-07 10:28:49.85
f06e4950-2383-4088-ac06-5844090b3cbc	https://res.cloudinary.com/dub4fhabm/image/upload/v1788776928/Immob/onosnepmqau49dcjy6zc.jpg	Immob/onosnepmqau49dcjy6zc	f06e8342-a14e-4a1d-9644-96565c2d2975	2026-09-07 10:28:49.85
00958ff6-d2c7-4364-8c2e-88c1f25fc725	https://res.cloudinary.com/dub4fhabm/image/upload/v1788776928/Immob/o2e1tqmdhdlw18c5fg3p.jpg	Immob/o2e1tqmdhdlw18c5fg3p	f06e8342-a14e-4a1d-9644-96565c2d2975	2026-09-07 10:28:49.85
576ded1c-3303-46d6-ac6d-405570245906	https://res.cloudinary.com/dub4fhabm/image/upload/v1788776928/Immob/ghoztuzf34zd6it5myuz.jpg	Immob/ghoztuzf34zd6it5myuz	f06e8342-a14e-4a1d-9644-96565c2d2975	2026-09-07 10:28:49.85
72966ca1-b85e-44fc-b18a-8ad14639bbd6	https://res.cloudinary.com/dub4fhabm/image/upload/v1788776928/Immob/k4qtosl6iwkmtcjt9roj.jpg	Immob/k4qtosl6iwkmtcjt9roj	f06e8342-a14e-4a1d-9644-96565c2d2975	2026-09-07 10:28:49.85
e0cc0739-5625-42fc-bee3-8b6611559c00	https://res.cloudinary.com/dub4fhabm/image/upload/v1788776928/Immob/n1yrdsk5b0taaa1hilgl.jpg	Immob/n1yrdsk5b0taaa1hilgl	f06e8342-a14e-4a1d-9644-96565c2d2975	2026-09-07 10:28:49.85
f46d3780-11db-465b-a3aa-8b788376f882	https://res.cloudinary.com/dub4fhabm/image/upload/v1788776928/Immob/hdlmo12mbxg7byz8i9cb.jpg	Immob/hdlmo12mbxg7byz8i9cb	f06e8342-a14e-4a1d-9644-96565c2d2975	2026-09-07 10:28:49.85
74aa4031-f6fd-40f2-8d4b-f9ff64dab820	https://res.cloudinary.com/dub4fhabm/image/upload/v1788776928/Immob/tvhtdkwzw7y0cm00priw.jpg	Immob/tvhtdkwzw7y0cm00priw	f06e8342-a14e-4a1d-9644-96565c2d2975	2026-09-07 10:28:49.85
c6c0f4ac-616d-4814-902e-2dbe1e67e269	https://res.cloudinary.com/dub4fhabm/image/upload/v1788776928/Immob/vjneejizviswcdf418v0.jpg	Immob/vjneejizviswcdf418v0	f06e8342-a14e-4a1d-9644-96565c2d2975	2026-09-07 10:28:49.85
b2e10b19-74d6-48ca-b323-35dbf04c3cf5	https://res.cloudinary.com/dub4fhabm/image/upload/v1788776928/Immob/l9pvfnm8i2vyao2aeooo.jpg	Immob/l9pvfnm8i2vyao2aeooo	f06e8342-a14e-4a1d-9644-96565c2d2975	2026-09-07 10:28:49.85
6364ddac-d1f1-4e3c-8a54-4bedec6b6add	https://res.cloudinary.com/dub4fhabm/image/upload/v1788776928/Immob/ort4pqit9kexknwjppqg.jpg	Immob/ort4pqit9kexknwjppqg	f06e8342-a14e-4a1d-9644-96565c2d2975	2026-09-07 10:28:49.85
cbe37b0b-24c8-4cf5-8856-0fba3151ef00	https://res.cloudinary.com/dub4fhabm/image/upload/v1788776929/Immob/pyzqsbx19nggiue56i0l.jpg	Immob/pyzqsbx19nggiue56i0l	f06e8342-a14e-4a1d-9644-96565c2d2975	2026-09-07 10:28:49.85
a8b27762-9b5c-41bb-83fe-11d1dfc2f2ca	https://res.cloudinary.com/dub4fhabm/image/upload/v1788776928/Immob/ioadmva4owg1ivwmcrs4.jpg	Immob/ioadmva4owg1ivwmcrs4	f06e8342-a14e-4a1d-9644-96565c2d2975	2026-09-07 10:28:49.85
f88b2787-b879-4493-bca8-93bb1be8387f	https://res.cloudinary.com/dub4fhabm/image/upload/v1788776929/Immob/e7af1peluwqizunlkmiu.jpg	Immob/e7af1peluwqizunlkmiu	f06e8342-a14e-4a1d-9644-96565c2d2975	2026-09-07 10:28:49.85
87cd6510-e69d-4e8f-ac39-214bc9934952	https://res.cloudinary.com/dub4fhabm/image/upload/v1788776928/Immob/cpxgwmjnfnfuka9sz13i.jpg	Immob/cpxgwmjnfnfuka9sz13i	f06e8342-a14e-4a1d-9644-96565c2d2975	2026-09-07 10:28:49.85
19a1d145-d949-42e5-8f69-4bcad66dde71	https://res.cloudinary.com/dub4fhabm/image/upload/v1788776928/Immob/cho89cdpkyvrqgocdr93.jpg	Immob/cho89cdpkyvrqgocdr93	f06e8342-a14e-4a1d-9644-96565c2d2975	2026-09-07 10:28:49.85
845b3a5e-2a89-44d5-a6e0-e6eb30f1858a	https://res.cloudinary.com/dub4fhabm/image/upload/v1788776928/Immob/h9anxyhbsj8er5jbhgbi.jpg	Immob/h9anxyhbsj8er5jbhgbi	f06e8342-a14e-4a1d-9644-96565c2d2975	2026-09-07 10:28:49.85
5021b348-df10-4bcc-9be8-3f7874798508	https://res.cloudinary.com/dub4fhabm/image/upload/v1788776928/Immob/gq2zzbsvbu7gh0ofqlid.jpg	Immob/gq2zzbsvbu7gh0ofqlid	f06e8342-a14e-4a1d-9644-96565c2d2975	2026-09-07 10:28:49.85
ff160883-bbb3-4e65-b9b7-e810133c9612	https://res.cloudinary.com/dub4fhabm/image/upload/v1788777491/Immob/kr3dis6kucd6ghjr1abw.jpg	Immob/kr3dis6kucd6ghjr1abw	4fd30e34-8769-463f-a445-8d3498b0da57	2026-09-07 10:38:13.049
f29ef9ca-a36a-4d50-a65b-5eb3eb5e35e7	https://res.cloudinary.com/dub4fhabm/image/upload/v1788777491/Immob/sjflqoxwygvcz404gssv.jpg	Immob/sjflqoxwygvcz404gssv	4fd30e34-8769-463f-a445-8d3498b0da57	2026-09-07 10:38:13.049
d6919db3-1518-4f1b-9418-68e8ff8590ba	https://res.cloudinary.com/dub4fhabm/image/upload/v1788777491/Immob/tkpigq1vq1inzgcqbmgt.jpg	Immob/tkpigq1vq1inzgcqbmgt	4fd30e34-8769-463f-a445-8d3498b0da57	2026-09-07 10:38:13.049
6bb72401-6d83-4971-b393-134e57fa744e	https://res.cloudinary.com/dub4fhabm/image/upload/v1788777491/Immob/q4ya0z5caj40tdtgdxzn.jpg	Immob/q4ya0z5caj40tdtgdxzn	4fd30e34-8769-463f-a445-8d3498b0da57	2026-09-07 10:38:13.049
481a1145-50e8-4968-bf5e-99643cb6d596	https://res.cloudinary.com/dub4fhabm/image/upload/v1788777491/Immob/pyhh9g0wwjc22uzvd9c5.jpg	Immob/pyhh9g0wwjc22uzvd9c5	4fd30e34-8769-463f-a445-8d3498b0da57	2026-09-07 10:38:13.049
dac800ed-c71c-4478-b34d-d3342c736261	https://res.cloudinary.com/dub4fhabm/image/upload/v1788777491/Immob/ryhqtaamjh5ch9eudh6a.jpg	Immob/ryhqtaamjh5ch9eudh6a	4fd30e34-8769-463f-a445-8d3498b0da57	2026-09-07 10:38:13.049
48e3dca7-cf05-40a8-89d7-c96ae28f74e1	https://res.cloudinary.com/dub4fhabm/image/upload/v1788777491/Immob/rinwqrnfozpc5hurocu1.jpg	Immob/rinwqrnfozpc5hurocu1	4fd30e34-8769-463f-a445-8d3498b0da57	2026-09-07 10:38:13.049
28d3f00c-210f-43b2-b6f2-2f37d789ad60	https://res.cloudinary.com/dub4fhabm/image/upload/v1788777491/Immob/cz8k1piuojwu2mxuuuxn.jpg	Immob/cz8k1piuojwu2mxuuuxn	4fd30e34-8769-463f-a445-8d3498b0da57	2026-09-07 10:38:13.049
0844d1fc-4ef6-4ed4-95f6-16b6639b1c6a	https://res.cloudinary.com/dub4fhabm/image/upload/v1788777749/Immob/updhu0knsloh2b2kz9tv.jpg	Immob/updhu0knsloh2b2kz9tv	b656dc33-ed5c-46a0-8401-184ee2663b82	2026-09-07 10:42:30.143
40a314e3-bed6-46c4-8690-3f7577918d38	https://res.cloudinary.com/dub4fhabm/image/upload/v1788777748/Immob/utm4k7mpoigxvkvqyaq3.jpg	Immob/utm4k7mpoigxvkvqyaq3	b656dc33-ed5c-46a0-8401-184ee2663b82	2026-09-07 10:42:30.143
85cd4569-c579-4ed8-ac41-935294c7d815	https://res.cloudinary.com/dub4fhabm/image/upload/v1788777749/Immob/p8irrr0jefschry2eypf.jpg	Immob/p8irrr0jefschry2eypf	b656dc33-ed5c-46a0-8401-184ee2663b82	2026-09-07 10:42:30.143
60a50297-45f8-43c3-a63b-072d5b408694	https://res.cloudinary.com/dub4fhabm/image/upload/v1788777749/Immob/stiimxvr8vidululhbkn.jpg	Immob/stiimxvr8vidululhbkn	b656dc33-ed5c-46a0-8401-184ee2663b82	2026-09-07 10:42:30.143
5e781b53-87df-450e-8a05-38ca73f9304e	https://res.cloudinary.com/dub4fhabm/image/upload/v1788777748/Immob/n3zssrqbbfibjzpmbesh.jpg	Immob/n3zssrqbbfibjzpmbesh	b656dc33-ed5c-46a0-8401-184ee2663b82	2026-09-07 10:42:30.143
1bbb6d1d-66ee-4fa6-899b-75dab41d1d4d	https://res.cloudinary.com/dub4fhabm/image/upload/v1788777749/Immob/wutqbstjxk6eeerk0yr4.jpg	Immob/wutqbstjxk6eeerk0yr4	b656dc33-ed5c-46a0-8401-184ee2663b82	2026-09-07 10:42:30.143
83cc3c3d-661c-41d6-a7aa-e4a8b577985d	https://res.cloudinary.com/dub4fhabm/image/upload/v1788777748/Immob/cmvwd6jbqnmrhy6uv3ay.jpg	Immob/cmvwd6jbqnmrhy6uv3ay	b656dc33-ed5c-46a0-8401-184ee2663b82	2026-09-07 10:42:30.143
e10518b4-efd0-417e-ab06-851d4b79d3ca	https://res.cloudinary.com/dub4fhabm/image/upload/v1788777748/Immob/mzfncjkijkft88xorp9g.jpg	Immob/mzfncjkijkft88xorp9g	b656dc33-ed5c-46a0-8401-184ee2663b82	2026-09-07 10:42:30.143
32493c0c-f240-499f-9542-60c290062af0	https://res.cloudinary.com/dub4fhabm/image/upload/v1788777749/Immob/pmz3jnxvekgijovm9qhz.jpg	Immob/pmz3jnxvekgijovm9qhz	b656dc33-ed5c-46a0-8401-184ee2663b82	2026-09-07 10:42:30.143
596deec9-b54c-4327-8f6f-246190457327	https://res.cloudinary.com/dub4fhabm/image/upload/v1788777749/Immob/fl8alppndabzvrzjqufw.jpg	Immob/fl8alppndabzvrzjqufw	b656dc33-ed5c-46a0-8401-184ee2663b82	2026-09-07 10:42:30.143
7f779f46-df29-42ae-b8c8-9e2c755fec72	https://res.cloudinary.com/dub4fhabm/image/upload/v1788777749/Immob/n7hy6xymphh335xnoshz.jpg	Immob/n7hy6xymphh335xnoshz	b656dc33-ed5c-46a0-8401-184ee2663b82	2026-09-07 10:42:30.143
6364e5af-74f9-4f4a-bc07-721c2e7fbc17	https://res.cloudinary.com/dub4fhabm/image/upload/v1788777748/Immob/nebjhw2k5k3obpezfxgm.jpg	Immob/nebjhw2k5k3obpezfxgm	b656dc33-ed5c-46a0-8401-184ee2663b82	2026-09-07 10:42:30.143
dd9e5fa5-8b3a-40bb-add4-bdfad5deea06	https://res.cloudinary.com/dub4fhabm/image/upload/v1788777748/Immob/znq9evpyehryrxivpdgm.jpg	Immob/znq9evpyehryrxivpdgm	b656dc33-ed5c-46a0-8401-184ee2663b82	2026-09-07 10:42:30.143
ca816e1b-8e72-4ff1-8f69-2fe0b940a632	https://res.cloudinary.com/dub4fhabm/image/upload/v1788777748/Immob/pknldlu8fpkkhh5isvvy.jpg	Immob/pknldlu8fpkkhh5isvvy	b656dc33-ed5c-46a0-8401-184ee2663b82	2026-09-07 10:42:30.143
2b90b266-661d-412f-a71d-c0279a2b27ad	https://res.cloudinary.com/dub4fhabm/image/upload/v1788777749/Immob/ttoqho46ticgdaw3oxbq.jpg	Immob/ttoqho46ticgdaw3oxbq	b656dc33-ed5c-46a0-8401-184ee2663b82	2026-09-07 10:42:30.143
\.


--
-- Data for Name: Commune; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Commune" (id, name, "imageUrl", "imagePublicId", active, "createdAt", "updatedAt") FROM stdin;
b4fab6bc-ef7e-4f26-ab0b-1fc942876da4	Alger Centre	https://res.cloudinary.com/dub4fhabm/image/upload/v1789143292/Immob/cusprmtkcxh8anuqpfba.jpg	Immob/cusprmtkcxh8anuqpfba	t	2026-09-11 16:10:42.708	2026-09-11 16:14:55.937
f823c4da-81d4-477e-91e4-581388283c4d	Ain Nadjaa	https://res.cloudinary.com/dub4fhabm/image/upload/v1789143337/Immob/b6xdwyxypxeylyn3qgk1.jpg	Immob/b6xdwyxypxeylyn3qgk1	t	2026-09-11 16:15:37.708	2026-09-11 16:15:37.708
efe55af9-74b5-4694-8b86-0a905fdb8db1	Kouba	https://res.cloudinary.com/dub4fhabm/image/upload/v1789143352/Immob/xbdxq2s7mkt6lbpatipk.jpg	Immob/xbdxq2s7mkt6lbpatipk	t	2026-09-11 16:15:52.862	2026-09-11 16:15:52.862
7c3489ee-e422-402e-b40c-d4ee71d4c56f	Cheraga	https://res.cloudinary.com/dub4fhabm/image/upload/v1789143365/Immob/abljt0rzqydvbthk4kab.jpg	Immob/abljt0rzqydvbthk4kab	t	2026-09-11 16:16:05.663	2026-09-11 16:16:05.663
91381400-199d-4c07-b923-1ca28d85f3c8	Ouled Fayet	https://res.cloudinary.com/dub4fhabm/image/upload/v1789143380/Immob/myrygviihlsxazzj4vmu.jpg	Immob/myrygviihlsxazzj4vmu	t	2026-09-11 16:16:20.917	2026-09-11 16:16:20.917
58ad9a44-0daa-481d-86d6-3f138fd1c4bb	Said Hamedine	https://res.cloudinary.com/dub4fhabm/image/upload/v1789143400/Immob/wbrvew53xp1gtqttofld.jpg	Immob/wbrvew53xp1gtqttofld	t	2026-09-11 16:16:41.196	2026-09-11 16:16:41.196
35e93a45-7bec-41c5-90ae-214d49149d94	Ouled Fayet	https://res.cloudinary.com/dub4fhabm/image/upload/v1789143421/Immob/xikgw6n9i3bjq21pc3av.jpg	Immob/xikgw6n9i3bjq21pc3av	t	2026-09-11 16:17:02.39	2026-09-11 16:17:02.39
0b66976a-6d9d-4875-84e0-0d25398884a5	Hydra	https://res.cloudinary.com/dub4fhabm/image/upload/v1789143446/Immob/mob3sfmp1cqx2dv9cf3l.jpg	Immob/mob3sfmp1cqx2dv9cf3l	t	2026-09-11 16:17:27.785	2026-09-11 16:17:35.897
\.


--
-- Data for Name: DemandeVisite; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."DemandeVisite" (id, nom, email, telephone, "dateSouhaitee", message, statut, "bienId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Notification; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Notification" (id, title, message, type, read, "userId", "createdAt") FROM stdin;
100aeca0-de9f-4c42-bce5-670e582585a1	Statut de visite modifié	La demande de visite de Rezgui Yanis est maintenant "EN_ATTENTE".	STATUS_CHANGED	t	d85f5ee8-1ae5-4f54-b7f6-6b9dd5f8134c	2026-09-06 17:16:27.551
aa0c7199-5a2d-4ae3-9c2f-aae790803d0f	Statut de visite modifié	La demande de visite de Rezgui Yanis est maintenant "CONTACTE".	STATUS_CHANGED	t	d85f5ee8-1ae5-4f54-b7f6-6b9dd5f8134c	2026-09-06 17:16:15.924
3f8ced5f-2f13-43c8-b428-50fc4d803d03	Statut de visite modifié	La demande de visite de Rezgui Yanis est maintenant "EN_ATTENTE".	STATUS_CHANGED	t	d85f5ee8-1ae5-4f54-b7f6-6b9dd5f8134c	2026-09-06 17:16:19.05
cec8e94e-559f-409b-bf58-49d52417eb77	Statut de visite modifié	La demande de visite de Rezgui Yanis est maintenant "VISITE_CONFIRMEE".	STATUS_CHANGED	t	d85f5ee8-1ae5-4f54-b7f6-6b9dd5f8134c	2026-09-06 17:16:22.484
4627a4e8-4387-4bb7-bb95-cde8f5257632	Statut de visite modifié	La demande de visite de Rezgui Yanis est maintenant "TERMINEE".	STATUS_CHANGED	t	d85f5ee8-1ae5-4f54-b7f6-6b9dd5f8134c	2026-09-06 17:16:25.149
d27f1043-c054-418f-946b-12b36888468f	Statut de visite modifié	La demande de visite de Rezgui Yanis est maintenant "CONTACTE".	STATUS_CHANGED	f	d85f5ee8-1ae5-4f54-b7f6-6b9dd5f8134c	2026-09-06 17:26:55.148
9ffa1441-39c1-4e1f-813c-9f74fae75b3f	Nouveau témoignage	nnnx a envoyé un nouveau témoignage.	NEW_TESTIMONIAL	t	d85f5ee8-1ae5-4f54-b7f6-6b9dd5f8134c	2026-09-06 17:26:27.568
6d38c1a9-8295-4263-a6c9-f11b7df96122	Nouveau témoignage	bdbdbd a envoyé un nouveau témoignage.	NEW_TESTIMONIAL	f	d85f5ee8-1ae5-4f54-b7f6-6b9dd5f8134c	2026-09-06 20:58:19.984
033475d5-84c7-4980-9eac-f8ce1ea92cb2	Nouveau témoignage	d d d a envoyé un nouveau témoignage.	NEW_TESTIMONIAL	f	d85f5ee8-1ae5-4f54-b7f6-6b9dd5f8134c	2026-09-06 20:59:07.452
fac95aaf-c4ba-456c-9f75-277577b06635	Nouveau témoignage	,dnndd a envoyé un nouveau témoignage.	NEW_TESTIMONIAL	f	d85f5ee8-1ae5-4f54-b7f6-6b9dd5f8134c	2026-09-06 21:04:08.278
5f00f872-79fe-4f7a-8f1a-a0aa93906d5c	Statut de visite modifié	La demande de visite de Rezgui Yanis est maintenant "EN_ATTENTE".	STATUS_CHANGED	f	d85f5ee8-1ae5-4f54-b7f6-6b9dd5f8134c	2026-09-06 21:04:43.076
f21370d3-bf9c-43c4-8e21-73edaf722879	Nouveau témoignage	nddnd a envoyé un nouveau témoignage.	NEW_TESTIMONIAL	f	d85f5ee8-1ae5-4f54-b7f6-6b9dd5f8134c	2026-09-06 21:07:41.37
fdefe867-0700-4c14-b2ba-0de0b8ec3a9b	Nouveau témoignage	Mama a envoyé un nouveau témoignage.	NEW_TESTIMONIAL	f	d85f5ee8-1ae5-4f54-b7f6-6b9dd5f8134c	2026-09-06 21:08:38.675
1f43981e-4dc5-4e92-b11b-2a4251ad946e	Nouveau bien ajouté	Le bien "Appartement F4 Birhadem" a été ajouté au catalogue.	NEW_BIEN	f	d85f5ee8-1ae5-4f54-b7f6-6b9dd5f8134c	2026-09-07 09:46:50.52
d27345fc-2112-4c47-a2e0-7e51cd5f9a56	Nouveau bien ajouté	Le bien "Appartement F4 Birkhadem les vergers" a été ajouté au catalogue.	NEW_BIEN	f	d85f5ee8-1ae5-4f54-b7f6-6b9dd5f8134c	2026-09-07 09:57:17.397
0063b7b8-be81-41ae-8072-cbc52e4ca21e	Nouveau bien ajouté	Le bien "Locale Ain Nadjaa" a été ajouté au catalogue.	NEW_BIEN	f	d85f5ee8-1ae5-4f54-b7f6-6b9dd5f8134c	2026-09-07 10:01:45.411
9c36a15d-75d1-4a14-8890-b5fc60962cd0	Nouveau bien ajouté	Le bien "F3 Birkhadem 2éme étage" a été ajouté au catalogue.	NEW_BIEN	f	d85f5ee8-1ae5-4f54-b7f6-6b9dd5f8134c	2026-09-07 10:06:28.335
8d584c72-5ab8-4e53-a031-a05cb0be4ff4	Nouveau bien ajouté	Le bien "F3 Birkhadem immeuble propre" a été ajouté au catalogue.	NEW_BIEN	f	d85f5ee8-1ae5-4f54-b7f6-6b9dd5f8134c	2026-09-07 10:28:49.867
9311400b-8f99-4f65-81f7-5cf7992904a2	Nouveau bien ajouté	Le bien "Location appartement f3 au 4ème étage à Birkhadem, tixraine" a été ajouté au catalogue.	NEW_BIEN	f	d85f5ee8-1ae5-4f54-b7f6-6b9dd5f8134c	2026-09-07 10:38:13.062
ee4408b1-79e0-4bc8-9db7-7f0d3b5e30d9	Statut du bien modifié	Le bien "Location appartement f3 au 4ème étage à Birkhadem, tixraine" est maintenant "LOUE".	STATUS_CHANGED	f	d85f5ee8-1ae5-4f54-b7f6-6b9dd5f8134c	2026-09-07 10:38:49.398
6f30a7ed-4145-43ee-9817-c1acd6d547b5	Nouveau bien ajouté	Le bien "Vente Appartement F3 Alger Cheraga" a été ajouté au catalogue.	NEW_BIEN	f	d85f5ee8-1ae5-4f54-b7f6-6b9dd5f8134c	2026-09-07 10:42:30.192
aed413b6-96df-4a2a-ac69-51684dc884fa	Nouveau témoignage	Mr Karim Messaoud a envoyé un nouveau témoignage.	NEW_TESTIMONIAL	f	d85f5ee8-1ae5-4f54-b7f6-6b9dd5f8134c	2026-09-07 21:21:22.501
bcb12aca-f7a2-44a8-9375-3fdbb40c90a2	Nouveau témoignage	Mr Malek Rezgui a envoyé un nouveau témoignage.	NEW_TESTIMONIAL	f	d85f5ee8-1ae5-4f54-b7f6-6b9dd5f8134c	2026-09-07 21:21:57.726
78038894-05f2-4d01-90d8-08dc6c2e14d4	Nouveau témoignage	Mme Yasmine L. a envoyé un nouveau témoignage.	NEW_TESTIMONIAL	f	d85f5ee8-1ae5-4f54-b7f6-6b9dd5f8134c	2026-09-07 21:26:08.946
\.


--
-- Data for Name: Testimonial; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Testimonial" (id, "fullName", message, rating, active, "createdAt", "updatedAt") FROM stdin;
cmtn4zpva0000tvbw1op8i15k	Mme Nadia B.	Une très bonne expérience avec El Ahlem. Nous avons été accompagnés avec beaucoup de sérieux dans notre recherche et surtout très bien conseillés. L'équipe a pris le temps de comprendre ce que nous recherchions sans jamais nous pousser à prendre une décision trop rapidement.	4.5	t	2026-09-04 15:56:44.854	2026-09-07 21:25:00.675
cmtrqwqvx00009nbw622iwiga	M. Karim M.	Je remercie El Ahlem pour leur disponibilité et leur professionnalisme. Les échanges étaient clairs, les informations données étaient précises et nous avons toujours eu des réponses à nos questions. Une expérience rassurante pour un projet aussi important.	5	t	2026-09-07 21:21:22.461	2026-09-07 21:25:13.032
cmtrqxi3600019nbwuxew5q9v	M. Malek R.	Une agence sérieuse et surtout très humaine. J'ai particulièrement apprécié la transparence dans les échanges et le fait que l'on prenne le temps de m'expliquer les différentes étapes. Je recommande El Ahlem pour leur sérieux et leur disponibilité.	5	t	2026-09-07 21:21:57.714	2026-09-07 21:25:32.878
cmtrr2vxh00029nbw8g1zx2p0	Mme Yasmine L.	Très satisfaite de mon expérience avec El Ahlem. L'équipe a été attentive à mes besoins et m'a accompagnée avec patience tout au long de ma recherche. Les échanges étaient simples et professionnels, ce qui m'a permis d'avancer dans mon projet avec beaucoup plus de confiance.	4	t	2026-09-07 21:26:08.933	2026-09-07 21:26:08.933
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."User" (id, email, password, role, "createdAt", "updatedAt", "firstName", "lastName", "passwordResetExpires", "passwordResetToken") FROM stdin;
13574c64-24a1-47e1-81c0-4da6a8695434	kenza@gmail.com	$2b$10$e4bmy/xO59qv7cyn/eDfLeEl1XsQRYfg2McmGzERh2x6HnuJ/OVjG	USER	2026-09-04 20:24:16.096	2026-09-05 19:36:05.988	Kenza	Ait abdelmalek	\N	\N
8e0538df-c8d9-4a75-b5d3-e579ded419ed	fazia@gmail.com	$2b$10$3hoOi7wKuy9hhBxgTzgFZuVBWF9/7j8IhtMb/F/261nJ6AveZ5KtS	USER	2026-09-05 19:36:55.002	2026-09-05 19:36:55.002	Fazia	Ougouadfel	\N	\N
d85f5ee8-1ae5-4f54-b7f6-6b9dd5f8134c	yanisrezgui28@gmail.com	$2b$10$kvkUVrUDmrlu3SPFsyZJK.PkJT8aZBk/46QN/8srDUFoAWExoANVe	ADMIN	2026-08-31 11:32:33.166	2026-09-12 15:59:39.234	Yanis	Rezgui	\N	\N
\.


--
-- Data for Name: _BienToUser; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."_BienToUser" ("A", "B") FROM stdin;
f06e8342-a14e-4a1d-9644-96565c2d2975	13574c64-24a1-47e1-81c0-4da6a8695434
d1cda114-6b17-48ff-a274-4a8ca1de75ff	13574c64-24a1-47e1-81c0-4da6a8695434
b656dc33-ed5c-46a0-8401-184ee2663b82	13574c64-24a1-47e1-81c0-4da6a8695434
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
1ee513f0-b509-4e0a-a2be-a002f7bcbf18	ba5a4b023cb59847e586ad0c5560df0d48df777aaa11e8a1211ea40d8d6a64e6	2026-08-26 10:50:33.589073+00	20260826105033_init	\N	\N	2026-08-26 10:50:33.490027+00	1
b829c3b6-e3a8-4abd-bb7c-8afca7fc855c	9c9084fd0fa7258627b8f95ce63b1c9cc9c3354a976b62d1aacfc63a85737d3a	2026-08-26 16:06:03.355258+00	20260826160603_add_map_url	\N	\N	2026-08-26 16:06:03.349178+00	1
07b95351-e425-4e1e-8817-7f7dcf337f64	5797a3338d017699160c32058a82b55957218dc523c208e7a855ca321b3548ff	2026-08-30 13:27:18.216283+00	20260830132718_separated_first_name_last_name	\N	\N	2026-08-30 13:27:18.208556+00	1
1c5aafc8-cda9-4d52-b590-af1020d09763	890b98391ee75fbe1685f26f261abca48155ef7e96a478b2ff02fa609c6ad642	2026-09-03 20:18:35.880099+00	20260903201835_add_testimonial	\N	\N	2026-09-03 20:18:35.855611+00	1
9de2e201-b5d4-4ad7-a420-5aaaa33db2ac	0fd53cfb9e964d6d1cb788ed0126b05bf095bd9e06db91f560060208ec19fb4f	2026-09-04 15:27:05.720015+00	20260904152705_change_rating_to_float	\N	\N	2026-09-04 15:27:05.692317+00	1
4a4afa79-eb69-4e05-a653-3c854758e6f0	349b18bf4e504bc3139590410a7127245f31f50efa36c346ad46e8c7edc74f88	2026-09-05 19:45:32.26073+00	20260905194532_add_agency	\N	\N	2026-09-05 19:45:32.239236+00	1
8ed173f6-7e95-4187-b962-78b5121ba277	5886e23065d783fc45c1e4d79845d47783d2163be176e94094667b6406971db5	2026-09-06 15:52:48.976638+00	20260906155248_added_notification	\N	\N	2026-09-06 15:52:48.937939+00	1
cde4d8fe-d77d-42fe-b3c5-ac1868c68ee4	586143f9ae76c009862fb0d41ac408414f59eef1b61bdd532676adbac92773b8	2026-09-07 09:39:08.349061+00	20260907093908_add_bien_images	\N	\N	2026-09-07 09:39:08.323746+00	1
b454e649-3128-4187-bf23-4b1b44078921	3dca6c4c561668acd89d1c05502762869ae07c5c588d78305c2b0f500dfd9527	2026-09-10 20:20:47.282077+00	20260910202047_add_communes	\N	\N	2026-09-10 20:20:47.243442+00	1
c7eeaac5-708e-4934-979a-da23ad3e67c6	e409fc01d895740da8a21291f9764abc487493556d8a6fb78e538a7869ea11bb	2026-09-11 15:00:19.695039+00	20260911150019_remove_order_from_commune	\N	\N	2026-09-11 15:00:19.675437+00	1
a6ac4f79-f470-43c9-bc52-ea7a5b81146e	c675a254cad1ca8466a2bb6fd47ed523a69363989b3e9d29f0247c119927278d	2026-09-12 15:36:12.685231+00	20260912153612_add_password_reset	\N	\N	2026-09-12 15:36:12.674805+00	1
\.


--
-- Name: Agency Agency_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Agency"
    ADD CONSTRAINT "Agency_pkey" PRIMARY KEY (id);


--
-- Name: BienImage BienImage_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."BienImage"
    ADD CONSTRAINT "BienImage_pkey" PRIMARY KEY (id);


--
-- Name: Bien Bien_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Bien"
    ADD CONSTRAINT "Bien_pkey" PRIMARY KEY (id);


--
-- Name: Commune Commune_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Commune"
    ADD CONSTRAINT "Commune_pkey" PRIMARY KEY (id);


--
-- Name: DemandeVisite DemandeVisite_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."DemandeVisite"
    ADD CONSTRAINT "DemandeVisite_pkey" PRIMARY KEY (id);


--
-- Name: Notification Notification_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_pkey" PRIMARY KEY (id);


--
-- Name: Testimonial Testimonial_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Testimonial"
    ADD CONSTRAINT "Testimonial_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _BienToUser _BienToUser_AB_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_BienToUser"
    ADD CONSTRAINT "_BienToUser_AB_pkey" PRIMARY KEY ("A", "B");


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: BienImage_bienId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "BienImage_bienId_idx" ON public."BienImage" USING btree ("bienId");


--
-- Name: Bien_localisation_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Bien_localisation_idx" ON public."Bien" USING btree (localisation);


--
-- Name: Bien_service_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Bien_service_idx" ON public."Bien" USING btree (service);


--
-- Name: Bien_statut_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Bien_statut_idx" ON public."Bien" USING btree (statut);


--
-- Name: Bien_type_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Bien_type_idx" ON public."Bien" USING btree (type);


--
-- Name: Commune_active_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Commune_active_idx" ON public."Commune" USING btree (active);


--
-- Name: DemandeVisite_bienId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "DemandeVisite_bienId_idx" ON public."DemandeVisite" USING btree ("bienId");


--
-- Name: DemandeVisite_statut_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "DemandeVisite_statut_idx" ON public."DemandeVisite" USING btree (statut);


--
-- Name: Notification_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Notification_createdAt_idx" ON public."Notification" USING btree ("createdAt");


--
-- Name: Notification_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Notification_userId_idx" ON public."Notification" USING btree ("userId");


--
-- Name: Notification_userId_read_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Notification_userId_read_idx" ON public."Notification" USING btree ("userId", read);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: _BienToUser_B_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "_BienToUser_B_index" ON public."_BienToUser" USING btree ("B");


--
-- Name: BienImage BienImage_bienId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."BienImage"
    ADD CONSTRAINT "BienImage_bienId_fkey" FOREIGN KEY ("bienId") REFERENCES public."Bien"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: DemandeVisite DemandeVisite_bienId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."DemandeVisite"
    ADD CONSTRAINT "DemandeVisite_bienId_fkey" FOREIGN KEY ("bienId") REFERENCES public."Bien"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Notification Notification_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _BienToUser _BienToUser_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_BienToUser"
    ADD CONSTRAINT "_BienToUser_A_fkey" FOREIGN KEY ("A") REFERENCES public."Bien"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _BienToUser _BienToUser_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."_BienToUser"
    ADD CONSTRAINT "_BienToUser_B_fkey" FOREIGN KEY ("B") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict 7BcUvf0hsBRuf3Pow0cPGq1stB1JvfagP7ndUhOkUeyLDsNILwJrAcKFdIpFhGT

