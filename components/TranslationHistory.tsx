// import { ITranslation } from "@/mongodb/models/User";
// import { auth } from "@clerk/nextjs/server";
// import DeleteTranslationButton from "./DeleteTranslationButton";
// import TimeAgoText from "./TimeAgoText";

// const getLanguage = (code: string) => {
//   const lang = new Intl.DisplayNames(["en"], { type: "language" });
//   return lang.of(code);
// };

// async function TranslationHistory() {
//   const { userId } = auth();

//   const url = `${
//     process.env.NODE_ENV === "development"
//       ? "http://localhost:3000"
//       : process.env.VERCEL_URL
//   }/translationHistory?userId=${userId}`;

//   const response = await fetch(url, {
//     next: {
//       tags: ["translationHistory"],
//     },
//   });

//   const { translations }: { translations: Array<ITranslation> } =
//     await response.json();
//   console.log("*********translations", translations);

//   return (
//     <div className="">
//       <h1 className="text-3xl my-5">History</h1>

//       {/* Show a message if there are no translations */}
//       {translations.length === 0 && (
//         <p className="mb-5 text-gray-400">No translations yet</p>
//       )}

//       {/* Show a list of translations */}
//       <ul className="divide-y border rounded-md">
//         {translations?.map((translation) => (
//           <li
//             key={translation._id as string}
//             className="flex justify-between items-center p-5 hover:bg-gray-50 relative"
//           >
//             <div>
//               <p className="text-sm mb-5 text-gray-500">
//                 {getLanguage(translation.from)}
//                 {" -> "}
//                 {getLanguage(translation.to)}
//               </p>

//               <div className="space-y-2 pr-5">
//                 <p>{translation.fromText}</p>
//                 <p className="text-gray-400">{translation.toText}</p>
//               </div>
//             </div>

//             <p className="text-sm text-gray-300 absolute top-2 right-2">
//               <TimeAgoText
//                 date={new Date(translation.timestamp).toISOString()}
//               />
//             </p>

//             <DeleteTranslationButton id={translation._id as string} />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default TranslationHistory;

import { ITranslation } from "@/mongodb/models/User";
import { auth } from "@clerk/nextjs/server";
import DeleteTranslationButton from "./DeleteTranslationButton";
import TimeAgoText from "./TimeAgoText";

const getLanguage = (code: string) => {
  const lang = new Intl.DisplayNames(["en"], { type: "language" });
  return lang.of(code);
};

async function TranslationHistory() {
  const { userId } = auth();

  if (!userId) {
    console.error("User not authenticated");
    throw new Error("User not authenticated");
  }

  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : `https://${process.env.VERCEL_URL}`;

  const url = `${baseUrl}/translationHistory?userId=${userId}`;

  const response = await fetch(url, {
    next: {
      tags: ["translationHistory"],
    },
  });

  if (!response.ok) {
    console.error(`Error fetching translation history: ${response.statusText}`);
    throw new Error(`Failed to fetch translation history: ${response.status}`);
  }

  let translations: Array<ITranslation> = [];
  try {
    const data = await response.json();
    translations = data.translations;
  } catch (error) {
    console.error("Failed to parse JSON response:", error);
    throw new Error("Failed to parse JSON response");
  }

  console.log("*********translations", translations);

  return (
    <div className="">
      <h1 className="text-3xl my-5">History</h1>

      {/* Show a message if there are no translations */}
      {translations.length === 0 && (
        <p className="mb-5 text-gray-400">No translations yet</p>
      )}

      {/* Show a list of translations */}
      <ul className="divide-y border rounded-md">
        {translations?.map((translation) => (
          <li
            key={translation._id as string}
            className="flex justify-between items-center p-5 hover:bg-gray-50 relative"
          >
            <div>
              <p className="text-sm mb-5 text-gray-500">
                {getLanguage(translation.from)}
                {" -> "}
                {getLanguage(translation.to)}
              </p>

              <div className="space-y-2 pr-5">
                <p>{translation.fromText}</p>
                <p className="text-gray-400">{translation.toText}</p>
              </div>
            </div>

            <p className="text-sm text-gray-300 absolute top-2 right-2">
              <TimeAgoText
                date={new Date(translation.timestamp).toISOString()}
              />
            </p>

            <DeleteTranslationButton id={translation._id as string} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TranslationHistory;
