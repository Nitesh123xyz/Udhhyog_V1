// src/pages/TeamTable.jsx
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as OrgChartModule from "d3-org-chart";

/* ---------- Dummy data: edit this to whatever structure you want ---------- */
const DUMMY_DATA = [
  {
    id: "1",
    parentId: null,
    name: "Aarav Patel",
    title: "Chief Executive Officer (CEO)",
    image: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: "2",
    parentId: "1",
    name: "Maya Singh",
    title: "Chief Technology Officer (CTO)",
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: "3",
    parentId: "1",
    name: "Rohit Verma",
    title: "Chief Financial Officer (CFO)",
    image: "https://i.pravatar.cc/150?img=13",
  },
  {
    id: "4",
    parentId: "1",
    name: "Priya Nair",
    title: "Chief Operating Officer (COO)",
    image: "https://i.pravatar.cc/150?img=14",
  },
  {
    id: "5",
    parentId: "2",
    name: "Leena Rao",
    title: "Engineering Manager",
    image: "https://i.pravatar.cc/150?img=15",
  },
  {
    id: "6",
    parentId: "2",
    name: "Rahul Sharma",
    title: "Senior Software Engineer",
    image: "https://i.pravatar.cc/150?img=16",
  },
  {
    id: "7",
    parentId: "5",
    name: "Dev 1",
    title: "Frontend Developer",
    image: "https://i.pravatar.cc/150?img=17",
  },
  {
    id: "8",
    parentId: "5",
    name: "Dev 2",
    title: "Backend Developer",
    image: "https://i.pravatar.cc/150?img=18",
  },
  {
    id: "9",
    parentId: "3",
    name: "Nisha Kapoor",
    title: "Finance Manager",
    image: "https://i.pravatar.cc/150?img=19",
  },
  {
    id: "10",
    parentId: "9",
    name: "Amit Khanna",
    title: "Accountant",
    image: "https://i.pravatar.cc/150?img=20",
  },
  {
    id: "11",
    parentId: "4",
    name: "Sneha Mehta",
    title: "Operations Manager",
    image: "https://i.pravatar.cc/150?img=21",
  },
  {
    id: "12",
    parentId: "11",
    name: "Rakesh Tiwari",
    title: "Logistics Supervisor",
    image: "https://i.pravatar.cc/150?img=22",
  },
];

