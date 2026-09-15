import { Suspense } from "react";

import HomeDashboardLoader from '../components/v1/HomeDashboardLoader';

//<Suspense fallback={<h2>Your Movie Reviews are loading... (Suspense)</h2>}>
//</Suspense>
export default function Page() {
  return (
      <HomeDashboardLoader />
    );
}
