import React, { Suspense } from "react";

const Loadable = (Component) => (props) =>
(
    <Suspense fallback={<div className="text-center py-8">Đang tải...</div>}>
        <Component {...props} />
    </Suspense>
);

export default Loadable;
