import { component$, Resource, useResource$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { getContent, RenderContent, getBuilderSearchParams } from "@builder.io/sdk-qwik";

export const BUILDER_PUBLIC_API_KEY = "e2743f60012d408688bf050e1e8606dc";
export const BUILDER_MODEL = "page";

export default component$(() => {
  const location = useLocation();
  const builderContentRsrc = useResource$<any>(() => {
    return getContent({
      model: BUILDER_MODEL,
      apiKey: BUILDER_PUBLIC_API_KEY,
      options: getBuilderSearchParams(location.query),
      userAttributes: {
        urlPath: location.pathname || "/",
      },
    });
  });

  return (
    <div>
      <main>
        <Resource
          value={builderContentRsrc}
          onPending={() => <div>Loading...</div>}
          onResolved={(content) => (
            <RenderContent
              model={BUILDER_MODEL}
              content={content}
              apiKey={BUILDER_PUBLIC_API_KEY}
            />
          )}
        />
      </main>
    </div>
  );
});