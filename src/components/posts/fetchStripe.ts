
import supabase from "../../lib/supabaseClient";
import { ui } from "../../i18n/ui";
import type { uiObject } from "../../i18n/uiType";
import { getLangFromUrl, useTranslations } from "../../i18n/utils";
import stripe from "@lib/stripe";
import type { SecularFilter } from "@components/services/SecularFilter";


export async function fetchStripe() {

  try {
    const { data, error } = await supabase
      .schema('stripe')
      .from('prices')
      .select("*")

    console.log(data)
    console.log(error)

  } catch (error) {
    console.error(error)
  }
}
