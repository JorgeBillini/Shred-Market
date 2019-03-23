




CREATE TABLE public.buyers (
    id integer NOT NULL,
    email character varying NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    firebase_id character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);




CREATE TABLE public.categories (
    name character varying NOT NULL,
    id integer NOT NULL
);




--
-- TOC entry 2982 (class 0 OID 0)
-- Dependencies: 200
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--



--
-- TOC entry 206 (class 1259 OID 25205)
-- Name: order_item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_item (
    user_id integer NOT NULL,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    shopid integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);



--
-- TOC entry 205 (class 1259 OID 25195)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    buyer_info character varying,
    total_amount integer NOT NULL,
    payment_info character varying NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    buyerid integer,
    shop_id integer
);











CREATE TABLE public.products (
    name character varying NOT NULL,
    image_url_array character varying NOT NULL,
    shop_id integer NOT NULL,
    amount integer NOT NULL,
    specs json NOT NULL,
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE public.shops (
    id integer NOT NULL,
    firebase_id character varying,
    shopname character varying NOT NULL,
    description character varying NOT NULL,
    type character varying NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    email character varying NOT NULL,
    password character varying NOT NULL
);