/* ---------- Utils (same as earlier) ---------- */
function escapeHtml(unsafe) {
  if (unsafe === undefined || unsafe === null) return "";
  return String(unsafe)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getOrgChartConstructor(mod) {
  if (!mod) return null;
  if (typeof mod === "function") return mod;
  if (mod.default && typeof mod.default === "function") return mod.default;
  if (mod.OrgChart && typeof mod.OrgChart === "function") return mod.OrgChart;
  for (const k of Object.keys(mod)) {
    if (typeof mod[k] === "function") return mod[k];
  }
  return null;
}

/* ---------- Simple descendant check to prevent invalid reparenting ---------- */
function isDescendant(data, ancestorId, descendantId) {
  if (!ancestorId || !descendantId) return false;
  let cur = data.find((r) => String(r.id) === String(descendantId));
  const seen = new Set();
  while (cur && cur.parentId) {
    if (seen.has(cur.id)) break;
    seen.add(cur.id);
    if (String(cur.parentId) === String(ancestorId)) return true;
    cur = data.find((r) => String(r.id) === String(cur.parentId));
  }
  return false;
}

/* ---------- OrgChartComponent: renders chart from `data` prop ---------- */
const OrgChartComponent = ({ data, onNodeClick, onReparent }) => {
  const ref = useRef(null);
  const chartRef = useRef(null);
  const OrgCtor = useRef(getOrgChartConstructor(OrgChartModule));
  const dragRef = useRef({});

  useLayoutEffect(() => {
    const OrgChartConstructor = OrgCtor.current;
    if (!OrgChartConstructor) {
      console.error(
        "OrgChart constructor not found; check d3-org-chart exports."
      );
      return;
    }
    if (!ref.current) return;

    if (!data || data.length === 0) {
      ref.current.innerHTML = "";
      return;
    }

    if (chartRef.current && typeof chartRef.current.destroy === "function") {
      try {
        chartRef.current.destroy();
      } catch (e) {}
      chartRef.current = null;
      ref.current.innerHTML = "";
    }

    const chart = new OrgChartConstructor()
      .container(ref.current)
      .data(data)
      .nodeWidth(() => 240)
      .nodeHeight(() => 92)
      .childrenMargin(() => 36)
      .compactMarginBetween(() => 12)
      .compactMarginPair(() => 60)
      .nodeContent((d) => {
        const raw = d.data || {};
        const name = raw.name || raw.nodeId || raw.label || "No name";
        const title = raw.title || raw.position || "";
        const initials = String(name)
          .split(" ")
          .map((s) => s[0] || "")
          .slice(0, 2)
          .join("")
          .toUpperCase();
        const img = raw.image || raw.img || "";

        const avatar = img
          ? `<div style="width:56px;height:56px;border-radius:50%;overflow:hidden;flex-shrink:0">
               <img src="${escapeHtml(img)}" alt="${escapeHtml(
              name
            )}" style="width:100%;height:100%;object-fit:cover;display:block"/>
             </div>`
          : `<div style="width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#6366f1,#06b6d4);color:white;font-weight:700;font-size:16px;flex-shrink:0;">
               ${escapeHtml(initials)}
             </div>`;

        return `
          <div style="display:flex;gap:12px;align-items:center;padding:10px 12px;font-family:Inter, system-ui, Arial">
            ${avatar}
            <div className="text-[var(--text)] style="flex:1;min-width:0">
              <div style="font-weight:700;font-size:14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                ${escapeHtml(name)}
              </div>
              <div style="font-size:12px;color:#475569;margin-top:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                ${escapeHtml(title)}
              </div>
            </div>
          </div>
        `;
      });

    // click handler
    const nodeClick = (...args) => {
      let maybe = null;
      for (const a of args)
        if (a && a.data) {
          maybe = a.data;
          break;
        }
      if (!maybe) maybe = args[1] || args[0] || null;
      if (onNodeClick) onNodeClick(maybe);
    };
    try {
      if (typeof chart.onNodeClick === "function") chart.onNodeClick(nodeClick);
      else if (typeof chart.on === "function") chart.on("click", nodeClick);
    } catch (e) {
      /* ignore */
    }

    try {
      chart.render();
    } catch (e) {
      console.error("render failed", e);
    }

    // pan & zoom (remove the need for parent scrollbars)
    try {
      const svg = ref.current.querySelector("svg");
      if (svg) {
        const zoom = d3
          .zoom()
          .scaleExtent([0.2, 3])
          .on("zoom", (event) => {
            const g = svg.querySelector("g");
            if (g) g.setAttribute("transform", event.transform.toString());
          });
        d3.select(svg).call(zoom);
        d3.select(svg).call(
          zoom.transform,
          d3.zoomIdentity.translate(20, 20).scale(1)
        );
      }
    } catch (e) {}

    chartRef.current = chart;

    // attach drag handlers to nodes (very simplistic)
    const attachDrag = () => {
      if (!ref.current) return;
      const nodes = Array.from(ref.current.querySelectorAll("[data-id]"));
      // cleanup previous
      if (dragRef.current.detach) {
        try {
          dragRef.current.detach();
        } catch (_) {}
      }
      const listeners = [];
      nodes.forEach((nodeEl) => {
        nodeEl.style.touchAction = "none";
        const onDown = (ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          const draggedId =
            nodeEl.getAttribute("data-id") ||
            nodeEl.getAttribute("data-node-id") ||
            nodeEl.id;
          if (!draggedId) return;
          const ghost = nodeEl.cloneNode(true);
          ghost.style.position = "fixed";
          ghost.style.pointerEvents = "none";
          ghost.style.zIndex = 9999;
          ghost.style.opacity = 0.9;
          ghost.style.width = `${nodeEl.getBoundingClientRect().width}px`;
          document.body.appendChild(ghost);
          const move = (me) => {
            ghost.style.left = `${me.clientX - 28}px`;
            ghost.style.top = `${me.clientY - 28}px`;
          };
          const up = (ue) => {
            const el = document.elementFromPoint(ue.clientX, ue.clientY);
            const target = el ? el.closest("[data-id]") : null;
            const targetId = target
              ? target.getAttribute("data-id") ||
                target.getAttribute("data-node-id") ||
                target.id
              : null;
            // cleanup ghost
            try {
              if (ghost.parentNode) ghost.parentNode.removeChild(ghost);
            } catch (_) {}
            window.removeEventListener("pointermove", move);
            window.removeEventListener("pointerup", up);
            // if valid target and not dropping onto self or descendant, call onReparent
            if (targetId && String(targetId) !== String(draggedId)) {
              if (onReparent) {
                // parent will update state
                onReparent({
                  type: "reparent",
                  nodeId: draggedId,
                  newParentId: targetId,
                });
              }
            }
          };
          window.addEventListener("pointermove", move, { passive: false });
          window.addEventListener("pointerup", up, { passive: false });
          listeners.push(() => window.removeEventListener("pointermove", move));
          listeners.push(() => window.removeEventListener("pointerup", up));
        };
        nodeEl.addEventListener("pointerdown", onDown, { passive: false });
        listeners.push(() => nodeEl.removeEventListener("pointerdown", onDown));
      });
      dragRef.current.detach = () =>
        listeners.forEach((fn) => {
          try {
            fn();
          } catch (_) {}
        });
    };

    // small timeout so nodes exist
    const t = setTimeout(() => attachDrag(), 60);

    return () => {
      clearTimeout(t);
      if (dragRef.current.detach)
        try {
          dragRef.current.detach();
        } catch (_) {}
      if (chartRef.current && typeof chartRef.current.destroy === "function")
        try {
          chartRef.current.destroy();
        } catch (_) {}
      chartRef.current = null;
    };
  }, [data, onNodeClick, onReparent]);

  return <div ref={ref} style={{ width: "100%", height: "100%" }} />;
};

/* ---------- Parent: TeamTable (manual data + add/remove examples) ---------- */
export default function TeamTable() {
  const [data, setData] = useState(DUMMY_DATA);

  // Add node under the root (or under a chosen parent)
  function addNodeUnder(parentId = null) {
    const ids = data.map((d) => Number(d.id) || 0);
    const newId = String(Math.max(0, ...ids) + 1);
    const newNode = {
      id: newId,
      parentId: parentId,
      name: `New Person ${newId}`,
      title: "New Role",
      image: "", // or put a valid URL to show image
    };
    setData((prev) => [...prev, newNode]);
  }

  // Remove a node by id (and optionally remove subtree)
  function removeNode(idToRemove) {
    // remove node and its descendants
    const buildSet = (list, rootId) => {
      const set = new Set();
      const stack = [String(rootId)];
      while (stack.length) {
        const cur = stack.pop();
        set.add(String(cur));
        list.forEach((n) => {
          if (String(n.parentId) === String(cur) && !set.has(String(n.id)))
            stack.push(String(n.id));
        });
      }
      return set;
    };
    const toRemove = buildSet(data, idToRemove);
    setData((prev) => prev.filter((n) => !toRemove.has(String(n.id))));
  }

  // handle reparent events from child
  function handleReparent(evt) {
    if (!evt) return;
    if (evt.type === "reparent") {
      const { nodeId, newParentId } = evt;
      // prevent invalid reparent (dropping onto descendant)
      if (isDescendant(data, nodeId, newParentId)) {
        alert("Invalid drop: can't make a node a child of its own descendant.");
        return;
      }
      setData((prev) =>
        prev.map((n) =>
          String(n.id) === String(nodeId) ? { ...n, parentId: newParentId } : n
        )
      );
    }
  }

  function onNodeClick(node) {
    alert(`Clicked: ${node && (node.name || node.id)}`);
  }

  return (
    <div
      style={{
        height: "100vh",
        padding: 12,
        fontFamily: "Inter, Arial, sans-serif",
        background: "#fff",
      }}
    >
      {/* <div style={{ marginBottom: 8 }}>
        <button onClick={() => addNodeUnder(null)} style={buttonStyle}>
          Add root-level node
        </button>{" "}
        <button onClick={() => addNodeUnder("1")} style={buttonStyle}>
          Add under id=1
        </button>{" "}
        <button onClick={() => removeNode("6")} style={buttonStyle}>
          Remove id=6 (and subtree)
        </button>
      </div> */}

      <div
        style={{
          height: "85vh",
          border: "1px solid #e6eef6",
          borderRadius: 8,
          overflow: "hidden",
          padding: 8,
          
          
        }}
        className="bg-[var(--background)] text-[var(--text)]"
      >

        <OrgChartComponent
          data={data}
          onNodeClick={onNodeClick}
          onReparent={handleReparent}
        />
      </div>

      {/* <div style={{ marginTop: 12, color: "#475569", fontSize: 13 }}>
        Tip: Edit <code>DUMMY_DATA</code> at the top to provide your own manual
        data. Use <em>id</em> and <em>parentId</em> to set hierarchy.
      </div> */}
    </div>
  );
}

const buttonStyle = {
  padding: "8px 12px",
  borderRadius: 8,
  border: "1px solid rgba(15,23,42,0.06)",
  background: "white",
  cursor: "pointer",
  fontSize: 13,
};
