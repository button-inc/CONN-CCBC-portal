-- Deploy ccbc:tables/applications to pg
-- requires: schemas/public

begin;

create table if not exists ccbc_public.applications (
  id integer primary key generated always as identity,
  reference_number varchar(1000),
  owner uuid,
  form_data jsonb not null default '{}'::jsonb,
  status varchar(1000) default 'draft',
  unique(owner)
);

select ccbc_private.upsert_timestamp_columns('ccbc_public', 'applications');

create index ccbc_owner on ccbc_public.applications(owner);

do
$grant$
begin

-- Grant ccbc_auth_user permissions
perform ccbc_private.grant_permissions('select', 'applications', 'ccbc_auth_user');
perform ccbc_private.grant_permissions('insert', 'applications', 'ccbc_auth_user');
perform ccbc_private.grant_permissions('update', 'applications', 'ccbc_auth_user',
  ARRAY['id', 'owner', 'form_data', 'status', 'created_by', 'created_at', 'updated_by', 'updated_at', 'archived_by', 'archived_at']);

-- Grant  ccbc_guest persmissions
perform ccbc_private.grant_permissions('select', 'applications', 'ccbc_guest');

end
$grant$;

comment on table ccbc_public.applications is 'Table containing the data associated with the CCBC respondents application';
comment on column ccbc_public.applications.id is 'Primary key ID for the application';
comment on column ccbc_public.applications.reference_number is 'Reference number assigned to the application';
comment on column ccbc_public.applications.owner is 'The owner of the application';
comment on column ccbc_public.applications.form_data is 'The data entered into the form by the respondent';
comment on column ccbc_public.applications.status is 'The status of the application, draft or complete';

commit;
