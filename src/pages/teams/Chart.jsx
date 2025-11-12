import React, { useLayoutEffect, useRef } from 'react';
import { OrgChart } from 'd3-org-chart';

export const OrgChartComponent = (props, ref) => {
  const d3Container = useRef(null);
  const chartRef = useRef(new OrgChart());

  function addNode(node) {
    chartRef.current.addNode(node);
  }

  props.setClick(addNode);

  // We need to manipulate DOM
  useLayoutEffect(() => {
    if (props.data && d3Container.current) {
      chartRef.current
        .container(d3Container.current)
        .data(props.data)
        .nodeWidth((d) => 200)
        .nodeHeight((d) => 120)
        .onNodeClick((d, i, arr) => {
          console.log(d, 'Id of clicked node ');
          props.onNodeClick(d);
        })
        .render();
    }
  }, [props.data, d3Container.current]);

  return (
    <div>
      <div ref={d3Container} />
    </div>
  );
};
