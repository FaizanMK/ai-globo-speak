import TranslationForm from "@/components/TranslationForm";
import TranslationHistory from "@/components/TranslationHistory";
import { auth } from "@clerk/nextjs/server";
import React from "react";

export type TranslationLanguages = {
  translation: {
    [key: string]: {
      name: string;
      nativeName: string;
      dir: "ltr" | "rtl";
    };
  };
};

const TranslatePage = async () => {
  //   this will protect the page(mean it will be shown only when the user is logged in)
  auth().protect();
  //   to get user id
  const { userId } = auth();
  if (!userId) throw new Error("User not logged in");

  //   this is from the Miccrosoft and it will give us all the languages, for docs https://learn.microsoft.com/en-us/azure/ai-services/translator/reference/v3-0-languages
  const languagesEndpoint =
    "https://api.cognitive.microsofttranslator.com/languages?api-version=3.0";

  const response = await fetch(languagesEndpoint, {
    next: {
      // this means cache the result for 24 hours and then refresh
      revalidate: 60 * 60 * 24,
    },
  });
  const languages = (await response.json()) as TranslationLanguages;
  return (
    <div className="px-10 xl:px-0 mb-20 ">
      {/* Translation Form */}
      <TranslationForm languages={languages} />

      {/* Translation History */}

      <TranslationHistory />
    </div>
  );
};

export default TranslatePage;
