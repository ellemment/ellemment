// #app/routes/_editor+/editor.tsx

import { json, type LoaderFunction } from "@remix-run/node";
import Editor from "#app/components/tiptap/editor";
import { getUserInfo, type UserSession } from "#app/utils/editor/utils/session.server";

type LoaderData = {
  userSession: UserSession;
};

export let loader: LoaderFunction = async ({ request }) => {
  try {
    const userSession = await getUserInfo(request);
    const data: LoaderData = {
      userSession,
    };
    return json(data);
  } catch (e) {
    return json({});
  }
};

export default function Index() {
  return (
    <div>
      <div className="pt-2 pb-4 text-center">
      </div>
      <div className="flex justify-center">
        <Editor />
      </div>
    </div>
  );
}
