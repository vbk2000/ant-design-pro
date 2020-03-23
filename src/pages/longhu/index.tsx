import React, {Suspense} from "react";
import {GridContent} from '@ant-design/pro-layout';

import LonghuTable from "./components/LonghuTable";
import BarPlot from "./components/BarPlot";


const LonghuAnalysis: React.FC<{}> = () => {
  return (
    <GridContent>
      <React.Fragment>
        <Suspense fallback={null}>
          <LonghuTable />
        </Suspense>
        {/*<Suspense fallback={null}>*/}
        {/*  <BarPlot />*/}
        {/*</Suspense>*/}
      </React.Fragment>
    </GridContent>
  );
};

export default LonghuAnalysis;
