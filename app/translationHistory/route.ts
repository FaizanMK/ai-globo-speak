// import { getTranslations } from "@/mongodb/models/User";

// import { NextRequest } from "next/server";

// export async function GET(request: NextRequest) {
//   const searchParams = request.nextUrl.searchParams;
//   const userId = searchParams.get("userId");

//   const translations = await getTranslations(userId!);

//   return Response.json({ translations });
// }
import { getTranslations } from "@/mongodb/models/User";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("userId");

  // Check for Authorization header
  const authHeader = request.headers.get("Authorization");
  console.log("Received Authorization header:", authHeader);

  if (!authHeader || authHeader !== `Bearer ${process.env.CLERK_SECRET_KEY}`) {
    console.error("Authorization header missing or incorrect");
    return new Response("Unauthorized", { status: 401 });
  }

  console.log("Authorization header is valid");

  try {
    const translations = await getTranslations(userId!);
    return Response.json({ translations });
  } catch (error) {
    console.error("Error fetching translations:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
