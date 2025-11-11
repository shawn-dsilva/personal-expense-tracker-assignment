import * as d3 from 'd3';

const MARGIN = { top: 30, right: 30, bottom: 30, left: 30 };
const BAR_PADDING = 0.3;

type BarplotProps = {
    width: number;
    height: number;
    data: { name: string; value: number }[];
};

export const BarChart = ({ width, height, data }: BarplotProps) => {
    // bounds = area inside the graph axis = calculated by substracting the margins
    const boundsWidth = width - MARGIN.right - MARGIN.left;
    const boundsHeight = height - MARGIN.top - MARGIN.bottom;
    console.log(data)
    // X axis is for groups since the barplot is vertical
    // const groups = data.sort((a, b) => b.value - a.value).map((d) => d.name);
    const xScale = d3
        .scaleBand()
        .domain(data.map(d => d.name))
        .range([0, boundsWidth])
        .padding(BAR_PADDING);

    // Y axis
    const max = d3.max(data.map((d) => d.value)) ?? 10;
    const yScale = d3
        .scaleLinear()
        .domain([max * 1.2, 0])
        .range([0, boundsHeight]);

    const colorScale = d3.scaleOrdinal()
        .domain(data.map(d => d.name)) // Map categories to colors

    colorScale.range(["#00c951", "#fb2c36", "#6a7282"]);
    // Build the shapes
    const allShapes = data.map((d, i) => {
        const x = xScale(d.name);
        if (x === undefined) {
            return null;
        }

        return (
            <g key={i}>
                <rect
                    x={x}
                    y={yScale(d.value)}
                    width={xScale.bandwidth()}
                    height={boundsHeight - yScale(d.value)}
                    opacity={0.9}
                    stroke={colorScale(d.name)}
                    fill={colorScale(d.name)}
                    fillOpacity={0.9}
                    strokeWidth={1}
                    rx={1}
                />
                <text
                    x={x + xScale.bandwidth() / 2}
                    y={yScale(d.value) - 10}
                    textAnchor="middle"
                    alignmentBaseline="central"
                    fontSize={12}
                >
                    {d.value}
                </text>
                <text
                    x={x + xScale.bandwidth() / 2}
                    y={boundsHeight + 10}
                    textAnchor="middle"
                    alignmentBaseline="central"
                    fontSize={12}
                >
                    {d.name}
                </text>
            </g>
        );
    });

    const grid = yScale.ticks(5).map((value, i) => (
        <g key={i}>
            <line
                x1={0}
                x2={boundsWidth}
                y1={yScale(value)}
                y2={yScale(value)}
                stroke="#808080"
                opacity={0.2}
            />
            <text
                x={-10}
                y={yScale(value)}
                textAnchor="middle"
                alignmentBaseline="central"
                fontSize={9}
                stroke="#808080"
                opacity={0.8}
            >
                {value}
            </text>
        </g>
    ));

    return (
        <div className='border-dashed border-2 rounded-lg mt-3'>
            <svg width={width} height={height}>
                <g
                    width={boundsWidth}
                    height={boundsHeight}
                    transform={`translate(${[MARGIN.left, MARGIN.top].join(',')})`}
                >
                    {grid}
                    {allShapes}
                </g>
            </svg>
        </div>
    );
};
