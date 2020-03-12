import React, {Suspense} from "react";
import {GridContent} from '@ant-design/pro-layout';

import LonghuTable from "./components/LonghuTable";


const LonghuAnalysis: React.FC<{}> = () => {
  return (
    <GridContent>
      <React.Fragment>
        <Suspense fallback={null}>
          <LonghuTable />
        </Suspense>
      </React.Fragment>
    </GridContent>
  );
};

export default LonghuAnalysis;
