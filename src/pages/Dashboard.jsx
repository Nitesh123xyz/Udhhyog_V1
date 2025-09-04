import { useState, useEffect } from "react";

const Dashboard = () => {
  const [mounted, setMounted] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const LineChart = () => {
    const artsData = [20, 60, 50, 30, 65, 60, 30, 65, 50];
    const commerceData = [60, 30, 65, 45, 30, 45, 65, 30, 35];
    const months = [
      "15 Jan",
      "Feb '00",
      "Mar '00",
      "Apr '00",
      "May '00",
      "Jun '00",
    ];

    const createPath = (data) => {
      const width = 400;
      const height = 200;
      const padding = 40;

      const xStep = (width - padding * 2) / (data.length - 1);
      const yScale = (height - padding * 2) / 70;

      return data
        .map((point, index) => {
          const x = padding + index * xStep;
          const y = height - padding - point * yScale;
          return `${index === 0 ? "M" : "L"} ${x} ${y}`;
        })
        .join(" ");
    };

    return (
      <div
        className={`rounded-lg p-8 shadow-xl border border-gray-100 h-full backdrop-blur-sm`}
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Unique Visitors
        </h3>
        <div className="flex items-center gap-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg"></div>
            <span className="text-sm font-medium text-gray-700">Arts</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg"></div>
            <span className="text-sm font-medium text-gray-700">Commerce</span>
          </div>
        </div>
        <div className="relative">
          <svg
            width="100%"
            height="200"
            viewBox="0 0 400 200"
            className="overflow-visible"
          >
            {/* Grid lines */}
            {[10, 20, 30, 40, 50, 60, 70].map((y) => (
              <line
                key={y}
                x1="40"
                y1={200 - 40 - (y * 120) / 70}
                x2="360"
                y2={200 - 40 - (y * 120) / 70}
                stroke="#f1f5f9"
                strokeWidth="1"
              />
            ))}

            {/* Y-axis labels */}
            {[10, 20, 30, 40, 50, 60, 70].map((y) => (
              <text
                key={y}
                x="30"
                y={200 - 40 - (y * 120) / 70 + 4}
                fontSize="12"
                fill="#64748b"
                textAnchor="end"
                className="font-medium"
              >
                {y}
              </text>
            ))}

            {/* X-axis labels */}
            {months.map((month, index) => (
              <text
                key={month}
                x={40 + index * 60}
                y="190"
                fontSize="12"
                fill="#64748b"
                textAnchor="middle"
                className="font-medium"
              >
                {month}
              </text>
            ))}

            {/* Gradient definitions */}
            <defs>
              <linearGradient
                id="artsGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
              <linearGradient
                id="commerceGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>

            {/* Arts line with gradient */}
            <path
              d={createPath(artsData)}
              fill="none"
              stroke="url(#artsGradient)"
              strokeWidth="3"
              className="drop-shadow-sm"
            />

            {/* Commerce line with gradient */}
            <path
              d={createPath(commerceData)}
              fill="none"
              stroke="url(#commerceGradient)"
              strokeWidth="3"
              className="drop-shadow-sm"
            />

            {/* Interactive data points */}
            {artsData.map((point, index) => (
              <circle
                key={`arts-${index}`}
                cx={40 + index * 60}
                cy={200 - 40 - (point * 120) / 70}
                r={hoveredPoint === `arts-${index}` ? "6" : "4"}
                fill="url(#artsGradient)"
                className="cursor-pointer transition-all duration-200 drop-shadow-md hover:drop-shadow-lg"
                onMouseEnter={() => setHoveredPoint(`arts-${index}`)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            ))}

            {commerceData.map((point, index) => (
              <circle
                key={`commerce-${index}`}
                cx={40 + index * 60}
                cy={200 - 40 - (point * 120) / 70}
                r={hoveredPoint === `commerce-${index}` ? "6" : "4"}
                fill="url(#commerceGradient)"
                className="cursor-pointer transition-all duration-200 drop-shadow-md hover:drop-shadow-lg"
                onMouseEnter={() => setHoveredPoint(`commerce-${index}`)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            ))}
          </svg>
        </div>
      </div>
    );
  };

  const DonutChart = ({
    newValue = 674,
    returnValue = 182,
    className = "",
    isDark = false,
  }) => {
    const total = newValue + returnValue;
    const newPercentage = (newValue / total) * 100;
    const returnPercentage = (returnValue / total) * 100;

    const radius = 50;
    const strokeWidth = 10;
    const normalizedRadius = radius - strokeWidth * 2;
    const circumference = normalizedRadius * 2 * Math.PI;

    const newStrokeDasharray = `${
      (newPercentage / 100) * circumference
    } ${circumference}`;
    const returnStrokeDasharray = `${
      (returnPercentage / 100) * circumference
    } ${circumference}`;
    const returnStrokeDashoffset = -((newPercentage / 100) * circumference);

    return (
      <div className={`relative ${className}`}>
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          <defs>
            <linearGradient
              id="newGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient
              id="returnGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient
              id="returnGradientDark"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
          </defs>

          {/* Background circle */}
          <circle
            stroke={isDark ? "rgba(255,255,255,0.2)" : "#e2e8f0"}
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />

          {/* New customers arc with animation */}
          <circle
            stroke="url(#newGradient)"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={newStrokeDasharray}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="transition-all duration-1000 ease-out"
            style={{
              animation: "drawCircle 2s ease-out",
            }}
          />

          {/* Return customers arc with animation */}
          <circle
            stroke={
              isDark ? "url(#returnGradientDark)" : "url(#returnGradient)"
            }
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={returnStrokeDasharray}
            strokeDashoffset={returnStrokeDashoffset}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="transition-all duration-1000 ease-out"
            style={{
              animation: "drawCircle 2s ease-out 0.5s both",
            }}
          />
        </svg>
        <style jsx>{`
          @keyframes drawCircle {
            from {
              stroke-dasharray: 0 ${circumference};
            }
          }
        `}</style>
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen p-2 bg-[var(--background)] backdrop-blur-sm rounded-t-lg`}
    >
      <div className="mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Orders Received */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-blue-400/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold opacity-90 tracking-wide uppercase">
                Orders Received
              </h3>
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                <div className="w-5 h-4 border-2 border-white rounded-sm relative">
                  <div className="absolute -top-1 -right-1 w-2 h-2 border-2 border-white rounded-full bg-white"></div>
                </div>
              </div>
            </div>
            <div className="text-4xl font-bold mb-4 tracking-tight">486</div>
            <div className="flex justify-between text-sm opacity-90 font-medium">
              <span>Completed Orders</span>
              <span className="font-bold">351</span>
            </div>
          </div>

          {/* Total Sales */}
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-emerald-400/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold opacity-90 tracking-wide uppercase">
                Total Sales
              </h3>
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                <div className="w-5 h-5 border-2 border-white rounded-full relative">
                  <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="text-4xl font-bold mb-4 tracking-tight">1641</div>
            <div className="flex justify-between text-sm opacity-90 font-medium">
              <span>This Month</span>
              <span className="font-bold">213</span>
            </div>
          </div>

          {/* Revenue */}
          <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-amber-300/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold opacity-90 tracking-wide uppercase">
                Revenue
              </h3>
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                <div className="w-5 h-5 border-2 border-white rounded-full">
                  <div className="w-2 h-2 bg-white rounded-full mt-1 ml-1"></div>
                </div>
              </div>
            </div>
            <div className="text-4xl font-bold mb-4 tracking-tight">
              $42,562
            </div>
            <div className="flex justify-between text-sm opacity-90 font-medium">
              <span>This Month</span>
              <span className="font-bold">$5,032</span>
            </div>
          </div>

          {/* Total Profit */}
          <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-pink-400/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold opacity-90 tracking-wide uppercase">
                Total Profit
              </h3>
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                <div className="w-5 h-5 bg-white/30 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="text-4xl font-bold mb-4 tracking-tight">$9,562</div>
            <div className="flex justify-between text-sm opacity-90 font-medium">
              <span>This Month</span>
              <span className="font-bold">$542</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Line Chart */}
          <div className="lg:col-span-1">
            <LineChart />
          </div>

          {/* Customers Chart - White Background */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Customers</h3>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900 tracking-tight">
                  826
                </div>
                <div className="text-sm text-emerald-600 font-semibold flex items-center gap-1">
                  8.2%
                  <span className="text-emerald-500">↗</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center mb-6">
              <DonutChart />
            </div>

            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg"></div>
                <div>
                  <div className="text-xl font-bold text-gray-900">674</div>
                  <div className="text-sm text-gray-600 font-medium">New</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg"></div>
                <div>
                  <div className="text-xl font-bold text-gray-900">182</div>
                  <div className="text-sm text-gray-600 font-medium">
                    Return
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customers Chart - Blue Background */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-blue-400/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Customers</h3>
              <div className="text-right">
                <div className="text-3xl font-bold tracking-tight">826</div>
                <div className="text-sm opacity-90 font-semibold flex items-center gap-1">
                  8.2%
                  <span className="text-blue-200">↗</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center mb-6">
              <DonutChart isDark={true} />
            </div>

            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-emerald-400 shadow-lg"></div>
                <div>
                  <div className="text-xl font-bold">674</div>
                  <div className="text-sm opacity-90 font-medium">New</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-white shadow-lg"></div>
                <div>
                  <div className="text-xl font-bold">182</div>
                  <div className="text-sm opacity-90 font-medium">Return</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
