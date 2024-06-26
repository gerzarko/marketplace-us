

create table "public"."resource_types" (
    "id" bigint generated by default as identity not null,
    "type" text not null
);


alter table "public"."resource_types" enable row level security;

alter table "public"."seller_post" add column "resource_types" bigint[];

CREATE UNIQUE INDEX "resourceTypes_pkey" ON public.resource_types USING btree (id);

alter table "public"."resource_types" add constraint "resourceTypes_pkey" PRIMARY KEY using index "resourceTypes_pkey";

grant delete on table "public"."resource_types" to "anon";

grant insert on table "public"."resource_types" to "anon";

grant references on table "public"."resource_types" to "anon";

grant select on table "public"."resource_types" to "anon";

grant trigger on table "public"."resource_types" to "anon";

grant truncate on table "public"."resource_types" to "anon";

grant update on table "public"."resource_types" to "anon";

grant delete on table "public"."resource_types" to "authenticated";

grant insert on table "public"."resource_types" to "authenticated";

grant references on table "public"."resource_types" to "authenticated";

grant select on table "public"."resource_types" to "authenticated";

grant trigger on table "public"."resource_types" to "authenticated";

grant truncate on table "public"."resource_types" to "authenticated";

grant update on table "public"."resource_types" to "authenticated";

grant delete on table "public"."resource_types" to "service_role";

grant insert on table "public"."resource_types" to "service_role";

grant references on table "public"."resource_types" to "service_role";

grant select on table "public"."resource_types" to "service_role";

grant trigger on table "public"."resource_types" to "service_role";

grant truncate on table "public"."resource_types" to "service_role";

grant update on table "public"."resource_types" to "service_role";

create policy "Enable read access for all users"
on "public"."resource_types"
as permissive
for select
to authenticated
using (true);


INSERT INTO "public"."resource_types" ("id", "type") VALUES
	(1, 'PDF'),
	(2, 'Word'),
	(3, 'ZIP File'),
	(4, 'Whiteboard'),
	(5, 'Image'),
	(6, 'Google Apps');

