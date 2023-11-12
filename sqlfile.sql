--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admintable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admintable (
    adminid character varying(20) NOT NULL,
    adminfirstname character varying(255),
    adminlastname character varying(255),
    adminemailaddress character varying(255),
    adminpassword character varying(255),
    admincontactnumber character varying(255),
    userroleid character varying(20),
    branchid character varying(20)
);


ALTER TABLE public.admintable OWNER TO postgres;

--
-- Name: branchtable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.branchtable (
    branchid character varying(20) NOT NULL,
    branchname character varying(255),
    branchlocationaddress character varying(255),
    branchlatitude character varying(20),
    branchlongitude character varying(20)
);


ALTER TABLE public.branchtable OWNER TO postgres;

--
-- Name: carttable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carttable (
    cartid character varying(20) NOT NULL,
    customerid character varying(20),
    foodmenuid character varying(20),
    foodmenupriceid character varying(20),
    quantity integer
);


ALTER TABLE public.carttable OWNER TO postgres;

--
-- Name: customeraddresstable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customeraddresstable (
    customeraddressid character varying(20) NOT NULL,
    customerid character varying(20),
    customerfullname character varying(255),
    customercontactnumber character varying(255),
    customerstreet character varying(255),
    customerbarangay character varying(255),
    customercity character varying(255),
    customernotes text,
    customeraddresslabel character varying(255),
    customeraddressdefault boolean,
    addresslatitude character varying(55),
    addresslongitude character varying(55)
);


ALTER TABLE public.customeraddresstable OWNER TO postgres;

--
-- Name: customerorderitemtable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customerorderitemtable (
    customerorderitemid character varying(20) NOT NULL,
    customerorderid character varying(20),
    foodmenuid character varying(20),
    foodmenupriceid character varying(20),
    customerorderitemquantity integer,
    customerorderitemtotalprice numeric(10,2)
);


ALTER TABLE public.customerorderitemtable OWNER TO postgres;

--
-- Name: customerordertable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customerordertable (
    customerorderid character varying(20) NOT NULL,
    customerid character varying(20),
    customeraddressid character varying(20),
    customerorderdate timestamp without time zone,
    customerorderstatus character varying(255),
    customerordertotalprice numeric(10,2),
    customerorderpaymentmethod character varying(255),
    customerorderpaymentstatus character varying(255),
    deliverypersonid character varying(20)
);


ALTER TABLE public.customerordertable OWNER TO postgres;

--
-- Name: customertable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customertable (
    customerid character varying(20) NOT NULL,
    customerfirstname character varying(255),
    customerlastname character varying(255),
    customeremailadress character varying(255),
    customerpassword character varying(255),
    customercontactnumber character varying(255),
    userroleid character varying(20)
);


ALTER TABLE public.customertable OWNER TO postgres;

--
-- Name: deliverypersontable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.deliverypersontable (
    deliverypersonid character varying(20) NOT NULL,
    deliverypersonfirstname character varying(255),
    deliverypersonlastname character varying(255),
    deliverypersonemailadress character varying(255),
    deliverypersonpassword character varying(255),
    deliverypersoncontactnumber character varying(255),
    userroleid character varying(20),
    branchid character varying(20)
);


ALTER TABLE public.deliverypersontable OWNER TO postgres;

--
-- Name: foodmenupricetable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.foodmenupricetable (
    foodmenupriceid character varying(20) NOT NULL,
    foodmenuid character varying(20),
    foodmenuprice numeric(10,2),
    foodmenucuttype character varying(255)
);


ALTER TABLE public.foodmenupricetable OWNER TO postgres;

--
-- Name: foodmenutable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.foodmenutable (
    foodmenuid character varying(20) NOT NULL,
    foodmenuname character varying(255),
    foodmenudescription text,
    foodmenucategory character varying(255),
    foodmenuimage character varying(255)
);


ALTER TABLE public.foodmenutable OWNER TO postgres;

--
-- Name: productavailabilitytable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.productavailabilitytable (
    availabilityid character varying(20) NOT NULL,
    branchid character varying(20),
    foodmenuid character varying(20),
    available boolean
);


ALTER TABLE public.productavailabilitytable OWNER TO postgres;

