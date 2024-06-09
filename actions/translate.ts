"use server";

import { State } from "@/components/TranslationForm";
import connectDB from "@/mongodb/db";
import { addOrUpdateUser } from "@/mongodb/models/User";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { revalidateTag } from "next/cache";
import { v4 } from "uuid";

const key = process.env.AZURE_TEXT_TRANSLATION_KEY;
const endpoint = process.env.AZURE_TEXT_TRANSLATION;
const location = process.env.AZURE_TEXT_LOCATION;

async function translate(prevState: State, formData: FormData) {
  auth().protect();
  const { userId } = auth();

  if (!userId) throw new Error("User not found");
  const rawFormData = {
    // input,inputLanguage etc are coming from the TranslationForm's form (value names)
    input: formData.get("input") as string,
    inputLanguage: formData.get("inputLanguage") as string,
    output: formData.get("output") as string,
    outputLanguage: formData.get("outputLanguage") as string,
  };

  //   request to the azure transaltor api to translate the input text
  const response = await axios({
    baseURL: endpoint,
    url: "translate",
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": key!,
      "Ocp-Apim-Subscription-Region": location!,
      "Content-type": "application/json",
      //   v4 is from npm uuid library
      "X-ClientTraceId": v4().toString(),
    },
    params: {
      "api-version": "3.0",
      from:
        rawFormData.inputLanguage === "auto" ? null : rawFormData.inputLanguage,
      to: rawFormData.outputLanguage,
    },
    data: [
      {
        text: rawFormData.input,
      },
    ],
    responseType: "json",
  });

  const data = response.data;

  if (data.error) {
    console.log(`Error ${data.error.code}: ${data.error.message}`);
  }

  //   Push to MongoDB here ...

  await connectDB();
  //   if the input language is auto, we will set the input language to the detected language e.g. we speak in urud it should change the auto detective language to urdu
  if (rawFormData.inputLanguage === "auto") {
    rawFormData.inputLanguage = data[0].detectedLanguage.language;
  }

  try {
    const translation = {
      to: rawFormData.outputLanguage,
      from: rawFormData.inputLanguage,
      fromText: rawFormData.input,
      toText: data[0].translations[0].text,
    };

    addOrUpdateUser(userId, translation);
  } catch (err) {
    console.error(err);
  }

  revalidateTag("translationHistory");

  return {
    // this is the translation that comes back to us
    ...prevState,

    output: data[0].translations[0].text,
  };
}

export default translate;
