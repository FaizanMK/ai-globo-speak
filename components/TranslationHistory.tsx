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
//   console.log("Fetch URLLLLLL:", url);
//   console.log("VERCEL_URLLLL:", process.env.VERCEL_URL);

//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }
//   if (!url) {
//     console.error(
//       "Base URL is not defined. Please set VERCEL_URL environment variable."
//     );
//   }
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

// --------------------------------------------------------------------------------------------
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

//   const baseUrl =
//     process.env.NODE_ENV === "development"
//       ? "http://localhost:3000"
//       : process.env.VERCEL_URL?.startsWith("http")
//       ? process.env.VERCEL_URL
//       : `https://${process.env.VERCEL_URL}`;

//   console.log("process.env.NODE_ENV:", process.env.NODE_ENV);
//   console.log("process.env.VERCEL_URL:", process.env.VERCEL_URL);
//   console.log("Base URL:", baseUrl);

//   if (!baseUrl) {
//     console.error(
//       "Base URL is not defined. Please set VERCEL_URL environment variable."
//     );
//     return (
//       <div>
//         <h1 className="text-3xl my-5">History</h1>
//         <p className="mb-5 text-red-500">
//           Server configuration error. Please try again later.
//         </p>
//       </div>
//     );
//   }

//   try {
//     if (!userId) {
//       throw new Error("User is not authenticated.");
//     }

//     const url = new URL(`${baseUrl}/translationHistory`);
//     url.searchParams.append("userId", userId);

//     console.log("Constructed URL:", url.toString());

//     const headers = {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`, // Ensure this is correctly set
//     };

//     console.log("Headers:", headers);

//     const response = await fetch(url.toString(), {
//       method: "GET",
//       headers: headers,
//       next: {
//         tags: ["translationHistory"],
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const { translations }: { translations: Array<ITranslation> } =
//       await response.json();
//     console.log("Translations:", translations);

//     return (
//       <div className="">
//         <h1 className="text-3xl my-5">History</h1>
//         {translations.length === 0 && (
//           <p className="mb-5 text-gray-400">No translations yet</p>
//         )}
//         <ul className="divide-y border rounded-md">
//           {translations?.map((translation) => (
//             <li
//               key={translation._id as string}
//               className="flex justify-between items-center p-5 hover:bg-gray-50 relative"
//             >
//               <div>
//                 <p className="text-sm mb-5 text-gray-500">
//                   {getLanguage(translation.from)}
//                   {" -> "}
//                   {getLanguage(translation.to)}
//                 </p>

//                 <div className="space-y-2 pr-5">
//                   <p>{translation.fromText}</p>
//                   <p className="text-gray-400">{translation.toText}</p>
//                 </div>
//               </div>

//               <p className="text-sm text-gray-300 absolute top-2 right-2">
//                 <TimeAgoText
//                   date={new Date(translation.timestamp).toISOString()}
//                 />
//               </p>

//               <DeleteTranslationButton id={translation._id as string} />
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   } catch (error: any) {
//     console.error("Error fetching translation history:", error);
//     return (
//       <div>
//         <h1 className="text-3xl my-5">History</h1>
//         <p className="mb-5 text-red-500">
//           Failed to load translations. Please try again later.
//         </p>
//         <p className="mb-5 text-gray-400">{error.message}</p>
//       </div>
//     );
//   }
// }

// export default TranslationHistory;

// --------------------------------------------------------------------------------------------

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

  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.VERCEL_URL;

  if (!baseUrl) {
    console.error(
      "Base URL is not defined. Please set VERCEL_URL environment variable."
    );
    return (
      <div>
        <h1 className="text-3xl my-5">History</h1>
        <p className="mb-5 text-red-500">
          Server configuration error. Please try again later.
        </p>
      </div>
    );
  }

  try {
    if (!userId) {
      throw new Error("User is not authenticated.");
    }

    const url = new URL(`/translationHistory?userId=${userId}`, baseUrl);
    console.log("Fetch URL:", url.toString());

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers like authorization tokens if needed
      },
      next: {
        tags: ["translationHistory"],
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { translations }: { translations: Array<ITranslation> } =
      await response.json();
    console.log("Translations:", translations);

    return (
      <div className="">
        <h1 className="text-3xl my-5">History</h1>
        {translations.length === 0 && (
          <p className="mb-5 text-gray-400">No translations yet</p>
        )}
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
  } catch (error: any) {
    console.error("Error fetching translation history:", error);
    return (
      <div>
        <h1 className="text-3xl my-5">History</h1>
        <p className="mb-5 text-red-500">
          Failed to load translations. Please try again later.
        </p>
        <p className="mb-5 text-gray-400">{error.message}</p>
      </div>
    );
  }
}

export default TranslationHistory;
