-- Revert ccbc:util_functions/grant_permissions from pg

begin;

drop function ccbc_public.grant_permissions(text, text, text, text);
drop function ccbc_public.grant_permissions(text, text, text, text[], text);

commit;
