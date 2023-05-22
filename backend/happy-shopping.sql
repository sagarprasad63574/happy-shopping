\echo 'Delete and recreate happy-shopping db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE happy_shopping;
CREATE DATABASE happy_shopping;
\connect happy_shopping

\i happy-shopping-schema.sql
\i happy-shopping-seed.sql

\echo 'Delete and recreate happy_shopping_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE happy_shopping_test;
CREATE DATABASE happy_shopping_test;
\connect happy_shopping_test

\i happy-shopping-schema.sql