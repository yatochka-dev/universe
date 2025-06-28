import {RefreshRouteOnSave} from "~/app/(app)/rors";
import {Suspense} from "react";

export default function LivePreviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<>Loading live preview...</>}>
        <RefreshRouteOnSave/>

        {children}

    </Suspense>
  )
}