--
-- Name: userroletable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.userroletable (
    userroleid character varying(20) NOT NULL,
    userrolename character varying(255)
);


ALTER TABLE public.userroletable OWNER TO postgres;

--
-- Data for Name: admintable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admintable (adminid, adminfirstname, adminlastname, adminemailaddress, adminpassword, admincontactnumber, userroleid, branchid) FROM stdin;
A001	John	Doe	john.doe@example.com	$2b$10$dKWpedidF9J2A.EJWFXIB.c6sWL/jS0wFMeDW4bgPCrsStxnmdxW6	1234567890	ADM	1
A002	Jane	Smith	jane.smith@example.com	$2b$10$1KzeA/hwkEdgDxAZG2aD8.b6pcjA.oA9xkPnKoc6xj53BFeNwv/A2	9876543210	ADM	2
A003	Michael	Johnson	michael.johnson@example.com	$2b$10$y9pPz6.3.PQYmhpBoOB6jeOy0QE927X8.5kIbbxB49fmjbmZ.LfCy	5555555555	ADM	3
A004	Emily	Brown	emily.brown@example.com	$2b$10$lwZ0TBjoNmRQe9tEaEMOc.hJgIqf8Ync1dETXRtgwo./EFfrysmLm	4444444444	ADM	4
A005	David	Williams	david.williams@example.com	$2b$10$CqixZTSxSKCX0Dh2lQ7iF.PW3xG/bWxp1wW1kBR4J9E.MNd6CkfK6	3333333333	ADM	5
\.


--
-- Data for Name: branchtable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.branchtable (branchid, branchname, branchlocationaddress, branchlatitude, branchlongitude) FROM stdin;
1	Branch 1 Kumintang	Kumintang Ibaba, Batangas City	13.76622487	121.06486732
2	Branch 2 Bolbok	Bolbok, Batangas City	13.77117112	121.05076662
3	Branch 3 Santa Rita Karsada	Santa Rita Karsada, Batangas City	13.78114018	121.03468859
4	Branch 4 Ibaan	Ibaan, Batangas	13.82202163	121.13323044
5	Branch 5 Cuenca	Cuenca, Batangas	13.90468727	121.04878367
\.


--
-- Data for Name: carttable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carttable (cartid, customerid, foodmenuid, foodmenupriceid, quantity) FROM stdin;
C76014855	C338899559	0.8619584077263864	XSD87BY7E1C2YEPMX4QR	12
\.


--
-- Data for Name: customeraddresstable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customeraddresstable (customeraddressid, customerid, customerfullname, customercontactnumber, customerstreet, customerbarangay, customercity, customernotes, customeraddresslabel, customeraddressdefault, addresslatitude, addresslongitude) FROM stdin;
h1x09qi	C338899559	Justmyr Gutierrez	091873327161		Balete Relocation Site	Batangas City	Purple House	home	t	13.81907555	121.06428337048469
09hs1ou	C338899559	Desiree Gutierrez	09073720990	Pulo	Balagtas	Batangas city	adasd	Home	f	13.806658825022193	121.06882095336915
\.


--
-- Data for Name: customerorderitemtable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customerorderitemtable (customerorderitemid, customerorderid, foodmenuid, foodmenupriceid, customerorderitemquantity, customerorderitemtotalprice) FROM stdin;
\.


--
-- Data for Name: customerordertable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customerordertable (customerorderid, customerid, customeraddressid, customerorderdate, customerorderstatus, customerordertotalprice, customerorderpaymentmethod, customerorderpaymentstatus, deliverypersonid) FROM stdin;
\.


--
-- Data for Name: customertable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customertable (customerid, customerfirstname, customerlastname, customeremailadress, customerpassword, customercontactnumber, userroleid) FROM stdin;
C338899559	Justmyr	Gutierrez	justmyrgutierrez1@gmail.com	$2b$10$heJmmecFNRrMHgl2IjrU3uUw4P2dslsxB6rdh9gk9612NfbiOB6RW	091873327161	CUS
\.


