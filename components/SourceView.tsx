// Copyright 2022 the Deno authors. All rights reserved. MIT license.

import { FileDisplay } from "./FileDisplay.tsx";
import { DirectoryListing } from "./DirectoryListing.tsx";
import {
  CommonProps,
  SourcePageDir,
  SourcePageFile,
} from "@/util/registry_utils.ts";

export function SourceView({
  isStd,
  name,
  version,
  path,
  url,

  repositoryURL,

  data,
}: CommonProps<SourcePageFile | SourcePageDir>) {
  return (
    <main class="mt-7 mb-16 lg:mt-12 space-y-12 section-x-inset-xl w-full overflow-auto focus:outline-none">
      {data.kind === "dir"
        ? (
          <DirectoryListing
            name={name}
            version={version}
            path={path}
            items={data.entries}
            repositoryURL={repositoryURL}
            url={url}
          />
        )
        : (
          data.file instanceof Error
            ? <div>{data.file.message}</div>
            : (
              <FileDisplay
                isStd={isStd}
                version={version}
                raw={data.file.content}
                filetypeOverride={data.file.highlight ? undefined : "text"}
                sourceURL={data.file.url}
                repositoryURL={repositoryURL}
                url={url}
                docable={data.docable}
              />
            )
        )}
    </main>
  );
}
