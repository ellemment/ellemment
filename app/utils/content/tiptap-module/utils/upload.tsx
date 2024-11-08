// #app/routes/_editor+/_api/upload.tsx

import { type ActionFunctionArgs, json } from "@remix-run/node";

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const requiredEnvVars = ["SUPABASE_API_URL", "SUPABASE_KEY", "SUPABASE_ANON_PUBLIC_KEY"];
  const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);
  if (missingEnvVars.length) {
    return json("Missing env vars: " + missingEnvVars.join(", "), {
      status: 401,
    });
  }

  const file = request.body || "";
  const filename = request.headers.get("x-vercel-filename") || "file.txt";
  const contentType = request.headers.get("content-type") || "text/plain";
  const fileType = `.${contentType.split("/")[1]}`;

  // construct final filename based on content-type if not provided
  const finalName = filename.includes(fileType) ? filename : `${filename}${fileType}`;
  try {
    console.log("TODO: Save blob", {
      file,
      finalName,
      contentType,
    });
    // const blob = await put(finalName, file, {
    //   contentType,
    //   access: "public",
    // });
    throw new Error("TODO: Save blob");

    return json({ success: "File uploaded successfully." }, { status: 200 });
  } catch (error: any) {
     
    console.error("Error uploading file", error.message);
    return new Response(error.message, { status: 500 });
  }
};