--
-- Data for Name: deliverypersontable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.deliverypersontable (deliverypersonid, deliverypersonfirstname, deliverypersonlastname, deliverypersonemailadress, deliverypersonpassword, deliverypersoncontactnumber, userroleid, branchid) FROM stdin;
69mkymhok	asd	asdas	dasdasd	$2b$10$JwH6k65Qnd7sebXqZMvSEOu2tV2ZZGN9d3KtHtVvuk5eTsBAV9Nji	1231231	RID	4
4hcrt0tzk	asd	asdasd	asdasd@gmail.com	$2b$10$wL0jvSWvtSZLWQa3z/ArLORXT4K9odshnbhf3Es5wQm/7S.Bjl0r.	8176182	RID	2
p3lluxpfo	asd	asdasdasdasd	asdasd111@gmail.com	$2b$10$u4EerIURNACi9mYtA0oo2uESPZ1oN4..nbsrv9CkjFhHiHsxuIpCO	09271726155	RID	3
\.


--
-- Data for Name: foodmenupricetable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.foodmenupricetable (foodmenupriceid, foodmenuid, foodmenuprice, foodmenucuttype) FROM stdin;
XSD87BY7E1C2YEPMX4QR	0.8619584077263864	500.00	1/2
NH314MAPB8QRX0JO660X	0.8370358705207979	1.00	23
5AD6KYZ13J1OB87CWFQA	0.8370358705207979	3.00	12
\.


--
-- Data for Name: foodmenutable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.foodmenutable (foodmenuid, foodmenuname, foodmenudescription, foodmenucategory, foodmenuimage) FROM stdin;
0.8619584077263864	Lechon Manok	The Best	Chicken	foodMenuImage-1699693728015.png
0.8675227917519235	Lechon Manok	adasd	asdasd	foodMenuImage-1699694482709.jpg
0.8370358705207979	asd	asd	asdasd	foodMenuImage-1699694518477.jpg
\.


--
-- Data for Name: productavailabilitytable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.productavailabilitytable (availabilityid, branchid, foodmenuid, available) FROM stdin;
\.


--
-- Data for Name: userroletable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.userroletable (userroleid, userrolename) FROM stdin;
CUS	Customer
RID	Rider
ADM	Admin
STF	Staff
\.


--
-- Name: admintable admintable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admintable
    ADD CONSTRAINT admintable_pkey PRIMARY KEY (adminid);


--
-- Name: branchtable branchtable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.branchtable
    ADD CONSTRAINT branchtable_pkey PRIMARY KEY (branchid);


--
-- Name: carttable carttable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carttable
    ADD CONSTRAINT carttable_pkey PRIMARY KEY (cartid);


--
-- Name: customeraddresstable customeraddresstable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customeraddresstable
    ADD CONSTRAINT customeraddresstable_pkey PRIMARY KEY (customeraddressid);


--
-- Name: customerorderitemtable customerorderitemtable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customerorderitemtable
    ADD CONSTRAINT customerorderitemtable_pkey PRIMARY KEY (customerorderitemid);


--
-- Name: customerordertable customerordertable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customerordertable
    ADD CONSTRAINT customerordertable_pkey PRIMARY KEY (customerorderid);


--
-- Name: customertable customertable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customertable
    ADD CONSTRAINT customertable_pkey PRIMARY KEY (customerid);


--
-- Name: deliverypersontable deliverypersontable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deliverypersontable
    ADD CONSTRAINT deliverypersontable_pkey PRIMARY KEY (deliverypersonid);


--
-- Name: foodmenupricetable foodmenupricetable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.foodmenupricetable
    ADD CONSTRAINT foodmenupricetable_pkey PRIMARY KEY (foodmenupriceid);


--
-- Name: foodmenutable foodmenutable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.foodmenutable
    ADD CONSTRAINT foodmenutable_pkey PRIMARY KEY (foodmenuid);


--
-- Name: productavailabilitytable productavailabilitytable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productavailabilitytable
    ADD CONSTRAINT productavailabilitytable_pkey PRIMARY KEY (availabilityid);


--
-- Name: userroletable userroletable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userroletable
    ADD CONSTRAINT userroletable_pkey PRIMARY KEY (userroleid);


--
-- Name: admintable admintable_branchid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admintable
    ADD CONSTRAINT admintable_branchid_fkey FOREIGN KEY (branchid) REFERENCES public.branchtable(branchid);


--
-- Name: admintable admintable_userroleid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admintable
    ADD CONSTRAINT admintable_userroleid_fkey FOREIGN KEY (userroleid) REFERENCES public.userroletable(userroleid);


--
-- Name: carttable carttable_customerid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carttable
    ADD CONSTRAINT carttable_customerid_fkey FOREIGN KEY (customerid) REFERENCES public.customertable(customerid);


--
-- Name: carttable carttable_foodmenuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carttable
    ADD CONSTRAINT carttable_foodmenuid_fkey FOREIGN KEY (foodmenuid) REFERENCES public.foodmenutable(foodmenuid);


--
-- Name: carttable carttable_foodmenupriceid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carttable
    ADD CONSTRAINT carttable_foodmenupriceid_fkey FOREIGN KEY (foodmenupriceid) REFERENCES public.foodmenupricetable(foodmenupriceid);


--
-- Name: customeraddresstable customeraddresstable_customerid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customeraddresstable
    ADD CONSTRAINT customeraddresstable_customerid_fkey FOREIGN KEY (customerid) REFERENCES public.customertable(customerid);


--
-- Name: customerorderitemtable customerorderitemtable_customerorderid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customerorderitemtable
    ADD CONSTRAINT customerorderitemtable_customerorderid_fkey FOREIGN KEY (customerorderid) REFERENCES public.customerordertable(customerorderid);


--
-- Name: customerorderitemtable customerorderitemtable_foodmenuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customerorderitemtable
    ADD CONSTRAINT customerorderitemtable_foodmenuid_fkey FOREIGN KEY (foodmenuid) REFERENCES public.foodmenutable(foodmenuid);


--
-- Name: customerorderitemtable customerorderitemtable_foodmenupriceid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customerorderitemtable
    ADD CONSTRAINT customerorderitemtable_foodmenupriceid_fkey FOREIGN KEY (foodmenupriceid) REFERENCES public.foodmenupricetable(foodmenupriceid);


--
-- Name: customerordertable customerordertable_customeraddressid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customerordertable
    ADD CONSTRAINT customerordertable_customeraddressid_fkey FOREIGN KEY (customeraddressid) REFERENCES public.customeraddresstable(customeraddressid);


--
-- Name: customerordertable customerordertable_customerid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customerordertable
    ADD CONSTRAINT customerordertable_customerid_fkey FOREIGN KEY (customerid) REFERENCES public.customertable(customerid);


--
-- Name: customerordertable customerordertable_deliverypersonid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customerordertable
    ADD CONSTRAINT customerordertable_deliverypersonid_fkey FOREIGN KEY (deliverypersonid) REFERENCES public.deliverypersontable(deliverypersonid);


--
-- Name: customertable customertable_userroleid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customertable
    ADD CONSTRAINT customertable_userroleid_fkey FOREIGN KEY (userroleid) REFERENCES public.userroletable(userroleid);


--
-- Name: deliverypersontable deliverypersontable_branchid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deliverypersontable
    ADD CONSTRAINT deliverypersontable_branchid_fkey FOREIGN KEY (branchid) REFERENCES public.branchtable(branchid);


--
-- Name: deliverypersontable deliverypersontable_userroleid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.deliverypersontable
    ADD CONSTRAINT deliverypersontable_userroleid_fkey FOREIGN KEY (userroleid) REFERENCES public.userroletable(userroleid);


--
-- Name: foodmenupricetable foodmenupricetable_foodmenuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.foodmenupricetable
    ADD CONSTRAINT foodmenupricetable_foodmenuid_fkey FOREIGN KEY (foodmenuid) REFERENCES public.foodmenutable(foodmenuid);


--
-- Name: productavailabilitytable productavailabilitytable_branchid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productavailabilitytable
    ADD CONSTRAINT productavailabilitytable_branchid_fkey FOREIGN KEY (branchid) REFERENCES public.branchtable(branchid);


--
-- Name: productavailabilitytable productavailabilitytable_foodmenuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.productavailabilitytable
    ADD CONSTRAINT productavailabilitytable_foodmenuid_fkey FOREIGN KEY (foodmenuid) REFERENCES public.foodmenutable(foodmenuid);


--
-- PostgreSQL database dump complete
--

